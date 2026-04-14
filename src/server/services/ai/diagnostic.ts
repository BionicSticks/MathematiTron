import { anthropic, MODEL, MAX_TOKENS } from './client';
import { getAllConcepts, getCategories } from '../curriculum/graph';
import type { Concept } from '../../../types/database';
import type { DiagnosticQuestion } from '../../../types/api';

// Claude tool definitions for structured diagnostic output

const EMIT_QUESTION_TOOL = {
  name: 'emit_question' as const,
  description: 'Generate the next diagnostic question for the student. You MUST use this tool for every question.',
  input_schema: {
    type: 'object' as const,
    properties: {
      questionText: {
        type: 'string',
        description: 'The question text. Use $...$ for inline LaTeX and $$...$$ for display LaTeX.',
      },
      questionType: {
        type: 'string',
        enum: ['multiple_choice', 'short_answer', 'math_expression'],
        description: 'multiple_choice for quick assessment, short_answer for conceptual questions, math_expression for computation.',
      },
      options: {
        type: 'array',
        items: { type: 'string' },
        description: 'Exactly 4 options for multiple_choice questions. Omit for other types.',
      },
      categoryBeingProbed: {
        type: 'string',
        description: 'The category ID being assessed (e.g. "algebra-foundations").',
      },
      conceptId: {
        type: 'string',
        description: 'The specific concept ID if identifiable, or null.',
      },
      difficulty: {
        type: 'number',
        description: 'Difficulty rating from 1 (basic) to 10 (advanced).',
      },
      totalExpected: {
        type: 'number',
        description: 'Your estimate of total questions for this diagnostic (typically 6-10).',
      },
    },
    required: ['questionText', 'questionType', 'categoryBeingProbed', 'difficulty', 'totalExpected'],
  },
};

const COMPLETE_DIAGNOSTIC_TOOL = {
  name: 'complete_diagnostic' as const,
  description: 'Complete the diagnostic and provide final assessment. Use after 6-10 questions when you have enough data.',
  input_schema: {
    type: 'object' as const,
    properties: {
      conceptMastery: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            conceptId: { type: 'string' },
            conceptName: { type: 'string' },
            category: { type: 'string' },
            estimatedMastery: { type: 'number', description: '0-100 estimated mastery level' },
          },
          required: ['conceptId', 'conceptName', 'category', 'estimatedMastery'],
        },
        description: 'Mastery estimates for concepts you assessed or can infer from the assessment.',
      },
      summary: {
        type: 'string',
        description: 'A 2-3 sentence summary of the student\'s overall level and key observations.',
      },
      strengths: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of 2-4 specific strengths identified.',
      },
      gaps: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of 2-4 specific areas needing work.',
      },
    },
    required: ['conceptMastery', 'summary', 'strengths', 'gaps'],
  },
};

const DIAGNOSTIC_TOOLS = [EMIT_QUESTION_TOOL, COMPLETE_DIAGNOSTIC_TOOL];

// Build a compact concept catalog for the system prompt
function buildConceptCatalog(concepts: Concept[], categories: string[]): string {
  const lines: string[] = ['## Available Concepts by Category\n'];

  for (const category of categories) {
    const catConcepts = concepts.filter(c => c.category === category);
    const label = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    lines.push(`### ${label}`);
    for (const c of catConcepts) {
      lines.push(`- **${c.id}**: ${c.name} (difficulty ${c.difficulty}/10) — ${c.description}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function buildDiagnosticSystemPrompt(goalType: string, goalDescription: string | undefined): string {
  const concepts = getAllConcepts();
  const categories = getCategories();
  const catalog = buildConceptCatalog(concepts, categories);

  const goalLabels: Record<string, string> = {
    sat_math: 'SAT Math Prep',
    act_math: 'ACT Math Prep',
    gcse_math: 'GCSE Maths',
    a_level_math: 'A-Level Maths',
    learn_topic: 'Learn a Specific Topic',
    grade_level: 'Catch Up to Grade Level',
    custom: 'Custom Goal',
  };

  return `You are MathematiTron's diagnostic assessment engine. Your job is to efficiently find the boundary of a student's mathematical knowledge — what they know and where they start to struggle.

## Student's Goal
- **Type**: ${goalLabels[goalType] ?? goalType}${goalDescription ? `\n- **Details**: ${goalDescription}` : ''}

## Your Assessment Strategy

1. **Start at mid-level**: Begin with a difficulty 4-5 question relevant to their goal.
2. **Escalate on correct answers**: If they answer correctly, jump to harder topics. Keep pushing until you find the ceiling — don't waste questions on material they clearly know.
3. **Probe down on mistakes**: If they answer incorrectly, test an easier prerequisite to find the boundary.
4. **Find the boundary, don't just survey**: The goal isn't to ask one question per category — it's to find the difficulty level where the student transitions from confident to struggling. Spend questions where the boundary is unclear.
5. **Cover breadth**: Touch multiple categories relevant to their goal, but prioritise finding limits over completeness.
6. **Mix question types**: Use multiple_choice for quick assessment, short_answer for conceptual understanding, and math_expression for computation.

## Rules
- You MUST use the \`emit_question\` tool for each question. Never output free text instead of using a tool.
- Use \`complete_diagnostic\` when you have a clear picture of the student's level (typically 6-10 questions, but use more if the boundary is unclear or the student is advancing rapidly).
- If a student answers all questions correctly at a given level, you MUST escalate to harder material. Never complete the diagnostic without finding where the student starts to struggle.
- For multiple_choice questions, provide exactly 4 options with plausible distractors.
- Use LaTeX notation ($...$) for mathematical expressions in questions and options.
- Keep questions clear and unambiguous.
- Don't teach or explain during the diagnostic — just assess.
- Reference specific concept IDs from the catalog when you can identify which concept you're testing.

${catalog}`;
}

type DiagnosticMessage = { role: 'user' | 'assistant'; content: string };

interface EmitQuestionInput {
  questionText: string;
  questionType: 'multiple_choice' | 'short_answer' | 'math_expression';
  options?: string[];
  categoryBeingProbed: string;
  conceptId?: string;
  difficulty: number;
  totalExpected: number;
}

interface CompleteDiagnosticInput {
  conceptMastery: Array<{
    conceptId: string;
    conceptName: string;
    category: string;
    estimatedMastery: number;
  }>;
  summary: string;
  strengths: string[];
  gaps: string[];
}

export type DiagnosticAIResult =
  | { type: 'question'; question: DiagnosticQuestion }
  | { type: 'complete'; data: CompleteDiagnosticInput };

export async function generateDiagnosticStep(
  goalType: string,
  goalDescription: string | undefined,
  questionNumber: number,
  conversationHistory: DiagnosticMessage[],
): Promise<DiagnosticAIResult> {
  const systemPrompt = buildDiagnosticSystemPrompt(goalType, goalDescription);

  // Build the messages array
  const messages = conversationHistory.length > 0
    ? conversationHistory.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))
    : [{ role: 'user' as const, content: 'Begin the diagnostic assessment. Ask the first question.' }];

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    messages,
    tools: DIAGNOSTIC_TOOLS,
    tool_choice: { type: 'any' as const },
  });

  // Find the tool use block
  const toolUse = response.content.find(block => block.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error('AI did not use a diagnostic tool');
  }

  if (toolUse.name === 'emit_question') {
    const input = toolUse.input as EmitQuestionInput;
    return {
      type: 'question',
      question: {
        questionNumber,
        totalExpected: input.totalExpected,
        categoryBeingProbed: input.categoryBeingProbed,
        conceptId: input.conceptId ?? null,
        questionText: input.questionText,
        questionType: input.questionType,
        options: input.options,
        difficulty: input.difficulty,
      },
    };
  }

  if (toolUse.name === 'complete_diagnostic') {
    return {
      type: 'complete',
      data: toolUse.input as CompleteDiagnosticInput,
    };
  }

  throw new Error(`Unexpected tool: ${toolUse.name}`);
}
