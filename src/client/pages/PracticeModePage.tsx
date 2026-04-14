import { useRoute } from 'wouter';
import { AppShell } from '../components/layout/AppShell';
import { ConceptPicker } from '../components/practice/ConceptPicker';
import { ProblemCard } from '../components/practice/ProblemCard';
import { SessionSummary } from '../components/practice/SessionSummary';
import { usePractice } from '../hooks/usePractice';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function PracticeModePage() {
  const [, params] = useRoute('/practice/:conceptId');
  const practice = usePractice(params?.conceptId);

  return (
    <AppShell>
      <div className="flex flex-col items-center py-4">
        {practice.phase === 'picking' && (
          <div className="w-full">
            <ConceptPicker
              onSelect={(id, name) => practice.startSession(id, name)}
            />
          </div>
        )}

        {practice.phase === 'loading' && !practice.currentProblem && (
          <div className="flex flex-col items-center gap-4 py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Generating problem...</p>
          </div>
        )}

        {(practice.phase === 'solving' || practice.phase === 'feedback' || (practice.phase === 'loading' && practice.currentProblem)) && practice.currentProblem && (
          <ProblemCard
            problem={practice.currentProblem}
            problemNumber={practice.problemNumber}
            totalProblems={10}
            hintsRevealed={practice.hintsRevealed}
            mastery={practice.mastery}
            onSubmit={practice.submitAnswer}
            onRevealHint={practice.revealHint}
            isLoading={practice.phase === 'loading'}
            feedback={practice.lastResult}
            onNext={practice.nextProblem}
            onEndSession={practice.endSession}
          />
        )}

        {practice.phase === 'summary' && practice.summary && (
          <SessionSummary
            summary={practice.summary}
            results={practice.sessionResults}
            conceptName={practice.conceptName ?? 'Practice'}
            onContinue={() => practice.startSession(practice.conceptId!, practice.conceptName ?? undefined)}
            onPickNew={practice.reset}
          />
        )}

        {practice.phase === 'error' && (
          <div className="w-full max-w-lg mx-auto">
            <div className="rounded-2xl bg-card shadow-ambient p-8 text-center">
              <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-4" />
              <h2 className="text-lg font-bold mb-2">Something went wrong</h2>
              <p className="text-sm text-muted-foreground mb-6">{practice.error}</p>
              <button
                onClick={practice.reset}
                className="flex items-center gap-2 mx-auto rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all glow-primary"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Back to concepts
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
