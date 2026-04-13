import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MathBlockProps {
  content: string;
}

export function MathBlock({ content }: MathBlockProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        // Style code blocks
        code({ className, children, ...props }) {
          const isInline = !className;
          return isInline ? (
            <code className="rounded surface-mid px-1.5 py-0.5 text-sm font-mono" {...props}>
              {children}
            </code>
          ) : (
            <code className={`${className} block rounded-xl surface-low p-4 text-sm font-mono overflow-x-auto`} {...props}>
              {children}
            </code>
          );
        },
        // Style paragraphs
        p({ children }) {
          return <p className="mb-3 last:mb-0">{children}</p>;
        },
        // Style lists
        ul({ children }) {
          return <ul className="mb-3 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="mb-3 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>;
        },
        // Style headings
        h3({ children }) {
          return <h3 className="font-semibold mb-2 mt-3">{children}</h3>;
        },
        h4({ children }) {
          return <h4 className="font-medium mb-1 mt-2">{children}</h4>;
        },
        // Style blockquotes
        blockquote({ children }) {
          return (
            <blockquote className="border-l-3 border-primary/30 pl-3 my-3 text-muted-foreground italic">
              {children}
            </blockquote>
          );
        },
        // Style strong/bold
        strong({ children }) {
          return <strong className="font-semibold">{children}</strong>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
