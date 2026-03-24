import { supabaseAdmin } from '../client';
import type { Profile, StudentGoal } from '../../../types/database';

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return null;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getActiveGoal(userId: string): Promise<StudentGoal | null> {
  const { data } = await supabaseAdmin
    .from('student_goals')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return data;
}

export async function createGoal(userId: string, goal: {
  goal_type: StudentGoal['goal_type'];
  goal_description?: string;
  target_date?: string;
}): Promise<StudentGoal> {
  // Deactivate existing goals
  await supabaseAdmin
    .from('student_goals')
    .update({ is_active: false })
    .eq('user_id', userId)
    .eq('is_active', true);

  const { data, error } = await supabaseAdmin
    .from('student_goals')
    .insert({
      user_id: userId,
      goal_type: goal.goal_type,
      goal_description: goal.goal_description ?? null,
      target_date: goal.target_date ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
