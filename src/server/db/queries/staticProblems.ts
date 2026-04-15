import { supabaseAdmin } from '../client';
import type { StaticBankProblem } from '../../../types/database';

/**
 * Get problems from the static bank for a concept, optionally filtered by difficulty range.
 */
export async function getStaticBankProblems(
  conceptId: string,
  options?: {
    minDifficulty?: number;
    maxDifficulty?: number;
    limit?: number;
    excludeIds?: string[];
  }
): Promise<StaticBankProblem[]> {
  let query = supabaseAdmin
    .from('static_problem_bank')
    .select('*')
    .eq('concept_id', conceptId)
    .order('difficulty', { ascending: true });

  if (options?.minDifficulty) query = query.gte('difficulty', options.minDifficulty);
  if (options?.maxDifficulty) query = query.lte('difficulty', options.maxDifficulty);
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error) throw error;

  let results = data ?? [];

  // Exclude already-seen problems
  if (options?.excludeIds?.length) {
    const excludeSet = new Set(options.excludeIds);
    results = results.filter(p => !excludeSet.has(p.id));
  }

  return results;
}

/**
 * Get a single random problem closest to the target difficulty.
 */
export async function getRandomStaticProblem(
  conceptId: string,
  targetDifficulty: number,
  excludeIds?: string[],
): Promise<StaticBankProblem | null> {
  const problems = await getStaticBankProblems(conceptId, {
    minDifficulty: Math.max(1, targetDifficulty - 2),
    maxDifficulty: Math.min(10, targetDifficulty + 2),
    limit: 20,
    excludeIds,
  });

  if (problems.length === 0) return null;

  // Sort by proximity to target difficulty, pick randomly from top candidates
  problems.sort((a, b) =>
    Math.abs(a.difficulty - targetDifficulty) - Math.abs(b.difficulty - targetDifficulty)
  );

  const topN = problems.slice(0, Math.min(5, problems.length));
  return topN[Math.floor(Math.random() * topN.length)];
}

/**
 * Count problems available for a concept.
 */
export async function countStaticProblems(conceptId: string): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from('static_problem_bank')
    .select('*', { count: 'exact', head: true })
    .eq('concept_id', conceptId);

  if (error) return 0;
  return count ?? 0;
}

/**
 * Insert problems into the static bank (used by batch generator).
 */
export async function insertStaticProblems(
  problems: Array<{
    concept_id: string;
    problem_text: string;
    correct_answer: string;
    explanation: string;
    hints: string[];
    difficulty: number;
    source: 'manual' | 'ai_batch' | 'ai_realtime';
    tags?: string[];
  }>
): Promise<number> {
  const { data, error } = await supabaseAdmin
    .from('static_problem_bank')
    .insert(problems)
    .select('id');

  if (error) throw error;
  return data?.length ?? 0;
}
