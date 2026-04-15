import type { StaticProblem } from '../bank';

export const ALGEBRA_PROBLEMS: Record<string, StaticProblem[]> = {
  'alg-03': [
    {
      problem_text: 'What is the slope of the line $y = 3x - 7$?',
      correct_answer: '3',
      explanation:
        'In slope-intercept form $y = mx + b$, the coefficient of $x$ is the slope. Here $m = 3$.',
      hints: [
        'The equation is already in slope-intercept form: $y = mx + b$.',
        'Identify the coefficient of $x$. That coefficient is the slope $m$.',
        'Comparing $y = 3x - 7$ with $y = mx + b$, we get $m = 3$.',
      ],
      difficulty: 4,
    },
    {
      problem_text: 'What is the $y$-intercept of the line $2x + 5y = 20$?',
      correct_answer: '4',
      explanation:
        'The $y$-intercept occurs when $x = 0$. Substituting: $2(0) + 5y = 20 \\Rightarrow 5y = 20 \\Rightarrow y = 4$.',
      hints: [
        'The $y$-intercept is the point where the line crosses the $y$-axis. What is $x$ at that point?',
        'Set $x = 0$ and solve for $y$: $5y = 20$.',
        '$y = \\frac{20}{5} = 4$. The $y$-intercept is $4$.',
      ],
      difficulty: 4,
    },
    {
      problem_text:
        'Find the slope of the line passing through the points $(2, 5)$ and $(6, 13)$.',
      correct_answer: '2',
      explanation:
        'Use the slope formula: $$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{13 - 5}{6 - 2} = \\frac{8}{4} = 2$$',
      hints: [
        'The slope formula is $m = \\frac{y_2 - y_1}{x_2 - x_1}$.',
        'Substitute the points: $m = \\frac{13 - 5}{6 - 2}$.',
        '$m = \\frac{8}{4} = 2$.',
      ],
      difficulty: 4,
    },
    {
      problem_text:
        'Write the equation of the line with slope $-2$ and $y$-intercept $5$ in slope-intercept form. Give your answer in the form $y=mx+b$ with no spaces.',
      correct_answer: 'y=-2x+5',
      explanation:
        'Slope-intercept form is $y = mx + b$. With $m = -2$ and $b = 5$: $$y = -2x + 5$$',
      hints: [
        'Slope-intercept form is $y = mx + b$, where $m$ is the slope and $b$ is the $y$-intercept.',
        'Plug in $m = -2$ and $b = 5$.',
        '$y = -2x + 5$.',
      ],
      difficulty: 4,
    },
    {
      problem_text:
        'Find the equation of the line passing through $(1, 3)$ and $(4, 12)$. Give your answer in the form $y=mx+b$ with no spaces.',
      correct_answer: 'y=3x+0',
      explanation:
        'First find the slope: $m = \\frac{12 - 3}{4 - 1} = \\frac{9}{3} = 3$. Use point-slope form with $(1, 3)$: $y - 3 = 3(x - 1) \\Rightarrow y = 3x$. In the requested format: $y = 3x + 0$.',
      hints: [
        'First compute the slope: $m = \\frac{12 - 3}{4 - 1}$.',
        '$m = 3$. Now use the point-slope form: $y - y_1 = m(x - x_1)$ with the point $(1, 3)$.',
        '$y - 3 = 3(x - 1) \\Rightarrow y = 3x - 3 + 3 \\Rightarrow y = 3x + 0$.',
      ],
      difficulty: 5,
    },
    {
      problem_text: 'What is the slope of the line $4x - 2y = 10$?',
      correct_answer: '2',
      explanation:
        'Rearrange to slope-intercept form: $-2y = -4x + 10 \\Rightarrow y = 2x - 5$. The slope is $m = 2$.',
      hints: [
        'The equation is in standard form. Convert it to $y = mx + b$ by solving for $y$.',
        'Subtract $4x$ from both sides: $-2y = -4x + 10$. Then divide everything by $-2$.',
        '$y = 2x - 5$. The slope is $2$.',
      ],
      difficulty: 4,
    },
    {
      problem_text:
        'Find the $x$-intercept of the line $y = -3x + 9$.',
      correct_answer: '3',
      explanation:
        'The $x$-intercept occurs when $y = 0$: $0 = -3x + 9 \\Rightarrow 3x = 9 \\Rightarrow x = 3$.',
      hints: [
        'The $x$-intercept is where the line crosses the $x$-axis. What is $y$ at that point?',
        'Set $y = 0$: $0 = -3x + 9$.',
        '$3x = 9 \\Rightarrow x = 3$.',
      ],
      difficulty: 4,
    },
    {
      problem_text:
        'Find the slope of the line passing through $(-1, 4)$ and $(3, -8)$.',
      correct_answer: '-3',
      explanation:
        'Using the slope formula: $m = \\frac{-8 - 4}{3 - (-1)} = \\frac{-12}{4} = -3$.',
      hints: [
        'Use the slope formula: $m = \\frac{y_2 - y_1}{x_2 - x_1}$.',
        'Substitute: $m = \\frac{-8 - 4}{3 - (-1)} = \\frac{-12}{4}$.',
        '$m = -3$.',
      ],
      difficulty: 4,
    },
    {
      problem_text:
        'A line passes through $(0, -4)$ and has slope $\\frac{1}{2}$. Give its equation in the form $y=mx+b$ with no spaces. Use fractions like 1/2.',
      correct_answer: 'y=1/2x-4',
      explanation:
        'Since the line passes through $(0, -4)$, the $y$-intercept is $-4$. With $m = \\frac{1}{2}$: $y = \\frac{1}{2}x - 4$.',
      hints: [
        'The point $(0, -4)$ is on the $y$-axis, so $b = -4$.',
        'Plug into $y = mx + b$ with $m = \\frac{1}{2}$ and $b = -4$.',
        '$y = \\frac{1}{2}x - 4$.',
      ],
      difficulty: 4,
    },
    {
      problem_text:
        'Are the lines $y = 2x + 1$ and $y = -\\frac{1}{2}x + 3$ perpendicular? Answer "yes" or "no".',
      correct_answer: 'yes',
      explanation:
        'Two lines are perpendicular if the product of their slopes is $-1$. Here $2 \\times (-\\frac{1}{2}) = -1$, so they are perpendicular.',
      hints: [
        'Two lines are perpendicular when the product of their slopes equals $-1$.',
        'The slopes are $2$ and $-\\frac{1}{2}$. Multiply them together.',
        '$2 \\times (-\\frac{1}{2}) = -1$. Yes, they are perpendicular.',
      ],
      difficulty: 5,
    },
    {
      problem_text:
        'Find the equation of the line parallel to $y = 4x - 1$ that passes through the point $(2, 3)$. Give your answer in the form $y=mx+b$ with no spaces.',
      correct_answer: 'y=4x-5',
      explanation:
        'A parallel line has the same slope, $m = 4$. Using point-slope form: $y - 3 = 4(x - 2) \\Rightarrow y = 4x - 8 + 3 = 4x - 5$.',
      hints: [
        'Parallel lines share the same slope. What is the slope of $y = 4x - 1$?',
        'The slope is $4$. Use point-slope form with $(2, 3)$: $y - 3 = 4(x - 2)$.',
        '$y = 4x - 8 + 3 = 4x - 5$.',
      ],
      difficulty: 5,
    },
    {
      problem_text:
        'What is the slope of a line perpendicular to the line $3x + 6y = 12$? Express as a fraction or integer.',
      correct_answer: '2',
      explanation:
        'First find the slope of the given line: $6y = -3x + 12 \\Rightarrow y = -\\frac{1}{2}x + 2$, so $m = -\\frac{1}{2}$. The perpendicular slope is the negative reciprocal: $m_{\\perp} = 2$.',
      hints: [
        'Convert $3x + 6y = 12$ to slope-intercept form to find its slope.',
        '$y = -\\frac{1}{2}x + 2$, so the slope is $-\\frac{1}{2}$. The perpendicular slope is the negative reciprocal.',
        'Negative reciprocal of $-\\frac{1}{2}$ is $\\frac{-1}{-1/2} = 2$.',
      ],
      difficulty: 5,
    },
    {
      problem_text:
        'Find the equation of the line passing through $(-3, 7)$ and $(1, -1)$. Give your answer in the form $y=mx+b$ with no spaces.',
      correct_answer: 'y=-2x+1',
      explanation:
        'Slope: $m = \\frac{-1 - 7}{1 - (-3)} = \\frac{-8}{4} = -2$. Using point $(1, -1)$: $y - (-1) = -2(x - 1) \\Rightarrow y + 1 = -2x + 2 \\Rightarrow y = -2x + 1$.',
      hints: [
        'Calculate the slope: $m = \\frac{-1 - 7}{1 - (-3)}$.',
        '$m = \\frac{-8}{4} = -2$. Now use point-slope form with either point.',
        'Using $(1, -1)$: $y + 1 = -2(x - 1) \\Rightarrow y = -2x + 2 - 1 = -2x + 1$.',
      ],
      difficulty: 5,
    },
  ],

  'alg-06': [
    {
      problem_text:
        'Add the polynomials: $(3x^2 + 5x - 2) + (x^2 - 3x + 7)$. Write your answer in standard form.',
      correct_answer: '4x^2+2x+5',
      explanation:
        'Combine like terms: $3x^2 + x^2 = 4x^2$, $5x + (-3x) = 2x$, $-2 + 7 = 5$. The result is $4x^2 + 2x + 5$.',
      hints: [
        'Group like terms: terms with $x^2$, terms with $x$, and constant terms.',
        '$x^2$ terms: $3x^2 + x^2 = 4x^2$. $x$ terms: $5x - 3x = 2x$.',
        'Constants: $-2 + 7 = 5$. Final answer: $4x^2 + 2x + 5$.',
      ],
      difficulty: 6,
    },
    {
      problem_text:
        'Subtract: $(5x^3 - 2x + 1) - (3x^3 + 4x - 6)$. Write your answer in standard form.',
      correct_answer: '2x^3-6x+7',
      explanation:
        'Distribute the negative sign: $5x^3 - 2x + 1 - 3x^3 - 4x + 6$. Combine like terms: $5x^3 - 3x^3 = 2x^3$, $-2x - 4x = -6x$, $1 + 6 = 7$. Answer: $2x^3 - 6x + 7$.',
      hints: [
        'Distribute the minus sign to every term in the second polynomial.',
        '$(5x^3 - 2x + 1) - (3x^3 + 4x - 6) = 5x^3 - 2x + 1 - 3x^3 - 4x + 6$.',
        'Combine like terms: $2x^3 - 6x + 7$.',
      ],
      difficulty: 6,
    },
    {
      problem_text: 'Multiply: $(x + 3)(x - 5)$. Write your answer in standard form.',
      correct_answer: 'x^2-2x-15',
      explanation:
        'Use FOIL: $$x \\cdot x = x^2, \\quad x \\cdot (-5) = -5x, \\quad 3 \\cdot x = 3x, \\quad 3 \\cdot (-5) = -15$$ Combine: $x^2 - 5x + 3x - 15 = x^2 - 2x - 15$.',
      hints: [
        'Use the FOIL method: First, Outer, Inner, Last.',
        'First: $x^2$. Outer: $-5x$. Inner: $3x$. Last: $-15$.',
        'Combine the middle terms: $-5x + 3x = -2x$. Answer: $x^2 - 2x - 15$.',
      ],
      difficulty: 6,
    },
    {
      problem_text:
        'What is the degree of the polynomial $7x^4 - 3x^2 + 9x^5 - x + 2$?',
      correct_answer: '5',
      explanation:
        'The degree of a polynomial is the highest exponent. The terms have exponents $4, 2, 5, 1, 0$. The highest is $5$.',
      hints: [
        'The degree is determined by the term with the largest exponent.',
        'List the exponents: $x^4$ has degree $4$, $x^2$ has degree $2$, $x^5$ has degree $5$, $x$ has degree $1$, and $2$ has degree $0$.',
        'The largest exponent is $5$, so the degree is $5$.',
      ],
      difficulty: 6,
    },
    {
      problem_text: 'Expand and simplify: $(2x + 1)^2 - (x - 3)^2$. Write your answer in standard form.',
      correct_answer: '3x^2+10x-8',
      explanation:
        'Expand each square: $(2x+1)^2 = 4x^2 + 4x + 1$ and $(x-3)^2 = x^2 - 6x + 9$. Subtract: $$4x^2 + 4x + 1 - x^2 + 6x - 9 = 3x^2 + 10x - 8$$',
      hints: [
        'Expand each squared binomial separately. Recall $(a+b)^2 = a^2 + 2ab + b^2$.',
        '$(2x+1)^2 = 4x^2 + 4x + 1$. $(x-3)^2 = x^2 - 6x + 9$.',
        'Subtract: $4x^2 + 4x + 1 - (x^2 - 6x + 9) = 4x^2 + 4x + 1 - x^2 + 6x - 9 = 3x^2 + 10x - 8$.',
      ],
      difficulty: 7,
    },
    {
      problem_text:
        'Multiply: $(2x - 3)(x + 4)$. Write your answer in standard form.',
      correct_answer: '2x^2+5x-12',
      explanation:
        'Use FOIL: $2x \\cdot x = 2x^2$, $2x \\cdot 4 = 8x$, $(-3) \\cdot x = -3x$, $(-3) \\cdot 4 = -12$. Combine: $2x^2 + 8x - 3x - 12 = 2x^2 + 5x - 12$.',
      hints: [
        'Use the FOIL method on $(2x - 3)(x + 4)$.',
        'First: $2x^2$. Outer: $8x$. Inner: $-3x$. Last: $-12$.',
        'Combine middle terms: $8x - 3x = 5x$. Answer: $2x^2 + 5x - 12$.',
      ],
      difficulty: 6,
    },
    {
      problem_text:
        'Add the polynomials: $(x^3 - 4x^2 + 2) + (3x^3 + x^2 - 5x + 1)$. Write your answer in standard form.',
      correct_answer: '4x^3-3x^2-5x+3',
      explanation:
        'Combine like terms: $x^3 + 3x^3 = 4x^3$, $-4x^2 + x^2 = -3x^2$, $-5x$ stays, $2 + 1 = 3$. Answer: $4x^3 - 3x^2 - 5x + 3$.',
      hints: [
        'Group like terms by their degree: cubic, quadratic, linear, constant.',
        '$x^3$ terms: $1 + 3 = 4$. $x^2$ terms: $-4 + 1 = -3$. $x$ terms: $-5$.',
        'Constants: $2 + 1 = 3$. Final answer: $4x^3 - 3x^2 - 5x + 3$.',
      ],
      difficulty: 6,
    },
    {
      problem_text:
        'How many terms does the polynomial $6x^5 - 2x^3 + x - 9$ have?',
      correct_answer: '4',
      explanation:
        'A term is a monomial separated by addition or subtraction. The terms are $6x^5$, $-2x^3$, $x$, and $-9$. That is $4$ terms.',
      hints: [
        'A term is a single monomial in the polynomial, separated by $+$ or $-$ signs.',
        'List each term: $6x^5$, $-2x^3$, $x$, $-9$.',
        'Count them: there are $4$ terms.',
      ],
      difficulty: 6,
    },
    {
      problem_text:
        'Expand: $(x + 2)^3$. Write your answer in standard form.',
      correct_answer: 'x^3+6x^2+12x+8',
      explanation:
        'Using the binomial expansion or by multiplying step by step: $(x+2)^2 = x^2 + 4x + 4$. Then $(x^2 + 4x + 4)(x + 2) = x^3 + 2x^2 + 4x^2 + 8x + 4x + 8 = x^3 + 6x^2 + 12x + 8$.',
      hints: [
        'Start by computing $(x+2)^2 = x^2 + 4x + 4$.',
        'Now multiply $(x^2 + 4x + 4)$ by $(x + 2)$. Distribute each term.',
        '$x^3 + 2x^2 + 4x^2 + 8x + 4x + 8 = x^3 + 6x^2 + 12x + 8$.',
      ],
      difficulty: 7,
    },
    {
      problem_text:
        'Multiply: $(3x + 2)(3x - 2)$. Write your answer in standard form.',
      correct_answer: '9x^2-4',
      explanation:
        'This is a difference of squares pattern: $(a+b)(a-b) = a^2 - b^2$. Here $a = 3x$, $b = 2$: $(3x)^2 - 2^2 = 9x^2 - 4$.',
      hints: [
        'Notice this has the form $(a+b)(a-b)$. What special product rule applies?',
        'Difference of squares: $(a+b)(a-b) = a^2 - b^2$, with $a = 3x$ and $b = 2$.',
        '$(3x)^2 - 2^2 = 9x^2 - 4$.',
      ],
      difficulty: 6,
    },
    {
      problem_text:
        'Subtract: $(4x^2 + 7x - 3) - (4x^2 - 2x + 5)$. Write your answer in standard form.',
      correct_answer: '9x-8',
      explanation:
        'Distribute the negative: $4x^2 + 7x - 3 - 4x^2 + 2x - 5$. Combine: $4x^2 - 4x^2 = 0$, $7x + 2x = 9x$, $-3 - 5 = -8$. Answer: $9x - 8$.',
      hints: [
        'Distribute the minus sign to each term of the second polynomial.',
        '$4x^2 + 7x - 3 - 4x^2 + 2x - 5$. Notice the $x^2$ terms cancel.',
        '$7x + 2x = 9x$ and $-3 - 5 = -8$. Answer: $9x - 8$.',
      ],
      difficulty: 6,
    },
    {
      problem_text:
        'Multiply: $x(2x^2 - 5x + 3)$. Write your answer in standard form.',
      correct_answer: '2x^3-5x^2+3x',
      explanation:
        'Distribute $x$ to each term: $x \\cdot 2x^2 = 2x^3$, $x \\cdot (-5x) = -5x^2$, $x \\cdot 3 = 3x$. Answer: $2x^3 - 5x^2 + 3x$.',
      hints: [
        'Distribute $x$ to every term inside the parentheses.',
        '$x \\cdot 2x^2 = 2x^3$. $x \\cdot (-5x) = -5x^2$.',
        '$x \\cdot 3 = 3x$. Final answer: $2x^3 - 5x^2 + 3x$.',
      ],
      difficulty: 6,
    },
    {
      problem_text:
        'What is the leading coefficient of $-8x^3 + 2x^5 - x^4 + 11$?',
      correct_answer: '2',
      explanation:
        'First write in standard form (descending powers): $2x^5 - x^4 - 8x^3 + 11$. The leading term is $2x^5$, so the leading coefficient is $2$.',
      hints: [
        'The leading coefficient belongs to the term with the highest degree.',
        'Which term has the highest exponent? $2x^5$ has degree $5$, the highest.',
        'The coefficient of $2x^5$ is $2$.',
      ],
      difficulty: 6,
    },
  ],

  'alg-07': [
    {
      problem_text: 'Simplify $x^3 \\cdot x^5$.',
      correct_answer: 'x^8',
      explanation:
        'When multiplying powers with the same base, add the exponents: $x^3 \\cdot x^5 = x^{3+5} = x^8$.',
      hints: [
        'What is the rule for multiplying powers with the same base?',
        'The product rule: $a^m \\cdot a^n = a^{m+n}$.',
        '$x^3 \\cdot x^5 = x^{3+5} = x^8$.',
      ],
      difficulty: 5,
    },
    {
      problem_text: 'Simplify $\\frac{x^7}{x^3}$.',
      correct_answer: 'x^4',
      explanation:
        'When dividing powers with the same base, subtract the exponents: $\\frac{x^7}{x^3} = x^{7-3} = x^4$.',
      hints: [
        'What is the rule for dividing powers with the same base?',
        'The quotient rule: $\\frac{a^m}{a^n} = a^{m-n}$.',
        '$\\frac{x^7}{x^3} = x^{7-3} = x^4$.',
      ],
      difficulty: 5,
    },
    {
      problem_text: 'Simplify $\\sqrt{72}$. Write your answer in the form $a\\sqrt{b}$ where $b$ has no perfect square factors.',
      correct_answer: '6\\sqrt{2}',
      explanation:
        'Factor $72$: $72 = 36 \\times 2$. Since $\\sqrt{36} = 6$: $$\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}$$',
      hints: [
        'Find the largest perfect square that divides $72$.',
        '$72 = 36 \\times 2$ and $36$ is a perfect square ($6^2$).',
        '$\\sqrt{72} = \\sqrt{36} \\cdot \\sqrt{2} = 6\\sqrt{2}$.',
      ],
      difficulty: 5,
    },
    {
      problem_text: 'Simplify $(2x^3)^4$.',
      correct_answer: '16x^{12}',
      explanation:
        'Apply the power rule to both the coefficient and the variable: $$(2x^3)^4 = 2^4 \\cdot (x^3)^4 = 16 \\cdot x^{12} = 16x^{12}$$',
      hints: [
        'When raising a product to a power, raise each factor to that power: $(ab)^n = a^n \\cdot b^n$.',
        '$2^4 = 16$. For the variable part, use the power rule: $(x^3)^4 = x^{3 \\times 4}$.',
        '$(x^3)^4 = x^{12}$. So the answer is $16x^{12}$.',
      ],
      difficulty: 6,
    },
    {
      problem_text: 'Rewrite $x^{-2} \\cdot x^{5/2}$ as a single power of $x$.',
      correct_answer: 'x^{1/2}',
      explanation:
        'Add the exponents: $-2 + \\frac{5}{2} = \\frac{-4}{2} + \\frac{5}{2} = \\frac{1}{2}$. So $x^{-2} \\cdot x^{5/2} = x^{1/2}$, which equals $\\sqrt{x}$.',
      hints: [
        'Use the product rule: $x^a \\cdot x^b = x^{a+b}$.',
        'Add the exponents: $-2 + \\frac{5}{2}$. Convert $-2$ to $\\frac{-4}{2}$.',
        '$\\frac{-4}{2} + \\frac{5}{2} = \\frac{1}{2}$. The answer is $x^{1/2}$.',
      ],
      difficulty: 6,
    },
    {
      problem_text: 'Evaluate $5^0 + 2^{-3}$. Express your answer as a fraction.',
      correct_answer: '9/8',
      explanation:
        '$5^0 = 1$ (any nonzero number to the zero power is $1$). $2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}$. So $1 + \\frac{1}{8} = \\frac{9}{8}$.',
      hints: [
        'Recall that $a^0 = 1$ for any nonzero $a$.',
        '$2^{-3}$ means $\\frac{1}{2^3} = \\frac{1}{8}$.',
        '$1 + \\frac{1}{8} = \\frac{8}{8} + \\frac{1}{8} = \\frac{9}{8}$.',
      ],
      difficulty: 5,
    },
    {
      problem_text: 'Simplify $\\frac{(x^4)^3}{x^5}$.',
      correct_answer: 'x^7',
      explanation:
        'First apply the power rule to the numerator: $(x^4)^3 = x^{12}$. Then use the quotient rule: $\\frac{x^{12}}{x^5} = x^{12-5} = x^7$.',
      hints: [
        'Start with the numerator: $(x^4)^3$. Use the power rule $(a^m)^n = a^{mn}$.',
        '$(x^4)^3 = x^{12}$. Now simplify $\\frac{x^{12}}{x^5}$.',
        '$x^{12-5} = x^7$.',
      ],
      difficulty: 5,
    },
    {
      problem_text: 'Simplify $\\sqrt{50} + \\sqrt{18}$. Write your answer in the form $a\\sqrt{b}$.',
      correct_answer: '8\\sqrt{2}',
      explanation:
        '$\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$ and $\\sqrt{18} = \\sqrt{9 \\cdot 2} = 3\\sqrt{2}$. Adding: $5\\sqrt{2} + 3\\sqrt{2} = 8\\sqrt{2}$.',
      hints: [
        'Simplify each radical separately. Find perfect square factors of $50$ and $18$.',
        '$\\sqrt{50} = 5\\sqrt{2}$ and $\\sqrt{18} = 3\\sqrt{2}$.',
        'Since both have $\\sqrt{2}$, add the coefficients: $5 + 3 = 8$. Answer: $8\\sqrt{2}$.',
      ],
      difficulty: 5,
    },
    {
      problem_text: 'Simplify $(3x^2 y)^3$.',
      correct_answer: '27x^6y^3',
      explanation:
        'Raise each factor to the third power: $3^3 = 27$, $(x^2)^3 = x^6$, $y^3 = y^3$. Answer: $27x^6 y^3$.',
      hints: [
        'Use the rule $(abc)^n = a^n b^n c^n$.',
        '$3^3 = 27$. $(x^2)^3 = x^{2 \\cdot 3} = x^6$.',
        '$y^3$ stays as $y^3$. Combined: $27x^6 y^3$.',
      ],
      difficulty: 6,
    },
    {
      problem_text: 'Simplify $\\frac{x^{-3}}{x^{-7}}$.',
      correct_answer: 'x^4',
      explanation:
        'Use the quotient rule: $\\frac{x^{-3}}{x^{-7}} = x^{-3 - (-7)} = x^{-3 + 7} = x^4$.',
      hints: [
        'Apply the quotient rule: $\\frac{a^m}{a^n} = a^{m-n}$.',
        'Compute the exponent: $-3 - (-7) = -3 + 7$.',
        '$-3 + 7 = 4$. The answer is $x^4$.',
      ],
      difficulty: 6,
    },
    {
      problem_text: 'Simplify $\\sqrt{12} \\cdot \\sqrt{3}$.',
      correct_answer: '6',
      explanation:
        '$\\sqrt{12} \\cdot \\sqrt{3} = \\sqrt{12 \\cdot 3} = \\sqrt{36} = 6$.',
      hints: [
        'Use the product rule for radicals: $\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{ab}$.',
        '$\\sqrt{12 \\cdot 3} = \\sqrt{36}$.',
        '$\\sqrt{36} = 6$.',
      ],
      difficulty: 5,
    },
    {
      problem_text: 'Rewrite $\\frac{1}{x^{-4}}$ as a positive exponent expression.',
      correct_answer: 'x^4',
      explanation:
        '$\\frac{1}{x^{-4}} = x^{-(-4)} = x^4$. Dividing by $x^{-4}$ is the same as multiplying by $x^4$.',
      hints: [
        'Recall that $\\frac{1}{a^{-n}} = a^n$.',
        'A negative exponent in the denominator flips to a positive exponent.',
        '$\\frac{1}{x^{-4}} = x^4$.',
      ],
      difficulty: 5,
    },
    {
      problem_text: 'Simplify $\\left(\\frac{x^3}{y^2}\\right)^4$.',
      correct_answer: 'x^{12}/y^8',
      explanation:
        'Apply the power to both numerator and denominator: $\\frac{(x^3)^4}{(y^2)^4} = \\frac{x^{12}}{y^8}$.',
      hints: [
        'When raising a fraction to a power, raise both the numerator and denominator: $\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$.',
        '$(x^3)^4 = x^{12}$ and $(y^2)^4 = y^8$.',
        'The answer is $\\frac{x^{12}}{y^8}$, written as $x^{12}/y^8$.',
      ],
      difficulty: 6,
    },
  ],
};
