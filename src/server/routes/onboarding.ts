import { Router } from 'express';
import { requireAuth, requireTier } from '../middleware/auth';
import { createGoal, updateProfile, getActiveGoal, getProfile } from '../db/queries/profiles';
import { createConversation, getConversations, getMessages, saveMessage } from '../db/queries/conversations';
import { upsertMastery } from '../db/queries/mastery';
import { createLearningPath } from '../db/queries/learningPaths';
import { generateDiagnosticStep } from '../services/ai/diagnostic';
import { generateDiagnosticStepMock } from '../services/ai/diagnosticMock';
import { generateLearningPath, generateDefaultPath } from '../services/curriculum/pathGenerator';
import { getAllConcepts, getCategories } from '../services/curriculum/graph';

const useAI = process.env.USE_AI === 'true';
const generateStep = useAI ? generateDiagnosticStep : generateDiagnosticStepMock;
if (!useAI) console.log('Diagnostic: using mock AI (set USE_AI=true to use real API)');

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

  await updateProfile(req.userId!, { onboarding_status: 'goal_set' });

  res.status(201).json(goal);
});

// Start diagnostic assessment (paid tier only — free users should skip)
router.post('/diagnostic/start', requireAuth, requireTier('student', 'family'), async (req, res) => {
  try {
    const profile = await getProfile(req.userId!);
    if (!profile || (profile.onboarding_status !== 'goal_set' && profile.onboarding_status !== 'diagnostic_started')) {
      return res.status(400).json({ error: 'Cannot start diagnostic in current state' });
    }

    // If resuming, find existing diagnostic conversation
    if (profile.onboarding_status === 'diagnostic_started') {
      const conversations = await getConversations(req.userId!, 1);
      const existing = conversations.find(c => c.conversation_type === 'diagnostic');
      if (existing) {
        const messages = await getMessages(existing.id);
        // Find the last assistant message with a question in metadata
        const lastQuestion = [...messages]
          .reverse()
          .find(m => m.role === 'assistant' && m.metadata?.question);
        if (lastQuestion) {
          return res.json({
            conversationId: existing.id,
            question: lastQuestion.metadata!.question,
            resuming: true,
          });
        }
      }
    }

    const goal = await getActiveGoal(req.userId!);
    if (!goal) {
      return res.status(400).json({ error: 'No active goal found' });
    }

    // Create diagnostic conversation
    const conversation = await createConversation({
      user_id: req.userId!,
      title: 'Diagnostic Assessment',
      conversation_type: 'diagnostic',
    });

    // Generate first question
    const result = await generateStep(
      goal.goal_type,
      goal.goal_description ?? undefined,
      1,
      [],
    );

    if (result.type !== 'question') {
      throw new Error('Expected first diagnostic step to be a question');
    }

    // Save the question as an assistant message
    await saveMessage({
      conversation_id: conversation.id,
      role: 'assistant',
      content: result.question.questionText,
      message_type: 'diagnostic_question',
      metadata: { question: result.question },
    });

    await updateProfile(req.userId!, { onboarding_status: 'diagnostic_started' });

    res.json({
      conversationId: conversation.id,
      question: result.question,
    });
  } catch (err: any) {
    if (err?.status === 401 || err?.error?.type === 'authentication_error' || err?.message?.includes('API key')) {
      return res.status(503).json({ error: 'AI service temporarily unavailable', code: 'AI_UNAVAILABLE' });
    }
    console.error('Diagnostic start error:', err);
    res.status(503).json({ error: 'AI service temporarily unavailable', code: 'AI_UNAVAILABLE' });
  }
});

// Submit answer and get next question (paid tier only)
router.post('/diagnostic/respond', requireAuth, requireTier('student', 'family'), async (req, res) => {
  try {
    const { conversationId, answer, questionNumber, timeSpentSeconds } = req.body;

    if (!conversationId || questionNumber === undefined) {
      return res.status(400).json({ error: 'conversationId and questionNumber are required' });
    }

    const profile = await getProfile(req.userId!);
    if (!profile || profile.onboarding_status !== 'diagnostic_started') {
      return res.status(400).json({ error: 'No diagnostic in progress' });
    }

    // Save student's answer
    await saveMessage({
      conversation_id: conversationId,
      role: 'user',
      content: answer ?? '[skipped]',
      message_type: 'chat',
      metadata: { questionNumber, timeSpentSeconds, skipped: answer === null },
    });

    // Load conversation history for context
    const messages = await getMessages(conversationId);
    const conversationHistory = messages.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.role === 'assistant' && m.metadata?.question
        ? `[Used emit_question tool: ${JSON.stringify(m.metadata.question)}]`
        : m.content,
    }));

    // Get goal for context
    const goal = await getActiveGoal(req.userId!);

    // Generate next step
    const result = await generateStep(
      goal?.goal_type ?? 'custom',
      goal?.goal_description ?? undefined,
      questionNumber + 1,
      conversationHistory,
    );

    if (result.type === 'question') {
      // Save the question
      await saveMessage({
        conversation_id: conversationId,
        role: 'assistant',
        content: result.question.questionText,
        message_type: 'diagnostic_question',
        metadata: { question: result.question },
      });

      return res.json({
        isComplete: false,
        nextQuestion: result.question,
      });
    }

    // Diagnostic complete — process results
    const { data } = result;

    // Upsert mastery estimates
    for (const estimate of data.conceptMastery) {
      await upsertMastery(req.userId!, estimate.conceptId, {
        mastery_level: estimate.estimatedMastery,
        confidence: 30, // Low confidence since it's from diagnostic, not practice
      });
    }

    // Generate learning path
    const masteryEstimates = data.conceptMastery.map(m => ({
      concept_id: m.conceptId,
      estimated_mastery: m.estimatedMastery,
    }));
    const path = generateLearningPath(masteryEstimates, goal?.goal_type ?? 'custom');

    // Save learning path
    await createLearningPath({
      user_id: req.userId!,
      goal_id: goal?.id,
      ordered_concept_ids: path.orderedConceptIds,
    });

    // Build category breakdown
    const concepts = getAllConcepts();
    const categories = getCategories();
    const categoryBreakdown = categories.map(category => {
      const catConcepts = data.conceptMastery.filter(m => m.category === category);
      const avgMastery = catConcepts.length > 0
        ? catConcepts.reduce((sum, m) => sum + m.estimatedMastery, 0) / catConcepts.length
        : 0;
      const totalInCat = concepts.filter(c => c.category === category).length;
      return {
        category,
        categoryLabel: category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        averageMastery: Math.round(avgMastery),
        conceptCount: totalInCat,
      };
    }).filter(c => c.averageMastery > 0 || data.conceptMastery.some(m => m.category === c.category));

    // Save completion message
    await saveMessage({
      conversation_id: conversationId,
      role: 'assistant',
      content: data.summary,
      message_type: 'feedback',
      metadata: { diagnosticResult: data },
    });

    await updateProfile(req.userId!, { onboarding_status: 'diagnostic_complete' });

    res.json({
      isComplete: true,
      result: {
        conceptMastery: data.conceptMastery.map(m => ({
          concept_id: m.conceptId,
          concept_name: m.conceptName,
          category: m.category,
          estimated_mastery: m.estimatedMastery,
        })),
        categoryBreakdown,
        suggestedPath: path.orderedConceptIds,
        strengths: data.strengths,
        gaps: data.gaps,
        estimatedTotalMinutes: path.estimatedTotalMinutes,
        summary: data.summary,
      },
    });
  } catch (err: any) {
    if (err?.status === 401 || err?.error?.type === 'authentication_error' || err?.message?.includes('API key')) {
      return res.status(503).json({ error: 'AI service temporarily unavailable', code: 'AI_UNAVAILABLE' });
    }
    console.error('Diagnostic respond error:', err);
    res.status(503).json({ error: 'AI service temporarily unavailable', code: 'AI_UNAVAILABLE' });
  }
});

// Confirm learning path and activate account
router.post('/diagnostic/complete', requireAuth, async (req, res) => {
  const profile = await getProfile(req.userId!);
  if (!profile || profile.onboarding_status !== 'diagnostic_complete') {
    return res.status(400).json({ error: 'Diagnostic not yet complete' });
  }

  await updateProfile(req.userId!, { onboarding_status: 'active' });
  res.json({ success: true });
});

// Skip diagnostic (when AI unavailable)
router.post('/diagnostic/skip', requireAuth, async (req, res) => {
  const profile = await getProfile(req.userId!);
  if (!profile || !['goal_set', 'diagnostic_started'].includes(profile.onboarding_status)) {
    return res.status(400).json({ error: 'Cannot skip diagnostic in current state' });
  }

  const goal = await getActiveGoal(req.userId!);
  const path = generateDefaultPath(goal?.goal_type ?? 'custom');

  await createLearningPath({
    user_id: req.userId!,
    goal_id: goal?.id,
    ordered_concept_ids: path.orderedConceptIds,
  });

  await updateProfile(req.userId!, { onboarding_status: 'active' });
  res.json({ success: true });
});

export default router;
