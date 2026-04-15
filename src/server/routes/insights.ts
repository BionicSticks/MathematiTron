import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getInsights } from '../db/queries/insights';
import { supabaseAdmin } from '../db/client';

const router = Router();

// Get all active insights grouped by type
router.get('/', requireAuth, async (req, res) => {
  const insights = await getInsights(req.userId!);

  const byType = {
    misconceptions: insights.filter(i => i.insight_type === 'misconception'),
    strengths: insights.filter(i => i.insight_type === 'strength'),
    learningStyle: insights.filter(i => i.insight_type === 'learning_style'),
    strugglePatterns: insights.filter(i => i.insight_type === 'struggle_pattern'),
  };

  res.json({ insights, byType });
});

// Dismiss an insight
router.delete('/:id', requireAuth, async (req, res) => {
  const { error } = await supabaseAdmin
    .from('student_insights')
    .update({ is_active: false })
    .eq('id', req.params.id)
    .eq('user_id', req.userId!);

  if (error) throw error;
  res.json({ success: true });
});

export default router;
