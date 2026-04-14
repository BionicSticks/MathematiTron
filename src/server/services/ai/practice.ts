import { anthropic, MODEL, MAX_TOKENS } from './client';
import { randomUUID } from 'crypto';
import type { GeneratedProblemWithAnswer } from './practiceMock';

const GENERATE_PROBLEM_TOOL = {
  name: 'generate_problem' as const,
  description: 'Generate a practice problem for the student. You MUST use this tool.',
  input_schema: {
    type: 'object' as const,
    properties: {
      problem_text: {
        type: 'string',
        description: 'The problem text. Use $...$ for inline LaTeX and $$...$$ for display LaTeX.',
      },
      correct_answer: {
        type: 'string',
        description: 'The correct answer. For numeric answers, use a simple number or fraction. For expressions, use standard notation.',
      },
      explanation: {
        type: 'string',
        description: 'Step-by-step solution explanation with LaTeX.',
      },
      hints: {
        type: 'array',
        items: { type: 'string' },
        description: 'Exactly 3 progressive hints: gentle nudge, specific method, nearly gives it away.',
      },
      difficulty: {
        type: 'number',
        description: 'Difficulty 1-10.',
      },
    },
    required: ['problem_text', 'correct_answer', 'explanation', 'hints', 'difficulty'],
  },
};

const CHECK_ANSWER_TOOL = {
  name: 'check_answer' as const,
  description: 'Judge whether the student answer is mathematically equivalent to the correct answer.',
  input_schema: {
    type: 'object' as const,
    properties: {
      is_correct: { type: 'boolean' },
      explanation: {
        type: 'string',
        description: 'Brief explanation of why the answer is correct or incorrect.',
      },
    },
    required: ['is_correct', 'explanation'],
  },
};

export async function generateProblem(
  conceptId: string,
  conceptName: string,
  conceptDescription: string,
  difficulty: number,
  masteryLevel: number,
  previousProblems?: string[],
): Promise<GeneratedProblemWithAnswer> {
  const systemPrompt = `You are a math problem generator for MathematiTron. Generate a single practice problem.

## Concept
- **ID**: ${conceptId}
- **Name**: ${conceptName}
- **Description**: ${conceptDescription}

## Requirements
- Target difficulty: ${difficulty}/10
- Student's current mastery: ${masteryLevel}%
- Use LaTeX notation ($...$ for inline, $$...$$ for display)
- The answer should be a number, fraction, or simple expression that can be typed
- Provide exactly 3 hints: gentle nudge → specific method → nearly gives it away
- Each hint should use LaTeX where helpful
${previousProblems?.length ? `\n## Avoid these recent problems:\n${previousProblems.map(p => `- ${p}`).join('\n')}` : ''}

Use the generate_problem tool with your problem.`;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    messages: [{ role: 'user', content: 'Generate a practice problem.' }],
    tools: [GENERATE_PROBLEM_TOOL],
    tool_choice: { type: 'tool' as const, name: 'generate_problem' },
  });

  const toolUse = response.content.find(b => b.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error('AI did not generate a problem');
  }

  const input = toolUse.input as {
    problem_text: string;
    correct_answer: string;
    explanation: string;
    hints: string[];
    difficulty: number;
  };

  return {
    id: randomUUID(),
    problem_text: input.problem_text,
    correct_answer: input.correct_answer,
    explanation: input.explanation,
    hints: input.hints.slice(0, 3),
    difficulty: input.difficulty,
  };
}

export async function checkAnswerWithAI(
  problemText: string,
  correctAnswer: string,
  userAnswer: string,
): Promise<{ isCorrect: boolean; explanation: string }> {
  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: 'You are a math answer checker. Determine if the student answer is mathematically equivalent to the correct answer. Use the check_answer tool.',
    messages: [{
      role: 'user',
      content: `Problem: ${problemText}\nCorrect answer: ${correctAnswer}\nStudent answer: ${userAnswer}\n\nIs the student's answer correct?`,
    }],
    tools: [CHECK_ANSWER_TOOL],
    tool_choice: { type: 'tool' as const, name: 'check_answer' },
  });

  const toolUse = response.content.find(b => b.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error('AI did not check the answer');
  }

  const input = toolUse.input as { is_correct: boolean; explanation: string };
  return { isCorrect: input.is_correct, explanation: input.explanation ?? '' };
}
