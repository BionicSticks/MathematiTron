import { useState, useEffect } from 'react';
import { useRoute, useLocation, useSearch } from 'wouter';
import { Sidebar } from '../components/layout/Sidebar';
import { ChatPanel } from '../components/chat/ChatPanel';
import { useChat } from '../hooks/useChat';
import { Plus, MessageSquare } from 'lucide-react';
import type { Conversation } from '../../types/database';

export function TutorChatPage() {
  const [, params] = useRoute('/chat/:id');
  const [, navigate] = useLocation();
  const search = useSearch();
  const conceptId = new URLSearchParams(search).get('concept');

  const conversationId = params?.id;

  const {
    conversations,
    messages,
    streamingText,
    isStreaming,
    isLoading,
    error,
    sendMessage,
    createConversation,
  } = useChat({ conversationId });

  const [conceptName, setConceptName] = useState<string | undefined>();

  // If navigated with ?concept=<id> and no conversation ID, create one
  useEffect(() => {
    if (conceptId && !conversationId) {
      createConversation(conceptId, 'tutoring').then(conv => {
        navigate(`/chat/${conv.id}`, { replace: true });
      });
    }
  }, [conceptId, conversationId, createConversation, navigate]);

  // Resolve concept name from conversations list
  useEffect(() => {
    if (conversationId) {
      const conv = conversations.find(c => c.id === conversationId);
      if (conv?.title) {
        setConceptName(conv.title);
      }
    }
  }, [conversationId, conversations]);

  const handleNewChat = async () => {
    const conv = await createConversation();
    navigate(`/chat/${conv.id}`);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      {/* Conversation list sidebar */}
      <div className="w-64 flex flex-col surface-low">
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="flex w-full items-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
          {conversations.map(conv => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isActive={conv.id === conversationId}
              onClick={() => navigate(`/chat/${conv.id}`)}
            />
          ))}

          {conversations.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-6 px-2">
              No conversations yet. Start one!
            </p>
          )}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 min-w-0">
        {conversationId ? (
          <>
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <ChatPanel
                messages={messages}
                streamingText={streamingText}
                isStreaming={isStreaming}
                onSend={sendMessage}
                conceptName={conceptName}
              />
            )}
            {error && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-xl bg-destructive/10 text-destructive text-sm px-4 py-2">
                {error}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="rounded-2xl surface-low p-4 mb-4 inline-block">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold mb-1">AI Tutor</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Select a conversation or start a new one
              </p>
              <button
                onClick={handleNewChat}
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all glow-primary"
              >
                Start Chatting
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ConversationItem({
  conversation,
  isActive,
  onClick,
}: {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}) {
  const title = conversation.title
    ?? conversation.primary_concept_id?.replace(/-/g, ' ')
    ?? 'New Conversation';

  const time = new Date(conversation.last_message_at).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  });

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl px-3 py-2.5 transition-colors ${
        isActive
          ? 'bg-card shadow-ambient'
          : 'hover:surface-mid'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium truncate">{title}</span>
        <span className="text-[11px] text-muted-foreground flex-shrink-0">{time}</span>
      </div>
    </button>
  );
}
