import type { StaticProblem } from '../bank';

export const PROB_STATS_PROBLEMS: Record<string, StaticProblem[]> = {
  'probstat-01': [
    {
      problem_text: 'A fair six-sided die is rolled twice. What is the probability that the sum is 7? Give your answer as a fraction.',
      correct_answer: '1/6',
      explanation: 'There are $6^2 = 36$ equally likely outcomes. The pairs that sum to 7 are: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ — that is 6 outcomes. So $P = \\frac{6}{36} = \\frac{1}{6}$.',
      hints: [
        'List all outcomes — there are $6 \\times 6 = 36$ total.',
        'Count pairs $(a, b)$ with $a + b = 7$. For each value of $a$ from 1 to 6, $b = 7 - a$.',
        'There are 6 such pairs. $P = \\frac{6}{36} = \\frac{1}{6}$.',
      ],
      difficulty: 7,
    },
    {
      problem_text: 'A bag contains 5 red and 3 blue marbles. Two marbles are drawn without replacement. What is the probability both are red? Give your answer as a fraction.',
      correct_answer: '5/14',
      explanation: '$P(\\text{both red}) = \\frac{5}{8} \\cdot \\frac{4}{7} = \\frac{20}{56} = \\frac{5}{14}$.',
      hints: [
        'The probability of the first marble being red is $\\frac{5}{8}$.',
        'Given the first was red, there are 4 red left out of 7 total. So $P(\\text{2nd red} | \\text{1st red}) = \\frac{4}{7}$.',
        'Multiply: $\\frac{5}{8} \\cdot \\frac{4}{7} = \\frac{20}{56} = \\frac{5}{14}$.',
      ],
      difficulty: 7,
    },
    {
      problem_text: 'A medical test has a 95% true positive rate and 3% false positive rate. If 1% of the population has the disease, what is the probability a person who tests positive actually has the disease? Give your answer as a fraction (simplified) or decimal to 3 places.',
      correct_answer: '0.243',
      explanation: 'By Bayes\' theorem: $P(D|+) = \\frac{P(+|D)P(D)}{P(+|D)P(D) + P(+|\\lnot D)P(\\lnot D)} = \\frac{0.95 \\times 0.01}{0.95 \\times 0.01 + 0.03 \\times 0.99} = \\frac{0.0095}{0.0095 + 0.0297} = \\frac{0.0095}{0.0392} \\approx 0.242$. Rounding: $\\approx 0.243$.',
      hints: [
        'Use Bayes\' theorem: $P(D|+) = \\frac{P(+|D) \\cdot P(D)}{P(+)}$.',
        'Compute the total probability of testing positive: $P(+) = P(+|D)P(D) + P(+|\\lnot D)P(\\lnot D) = 0.95(0.01) + 0.03(0.99) = 0.0392$.',
        '$P(D|+) = \\frac{0.0095}{0.0392} \\approx 0.243$.',
      ],
      difficulty: 7,
    },
    {
      problem_text: 'Events $A$ and $B$ are independent with $P(A) = 0.4$ and $P(B) = 0.5$. Find $P(A \\cup B)$.',
      correct_answer: '0.7',
      explanation: 'For independent events: $P(A \\cap B) = P(A) \\cdot P(B) = 0.2$. Then $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.4 + 0.5 - 0.2 = 0.7$.',
      hints: [
        'Use inclusion-exclusion: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.',
        'Since $A$ and $B$ are independent, $P(A \\cap B) = P(A) \\cdot P(B) = 0.4 \\times 0.5 = 0.2$.',
        '$P(A \\cup B) = 0.4 + 0.5 - 0.2 = 0.7$.',
      ],
      difficulty: 7,
    },
    {
      problem_text: 'Three coins are flipped. What is the probability of getting at least 2 heads? Give your answer as a fraction.',
      correct_answer: '1/2',
      explanation: 'There are $2^3 = 8$ outcomes. At least 2 heads: HHH, HHT, HTH, THH = 4 outcomes. $P = \\frac{4}{8} = \\frac{1}{2}$.',
      hints: [
        'Total outcomes when flipping 3 coins: $2^3 = 8$.',
        'Count outcomes with 2 or 3 heads: $\\binom{3}{2} = 3$ ways for exactly 2 heads, plus 1 way for 3 heads.',
        '$P = \\frac{3 + 1}{8} = \\frac{4}{8} = \\frac{1}{2}$.',
      ],
      difficulty: 7,
    },
  ],

  'probstat-02': [
    {
      problem_text: 'A discrete random variable $X$ has PMF: $P(X=1) = 0.2$, $P(X=2) = 0.3$, $P(X=3) = 0.5$. Find $E[X]$.',
      correct_answer: '2.3',
      explanation: '$E[X] = 1(0.2) + 2(0.3) + 3(0.5) = 0.2 + 0.6 + 1.5 = 2.3$.',
      hints: [
        '$E[X] = \\sum x \\cdot P(X = x)$.',
        'Compute each term: $1 \\times 0.2 = 0.2$, $2 \\times 0.3 = 0.6$, $3 \\times 0.5 = 1.5$.',
        '$E[X] = 0.2 + 0.6 + 1.5 = 2.3$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'A fair die is rolled. Let $X$ be the number shown. Find $E[X]$. Give your answer as a fraction.',
      correct_answer: '7/2',
      explanation: '$E[X] = \\frac{1}{6}(1 + 2 + 3 + 4 + 5 + 6) = \\frac{21}{6} = \\frac{7}{2}$.',
      hints: [
        'Each outcome $x = 1, 2, \\ldots, 6$ has probability $\\frac{1}{6}$.',
        '$E[X] = \\frac{1}{6}(1 + 2 + 3 + 4 + 5 + 6) = \\frac{1}{6} \\cdot 21$.',
        '$\\frac{21}{6} = \\frac{7}{2} = 3.5$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Let $X \\sim \\text{Binomial}(10, 0.3)$. Find $E[X]$.',
      correct_answer: '3',
      explanation: 'For a binomial random variable, $E[X] = np = 10 \\times 0.3 = 3$.',
      hints: [
        '$X$ counts the number of successes in 10 independent trials.',
        'The expected value of a Binomial$(n, p)$ random variable is $E[X] = np$.',
        '$E[X] = 10 \\times 0.3 = 3$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'A random variable $X$ has PMF: $P(X=0) = 0.1$, $P(X=1) = 0.4$, $P(X=2) = 0.3$, $P(X=3) = 0.2$. Find $P(X \\geq 2)$.',
      correct_answer: '0.5',
      explanation: '$P(X \\geq 2) = P(X=2) + P(X=3) = 0.3 + 0.2 = 0.5$.',
      hints: [
        '$P(X \\geq 2) = P(X = 2) + P(X = 3)$ since $X$ takes integer values.',
        'Look up the probabilities: $P(X=2) = 0.3$ and $P(X=3) = 0.2$.',
        '$0.3 + 0.2 = 0.5$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Let $X \\sim \\text{Geometric}(p = 0.25)$ where $X$ is the number of trials until the first success (starting from 1). Find $E[X]$.',
      correct_answer: '4',
      explanation: 'For a geometric random variable, $E[X] = \\frac{1}{p} = \\frac{1}{0.25} = 4$.',
      hints: [
        'The geometric distribution models the number of trials until the first success.',
        'Its expected value is $E[X] = \\frac{1}{p}$.',
        '$E[X] = \\frac{1}{0.25} = 4$.',
      ],
      difficulty: 8,
    },
  ],

  'probstat-03': [
    {
      problem_text: 'A random variable $X$ has $E[X] = 5$ and $E[X^2] = 30$. Find $\\text{Var}(X)$.',
      correct_answer: '5',
      explanation: '$\\text{Var}(X) = E[X^2] - (E[X])^2 = 30 - 25 = 5$.',
      hints: [
        'Use the variance formula: $\\text{Var}(X) = E[X^2] - (E[X])^2$.',
        'You are given $E[X^2] = 30$ and $E[X] = 5$, so $(E[X])^2 = 25$.',
        '$\\text{Var}(X) = 30 - 25 = 5$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Let $X \\sim \\text{Binomial}(20, 0.4)$. Find $\\text{Var}(X)$.',
      correct_answer: '4.8',
      explanation: 'For a binomial RV, $\\text{Var}(X) = np(1-p) = 20 \\times 0.4 \\times 0.6 = 4.8$.',
      hints: [
        'The variance of a Binomial$(n, p)$ random variable is $\\text{Var}(X) = np(1-p)$.',
        'Here $n = 20$, $p = 0.4$, so $1 - p = 0.6$.',
        '$\\text{Var}(X) = 20 \\times 0.4 \\times 0.6 = 4.8$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'If $X$ has $\\text{Var}(X) = 9$, find $\\text{Var}(3X + 5)$.',
      correct_answer: '81',
      explanation: '$\\text{Var}(aX + b) = a^2 \\text{Var}(X)$. So $\\text{Var}(3X + 5) = 9 \\cdot 9 = 81$.',
      hints: [
        'Recall the property: $\\text{Var}(aX + b) = a^2 \\text{Var}(X)$. Adding a constant does not affect variance.',
        'Here $a = 3$ and $b = 5$.',
        '$\\text{Var}(3X + 5) = 3^2 \\cdot 9 = 81$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Let $X$ and $Y$ be independent random variables with $E[X] = 3$, $E[Y] = 7$, $\\text{Var}(X) = 4$, $\\text{Var}(Y) = 9$. Find $E[X + Y]$ and $\\text{Var}(X + Y)$. Give as "E,Var".',
      correct_answer: '10,13',
      explanation: '$E[X+Y] = E[X] + E[Y] = 3 + 7 = 10$. Since $X, Y$ are independent, $\\text{Var}(X+Y) = \\text{Var}(X) + \\text{Var}(Y) = 4 + 9 = 13$.',
      hints: [
        'Expectation is always linear: $E[X+Y] = E[X] + E[Y]$ regardless of independence.',
        'For independent variables, variances also add: $\\text{Var}(X+Y) = \\text{Var}(X) + \\text{Var}(Y)$.',
        '$E[X+Y] = 10$ and $\\text{Var}(X+Y) = 13$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'A discrete random variable $X$ takes values 1, 2, 3 with probabilities $0.2, 0.5, 0.3$ respectively. Find the standard deviation of $X$. Round to 2 decimal places.',
      correct_answer: '0.70',
      explanation: '$E[X] = 1(0.2) + 2(0.5) + 3(0.3) = 0.2 + 1.0 + 0.9 = 2.1$. $E[X^2] = 1(0.2) + 4(0.5) + 9(0.3) = 0.2 + 2.0 + 2.7 = 4.9$. $\\text{Var}(X) = 4.9 - (2.1)^2 = 4.9 - 4.41 = 0.49$. $\\text{SD}(X) = \\sqrt{0.49} = 0.70$.',
      hints: [
        'First compute $E[X] = \\sum x \\cdot P(X=x) = 1(0.2) + 2(0.5) + 3(0.3) = 2.1$.',
        'Then $E[X^2] = 1^2(0.2) + 2^2(0.5) + 3^2(0.3) = 4.9$. So $\\text{Var}(X) = 4.9 - 2.1^2 = 0.49$.',
        'Standard deviation $= \\sqrt{0.49} = 0.70$.',
      ],
      difficulty: 8,
    },
  ],

  'probstat-04': [
    {
      problem_text: 'A 95% confidence interval for a population mean is $(12.3, 15.7)$. What is the sample mean $\\bar{x}$?',
      correct_answer: '14',
      explanation: 'The sample mean is the midpoint of the confidence interval: $\\bar{x} = \\frac{12.3 + 15.7}{2} = \\frac{28}{2} = 14$.',
      hints: [
        'A confidence interval is centered at the sample mean.',
        'Find the midpoint: $\\frac{\\text{lower} + \\text{upper}}{2}$.',
        '$\\frac{12.3 + 15.7}{2} = 14$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'A 95% confidence interval for a population mean is $(12.3, 15.7)$. What is the margin of error?',
      correct_answer: '1.7',
      explanation: 'Margin of error $= \\frac{\\text{upper} - \\text{lower}}{2} = \\frac{15.7 - 12.3}{2} = \\frac{3.4}{2} = 1.7$.',
      hints: [
        'The margin of error is half the width of the confidence interval.',
        'Width $= 15.7 - 12.3 = 3.4$.',
        'Margin of error $= 3.4 / 2 = 1.7$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'A hypothesis test has $H_0: \\mu = 50$ vs $H_a: \\mu > 50$. The test statistic is $z = 2.1$ and the critical value at $\\alpha = 0.05$ is $z_{0.05} = 1.645$. Do you reject $H_0$? Answer "reject" or "fail to reject".',
      correct_answer: 'reject',
      explanation: 'Since $z = 2.1 > 1.645 = z_{0.05}$, the test statistic falls in the rejection region, so we reject $H_0$ at the 5% significance level.',
      hints: [
        'For a right-tailed test, reject $H_0$ if $z > z_{\\alpha}$.',
        'Compare: $z = 2.1$ and $z_{0.05} = 1.645$.',
        '$2.1 > 1.645$, so reject $H_0$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'A sample of size $n = 64$ has sample mean $\\bar{x} = 80$ and known population standard deviation $\\sigma = 16$. Find the test statistic $z$ for testing $H_0: \\mu = 75$.',
      correct_answer: '2.5',
      explanation: '$z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}} = \\frac{80 - 75}{16 / \\sqrt{64}} = \\frac{5}{2} = 2.5$.',
      hints: [
        'The $z$-test statistic is $z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}}$.',
        'Compute the standard error: $\\frac{\\sigma}{\\sqrt{n}} = \\frac{16}{8} = 2$.',
        '$z = \\frac{80 - 75}{2} = \\frac{5}{2} = 2.5$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'A Type I error occurs when we reject a true null hypothesis. If $\\alpha = 0.01$, what is the probability of a Type I error?',
      correct_answer: '0.01',
      explanation: 'The significance level $\\alpha$ is exactly the probability of a Type I error. If $\\alpha = 0.01$, then $P(\\text{Type I error}) = 0.01$.',
      hints: [
        'A Type I error means rejecting $H_0$ when it is actually true.',
        'The significance level $\\alpha$ defines the maximum probability of this error.',
        '$\\alpha = 0.01$, so the probability of a Type I error is $0.01$.',
      ],
      difficulty: 9,
    },
  ],

  'probstat-05': [
    {
      problem_text: 'Given data points $(1, 2), (2, 4), (3, 5), (4, 4), (5, 5)$, the least-squares regression line is $\\hat{y} = a + bx$. Find the slope $b$. Give your answer as a decimal.',
      correct_answer: '0.6',
      explanation: '$\\bar{x} = 3, \\bar{y} = 4$. $\\sum (x_i - \\bar{x})(y_i - \\bar{y}) = (-2)(-2)+(-1)(0)+(0)(1)+(1)(0)+(2)(1) = 4+0+0+0+2 = 6$. $\\sum (x_i - \\bar{x})^2 = 4+1+0+1+4 = 10$. $b = \\frac{6}{10} = 0.6$.',
      hints: [
        'The slope is $b = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum (x_i - \\bar{x})^2}$. First find $\\bar{x} = 3$ and $\\bar{y} = 4$.',
        'Compute deviations: $(x_i - \\bar{x})$: $-2, -1, 0, 1, 2$ and $(y_i - \\bar{y})$: $-2, 0, 1, 0, 1$.',
        'Numerator: $(-2)(-2) + (-1)(0) + (0)(1) + (1)(0) + (2)(1) = 6$. Denominator: $4+1+0+1+4=10$. $b = 0.6$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Using the data from the previous problem with slope $b = 0.6$, find the $y$-intercept $a$ of the regression line $\\hat{y} = a + bx$.',
      correct_answer: '2.2',
      explanation: '$a = \\bar{y} - b\\bar{x} = 4 - 0.6(3) = 4 - 1.8 = 2.2$.',
      hints: [
        'The regression line passes through $(\\bar{x}, \\bar{y})$.',
        'Use $a = \\bar{y} - b \\bar{x}$.',
        '$a = 4 - 0.6 \\times 3 = 4 - 1.8 = 2.2$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'The correlation coefficient between two variables is $r = -0.8$. What is the coefficient of determination $R^2$?',
      correct_answer: '0.64',
      explanation: '$R^2 = r^2 = (-0.8)^2 = 0.64$. This means 64% of the variance in $y$ is explained by the linear relationship with $x$.',
      hints: [
        'The coefficient of determination is $R^2 = r^2$.',
        'Square the correlation coefficient: $(-0.8)^2$.',
        '$R^2 = 0.64$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'In a regression analysis, $SS_{\\text{total}} = 200$ and $SS_{\\text{residual}} = 50$. Find $R^2$.',
      correct_answer: '0.75',
      explanation: '$R^2 = 1 - \\frac{SS_{\\text{residual}}}{SS_{\\text{total}}} = 1 - \\frac{50}{200} = 1 - 0.25 = 0.75$.',
      hints: [
        '$R^2$ measures the proportion of total variation explained by the model.',
        '$R^2 = 1 - \\frac{SS_{\\text{residual}}}{SS_{\\text{total}}}$.',
        '$R^2 = 1 - \\frac{50}{200} = 0.75$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'A regression line $\\hat{y} = 3 + 2x$ is fitted to data. Predict $\\hat{y}$ when $x = 4.5$.',
      correct_answer: '12',
      explanation: '$\\hat{y} = 3 + 2(4.5) = 3 + 9 = 12$.',
      hints: [
        'Substitute $x = 4.5$ into the equation $\\hat{y} = 3 + 2x$.',
        '$2 \\times 4.5 = 9$.',
        '$\\hat{y} = 3 + 9 = 12$.',
      ],
      difficulty: 9,
    },
  ],
};
