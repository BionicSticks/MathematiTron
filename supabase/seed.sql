-- =============================================================================
-- MathPath AI - Seed Data: 111 Concepts + 101 Prerequisites
-- =============================================================================

INSERT INTO concepts (id, name, description, category, difficulty, estimated_minutes, display_order) VALUES
  -- Pre-Algebra (5)
  ('pre-alg-01', 'Basic Operations', 'Addition, subtraction, multiplication, and division with whole numbers', 'pre-algebra', 1, 20, 1),
  ('pre-alg-02', 'Fractions & Decimals', 'Understanding and operating with fractions and decimal numbers', 'pre-algebra', 2, 30, 2),
  ('pre-alg-03', 'Percentages', 'Converting between fractions, decimals, and percentages', 'pre-algebra', 2, 25, 3),
  ('pre-alg-04', 'Order of Operations', 'PEMDAS/BODMAS rules for evaluating expressions', 'pre-algebra', 3, 30, 4),
  ('pre-alg-05', 'Integers & Negative Numbers', 'Working with positive and negative numbers', 'pre-algebra', 3, 25, 5),

  -- Algebra (7)
  ('alg-01', 'Variables & Expressions', 'Understanding variables and algebraic expressions', 'algebra', 3, 30, 1),
  ('alg-02', 'Solving Linear Equations', 'Techniques for solving equations with one variable', 'algebra', 4, 35, 2),
  ('alg-03', 'Graphing Linear Functions', 'Plotting and analyzing linear equations on coordinate planes', 'algebra', 4, 40, 3),
  ('alg-04', 'Systems of Equations', 'Solving multiple equations simultaneously', 'algebra', 5, 45, 4),
  ('alg-05', 'Quadratic Equations', 'Solving equations involving x² terms using various methods', 'algebra', 6, 50, 5),
  ('alg-06', 'Polynomials', 'Operations with multi-term algebraic expressions', 'algebra', 6, 45, 6),
  ('alg-07', 'Exponents & Radicals', 'Working with powers and roots', 'algebra', 5, 40, 7),

  -- Geometry (5)
  ('geo-01', 'Basic Shapes', 'Properties of triangles, quadrilaterals, and circles', 'geometry', 3, 30, 1),
  ('geo-02', 'Angles & Lines', 'Understanding angle relationships and parallel lines', 'geometry', 4, 35, 2),
  ('geo-03', 'Area & Perimeter', 'Calculating measurements of 2D shapes', 'geometry', 4, 35, 3),
  ('geo-04', 'Volume & Surface Area', '3D shape measurements and properties', 'geometry', 5, 40, 4),
  ('geo-05', 'Pythagorean Theorem', 'Relationships in right triangles', 'geometry', 5, 40, 5),

  -- Trigonometry (4)
  ('trig-01', 'Trigonometric Ratios', 'Sine, cosine, and tangent in right triangles', 'trigonometry', 6, 45, 1),
  ('trig-02', 'Unit Circle', 'Understanding angles and trig functions on the unit circle', 'trigonometry', 7, 50, 2),
  ('trig-03', 'Graphing Trig Functions', 'Plotting sine, cosine, and tangent waves', 'trigonometry', 7, 50, 3),
  ('trig-04', 'Trig Identities', 'Fundamental trigonometric identities and proofs', 'trigonometry', 8, 60, 4),

  -- Calculus (8)
  ('calc-01', 'Limits', 'Understanding the concept of limits and continuity', 'calculus', 7, 55, 1),
  ('calc-02', 'Derivatives Basics', 'Introduction to rates of change and differentiation', 'calculus', 8, 60, 2),
  ('calc-03', 'Differentiation Rules', 'Power rule, product rule, quotient rule, chain rule', 'calculus', 8, 60, 3),
  ('calc-04', 'Integration Basics', 'Antiderivatives and definite integrals', 'calculus', 9, 70, 4),
  ('calc-05', 'Applications of Derivatives', 'Optimization, related rates, and curve analysis', 'calculus', 9, 65, 5),
  ('calc-06', 'Applications of Integrals', 'Area, volume, and work problems', 'calculus', 9, 70, 6),
  ('calc-07', 'Sequences & Series', 'Infinite sequences, convergence tests, Taylor series', 'calculus', 9, 75, 7),
  ('calc-08', 'Parametric & Polar', 'Parametric equations and polar coordinates', 'calculus', 8, 60, 8),

  -- Linear Algebra (7)
  ('linalg-01', 'Vectors & Matrices', 'Vector operations, matrix arithmetic, and basic properties', 'linear-algebra', 7, 50, 1),
  ('linalg-02', 'Matrix Operations', 'Matrix multiplication, transpose, determinants, and inverses', 'linear-algebra', 8, 60, 2),
  ('linalg-03', 'Systems of Linear Equations', 'Gaussian elimination, row reduction, and solution methods', 'linear-algebra', 8, 65, 3),
  ('linalg-04', 'Vector Spaces', 'Subspaces, linear independence, basis, and dimension', 'linear-algebra', 9, 70, 4),
  ('linalg-05', 'Eigenvalues & Eigenvectors', 'Characteristic polynomial, diagonalization, applications', 'linear-algebra', 10, 80, 5),
  ('linalg-06', 'Linear Transformations', 'Linear maps, kernel, range, and matrix representations', 'linear-algebra', 9, 70, 6),
  ('linalg-07', 'Inner Products', 'Dot products, orthogonality, Gram-Schmidt process', 'linear-algebra', 9, 65, 7),

  -- Multivariable Calculus (5)
  ('multivar-01', 'Multivariable Functions', 'Functions of several variables, domains, and level curves', 'multivariable-calculus', 9, 60, 1),
  ('multivar-02', 'Partial Derivatives', 'Partial differentiation, gradient, and directional derivatives', 'multivariable-calculus', 10, 75, 2),
  ('multivar-03', 'Multiple Integrals', 'Double and triple integrals, change of variables', 'multivariable-calculus', 10, 80, 3),
  ('multivar-04', 'Vector Calculus', 'Line integrals, Green''s theorem, divergence, curl', 'multivariable-calculus', 10, 85, 4),
  ('multivar-05', 'Surface Integrals', 'Surface integrals, Stokes'' theorem, divergence theorem', 'multivariable-calculus', 10, 85, 5),

  -- Differential Equations (5)
  ('diffeq-01', 'First-Order ODEs', 'Separable equations, linear first-order equations', 'differential-equations', 9, 70, 1),
  ('diffeq-02', 'Second-Order Linear ODEs', 'Homogeneous and non-homogeneous equations', 'differential-equations', 10, 75, 2),
  ('diffeq-03', 'Laplace Transforms', 'Transform methods for solving differential equations', 'differential-equations', 10, 70, 3),
  ('diffeq-04', 'Systems of ODEs', 'Matrix methods for systems of differential equations', 'differential-equations', 10, 80, 4),
  ('diffeq-05', 'Partial Differential Equations', 'Heat equation, wave equation, separation of variables', 'differential-equations', 10, 90, 5),

  -- Real Analysis (6)
  ('analysis-01', 'Sequences & Limits', 'Rigorous treatment of sequences, convergence, and limits', 'real-analysis', 10, 75, 1),
  ('analysis-02', 'Series & Convergence', 'Infinite series, convergence tests, absolute convergence', 'real-analysis', 10, 80, 2),
  ('analysis-03', 'Continuity', 'Continuous functions, intermediate value theorem, extreme value theorem', 'real-analysis', 10, 75, 3),
  ('analysis-04', 'Differentiation Theory', 'Rigorous definition of derivatives, mean value theorem', 'real-analysis', 10, 80, 4),
  ('analysis-05', 'Riemann Integration', 'Riemann sums, fundamental theorem of calculus, integrability', 'real-analysis', 10, 85, 5),
  ('analysis-06', 'Metric Spaces', 'Distance functions, open and closed sets, completeness', 'real-analysis', 10, 90, 6),

  -- Abstract Algebra (4)
  ('algebra-01', 'Group Theory Basics', 'Groups, subgroups, homomorphisms, cyclic groups', 'abstract-algebra', 10, 80, 1),
  ('algebra-02', 'Ring Theory', 'Rings, ideals, quotient rings, integral domains', 'abstract-algebra', 10, 85, 2),
  ('algebra-03', 'Field Theory', 'Fields, field extensions, finite fields', 'abstract-algebra', 10, 85, 3),
  ('algebra-04', 'Galois Theory', 'Field automorphisms, Galois groups, solvability by radicals', 'abstract-algebra', 10, 95, 4),

  -- Complex Analysis (4)
  ('complex-01', 'Complex Numbers', 'Complex arithmetic, polar form, De Moivre''s theorem', 'complex-analysis', 8, 55, 1),
  ('complex-02', 'Analytic Functions', 'Holomorphic functions, Cauchy-Riemann equations', 'complex-analysis', 10, 75, 2),
  ('complex-03', 'Complex Integration', 'Contour integrals, Cauchy''s theorem, residue theorem', 'complex-analysis', 10, 85, 3),
  ('complex-04', 'Series & Residues', 'Laurent series, singularities, residue calculus', 'complex-analysis', 10, 80, 4),

  -- Number Theory (4)
  ('numthy-01', 'Divisibility', 'Prime numbers, greatest common divisor, Euclidean algorithm', 'number-theory', 8, 60, 1),
  ('numthy-02', 'Modular Arithmetic', 'Congruences, Chinese remainder theorem, Euler''s theorem', 'number-theory', 9, 70, 2),
  ('numthy-03', 'Diophantine Equations', 'Linear and quadratic Diophantine equations', 'number-theory', 9, 75, 3),
  ('numthy-04', 'Cryptography', 'RSA, discrete logarithms, elliptic curves', 'number-theory', 10, 85, 4),

  -- Discrete Mathematics (5)
  ('discrete-01', 'Logic & Proofs', 'Propositional logic, predicate logic, proof techniques', 'discrete-math', 7, 55, 1),
  ('discrete-02', 'Set Theory', 'Sets, relations, functions, cardinality', 'discrete-math', 8, 60, 2),
  ('discrete-03', 'Combinatorics', 'Permutations, combinations, binomial theorem, generating functions', 'discrete-math', 8, 65, 3),
  ('discrete-04', 'Graph Theory', 'Graphs, trees, paths, connectivity, coloring', 'discrete-math', 9, 70, 4),
  ('discrete-05', 'Recurrence Relations', 'Solving recurrences, generating functions, dynamic programming', 'discrete-math', 9, 70, 5),

  -- Topology (3)
  ('topology-01', 'Topological Spaces', 'Open sets, closed sets, basis, continuous functions', 'topology', 10, 85, 1),
  ('topology-02', 'Compactness & Connectedness', 'Compact spaces, connected spaces, path-connectedness', 'topology', 10, 90, 2),
  ('topology-03', 'Quotient Topology', 'Quotient spaces, fundamental group, homotopy', 'topology', 10, 95, 3),

  -- Probability & Statistics (5)
  ('probstat-01', 'Probability Theory', 'Sample spaces, events, probability axioms, conditional probability', 'probability-statistics', 7, 60, 1),
  ('probstat-02', 'Random Variables', 'Discrete and continuous random variables, distributions', 'probability-statistics', 8, 65, 2),
  ('probstat-03', 'Expectation & Variance', 'Expected value, variance, covariance, correlation', 'probability-statistics', 8, 60, 3),
  ('probstat-04', 'Statistical Inference', 'Estimation, confidence intervals, hypothesis testing', 'probability-statistics', 9, 75, 4),
  ('probstat-05', 'Regression Analysis', 'Linear regression, least squares, correlation analysis', 'probability-statistics', 9, 70, 5)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- Prerequisites
-- =============================================================================

INSERT INTO concept_prerequisites (concept_id, prerequisite_id, strength) VALUES
  -- Algebra depends on pre-algebra
  ('alg-01', 'pre-alg-04', 8),
  ('alg-02', 'alg-01', 9),
  ('alg-03', 'alg-02', 7),
  ('alg-04', 'alg-02', 8),
  ('alg-05', 'alg-02', 9),
  ('alg-06', 'alg-01', 7),
  ('alg-07', 'alg-01', 6),

  -- Geometry
  ('geo-02', 'geo-01', 7),
  ('geo-03', 'geo-01', 8),
  ('geo-04', 'geo-03', 7),
  ('geo-05', 'geo-01', 6),

  -- Trigonometry depends on algebra and geometry
  ('trig-01', 'geo-05', 9),
  ('trig-01', 'alg-01', 7),
  ('trig-02', 'trig-01', 9),
  ('trig-03', 'trig-02', 8),
  ('trig-04', 'trig-02', 9),

  -- Calculus depends on algebra and trigonometry
  ('calc-01', 'alg-02', 9),
  ('calc-01', 'alg-03', 7),
  ('calc-02', 'calc-01', 10),
  ('calc-03', 'calc-02', 9),
  ('calc-03', 'alg-07', 7),
  ('calc-04', 'calc-02', 8),
  ('calc-05', 'calc-03', 9),
  ('calc-06', 'calc-04', 9),
  ('calc-07', 'calc-04', 9),
  ('calc-07', 'calc-03', 7),
  ('calc-08', 'calc-03', 8),

  -- Linear Algebra depends on algebra
  ('linalg-01', 'alg-04', 8),
  ('linalg-02', 'linalg-01', 9),
  ('linalg-03', 'linalg-02', 9),
  ('linalg-03', 'alg-04', 8),
  ('linalg-04', 'linalg-03', 10),
  ('linalg-05', 'linalg-04', 10),
  ('linalg-05', 'linalg-02', 9),
  ('linalg-06', 'linalg-04', 10),
  ('linalg-07', 'linalg-04', 9),

  -- Multivariable Calculus depends on calculus and linear algebra
  ('multivar-01', 'calc-03', 9),
  ('multivar-01', 'linalg-01', 7),
  ('multivar-02', 'multivar-01', 10),
  ('multivar-02', 'calc-03', 9),
  ('multivar-03', 'multivar-02', 9),
  ('multivar-03', 'calc-06', 8),
  ('multivar-04', 'multivar-02', 9),
  ('multivar-04', 'linalg-01', 8),
  ('multivar-05', 'multivar-04', 10),
  ('multivar-05', 'multivar-03', 9),

  -- Differential Equations depends on calculus and linear algebra
  ('diffeq-01', 'calc-04', 9),
  ('diffeq-01', 'calc-03', 8),
  ('diffeq-02', 'diffeq-01', 10),
  ('diffeq-03', 'diffeq-02', 8),
  ('diffeq-04', 'diffeq-02', 9),
  ('diffeq-04', 'linalg-05', 9),
  ('diffeq-05', 'multivar-02', 10),
  ('diffeq-05', 'diffeq-02', 9),

  -- Real Analysis depends on calculus
  ('analysis-01', 'calc-07', 9),
  ('analysis-01', 'calc-01', 8),
  ('analysis-02', 'analysis-01', 10),
  ('analysis-02', 'calc-07', 9),
  ('analysis-03', 'analysis-01', 9),
  ('analysis-04', 'analysis-03', 9),
  ('analysis-04', 'calc-03', 8),
  ('analysis-05', 'analysis-04', 9),
  ('analysis-05', 'calc-06', 8),
  ('analysis-06', 'analysis-03', 10),

  -- Abstract Algebra depends on linear algebra
  ('algebra-01', 'linalg-04', 8),
  ('algebra-01', 'discrete-01', 7),
  ('algebra-02', 'algebra-01', 10),
  ('algebra-03', 'algebra-02', 10),
  ('algebra-04', 'algebra-03', 10),

  -- Complex Analysis depends on calculus and real analysis
  ('complex-01', 'trig-02', 8),
  ('complex-01', 'alg-01', 6),
  ('complex-02', 'complex-01', 10),
  ('complex-02', 'calc-03', 9),
  ('complex-03', 'complex-02', 10),
  ('complex-03', 'calc-06', 8),
  ('complex-04', 'complex-03', 10),
  ('complex-04', 'calc-07', 8),

  -- Number Theory depends on algebra
  ('numthy-01', 'alg-02', 7),
  ('numthy-02', 'numthy-01', 9),
  ('numthy-03', 'numthy-02', 8),
  ('numthy-04', 'numthy-02', 9),
  ('numthy-04', 'algebra-01', 7),

  -- Discrete Math
  ('discrete-01', 'pre-alg-04', 6),
  ('discrete-02', 'discrete-01', 8),
  ('discrete-03', 'discrete-02', 7),
  ('discrete-03', 'alg-06', 6),
  ('discrete-04', 'discrete-02', 8),
  ('discrete-05', 'discrete-03', 8),
  ('discrete-05', 'alg-02', 7),

  -- Topology depends on real analysis
  ('topology-01', 'analysis-06', 10),
  ('topology-01', 'discrete-02', 7),
  ('topology-02', 'topology-01', 10),
  ('topology-03', 'topology-02', 10),
  ('topology-03', 'algebra-01', 8),

  -- Probability & Statistics depends on calculus
  ('probstat-01', 'discrete-03', 7),
  ('probstat-01', 'pre-alg-03', 6),
  ('probstat-02', 'probstat-01', 10),
  ('probstat-02', 'calc-04', 7),
  ('probstat-03', 'probstat-02', 9),
  ('probstat-04', 'probstat-03', 9),
  ('probstat-04', 'analysis-02', 7),
  ('probstat-05', 'probstat-04', 8),
  ('probstat-05', 'linalg-01', 7)
ON CONFLICT (concept_id, prerequisite_id) DO NOTHING;
