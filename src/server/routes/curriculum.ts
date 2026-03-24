import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { getAllConcepts, getAllPrerequisites, getConcept, getCategories, getPrerequisitesFor } from '../services/curriculum/graph';
import { getAllMastery } from '../db/queries/mastery';
import { isConceptLocked } from '../services/curriculum/prerequisites';
import type { ConceptWithMastery } from '../../types/api';

const router = Router();

// Get all concepts (public, cacheable)
router.get('/concepts', (_req, res) => {
  res.json(getAllConcepts());
});

// Get all prerequisites (public, cacheable)
router.get('/prerequisites', (_req, res) => {
  res.json(getAllPrerequisites());
});

// Get concept map with user's mastery overlay
router.get('/map', requireAuth, async (req, res) => {
  const concepts = getAllConcepts();
  const allMastery = await getAllMastery(req.userId!);
  const masteryMap = new Map(allMastery.map(m => [m.concept_id, m]));

  const conceptsWithMastery: ConceptWithMastery[] = concepts.map(concept => {
    const prereqs = getPrerequisitesFor(concept.id);
    return {
      ...concept,
      mastery: masteryMap.get(concept.id),
      isLocked: isConceptLocked(concept.id, masteryMap),
      prerequisites: prereqs.map(p => p.prerequisite_id),
    };
  });

  res.json({
    concepts: conceptsWithMastery,
    categories: getCategories(),
  });
});

// Get single concept detail
router.get('/concepts/:id', (req, res) => {
  const concept = getConcept(req.params.id as string);
  if (!concept) {
    return res.status(404).json({ error: 'Concept not found' });
  }

  const prereqs = getPrerequisitesFor(concept.id);
  res.json({ ...concept, prerequisites: prereqs });
});

export default router;
