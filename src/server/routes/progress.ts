import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getAllMastery, getMasteredCount } from '../db/queries/mastery';
import { getRecentActivity, calculateStreak } from '../db/queries/activity';
import { getAllConcepts } from '../services/curriculum/graph';

const router = Router();

// Overall progress summary
router.get('/', requireAuth, async (req, res) => {
  const userId = req.userId!;

  const [allMastery, masteredCount, streak] = await Promise.all([
    getAllMastery(userId),
    getMasteredCount(userId),
    calculateStreak(userId),
  ]);

  const totalConcepts = getAllConcepts().length;
  const masterySum = allMastery.reduce((sum, m) => sum + m.mastery_level, 0);
  const averageMastery = totalConcepts > 0 ? masterySum / totalConcepts : 0;

  const attemptedCount = allMastery.filter(m => m.total_attempts > 0).length;
  const totalTimeMinutes = allMastery.reduce((sum, m) => sum + m.total_time_seconds, 0) / 60;

  res.json({
    allMastery,
    totalTimeMinutes: Math.round(totalTimeMinutes),
    averageMastery: Math.round(averageMastery * 10) / 10,
    conceptsStarted: attemptedCount,
    conceptsMastered: masteredCount,
    currentStreak: streak.current,
    longestStreak: streak.longest,
  });
});

// Per-concept mastery
router.get('/concepts', requireAuth, async (req, res) => {
  const allMastery = await getAllMastery(req.userId!);
  res.json(allMastery);
});

// Activity history
router.get('/history', requireAuth, async (req, res) => {
  const days = parseInt(req.query.days as string) || 30;
  const activity = await getRecentActivity(req.userId!, days);
  res.json(activity);
});

export default router;
