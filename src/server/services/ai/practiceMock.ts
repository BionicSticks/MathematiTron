import { randomUUID } from 'crypto';

interface MockProblem {
  problem_text: string;
  correct_answer: string;
  explanation: string;
  hints: [string, string, string];
  difficulty: number;
}

const PROBLEM_POOLS: Record<string, MockProblem[]> = {
  'pre-alg-02': [
    { problem_text: 'Simplify: $\\frac{2}{5} + \\frac{1}{3}$', correct_answer: '11/15', explanation: 'Find common denominator 15: $\\frac{6}{15} + \\frac{5}{15} = \\frac{11}{15}$', hints: ['Find a common denominator for 5 and 3.', 'The common denominator is 15. Convert each fraction.', '$\\frac{2}{5} = \\frac{6}{15}$ and $\\frac{1}{3} = \\frac{5}{15}$. Now add the numerators.'], difficulty: 2 },
    { problem_text: 'Simplify: $\\frac{3}{4} \\times \\frac{2}{7}$', correct_answer: '3/14', explanation: 'Multiply numerators and denominators: $\\frac{3 \\times 2}{4 \\times 7} = \\frac{6}{28} = \\frac{3}{14}$', hints: ['Multiply the numerators together, then the denominators.', '$3 \\times 2 = 6$ and $4 \\times 7 = 28$, giving $\\frac{6}{28}$.', 'Simplify by dividing both by 2: $\\frac{3}{14}$.'], difficulty: 2 },
    { problem_text: 'Simplify: $\\frac{5}{6} - \\frac{1}{4}$', correct_answer: '7/12', explanation: 'Common denominator 12: $\\frac{10}{12} - \\frac{3}{12} = \\frac{7}{12}$', hints: ['Find a common denominator for 6 and 4.', 'The LCM of 6 and 4 is 12.', '$\\frac{10}{12} - \\frac{3}{12} = \\frac{7}{12}$'], difficulty: 2 },
    { problem_text: 'Convert $\\frac{7}{4}$ to a mixed number.', correct_answer: '1 3/4', explanation: '$7 \\div 4 = 1$ remainder $3$, so $\\frac{7}{4} = 1\\frac{3}{4}$', hints: ['Divide the numerator by the denominator.', '$7 \\div 4 = 1$ with remainder $3$.', 'The whole number is 1 and the fraction part is $\\frac{3}{4}$.'], difficulty: 2 },
    { problem_text: 'What is $\\frac{2}{3}$ of 45?', correct_answer: '30', explanation: '$\\frac{2}{3} \\times 45 = \\frac{90}{3} = 30$', hints: ['Multiply 45 by the fraction.', '$45 \\times 2 = 90$.', '$\\frac{90}{3} = 30$.'], difficulty: 3 },
  ],
  'alg-01': [
    { problem_text: 'Simplify: $3x + 5 + 2x - 1$', correct_answer: '5x+4', explanation: 'Combine like terms: $3x + 2x = 5x$ and $5 - 1 = 4$, so $5x + 4$.', hints: ['Group the terms with $x$ together and the constants together.', '$3x + 2x = 5x$.', '$5 - 1 = 4$. So the answer is $5x + 4$.'], difficulty: 3 },
    { problem_text: 'Evaluate $2a + 3b$ when $a = 4$ and $b = -1$.', correct_answer: '5', explanation: '$2(4) + 3(-1) = 8 - 3 = 5$', hints: ['Substitute the given values for $a$ and $b$.', '$2(4) = 8$ and $3(-1) = -3$.', '$8 + (-3) = 5$.'], difficulty: 3 },
    { problem_text: 'Simplify: $4(x + 2) - 3x$', correct_answer: 'x+8', explanation: 'Distribute: $4x + 8 - 3x = x + 8$', hints: ['First distribute the 4.', '$4 \\times x + 4 \\times 2 = 4x + 8$.', '$4x + 8 - 3x = x + 8$.'], difficulty: 4 },
    { problem_text: 'Write an expression for "5 more than twice a number $n$".', correct_answer: '2n+5', explanation: 'Twice a number is $2n$, then add 5: $2n + 5$.', hints: ['"Twice a number" means multiply by 2.', 'That gives $2n$.', '"5 more than" means add 5: $2n + 5$.'], difficulty: 3 },
    { problem_text: 'Simplify: $-2(3x - 4) + x$', correct_answer: '-5x+8', explanation: 'Distribute: $-6x + 8 + x = -5x + 8$', hints: ['Distribute $-2$ to both terms inside the brackets.', '$-2 \\times 3x = -6x$ and $-2 \\times (-4) = 8$.', '$-6x + 8 + x = -5x + 8$.'], difficulty: 4 },
  ],
  'alg-02': [
    { problem_text: 'Solve for $x$: $3x + 5 = 20$', correct_answer: '5', explanation: '$3x = 15$, so $x = 5$.', hints: ['Subtract 5 from both sides.', '$3x = 15$.', 'Divide both sides by 3.'], difficulty: 4 },
    { problem_text: 'Solve for $x$: $7x - 3 = 4x + 9$', correct_answer: '4', explanation: '$3x = 12$, so $x = 4$.', hints: ['Get all $x$ terms on one side.', '$7x - 4x = 9 + 3$, so $3x = 12$.', '$x = 4$.'], difficulty: 5 },
    { problem_text: 'Solve for $y$: $\\frac{y}{3} + 2 = 7$', correct_answer: '15', explanation: '$\\frac{y}{3} = 5$, so $y = 15$.', hints: ['Subtract 2 from both sides.', '$\\frac{y}{3} = 5$.', 'Multiply both sides by 3.'], difficulty: 4 },
    { problem_text: 'Solve for $x$: $2(x + 3) = 16$', correct_answer: '5', explanation: '$2x + 6 = 16$, so $2x = 10$, $x = 5$.', hints: ['Distribute the 2 first.', '$2x + 6 = 16$.', '$2x = 10$, so $x = 5$.'], difficulty: 4 },
    { problem_text: 'Solve for $x$: $5 - 2x = 11$', correct_answer: '-3', explanation: '$-2x = 6$, so $x = -3$.', hints: ['Subtract 5 from both sides.', '$-2x = 6$.', 'Divide by $-2$: $x = -3$.'], difficulty: 4 },
  ],
  'alg-05': [
    { problem_text: 'Solve: $x^2 - 5x + 6 = 0$', correct_answer: '2', explanation: 'Factor: $(x-2)(x-3) = 0$, so $x = 2$ or $x = 3$. Smallest root: $x = 2$.', hints: ['Try to factorise the quadratic.', 'Find two numbers that multiply to 6 and add to -5.', '$(x-2)(x-3) = 0$, so $x = 2$ or $x = 3$.'], difficulty: 6 },
    { problem_text: 'Solve: $x^2 + 4x = 0$', correct_answer: '0', explanation: 'Factor: $x(x+4) = 0$, so $x = 0$ or $x = -4$. One root: $x = 0$.', hints: ['Factor out $x$.', '$x(x + 4) = 0$.', 'Either $x = 0$ or $x + 4 = 0$.'], difficulty: 5 },
    { problem_text: 'Solve: $x^2 = 49$', correct_answer: '7', explanation: '$x = \\pm 7$. The positive root is $x = 7$.', hints: ['Take the square root of both sides.', '$\\sqrt{49} = 7$.', '$x = 7$ or $x = -7$.'], difficulty: 4 },
    { problem_text: 'Solve: $x^2 - 9 = 0$', correct_answer: '3', explanation: 'Difference of squares: $(x-3)(x+3) = 0$, so $x = 3$ or $x = -3$.', hints: ['This is a difference of squares.', '$x^2 - 9 = (x-3)(x+3)$.', '$x = 3$ or $x = -3$.'], difficulty: 5 },
    { problem_text: 'Factorise: $x^2 + 7x + 12$', correct_answer: '(x+3)(x+4)', explanation: 'Find two numbers that multiply to 12 and add to 7: 3 and 4.', hints: ['Find two numbers whose product is 12 and sum is 7.', '3 and 4 work: $3 \\times 4 = 12$, $3 + 4 = 7$.', '$(x + 3)(x + 4)$.'], difficulty: 6 },
  ],
  'geo-05': [
    { problem_text: 'A right triangle has legs 5 and 12. Find the hypotenuse.', correct_answer: '13', explanation: '$c = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$', hints: ['Use the Pythagorean theorem: $a^2 + b^2 = c^2$.', '$5^2 + 12^2 = 25 + 144 = 169$.', '$c = \\sqrt{169} = 13$.'], difficulty: 5 },
    { problem_text: 'A right triangle has hypotenuse 10 and one leg 6. Find the other leg.', correct_answer: '8', explanation: '$b = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8$', hints: ['Rearrange Pythagorean theorem: $b^2 = c^2 - a^2$.', '$10^2 - 6^2 = 100 - 36 = 64$.', '$b = \\sqrt{64} = 8$.'], difficulty: 5 },
    { problem_text: 'Is a triangle with sides 7, 24, 25 a right triangle?', correct_answer: 'yes', explanation: '$7^2 + 24^2 = 49 + 576 = 625 = 25^2$. Yes, it is.', hints: ['Check if $a^2 + b^2 = c^2$ where $c$ is the longest side.', '$7^2 + 24^2 = 49 + 576 = 625$.', '$25^2 = 625$. Since they are equal, yes.'], difficulty: 5 },
    { problem_text: 'Find the distance between points $(0, 0)$ and $(3, 4)$.', correct_answer: '5', explanation: '$d = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$', hints: ['Use the distance formula (which is the Pythagorean theorem).', '$d = \\sqrt{(3-0)^2 + (4-0)^2}$.', '$\\sqrt{9 + 16} = \\sqrt{25} = 5$.'], difficulty: 5 },
    { problem_text: 'A ladder 15 m long leans against a wall. Its base is 9 m from the wall. How high does it reach?', correct_answer: '12', explanation: '$h = \\sqrt{15^2 - 9^2} = \\sqrt{225 - 81} = \\sqrt{144} = 12$', hints: ['The ladder, wall, and ground form a right triangle.', 'The ladder is the hypotenuse (15 m), the base is one leg (9 m).', '$\\sqrt{225 - 81} = \\sqrt{144} = 12$ m.'], difficulty: 6 },
  ],
  'trig-01': [
    { problem_text: 'In a right triangle, the opposite side is 3 and the hypotenuse is 5. Find $\\sin(\\theta)$.', correct_answer: '3/5', explanation: '$\\sin(\\theta) = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{3}{5}$', hints: ['Recall: $\\sin = \\frac{\\text{opposite}}{\\text{hypotenuse}}$.', 'The opposite side is 3 and the hypotenuse is 5.', '$\\sin(\\theta) = \\frac{3}{5}$.'], difficulty: 6 },
    { problem_text: 'In a right triangle, the adjacent side is 4 and the hypotenuse is 5. Find $\\cos(\\theta)$.', correct_answer: '4/5', explanation: '$\\cos(\\theta) = \\frac{\\text{adjacent}}{\\text{hypotenuse}} = \\frac{4}{5}$', hints: ['Recall: $\\cos = \\frac{\\text{adjacent}}{\\text{hypotenuse}}$.', 'Adjacent = 4, hypotenuse = 5.', '$\\cos(\\theta) = \\frac{4}{5}$.'], difficulty: 6 },
    { problem_text: 'If $\\sin(\\theta) = \\frac{5}{13}$, find $\\cos(\\theta)$ (assume $\\theta$ is in Q1).', correct_answer: '12/13', explanation: 'Adjacent = $\\sqrt{13^2 - 5^2} = \\sqrt{144} = 12$, so $\\cos(\\theta) = \\frac{12}{13}$.', hints: ['Use the Pythagorean identity or draw the triangle.', 'If opposite = 5 and hypotenuse = 13, find the adjacent side.', '$\\sqrt{169 - 25} = 12$, so $\\cos(\\theta) = \\frac{12}{13}$.'], difficulty: 7 },
    { problem_text: 'Find $\\tan(\\theta)$ if the opposite side is 8 and the adjacent side is 6.', correct_answer: '4/3', explanation: '$\\tan(\\theta) = \\frac{8}{6} = \\frac{4}{3}$', hints: ['Recall: $\\tan = \\frac{\\text{opposite}}{\\text{adjacent}}$.', '$\\tan(\\theta) = \\frac{8}{6}$.', 'Simplify: $\\frac{4}{3}$.'], difficulty: 6 },
    { problem_text: 'What is $\\sin(30°)$?', correct_answer: '1/2', explanation: '$\\sin(30°) = \\frac{1}{2}$ — this is a standard angle.', hints: ['This is one of the standard angles you should memorise.', 'Think of the 30-60-90 triangle with sides 1, $\\sqrt{3}$, 2.', '$\\sin(30°) = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{1}{2}$.'], difficulty: 6 },
  ],
  'calc-02': [
    { problem_text: 'Find $\\frac{d}{dx}(x^4)$.', correct_answer: '4x^3', explanation: 'Power rule: $\\frac{d}{dx}(x^n) = nx^{n-1}$, so $4x^3$.', hints: ['Use the power rule.', '$n = 4$, so bring down 4 and reduce the exponent by 1.', '$4x^3$.'], difficulty: 7 },
    { problem_text: 'Find $\\frac{d}{dx}(3x^2 + 5x - 7)$.', correct_answer: '6x+5', explanation: 'Differentiate term by term: $6x + 5 + 0 = 6x + 5$.', hints: ['Differentiate each term separately.', '$\\frac{d}{dx}(3x^2) = 6x$, $\\frac{d}{dx}(5x) = 5$.', 'The derivative of a constant is 0. Answer: $6x + 5$.'], difficulty: 7 },
    { problem_text: 'Find $\\frac{d}{dx}(\\sqrt{x})$.', correct_answer: '1/(2sqrt(x))', explanation: '$\\sqrt{x} = x^{1/2}$, so $\\frac{d}{dx} = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$.', hints: ['Rewrite $\\sqrt{x}$ as $x^{1/2}$.', 'Apply the power rule with $n = \\frac{1}{2}$.', '$\\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$.'], difficulty: 8 },
    { problem_text: 'What is the slope of $f(x) = x^3$ at $x = 2$?', correct_answer: '12', explanation: "$f'(x) = 3x^2$, so $f'(2) = 3(4) = 12$.", hints: ['First find the derivative of $x^3$.', "$f'(x) = 3x^2$.", 'Evaluate at $x = 2$: $3(2^2) = 12$.'], difficulty: 8 },
    { problem_text: 'Find $\\frac{d}{dx}(5)$.', correct_answer: '0', explanation: 'The derivative of any constant is 0.', hints: ['What happens when you differentiate a constant?', 'A constant has no rate of change.', 'The derivative of any constant is 0.'], difficulty: 7 },
  ],
  'alg-04': [
    { problem_text: 'Solve the system:\n$$x + y = 10$$\n$$x - y = 4$$', correct_answer: '7', explanation: 'Add equations: $2x = 14$, so $x = 7$. Then $y = 3$.', hints: ['Try adding the two equations together.', '$2x = 14$.', '$x = 7$ (and $y = 3$).'], difficulty: 5 },
    { problem_text: 'Solve the system:\n$$2x + y = 8$$\n$$x - y = 1$$', correct_answer: '3', explanation: 'Add equations: $3x = 9$, $x = 3$. Then $y = 2$.', hints: ['Adding the equations eliminates $y$.', '$3x = 9$.', '$x = 3$.'], difficulty: 5 },
    { problem_text: 'Solve the system:\n$$y = 2x + 1$$\n$$y = -x + 7$$', correct_answer: '2', explanation: 'Set equal: $2x + 1 = -x + 7$, so $3x = 6$, $x = 2$.', hints: ['Both expressions equal $y$, so set them equal.', '$2x + 1 = -x + 7$.', '$3x = 6$, so $x = 2$.'], difficulty: 5 },
    { problem_text: 'Solve for $x$:\n$$3x + 2y = 12$$\n$$x + 2y = 8$$', correct_answer: '2', explanation: 'Subtract second from first: $2x = 4$, $x = 2$.', hints: ['Subtract one equation from the other to eliminate $y$.', '$(3x + 2y) - (x + 2y) = 12 - 8$.', '$2x = 4$, so $x = 2$.'], difficulty: 5 },
  ],
};

// Fallback generator for concepts without a pool
function generateFallbackProblem(conceptId: string, difficulty: number): MockProblem {
  const a = Math.floor(Math.random() * 10) + 2;
  const b = Math.floor(Math.random() * 10) + 2;
  const answer = a * b;
  return {
    problem_text: `What is $${a} \\times ${b}$?`,
    correct_answer: String(answer),
    explanation: `$${a} \\times ${b} = ${answer}$`,
    hints: [
      'Try breaking one number into simpler parts.',
      `$${a} \\times ${b} = ${a} \\times ${Math.floor(b/2)} \\times 2 + ${a} \\times ${b % 2}$... or just multiply directly.`,
      `The answer is ${answer}.`,
    ],
    difficulty,
  };
}

export interface GeneratedProblemWithAnswer {
  id: string;
  problem_text: string;
  hints: string[];
  difficulty: number;
  correct_answer: string;
  explanation: string;
}

export async function generateProblemMock(
  conceptId: string,
  difficulty: number,
  previousProblemIds?: string[],
): Promise<GeneratedProblemWithAnswer> {
  await new Promise(resolve => setTimeout(resolve, 400));

  const pool = PROBLEM_POOLS[conceptId];
  let problem: MockProblem;

  if (pool && pool.length > 0) {
    // Filter out recently used problems if possible
    const usedSet = new Set(previousProblemIds ?? []);
    const available = pool.filter((_, i) => !usedSet.has(`${conceptId}-${i}`));
    const source = available.length > 0 ? available : pool;
    problem = source[Math.floor(Math.random() * source.length)];
  } else {
    problem = generateFallbackProblem(conceptId, difficulty);
  }

  const id = randomUUID();
  return {
    id,
    problem_text: problem.problem_text,
    hints: problem.hints,
    difficulty: problem.difficulty,
    correct_answer: problem.correct_answer,
    explanation: problem.explanation,
  };
}
