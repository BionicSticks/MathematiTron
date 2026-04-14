import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { MasteryRing } from '../progress/MasteryRing';
import type { DiagnosticResult } from '../../../types/api';
import type { Concept } from '../../../types/database';

interface LearningPathPreviewProps {
  result: DiagnosticResult;
  onConfirm: () => void;
  isLoading: boolean;
}

export function LearningPathPreview({ result, onConfirm, isLoading }: LearningPathPreviewProps) {
  // Fetch concept details for the path
  const { data: allConcepts } = useQuery({
    queryKey: ['concepts-all'],
    queryFn: () => apiFetch<Concept[]>('/api/curriculum/concepts'),
    staleTime: Infinity,
  });

  const pathConcepts = useMemo(() => {
    if (!allConcepts) return [];
    const conceptMap = new Map(allConcepts.map(c => [c.id, c]));
    const masteryMap = new Map(result.conceptMastery.map(m => [m.concept_id, m.estimated_mastery]));

    return result.suggestedPath.map(id => {
      const concept = conceptMap.get(id);
      const mastery = masteryMap.get(id) ?? 0;
      return concept ? { ...concept, estimatedMastery: mastery } : null;
    }).filter(Boolean) as (Concept & { estimatedMastery: number })[];
  }, [allConcepts, result]);

  const firstGapIndex = pathConcepts.findIndex(c => c.estimatedMastery < 60);
  const totalHours = Math.round(result.estimatedTotalMinutes / 60);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-2">Your learning path</h2>
      <p className="text-muted-foreground mb-2">
        {pathConcepts.length} concepts to work through, tailored to your goal.
      </p>
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
        <Clock className="h-3.5 w-3.5" />
        Estimated {totalHours > 0 ? `${totalHours} hour${totalHours !== 1 ? 's' : ''}` : `${result.estimatedTotalMinutes} minutes`}
      </p>

      {/* Path timeline */}
      <div className="relative mb-10">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border" />

        <div className="space-y-1">
          {pathConcepts.slice(0, 20).map((concept, i) => {
            const isStartHere = i === firstGapIndex;
            const isComfortable = concept.estimatedMastery >= 60;

            return (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`relative flex items-center gap-4 rounded-xl px-4 py-3 ${
                  isStartHere ? 'bg-primary/5 glow-primary' : ''
                } ${isComfortable ? 'opacity-60' : ''}`}
              >
                {/* Timeline dot */}
                <div className={`relative z-10 h-[10px] w-[10px] rounded-full shrink-0 ${
                  isComfortable ? 'bg-primary' : isStartHere ? 'bg-primary ring-4 ring-primary/20' : 'surface-high'
                }`} />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{concept.name}</span>
                    {isStartHere && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-primary-dark bg-primary/15 rounded-full px-2 py-0.5 shrink-0">
                        <MapPin className="h-3 w-3" />
                        Start here
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-muted-foreground capitalize">
                    {concept.category.replace(/-/g, ' ')}
                    {concept.estimated_minutes ? ` · ${concept.estimated_minutes} min` : ''}
                  </span>
                </div>

                {/* Mastery */}
                <MasteryRing value={concept.estimatedMastery} size={32} strokeWidth={3} />
              </motion.div>
            );
          })}

          {pathConcepts.length > 20 && (
            <div className="relative flex items-center gap-4 px-4 py-3">
              <div className="relative z-10 h-[10px] w-[10px] rounded-full shrink-0 surface-high" />
              <span className="text-sm text-muted-foreground">
                +{pathConcepts.length - 20} more concepts
              </span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={isLoading}
        className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-50 transition-all glow-primary"
      >
        {isLoading ? 'Setting up...' : "Let's start learning"}
        {!isLoading && <ArrowRight className="h-4 w-4" />}
      </button>
    </motion.div>
  );
}
