import { randomUUID } from 'crypto';

export interface StaticProblem {
  problem_text: string;
  correct_answer: string;
  explanation: string;
  hints: [string, string, string];
  difficulty: number;
}

export interface GeneratedProblemWithAnswer {
  id: string;
  problem_text: string;
  hints: string[];
  difficulty: number;
  correct_answer: string;
  explanation: string;
}

// All problem pools — loaded at startup
let allProblems: Record<string, StaticProblem[]> = {};

// Async initializer — call once at startup
export async function initProblemBank(): Promise<void> {
  allProblems = {};

  const modules = await Promise.allSettled([
    import('./pools/preAlgebra').then(m => m.PRE_ALGEBRA_PROBLEMS),
    import('./pools/algebra').then(m => m.ALGEBRA_PROBLEMS),
    import('./pools/geometry').then(m => m.GEOMETRY_PROBLEMS),
    import('./pools/trigonometry').then(m => m.TRIGONOMETRY_PROBLEMS),
    import('./pools/calculus').then(m => m.CALCULUS_PROBLEMS),
    import('./pools/linearAlgebra').then(m => m.LINEAR_ALGEBRA_PROBLEMS),
    import('./pools/discrete').then(m => m.DISCRETE_PROBLEMS),
    import('./pools/probStats').then(m => m.PROB_STATS_PROBLEMS),
    import('./pools/advanced').then(m => m.ADVANCED_PROBLEMS),
    import('./pools/legacy').then(m => m.LEGACY_PROBLEMS),
  ]);

  for (const result of modules) {
    if (result.status === 'fulfilled') {
      Object.assign(allProblems, result.value);
    }
  }

  const conceptCount = Object.keys(allProblems).length;
  const problemCount = Object.values(allProblems).reduce((sum, pool) => sum + pool.length, 0);
  console.log(`Problem bank loaded: ${problemCount} problems across ${conceptCount} concepts`);
}

/**
 * Get a problem from the static bank for a given concept.
 * Filters by approximate difficulty and avoids previously seen problems.
 */
export function getStaticProblem(
  conceptId: string,
  targetDifficulty: number,
  previousProblemTexts?: string[],
): GeneratedProblemWithAnswer | null {
  const pool = allProblems[conceptId];
  if (!pool || pool.length === 0) return null;

  const usedSet = new Set(previousProblemTexts ?? []);

  // Filter out already-seen problems
  let candidates = pool.filter(p => !usedSet.has(p.problem_text));
  if (candidates.length === 0) candidates = pool; // cycle if exhausted

  // Sort by closest difficulty match
  candidates.sort((a, b) =>
    Math.abs(a.difficulty - targetDifficulty) - Math.abs(b.difficulty - targetDifficulty)
  );

  // Pick from top 3 closest (with randomness)
  const topN = candidates.slice(0, Math.min(3, candidates.length));
  const problem = topN[Math.floor(Math.random() * topN.length)];

  return {
    id: randomUUID(),
    problem_text: problem.problem_text,
    hints: problem.hints,
    difficulty: problem.difficulty,
    correct_answer: problem.correct_answer,
    explanation: problem.explanation,
  };
}

/**
 * Check if a concept has static problems available.
 */
export function hasStaticProblems(conceptId: string): boolean {
  return (allProblems[conceptId]?.length ?? 0) > 0;
}

/**
 * Get all concept IDs that have static problems.
 */
export function getConceptsWithProblems(): string[] {
  return Object.keys(allProblems).filter(k => allProblems[k].length > 0);
}
