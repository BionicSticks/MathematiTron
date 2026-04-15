import type { StaticProblem } from '../bank';

export const DISCRETE_PROBLEMS: Record<string, StaticProblem[]> = {
  'discrete-01': [
    {
      problem_text: 'Construct a truth table for $(p \\land q) \\to p$. Is this formula a tautology? Answer "yes" or "no".',
      correct_answer: 'yes',
      explanation: 'When $p \\land q$ is true, both $p$ and $q$ are true, so $(p \\land q) \\to p$ is $T \\to T = T$. When $p \\land q$ is false, the implication is vacuously true. So the formula is always true — a tautology.',
      hints: [
        'An implication $A \\to B$ is false only when $A$ is true and $B$ is false.',
        'When is $p \\land q$ true? Only when both $p$ and $q$ are true.',
        'If $p \\land q$ is true, then in particular $p$ is true. So $T \\to T = T$. In all other rows, the antecedent is false, making the implication true.',
      ],
      difficulty: 7,
    },
    {
      problem_text: 'What is the contrapositive of the statement "If it rains, then the ground is wet"? Express as "If ___, then ___" using the options: (A) If the ground is not wet, then it does not rain. (B) If it does not rain, then the ground is not wet. Answer "A" or "B".',
      correct_answer: 'A',
      explanation: 'The contrapositive of $p \\to q$ is $\\lnot q \\to \\lnot p$. Here $p$ = "it rains" and $q$ = "the ground is wet", so the contrapositive is "If the ground is not wet, then it does not rain."',
      hints: [
        'The contrapositive of $p \\to q$ is $\\lnot q \\to \\lnot p$.',
        'Identify: $p$ = "it rains", $q$ = "the ground is wet".',
        'Negate and swap: "If the ground is not wet ($\\lnot q$), then it does not rain ($\\lnot p$)." That is option A.',
      ],
      difficulty: 7,
    },
    {
      problem_text: 'Simplify the logical expression $\\lnot(p \\lor q)$ using De Morgan\'s law.',
      correct_answer: '(~p) and (~q)',
      explanation: 'By De Morgan\'s law: $\\lnot(p \\lor q) \\equiv \\lnot p \\land \\lnot q$.',
      hints: [
        'De Morgan\'s laws relate negation with conjunction and disjunction.',
        'The law states: $\\lnot(p \\lor q) \\equiv \\lnot p \\land \\lnot q$.',
        'Negate each part and change $\\lor$ to $\\land$: $\\lnot p \\land \\lnot q$.',
      ],
      difficulty: 7,
    },
    {
      problem_text: 'How many rows does a truth table have if there are 5 propositional variables?',
      correct_answer: '32',
      explanation: 'Each variable can be T or F, so there are $2^5 = 32$ rows.',
      hints: [
        'Each variable has 2 possible values: true or false.',
        'With $n$ variables, the total number of combinations is $2^n$.',
        '$2^5 = 32$.',
      ],
      difficulty: 7,
    },
    {
      problem_text: 'Is the statement $p \\to (q \\to p)$ a tautology? Answer "yes" or "no".',
      correct_answer: 'yes',
      explanation: '$q \\to p$ is false only when $q$ is true and $p$ is false. Then $p \\to (q \\to p)$ becomes $F \\to F = T$. When $p$ is true, $p \\to (\\text{anything}) = T \\to (\\text{anything})$, and $q \\to p = q \\to T = T$, so $T \\to T = T$. It is always true.',
      hints: [
        'Check each case. Start with $p = T$: then $q \\to p = q \\to T = T$, and $T \\to T = T$.',
        'Now try $p = F$: then $p \\to (q \\to p) = F \\to (q \\to F)$.',
        'An implication with a false antecedent ($F \\to \\text{anything}$) is always true. So the whole expression is true in every case.',
      ],
      difficulty: 7,
    },
  ],

  'discrete-02': [
    {
      problem_text: 'Let $A = \\{1, 2, 3, 4\\}$ and $B = \\{3, 4, 5, 6\\}$. Find $|A \\cup B|$.',
      correct_answer: '6',
      explanation: '$A \\cup B = \\{1, 2, 3, 4, 5, 6\\}$, which has 6 elements.',
      hints: [
        '$A \\cup B$ contains all elements that are in $A$ or $B$ (or both).',
        'List them out: $1, 2$ are only in $A$; $5, 6$ are only in $B$; $3, 4$ are in both.',
        '$A \\cup B = \\{1, 2, 3, 4, 5, 6\\}$, so $|A \\cup B| = 6$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Let $A = \\{1, 2, 3\\}$. How many elements does the power set $\\mathcal{P}(A)$ have?',
      correct_answer: '8',
      explanation: 'The power set of a set with $n$ elements has $2^n$ elements. Here $n = 3$, so $|\\mathcal{P}(A)| = 2^3 = 8$.',
      hints: [
        'The power set $\\mathcal{P}(A)$ is the set of all subsets of $A$.',
        'Each element is either included or excluded from a subset, giving 2 choices per element.',
        'With 3 elements: $2^3 = 8$ subsets (including $\\emptyset$ and $A$ itself).',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Let $A = \\{a, b, c, d\\}$ and $B = \\{c, d, e\\}$. Find $|A \\setminus B|$, the number of elements in $A$ but not in $B$.',
      correct_answer: '2',
      explanation: '$A \\setminus B = \\{a, b\\}$, since $c$ and $d$ are in $B$. So $|A \\setminus B| = 2$.',
      hints: [
        '$A \\setminus B$ contains elements in $A$ that are NOT in $B$.',
        'Check each element of $A$: $a \\notin B$ ✓, $b \\notin B$ ✓, $c \\in B$ ✗, $d \\in B$ ✗.',
        '$A \\setminus B = \\{a, b\\}$, which has 2 elements.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'In a class of 40 students, 25 study math, 20 study physics, and 10 study both. How many study neither?',
      correct_answer: '5',
      explanation: 'By inclusion-exclusion: $|M \\cup P| = 25 + 20 - 10 = 35$. Students studying neither: $40 - 35 = 5$.',
      hints: [
        'Use the inclusion-exclusion principle: $|A \\cup B| = |A| + |B| - |A \\cap B|$.',
        '$|M \\cup P| = 25 + 20 - 10 = 35$ students study at least one subject.',
        'Neither: $40 - 35 = 5$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'If $|A| = 5$ and $|B| = 3$, what is the maximum possible value of $|A \\cap B|$?',
      correct_answer: '3',
      explanation: 'The intersection cannot be larger than either set. Since $|B| = 3$, the maximum $|A \\cap B|$ is 3, achieved when $B \\subseteq A$.',
      hints: [
        '$A \\cap B$ is a subset of both $A$ and $B$.',
        'Since $A \\cap B \\subseteq B$, we must have $|A \\cap B| \\leq |B| = 3$.',
        'This maximum is achievable: if $B \\subseteq A$, then $A \\cap B = B$ and $|A \\cap B| = 3$.',
      ],
      difficulty: 8,
    },
  ],

  'discrete-03': [
    {
      problem_text: 'How many ways can 8 people be arranged in a line?',
      correct_answer: '40320',
      explanation: 'The number of permutations of 8 people is $8! = 40320$.',
      hints: [
        'Arranging $n$ distinct objects in a line is a permutation problem.',
        'The first position has 8 choices, the second has 7, and so on.',
        '$8! = 8 \\times 7 \\times 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1 = 40320$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'How many ways can you choose a committee of 3 from 10 people? That is, compute $\\binom{10}{3}$.',
      correct_answer: '120',
      explanation: '$\\binom{10}{3} = \\frac{10!}{3! \\cdot 7!} = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = \\frac{720}{6} = 120$.',
      hints: [
        'Use the combination formula: $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$.',
        '$\\binom{10}{3} = \\frac{10!}{3! \\cdot 7!} = \\frac{10 \\times 9 \\times 8}{3!}$.',
        '$\\frac{720}{6} = 120$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'What is the coefficient of $x^3$ in the expansion of $(1 + x)^7$?',
      correct_answer: '35',
      explanation: 'By the binomial theorem, the coefficient of $x^3$ is $\\binom{7}{3} = \\frac{7!}{3!4!} = \\frac{7 \\times 6 \\times 5}{6} = 35$.',
      hints: [
        'The binomial theorem states $(1+x)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^k$.',
        'The coefficient of $x^3$ is $\\binom{7}{3}$.',
        '$\\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'How many 4-letter strings can be formed from the letters A, B, C, D, E if repetition is allowed?',
      correct_answer: '625',
      explanation: 'Each of the 4 positions has 5 choices, so the total is $5^4 = 625$.',
      hints: [
        'With repetition allowed, each position is an independent choice.',
        'There are 5 options for each of the 4 positions.',
        '$5^4 = 5 \\times 5 \\times 5 \\times 5 = 625$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'How many ways can you distribute 5 identical balls into 3 distinct boxes?',
      correct_answer: '21',
      explanation: 'This is a stars and bars problem: $\\binom{5 + 3 - 1}{3 - 1} = \\binom{7}{2} = 21$.',
      hints: [
        'This is the "stars and bars" problem: distributing $n$ identical objects into $k$ distinct bins.',
        'The formula is $\\binom{n+k-1}{k-1}$.',
        '$\\binom{5+3-1}{3-1} = \\binom{7}{2} = \\frac{7 \\times 6}{2} = 21$.',
      ],
      difficulty: 8,
    },
  ],

  'discrete-04': [
    {
      problem_text: 'A simple graph has 5 vertices and the degree sequence $(2, 2, 2, 2, 2)$. How many edges does it have?',
      correct_answer: '5',
      explanation: 'By the handshaking lemma, $\\sum \\deg(v) = 2|E|$. So $2 + 2 + 2 + 2 + 2 = 10 = 2|E|$, giving $|E| = 5$. (This is the cycle $C_5$.)',
      hints: [
        'The handshaking lemma states that the sum of all degrees equals $2|E|$.',
        '$\\sum \\deg(v) = 2 \\times 5 = 10$.',
        '$2|E| = 10$, so $|E| = 5$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Does the complete graph $K_4$ have an Eulerian circuit? Answer "yes" or "no".',
      correct_answer: 'no',
      explanation: 'In $K_4$, every vertex has degree 3 (odd). An Eulerian circuit requires all vertices to have even degree, so $K_4$ does not have one.',
      hints: [
        'An Eulerian circuit exists if and only if the graph is connected and every vertex has even degree.',
        'In $K_4$, each vertex is connected to the other 3 vertices, so each has degree 3.',
        '3 is odd, so $K_4$ does not have an Eulerian circuit.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'How many edges does the complete bipartite graph $K_{3,4}$ have?',
      correct_answer: '12',
      explanation: '$K_{m,n}$ has $m \\times n$ edges. So $K_{3,4}$ has $3 \\times 4 = 12$ edges.',
      hints: [
        'In $K_{m,n}$, every vertex in one partition is connected to every vertex in the other.',
        'The first partition has 3 vertices, each connected to all 4 vertices in the second partition.',
        '$3 \\times 4 = 12$ edges.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'A connected graph has 6 vertices and 5 edges. Is it a tree? Answer "yes" or "no".',
      correct_answer: 'yes',
      explanation: 'A tree on $n$ vertices has exactly $n - 1$ edges. Here $6 - 1 = 5$, and the graph is connected, so it is a tree.',
      hints: [
        'A tree is a connected acyclic graph.',
        'A key property: a tree on $n$ vertices has exactly $n - 1$ edges.',
        '$6 - 1 = 5$ edges matches, and the graph is connected, so it is a tree.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'What is the chromatic number of the cycle graph $C_5$ (a cycle with 5 vertices)?',
      correct_answer: '3',
      explanation: 'Odd cycles require 3 colors. You cannot 2-color $C_5$ because it has an odd number of vertices: alternating 2 colors around the cycle results in the first and last vertex being the same color, but they are adjacent. So $\\chi(C_5) = 3$.',
      hints: [
        'The chromatic number is the minimum number of colors needed so that no two adjacent vertices share a color.',
        'Try coloring with 2 colors: around a cycle, colors must alternate. But with 5 (odd) vertices, the last vertex conflicts with the first.',
        'Two colors fail for odd cycles, but 3 colors work (e.g., 1, 2, 1, 2, 3). So $\\chi(C_5) = 3$.',
      ],
      difficulty: 9,
    },
  ],

  'discrete-05': [
    {
      problem_text: 'Solve the recurrence $a_n = 5a_{n-1} - 6a_{n-2}$ with $a_0 = 1, a_1 = 4$. Find $a_4$.',
      correct_answer: '146',
      explanation: 'Computing directly: $a_2 = 5(4) - 6(1) = 14$, $a_3 = 5(14) - 6(4) = 46$, $a_4 = 5(46) - 6(14) = 146$. Or via the closed form: characteristic roots are 2 and 3, giving $a_n = -2^n + 2 \\cdot 3^n$.',
      hints: [
        'You can compute directly: $a_2 = 5a_1 - 6a_0 = 5(4) - 6(1) = 14$.',
        '$a_3 = 5(14) - 6(4) = 70 - 24 = 46$.',
        '$a_4 = 5(46) - 6(14) = 230 - 84 = 146$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Find the characteristic roots of the recurrence $a_n = 4a_{n-1} - 4a_{n-2}$. Give your answer as a single value if there is a repeated root.',
      correct_answer: '2',
      explanation: 'Characteristic equation: $r^2 - 4r + 4 = 0 \\Rightarrow (r-2)^2 = 0$. The repeated root is $r = 2$.',
      hints: [
        'Write the characteristic equation by replacing $a_n$ with $r^n$: $r^2 = 4r - 4$.',
        'Rearrange: $r^2 - 4r + 4 = 0$.',
        'Factor: $(r - 2)^2 = 0$. The repeated root is $r = 2$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'The Fibonacci sequence satisfies $F_n = F_{n-1} + F_{n-2}$ with $F_0 = 0, F_1 = 1$. Find $F_{10}$.',
      correct_answer: '55',
      explanation: '$F_0=0, F_1=1, F_2=1, F_3=2, F_4=3, F_5=5, F_6=8, F_7=13, F_8=21, F_9=34, F_{10}=55$.',
      hints: [
        'Compute the Fibonacci numbers step by step: $F_2 = F_1 + F_0 = 1$.',
        'Continue: $F_3=2, F_4=3, F_5=5, F_6=8, F_7=13, F_8=21, F_9=34$.',
        '$F_{10} = F_9 + F_8 = 34 + 21 = 55$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Solve the recurrence $a_n = 3a_{n-1}$ with $a_0 = 5$. What is $a_6$?',
      correct_answer: '3645',
      explanation: 'This is a geometric sequence: $a_n = 5 \\cdot 3^n$. So $a_6 = 5 \\cdot 3^6 = 5 \\cdot 729 = 3645$.',
      hints: [
        'This is a first-order linear recurrence with constant coefficient 3.',
        'The solution is $a_n = a_0 \\cdot 3^n = 5 \\cdot 3^n$.',
        '$a_6 = 5 \\cdot 3^6 = 5 \\cdot 729 = 3645$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'The Tower of Hanoi recurrence is $T_n = 2T_{n-1} + 1$ with $T_1 = 1$. Find $T_5$.',
      correct_answer: '31',
      explanation: '$T_1 = 1, T_2 = 3, T_3 = 7, T_4 = 15, T_5 = 31$. The closed form is $T_n = 2^n - 1$.',
      hints: [
        'Compute step by step: $T_2 = 2(1) + 1 = 3$.',
        '$T_3 = 2(3) + 1 = 7$, $T_4 = 2(7) + 1 = 15$.',
        '$T_5 = 2(15) + 1 = 31$. (The pattern is $T_n = 2^n - 1$.)',
      ],
      difficulty: 9,
    },
  ],
};
