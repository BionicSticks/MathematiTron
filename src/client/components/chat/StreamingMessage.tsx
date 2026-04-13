import { MathBlock } from './MathBlock';
import { GraduationCap } from 'lucide-react';

interface StreamingMessageProps {
  text: string;
}

export function StreamingMessage({ text }: StreamingMessageProps) {
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="flex-shrink-0 h-8 w-8 rounded-full surface-mid flex items-center justify-center text-muted-foreground">
        <GraduationCap className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="max-w-[75%] min-w-0">
        <div className="inline-block rounded-2xl rounded-bl-md bg-card shadow-ambient px-4 py-3 text-sm">
          {text ? (
            <MathBlock content={text} />
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-pulse" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-pulse [animation-delay:150ms]" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-pulse [animation-delay:300ms]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
