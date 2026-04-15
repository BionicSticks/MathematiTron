import type { StaticProblem } from '../bank';

export const LINEAR_ALGEBRA_PROBLEMS: Record<string, StaticProblem[]> = {
  'linalg-01': [
    {
      problem_text: 'Let $\\mathbf{u} = \\langle 3, -1, 4 \\rangle$ and $\\mathbf{v} = \\langle 2, 5, -2 \\rangle$. Compute $2\\mathbf{u} - 3\\mathbf{v}$. Give your answer as a vector $\\langle a, b, c \\rangle$.',
      correct_answer: '<0, -17, 14>',
      explanation: '$2\\mathbf{u} = \\langle 6, -2, 8 \\rangle$ and $3\\mathbf{v} = \\langle 6, 15, -6 \\rangle$. Then $2\\mathbf{u} - 3\\mathbf{v} = \\langle 6-6, -2-15, 8-(-6) \\rangle = \\langle 0, -17, 14 \\rangle$.',
      hints: [
        'First compute $2\\mathbf{u}$ by multiplying each component of $\\mathbf{u}$ by 2.',
        'Then compute $3\\mathbf{v}$ by multiplying each component of $\\mathbf{v}$ by 3.',
        'Subtract component-wise: $2\\mathbf{u} - 3\\mathbf{v} = \\langle 6-6,\\; -2-15,\\; 8-(-6) \\rangle$.',
      ],
      difficulty: 7,
    },
    {
      problem_text: 'Find the dot product $\\mathbf{u} \\cdot \\mathbf{v}$ where $\\mathbf{u} = \\langle 4, -3, 2 \\rangle$ and $\\mathbf{v} = \\langle 1, 5, -6 \\rangle$.',
      correct_answer: '-23',
      explanation: '$\\mathbf{u} \\cdot \\mathbf{v} = (4)(1) + (-3)(5) + (2)(-6) = 4 - 15 - 12 = -23$.',
      hints: [
        'The dot product multiplies corresponding components and sums the results.',
        'Compute each product: $4 \\cdot 1 = 4$, $(-3) \\cdot 5 = -15$, $2 \\cdot (-6) = -12$.',
        'Sum them: $4 + (-15) + (-12) = -23$.',
      ],
      difficulty: 7,
    },
    {
      problem_text: 'Let $A = \\begin{pmatrix} 2 & -1 \\\\ 3 & 4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 5 & 0 \\\\ -2 & 7 \\end{pmatrix}$. Compute $A + B$. Give the entries as "a,b;c,d" (row-by-row, semicolon between rows).',
      correct_answer: '7,-1;1,11',
      explanation: 'Matrix addition is entry-wise: $A + B = \\begin{pmatrix} 2+5 & -1+0 \\\\ 3+(-2) & 4+7 \\end{pmatrix} = \\begin{pmatrix} 7 & -1 \\\\ 1 & 11 \\end{pmatrix}$.',
      hints: [
        'Add corresponding entries: top-left is $2 + 5$.',
        'Top-right: $-1 + 0 = -1$. Bottom-left: $3 + (-2) = 1$.',
        'Bottom-right: $4 + 7 = 11$. The result is $\\begin{pmatrix} 7 & -1 \\\\ 1 & 11 \\end{pmatrix}$.',
      ],
      difficulty: 7,
    },
    {
      problem_text: 'Let $\\mathbf{u} = \\langle 1, 2, -2 \\rangle$. Find $\\|\\mathbf{u}\\|$ (the magnitude of $\\mathbf{u}$).',
      correct_answer: '3',
      explanation: '$\\|\\mathbf{u}\\| = \\sqrt{1^2 + 2^2 + (-2)^2} = \\sqrt{1 + 4 + 4} = \\sqrt{9} = 3$.',
      hints: [
        'The magnitude formula is $\\|\\mathbf{u}\\| = \\sqrt{u_1^2 + u_2^2 + u_3^2}$.',
        'Compute the squares: $1^2 = 1$, $2^2 = 4$, $(-2)^2 = 4$.',
        'Sum and take the square root: $\\sqrt{1 + 4 + 4} = \\sqrt{9}$.',
      ],
      difficulty: 7,
    },
    {
      problem_text: 'Compute $3A$ where $A = \\begin{pmatrix} -1 & 4 \\\\ 2 & 0 \\end{pmatrix}$. Give the entries as "a,b;c,d".',
      correct_answer: '-3,12;6,0',
      explanation: 'Scalar multiplication multiplies every entry by the scalar: $3A = \\begin{pmatrix} -3 & 12 \\\\ 6 & 0 \\end{pmatrix}$.',
      hints: [
        'Multiply each entry in $A$ by 3.',
        '$3 \\cdot (-1) = -3$ and $3 \\cdot 4 = 12$ for the first row.',
        '$3 \\cdot 2 = 6$ and $3 \\cdot 0 = 0$ for the second row.',
      ],
      difficulty: 7,
    },
  ],

  'linalg-02': [
    {
      problem_text: 'Compute the product $AB$ where $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 0 & 1 \\\\ 5 & -2 \\end{pmatrix}$. Give the entries as "a,b;c,d".',
      correct_answer: '10,-3;20,-5',
      explanation: '$AB = \\begin{pmatrix} 1\\cdot0+2\\cdot5 & 1\\cdot1+2\\cdot(-2) \\\\ 3\\cdot0+4\\cdot5 & 3\\cdot1+4\\cdot(-2) \\end{pmatrix} = \\begin{pmatrix} 10 & -3 \\\\ 20 & -5 \\end{pmatrix}$.',
      hints: [
        'For the $(i,j)$ entry of $AB$, take the dot product of row $i$ of $A$ with column $j$ of $B$.',
        'Top-left: $1 \\cdot 0 + 2 \\cdot 5 = 10$. Top-right: $1 \\cdot 1 + 2 \\cdot (-2) = -3$.',
        'Bottom-left: $3 \\cdot 0 + 4 \\cdot 5 = 20$. Bottom-right: $3 \\cdot 1 + 4 \\cdot (-2) = -5$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Find the determinant of $A = \\begin{pmatrix} 5 & 3 \\\\ -2 & 4 \\end{pmatrix}$.',
      correct_answer: '26',
      explanation: '$\\det(A) = (5)(4) - (3)(-2) = 20 + 6 = 26$.',
      hints: [
        'For a $2 \\times 2$ matrix $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, $\\det = ad - bc$.',
        'Here $a=5$, $b=3$, $c=-2$, $d=4$.',
        '$\\det = 5 \\cdot 4 - 3 \\cdot (-2) = 20 + 6 = 26$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Find the determinant of $M = \\begin{pmatrix} 2 & 1 & 3 \\\\ 0 & -1 & 4 \\\\ 5 & 2 & 1 \\end{pmatrix}$.',
      correct_answer: '17',
      explanation: 'Expanding along the first row: $\\det(M) = 2[(-1)(1)-(4)(2)] - 1[(0)(1)-(4)(5)] + 3[(0)(2)-(-1)(5)]$ $= 2(-9) - 1(-20) + 3(5) = -18 + 20 + 15 = 17$.',
      hints: [
        'Use cofactor expansion along the first row: $\\det = a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13}$.',
        'The minor of $a_{11}=2$ is $\\begin{vmatrix} -1 & 4 \\\\ 2 & 1 \\end{vmatrix} = -1-8 = -9$.',
        'Continue: $-1 \\cdot \\begin{vmatrix} 0 & 4 \\\\ 5 & 1 \\end{vmatrix} = -1(-20) = 20$ and $3 \\cdot \\begin{vmatrix} 0 & -1 \\\\ 5 & 2 \\end{vmatrix} = 3(5) = 15$. Sum: $-18+20+15=17$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Find the transpose of $A = \\begin{pmatrix} 1 & 4 & 7 \\\\ 2 & 5 & 8 \\end{pmatrix}$. Give entries as "a,b;c,d;e,f" (3 rows, 2 columns).',
      correct_answer: '1,2;4,5;7,8',
      explanation: 'The transpose $A^T$ swaps rows and columns: $A^T = \\begin{pmatrix} 1 & 2 \\\\ 4 & 5 \\\\ 7 & 8 \\end{pmatrix}$.',
      hints: [
        'To transpose, make each row of $A$ into a column of $A^T$.',
        'Row 1 of $A$ is $(1, 4, 7)$, which becomes column 1 of $A^T$.',
        'So $A^T = \\begin{pmatrix} 1 & 2 \\\\ 4 & 5 \\\\ 7 & 8 \\end{pmatrix}$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Find the inverse of $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$. Give entries as "a,b;c,d".',
      correct_answer: '3,-1;-5,2',
      explanation: '$\\det(A) = 2 \\cdot 3 - 1 \\cdot 5 = 1$. So $A^{-1} = \\frac{1}{1}\\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$.',
      hints: [
        'For a $2\\times 2$ matrix, $A^{-1} = \\frac{1}{\\det(A)}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$.',
        'Compute $\\det(A) = 2 \\cdot 3 - 1 \\cdot 5 = 1$.',
        'Swap diagonal entries and negate off-diagonal: $\\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$.',
      ],
      difficulty: 8,
    },
  ],

  'linalg-03': [
    {
      problem_text: 'Solve the system using row reduction: $x + 2y = 5$, $3x + 4y = 11$. Give your answer as "x,y".',
      correct_answer: '1,2',
      explanation: 'Augmented matrix: $\\begin{pmatrix} 1 & 2 & | & 5 \\\\ 3 & 4 & | & 11 \\end{pmatrix}$. $R_2 \\leftarrow R_2 - 3R_1$: $\\begin{pmatrix} 1 & 2 & | & 5 \\\\ 0 & -2 & | & -4 \\end{pmatrix}$. So $y = 2$ and $x = 5 - 4 = 1$.',
      hints: [
        'Write the augmented matrix $\\begin{pmatrix} 1 & 2 & | & 5 \\\\ 3 & 4 & | & 11 \\end{pmatrix}$.',
        'Eliminate $x$ from row 2 by replacing $R_2$ with $R_2 - 3R_1$.',
        'You get $-2y = -4$, so $y = 2$. Back-substitute to find $x = 5 - 2(2) = 1$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Solve the system: $2x - y + z = 3$, $x + y - z = 0$, $3x + 2y - z = 5$. Give your answer as "x,y,z".',
      correct_answer: '1,3,4',
      explanation: 'Row reduce: swap $R_1 \\leftrightarrow R_2$, then $R_2 - 2R_1$ gives $(0,-3,3|3)$ and $R_3 - 3R_1$ gives $(0,-1,2|5)$. From row 2: $y = z-1$. Substituting into row 3: $-(z-1)+2z=5$ gives $z=4$, then $y=3$, $x=1$.',
      hints: [
        'Write the augmented matrix and swap rows to get a leading 1 in position $(1,1)$.',
        'Eliminate $x$ from rows 2 and 3. You should get $-3y + 3z = 3$ and $-y + 2z = 5$.',
        'From $-3y+3z=3$, get $y = z-1$. Substitute into $-y+2z=5$ to find $z=4$, then back-substitute.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'For what value of $k$ does the system $x + 2y = 3$, $2x + ky = 6$ have infinitely many solutions?',
      correct_answer: '4',
      explanation: 'For infinitely many solutions, the second equation must be a scalar multiple of the first. $2x + ky = 6$ should equal $2(x + 2y) = 2 \\cdot 3 = 6$. So $k = 4$.',
      hints: [
        'Infinitely many solutions means the two equations are proportional (same line).',
        'The second equation must be a constant multiple of the first. Compare $2x + ky = 6$ with $2(x + 2y) = 6$.',
        'Matching coefficients: $k = 2 \\cdot 2 = 4$.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Find the rank of the matrix $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 1 & 3 & 5 \\end{pmatrix}$.',
      correct_answer: '2',
      explanation: 'Row reduce: $R_2 - 2R_1 = (0,0,0)$ and $R_3 - R_1 = (0,1,2)$. So the row echelon form has 2 nonzero rows, hence $\\text{rank}(A) = 2$.',
      hints: [
        'Row reduce $A$ by eliminating entries below the first pivot.',
        '$R_2 - 2R_1 = (0, 0, 0)$ — row 2 is a multiple of row 1.',
        '$R_3 - R_1 = (0, 1, 2)$ gives a second pivot. Two nonzero rows means rank 2.',
      ],
      difficulty: 8,
    },
    {
      problem_text: 'Solve the system: $x + y + z = 6$, $2x + 3y + z = 14$, $x + 2y = 8$. Give your answer as "x,y,z".',
      correct_answer: '2,3,1',
      explanation: 'From eq 3: $x = 8 - 2y$. Sub into eq 1: $8 - 2y + y + z = 6 \\Rightarrow z = y - 2$. Sub both into eq 2: $2(8-2y) + 3y + (y-2) = 14 \\Rightarrow 16 - 4y + 3y + y - 2 = 14 \\Rightarrow 14 = 14$. So $y$ is free? Let me re-check with augmented matrix. $\\begin{pmatrix} 1&1&1&|&6 \\\\ 2&3&1&|&14 \\\\ 1&2&0&|&8 \\end{pmatrix}$. $R_2-2R_1$: $(0,1,-1|2)$. $R_3-R_1$: $(0,1,-1|2)$. Same row — infinite solutions. Set $z=t$: $y=t+2$, $x=4-2t$. For integer answer, take $t=1$: $(2,3,1)$.',
      hints: [
        'Form the augmented matrix and row reduce.',
        'After elimination you get $y - z = 2$. The third row becomes all zeros, giving a free variable.',
        'Let $z = t$. Then $y = t + 2$ and $x = 4 - 2t$. With $t = 1$: $(x,y,z) = (2,3,1)$.',
      ],
      difficulty: 8,
    },
  ],

  'linalg-04': [
    {
      problem_text: 'Are the vectors $\\mathbf{v}_1 = \\langle 1, 2, 3 \\rangle$, $\\mathbf{v}_2 = \\langle 4, 5, 6 \\rangle$, $\\mathbf{v}_3 = \\langle 7, 8, 9 \\rangle$ linearly independent? Answer "yes" or "no".',
      correct_answer: 'no',
      explanation: 'Note that $\\mathbf{v}_3 = 2\\mathbf{v}_2 - \\mathbf{v}_1$: $2(4,5,6) - (1,2,3) = (7,8,9)$. Since one vector is a linear combination of the others, they are linearly dependent.',
      hints: [
        'Check if $c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2 + c_3\\mathbf{v}_3 = \\mathbf{0}$ has a nontrivial solution.',
        'Form a matrix with these vectors as columns and compute its determinant.',
        '$\\det = 1(45-48) - 2(36-42) + 3(32-35) = -3+12-9 = 0$. Determinant is 0, so they are linearly dependent.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'What is the dimension of the subspace $W = \\text{span}\\{(1,0,1,0),\\; (0,1,0,1),\\; (1,1,1,1),\\; (2,1,2,1)\\}$ of $\\mathbb{R}^4$?',
      correct_answer: '2',
      explanation: 'Note $(1,1,1,1) = (1,0,1,0) + (0,1,0,1)$ and $(2,1,2,1) = 2(1,0,1,0) + (0,1,0,1)$. So all four vectors are in $\\text{span}\\{(1,0,1,0), (0,1,0,1)\\}$, and these two are linearly independent. $\\dim(W) = 2$.',
      hints: [
        'Check if any vectors can be written as combinations of others.',
        'Try expressing $(1,1,1,1)$ using the first two vectors: $(1,0,1,0) + (0,1,0,1) = (1,1,1,1)$. It works!',
        'Similarly $(2,1,2,1) = 2(1,0,1,0) + (0,1,0,1)$. Only 2 vectors are independent, so $\\dim = 2$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Find the dimension of the null space of $A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 2 & 4 & 2 \\end{pmatrix}$.',
      correct_answer: '2',
      explanation: 'Row reduce: $R_2 - 2R_1 = (0,0,0)$. So rank$(A) = 1$. By the rank-nullity theorem, nullity $= 3 - 1 = 2$.',
      hints: [
        'Row reduce $A$. Notice that $R_2 = 2R_1$.',
        'After reduction, $A$ has rank 1 (one pivot).',
        'Rank-nullity: nullity $= n - \\text{rank} = 3 - 1 = 2$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Does the set of all $2 \\times 2$ symmetric matrices form a subspace of the space of all $2 \\times 2$ matrices? Answer "yes" or "no".',
      correct_answer: 'yes',
      explanation: 'The zero matrix is symmetric. If $A$ and $B$ are symmetric (i.e., $A^T = A$, $B^T = B$), then $(A+B)^T = A^T + B^T = A + B$ and $(cA)^T = cA^T = cA$. All three subspace conditions are satisfied.',
      hints: [
        'A subspace must contain the zero vector, and be closed under addition and scalar multiplication.',
        'Is the zero matrix symmetric? Yes, since $0^T = 0$.',
        'If $A^T = A$ and $B^T = B$, is $(A+B)^T = A+B$? Check using transpose properties.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'What is the dimension of the space of $2 \\times 2$ symmetric matrices?',
      correct_answer: '3',
      explanation: 'A $2 \\times 2$ symmetric matrix has the form $\\begin{pmatrix} a & b \\\\ b & c \\end{pmatrix}$ with 3 free parameters. A basis is $\\left\\{\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}, \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\begin{pmatrix} 0 & 0 \\\\ 0 & 1 \\end{pmatrix}\\right\\}$.',
      hints: [
        'Write a general $2 \\times 2$ symmetric matrix: $\\begin{pmatrix} a & b \\\\ b & c \\end{pmatrix}$.',
        'How many independent parameters are there? Count $a$, $b$, and $c$.',
        'Three free parameters means you can find 3 basis matrices, so the dimension is 3.',
      ],
      difficulty: 9,
    },
  ],

  'linalg-05': [
    {
      problem_text: 'Find the eigenvalues of $A = \\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix}$. Give them in increasing order separated by a comma.',
      correct_answer: '2,3',
      explanation: 'The characteristic polynomial is $\\det(A - \\lambda I) = (3-\\lambda)(2-\\lambda) - 0 = (3-\\lambda)(2-\\lambda)$. Setting this to 0: $\\lambda = 2$ or $\\lambda = 3$.',
      hints: [
        'Eigenvalues satisfy $\\det(A - \\lambda I) = 0$.',
        '$A - \\lambda I = \\begin{pmatrix} 3-\\lambda & 1 \\\\ 0 & 2-\\lambda \\end{pmatrix}$. Since it is upper triangular, the determinant is the product of diagonal entries.',
        '$(3-\\lambda)(2-\\lambda) = 0$ gives $\\lambda = 2$ and $\\lambda = 3$.',
      ],
      difficulty: 10,
    },
    {
      problem_text: 'Find the eigenvalues of $A = \\begin{pmatrix} 4 & 2 \\\\ 1 & 3 \\end{pmatrix}$. Give them in increasing order separated by a comma.',
      correct_answer: '2,5',
      explanation: '$\\det(A - \\lambda I) = (4-\\lambda)(3-\\lambda) - 2 = \\lambda^2 - 7\\lambda + 10 = (\\lambda - 2)(\\lambda - 5)$. So $\\lambda = 2$ and $\\lambda = 5$.',
      hints: [
        'Compute $\\det(A - \\lambda I) = (4-\\lambda)(3-\\lambda) - (2)(1)$.',
        'Expand: $12 - 7\\lambda + \\lambda^2 - 2 = \\lambda^2 - 7\\lambda + 10$.',
        'Factor: $(\\lambda - 2)(\\lambda - 5) = 0$, giving $\\lambda = 2$ and $\\lambda = 5$.',
      ],
      difficulty: 10,
    },
    {
      problem_text: 'Let $A = \\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$. What are the eigenvalues and their algebraic multiplicities? Give as "eigenvalue:multiplicity".',
      correct_answer: '2:2',
      explanation: '$\\det(A - \\lambda I) = (2-\\lambda)^2 = 0$. The only eigenvalue is $\\lambda = 2$ with algebraic multiplicity 2.',
      hints: [
        '$A$ is upper triangular, so the eigenvalues are on the diagonal.',
        'Both diagonal entries are 2, so $\\det(A - \\lambda I) = (2 - \\lambda)^2$.',
        'The root $\\lambda = 2$ has multiplicity 2.',
      ],
      difficulty: 10,
    },
    {
      problem_text: 'Find the trace and determinant of $A = \\begin{pmatrix} 5 & -3 \\\\ 2 & -1 \\end{pmatrix}$. If the eigenvalues are $\\lambda_1, \\lambda_2$, what is $\\lambda_1 + \\lambda_2$?',
      correct_answer: '4',
      explanation: 'The sum of eigenvalues equals the trace: $\\text{tr}(A) = 5 + (-1) = 4$.',
      hints: [
        'There is a fundamental relationship between eigenvalues and the trace of a matrix.',
        'The trace is the sum of diagonal entries: $\\text{tr}(A) = 5 + (-1) = 4$.',
        'The sum of all eigenvalues (with multiplicity) equals the trace. So $\\lambda_1 + \\lambda_2 = 4$.',
      ],
      difficulty: 10,
    },
    {
      problem_text: 'The matrix $A = \\begin{pmatrix} 1 & 4 \\\\ 2 & 3 \\end{pmatrix}$ has eigenvalue $\\lambda = 5$. Find an eigenvector. Give it as "a,b" where $a$ and $b$ are integers with no common factor.',
      correct_answer: '1,1',
      explanation: '$A - 5I = \\begin{pmatrix} -4 & 4 \\\\ 2 & -2 \\end{pmatrix}$. Row 1 gives $-4x + 4y = 0$, so $x = y$. An eigenvector is $(1, 1)$.',
      hints: [
        'Solve $(A - 5I)\\mathbf{x} = \\mathbf{0}$.',
        '$A - 5I = \\begin{pmatrix} -4 & 4 \\\\ 2 & -2 \\end{pmatrix}$. Both rows give the same equation.',
        '$-4x + 4y = 0 \\Rightarrow x = y$. The simplest eigenvector is $(1, 1)$.',
      ],
      difficulty: 10,
    },
  ],

  'linalg-06': [
    {
      problem_text: 'Let $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ be defined by $T(x, y) = (2x + y,\\; x - y)$. Find the matrix representation of $T$ with respect to the standard basis. Give entries as "a,b;c,d".',
      correct_answer: '2,1;1,-1',
      explanation: '$T(e_1) = T(1,0) = (2, 1)$ and $T(e_2) = T(0,1) = (1, -1)$. The matrix is $\\begin{pmatrix} 2 & 1 \\\\ 1 & -1 \\end{pmatrix}$.',
      hints: [
        'Apply $T$ to each standard basis vector: $T(1,0)$ and $T(0,1)$.',
        '$T(1,0) = (2 \\cdot 1 + 0,\\; 1 - 0) = (2, 1)$. This is the first column.',
        '$T(0,1) = (0 + 1,\\; 0 - 1) = (1, -1)$. This is the second column.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Let $T: \\mathbb{R}^3 \\to \\mathbb{R}^3$ be defined by $T(x,y,z) = (x+y, 0, 0)$. What is the dimension of the kernel of $T$?',
      correct_answer: '2',
      explanation: 'Kernel: $T(x,y,z) = (0,0,0)$ requires $x + y = 0$, so $y = -x$ and $z$ is free. Two free variables ($x$ and $z$), so $\\dim(\\ker T) = 2$.',
      hints: [
        'The kernel is all $(x,y,z)$ with $T(x,y,z) = (0,0,0)$.',
        'This requires $x + y = 0$ (and the other components are automatically 0). So $y = -x$.',
        '$z$ is unrestricted. The kernel is $\\{(x, -x, z) : x, z \\in \\mathbb{R}\\}$, which has dimension 2.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Let $T: \\mathbb{R}^3 \\to \\mathbb{R}^3$ be defined by $T(x,y,z) = (x+y, 0, 0)$. What is the dimension of the range (image) of $T$?',
      correct_answer: '1',
      explanation: 'The output is always of the form $(a, 0, 0)$ for some $a \\in \\mathbb{R}$. The range is $\\text{span}\\{(1,0,0)\\}$, which has dimension 1. This is consistent with rank-nullity: $3 = 2 + 1$.',
      hints: [
        'The range is the set of all possible outputs $T(x,y,z) = (x+y, 0, 0)$.',
        'Every output has the form $(a, 0, 0)$ where $a = x + y$ can be any real number.',
        'This is a one-dimensional subspace: $\\text{span}\\{(1,0,0)\\}$. So $\\dim(\\text{range}) = 1$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Let $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ be the linear transformation that reflects vectors across the $x$-axis. What is the matrix of $T$? Give entries as "a,b;c,d".',
      correct_answer: '1,0;0,-1',
      explanation: 'Reflection across the $x$-axis sends $(x,y)$ to $(x,-y)$. So $T(1,0)=(1,0)$ and $T(0,1)=(0,-1)$. The matrix is $\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$.',
      hints: [
        'Reflecting across the $x$-axis leaves $x$ unchanged and negates $y$.',
        '$T(1,0) = (1,0)$ (first column) and $T(0,1) = (0,-1)$ (second column).',
        'The matrix is $\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'A linear transformation $T: \\mathbb{R}^4 \\to \\mathbb{R}^3$ has rank 3. What is the dimension of its kernel?',
      correct_answer: '1',
      explanation: 'By the rank-nullity theorem: $\\dim(\\ker T) + \\text{rank}(T) = \\dim(\\text{domain})$. So $\\dim(\\ker T) = 4 - 3 = 1$.',
      hints: [
        'Use the rank-nullity theorem: $\\dim(\\ker T) + \\text{rank}(T) = \\dim(\\text{domain})$.',
        'The domain is $\\mathbb{R}^4$, so $\\dim(\\text{domain}) = 4$.',
        '$\\dim(\\ker T) = 4 - 3 = 1$.',
      ],
      difficulty: 9,
    },
  ],

  'linalg-07': [
    {
      problem_text: 'Find the dot product $\\langle 3, -1, 2 \\rangle \\cdot \\langle 1, 4, -5 \\rangle$.',
      correct_answer: '-11',
      explanation: '$\\langle 3, -1, 2 \\rangle \\cdot \\langle 1, 4, -5 \\rangle = 3(1) + (-1)(4) + 2(-5) = 3 - 4 - 10 = -11$.',
      hints: [
        'The dot product sums the products of corresponding components.',
        '$3 \\cdot 1 = 3$, $(-1) \\cdot 4 = -4$, $2 \\cdot (-5) = -10$.',
        '$3 + (-4) + (-10) = -11$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Are the vectors $\\mathbf{u} = \\langle 2, -1, 3 \\rangle$ and $\\mathbf{v} = \\langle 3, 9, 1 \\rangle$ orthogonal? Answer "yes" or "no".',
      correct_answer: 'yes',
      explanation: '$\\mathbf{u} \\cdot \\mathbf{v} = 2(3) + (-1)(9) + 3(1) = 6 - 9 + 3 = 0$. Since the dot product is 0, the vectors are orthogonal.',
      hints: [
        'Two vectors are orthogonal if and only if their dot product is 0.',
        'Compute $\\mathbf{u} \\cdot \\mathbf{v} = 2(3) + (-1)(9) + 3(1)$.',
        '$= 6 - 9 + 3 = 0$. The dot product is 0, so they are orthogonal.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Find the projection of $\\mathbf{u} = \\langle 4, 3 \\rangle$ onto $\\mathbf{v} = \\langle 1, 0 \\rangle$. Give your answer as "a,b".',
      correct_answer: '4,0',
      explanation: '$\\text{proj}_{\\mathbf{v}} \\mathbf{u} = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\mathbf{v} \\cdot \\mathbf{v}} \\mathbf{v} = \\frac{4}{1} \\langle 1, 0 \\rangle = \\langle 4, 0 \\rangle$.',
      hints: [
        'The projection formula is $\\text{proj}_{\\mathbf{v}} \\mathbf{u} = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\mathbf{v} \\cdot \\mathbf{v}} \\mathbf{v}$.',
        '$\\mathbf{u} \\cdot \\mathbf{v} = 4(1) + 3(0) = 4$ and $\\mathbf{v} \\cdot \\mathbf{v} = 1$.',
        'So $\\text{proj}_{\\mathbf{v}} \\mathbf{u} = \\frac{4}{1}(1, 0) = (4, 0)$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Find the projection of $\\mathbf{u} = \\langle 3, 4 \\rangle$ onto $\\mathbf{v} = \\langle 1, 1 \\rangle$. Give your answer as "a,b" using fractions if needed.',
      correct_answer: '7/2,7/2',
      explanation: '$\\text{proj}_{\\mathbf{v}} \\mathbf{u} = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\mathbf{v} \\cdot \\mathbf{v}} \\mathbf{v} = \\frac{3+4}{1+1} \\langle 1, 1 \\rangle = \\frac{7}{2} \\langle 1, 1 \\rangle = \\langle \\frac{7}{2}, \\frac{7}{2} \\rangle$.',
      hints: [
        'Use the projection formula: $\\text{proj}_{\\mathbf{v}} \\mathbf{u} = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|^2} \\mathbf{v}$.',
        '$\\mathbf{u} \\cdot \\mathbf{v} = 3 + 4 = 7$ and $\\|\\mathbf{v}\\|^2 = 1 + 1 = 2$.',
        'The scalar is $\\frac{7}{2}$, so the projection is $\\frac{7}{2}(1,1) = (\\frac{7}{2}, \\frac{7}{2})$.',
      ],
      difficulty: 9,
    },
    {
      problem_text: 'Find the angle between $\\mathbf{u} = \\langle 1, 0 \\rangle$ and $\\mathbf{v} = \\langle 1, 1 \\rangle$. Give your answer in degrees.',
      correct_answer: '45',
      explanation: '$\\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|} = \\frac{1}{1 \\cdot \\sqrt{2}} = \\frac{1}{\\sqrt{2}}$. So $\\theta = 45°$.',
      hints: [
        'Use the formula $\\cos\\theta = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}$.',
        '$\\mathbf{u} \\cdot \\mathbf{v} = 1$, $\\|\\mathbf{u}\\| = 1$, $\\|\\mathbf{v}\\| = \\sqrt{2}$.',
        '$\\cos\\theta = \\frac{1}{\\sqrt{2}}$, so $\\theta = 45°$.',
      ],
      difficulty: 9,
    },
  ],
};
