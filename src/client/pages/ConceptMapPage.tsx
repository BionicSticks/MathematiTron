import { useState } from 'react';
import { CheckCircle, Circle, Lock } from 'lucide-react';
import { Sidebar } from '../components/layout/Sidebar';
import { ConceptMapView } from '../components/concept-map/ConceptMapView';
import { ConceptDetailPanel } from '../components/concept-map/ConceptDetailPanel';
import { useConceptMap } from '../hooks/useConceptMap';
import type { ConceptWithMastery } from '../../types/api';

const legend = [
  { icon: CheckCircle, color: 'text-primary-dark', label: 'Mastered (80%+)' },
  { icon: Circle, color: 'text-secondary-dark', label: 'In Progress (50%+)' },
  { icon: Circle, color: 'text-amber-600', label: 'Started' },
  { icon: Circle, color: 'text-muted-foreground', label: 'Available' },
  { icon: Lock, color: 'text-muted-foreground/60', label: 'Locked' },
];

export function ConceptMapPage() {
  const { data, isLoading, error } = useConceptMap();
  const [selected, setSelected] = useState<ConceptWithMastery | null>(null);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        {/* Legend bar */}
        <div className="flex flex-wrap items-center gap-4 px-6 py-3 bg-card shadow-ambient text-sm">
          <h1 className="text-base font-semibold mr-2">Concept Map</h1>
          {legend.map(({ icon: Icon, color, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-muted-foreground">
              <Icon className={`h-4 w-4 ${color}`} />
              {label}
            </span>
          ))}
        </div>

        {/* Main content */}
        <div className="flex flex-1 min-h-0">
          {/* Map */}
          <div className="flex-1 relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-destructive">Failed to load concept map</p>
              </div>
            )}
            {data && (
              <ConceptMapView data={data} onNodeSelect={setSelected} />
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <ConceptDetailPanel
              concept={selected}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
