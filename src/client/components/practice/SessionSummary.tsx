import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { MasteryRing } from '../progress/MasteryRing';
import type { ProblemSubmitResponse, PracticeSessionEndResponse } from '../../../types/api';

interface SessionSummaryProps {
  summary: PracticeSessionEndResponse;
  results: ProblemSubmitResponse[];
  conceptName: string;
  onContinue: () => void;
  onPickNew: () => void;
}

export function SessionSummary({ summary, results, conceptName, onContinue, onPickNew }: SessionSummaryProps) {
  const percentage = summary.totalProblems > 0
    ? Math.round((summary.score / summary.totalProblems) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-2">Session complete</h2>
      <p className="text-muted-foreground mb-8">{conceptName}</p>

      {/* Score + stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-card shadow-ambient p-5 flex flex-col items-center"
        >
          <MasteryRing value={percentage} size={64} strokeWidth={5} />
          <span className="text-sm font-semibold mt-2">{summary.score} / {summary.totalProblems}</span>
          <span className="text-xs text-muted-foreground">Score</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-card shadow-ambient p-5 flex flex-col items-center justify-center"
        >
          <span className={`text-2xl font-bold ${
            summary.masteryChange >= 0 ? 'text-primary-dark' : 'text-destructive'
          }`}>
            {summary.masteryChange >= 0 ? '+' : ''}{summary.masteryChange}%
          </span>
          <span className="text-xs text-muted-foreground mt-1">Mastery Change</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-card shadow-ambient p-5 flex flex-col items-center justify-center"
        >
          <MasteryRing value={summary.newMasteryLevel} size={64} strokeWidth={5} />
          <span className="text-xs text-muted-foreground mt-2">Current Mastery</span>
        </motion.div>
      </div>

      {/* Problem breakdown */}
      {results.length > 0 && (
        <div className="rounded-2xl bg-card shadow-ambient p-5 mb-8">
          <h3 className="text-sm font-semibold mb-3">Problem Breakdown</h3>
          <div className="space-y-1.5">
            {results.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center justify-between rounded-lg surface-low px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  {result.isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">Problem {i + 1}</span>
                </div>
                <span className={`text-xs font-semibold ${
                  result.masteryDelta >= 0 ? 'text-green-600' : 'text-red-500'
                }`}>
                  {result.masteryDelta >= 0 ? '+' : ''}{result.masteryDelta}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={onContinue}
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all glow-primary"
        >
          <RotateCcw className="h-4 w-4" />
          Practice Again
        </button>
        <button
          onClick={onPickNew}
          className="flex items-center gap-2 rounded-full surface-low px-6 py-2.5 text-sm font-medium hover:surface-mid transition-colors"
        >
          Try Another Concept
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
