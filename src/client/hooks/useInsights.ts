import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import type { InsightsSummary } from '../../types/api';

export function useInsights() {
  return useQuery({
    queryKey: ['insights'],
    queryFn: () => apiFetch<InsightsSummary>('/api/insights'),
  });
}

export function useDismissInsight() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (insightId: string) =>
      apiFetch(`/api/insights/${insightId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insights'] });
    },
  });
}
