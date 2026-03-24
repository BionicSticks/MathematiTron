import { supabaseAdmin } from '../client';
import type { Conversation, Message } from '../../../types/database';

export async function getConversations(userId: string, limit = 20): Promise<Conversation[]> {
  const { data, error } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .eq('is_archived', false)
    .order('last_message_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function getConversation(conversationId: string, userId: string): Promise<Conversation | null> {
  const { data } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('id', conversationId)
    .eq('user_id', userId)
    .single();

  return data;
}

export async function createConversation(params: {
  user_id: string;
  title?: string;
  conversation_type?: Conversation['conversation_type'];
  primary_concept_id?: string;
}): Promise<Conversation> {
  const { data, error } = await supabaseAdmin
    .from('conversations')
    .insert({
      user_id: params.user_id,
      title: params.title ?? null,
      conversation_type: params.conversation_type ?? 'tutoring',
      primary_concept_id: params.primary_concept_id ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateConversation(
  conversationId: string,
  updates: Partial<Pick<Conversation, 'title' | 'is_archived' | 'last_message_at' | 'metadata'>>
): Promise<Conversation> {
  const { data, error } = await supabaseAdmin
    .from('conversations')
    .update(updates)
    .eq('id', conversationId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMessages(conversationId: string, limit = 100): Promise<Message[]> {
  const { data, error } = await supabaseAdmin
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function getRecentMessages(conversationId: string, limit = 20): Promise<Message[]> {
  const { data, error } = await supabaseAdmin
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []).reverse();
}

export async function saveMessage(params: {
  conversation_id: string;
  role: Message['role'];
  content: string;
  concept_id?: string;
  message_type?: Message['message_type'];
  metadata?: Record<string, unknown>;
  token_count?: number;
}): Promise<Message> {
  const { data, error } = await supabaseAdmin
    .from('messages')
    .insert({
      conversation_id: params.conversation_id,
      role: params.role,
      content: params.content,
      concept_id: params.concept_id ?? null,
      message_type: params.message_type ?? 'chat',
      metadata: params.metadata ?? {},
      token_count: params.token_count ?? null,
    })
    .select()
    .single();

  if (error) throw error;

  // Update conversation last_message_at
  await supabaseAdmin
    .from('conversations')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', params.conversation_id);

  return data;
}

export async function getMessageCount(conversationId: string): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('conversation_id', conversationId);

  if (error) throw error;
  return count ?? 0;
}
