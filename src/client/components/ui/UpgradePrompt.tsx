import { Link } from 'wouter';
import { Sparkles } from 'lucide-react';

interface UpgradePromptProps {
  feature: string;
  compact?: boolean;
}

export function UpgradePrompt({ feature, compact = false }: UpgradePromptProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 rounded-xl surface-low px-4 py-3">
        <Sparkles className="h-4 w-4 text-primary-dark shrink-0" />
        <p className="text-sm text-muted-foreground flex-1">
          {feature} requires a <span className="font-medium text-foreground">Student</span> plan.
        </p>
        <Link href="/settings">
          <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-110 transition-all glow-primary whitespace-nowrap">
            Upgrade
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card shadow-ambient p-8 text-center max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <div className="rounded-full bg-primary/10 p-3">
          <Sparkles className="h-6 w-6 text-primary-dark" />
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-2">Unlock {feature}</h2>
      <p className="text-sm text-muted-foreground mb-6">
        This feature is available on the Student plan. Get AI-powered tutoring, adaptive practice,
        and personalised insights for just $35/year.
      </p>
      <Link href="/settings">
        <button className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all glow-primary">
          Upgrade to Student
        </button>
      </Link>
    </div>
  );
}
