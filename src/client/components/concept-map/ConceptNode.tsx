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
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/60',
    barColor: 'bg-green-500',
  },
  'in-progress': {
    icon: Circle,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/60',
    barColor: 'bg-blue-500',
  },
  started: {
    icon: Circle,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/60',
    barColor: 'bg-amber-500',
  },
  available: {
    icon: Circle,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
    borderColor: 'border-border',
    barColor: 'bg-muted-foreground',
  },
  locked: {
    icon: Lock,
    color: 'text-muted-foreground/50',
    bgColor: 'bg-muted/50',
    borderColor: 'border-border/50',
    barColor: 'bg-muted',
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
          px-4 py-3 rounded-lg border-2 bg-background shadow-sm
          min-w-[200px] max-w-[240px] transition-shadow
          ${config.borderColor}
          ${status !== 'locked' ? 'cursor-pointer hover:shadow-md' : 'opacity-60'}
        `}
      >
        <div className="flex items-start gap-2 mb-1.5">
          <div className={`h-6 w-6 rounded flex items-center justify-center flex-shrink-0 ${config.bgColor}`}>
            <StatusIcon className={`h-3.5 w-3.5 ${config.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm leading-tight truncate">{concept.name}</div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
              {concept.category.replace(/-/g, ' ')}
            </span>
          </div>
        </div>

        {status !== 'available' && status !== 'locked' && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-[10px] mb-0.5">
              <span className="text-muted-foreground">Mastery</span>
              <span className="font-medium">{Math.round(mastery)}%</span>
            </div>
            <div className="h-1 rounded-full bg-muted overflow-hidden">
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
