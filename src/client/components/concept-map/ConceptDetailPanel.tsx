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

  const prereqDetails = concept.prerequisites.map(prereqId => {
    const prereqConcept = data?.concepts.find(c => c.id === prereqId);
    return {
      id: prereqId,
      name: prereqConcept?.name ?? prereqId,
      mastery: prereqConcept?.mastery?.mastery_level ?? 0,
      isLocked: prereqConcept?.isLocked ?? false,
    };
  });

  const dependents = data?.concepts.filter(c =>
    c.prerequisites.includes(concept.id)
  ) ?? [];

  return (
    <div className="w-80 bg-card shadow-ambient flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-5 pb-4">
        <div className="flex-1 min-w-0 mr-2">
          <h3 className="font-semibold text-lg leading-tight">{concept.name}</h3>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {concept.category.replace(/-/g, ' ')}
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:surface-low transition-colors flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-6">
        <div className="flex justify-center">
          <MasteryRing value={mastery} size={96} label="Mastery" />
        </div>

        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            Difficulty {concept.difficulty}/10
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            ~{concept.estimated_minutes} min
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{concept.description}</p>

        {prereqDetails.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Prerequisites
            </h4>
            <div className="space-y-2">
              {prereqDetails.map(p => (
                <div key={p.id} className="flex items-center justify-between text-sm rounded-xl surface-low px-3 py-2.5">
                  <span className="truncate">{p.name}</span>
                  <span className={`text-xs font-semibold ${
                    p.mastery >= 60 ? 'text-primary-dark' : 'text-muted-foreground'
                  }`}>
                    {Math.round(p.mastery)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {dependents.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Unlocks
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {dependents.map(d => (
                <span
                  key={d.id}
                  className="inline-block rounded-lg surface-low px-2.5 py-1 text-xs font-medium"
                >
                  {d.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-5 pt-4 space-y-2">
        {concept.isLocked ? (
          <div className="flex items-center gap-2 rounded-xl surface-low px-4 py-3 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Complete prerequisites to unlock</span>
          </div>
        ) : (
          <>
            <Link href={`/chat?concept=${concept.id}`}>
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all glow-primary">
                <MessageSquare className="h-4 w-4" />
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href={`/practice/${concept.id}`}>
              <button className="flex w-full items-center justify-center gap-2 rounded-full surface-low px-4 py-2.5 text-sm font-medium hover:surface-mid transition-colors">
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
