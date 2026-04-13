import { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { StreamingMessage } from './StreamingMessage';
import { ChatInput } from './ChatInput';
import type { Message } from '../../../types/database';
import { MessageSquare } from 'lucide-react';

interface ChatPanelProps {
  messages: Message[];
  streamingText: string;
  isStreaming: boolean;
  onSend: (content: string) => void;
  conceptName?: string;
}

export function ChatPanel({ messages, streamingText, isStreaming, onSend, conceptName }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or streaming
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, streamingText]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.length === 0 && !isStreaming && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="rounded-2xl surface-low p-4 mb-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">
              {conceptName ? `Let's learn ${conceptName}` : 'Start a conversation'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              {conceptName
                ? `Ask a question about ${conceptName}, or say "teach me" to get started.`
                : 'Ask your AI tutor anything about mathematics.'}
            </p>
          </div>
        )}

        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isStreaming && <StreamingMessage text={streamingText} />}
      </div>

      {/* Input */}
      <div className="px-6 pb-6 pt-2">
        <ChatInput
          onSend={onSend}
          disabled={isStreaming}
          placeholder={conceptName ? `Ask about ${conceptName}...` : undefined}
        />
      </div>
    </div>
  );
}
