import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb, ArrowRight, Square } from 'lucide-react';
import { MathBlock } from '../chat/MathBlock';
import { MasteryRing } from '../progress/MasteryRing';
import type { GeneratedProblem, ProblemSubmitResponse } from '../../../types/api';

interface ProblemCardProps {
  problem: GeneratedProblem;
  problemNumber: number;
  totalProblems: number;
  hintsRevealed: number;
  mastery: number;
  onSubmit: (answer: string) => void;
  onRevealHint: () => void;
  isLoading: boolean;
  feedback: ProblemSubmitResponse | null;
  onNext: () => void;
  onEndSession: () => void;
}

export function ProblemCard({
  problem,
  problemNumber,
  totalProblems,
  hintsRevealed,
  mastery,
  onSubmit,
  onRevealHint,
  isLoading,
  feedback,
  onNext,
  onEndSession,
}: ProblemCardProps) {
  const [answer, setAnswer] = useState('');
  const progress = (problemNumber / totalProblems) * 100;

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim());
      setAnswer('');
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`problem-${problemNumber}`}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Problem {problemNumber} of {totalProblems}</span>
            <div className="flex items-center gap-2">
              <span>Mastery</span>
              <MasteryRing value={mastery} size={28} strokeWidth={3} />
            </div>
          </div>
          <div className="h-1.5 rounded-full surface-mid overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: `${Math.max(progress - 10, 0)}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Problem card */}
        <div className="rounded-2xl bg-card shadow-ambient p-8">
          {/* Problem text */}
          <div className="mb-6 text-base leading-relaxed">
            <MathBlock content={problem.problem_text} />
          </div>

          {/* Feedback banner */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 mb-6 ${
                feedback.isCorrect
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {feedback.isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={`font-semibold text-sm ${
                  feedback.isCorrect ? 'text-green-700' : 'text-red-700'
                }`}>
                  {feedback.isCorrect ? 'Correct!' : 'Not quite'}
                </span>
                <span className={`ml-auto text-xs font-semibold ${
                  feedback.masteryDelta >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {feedback.masteryDelta >= 0 ? '+' : ''}{feedback.masteryDelta} mastery
                </span>
              </div>
              {!feedback.isCorrect && (
                <div className="text-sm text-red-700 mb-2">
                  Answer: <MathBlock content={`$${feedback.correctAnswer}$`} />
                </div>
              )}
              <div className="text-sm text-muted-foreground">
                <MathBlock content={feedback.explanation} />
              </div>
            </motion.div>
          )}

          {/* Answer input (only when not in feedback state) */}
          {!feedback && (
            <div className="mb-6">
              <input
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && answer.trim() && !isLoading) handleSubmit(); }}
                disabled={isLoading}
                className="w-full rounded-xl surface-low px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                placeholder="Type your answer..."
                autoFocus
              />
              {answer.trim() && (
                <div className="mt-2 rounded-xl surface-low px-4 py-2 text-sm">
                  <span className="text-xs text-muted-foreground">Preview: </span>
                  <MathBlock content={`$${answer}$`} />
                </div>
              )}
            </div>
          )}

          {/* Hints */}
          {!feedback && (
            <div className="mb-6">
              <AnimatePresence>
                {Array.from({ length: hintsRevealed }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="rounded-xl surface-low px-4 py-3 mb-2"
                  >
                    <div className="flex items-start gap-2 text-sm">
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      <MathBlock content={problem.hints[i]} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {hintsRevealed < 3 && (
                <button
                  onClick={onRevealHint}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  {hintsRevealed === 0 ? 'Need a hint?' : hintsRevealed === 1 ? 'Another hint?' : 'Last hint (reduces mastery gain)'}
                </button>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            {!feedback ? (
              <>
                <button
                  onClick={onEndSession}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Square className="h-3.5 w-3.5" />
                  End session
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim() || isLoading}
                  className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-30 transition-all glow-primary"
                >
                  {isLoading ? 'Checking...' : 'Submit'}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onEndSession}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  End session
                </button>
                <button
                  onClick={onNext}
                  disabled={isLoading}
                  className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-50 transition-all glow-primary"
                >
                  {isLoading ? 'Loading...' : problemNumber >= totalProblems ? 'See Results' : 'Next Problem'}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
