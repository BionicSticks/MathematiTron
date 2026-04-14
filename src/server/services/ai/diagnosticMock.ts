import type { DiagnosticQuestion } from '../../../types/api';
import type { DiagnosticAIResult } from './diagnostic';

// Questions ordered by difficulty — the mock escalates through these.
// If the student keeps answering correctly, harder questions surface.
const QUESTION_POOL: DiagnosticQuestion[] = [
  // Tier 1: Pre-algebra / basics (d1-3)
  {
    questionNumber: 1,
    totalExpected: 8,
    categoryBeingProbed: 'pre-algebra',
    conceptId: 'pre-alg-02',
    questionText: 'What is $\\frac{3}{4} + \\frac{2}{3}$? Give your answer as a fraction.',
    questionType: 'short_answer',
    difficulty: 2,
  },
  {
    questionNumber: 2,
    totalExpected: 8,
    categoryBeingProbed: 'algebra',
    conceptId: 'alg-01',
    questionText: 'Solve for $x$: $2x + 7 = 15$',
    questionType: 'math_expression',
    difficulty: 3,
  },
  // Tier 2: Mid-level (d4-5)
  {
    questionNumber: 3,
    totalExpected: 8,
    categoryBeingProbed: 'geometry',
    conceptId: 'geo-05',
    questionText: 'A right triangle has legs of length 3 and 4. What is the length of the hypotenuse?',
    questionType: 'multiple_choice',
    options: ['5', '6', '7', '$\\sqrt{7}$'],
    difficulty: 5,
  },
  {
    questionNumber: 4,
    totalExpected: 8,
    categoryBeingProbed: 'algebra',
    conceptId: 'alg-04',
    questionText: 'Solve the system:\n$$2x + y = 7$$\n$$x - y = 2$$',
    questionType: 'short_answer',
    difficulty: 5,
  },
  // Tier 3: Intermediate (d6-7)
  {
    questionNumber: 5,
    totalExpected: 8,
    categoryBeingProbed: 'algebra',
    conceptId: 'alg-05',
    questionText: 'Factorise: $x^2 + 5x + 6$',
    questionType: 'math_expression',
    difficulty: 6,
  },
  {
    questionNumber: 6,
    totalExpected: 8,
    categoryBeingProbed: 'trigonometry',
    conceptId: 'trig-01',
    questionText: 'In a right triangle, if the opposite side is 5 and the hypotenuse is 13, what is $\\sin(\\theta)$?',
    questionType: 'multiple_choice',
    options: ['$\\frac{5}{13}$', '$\\frac{12}{13}$', '$\\frac{5}{12}$', '$\\frac{13}{5}$'],
    difficulty: 6,
  },
  {
    questionNumber: 7,
    totalExpected: 8,
    categoryBeingProbed: 'probability-statistics',
    conceptId: 'probstat-01',
    questionText: 'A fair die is rolled twice. What is the probability that the sum is 7?',
    questionType: 'short_answer',
    difficulty: 7,
  },
  // Tier 4: Advanced (d8-9) — student only reaches these if they're doing well
  {
    questionNumber: 8,
    totalExpected: 10,
    categoryBeingProbed: 'calculus',
    conceptId: 'calc-02',
    questionText: 'What is the derivative of $f(x) = x^3 + 2x$?',
    questionType: 'multiple_choice',
    options: ['$3x^2 + 2$', '$3x^2 + 2x$', '$x^2 + 2$', '$3x + 2$'],
    difficulty: 8,
  },
  {
    questionNumber: 9,
    totalExpected: 10,
    categoryBeingProbed: 'linear-algebra',
    conceptId: 'linalg-02',
    questionText: 'Given $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$, what is $\\det(A)$?',
    questionType: 'math_expression',
    difficulty: 8,
  },
  {
    questionNumber: 10,
    totalExpected: 10,
    categoryBeingProbed: 'calculus',
    conceptId: 'calc-04',
    questionText: 'Evaluate: $\\int_0^1 (3x^2 + 1)\\, dx$',
    questionType: 'math_expression',
    difficulty: 9,
  },
];

function buildCompletionResult(questionsAnswered: number): DiagnosticAIResult {
  // Simulate different results based on how far the student got
  // More questions answered = higher estimated mastery
  const reachedAdvanced = questionsAnswered >= 8;
  const reachedIntermediate = questionsAnswered >= 5;

  return {
    type: 'complete',
    data: {
      conceptMastery: [
        { conceptId: 'pre-alg-01', conceptName: 'Basic Operations', category: 'pre-algebra', estimatedMastery: 90 },
        { conceptId: 'pre-alg-02', conceptName: 'Fractions & Decimals', category: 'pre-algebra', estimatedMastery: 85 },
        { conceptId: 'pre-alg-04', conceptName: 'Order of Operations', category: 'pre-algebra', estimatedMastery: 80 },
        { conceptId: 'alg-01', conceptName: 'Variables & Expressions', category: 'algebra', estimatedMastery: 80 },
        { conceptId: 'alg-02', conceptName: 'Solving Linear Equations', category: 'algebra', estimatedMastery: 75 },
        { conceptId: 'alg-04', conceptName: 'Systems of Equations', category: 'algebra', estimatedMastery: reachedIntermediate ? 65 : 35 },
        { conceptId: 'alg-05', conceptName: 'Quadratic Equations', category: 'algebra', estimatedMastery: reachedIntermediate ? 55 : 25 },
        { conceptId: 'geo-01', conceptName: 'Basic Shapes', category: 'geometry', estimatedMastery: 85 },
        { conceptId: 'geo-05', conceptName: 'Pythagorean Theorem', category: 'geometry', estimatedMastery: 80 },
        { conceptId: 'trig-01', conceptName: 'Trigonometric Ratios', category: 'trigonometry', estimatedMastery: reachedIntermediate ? 50 : 20 },
        { conceptId: 'probstat-01', conceptName: 'Probability Theory', category: 'probability-statistics', estimatedMastery: reachedIntermediate ? 45 : 15 },
        { conceptId: 'calc-01', conceptName: 'Limits', category: 'calculus', estimatedMastery: reachedAdvanced ? 40 : 10 },
        { conceptId: 'calc-02', conceptName: 'Derivatives Basics', category: 'calculus', estimatedMastery: reachedAdvanced ? 35 : 5 },
        { conceptId: 'linalg-01', conceptName: 'Vectors & Matrices', category: 'linear-algebra', estimatedMastery: reachedAdvanced ? 30 : 5 },
      ],
      summary: reachedAdvanced
        ? 'You have strong foundations in algebra and geometry, and are beginning to engage with calculus and linear algebra. Your pre-algebra skills are solid. Focus areas are trigonometry, probability, and building fluency with calculus concepts.'
        : 'You have a good grasp of pre-algebra and basic algebra. Geometry fundamentals are solid. Key areas for growth include systems of equations, quadratic factoring, and trigonometry.',
      strengths: [
        'Strong arithmetic and pre-algebra foundations',
        'Good algebraic intuition with expressions and linear equations',
        'Solid geometric reasoning',
        ...(reachedAdvanced ? ['Beginning to work with calculus concepts'] : []),
      ],
      gaps: [
        'Trigonometric ratios and applications',
        ...(reachedIntermediate
          ? ['Probability concepts need development', 'Quadratic equations and factoring']
          : ['Systems of equations', 'More complex algebraic manipulation']),
        ...(reachedAdvanced ? ['Calculus — derivatives and integration'] : []),
      ],
    },
  };
}

/**
 * Mock diagnostic that escalates difficulty and completes after enough questions.
 * Simulates adaptive behaviour: always serves the next question in difficulty order.
 */
export async function generateDiagnosticStepMock(
  _goalType: string,
  _goalDescription: string | undefined,
  questionNumber: number,
  _conversationHistory: Array<{ role: string; content: string }>,
): Promise<DiagnosticAIResult> {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 600));

  // Complete after all pooled questions, or after at least 8
  if (questionNumber > QUESTION_POOL.length) {
    return buildCompletionResult(QUESTION_POOL.length);
  }

  const question = QUESTION_POOL[questionNumber - 1];
  return {
    type: 'question',
    question: { ...question, questionNumber },
  };
}
