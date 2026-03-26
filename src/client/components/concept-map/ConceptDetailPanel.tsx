import { Link } from 'wouter';
import { X, Clock, BarChart3, Lock, ArrowRight, MessageSquare, Dumbbell } from 'lucide-react';
import { MasteryRing } from '../progress/MasteryRing';
import type { ConceptWithMastery } from '../../../types/api';
import { useConceptMap } from '../../hooks/useConceptMap';

interface ConceptDetailPanelProps {
  concept: ConceptWithMastery;
  onClose: () => void;
}

export function ConceptDetailPanel({ concept, onClose }: ConceptDetailPanelProps) {
  const { data } = useConceptMap();
  const mastery = concept.mastery?.mastery_level ?? 0;

  // Resolve prerequisite names and mastery
  const prereqDetails = concept.prerequisites.map(prereqId => {
    const prereqConcept = data?.concepts.find(c => c.id === prereqId);
    return {
      id: prereqId,
      name: prereqConcept?.name ?? prereqId,
      mastery: prereqConcept?.mastery?.mastery_level ?? 0,
      isLocked: prereqConcept?.isLocked ?? false,
    };
  });

  // Find concepts that depend on this one
  const dependents = data?.concepts.filter(c =>
    c.prerequisites.includes(concept.id)
  ) ?? [];

  return (
    <div className="w-80 border-l border-border bg-card flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-border">
        <div className="flex-1 min-w-0 mr-2">
          <h3 className="font-semibold text-base leading-tight">{concept.name}</h3>
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {concept.category.replace(/-/g, ' ')}
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Mastery ring */}
        <div className="flex justify-center">
          <MasteryRing value={mastery} size={96} label="Mastery" />
        </div>

        {/* Meta */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BarChart3 className="h-3.5 w-3.5" />
            Difficulty {concept.difficulty}/10
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            ~{concept.estimated_minutes} min
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">{concept.description}</p>

        {/* Prerequisites */}
        {prereqDetails.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Prerequisites
            </h4>
            <div className="space-y-1.5">
              {prereqDetails.map(p => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <span className="truncate">{p.name}</span>
                  <span className={`text-xs font-medium ${
                    p.mastery >= 60 ? 'text-green-500' : 'text-muted-foreground'
                  }`}>
                    {Math.round(p.mastery)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unlocks */}
        {dependents.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Unlocks
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {dependents.map(d => (
                <span
                  key={d.id}
                  className="inline-block rounded-md bg-muted px-2 py-0.5 text-xs"
                >
                  {d.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-2">
        {concept.isLocked ? (
          <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2.5 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Complete prerequisites to unlock</span>
          </div>
        ) : (
          <>
            <Link href={`/chat?concept=${concept.id}`}>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                <MessageSquare className="h-4 w-4" />
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href={`/practice/${concept.id}`}>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
                <Dumbbell className="h-4 w-4" />
                Practice
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
