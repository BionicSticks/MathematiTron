import type { Message } from '../../../types/database';
import { anthropic, MODEL } from './client';
import { getRecentMessages, getMessageCount, saveMessage } from '../../db/queries/conversations';
import { updateConversation } from '../../db/queries/conversations';

const VERBATIM_MESSAGE_LIMIT = 20;
const SUMMARIZE_THRESHOLD = 30;

/**
 * Build the message array for the Claude API call.
 * Includes the last 20 messages verbatim. If a conversation summary
 * exists (from prior summarisation), it's handled in the system prompt.
 */
export function buildMessageHistory(messages: Message[]): Array<{ role: 'user' | 'assistant'; content: string }> {
  // Filter to user/assistant messages only (system messages go in system prompt)
  const chatMessages = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .slice(-VERBATIM_MESSAGE_LIMIT);

  return chatMessages.map(m => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));
}

/**
 * Check if we need to summarise older messages.
 * Triggered every 30 messages.
 */
export async function maybeSummarize(conversationId: string): Promise<string | undefined> {
  const messageCount = await getMessageCount(conversationId);

  if (messageCount < SUMMARIZE_THRESHOLD) return undefined;

  // Only summarise if we haven't recently (check if count is a multiple of 30)
  if (messageCount % SUMMARIZE_THRESHOLD !== 0) return undefined;

  // Get all messages to summarise (everything before the last 20)
  const allMessages = await getRecentMessages(conversationId, messageCount);
  const toSummarize = allMessages.slice(0, -VERBATIM_MESSAGE_LIMIT);

  if (toSummarize.length === 0) return undefined;

  const summaryPrompt = toSummarize
    .map(m => `${m.role}: ${m.content}`)
    .join('\n\n');

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 500,
    system: 'Summarise this tutoring conversation concisely. Focus on: what topics were covered, what the student understood well, what they struggled with, and any key misconceptions identified. Be factual and brief.',
    messages: [{ role: 'user', content: summaryPrompt }],
  });

  const summary = response.content[0].type === 'text' ? response.content[0].text : '';

  // Store summary in conversation metadata
  await updateConversation(conversationId, {
    metadata: { summary },
  });

  return summary;
}

/**
 * Get the existing conversation summary from metadata, if any.
 */
export function getExistingSummary(metadata: Record<string, unknown>): string | undefined {
  return typeof metadata?.summary === 'string' ? metadata.summary : undefined;
}
