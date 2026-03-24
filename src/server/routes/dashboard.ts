import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getAllMastery, getMasteredCount } from '../db/queries/mastery';
import { getRecentActivity, calculateStreak } from '../db/queries/activity';
import { getActiveLearningPath } from '../db/queries/learningPaths';
import { getAllConcepts, getConcept } from '../services/curriculum/graph';
import { isConceptLocked } from '../services/curriculum/prerequisites';
import type { ConceptWithMastery } from '../../types/api';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = req.userId!;

  const [allMastery, masteredCount, recentActivity, streak, learningPath] = await Promise.all([
    getAllMastery(userId),
    getMasteredCount(userId),
    getRecentActivity(userId, 7),
    calculateStreak(userId),
    getActiveLearningPath(userId),
  ]);

  const allConcepts = getAllConcepts();
  const masteryMap = new Map(allMastery.map(m => [m.concept_id, m]));

  // Calculate overall mastery (average of all attempted concepts)
  const attemptedMastery = allMastery.filter(m => m.total_attempts > 0);
  const overallMastery = attemptedMastery.length > 0
    ? attemptedMastery.reduce((sum, m) => sum + m.mastery_level, 0) / attemptedMastery.length
    : 0;

  // Total time from recent activity
  const totalTimeMinutes = recentActivity.reduce((sum, a) => sum + a.total_time_seconds, 0) / 60;

  // Suggest next concepts from learning path or unlocked concepts
  const suggestedConcepts: ConceptWithMastery[] = [];

  if (learningPath) {
    for (const conceptId of learningPath.ordered_concept_ids) {
      if (suggestedConcepts.length >= 3) break;
      const mastery = masteryMap.get(conceptId);
      if (mastery && mastery.mastery_level >= 80) continue;

      const concept = getConcept(conceptId);
      if (!concept) continue;

      const locked = isConceptLocked(conceptId, masteryMap);
      if (locked) continue;

      suggestedConcepts.push({
        ...concept,
        mastery,
        isLocked: false,
        prerequisites: [],
      });
    }
  }

  // Fallback: suggest unlocked, un-mastered concepts
  if (suggestedConcepts.length < 3) {
    for (const concept of allConcepts) {
      if (suggestedConcepts.length >= 3) break;
      if (suggestedConcepts.some(s => s.id === concept.id)) continue;

      const mastery = masteryMap.get(concept.id);
      if (mastery && mastery.mastery_level >= 80) continue;

      const locked = isConceptLocked(concept.id, masteryMap);
      if (locked) continue;

      suggestedConcepts.push({
        ...concept,
        mastery,
        isLocked: false,
        prerequisites: [],
      });
    }
  }

  res.json({
    currentStreak: streak.current,
    longestStreak: streak.longest,
    totalConcepts: allConcepts.length,
    masteredConcepts: masteredCount,
    overallMastery: Math.round(overallMastery * 10) / 10,
    totalTimeMinutes: Math.round(totalTimeMinutes),
    recentActivity: recentActivity.map(a => ({
      date: a.activity_date,
      timeSeconds: a.total_time_seconds,
      problemsAttempted: a.problems_attempted,
      problemsCorrect: a.problems_correct,
    })),
    suggestedConcepts,
  });
});

export default router;
