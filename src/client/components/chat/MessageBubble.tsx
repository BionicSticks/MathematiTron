import { MathBlock } from './MathBlock';
import { GraduationCap, User } from 'lucide-react';
import type { Message } from '../../../types/database';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-primary/10 text-primary-dark' : 'surface-mid text-muted-foreground'
      }`}>
        {isUser ? <User className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
      </div>

      {/* Content */}
      <div className={`max-w-[75%] min-w-0 ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block rounded-2xl px-4 py-3 text-sm ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-card shadow-ambient rounded-bl-md'
        }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="text-left">
              <MathBlock content={message.content} />
            </div>
          )}
        </div>
        <div className="text-[11px] text-muted-foreground mt-1 px-1">
          {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
