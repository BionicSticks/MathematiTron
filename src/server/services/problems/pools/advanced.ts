import type { StaticProblem } from '../bank';

export const ADVANCED_PROBLEMS: Record<string, StaticProblem[]> = {
  'complex-01': [
    {
      problem_text: 'Compute $(3 + 4i)(1 - 2i)$. Give your answer in the form $a + bi$.',
      correct_answer: '11 - 2i',
      explanation: '$(3 + 4i)(1 - 2i) = 3(1) + 3(-2i) + 4i(1) + 4i(-2i) = 3 - 6i + 4i - 8i^2 = 3 - 2i + 8 = 11 - 2i$.',
      hints: [
        'Use FOIL to expand: $(3+4i)(1-2i) = 3 \\cdot 1 + 3 \\cdot (-2i) + 4i \\cdot 1 + 4i \\cdot (-2i)$.',
        'Simplify: $3 - 6i + 4i - 8i^2$. Remember that $i^2 = -1$.',
        '$3 - 2i - 8(-1) = 3 - 2i + 8 = 11 - 2i$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Find the modulus of $z = 5 - 12i$.',
      correct_answer: '13',
      explanation: '$|z| = \\sqrt{5^2 + (-12)^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$.',
      hints: [
        'The modulus of $z = a + bi$ is $|z| = \\sqrt{a^2 + b^2}$.',
        'Here $a = 5$ and $b = -12$. Compute $5^2 + 12^2 = 25 + 144 = 169$.',
        '$|z| = \\sqrt{169} = 13$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Express $\\frac{2 + 3i}{1 - i}$ in the form $a + bi$. Give your answer as "a + bi" using fractions if needed.',
      correct_answer: '-1/2 + 5/2i',
      explanation: 'Multiply numerator and denominator by the conjugate of the denominator: $\\frac{(2+3i)(1+i)}{(1-i)(1+i)} = \\frac{2+2i+3i+3i^2}{1+1} = \\frac{2+5i-3}{2} = \\frac{-1+5i}{2} = -\\frac{1}{2} + \\frac{5}{2}i$.',
      hints: [
        'Multiply top and bottom by the conjugate of the denominator: $\\frac{2+3i}{1-i} \\cdot \\frac{1+i}{1+i}$.',
        'Denominator: $(1-i)(1+i) = 1 + 1 = 2$. Numerator: $(2+3i)(1+i) = 2 + 2i + 3i + 3i^2 = -1 + 5i$.',
        'Result: $\\frac{-1+5i}{2} = -\\frac{1}{2} + \\frac{5}{2}i$.',
      ],
      difficulty: 8,
    },
  ],

  'numthy-01': [
    {
      problem_text: 'Find $\\gcd(48, 18)$ using the Euclidean algorithm.',
      correct_answer: '6',
      explanation: '$48 = 2 \\cdot 18 + 12$, then $18 = 1 \\cdot 12 + 6$, then $12 = 2 \\cdot 6 + 0$. So $\\gcd(48, 18) = 6$.',
      hints: [
        'The Euclidean algorithm: divide and take the remainder, then repeat.',
        '$48 \\div 18 = 2$ remainder $12$. Now compute $\\gcd(18, 12)$.',
        '$18 \\div 12 = 1$ remainder $6$. Then $12 \\div 6 = 2$ remainder $0$. The GCD is $6$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Find $\\text{lcm}(12, 15)$.',
      correct_answer: '60',
      explanation: '$\\gcd(12, 15) = 3$. Then $\\text{lcm}(12, 15) = \\frac{12 \\times 15}{3} = \\frac{180}{3} = 60$.',
      hints: [
        'Use the relationship $\\text{lcm}(a,b) = \\frac{a \\cdot b}{\\gcd(a,b)}$.',
        'Find $\\gcd(12, 15)$: $15 = 1 \\cdot 12 + 3$, $12 = 4 \\cdot 3 + 0$. So $\\gcd = 3$.',
        '$\\text{lcm} = \\frac{12 \\times 15}{3} = 60$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'How many positive divisors does $72$ have?',
      correct_answer: '12',
      explanation: '$72 = 2^3 \\cdot 3^2$. The number of divisors is $(3+1)(2+1) = 12$.',
      hints: [
        'First find the prime factorization of 72.',
        '$72 = 8 \\times 9 = 2^3 \\times 3^2$.',
        'The number of divisors formula: $(e_1+1)(e_2+1)\\cdots = (3+1)(2+1) = 12$.',
      ],
      difficulty: 8,
    },
  ],

  'numthy-02': [
    {
      problem_text: 'What is $17 \\mod 5$?',
      correct_answer: '2',
      explanation: '$17 = 3 \\times 5 + 2$, so $17 \\mod 5 = 2$.',
      hints: [
        '$a \\mod n$ is the remainder when $a$ is divided by $n$.',
        'Divide: $17 \\div 5 = 3$ with remainder $r$.',
        '$17 = 3 \\times 5 + 2$, so the remainder is $2$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Find the last digit of $7^{100}$. (Hint: consider $7^n \\mod 10$.)',
      correct_answer: '1',
      explanation: 'The powers of 7 mod 10 cycle: $7^1 \\equiv 7$, $7^2 \\equiv 9$, $7^3 \\equiv 3$, $7^4 \\equiv 1 \\pmod{10}$. The cycle length is 4. Since $100 = 4 \\times 25$, $7^{100} \\equiv 7^0 \\equiv 1 \\pmod{10}$.',
      hints: [
        'The last digit of $7^n$ is $7^n \\mod 10$. Compute the first few powers.',
        '$7^1 = 7, 7^2 = 49 \\to 9, 7^3 = 343 \\to 3, 7^4 = 2401 \\to 1$. The pattern repeats every 4.',
        '$100 \\div 4 = 25$ with no remainder, so $7^{100} \\equiv 7^4 \\equiv 1 \\pmod{10}$. Last digit is $1$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Solve $3x \\equiv 6 \\pmod{9}$. Find all solutions modulo 9. Give the smallest non-negative solution.',
      correct_answer: '2',
      explanation: 'Divide both sides and the modulus by $\\gcd(3, 9) = 3$: $x \\equiv 2 \\pmod{3}$. The solutions mod 9 are $x = 2, 5, 8$. The smallest is $2$.',
      hints: [
        'Since $\\gcd(3, 9) = 3$ divides 6, the equation has solutions.',
        'Divide everything by 3: $x \\equiv 2 \\pmod{3}$.',
        'In mod 9, the solutions are $x = 2, 5, 8$. The smallest non-negative solution is $2$.',
      ],
      difficulty: 9,
    },
  ],

  'diffeq-01': [
    {
      problem_text: 'Solve the ODE $\\frac{dy}{dx} = 2x$ with initial condition $y(0) = 3$. Find $y(x)$.',
      correct_answer: 'x^2 + 3',
      explanation: 'Integrate both sides: $y = \\int 2x\\, dx = x^2 + C$. Using $y(0) = 3$: $0 + C = 3$, so $C = 3$. Thus $y = x^2 + 3$.',
      hints: [
        'This is a directly integrable ODE: $dy = 2x\\, dx$.',
        'Integrate: $y = x^2 + C$.',
        'Apply the initial condition $y(0) = 3$: $C = 3$, giving $y = x^2 + 3$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Solve the separable ODE $\\frac{dy}{dx} = \\frac{y}{x}$ for $x > 0$. Express $y$ in terms of $x$ and an arbitrary constant $C$.',
      correct_answer: 'Cx',
      explanation: 'Separate: $\\frac{dy}{y} = \\frac{dx}{x}$. Integrate: $\\ln|y| = \\ln|x| + \\ln|C|$, so $y = Cx$.',
      hints: [
        'Separate variables: $\\frac{dy}{y} = \\frac{dx}{x}$.',
        'Integrate both sides: $\\ln|y| = \\ln|x| + C_1$.',
        'Exponentiate: $y = e^{C_1} x = Cx$ where $C = e^{C_1}$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Solve the linear first-order ODE $\\frac{dy}{dx} + y = e^{-x}$ with $y(0) = 0$. Find $y(x)$.',
      correct_answer: 'xe^{-x}',
      explanation: 'Integrating factor: $\\mu = e^{\\int 1\\, dx} = e^x$. Multiply: $\\frac{d}{dx}(e^x y) = 1$. Integrate: $e^x y = x + C$. With $y(0) = 0$: $C = 0$. So $y = xe^{-x}$.',
      hints: [
        'This is a first-order linear ODE. The integrating factor is $\\mu = e^{\\int 1\\, dx} = e^x$.',
        'Multiply through by $e^x$: $e^x y\' + e^x y = 1$, i.e., $\\frac{d}{dx}(e^x y) = 1$.',
        'Integrate: $e^x y = x + C$. With $y(0) = 0$: $C = 0$. So $y = xe^{-x}$.',
      ],
      difficulty: 9,
    },
  ],

  'analysis-01': [
    {
      problem_text: 'Find $\\lim_{n \\to \\infty} \\frac{n^2 + 3n}{2n^2 - 1}$. Give your answer as a fraction.',
      correct_answer: '1/2',
      explanation: 'Divide numerator and denominator by $n^2$: $\\frac{1 + 3/n}{2 - 1/n^2} \\to \\frac{1}{2}$ as $n \\to \\infty$.',
      hints: [
        'When both numerator and denominator are polynomials in $n$, divide by the highest power of $n$.',
        'Dividing by $n^2$: $\\frac{1 + 3/n}{2 - 1/n^2}$.',
        'As $n \\to \\infty$, $3/n \\to 0$ and $1/n^2 \\to 0$, so the limit is $\\frac{1}{2}$.',
      ],
      difficulty: 10,
    },
    {
      problem_text: 'Does the series $\\sum_{n=1}^{\\infty} \\frac{1}{n^2}$ converge or diverge? Answer "converge" or "diverge".',
      correct_answer: 'converge',
      explanation: 'This is a $p$-series with $p = 2 > 1$, so it converges. (Its sum is $\\frac{\\pi^2}{6}$, the Basel problem.)',
      hints: [
        'This is a $p$-series: $\\sum \\frac{1}{n^p}$ with $p = 2$.',
        'A $p$-series converges if and only if $p > 1$.',
        'Since $p = 2 > 1$, the series converges.',
      ],
      difficulty: 10,
    },
    {
      problem_text: 'Find $\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n$. Give your answer as a single letter/symbol.',
      correct_answer: 'e',
      explanation: 'This is the classical definition of Euler\'s number $e \\approx 2.71828\\ldots$',
      hints: [
        'This is one of the most famous limits in analysis.',
        'Try computing for large $n$: $n=10$ gives $\\approx 2.594$, $n=100$ gives $\\approx 2.705$.',
        'The limit is $e$, Euler\'s number, approximately $2.71828$.',
      ],
      difficulty: 10,
    },
  ],
};
