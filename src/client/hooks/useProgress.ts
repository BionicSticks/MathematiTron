import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../lib/api';
import type { ProgressSummary } from '../../types/api';
import type { DailyActivity } from '../../types/database';

export function useProgressSummary() {
  return useQuery({
    queryKey: ['progress'],
    queryFn: () => apiFetch<ProgressSummary>('/api/progress'),
  });
}

export function useActivityHistory(days = 90) {
  return useQuery({
    queryKey: ['activity-history', days],
    queryFn: () => apiFetch<DailyActivity[]>(`/api/progress/history?days=${days}`),
  });
}
