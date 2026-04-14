import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { MasteryRing } from '../progress/MasteryRing';
import type { DiagnosticResult } from '../../../types/api';

interface DiagnosticResultsProps {
  result: DiagnosticResult;
  onViewPath: () => void;
}

export function DiagnosticResults({ result, onViewPath }: DiagnosticResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-2">Assessment complete</h2>
      <p className="text-muted-foreground mb-10">{result.summary}</p>

      {/* Category breakdown */}
      {result.categoryBreakdown.length > 0 && (
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Knowledge by area
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {result.categoryBreakdown.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl bg-card shadow-ambient p-4 flex flex-col items-center gap-2"
              >
                <MasteryRing value={cat.averageMastery} size={56} strokeWidth={5} />
                <span className="text-xs text-center font-medium leading-tight">
                  {cat.categoryLabel}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths and gaps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {result.strengths.length > 0 && (
          <div className="rounded-xl bg-card shadow-ambient p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
              <CheckCircle className="h-4 w-4 text-primary-dark" />
              Strengths
            </h3>
            <ul className="space-y-2">
              {result.strengths.map((s, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
        {result.gaps.length > 0 && (
          <div className="rounded-xl bg-card shadow-ambient p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
              <TrendingUp className="h-4 w-4 text-secondary-dark" />
              Areas to develop
            </h3>
            <ul className="space-y-2">
              {result.gaps.map((g, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={onViewPath}
        className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all glow-primary"
      >
        View your learning path
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
