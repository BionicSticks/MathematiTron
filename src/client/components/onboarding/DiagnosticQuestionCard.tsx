import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipForward } from 'lucide-react';
import { MathBlock } from '../chat/MathBlock';
import type { DiagnosticQuestion } from '../../../types/api';

interface DiagnosticQuestionCardProps {
  question: DiagnosticQuestion;
  onAnswer: (answer: string | null) => void;
  isLoading: boolean;
}

export function DiagnosticQuestionCard({ question, onAnswer, isLoading }: DiagnosticQuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const progress = Math.min((question.questionNumber / question.totalExpected) * 100, 95);

  const handleSubmit = () => {
    if (question.questionType === 'multiple_choice') {
      if (selectedOption !== null) onAnswer(selectedOption);
    } else {
      if (textAnswer.trim()) onAnswer(textAnswer.trim());
    }
  };

  const handleSkip = () => {
    onAnswer(null);
  };

  const hasAnswer = question.questionType === 'multiple_choice'
    ? selectedOption !== null
    : textAnswer.trim().length > 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.questionNumber}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Question {question.questionNumber} of ~{question.totalExpected}</span>
            <span className="capitalize">{question.categoryBeingProbed.replace(/-/g, ' ')}</span>
          </div>
          <div className="h-1.5 rounded-full surface-mid overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: `${Math.max(progress - 12, 0)}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="rounded-2xl bg-card shadow-ambient p-8">
          {/* Question text */}
          <div className="mb-8 text-base leading-relaxed">
            <MathBlock content={question.questionText} />
          </div>

          {/* Answer input */}
          {question.questionType === 'multiple_choice' && question.options ? (
            <div className="grid grid-cols-1 gap-3 mb-8">
              {question.options.map((option, i) => {
                const letter = String.fromCharCode(65 + i);
                const isSelected = selectedOption === option;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedOption(option)}
                    disabled={isLoading}
                    className={`flex items-start gap-3 rounded-xl p-4 text-left transition-all ${
                      isSelected
                        ? 'bg-primary/10 glow-primary'
                        : 'surface-low hover:bg-card hover:shadow-ambient'
                    }`}
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'surface-mid text-muted-foreground'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-sm pt-0.5">
                      <MathBlock content={option} />
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mb-8">
              <input
                type="text"
                value={textAnswer}
                onChange={e => setTextAnswer(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && hasAnswer && !isLoading) handleSubmit(); }}
                disabled={isLoading}
                className="w-full rounded-xl surface-low px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                placeholder={question.questionType === 'math_expression'
                  ? 'Type your answer (e.g. x^2 + 3x - 1 or use LaTeX)'
                  : 'Type your answer...'}
                autoFocus
              />
              {question.questionType === 'math_expression' && textAnswer.trim() && (
                <div className="mt-3 rounded-xl surface-low px-4 py-3 text-sm">
                  <span className="text-xs text-muted-foreground block mb-1">Preview:</span>
                  <MathBlock content={`$${textAnswer}$`} />
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleSkip}
              disabled={isLoading}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              <SkipForward className="h-3.5 w-3.5" />
              Skip question
            </button>
            <button
              onClick={handleSubmit}
              disabled={!hasAnswer || isLoading}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-30 transition-all glow-primary"
            >
              {isLoading ? 'Analysing...' : 'Submit'}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
