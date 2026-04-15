import type { Response } from 'express';
import type { Conversation, Message } from '../../../types/database';
import { anthropic, MODEL, MAX_TOKENS } from './client';
import { buildSystemPrompt } from './systemPrompt';
import { buildMessageHistory, getExistingSummary, maybeSummarize } from './contextManager';
import { getProfile, getActiveGoal } from '../../db/queries/profiles';
import { getAllMastery, getMastery } from '../../db/queries/mastery';
import { getInsights } from '../../db/queries/insights';
import { getMessages, saveMessage } from '../../db/queries/conversations';
import { getConcept, getPrerequisitesFor } from '../curriculum/graph';
import { maybeExtractInsights } from './insightExtractor';

/**
 * Stream a tutor response via SSE.
 *
 * SSE event format:
 *   event: delta    → data: { text: "chunk" }
 *   event: done     → data: { message_id: "..." }
 *   event: error    → data: { error: "..." }
 */
export async function streamTutorResponse(
  res: Response,
  conversation: Conversation,
  userMessage: Message,
) {
  const userId = conversation.user_id;

  try {
    // Gather all context in parallel
    const [profile, goal, allMastery, insights, messages] = await Promise.all([
      getProfile(userId),
      getActiveGoal(userId),
      getAllMastery(userId),
      getInsights(userId, conversation.primary_concept_id ?? undefined),
      getMessages(conversation.id),
    ]);

    if (!profile) {
      sendSSE(res, 'error', { error: 'Profile not found' });
      res.end();
      return;
    }

    // Calculate overall mastery
    const overallMastery = allMastery.length > 0
      ? allMastery.reduce((sum, m) => sum + m.mastery_level, 0) / allMastery.length
      : 0;

    // Build concept context if conversation is tied to a concept
    let conceptCtx = null;
    if (conversation.primary_concept_id) {
      const concept = getConcept(conversation.primary_concept_id);
      if (concept) {
        const mastery = await getMastery(userId, concept.id);
        const prereqs = getPrerequisitesFor(concept.id);
        const prereqDetails = await Promise.all(
          prereqs.map(async p => ({
            concept: getConcept(p.prerequisite_id)!,
            mastery: await getMastery(userId, p.prerequisite_id),
          }))
        );

        conceptCtx = {
          concept,
          mastery,
          prerequisites: prereqDetails.filter(p => p.concept),
        };
      }
    }

    // Get existing summary or trigger summarisation
    const existingSummary = getExistingSummary(conversation.metadata);
    await maybeSummarize(conversation.id).catch(() => {}); // non-blocking

    // Build system prompt
    const systemPrompt = buildSystemPrompt(
      { profile, goal, overallMastery, insights },
      conceptCtx,
      conversation.conversation_type,
      existingSummary,
    );

    // Build message history
    const messageHistory = buildMessageHistory(messages);

    // Stream from Claude
    let fullText = '';
    let inputTokens = 0;
    let outputTokens = 0;

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages: messageHistory,
    });

    stream.on('text', (text) => {
      fullText += text;
      sendSSE(res, 'delta', { text });
    });

    stream.on('message', (message) => {
      inputTokens = message.usage.input_tokens;
      outputTokens = message.usage.output_tokens;
    });

    stream.on('error', (error: any) => {
      console.error('Claude stream error:', error?.message ?? error, error?.status, JSON.stringify(error?.error ?? ''));
      sendSSE(res, 'error', { error: `AI response failed: ${error?.message ?? 'unknown'}` });
      res.end();
    });

    await stream.finalMessage();

    // Save assistant message to DB
    const assistantMessage = await saveMessage({
      conversation_id: conversation.id,
      role: 'assistant',
      content: fullText,
      concept_id: conversation.primary_concept_id ?? undefined,
      message_type: 'chat',
      metadata: { input_tokens: inputTokens, output_tokens: outputTokens },
      token_count: outputTokens,
    });

    sendSSE(res, 'done', { message_id: assistantMessage.id });
    res.end();

    // Background insight extraction (fire-and-forget, every 5th message)
    maybeExtractInsights(
      conversation.id,
      userId,
      conversation.primary_concept_id,
    ).catch(() => {});
  } catch (error: any) {
    console.error('Tutor streaming error:', error?.message ?? error, error?.status, JSON.stringify(error?.error ?? ''));
    sendSSE(res, 'error', { error: `Failed to generate response: ${error?.message ?? 'unknown'}` });
    res.end();
  }
}

function sendSSE(res: Response, event: string, data: Record<string, unknown>) {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}
