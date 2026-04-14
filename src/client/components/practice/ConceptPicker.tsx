import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { MasteryRing } from '../progress/MasteryRing';
import { Lock } from 'lucide-react';
import type { PracticeConceptsResponse, ConceptWithMastery } from '../../../types/api';

interface ConceptPickerProps {
  onSelect: (conceptId: string, conceptName: string) => void;
}

export function ConceptPicker({ onSelect }: ConceptPickerProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['practice-concepts'],
    queryFn: () => apiFetch<PracticeConceptsResponse>('/api/practice/concepts'),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Practice</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-32 rounded-2xl surface-low animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const { recommended = [], available = [] } = data ?? {};

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Practice</h1>
        <p className="text-muted-foreground mt-1">Choose a concept to practise</p>
      </div>

      {recommended.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Recommended Next
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.map(concept => (
              <ConceptCard key={concept.id} concept={concept} onSelect={onSelect} highlighted />
            ))}
          </div>
        </section>
      )}

      {available.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            All Available
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {available.map(concept => (
              <ConceptCard key={concept.id} concept={concept} onSelect={onSelect} />
            ))}
          </div>
        </section>
      )}

      {recommended.length === 0 && available.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No concepts available for practice yet.</p>
          <p className="text-sm text-muted-foreground mt-1">Complete the diagnostic to get started.</p>
        </div>
      )}
    </div>
  );
}

function ConceptCard({
  concept,
  onSelect,
  highlighted,
}: {
  concept: ConceptWithMastery;
  onSelect: (id: string, name: string) => void;
  highlighted?: boolean;
}) {
  const mastery = concept.mastery?.mastery_level ?? 0;

  if (concept.isLocked) {
    return (
      <div className="rounded-2xl surface-low p-5 opacity-50 cursor-not-allowed">
        <div className="flex items-center justify-between mb-2">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Locked</span>
        </div>
        <h3 className="font-medium text-sm">{concept.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{concept.description}</p>
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelect(concept.id, concept.name)}
      className={`rounded-2xl p-5 text-left transition-all cursor-pointer ${
        highlighted
          ? 'bg-card shadow-ambient hover:shadow-lg glow-primary'
          : 'bg-card shadow-ambient hover:shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          {concept.category.replace(/-/g, ' ')}
        </span>
        <MasteryRing value={mastery} size={36} strokeWidth={3} />
      </div>
      <h3 className="font-medium text-sm mb-1">{concept.name}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2">{concept.description}</p>
    </button>
  );
}
