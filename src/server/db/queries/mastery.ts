import { supabaseAdmin } from '../client';
import type { StudentMastery } from '../../../types/database';

export async function getAllMastery(userId: string): Promise<StudentMastery[]> {
  const { data, error } = await supabaseAdmin
    .from('student_mastery')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data ?? [];
}

export async function getMastery(userId: string, conceptId: string): Promise<StudentMastery | null> {
  const { data } = await supabaseAdmin
    .from('student_mastery')
    .select('*')
    .eq('user_id', userId)
    .eq('concept_id', conceptId)
    .single();

  return data;
}

export async function upsertMastery(
  userId: string,
  conceptId: string,
  updates: Partial<Pick<StudentMastery, 'mastery_level' | 'confidence' | 'total_attempts' | 'correct_attempts' | 'total_time_seconds' | 'last_practiced_at'>>
): Promise<StudentMastery> {
  // Check if exists
  const existing = await getMastery(userId, conceptId);

  if (existing) {
    const { data, error } = await supabaseAdmin
      .from('student_mastery')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const { data, error } = await supabaseAdmin
    .from('student_mastery')
    .insert({
      user_id: userId,
      concept_id: conceptId,
      mastery_level: 0,
      confidence: 0,
      total_attempts: 0,
      correct_attempts: 0,
      total_time_seconds: 0,
      ...updates,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMasteredCount(userId: string): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from('student_mastery')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('mastery_level', 80);

  if (error) throw error;
  return count ?? 0;
}
