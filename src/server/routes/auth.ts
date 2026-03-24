import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getActiveGoal } from '../db/queries/profiles';

const router = Router();

router.get('/me', requireAuth, async (req, res) => {
  const goal = await getActiveGoal(req.userId!);

  res.json({
    profile: req.userProfile,
    goal,
  });
});

export default router;
