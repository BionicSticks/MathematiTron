import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getProfile, updateProfile, getActiveGoal, createGoal } from '../db/queries/profiles';
import type { StudentGoal } from '../../types/database';

const router = Router();

// Get profile + active goal
router.get('/', requireAuth, async (req, res) => {
  const [profile, goal] = await Promise.all([
    getProfile(req.userId!),
    getActiveGoal(req.userId!),
  ]);
  res.json({ profile, goal });
});

// Update profile
router.patch('/profile', requireAuth, async (req, res) => {
  const { display_name, timezone } = req.body;
  const updates: Record<string, string> = {};
  if (display_name !== undefined) updates.display_name = display_name;
  if (timezone !== undefined) updates.timezone = timezone;

  const profile = await updateProfile(req.userId!, updates);
  res.json({ profile });
});

// Update goal
router.put('/goal', requireAuth, async (req, res) => {
  const { goal_type, goal_description, target_date } = req.body as {
    goal_type: StudentGoal['goal_type'];
    goal_description?: string;
    target_date?: string;
  };

  const goal = await createGoal(req.userId!, {
    goal_type,
    goal_description,
    target_date,
  });
  res.json({ goal });
});

export default router;
