import { useState, useCallback, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiFetch, apiStream } from '../lib/api';
import type { Message, Conversation } from '../../types/database';
import type { ConversationDetail } from '../../types/api';

interface UseChatOptions {
  conversationId?: string;
}

export function useChat({ conversationId }: UseChatOptions = {}) {
  const queryClient = useQueryClient();
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Fetch conversation with messages
  const { data: conversation, isLoading } = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => apiFetch<ConversationDetail>(`/api/conversations/${conversationId}`),
    enabled: !!conversationId,
  });

  // Fetch conversation list for sidebar
  const { data: conversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => apiFetch<Conversation[]>('/api/conversations'),
  });

  const messages = conversation?.messages ?? [];

  // Create a new conversation
  const createConversation = useCallback(async (conceptId?: string, type?: string) => {
    const conv = await apiFetch<Conversation>('/api/conversations', {
      method: 'POST',
      body: JSON.stringify({
        concept_id: conceptId,
        type: type ?? 'tutoring',
      }),
    });
    queryClient.invalidateQueries({ queryKey: ['conversations'] });
    return conv;
  }, [queryClient]);

  // Send a message and stream the response
  const sendMessage = useCallback(async (content: string) => {
    if (!conversationId || isStreaming) return;

    setError(null);
    setIsStreaming(true);
    setStreamingText('');

    // Optimistic: add user message to the cache
    const tempUserMsg: Message = {
      id: `temp-${Date.now()}`,
      conversation_id: conversationId,
      role: 'user',
      content,
      concept_id: null,
      message_type: 'chat',
      metadata: {},
      created_at: new Date().toISOString(),
      token_count: null,
    };

    queryClient.setQueryData<ConversationDetail>(
      ['conversation', conversationId],
      (old) => old ? { ...old, messages: [...old.messages, tempUserMsg] } : undefined,
    );

    // Stream AI response
    abortRef.current = apiStream(
      `/api/conversations/${conversationId}/messages`,
      { content },
      // onDelta
      (text) => {
        setStreamingText(prev => prev + text);
      },
      // onDone
      () => {
        setIsStreaming(false);
        setStreamingText('');
        // Refetch to get the real messages from DB
        queryClient.invalidateQueries({ queryKey: ['conversation', conversationId] });
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
      },
      // onError
      (err) => {
        setIsStreaming(false);
        setStreamingText('');
        setError(err);
      },
    );
  }, [conversationId, isStreaming, queryClient]);

  // Cancel streaming
  const cancelStream = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
    setStreamingText('');
  }, []);

  return {
    conversation,
    conversations: conversations ?? [],
    messages,
    streamingText,
    isStreaming,
    isLoading,
    error,
    sendMessage,
    createConversation,
    cancelStream,
  };
}
