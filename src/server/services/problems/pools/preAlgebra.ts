import type { StaticProblem } from '../bank';

export const PRE_ALGEBRA_PROBLEMS: Record<string, StaticProblem[]> = {
  'pre-alg-01': [
    {
      problem_text: 'Calculate $247 + 386$.',
      correct_answer: '633',
      explanation:
        'Add the ones: $7 + 6 = 13$, write $3$ carry $1$. Add the tens: $4 + 8 + 1 = 13$, write $3$ carry $1$. Add the hundreds: $2 + 3 + 1 = 6$. The answer is $633$.',
      hints: [
        'Start by adding the digits in the ones column (rightmost).',
        'When a column adds up to $10$ or more, carry the tens digit to the next column.',
        '$7 + 6 = 13$. Write $3$, carry $1$. Then $4 + 8 + 1 = 13$. Write $3$, carry $1$. Then $2 + 3 + 1 = 6$.',
      ],
      difficulty: 1,
    },
    {
      problem_text: 'What is $504 - 278$?',
      correct_answer: '226',
      explanation:
        'Subtract with borrowing. $4 - 8$ requires borrowing: borrow from the tens to make $14 - 8 = 6$. The tens column becomes $9$ (after borrowing from hundreds), so $9 - 7 = 2$. Hundreds: $4 - 2 = 2$. The answer is $226$.',
      hints: [
        'Start from the ones column. Can you subtract $8$ from $4$ directly?',
        'You need to borrow from the tens place. Since the tens digit is $0$, borrow from the hundreds first.',
        'After borrowing: ones become $14 - 8 = 6$, tens become $9 - 7 = 2$, hundreds become $4 - 2 = 2$. Answer: $226$.',
      ],
      difficulty: 1,
    },
    {
      problem_text: 'Calculate $37 \\times 6$.',
      correct_answer: '222',
      explanation:
        'Multiply each digit by $6$: $7 \\times 6 = 42$, write $2$ carry $4$. $3 \\times 6 = 18$, plus $4 = 22$. The answer is $222$.',
      hints: [
        'Multiply the ones digit first: $7 \\times 6 = ?$',
        '$7 \\times 6 = 42$. Write down $2$ and carry $4$ to the tens column.',
        '$3 \\times 6 = 18$, plus the carried $4$ gives $22$. The answer is $222$.',
      ],
      difficulty: 1,
    },
    {
      problem_text: 'What is $432 \\div 8$?',
      correct_answer: '54',
      explanation:
        'Divide step by step: $43 \\div 8 = 5$ remainder $3$. Bring down $2$ to get $32$. $32 \\div 8 = 4$. So $432 \\div 8 = 54$.',
      hints: [
        'Use long division. Does $8$ go into $4$? No. So consider $43$ instead.',
        '$8 \\times 5 = 40$, so $8$ goes into $43$ five times with remainder $3$. Bring down the $2$.',
        '$32 \\div 8 = 4$. The final answer is $54$.',
      ],
      difficulty: 2,
    },
    {
      problem_text: 'A shop sells notebooks for $\\$3$ each and pens for $\\$2$ each. If you buy $4$ notebooks and $7$ pens, what is the total cost?',
      correct_answer: '26',
      explanation:
        'Notebooks: $4 \\times 3 = 12$. Pens: $7 \\times 2 = 14$. Total: $12 + 14 = 26$. The total cost is $\\$26$.',
      hints: [
        'Find the cost of the notebooks and the cost of the pens separately.',
        'Notebooks: $4 \\times \\$3 = \\$12$. Pens: $7 \\times \\$2 = \\$14$.',
        'Add the two amounts: $\\$12 + \\$14 = \\$26$.',
      ],
      difficulty: 2,
    },
    {
      problem_text: 'Calculate $1{,}205 + 897$.',
      correct_answer: '2102',
      explanation:
        'Add the ones: $5 + 7 = 12$, write $2$ carry $1$. Tens: $0 + 9 + 1 = 10$, write $0$ carry $1$. Hundreds: $2 + 8 + 1 = 11$, write $1$ carry $1$. Thousands: $1 + 0 + 1 = 2$. The answer is $2{,}102$.',
      hints: [
        'Line up the digits by place value and add from right to left.',
        'Ones: $5 + 7 = 12$. Write $2$, carry $1$. Continue column by column.',
        'After carrying through all columns, the answer is $2{,}102$.',
      ],
      difficulty: 1,
    },
    {
      problem_text: 'What is $800 - 347$?',
      correct_answer: '453',
      explanation:
        'Subtract with borrowing. $0 - 7$ requires borrowing. Since the tens digit is also $0$, borrow from the hundreds: $800 = 7$ hundreds $+ 9$ tens $+ 10$ ones. Then $10 - 7 = 3$, $9 - 4 = 5$, $7 - 3 = 4$. The answer is $453$.',
      hints: [
        'You cannot subtract $7$ from $0$, so you need to borrow.',
        'Since both the tens and ones digits are $0$, borrow from the $8$ in the hundreds place across two columns.',
        'After borrowing: $10 - 7 = 3$, $9 - 4 = 5$, $7 - 3 = 4$. Answer: $453$.',
      ],
      difficulty: 1,
    },
    {
      problem_text: 'Calculate $56 \\times 7$.',
      correct_answer: '392',
      explanation:
        'Multiply each digit by $7$: $6 \\times 7 = 42$, write $2$ carry $4$. $5 \\times 7 = 35$, plus $4 = 39$. The answer is $392$.',
      hints: [
        'Start by multiplying the ones digit: $6 \\times 7 = ?$',
        '$6 \\times 7 = 42$. Write $2$, carry $4$ to the tens column.',
        '$5 \\times 7 = 35$, plus the carried $4$ gives $39$. The answer is $392$.',
      ],
      difficulty: 1,
    },
    {
      problem_text: 'What is $756 \\div 6$?',
      correct_answer: '126',
      explanation:
        'Divide step by step: $7 \\div 6 = 1$ remainder $1$. Bring down $5$ to get $15$. $15 \\div 6 = 2$ remainder $3$. Bring down $6$ to get $36$. $36 \\div 6 = 6$. So $756 \\div 6 = 126$.',
      hints: [
        'Use long division. How many times does $6$ go into $7$?',
        '$6$ goes into $7$ once with remainder $1$. Bring down $5$ to get $15$. $15 \\div 6 = 2$ remainder $3$.',
        'Bring down $6$ to get $36$. $36 \\div 6 = 6$. The answer is $126$.',
      ],
      difficulty: 2,
    },
    {
      problem_text: 'A baker makes $12$ muffins per batch. If she needs $150$ muffins for an order, how many full batches must she bake?',
      correct_answer: '13',
      explanation:
        '$150 \\div 12 = 12.5$. Since she cannot bake half a batch, she must bake $13$ full batches to have at least $150$ muffins.',
      hints: [
        'Divide the total muffins needed by the batch size.',
        '$150 \\div 12 = 12$ remainder $6$. She needs more than $12$ batches.',
        'Since $12 \\times 12 = 144$ is not enough, she needs $13$ batches ($13 \\times 12 = 156$).',
      ],
      difficulty: 2,
    },
    {
      problem_text: 'Calculate $23 \\times 45$.',
      correct_answer: '1035',
      explanation:
        'Use the standard algorithm: $23 \\times 5 = 115$ and $23 \\times 40 = 920$. Add them: $115 + 920 = 1{,}035$.',
      hints: [
        'Break it into two partial products: $23 \\times 5$ and $23 \\times 40$.',
        '$23 \\times 5 = 115$ and $23 \\times 40 = 920$.',
        'Add the partial products: $115 + 920 = 1{,}035$.',
      ],
      difficulty: 2,
    },
    {
      problem_text: 'What is the remainder when $529$ is divided by $7$?',
      correct_answer: '4',
      explanation:
        '$529 \\div 7 = 75$ remainder $4$, because $7 \\times 75 = 525$ and $529 - 525 = 4$.',
      hints: [
        'Find the largest multiple of $7$ that is less than or equal to $529$.',
        '$7 \\times 75 = 525$. Is that close to $529$?',
        '$529 - 525 = 4$. The remainder is $4$.',
      ],
      difficulty: 2,
    },
    {
      problem_text: 'A rectangular garden is $18$ metres long and $13$ metres wide. What is its area in square metres?',
      correct_answer: '234',
      explanation:
        'Area of a rectangle $= \\text{length} \\times \\text{width} = 18 \\times 13 = 234$ square metres.',
      hints: [
        'The area of a rectangle is length times width.',
        'Compute $18 \\times 13$. You can break it up: $18 \\times 10 + 18 \\times 3$.',
        '$18 \\times 10 = 180$ and $18 \\times 3 = 54$. So $180 + 54 = 234$.',
      ],
      difficulty: 1,
    },
  ],

  'pre-alg-03': [
    {
      problem_text: 'What is $25\\%$ of $80$?',
      correct_answer: '20',
      explanation:
        'To find $25\\%$ of $80$, convert the percentage to a decimal: $25\\% = 0.25$. Then multiply: $0.25 \\times 80 = 20$.',
      hints: [
        'To find a percentage of a number, convert the percent to a decimal by dividing by $100$.',
        '$25\\% = 0.25$. Now multiply $0.25 \\times 80$.',
        '$0.25 \\times 80 = 20$. Alternatively, $25\\%$ is one quarter, and $80 \\div 4 = 20$.',
      ],
      difficulty: 2,
    },
    {
      problem_text: 'A shirt originally costs $\\$60$ and is on sale for $15\\%$ off. What is the sale price?',
      correct_answer: '51',
      explanation:
        'The discount is $15\\%$ of $\\$60$: $0.15 \\times 60 = 9$. Subtract the discount: $60 - 9 = 51$. The sale price is $\\$51$.',
      hints: [
        'First find the dollar amount of the discount: $15\\%$ of $\\$60$.',
        '$0.15 \\times 60 = 9$, so the discount is $\\$9$.',
        'Subtract the discount from the original price: $60 - 9 = 51$.',
      ],
      difficulty: 2,
    },
    {
      problem_text: 'A student scored $36$ out of $45$ on a test. What percentage did they score?',
      correct_answer: '80',
      explanation:
        'Divide the score by the total and multiply by $100$: $$\\frac{36}{45} \\times 100 = 0.8 \\times 100 = 80\\%$$',
      hints: [
        'To convert a fraction to a percentage, divide the part by the whole, then multiply by $100$.',
        'Compute $\\frac{36}{45}$. Simplify: $\\frac{36}{45} = \\frac{4}{5} = 0.8$.',
        '$0.8 \\times 100 = 80$. The student scored $80\\%$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'A population grew from $2{,}500$ to $3{,}000$. What is the percentage increase?',
      correct_answer: '20',
      explanation:
        'The increase is $3{,}000 - 2{,}500 = 500$. The percentage increase is: $$\\frac{500}{2{,}500} \\times 100 = 20\\%$$',
      hints: [
        'First find the amount of increase: $3{,}000 - 2{,}500$.',
        'The increase is $500$. Percentage increase $= \\frac{\\text{increase}}{\\text{original}} \\times 100$.',
        '$\\frac{500}{2500} \\times 100 = 0.2 \\times 100 = 20\\%$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'After a $20\\%$ discount, a jacket costs $\\$56$. What was the original price?',
      correct_answer: '70',
      explanation:
        'After a $20\\%$ discount, the customer pays $80\\%$ of the original price. So $0.80 \\times P = 56$, which gives $P = \\frac{56}{0.80} = 70$. The original price was $\\$70$.',
      hints: [
        'If the discount is $20\\%$, the sale price is $100\\% - 20\\% = 80\\%$ of the original.',
        'Set up the equation: $0.80 \\times P = 56$.',
        'Solve for $P$: $P = \\frac{56}{0.80} = 70$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'What is $10\\%$ of $350$?',
      correct_answer: '35',
      explanation:
        'To find $10\\%$ of a number, divide it by $10$. $350 \\div 10 = 35$.',
      hints: [
        'Finding $10\\%$ of a number is one of the simplest percentage calculations.',
        '$10\\% = 0.10$. Multiply: $0.10 \\times 350$.',
        '$0.10 \\times 350 = 35$. Equivalently, just move the decimal point one place to the left.',
      ],
      difficulty: 2,
    },
    {
      problem_text: 'What is $40\\%$ of $250$?',
      correct_answer: '100',
      explanation:
        'Convert to a decimal: $40\\% = 0.40$. Multiply: $0.40 \\times 250 = 100$.',
      hints: [
        'Convert the percentage to a decimal by dividing by $100$.',
        '$40\\% = 0.40$. Now compute $0.40 \\times 250$.',
        '$0.40 \\times 250 = 100$. Alternatively, $10\\%$ of $250$ is $25$, so $40\\%$ is $4 \\times 25 = 100$.',
      ],
      difficulty: 2,
    },
    {
      problem_text: 'Express $\\frac{3}{8}$ as a percentage.',
      correct_answer: '37.5',
      explanation:
        'Divide $3$ by $8$: $3 \\div 8 = 0.375$. Multiply by $100$: $0.375 \\times 100 = 37.5\\%$.',
      hints: [
        'To convert a fraction to a percentage, divide the numerator by the denominator, then multiply by $100$.',
        '$3 \\div 8 = 0.375$.',
        '$0.375 \\times 100 = 37.5$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'A book costs $\\$45$. Sales tax is $8\\%$. What is the total price including tax?',
      correct_answer: '48.6',
      explanation:
        'Tax amount: $0.08 \\times 45 = 3.60$. Total: $45 + 3.60 = 48.60$. The total price is $\\$48.60$.',
      hints: [
        'First calculate the tax: $8\\%$ of $\\$45$.',
        '$0.08 \\times 45 = 3.60$. The tax is $\\$3.60$.',
        'Add the tax to the original price: $45 + 3.60 = 48.60$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'A factory produced $1{,}200$ items and $48$ were defective. What percentage of items were defective?',
      correct_answer: '4',
      explanation:
        'Percentage $= \\frac{48}{1200} \\times 100 = 0.04 \\times 100 = 4\\%$.',
      hints: [
        'Divide the number of defective items by the total items produced.',
        '$\\frac{48}{1200} = 0.04$.',
        '$0.04 \\times 100 = 4\\%$.',
      ],
      difficulty: 2,
    },
    {
      problem_text: 'A car was bought for $\\$15{,}000$ and sold for $\\$12{,}000$. What is the percentage loss?',
      correct_answer: '20',
      explanation:
        'Loss $= 15{,}000 - 12{,}000 = 3{,}000$. Percentage loss $= \\frac{3{,}000}{15{,}000} \\times 100 = 20\\%$.',
      hints: [
        'First find the amount of loss: selling price minus buying price.',
        'Loss $= 15{,}000 - 12{,}000 = 3{,}000$. Now compute $\\frac{3{,}000}{15{,}000}$.',
        '$\\frac{3{,}000}{15{,}000} = 0.20$, so the percentage loss is $20\\%$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'After a $25\\%$ increase, a stock is worth $\\$150$. What was its original value?',
      correct_answer: '120',
      explanation:
        'After a $25\\%$ increase, the value is $125\\%$ of the original. So $1.25 \\times P = 150$, giving $P = \\frac{150}{1.25} = 120$.',
      hints: [
        'A $25\\%$ increase means the new value is $125\\%$ of the original.',
        'Set up the equation: $1.25 \\times P = 150$.',
        '$P = \\frac{150}{1.25} = 120$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'In a class of $40$ students, $55\\%$ are girls. How many boys are in the class?',
      correct_answer: '18',
      explanation:
        'If $55\\%$ are girls, then $45\\%$ are boys. $0.45 \\times 40 = 18$. There are $18$ boys.',
      hints: [
        'If $55\\%$ are girls, what percentage are boys?',
        '$100\\% - 55\\% = 45\\%$ are boys. Now find $45\\%$ of $40$.',
        '$0.45 \\times 40 = 18$.',
      ],
      difficulty: 2,
    },
  ],

  'pre-alg-04': [
    {
      problem_text: 'Evaluate: $3 + 4 \\times 2$.',
      correct_answer: '11',
      explanation:
        'By the order of operations (PEMDAS), multiplication comes before addition. $4 \\times 2 = 8$, then $3 + 8 = 11$.',
      hints: [
        'Remember PEMDAS: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction.',
        'Multiplication is performed before addition. Compute $4 \\times 2$ first.',
        '$4 \\times 2 = 8$. Then $3 + 8 = 11$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'Evaluate: $2 \\times (5 + 3) - 4$.',
      correct_answer: '12',
      explanation:
        'Parentheses first: $5 + 3 = 8$. Then multiply: $2 \\times 8 = 16$. Finally subtract: $16 - 4 = 12$.',
      hints: [
        'Start with the operation inside the parentheses.',
        '$5 + 3 = 8$. Now multiply: $2 \\times 8 = ?$',
        '$2 \\times 8 = 16$. Then $16 - 4 = 12$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'Evaluate: $18 \\div 3 + 2^2 \\times 5$.',
      correct_answer: '26',
      explanation:
        'Exponents first: $2^2 = 4$. Then division and multiplication (left to right): $18 \\div 3 = 6$ and $4 \\times 5 = 20$. Finally addition: $6 + 20 = 26$.',
      hints: [
        'Handle exponents first: $2^2 = ?$',
        '$2^2 = 4$. Now do division and multiplication from left to right: $18 \\div 3 = 6$ and $4 \\times 5 = 20$.',
        'Finally, add: $6 + 20 = 26$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'Evaluate: $5 + 3 \\times (10 - 4)^2 \\div 9$.',
      correct_answer: '17',
      explanation:
        'Parentheses: $10 - 4 = 6$. Exponent: $6^2 = 36$. Multiply: $3 \\times 36 = 108$. Divide: $108 \\div 9 = 12$. Add: $5 + 12 = 17$.',
      hints: [
        'Start with parentheses: $10 - 4 = 6$. Then handle the exponent.',
        '$6^2 = 36$. Now do multiplication and division left to right: $3 \\times 36 = 108$, then $108 \\div 9 = ?$',
        '$108 \\div 9 = 12$. Finally, $5 + 12 = 17$.',
      ],
      difficulty: 4,
    },
    {
      problem_text: 'Evaluate: $(8 - 2 \\times 3)^2 + 7 \\times (12 \\div 4)$.',
      correct_answer: '25',
      explanation:
        'Inside the first parentheses: $2 \\times 3 = 6$, then $8 - 6 = 2$. Exponent: $2^2 = 4$. Inside the second parentheses: $12 \\div 4 = 3$. Multiply: $7 \\times 3 = 21$. Add: $4 + 21 = 25$.',
      hints: [
        'Work inside each set of parentheses first. In $(8 - 2 \\times 3)$, you must still do multiplication before subtraction.',
        'First parentheses: $2 \\times 3 = 6$, then $8 - 6 = 2$. Second parentheses: $12 \\div 4 = 3$.',
        '$2^2 = 4$ and $7 \\times 3 = 21$. Then $4 + 21 = 25$.',
      ],
      difficulty: 4,
    },
    {
      problem_text: 'Evaluate: $12 - 8 \\div 2$.',
      correct_answer: '8',
      explanation:
        'Division before subtraction: $8 \\div 2 = 4$. Then $12 - 4 = 8$.',
      hints: [
        'Which operation should you perform first: subtraction or division?',
        'Division comes before subtraction in PEMDAS. Compute $8 \\div 2$ first.',
        '$8 \\div 2 = 4$. Then $12 - 4 = 8$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'Evaluate: $4^2 - 3 \\times 2 + 1$.',
      correct_answer: '11',
      explanation:
        'Exponents first: $4^2 = 16$. Multiplication: $3 \\times 2 = 6$. Then $16 - 6 + 1 = 11$.',
      hints: [
        'Handle the exponent first: $4^2 = ?$',
        '$4^2 = 16$. Next, multiplication: $3 \\times 2 = 6$.',
        '$16 - 6 + 1 = 11$. Addition and subtraction are done left to right.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'Evaluate: $6 \\times (3 + 7) \\div 5$.',
      correct_answer: '12',
      explanation:
        'Parentheses: $3 + 7 = 10$. Then left to right: $6 \\times 10 = 60$, $60 \\div 5 = 12$.',
      hints: [
        'Start with the parentheses: $3 + 7 = ?$',
        '$3 + 7 = 10$. Now multiply and divide left to right.',
        '$6 \\times 10 = 60$. Then $60 \\div 5 = 12$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'Evaluate: $48 \\div (2 \\times 4) + 3^2$.',
      correct_answer: '15',
      explanation:
        'Parentheses: $2 \\times 4 = 8$. Division: $48 \\div 8 = 6$. Exponent: $3^2 = 9$. Addition: $6 + 9 = 15$.',
      hints: [
        'Handle the parentheses first: $2 \\times 4 = ?$',
        '$2 \\times 4 = 8$. Now compute $48 \\div 8$ and $3^2$ separately.',
        '$48 \\div 8 = 6$ and $3^2 = 9$. Then $6 + 9 = 15$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'Evaluate: $2^3 + 3^2 - 5 \\times 2$.',
      correct_answer: '7',
      explanation:
        'Exponents: $2^3 = 8$ and $3^2 = 9$. Multiplication: $5 \\times 2 = 10$. Then $8 + 9 - 10 = 7$.',
      hints: [
        'Compute the exponents first: $2^3$ and $3^2$.',
        '$2^3 = 8$ and $3^2 = 9$. Next, $5 \\times 2 = 10$.',
        '$8 + 9 - 10 = 7$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'Evaluate: $100 - 3 \\times (4 + 6)^2 \\div 10$.',
      correct_answer: '70',
      explanation:
        'Parentheses: $4 + 6 = 10$. Exponent: $10^2 = 100$. Multiply: $3 \\times 100 = 300$. Divide: $300 \\div 10 = 30$. Subtract: $100 - 30 = 70$.',
      hints: [
        'Start with the parentheses: $4 + 6 = 10$. Then handle the exponent.',
        '$10^2 = 100$. Now do multiplication and division left to right: $3 \\times 100 = 300$, then $300 \\div 10 = ?$',
        '$300 \\div 10 = 30$. Finally $100 - 30 = 70$.',
      ],
      difficulty: 4,
    },
    {
      problem_text: 'Evaluate: $(15 - 3 \\times 4) \\times (2 + 6 \\div 3)$.',
      correct_answer: '12',
      explanation:
        'First parentheses: $3 \\times 4 = 12$, then $15 - 12 = 3$. Second parentheses: $6 \\div 3 = 2$, then $2 + 2 = 4$. Multiply: $3 \\times 4 = 12$.',
      hints: [
        'Evaluate each set of parentheses separately. Inside each, follow PEMDAS.',
        'First: $3 \\times 4 = 12$, so $15 - 12 = 3$. Second: $6 \\div 3 = 2$, so $2 + 2 = 4$.',
        '$3 \\times 4 = 12$.',
      ],
      difficulty: 4,
    },
    {
      problem_text: 'Evaluate: $2 \\times 3^3 - (20 - 4 \\times 3)$.',
      correct_answer: '46',
      explanation:
        'Exponent: $3^3 = 27$. Multiply: $2 \\times 27 = 54$. Parentheses: $4 \\times 3 = 12$, then $20 - 12 = 8$. Subtract: $54 - 8 = 46$.',
      hints: [
        'Handle the exponent and the parentheses. In both cases, multiplication/exponents come before addition/subtraction.',
        '$3^3 = 27$ and $2 \\times 27 = 54$. Inside the parentheses: $4 \\times 3 = 12$, so $20 - 12 = 8$.',
        '$54 - 8 = 46$.',
      ],
      difficulty: 4,
    },
  ],

  'pre-alg-05': [
    {
      problem_text: 'Calculate $(-5) + (-3)$.',
      correct_answer: '-8',
      explanation:
        'When adding two negative numbers, add their absolute values and keep the negative sign: $5 + 3 = 8$, so the answer is $-8$.',
      hints: [
        'Both numbers are negative. When you add two negatives, what happens to the sign?',
        'Add the absolute values: $5 + 3 = 8$. The result is negative.',
        '$(-5) + (-3) = -8$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'What is $(-12) - (-7)$?',
      correct_answer: '-5',
      explanation:
        'Subtracting a negative is the same as adding the positive: $(-12) - (-7) = -12 + 7 = -5$.',
      hints: [
        'Recall that subtracting a negative number is the same as adding its positive counterpart.',
        'Rewrite as $-12 + 7$.',
        'Start at $-12$ on the number line and move $7$ units to the right: $-12 + 7 = -5$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'Calculate $(-4) \\times 6$.',
      correct_answer: '-24',
      explanation:
        'A negative times a positive gives a negative result. $4 \\times 6 = 24$, so $(-4) \\times 6 = -24$.',
      hints: [
        'What is the sign of a negative number multiplied by a positive number?',
        'Negative $\\times$ positive $=$ negative. Now compute $4 \\times 6$.',
        '$4 \\times 6 = 24$, so the answer is $-24$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'What is $(-3)^3$?',
      correct_answer: '-27',
      explanation:
        '$(-3)^3 = (-3) \\times (-3) \\times (-3)$. First: $(-3) \\times (-3) = 9$. Then $9 \\times (-3) = -27$. An odd exponent on a negative base gives a negative result.',
      hints: [
        '$(-3)^3$ means $(-3) \\times (-3) \\times (-3)$. Multiply the first two factors.',
        '$(-3) \\times (-3) = 9$ (negative times negative is positive). Now multiply by $(-3)$ again.',
        '$9 \\times (-3) = -27$. With an odd exponent, the result is negative.',
      ],
      difficulty: 4,
    },
    {
      problem_text: 'Evaluate $|{-8}| - |{3 - 10}|$.',
      correct_answer: '1',
      explanation:
        '$|{-8}| = 8$. Inside the second absolute value: $3 - 10 = -7$, so $|{-7}| = 7$. Therefore $8 - 7 = 1$.',
      hints: [
        'Absolute value gives the distance from zero, always non-negative. $|{-8}| = ?$',
        '$|{-8}| = 8$. For the second part, first compute $3 - 10 = -7$, then take $|{-7}|$.',
        '$|{-7}| = 7$. So the expression equals $8 - 7 = 1$.',
      ],
      difficulty: 4,
    },
    {
      problem_text: 'Calculate $(-9) + 4$.',
      correct_answer: '-5',
      explanation:
        'When adding numbers with different signs, subtract the smaller absolute value from the larger and keep the sign of the larger. $9 - 4 = 5$, and since $9 > 4$ the result is negative: $-5$.',
      hints: [
        'One number is negative and the other is positive. Subtract their absolute values.',
        '$|{-9}| = 9$ and $|4| = 4$. Compute $9 - 4$.',
        '$9 - 4 = 5$. Since the negative number has the larger absolute value, the answer is $-5$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'What is $(-6) \\times (-8)$?',
      correct_answer: '48',
      explanation:
        'A negative times a negative gives a positive result. $6 \\times 8 = 48$.',
      hints: [
        'What is the sign when you multiply two negative numbers?',
        'Negative $\\times$ negative $=$ positive. Now compute $6 \\times 8$.',
        '$6 \\times 8 = 48$. The answer is positive $48$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'Calculate $(-36) \\div 9$.',
      correct_answer: '-4',
      explanation:
        'A negative divided by a positive is negative. $36 \\div 9 = 4$, so the answer is $-4$.',
      hints: [
        'What is the sign when dividing a negative by a positive?',
        'Negative $\\div$ positive $=$ negative. Now compute $36 \\div 9$.',
        '$36 \\div 9 = 4$. With the negative sign, the answer is $-4$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'What is $(-2)^4$?',
      correct_answer: '16',
      explanation:
        '$(-2)^4 = (-2) \\times (-2) \\times (-2) \\times (-2)$. First pair: $(-2) \\times (-2) = 4$. Second pair: $(-2) \\times (-2) = 4$. Then $4 \\times 4 = 16$. An even exponent on a negative base gives a positive result.',
      hints: [
        '$(-2)^4$ means multiplying $(-2)$ by itself four times.',
        '$(-2) \\times (-2) = 4$ and $(-2) \\times (-2) = 4$.',
        '$4 \\times 4 = 16$. Even powers of negative numbers are always positive.',
      ],
      difficulty: 4,
    },
    {
      problem_text: 'Evaluate $(-3) + (-7) - (-5)$.',
      correct_answer: '-5',
      explanation:
        '$(-3) + (-7) = -10$. Subtracting a negative: $-10 - (-5) = -10 + 5 = -5$.',
      hints: [
        'First add $(-3)$ and $(-7)$. Both are negative, so add their absolute values and keep the negative sign.',
        '$(-3) + (-7) = -10$. Now handle $-(-5)$: subtracting a negative is the same as adding.',
        '$-10 + 5 = -5$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'Calculate $(-5) \\times 3 + 10$.',
      correct_answer: '-5',
      explanation:
        'Multiplication first: $(-5) \\times 3 = -15$. Then addition: $-15 + 10 = -5$.',
      hints: [
        'Follow order of operations: multiplication before addition.',
        '$(-5) \\times 3 = -15$.',
        '$-15 + 10 = -5$.',
      ],
      difficulty: 3,
    },
    {
      problem_text: 'Evaluate $|{-15}| + |{7 - 20}|$.',
      correct_answer: '28',
      explanation:
        '$|{-15}| = 15$. Inside the second absolute value: $7 - 20 = -13$, so $|{-13}| = 13$. Therefore $15 + 13 = 28$.',
      hints: [
        'Compute each absolute value separately.',
        '$|{-15}| = 15$. For the second term, first evaluate $7 - 20 = -13$.',
        '$|{-13}| = 13$. So $15 + 13 = 28$.',
      ],
      difficulty: 4,
    },
    {
      problem_text: 'What is $(-4) \\times (-3) \\times (-2)$?',
      correct_answer: '-24',
      explanation:
        'Multiply the first two: $(-4) \\times (-3) = 12$. Then $12 \\times (-2) = -24$. An odd count of negative factors gives a negative product.',
      hints: [
        'Multiply two factors at a time. Start with $(-4) \\times (-3)$.',
        '$(-4) \\times (-3) = 12$ (negative times negative is positive). Now multiply by $(-2)$.',
        '$12 \\times (-2) = -24$. Three negative factors give a negative result.',
      ],
      difficulty: 4,
    },
  ],
};
