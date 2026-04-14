import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getAllMastery, getMastery, upsertMastery } from '../db/queries/mastery';
import { createPracticeSession, getPracticeSession, updatePracticeSession, savePracticeProblem, getPracticeProblem, updatePracticeProblem } from '../db/queries/practice';
import { upsertDailyActivity } from '../db/queries/activity';
import { getActiveLearningPath } from '../db/queries/learningPaths';
import { getAllConcepts, getConcept, getPrerequisitesFor } from '../services/curriculum/graph';
import { isConceptLocked } from '../services/curriculum/prerequisites';
import { calculateMasteryUpdate, selectNextDifficulty, checkAnswer } from '../services/mastery/calculator';
import { generateProblem } from '../services/ai/practice';
import { generateProblemMock } from '../services/ai/practiceMock';
import type { ConceptWithMastery } from '../../types/api';

const router = Router();

const useAI = process.env.USE_AI === 'true';
const generateProblemFn = useAI ? generateProblem : async (
  conceptId: string,
  _conceptName: string,
  _conceptDescription: string,
  difficulty: number,
  _masteryLevel: number,
  previousProblems?: string[],
) => generateProblemMock(conceptId, difficulty, previousProblems);

if (!useAI) console.log('Practice: using mock AI (set USE_AI=true to use real API)');

// Get concepts available for practice
router.get('/concepts', requireAuth, async (req, res) => {
  const allConcepts = getAllConcepts();
  const allMastery = await getAllMastery(req.userId!);
  const masteryMap = new Map(allMastery.map(m => [m.concept_id, m]));
  const learningPath = await getActiveLearningPath(req.userId!);

  const conceptsWithMastery: ConceptWithMastery[] = allConcepts.map(concept => ({
    ...concept,
    mastery: masteryMap.get(concept.id),
    isLocked: isConceptLocked(concept.id, masteryMap),
    prerequisites: getPrerequisitesFor(concept.id).map(p => p.prerequisite_id),
  }));

  const pathIds = new Set(learningPath?.ordered_concept_ids ?? []);

  const recommended = conceptsWithMastery
    .filter(c => !c.isLocked && pathIds.has(c.id) && (!c.mastery || c.mastery.mastery_level < 80))
    .slice(0, 6);

  const recommendedIds = new Set(recommended.map(c => c.id));
  const available = conceptsWithMastery
    .filter(c => !c.isLocked && !recommendedIds.has(c.id) && (!c.mastery || c.mastery.mastery_level < 100));

  res.json({ recommended, available });
});

// Start a practice session
router.post('/session/start', requireAuth, async (req, res) => {
  try {
    const { conceptId } = req.body;
    if (!conceptId) return res.status(400).json({ error: 'conceptId is required' });

    const concept = getConcept(conceptId);
    if (!concept) return res.status(404).json({ error: 'Concept not found' });

    const allMastery = await getAllMastery(req.userId!);
    const masteryMap = new Map(allMastery.map(m => [m.concept_id, m]));
    if (isConceptLocked(conceptId, masteryMap)) {
      return res.status(400).json({ error: 'Concept is locked — prerequisites not met' });
    }

    const currentMastery = masteryMap.get(conceptId);
    const masteryLevel = currentMastery?.mastery_level ?? 0;

    const session = await createPracticeSession({
      user_id: req.userId!,
      concept_id: conceptId,
    });

    const startDifficulty = Math.max(1, Math.min(10, Math.ceil(masteryLevel / 15) + Math.floor(concept.difficulty / 2)));

    const problem = await generateProblemFn(
      conceptId,
      concept.name,
      concept.description,
      startDifficulty,
      masteryLevel,
    );

    const savedProblem = await savePracticeProblem({
      user_id: req.userId!,
      session_id: session.id,
      concept_id: conceptId,
      problem_text: problem.problem_text,
      correct_answer: problem.correct_answer,
      explanation: problem.explanation,
      hints: problem.hints,
      difficulty: problem.difficulty,
    });

    res.json({
      sessionId: session.id,
      problem: {
        id: savedProblem.id,
        problem_text: problem.problem_text,
        hints: problem.hints,
        difficulty: problem.difficulty,
      },
      mastery: masteryLevel,
    });
  } catch (err: any) {
    console.error('Practice start error:', err);
    res.status(500).json({ error: 'Failed to start practice session' });
  }
});

// Submit an answer
router.post('/session/:sessionId/submit', requireAuth, async (req, res) => {
  try {
    const sessionId = req.params.sessionId as string;
    const { problem_id, answer, time_spent_seconds } = req.body;

    if (!answer && answer !== '') return res.status(400).json({ error: 'answer is required' });

    const session = await getPracticeSession(sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    const problem = await getPracticeProblem(problem_id);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const isCorrect = checkAnswer(answer, problem.correct_answer);
    const currentMastery = await getMastery(req.userId!, session.concept_id);
    const problemDifficulty = problem.difficulty ?? 5;

    const update = calculateMasteryUpdate({
      currentMastery: currentMastery?.mastery_level ?? 0,
      currentConfidence: currentMastery?.confidence ?? 0,
      totalAttempts: currentMastery?.total_attempts ?? 0,
      correctAttempts: currentMastery?.correct_attempts ?? 0,
      problemDifficulty,
      hintsUsed: req.body.hints_used ?? 0,
      isCorrect,
      timeSpentSeconds: time_spent_seconds ?? 60,
    });

    await upsertMastery(req.userId!, session.concept_id, {
      mastery_level: update.newMasteryLevel,
      confidence: update.newConfidence,
      total_attempts: update.newTotalAttempts,
      correct_attempts: update.newCorrectAttempts,
      total_time_seconds: (currentMastery?.total_time_seconds ?? 0) + (time_spent_seconds ?? 0),
      last_practiced_at: new Date().toISOString(),
    });

    await updatePracticeProblem(problem_id, {
      user_answer: answer,
      is_correct: isCorrect,
      time_spent_seconds: time_spent_seconds ?? 0,
    });

    await updatePracticeSession(sessionId, {
      problems_attempted: (session.problems_attempted ?? 0) + 1,
      problems_correct: (session.problems_correct ?? 0) + (isCorrect ? 1 : 0),
    });

    res.json({
      isCorrect,
      correctAnswer: problem.correct_answer,
      explanation: problem.explanation,
      masteryDelta: update.masteryDelta,
      newMasteryLevel: update.newMasteryLevel,
    });
  } catch (err: any) {
    console.error('Practice submit error:', err);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

// Get next problem
router.post('/session/:sessionId/next', requireAuth, async (req, res) => {
  try {
    const sessionId = req.params.sessionId as string;

    const session = await getPracticeSession(sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    const concept = getConcept(session.concept_id);
    if (!concept) return res.status(404).json({ error: 'Concept not found' });

    const currentMastery = await getMastery(req.userId!, session.concept_id);
    const masteryLevel = currentMastery?.mastery_level ?? 0;

    const recentResults = req.body.recentResults as boolean[] ?? [];
    const currentDifficulty = req.body.currentDifficulty as number ?? Math.ceil(concept.difficulty / 2);
    const nextDifficulty = selectNextDifficulty(recentResults, currentDifficulty);

    const problem = await generateProblemFn(
      session.concept_id,
      concept.name,
      concept.description,
      nextDifficulty,
      masteryLevel,
    );

    const savedProblem = await savePracticeProblem({
      user_id: req.userId!,
      session_id: sessionId,
      concept_id: session.concept_id,
      problem_text: problem.problem_text,
      correct_answer: problem.correct_answer,
      explanation: problem.explanation,
      hints: problem.hints,
      difficulty: problem.difficulty,
    });

    res.json({
      problem: {
        id: savedProblem.id,
        problem_text: problem.problem_text,
        hints: problem.hints,
        difficulty: problem.difficulty,
      },
      problemNumber: (session.problems_attempted ?? 0) + 1,
    });
  } catch (err: any) {
    console.error('Practice next error:', err);
    res.status(500).json({ error: 'Failed to generate next problem' });
  }
});

// End session
router.post('/session/:sessionId/end', requireAuth, async (req, res) => {
  try {
    const sessionId = req.params.sessionId as string;

    const session = await getPracticeSession(sessionId);
    if (!session) return res.status(404).json({ error: 'Session not found' });

    await updatePracticeSession(sessionId, {
      completed_at: new Date().toISOString(),
    });

    const attempted = session.problems_attempted ?? 0;
    const correct = session.problems_correct ?? 0;
    await upsertDailyActivity(req.userId!, {
      problems_attempted: attempted,
      problems_correct: correct,
      concept_id: session.concept_id,
    });

    const mastery = await getMastery(req.userId!, session.concept_id);
    const startMastery = req.body.startMastery as number ?? 0;

    res.json({
      score: correct,
      totalProblems: attempted,
      masteryChange: (mastery?.mastery_level ?? 0) - startMastery,
      timeSpentSeconds: mastery?.total_time_seconds ?? 0,
      newMasteryLevel: mastery?.mastery_level ?? 0,
    });
  } catch (err: any) {
    console.error('Practice end error:', err);
    res.status(500).json({ error: 'Failed to end session' });
  }
});

export default router;
