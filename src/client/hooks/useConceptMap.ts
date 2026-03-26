import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import type { ConceptMapData } from '../../types/api';

export function useConceptMap() {
  return useQuery({
    queryKey: ['concept-map'],
    queryFn: () => apiFetch<ConceptMapData>('/api/curriculum/map'),
    staleTime: 60_000,
  });
}
