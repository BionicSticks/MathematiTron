import { supabaseAdmin } from '../client';
import type { DailyActivity } from '../../../types/database';

export async function getRecentActivity(userId: string, days = 30): Promise<DailyActivity[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabaseAdmin
    .from('daily_activity')
    .select('*')
    .eq('user_id', userId)
    .gte('activity_date', since.toISOString().split('T')[0])
    .order('activity_date', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function upsertDailyActivity(
  userId: string,
  updates: {
    time_seconds?: number;
    problems_attempted?: number;
    problems_correct?: number;
    messages_sent?: number;
    concept_id?: string;
  }
): Promise<void> {
  const today = new Date().toISOString().split('T')[0];

  // Try to get existing record
  const { data: existing } = await supabaseAdmin
    .from('daily_activity')
    .select('*')
    .eq('user_id', userId)
    .eq('activity_date', today)
    .single();

  if (existing) {
    const conceptsTouched = new Set(existing.concepts_touched ?? []);
    if (updates.concept_id) conceptsTouched.add(updates.concept_id);

    await supabaseAdmin
      .from('daily_activity')
      .update({
        total_time_seconds: existing.total_time_seconds + (updates.time_seconds ?? 0),
        problems_attempted: existing.problems_attempted + (updates.problems_attempted ?? 0),
        problems_correct: existing.problems_correct + (updates.problems_correct ?? 0),
        messages_sent: existing.messages_sent + (updates.messages_sent ?? 0),
        concepts_touched: Array.from(conceptsTouched),
      })
      .eq('id', existing.id);
  } else {
    await supabaseAdmin
      .from('daily_activity')
      .insert({
        user_id: userId,
        activity_date: today,
        total_time_seconds: updates.time_seconds ?? 0,
        problems_attempted: updates.problems_attempted ?? 0,
        problems_correct: updates.problems_correct ?? 0,
        messages_sent: updates.messages_sent ?? 0,
        concepts_touched: updates.concept_id ? [updates.concept_id] : [],
      });
  }
}

export async function calculateStreak(userId: string): Promise<{ current: number; longest: number }> {
  const { data, error } = await supabaseAdmin
    .from('daily_activity')
    .select('activity_date')
    .eq('user_id', userId)
    .order('activity_date', { ascending: false });

  if (error || !data?.length) return { current: 0, longest: 0 };

  const dates = data.map(d => d.activity_date);
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let current = 0;
  let longest = 0;
  let streak = 0;

  // Check if streak is active (activity today or yesterday)
  const streakActive = dates[0] === today || dates[0] === yesterday;

  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      streak = 1;
    } else {
      const prevDate = new Date(dates[i - 1]);
      const currDate = new Date(dates[i]);
      const diffDays = (prevDate.getTime() - currDate.getTime()) / 86400000;

      if (diffDays === 1) {
        streak++;
      } else {
        if (i === 1 || current === 0) {
          current = streakActive ? streak : 0;
        }
        longest = Math.max(longest, streak);
        streak = 1;
      }
    }
  }

  if (current === 0 && streakActive) current = streak;
  longest = Math.max(longest, streak);

  return { current, longest };
}
