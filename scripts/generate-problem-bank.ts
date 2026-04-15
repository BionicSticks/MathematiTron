/**
 * Batch Problem Generator
 *
 * Generates static problems using Claude and stores them in Supabase.
 * Run with: npx tsx --env-file=.env.local scripts/generate-problem-bank.ts [conceptId] [count]
 *
 * Examples:
 *   npx tsx --env-file=.env.local scripts/generate-problem-bank.ts              # all concepts, 20 each
 *   npx tsx --env-file=.env.local scripts/generate-problem-bank.ts alg-02 30    # 30 problems for alg-02
 *   npx tsx --env-file=.env.local scripts/generate-problem-bank.ts --category algebra 25
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const MODEL = 'claude-sonnet-4-20250514';
const BATCH_SIZE = 10; // problems per API call
const DEFAULT_COUNT = 20; // problems per concept

interface GeneratedProblem {
  problem_text: string;
  correct_answer: string;
  explanation: string;
  hints: string[];
  difficulty: number;
  tags: string[];
}

async function getConcepts(filter?: { id?: string; category?: string }) {
  let query = supabase.from('concepts').select('*').order('display_order');
  if (filter?.id) query = query.eq('id', filter.id);
  if (filter?.category) query = query.eq('category', filter.category);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

async function getExistingCount(conceptId: string): Promise<number> {
  const { count } = await supabase
    .from('static_problem_bank')
    .select('*', { count: 'exact', head: true })
    .eq('concept_id', conceptId);
  return count ?? 0;
}

async function generateBatch(
  concept: { id: string; name: string; description: string; category: string; difficulty: number },
  count: number,
  existingProblems: string[],
): Promise<GeneratedProblem[]> {
  const diffMin = Math.max(1, concept.difficulty - 2);
  const diffMax = Math.min(10, concept.difficulty + 2);

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: `You are a math education expert creating practice problems. Generate exactly ${count} unique problems for the given math concept.

Rules:
- Each problem must be self-contained and clearly stated
- Use LaTeX notation in $...$ for inline math and $$...$$ for display math
- Answers must be simple, checkable strings (numbers, fractions like "3/4", simple expressions like "2x+1")
- Provide exactly 3 progressive hints: gentle nudge, structural help, near-complete walkthrough
- Explanations should teach, not just state the answer
- Vary difficulty between ${diffMin} and ${diffMax}
- Problems must be mathematically correct
- Don't duplicate these existing problems: ${existingProblems.slice(0, 10).join(' | ')}

Respond with a JSON array only, no other text. Each item:
{
  "problem_text": "...",
  "correct_answer": "...",
  "explanation": "...",
  "hints": ["hint1", "hint2", "hint3"],
  "difficulty": N,
  "tags": ["tag1", "tag2"]
}`,
    messages: [{
      role: 'user',
      content: `Generate ${count} practice problems for:
Concept: ${concept.name} (${concept.id})
Category: ${concept.category}
Description: ${concept.description}
Base difficulty: ${concept.difficulty}/10`,
    }],
  });

  const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    console.error(`  Failed to parse response for ${concept.id}`);
    return [];
  }

  try {
    const problems: GeneratedProblem[] = JSON.parse(jsonMatch[0]);
    return problems.filter(p =>
      p.problem_text && p.correct_answer && p.explanation &&
      Array.isArray(p.hints) && p.hints.length >= 3 &&
      typeof p.difficulty === 'number'
    );
  } catch {
    console.error(`  JSON parse error for ${concept.id}`);
    return [];
  }
}

async function main() {
  const args = process.argv.slice(2);
  let filter: { id?: string; category?: string } = {};
  let targetCount = DEFAULT_COUNT;

  // Parse args
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--category' && args[i + 1]) {
      filter.category = args[++i];
    } else if (args[i].match(/^\d+$/)) {
      targetCount = parseInt(args[i]);
    } else if (args[i].match(/^[a-z]+-\d+$/)) {
      filter.id = args[i];
    }
  }

  console.log('MathematiTron — Static Problem Bank Generator');
  console.log('=============================================\n');

  const concepts = await getConcepts(filter);
  console.log(`Concepts to process: ${concepts.length}`);
  console.log(`Target problems per concept: ${targetCount}\n`);

  let totalGenerated = 0;
  let totalErrors = 0;

  for (const concept of concepts) {
    const existing = await getExistingCount(concept.id);
    const needed = Math.max(0, targetCount - existing);

    if (needed === 0) {
      console.log(`✓ ${concept.id} (${concept.name}): ${existing} problems — already at target`);
      continue;
    }

    console.log(`→ ${concept.id} (${concept.name}): ${existing} existing, generating ${needed} more...`);

    // Get existing problem texts to avoid duplicates
    const { data: existingData } = await supabase
      .from('static_problem_bank')
      .select('problem_text')
      .eq('concept_id', concept.id);
    const existingTexts = (existingData ?? []).map(p => p.problem_text);

    // Generate in batches
    let generated = 0;
    while (generated < needed) {
      const batchCount = Math.min(BATCH_SIZE, needed - generated);

      try {
        const problems = await generateBatch(concept, batchCount, existingTexts);

        if (problems.length > 0) {
          const rows = problems.map(p => ({
            concept_id: concept.id,
            problem_text: p.problem_text,
            correct_answer: p.correct_answer,
            explanation: p.explanation,
            hints: p.hints,
            difficulty: p.difficulty,
            tags: p.tags ?? [],
            source: 'ai_batch' as const,
          }));

          const { error } = await supabase
            .from('static_problem_bank')
            .insert(rows);

          if (error) {
            console.error(`  DB insert error: ${error.message}`);
            totalErrors++;
          } else {
            generated += problems.length;
            totalGenerated += problems.length;
            existingTexts.push(...problems.map(p => p.problem_text));
            console.log(`  +${problems.length} problems (${generated}/${needed})`);
          }
        }
      } catch (err) {
        console.error(`  Generation error: ${(err as Error).message}`);
        totalErrors++;
        // Rate limit backoff
        await new Promise(r => setTimeout(r, 5000));
      }

      // Small delay between batches to respect rate limits
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  console.log(`\nDone! Generated ${totalGenerated} problems, ${totalErrors} errors.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
