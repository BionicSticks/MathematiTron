import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { Lock, CheckCircle, Circle } from 'lucide-react';
import type { ConceptWithMastery } from '../../../types/api';

export type ConceptStatus = 'mastered' | 'in-progress' | 'started' | 'available' | 'locked';

export interface ConceptNodeData {
  concept: ConceptWithMastery;
  status: ConceptStatus;
}

const statusConfig = {
  mastered: {
    icon: CheckCircle,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    barColor: 'bg-primary',
    nodeBg: 'bg-card',
  },
  'in-progress': {
    icon: Circle,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    barColor: 'bg-secondary',
    nodeBg: 'bg-card',
  },
  started: {
    icon: Circle,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    barColor: 'bg-amber-500',
    nodeBg: 'bg-card',
  },
  available: {
    icon: Circle,
    color: 'text-muted-foreground',
    bgColor: 'surface-low',
    barColor: 'bg-muted-foreground',
    nodeBg: 'bg-card',
  },
  locked: {
    icon: Lock,
    color: 'text-muted-foreground/60',
    bgColor: 'surface-low',
    barColor: 'bg-muted',
    nodeBg: 'surface-low',
  },
} as const;

export function getConceptStatus(concept: ConceptWithMastery): ConceptStatus {
  if (concept.isLocked) return 'locked';
  if (!concept.mastery) return 'available';
  if (concept.mastery.mastery_level >= 80) return 'mastered';
  if (concept.mastery.mastery_level >= 50) return 'in-progress';
  return 'started';
}

function ConceptNodeInner({ data }: NodeProps<ConceptNodeData>) {
  const { concept, status } = data;
  const config = statusConfig[status];
  const StatusIcon = config.icon;
  const mastery = concept.mastery?.mastery_level ?? 0;

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-3 !h-3" />
      <div
        className={`
          px-4 py-3 rounded-xl shadow-ambient
          min-w-[200px] max-w-[240px] transition-all
          ${config.nodeBg}
          ${status !== 'locked' ? 'cursor-pointer hover:shadow-lg' : 'opacity-50'}
        `}
      >
        <div className="flex items-start gap-2 mb-1.5">
          <div className={`h-6 w-6 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bgColor}`}>
            <StatusIcon className={`h-3.5 w-3.5 ${config.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm leading-tight truncate">{concept.name}</div>
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
              {concept.category.replace(/-/g, ' ')}
            </span>
          </div>
        </div>

        {status !== 'available' && status !== 'locked' && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-[11px] mb-0.5">
              <span className="text-muted-foreground">Mastery</span>
              <span className="font-medium">{Math.round(mastery)}%</span>
            </div>
            <div className="h-1.5 rounded-full surface-mid overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${config.barColor}`}
                style={{ width: `${mastery}%` }}
              />
            </div>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-3 !h-3" />
    </>
  );
}

export const ConceptNode = memo(ConceptNodeInner);
