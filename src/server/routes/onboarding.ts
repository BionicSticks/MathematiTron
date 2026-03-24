import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { createGoal, updateProfile } from '../db/queries/profiles';

const router = Router();

// Set learning goal
router.post('/goal', requireAuth, async (req, res) => {
  const { goal_type, goal_description, target_date } = req.body;

  if (!goal_type) {
    return res.status(400).json({ error: 'goal_type is required' });
  }

  const goal = await createGoal(req.userId!, {
    goal_type,
    goal_description,
    target_date,
  });

  // Update onboarding status
  await updateProfile(req.userId!, { onboarding_status: 'goal_set' });

  res.status(201).json(goal);
});

// TODO: Phase 4 - Diagnostic conversation endpoints
// POST /diagnostic/start
// POST /diagnostic/respond
// POST /diagnostic/complete

export default router;
