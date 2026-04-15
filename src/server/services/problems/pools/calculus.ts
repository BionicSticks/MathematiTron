import type { StaticProblem } from '../bank';

export const CALCULUS_PROBLEMS: Record<string, StaticProblem[]> = {
  // ─── calc-01: Limits (difficulty 7) ───────────────────────────────────────────
  'calc-01': [
    {
      problem_text:
        'Evaluate the limit: $$\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$$',
      correct_answer: '6',
      explanation:
        'Factor the numerator as a difference of squares: $x^2 - 9 = (x-3)(x+3)$. Cancel the common factor $(x-3)$: $$\\lim_{x \\to 3} \\frac{(x-3)(x+3)}{x-3} = \\lim_{x \\to 3}(x+3) = 6$$',
      hints: [
        'The numerator $x^2 - 9$ can be factored. What algebraic identity applies to a difference of squares?',
        'Factor: $x^2 - 9 = (x-3)(x+3)$. Now simplify the fraction by cancelling a common factor.',
        'After cancelling $(x-3)$, you are left with $\\lim_{x \\to 3}(x+3)$. Substitute $x = 3$.',
      ],
      difficulty: 7,
    },
    {
      problem_text:
        'Evaluate the limit: $$\\lim_{x \\to \\infty} \\frac{5x^2 + 3x}{2x^2 - 1}$$',
      correct_answer: '5/2',
      explanation:
        'For rational functions as $x \\to \\infty$, divide every term by the highest power of $x$ in the denominator ($x^2$): $$\\lim_{x \\to \\infty} \\frac{5 + \\frac{3}{x}}{2 - \\frac{1}{x^2}} = \\frac{5 + 0}{2 - 0} = \\frac{5}{2}$$',
      hints: [
        'When both numerator and denominator are polynomials of the same degree, the limit at infinity equals the ratio of their leading coefficients.',
        'Divide every term in the numerator and denominator by $x^2$. What happens to $\\frac{3}{x}$ and $\\frac{1}{x^2}$ as $x \\to \\infty$?',
        'Those terms vanish, leaving $\\frac{5}{2}$.',
      ],
      difficulty: 7,
    },
    {
      problem_text:
        'Evaluate the limit: $$\\lim_{x \\to 0} \\frac{\\sin(4x)}{x}$$',
      correct_answer: '4',
      explanation:
        'Use the standard limit $\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$. Rewrite: $$\\lim_{x \\to 0} \\frac{\\sin(4x)}{x} = \\lim_{x \\to 0} 4 \\cdot \\frac{\\sin(4x)}{4x} = 4 \\cdot 1 = 4$$',
      hints: [
        'Recall the fundamental trig limit: $\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$.',
        'Multiply and divide by $4$ so the argument of sine matches the denominator: $4 \\cdot \\frac{\\sin(4x)}{4x}$.',
        'As $x \\to 0$, $\\frac{\\sin(4x)}{4x} \\to 1$, so the answer is $4 \\cdot 1$.',
      ],
      difficulty: 7,
    },
    {
      problem_text:
        "Evaluate the limit using L'Hopital's Rule: $$\\lim_{x \\to 0} \\frac{e^x - 1}{x}$$",
      correct_answer: '1',
      explanation:
        "Direct substitution gives $\\frac{0}{0}$, an indeterminate form. Apply L'Hopital's Rule: differentiate numerator and denominator separately. $$\\lim_{x \\to 0} \\frac{\\frac{d}{dx}(e^x - 1)}{\\frac{d}{dx}(x)} = \\lim_{x \\to 0} \\frac{e^x}{1} = e^0 = 1$$",
      hints: [
        'Try direct substitution first. You get $\\frac{0}{0}$, which is an indeterminate form.',
        "Since it is $\\frac{0}{0}$, apply L'Hopital's Rule: take the derivative of the numerator and the derivative of the denominator separately.",
        'The derivative of $e^x - 1$ is $e^x$, and the derivative of $x$ is $1$. Now evaluate at $x = 0$.',
      ],
      difficulty: 7,
    },
    {
      problem_text:
        'Evaluate the limit: $$\\lim_{x \\to 2} \\frac{x^3 - 8}{x^2 - 4}$$',
      correct_answer: '3',
      explanation:
        'Factor using sum/difference of cubes and difference of squares: $x^3 - 8 = (x-2)(x^2+2x+4)$ and $x^2 - 4 = (x-2)(x+2)$. Cancel $(x-2)$: $$\\lim_{x \\to 2} \\frac{x^2 + 2x + 4}{x + 2} = \\frac{4 + 4 + 4}{4} = \\frac{12}{4} = 3$$',
      hints: [
        'Direct substitution gives $\\frac{0}{0}$. Factor both numerator and denominator. The numerator is a difference of cubes.',
        '$x^3 - 8 = (x-2)(x^2+2x+4)$ and $x^2 - 4 = (x-2)(x+2)$. Cancel the common factor.',
        'After cancelling you have $\\frac{x^2+2x+4}{x+2}$. Substitute $x = 2$.',
      ],
      difficulty: 7,
    },
  ],

  // ─── calc-03: Differentiation Rules (difficulty 8) ────────────────────────────
  'calc-03': [
    {
      problem_text:
        'Find the derivative of $f(x) = x^3 \\sin(x)$ using the product rule.',
      correct_answer: '3x^2*sin(x)+x^3*cos(x)',
      explanation:
        'Apply the product rule $(uv)\' = u\'v + uv\'$ with $u = x^3$ and $v = \\sin(x)$: $$f\'(x) = 3x^2 \\sin(x) + x^3 \\cos(x)$$',
      hints: [
        'This is a product of two functions. The product rule states $(uv)\' = u\'v + uv\'$.',
        'Let $u = x^3$ so $u\' = 3x^2$, and $v = \\sin(x)$ so $v\' = \\cos(x)$.',
        'Substitute into the product rule: $f\'(x) = 3x^2 \\sin(x) + x^3 \\cos(x)$.',
      ],
      difficulty: 8,
    },
    {
      problem_text:
        'Find the derivative of $g(x) = \\frac{x^2 + 1}{x - 1}$ using the quotient rule.',
      correct_answer: '(x^2-2x-1)/(x-1)^2',
      explanation:
        'Apply the quotient rule $\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}$ with $u = x^2+1$, $v = x-1$: $$g\'(x) = \\frac{2x(x-1) - (x^2+1)(1)}{(x-1)^2} = \\frac{2x^2 - 2x - x^2 - 1}{(x-1)^2} = \\frac{x^2 - 2x - 1}{(x-1)^2}$$',
      hints: [
        'Use the quotient rule: $\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}$.',
        'Here $u = x^2+1$, $u\' = 2x$, $v = x-1$, $v\' = 1$. Set up the formula.',
        'The numerator becomes $2x(x-1) - (x^2+1) = 2x^2 - 2x - x^2 - 1 = x^2 - 2x - 1$.',
      ],
      difficulty: 8,
    },
    {
      problem_text:
        'Find the derivative of $h(x) = \\ln(x^2 + 5)$ using the chain rule.',
      correct_answer: '2x/(x^2+5)',
      explanation:
        'Apply the chain rule with outer function $\\ln(u)$ and inner function $u = x^2 + 5$: $$h\'(x) = \\frac{1}{x^2 + 5} \\cdot 2x = \\frac{2x}{x^2 + 5}$$',
      hints: [
        'This is a composition of functions: $\\ln(\\text{something})$. Use the chain rule.',
        'The derivative of $\\ln(u)$ is $\\frac{1}{u}$, and then multiply by the derivative of the inner function $u = x^2 + 5$.',
        '$\\frac{d}{dx}(x^2+5) = 2x$, so the result is $\\frac{2x}{x^2+5}$.',
      ],
      difficulty: 8,
    },
    {
      problem_text:
        'Find the derivative of $f(x) = e^{3x} \\cos(x)$.',
      correct_answer: '3e^(3x)*cos(x)-e^(3x)*sin(x)',
      explanation:
        'Apply the product rule with $u = e^{3x}$ and $v = \\cos(x)$. Note $u\' = 3e^{3x}$ (chain rule) and $v\' = -\\sin(x)$: $$f\'(x) = 3e^{3x}\\cos(x) + e^{3x}(-\\sin(x)) = 3e^{3x}\\cos(x) - e^{3x}\\sin(x)$$',
      hints: [
        'This requires the product rule because you have two functions multiplied together.',
        'For $e^{3x}$, use the chain rule: $\\frac{d}{dx}e^{3x} = 3e^{3x}$. The derivative of $\\cos(x)$ is $-\\sin(x)$.',
        'Product rule gives $3e^{3x}\\cos(x) + e^{3x}(-\\sin(x))$. Simplify.',
      ],
      difficulty: 8,
    },
    {
      problem_text:
        'Find the derivative of $y = (2x^3 - x)^5$.',
      correct_answer: '5(2x^3-x)^4*(6x^2-1)',
      explanation:
        'Apply the chain rule with outer function $u^5$ and inner function $u = 2x^3 - x$: $$y\' = 5(2x^3 - x)^4 \\cdot (6x^2 - 1)$$',
      hints: [
        'This is a composite function: something raised to the 5th power. Use the chain rule.',
        'Bring the exponent down: $5(2x^3 - x)^4$, then multiply by the derivative of the inside.',
        'The derivative of $2x^3 - x$ is $6x^2 - 1$. The full answer is $5(2x^3-x)^4(6x^2-1)$.',
      ],
      difficulty: 8,
    },
  ],

  // ─── calc-04: Integration Basics (difficulty 9) ───────────────────────────────
  'calc-04': [
    {
      problem_text:
        'Evaluate the indefinite integral: $$\\int (3x^4 - 2x + 7) \\, dx$$',
      correct_answer: '3x^5/5-x^2+7x+C',
      explanation:
        'Integrate term by term using the power rule $\\int x^n \\, dx = \\frac{x^{n+1}}{n+1}$: $$\\int 3x^4 \\, dx = \\frac{3x^5}{5}, \\quad \\int -2x \\, dx = -x^2, \\quad \\int 7 \\, dx = 7x$$ So the result is $\\frac{3x^5}{5} - x^2 + 7x + C$.',
      hints: [
        'Integrate each term separately using the power rule: $\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C$.',
        'For $3x^4$: increase the exponent by 1 to get $x^5$, then divide by 5. For $-2x$: the exponent is 1.',
        'Combine: $\\frac{3x^5}{5} - x^2 + 7x + C$. Do not forget the constant of integration.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Evaluate the indefinite integral: $$\\int \\frac{5}{x} + 4e^x \\, dx$$',
      correct_answer: '5ln|x|+4e^x+C',
      explanation:
        'Use standard antiderivatives: $\\int \\frac{1}{x} dx = \\ln|x|$ and $\\int e^x dx = e^x$: $$5\\ln|x| + 4e^x + C$$',
      hints: [
        'Split into two integrals: $\\int \\frac{5}{x} dx$ and $\\int 4e^x dx$.',
        'Recall that $\\int \\frac{1}{x} dx = \\ln|x|$ and $\\int e^x dx = e^x$.',
        'The result is $5\\ln|x| + 4e^x + C$.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Evaluate the definite integral: $$\\int_1^4 (2x + 1) \\, dx$$',
      correct_answer: '18',
      explanation:
        'Find the antiderivative: $F(x) = x^2 + x$. Then apply the Fundamental Theorem of Calculus: $$F(4) - F(1) = (16 + 4) - (1 + 1) = 20 - 2 = 18$$',
      hints: [
        'First find the antiderivative of $2x + 1$.',
        'The antiderivative is $x^2 + x$. Now evaluate at the upper and lower bounds.',
        '$F(4) = 16 + 4 = 20$ and $F(1) = 1 + 1 = 2$. Subtract: $20 - 2 = 18$.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Evaluate the indefinite integral: $$\\int \\cos(3x) \\, dx$$',
      correct_answer: 'sin(3x)/3+C',
      explanation:
        'Use substitution with $u = 3x$, $du = 3\\,dx$: $$\\int \\cos(3x) \\, dx = \\frac{1}{3}\\int \\cos(u) \\, du = \\frac{\\sin(u)}{3} + C = \\frac{\\sin(3x)}{3} + C$$',
      hints: [
        'The antiderivative of $\\cos(x)$ is $\\sin(x)$, but here the argument is $3x$.',
        'Use substitution: let $u = 3x$, so $du = 3\\,dx$ and $dx = \\frac{du}{3}$.',
        'You get $\\frac{1}{3}\\sin(3x) + C$.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Evaluate the definite integral: $$\\int_0^2 (x^3 - 3x) \\, dx$$',
      correct_answer: '-2',
      explanation:
        'Find the antiderivative: $F(x) = \\frac{x^4}{4} - \\frac{3x^2}{2}$. Evaluate: $$F(2) - F(0) = \\left(\\frac{16}{4} - \\frac{12}{2}\\right) - 0 = 4 - 6 = -2$$',
      hints: [
        'Integrate term by term: $\\int x^3 dx = \\frac{x^4}{4}$ and $\\int 3x dx = \\frac{3x^2}{2}$.',
        'The antiderivative is $\\frac{x^4}{4} - \\frac{3x^2}{2}$. Evaluate at $x = 2$ and $x = 0$.',
        '$F(2) = \\frac{16}{4} - \\frac{12}{2} = 4 - 6 = -2$ and $F(0) = 0$. The answer is $-2$.',
      ],
      difficulty: 9,
    },
  ],

  // ─── calc-05: Applications of Derivatives (difficulty 9) ──────────────────────
  'calc-05': [
    {
      problem_text:
        'Find the $x$-value of the local maximum of $f(x) = -x^3 + 6x^2 - 9x + 2$.',
      correct_answer: '3',
      explanation:
        'Find critical points: $f\'(x) = -3x^2 + 12x - 9 = -3(x-1)(x-3) = 0$, so $x = 1$ and $x = 3$. Second derivative: $f\'\'(x) = -6x + 12$. At $x = 1$: $f\'\'(1) = 6 > 0$ (local minimum). At $x = 3$: $f\'\'(3) = -6 < 0$ (local maximum). The local maximum is at $x = 3$.',
      hints: [
        'Take the first derivative and set it equal to zero to find critical points.',
        '$f\'(x) = -3x^2 + 12x - 9$. Factor: $-3(x-1)(x-3) = 0$, giving $x = 1$ and $x = 3$.',
        'Use the second derivative test: $f\'\'(x) = -6x + 12$. A negative second derivative means a local maximum.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Find the interval(s) where $f(x) = x^3 - 3x + 2$ is increasing. Give your answer in interval notation.',
      correct_answer: '(-inf,-1)U(1,inf)',
      explanation:
        'Find $f\'(x) = 3x^2 - 3 = 3(x-1)(x+1)$. The critical points are $x = -1$ and $x = 1$. Test signs: for $x < -1$, $f\' > 0$ (increasing); for $-1 < x < 1$, $f\' < 0$ (decreasing); for $x > 1$, $f\' > 0$ (increasing). So $f$ is increasing on $(-\\infty, -1) \\cup (1, \\infty)$.',
      hints: [
        'A function is increasing where its first derivative is positive. Find $f\'(x)$.',
        '$f\'(x) = 3x^2 - 3 = 3(x^2-1) = 3(x-1)(x+1)$. Set $f\'(x) > 0$.',
        'Test intervals: $f\' > 0$ when $x < -1$ or $x > 1$. The function increases on $(-\\infty,-1) \\cup (1,\\infty)$.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'A sphere\'s radius is increasing at $2$ cm/s. How fast is its volume increasing when the radius is $5$ cm? Give your answer in terms of $\\pi$ (e.g. "200pi").',
      correct_answer: '200pi',
      explanation:
        'Volume of a sphere: $V = \\frac{4}{3}\\pi r^3$. Differentiate with respect to time: $$\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}$$ Substitute $r = 5$ and $\\frac{dr}{dt} = 2$: $$\\frac{dV}{dt} = 4\\pi(25)(2) = 200\\pi \\text{ cm}^3/\\text{s}$$',
      hints: [
        'This is a related rates problem. Start with the volume formula $V = \\frac{4}{3}\\pi r^3$ and differentiate both sides with respect to time $t$.',
        'You get $\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}$. You know $r = 5$ and $\\frac{dr}{dt} = 2$.',
        'Substitute: $\\frac{dV}{dt} = 4\\pi(25)(2) = 200\\pi$.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Find the absolute maximum value of $f(x) = x^2 - 4x + 3$ on the interval $[0, 5]$.',
      correct_answer: '8',
      explanation:
        'Find $f\'(x) = 2x - 4 = 0 \\Rightarrow x = 2$ (a critical point inside $[0,5]$). Evaluate $f$ at the critical point and endpoints: $f(0) = 3$, $f(2) = 4 - 8 + 3 = -1$, $f(5) = 25 - 20 + 3 = 8$. The absolute maximum is $8$ at $x = 5$.',
      hints: [
        'For absolute extrema on a closed interval, evaluate the function at all critical points and at both endpoints.',
        '$f\'(x) = 2x - 4 = 0$ gives $x = 2$. Evaluate $f(0)$, $f(2)$, and $f(5)$.',
        '$f(0) = 3$, $f(2) = -1$, $f(5) = 8$. The largest value is the absolute maximum.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'A 10-foot ladder leans against a wall. The base slides away at $1$ ft/s. How fast is the top sliding down when the base is $6$ ft from the wall?',
      correct_answer: '-3/4',
      explanation:
        'Let $x$ = distance of base from wall, $y$ = height on wall. By Pythagoras: $x^2 + y^2 = 100$. Differentiate: $2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$. When $x = 6$: $y = \\sqrt{100-36} = 8$. Substitute $x=6$, $y=8$, $\\frac{dx}{dt}=1$: $$2(6)(1) + 2(8)\\frac{dy}{dt} = 0 \\implies \\frac{dy}{dt} = -\\frac{12}{16} = -\\frac{3}{4} \\text{ ft/s}$$',
      hints: [
        'Use the Pythagorean relationship: $x^2 + y^2 = 100$. Differentiate both sides with respect to time.',
        'When $x = 6$, find $y = \\sqrt{100 - 36} = 8$. You have $2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$.',
        'Plug in $x = 6$, $y = 8$, $\\frac{dx}{dt} = 1$ and solve for $\\frac{dy}{dt}$.',
      ],
      difficulty: 9,
    },
  ],

  // ─── calc-06: Applications of Integrals (difficulty 9) ────────────────────────
  'calc-06': [
    {
      problem_text:
        'Find the area between the curves $y = x^2$ and $y = x + 2$ from $x = -1$ to $x = 2$.',
      correct_answer: '9/2',
      explanation:
        'On $[-1, 2]$, $x + 2 \\ge x^2$ (verify at a test point). The area is: $$\\int_{-1}^{2} [(x+2) - x^2] \\, dx = \\int_{-1}^{2} (x + 2 - x^2) \\, dx$$ $$= \\left[\\frac{x^2}{2} + 2x - \\frac{x^3}{3}\\right]_{-1}^{2} = \\left(2 + 4 - \\frac{8}{3}\\right) - \\left(\\frac{1}{2} - 2 + \\frac{1}{3}\\right) = \\frac{10}{3} - \\left(-\\frac{7}{6}\\right) = \\frac{9}{2}$$',
      hints: [
        'The area between two curves is $\\int_a^b [\\text{top} - \\text{bottom}] \\, dx$. Which function is larger on the interval?',
        'On $[-1, 2]$, $y = x + 2$ is above $y = x^2$. Set up $\\int_{-1}^{2}(x + 2 - x^2)\\,dx$.',
        'Integrate to get $\\frac{x^2}{2} + 2x - \\frac{x^3}{3}$, then evaluate at the bounds.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Find the volume of the solid obtained by revolving $y = \\sqrt{x}$ around the $x$-axis from $x = 0$ to $x = 4$. Give your answer in terms of $\\pi$ (e.g. "8pi").',
      correct_answer: '8pi',
      explanation:
        'Using the disk method: $$V = \\int_0^4 \\pi [\\sqrt{x}]^2 \\, dx = \\pi \\int_0^4 x \\, dx = \\pi \\left[\\frac{x^2}{2}\\right]_0^4 = \\pi \\cdot \\frac{16}{2} = 8\\pi$$',
      hints: [
        'For revolution around the $x$-axis, use the disk method: $V = \\int_a^b \\pi [f(x)]^2 dx$.',
        'Here $[f(x)]^2 = [\\sqrt{x}]^2 = x$. So $V = \\pi \\int_0^4 x \\, dx$.',
        '$\\pi \\cdot \\frac{x^2}{2} \\Big|_0^4 = \\pi \\cdot 8 = 8\\pi$.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Find the area enclosed between $y = x^2$ and $y = 4$.',
      correct_answer: '32/3',
      explanation:
        'Find intersection points: $x^2 = 4 \\Rightarrow x = \\pm 2$. The area is: $$\\int_{-2}^{2} (4 - x^2) \\, dx = \\left[4x - \\frac{x^3}{3}\\right]_{-2}^{2} = \\left(8 - \\frac{8}{3}\\right) - \\left(-8 + \\frac{8}{3}\\right) = \\frac{16}{3} + \\frac{16}{3} = \\frac{32}{3}$$',
      hints: [
        'First find where the curves intersect by setting $x^2 = 4$.',
        'The intersection points are $x = -2$ and $x = 2$. Since $y = 4$ is on top, integrate $\\int_{-2}^{2}(4 - x^2)\\,dx$.',
        'Evaluate: $\\left[4x - \\frac{x^3}{3}\\right]_{-2}^{2} = \\frac{32}{3}$.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Find the volume of the solid obtained by revolving $y = x^2$ around the $x$-axis from $x = 0$ to $x = 3$. Give your answer in terms of $\\pi$ (e.g. "243pi/5").',
      correct_answer: '243pi/5',
      explanation:
        'Using the disk method: $$V = \\int_0^3 \\pi (x^2)^2 \\, dx = \\pi \\int_0^3 x^4 \\, dx = \\pi \\left[\\frac{x^5}{5}\\right]_0^3 = \\pi \\cdot \\frac{243}{5} = \\frac{243\\pi}{5}$$',
      hints: [
        'Use the disk method: $V = \\pi \\int_0^3 [f(x)]^2 dx$ where $f(x) = x^2$.',
        '$[f(x)]^2 = x^4$. So compute $\\pi \\int_0^3 x^4 \\, dx$.',
        '$\\pi \\cdot \\frac{x^5}{5}\\Big|_0^3 = \\frac{243\\pi}{5}$.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Find the area between $y = \\sin(x)$ and the $x$-axis from $x = 0$ to $x = \\pi$.',
      correct_answer: '2',
      explanation:
        'Since $\\sin(x) \\ge 0$ on $[0, \\pi]$: $$\\int_0^{\\pi} \\sin(x) \\, dx = [-\\cos(x)]_0^{\\pi} = -\\cos(\\pi) - (-\\cos(0)) = -(-1) + 1 = 2$$',
      hints: [
        'The area under a non-negative curve is just the definite integral. What is the antiderivative of $\\sin(x)$?',
        'The antiderivative of $\\sin(x)$ is $-\\cos(x)$. Evaluate from $0$ to $\\pi$.',
        '$-\\cos(\\pi) + \\cos(0) = 1 + 1 = 2$.',
      ],
      difficulty: 9,
    },
  ],

  // ─── calc-07: Sequences & Series (difficulty 9) ───────────────────────────────
  'calc-07': [
    {
      problem_text:
        'Find the sum of the infinite geometric series: $$\\sum_{n=0}^{\\infty} \\frac{3}{4^n}$$',
      correct_answer: '4',
      explanation:
        'This is a geometric series with first term $a = 3$ and common ratio $r = \\frac{1}{4}$. Since $|r| < 1$, it converges: $$S = \\frac{a}{1-r} = \\frac{3}{1 - \\frac{1}{4}} = \\frac{3}{\\frac{3}{4}} = 4$$',
      hints: [
        'Identify the first term $a$ and the common ratio $r$. Each term is multiplied by what to get the next?',
        'First term is $a = 3$ (when $n = 0$), and $r = \\frac{1}{4}$. Use the geometric series formula $S = \\frac{a}{1-r}$.',
        '$S = \\frac{3}{1 - 1/4} = \\frac{3}{3/4} = 4$.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Does the series $\\displaystyle\\sum_{n=1}^{\\infty} \\frac{n}{n^2 + 1}$ converge or diverge? Answer "converge" or "diverge".',
      correct_answer: 'diverge',
      explanation:
        'Use the limit comparison test with $b_n = \\frac{1}{n}$: $$\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = \\lim_{n \\to \\infty} \\frac{n/(n^2+1)}{1/n} = \\lim_{n \\to \\infty} \\frac{n^2}{n^2+1} = 1$$ Since the limit is a positive finite number and $\\sum \\frac{1}{n}$ diverges (harmonic series), the given series also diverges.',
      hints: [
        'For large $n$, $\\frac{n}{n^2+1} \\approx \\frac{n}{n^2} = \\frac{1}{n}$. What series does this resemble?',
        'Compare with the harmonic series $\\sum \\frac{1}{n}$ using the limit comparison test.',
        'The limit comparison gives $1$ (finite, positive), and the harmonic series diverges, so this series also diverges.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Find the 5th partial sum $S_5$ of the series $\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{2^n}$.',
      correct_answer: '31/32',
      explanation:
        'Compute the first 5 terms: $$S_5 = \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\frac{1}{16} + \\frac{1}{32} = \\frac{16 + 8 + 4 + 2 + 1}{32} = \\frac{31}{32}$$ Alternatively, use the geometric partial sum formula: $S_n = a\\frac{1-r^n}{1-r} = \\frac{1/2 \\cdot (1 - 1/32)}{1/2} = \\frac{31}{32}$.',
      hints: [
        'The 5th partial sum is the sum of the first 5 terms: $\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\frac{1}{16} + \\frac{1}{32}$.',
        'Find a common denominator (32) and add the numerators.',
        '$\\frac{16+8+4+2+1}{32} = \\frac{31}{32}$.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Does the series $\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{n^3}$ converge or diverge? Answer "converge" or "diverge".',
      correct_answer: 'converge',
      explanation:
        'This is a $p$-series with $p = 3$. A $p$-series $\\sum \\frac{1}{n^p}$ converges when $p > 1$. Since $3 > 1$, the series converges.',
      hints: [
        'This is a $p$-series of the form $\\sum \\frac{1}{n^p}$. What is $p$ here?',
        'The $p$-series test says: converges if $p > 1$, diverges if $p \\le 1$.',
        'Here $p = 3 > 1$, so the series converges.',
      ],
      difficulty: 9,
    },
    {
      problem_text:
        'Find the sum of the geometric series: $$\\sum_{n=0}^{\\infty} (-1)^n \\frac{2}{3^n}$$',
      correct_answer: '3/2',
      explanation:
        'This is a geometric series with $a = 2$ and $r = -\\frac{1}{3}$. Since $|r| = \\frac{1}{3} < 1$, it converges: $$S = \\frac{a}{1-r} = \\frac{2}{1-(-\\frac{1}{3})} = \\frac{2}{\\frac{4}{3}} = \\frac{3}{2}$$',
      hints: [
        'Rewrite as $\\sum_{n=0}^{\\infty} 2 \\cdot \\left(-\\frac{1}{3}\\right)^n$. Identify $a$ and $r$.',
        'First term $a = 2$, common ratio $r = -\\frac{1}{3}$. The formula is $S = \\frac{a}{1-r}$.',
        '$S = \\frac{2}{1+\\frac{1}{3}} = \\frac{2}{\\frac{4}{3}} = \\frac{3}{2}$.',
      ],
      difficulty: 9,
    },
  ],

  // ─── calc-08: Parametric & Polar (difficulty 8) ───────────────────────────────
  'calc-08': [
    {
      problem_text:
        'Convert the polar coordinates $(r, \\theta) = (4, \\pi/3)$ to Cartesian coordinates $(x, y)$. Give your answer as "x,y" (e.g. "2,3").',
      correct_answer: '2,2sqrt(3)',
      explanation:
        'Use $x = r\\cos\\theta$ and $y = r\\sin\\theta$: $$x = 4\\cos\\frac{\\pi}{3} = 4 \\cdot \\frac{1}{2} = 2$$ $$y = 4\\sin\\frac{\\pi}{3} = 4 \\cdot \\frac{\\sqrt{3}}{2} = 2\\sqrt{3}$$',
      hints: [
        'The conversion formulas are $x = r\\cos\\theta$ and $y = r\\sin\\theta$.',
        'Substitute $r = 4$ and $\\theta = \\frac{\\pi}{3}$. Recall $\\cos(\\pi/3) = 1/2$ and $\\sin(\\pi/3) = \\sqrt{3}/2$.',
        '$x = 4 \\cdot \\frac{1}{2} = 2$ and $y = 4 \\cdot \\frac{\\sqrt{3}}{2} = 2\\sqrt{3}$.',
      ],
      difficulty: 8,
    },
    {
      problem_text:
        'Convert the Cartesian point $(x, y) = (0, -5)$ to polar coordinates $(r, \\theta)$. Give $\\theta$ in radians. Answer as "r,theta" (e.g. "5,3pi/2").',
      correct_answer: '5,3pi/2',
      explanation:
        'Compute $r = \\sqrt{x^2 + y^2} = \\sqrt{0 + 25} = 5$. Since $x = 0$ and $y < 0$, the point lies on the negative $y$-axis, so $\\theta = \\frac{3\\pi}{2}$.',
      hints: [
        'Use $r = \\sqrt{x^2 + y^2}$ to find $r$.',
        '$r = \\sqrt{0 + 25} = 5$. Now determine the angle. The point $(0, -5)$ is on which axis?',
        'It is on the negative $y$-axis, so $\\theta = \\frac{3\\pi}{2}$.',
      ],
      difficulty: 8,
    },
    {
      problem_text:
        'Given the parametric equations $x = t^2$ and $y = t^3 - t$, find $\\frac{dy}{dx}$ at $t = 1$.',
      correct_answer: '1',
      explanation:
        'Use the parametric derivative formula: $$\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$$ $\\frac{dx}{dt} = 2t$ and $\\frac{dy}{dt} = 3t^2 - 1$. At $t = 1$: $$\\frac{dy}{dx} = \\frac{3(1) - 1}{2(1)} = \\frac{2}{2} = 1$$',
      hints: [
        'For parametric curves, $\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$. Find both derivatives with respect to $t$.',
        '$\\frac{dx}{dt} = 2t$ and $\\frac{dy}{dt} = 3t^2 - 1$. Divide them.',
        'At $t = 1$: $\\frac{3-1}{2} = \\frac{2}{2} = 1$.',
      ],
      difficulty: 8,
    },
    {
      problem_text:
        'Convert the polar equation $r = 6\\cos\\theta$ to a Cartesian equation.',
      correct_answer: '(x-3)^2+y^2=9',
      explanation:
        'Multiply both sides by $r$: $r^2 = 6r\\cos\\theta$. Since $r^2 = x^2 + y^2$ and $r\\cos\\theta = x$: $$x^2 + y^2 = 6x$$ Complete the square: $(x^2 - 6x + 9) + y^2 = 9$, giving $(x-3)^2 + y^2 = 9$.',
      hints: [
        'Multiply both sides of $r = 6\\cos\\theta$ by $r$ to get $r^2 = 6r\\cos\\theta$.',
        'Substitute $r^2 = x^2+y^2$ and $r\\cos\\theta = x$ to get $x^2 + y^2 = 6x$.',
        'Rearrange and complete the square in $x$: $(x-3)^2 + y^2 = 9$. This is a circle centered at $(3,0)$ with radius $3$.',
      ],
      difficulty: 8,
    },
    {
      problem_text:
        'Given the parametric equations $x = 3\\cos(t)$ and $y = 3\\sin(t)$, find $\\frac{dy}{dx}$ at $t = \\pi/4$.',
      correct_answer: '-1',
      explanation:
        'Compute: $\\frac{dx}{dt} = -3\\sin(t)$ and $\\frac{dy}{dt} = 3\\cos(t)$. So: $$\\frac{dy}{dx} = \\frac{3\\cos(t)}{-3\\sin(t)} = -\\cot(t)$$ At $t = \\frac{\\pi}{4}$: $\\frac{dy}{dx} = -\\cot\\frac{\\pi}{4} = -1$.',
      hints: [
        'Use $\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$. Find $\\frac{dx}{dt}$ and $\\frac{dy}{dt}$.',
        '$\\frac{dx}{dt} = -3\\sin(t)$ and $\\frac{dy}{dt} = 3\\cos(t)$. The ratio simplifies to $-\\cot(t)$.',
        'At $t = \\pi/4$: $-\\cot(\\pi/4) = -1$ since $\\cos(\\pi/4) = \\sin(\\pi/4)$.',
      ],
      difficulty: 8,
    },
  ],
};
