/**
 * Seeds the static_problem_bank table from the in-memory problem pools.
 * Run this once to populate the DB with the hand-written problems.
 *
 * Usage: npx tsx --env-file=.env.local scripts/seed-problem-bank.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function loadPools(): Promise<Record<string, Array<{
  problem_text: string;
  correct_answer: string;
  explanation: string;
  hints: string[];
  difficulty: number;
}>>> {
  const all: Record<string, any[]> = {};

  const modules = await Promise.allSettled([
    import('../src/server/services/problems/pools/preAlgebra').then(m => m.PRE_ALGEBRA_PROBLEMS),
    import('../src/server/services/problems/pools/algebra').then(m => m.ALGEBRA_PROBLEMS),
    import('../src/server/services/problems/pools/geometry').then(m => m.GEOMETRY_PROBLEMS),
    import('../src/server/services/problems/pools/trigonometry').then(m => m.TRIGONOMETRY_PROBLEMS),
    import('../src/server/services/problems/pools/calculus').then(m => m.CALCULUS_PROBLEMS),
    import('../src/server/services/problems/pools/linearAlgebra').then(m => m.LINEAR_ALGEBRA_PROBLEMS),
    import('../src/server/services/problems/pools/discrete').then(m => m.DISCRETE_PROBLEMS),
    import('../src/server/services/problems/pools/probStats').then(m => m.PROB_STATS_PROBLEMS),
    import('../src/server/services/problems/pools/advanced').then(m => m.ADVANCED_PROBLEMS),
  ]);

  for (const result of modules) {
    if (result.status === 'fulfilled') {
      Object.assign(all, result.value);
    }
  }

  return all;
}

async function main() {
  console.log('Seeding static_problem_bank from in-memory pools...\n');

  const pools = await loadPools();
  const conceptIds = Object.keys(pools);
  console.log(`Found ${conceptIds.length} concepts with problems\n`);

  let totalInserted = 0;
  let totalSkipped = 0;

  for (const conceptId of conceptIds) {
    const problems = pools[conceptId];

    // Check what already exists
    const { count } = await supabase
      .from('static_problem_bank')
      .select('*', { count: 'exact', head: true })
      .eq('concept_id', conceptId)
      .eq('source', 'manual');

    const existingCount = count ?? 0;

    if (existingCount >= problems.length) {
      console.log(`  ${conceptId}: ${existingCount} already seeded, skipping`);
      totalSkipped += problems.length;
      continue;
    }

    // Get existing problem texts to avoid duplicates
    const { data: existing } = await supabase
      .from('static_problem_bank')
      .select('problem_text')
      .eq('concept_id', conceptId);
    const existingTexts = new Set((existing ?? []).map(p => p.problem_text));

    const newProblems = problems
      .filter(p => !existingTexts.has(p.problem_text))
      .map(p => ({
        concept_id: conceptId,
        problem_text: p.problem_text,
        correct_answer: p.correct_answer,
        explanation: p.explanation,
        hints: p.hints,
        difficulty: p.difficulty,
        source: 'manual' as const,
        quality_score: 8, // hand-written = high quality
      }));

    if (newProblems.length === 0) {
      console.log(`  ${conceptId}: all problems already exist`);
      continue;
    }

    const { error } = await supabase
      .from('static_problem_bank')
      .insert(newProblems);

    if (error) {
      console.error(`  ${conceptId}: ERROR — ${error.message}`);
    } else {
      console.log(`  ${conceptId}: +${newProblems.length} problems`);
      totalInserted += newProblems.length;
    }
  }

  console.log(`\nDone! Inserted ${totalInserted}, skipped ${totalSkipped}.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
