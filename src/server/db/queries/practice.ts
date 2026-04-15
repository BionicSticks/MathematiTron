import { supabaseAdmin } from '../client';
import type { PracticeSession, PracticeProblem } from '../../../types/database';

export async function createPracticeSession(params: {
  user_id: string;
  concept_id: string;
  conversation_id?: string;
}): Promise<PracticeSession> {
  const { data, error } = await supabaseAdmin
    .from('practice_sessions')
    .insert({
      user_id: params.user_id,
      concept_id: params.concept_id,
      conversation_id: params.conversation_id ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getPracticeSession(sessionId: string): Promise<PracticeSession | null> {
  const { data } = await supabaseAdmin
    .from('practice_sessions')
    .select('*')
    .eq('id', sessionId)
    .single();

  return data;
}

export async function updatePracticeSession(
  sessionId: string,
  updates: Partial<Pick<PracticeSession, 'completed_at' | 'problems_attempted' | 'problems_correct'>>
): Promise<PracticeSession> {
  const { data, error } = await supabaseAdmin
    .from('practice_sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function savePracticeProblem(params: {
  user_id: string;
  session_id?: string;
  concept_id: string;
  problem_text: string;
  correct_answer: string;
  explanation?: string;
  hints?: string[];
  difficulty?: number;
}): Promise<PracticeProblem> {
  const { data, error } = await supabaseAdmin
    .from('practice_problems')
    .insert({
      user_id: params.user_id,
      session_id: params.session_id ?? null,
      concept_id: params.concept_id,
      problem_text: params.problem_text,
      correct_answer: params.correct_answer,
      explanation: params.explanation ?? null,
      hints: params.hints ?? null,
      difficulty: params.difficulty ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getPracticeProblem(problemId: string): Promise<PracticeProblem | null> {
  const { data } = await supabaseAdmin
    .from('practice_problems')
    .select('*')
    .eq('id', problemId)
    .single();

  return data;
}

/**
 * Close abandoned sessions — any session older than 2 hours without a completed_at.
 * Called when starting a new session to clean up stale state.
 */
export async function closeAbandonedSessions(userId: string): Promise<number> {
  const cutoff = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabaseAdmin
    .from('practice_sessions')
    .update({ completed_at: new Date().toISOString() })
    .eq('user_id', userId)
    .is('completed_at', null)
    .lt('started_at', cutoff)
    .select('id');

  if (error) {
    console.error('Failed to close abandoned sessions:', error);
    return 0;
  }
  return data?.length ?? 0;
}

export async function updatePracticeProblem(
  problemId: string,
  updates: Partial<Pick<PracticeProblem, 'user_answer' | 'is_correct' | 'time_spent_seconds' | 'attempted_at'>>
): Promise<PracticeProblem> {
  const { data, error } = await supabaseAdmin
    .from('practice_problems')
    .update(updates)
    .eq('id', problemId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
