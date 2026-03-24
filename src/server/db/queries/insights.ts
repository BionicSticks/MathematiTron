import { supabaseAdmin } from '../client';
import type { StudentInsight } from '../../../types/database';

export async function getInsights(userId: string, conceptId?: string): Promise<StudentInsight[]> {
  let query = supabaseAdmin
    .from('student_insights')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (conceptId) {
    query = query.eq('concept_id', conceptId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function saveInsight(params: {
  user_id: string;
  concept_id?: string;
  insight_type: StudentInsight['insight_type'];
  content: string;
  source_message_id?: string;
}): Promise<StudentInsight> {
  const { data, error } = await supabaseAdmin
    .from('student_insights')
    .insert({
      user_id: params.user_id,
      concept_id: params.concept_id ?? null,
      insight_type: params.insight_type,
      content: params.content,
      source_message_id: params.source_message_id ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
