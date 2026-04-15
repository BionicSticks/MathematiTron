import { useEffect, useRef } from 'react';
import type { MathfieldElement } from 'mathlive';

// Ensure MathLive custom element is registered
import 'mathlive';

interface MathInputProps {
  value: string;
  onChange: (latex: string) => void;
  onSubmit?: () => void;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

export function MathInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = 'Type your answer...',
  autoFocus = false,
}: MathInputProps) {
  const ref = useRef<MathfieldElement>(null);

  useEffect(() => {
    const mf = ref.current;
    if (!mf) return;

    // Configure the mathfield
    mf.mathVirtualKeyboardPolicy = 'auto';
    mf.smartMode = true;
    mf.smartFence = true;
    mf.smartSuperscript = true;

    // Listen for input
    const handleInput = () => {
      onChange(mf.value);
    };

    // Listen for Enter key to submit
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && onSubmit) {
        e.preventDefault();
        onSubmit();
      }
    };

    mf.addEventListener('input', handleInput);
    mf.addEventListener('keydown', handleKeyDown);

    if (autoFocus) {
      setTimeout(() => mf.focus(), 100);
    }

    return () => {
      mf.removeEventListener('input', handleInput);
      mf.removeEventListener('keydown', handleKeyDown);
    };
  }, [onChange, onSubmit, autoFocus]);

  // Sync external value changes
  useEffect(() => {
    const mf = ref.current;
    if (mf && mf.value !== value) {
      mf.value = value;
    }
  }, [value]);

  // Handle disabled state
  useEffect(() => {
    const mf = ref.current;
    if (mf) {
      mf.readOnly = disabled;
    }
  }, [disabled]);

  return (
    <math-field
      ref={ref}
      className="math-input-field"
      placeholder={placeholder}
      style={{
        width: '100%',
        fontSize: '1rem',
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        backgroundColor: 'var(--color-surface-low)',
        color: 'var(--color-foreground)',
        border: 'none',
        outline: 'none',
        minHeight: '48px',
        display: 'block',
      }}
    />
  );
}

// Type declaration for the math-field custom element
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<
        React.HTMLAttributes<MathfieldElement> & {
          placeholder?: string;
        },
        MathfieldElement
      >;
    }
  }
}
