import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import {
  getConversations,
  getConversation,
  createConversation,
  updateConversation,
  getMessages,
  saveMessage,
} from '../db/queries/conversations';

const router = Router();

// List conversations
router.get('/', requireAuth, async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const conversations = await getConversations(req.userId!, limit);
  res.json(conversations);
});

// Get conversation with messages
router.get('/:id', requireAuth, async (req, res) => {
  const conversation = await getConversation(req.params.id as string, req.userId!);
  if (!conversation) {
    return res.status(404).json({ error: 'Conversation not found' });
  }

  const messages = await getMessages(conversation.id);
  res.json({ ...conversation, messages });
});

// Create conversation
router.post('/', requireAuth, async (req, res) => {
  const { concept_id, type, title } = req.body;

  const conversation = await createConversation({
    user_id: req.userId!,
    title,
    conversation_type: type,
    primary_concept_id: concept_id,
  });

  res.status(201).json(conversation);
});

// Update conversation (title, archive)
router.patch('/:id', requireAuth, async (req, res) => {
  const conversation = await getConversation(req.params.id as string, req.userId!);
  if (!conversation) {
    return res.status(404).json({ error: 'Conversation not found' });
  }

  const { title, is_archived } = req.body;
  const updated = await updateConversation(conversation.id, {
    ...(title !== undefined && { title }),
    ...(is_archived !== undefined && { is_archived }),
  });

  res.json(updated);
});

// Send message and get AI response (SSE streaming)
// This is a placeholder - the full AI integration comes in Phase 3
router.post('/:id/messages', requireAuth, async (req, res) => {
  const conversation = await getConversation(req.params.id as string, req.userId!);
  if (!conversation) {
    return res.status(404).json({ error: 'Conversation not found' });
  }

  const { content } = req.body;
  if (!content?.trim()) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  // Save user message
  const userMessage = await saveMessage({
    conversation_id: conversation.id,
    role: 'user',
    content: content.trim(),
  });

  // TODO: Phase 3 - Stream AI response via SSE
  // For now, return the saved message
  res.status(201).json(userMessage);
});

export default router;
