import { anthropic, MODEL } from './client';
import { getMessages } from '../../db/queries/conversations';
import { saveInsight, getInsights } from '../../db/queries/insights';
import type { Message } from '../../../types/database';

const EXTRACTION_INTERVAL = 5; // every 5th message

/**
 * Background insight extraction — called after saving an assistant message.
 * Analyses recent messages and extracts misconceptions, strengths,
 * learning style observations, and struggle patterns.
 * Fire-and-forget — errors are logged, never thrown to the caller.
 */
export async function maybeExtractInsights(
  conversationId: string,
  userId: string,
  conceptId: string | null,
): Promise<void> {
  try {
    const messages = await getMessages(conversationId);
    const totalMessages = messages.filter(m => m.role !== 'system').length;

    // Only extract every Nth message
    if (totalMessages % EXTRACTION_INTERVAL !== 0 || totalMessages === 0) return;

    // Don't run if AI is unavailable
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'missing') return;

    // Get recent messages (last 10 exchanges)
    const recentMessages = messages.slice(-20);
    const existingInsights = await getInsights(userId, conceptId ?? undefined);

    const existingContent = existingInsights.map(i => i.content).join('\n');

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: `You are an educational analyst. Analyse the recent conversation between a student and their math tutor. Extract any new insights about the student that aren't already known.

Existing insights about this student:
${existingContent || '(none yet)'}

Respond ONLY with a JSON array. Each item must have:
- "type": one of "misconception", "strength", "learning_style", "struggle_pattern"
- "content": a concise description (1-2 sentences)

Rules:
- Only include genuinely new insights not covered by existing ones
- Be specific — "struggles with negative exponents" is better than "struggles with algebra"
- Return an empty array [] if no new insights are evident
- Maximum 3 insights per extraction`,
      messages: recentMessages.map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })) as Array<{ role: 'user' | 'assistant'; content: string }>,
    });

    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return;

    const insights: Array<{ type: string; content: string }> = JSON.parse(jsonMatch[0]);

    for (const insight of insights) {
      if (!['misconception', 'strength', 'learning_style', 'struggle_pattern'].includes(insight.type)) continue;
      if (!insight.content?.trim()) continue;

      await saveInsight({
        user_id: userId,
        concept_id: conceptId ?? undefined,
        insight_type: insight.type as 'misconception' | 'strength' | 'learning_style' | 'struggle_pattern',
        content: insight.content.trim(),
        source_message_id: recentMessages[recentMessages.length - 1]?.id,
      });
    }
  } catch (err) {
    console.error('Insight extraction failed (non-blocking):', (err as Error).message);
  }
}

/**
 * Check if extraction should run based on message count.
 */
export function shouldExtract(messageCount: number): boolean {
  return messageCount > 0 && messageCount % EXTRACTION_INTERVAL === 0;
}
