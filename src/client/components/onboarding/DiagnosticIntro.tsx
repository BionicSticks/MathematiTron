import { ClipboardCheck, Brain, Route, ArrowRight } from 'lucide-react';

interface DiagnosticIntroProps {
  onBegin: () => void;
  onSkip: () => void;
  isLoading: boolean;
}

export function DiagnosticIntro({ onBegin, onSkip, isLoading }: DiagnosticIntroProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2">Quick assessment</h2>
      <p className="text-muted-foreground mb-10">
        We'll ask 6-10 questions to understand where you are. No wrong answers — this
        helps us build your personalised learning path.
      </p>

      <div className="space-y-4 mb-10">
        {[
          { icon: ClipboardCheck, title: 'Targeted questions', desc: 'Adaptive questions across key topic areas' },
          { icon: Brain, title: 'Instant analysis', desc: 'We map your strengths and areas to develop' },
          { icon: Route, title: 'Your learning path', desc: 'A personalised sequence of concepts to master' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4 rounded-xl bg-card shadow-ambient p-4">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Icon className="h-5 w-5 text-primary-dark" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onBegin}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-50 transition-all glow-primary"
        >
          {isLoading ? 'Starting...' : 'Begin Assessment'}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </button>
        <button
          onClick={onSkip}
          disabled={isLoading}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </div>

      <p className="text-xs text-muted-foreground mt-6">About 5 minutes</p>
    </div>
  );
}
