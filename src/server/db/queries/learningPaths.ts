import { supabaseAdmin } from '../client';
import type { LearningPath } from '../../../types/database';

export async function getActiveLearningPath(userId: string): Promise<LearningPath | null> {
  const { data } = await supabaseAdmin
    .from('learning_paths')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return data;
}

export async function createLearningPath(params: {
  user_id: string;
  goal_id?: string;
  ordered_concept_ids: string[];
}): Promise<LearningPath> {
  // Deactivate existing paths
  await supabaseAdmin
    .from('learning_paths')
    .update({ is_active: false })
    .eq('user_id', params.user_id)
    .eq('is_active', true);

  const { data, error } = await supabaseAdmin
    .from('learning_paths')
    .insert({
      user_id: params.user_id,
      goal_id: params.goal_id ?? null,
      ordered_concept_ids: params.ordered_concept_ids,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateLearningPath(
  pathId: string,
  updates: Partial<Pick<LearningPath, 'ordered_concept_ids' | 'is_active'>>
): Promise<LearningPath> {
  const { data, error } = await supabaseAdmin
    .from('learning_paths')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', pathId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
