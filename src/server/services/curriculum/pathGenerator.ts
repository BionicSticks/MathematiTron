import { getAllConcepts, getPrerequisitesFor } from './graph';
import type { Concept } from '../../../types/database';

interface MasteryEstimate {
  concept_id: string;
  estimated_mastery: number;
}

interface GeneratedPath {
  orderedConceptIds: string[];
  estimatedTotalMinutes: number;
}

const MASTERY_THRESHOLD = 60;

/**
 * Generate a learning path from diagnostic results.
 * Uses topological sort respecting prerequisites, filtering to concepts
 * the student needs to work on based on their goal.
 */
export function generateLearningPath(
  masteryEstimates: MasteryEstimate[],
  goalType: string,
): GeneratedPath {
  const allConcepts = getAllConcepts();
  const conceptMap = new Map(allConcepts.map(c => [c.id, c]));
  const masteryMap = new Map(masteryEstimates.map(m => [m.concept_id, m.estimated_mastery]));

  // Determine which categories are relevant for the goal
  const relevantCategories = getRelevantCategories(goalType, allConcepts);

  // Filter to concepts in relevant categories with mastery below threshold
  const needsWork = new Set<string>();

  for (const concept of allConcepts) {
    if (!relevantCategories.has(concept.category)) continue;
    const mastery = masteryMap.get(concept.id) ?? 0;
    if (mastery < MASTERY_THRESHOLD) {
      needsWork.add(concept.id);
      // Also include unmastered prerequisites (even from other categories)
      addUnmasteredPrereqs(concept.id, masteryMap, needsWork, conceptMap);
    }
  }

  // Topological sort
  const sorted = topologicalSort(needsWork, conceptMap);

  // Calculate estimated time
  const estimatedTotalMinutes = sorted.reduce((sum, id) => {
    const concept = conceptMap.get(id);
    return sum + (concept?.estimated_minutes ?? 30);
  }, 0);

  return { orderedConceptIds: sorted, estimatedTotalMinutes };
}

/**
 * Generate a default path when diagnostic is skipped.
 * Orders all concepts relevant to the goal by difficulty, respecting prerequisites.
 */
export function generateDefaultPath(goalType: string): GeneratedPath {
  const allConcepts = getAllConcepts();
  const conceptMap = new Map(allConcepts.map(c => [c.id, c]));
  const relevantCategories = getRelevantCategories(goalType, allConcepts);

  const relevant = new Set<string>();
  for (const concept of allConcepts) {
    if (relevantCategories.has(concept.category)) {
      relevant.add(concept.id);
      addAllPrereqs(concept.id, relevant, conceptMap);
    }
  }

  const sorted = topologicalSort(relevant, conceptMap);
  const estimatedTotalMinutes = sorted.reduce((sum, id) => {
    const concept = conceptMap.get(id);
    return sum + (concept?.estimated_minutes ?? 30);
  }, 0);

  return { orderedConceptIds: sorted, estimatedTotalMinutes };
}

function getRelevantCategories(goalType: string, allConcepts: Concept[]): Set<string> {
  const allCategories = new Set(allConcepts.map(c => c.category));

  // Goal-specific category priorities
  const goalCategoryMap: Record<string, string[]> = {
    sat_math: ['pre-algebra', 'algebra-foundations', 'algebra-intermediate', 'geometry', 'statistics', 'trigonometry'],
    act_math: ['pre-algebra', 'algebra-foundations', 'algebra-intermediate', 'geometry', 'statistics', 'trigonometry'],
    gcse_math: ['pre-algebra', 'algebra-foundations', 'algebra-intermediate', 'geometry', 'statistics', 'probability'],
    a_level_math: ['algebra-foundations', 'algebra-intermediate', 'algebra-advanced', 'calculus-single', 'trigonometry', 'statistics'],
  };

  const specific = goalCategoryMap[goalType];
  if (specific) {
    return new Set(specific.filter(c => allCategories.has(c)));
  }

  // For learn_topic, grade_level, custom — include everything
  return allCategories;
}

function addUnmasteredPrereqs(
  conceptId: string,
  masteryMap: Map<string, number>,
  needsWork: Set<string>,
  conceptMap: Map<string, Concept>,
): void {
  const prereqs = getPrerequisitesFor(conceptId);
  for (const prereq of prereqs) {
    if (needsWork.has(prereq.prerequisite_id)) continue;
    if (!conceptMap.has(prereq.prerequisite_id)) continue;
    const mastery = masteryMap.get(prereq.prerequisite_id) ?? 0;
    if (mastery < MASTERY_THRESHOLD) {
      needsWork.add(prereq.prerequisite_id);
      addUnmasteredPrereqs(prereq.prerequisite_id, masteryMap, needsWork, conceptMap);
    }
  }
}

function addAllPrereqs(
  conceptId: string,
  set: Set<string>,
  conceptMap: Map<string, Concept>,
): void {
  const prereqs = getPrerequisitesFor(conceptId);
  for (const prereq of prereqs) {
    if (set.has(prereq.prerequisite_id)) continue;
    if (!conceptMap.has(prereq.prerequisite_id)) continue;
    set.add(prereq.prerequisite_id);
    addAllPrereqs(prereq.prerequisite_id, set, conceptMap);
  }
}

function topologicalSort(
  conceptIds: Set<string>,
  conceptMap: Map<string, Concept>,
): string[] {
  // Kahn's algorithm
  const inDegree = new Map<string, number>();
  const adjList = new Map<string, string[]>();

  for (const id of conceptIds) {
    inDegree.set(id, 0);
    adjList.set(id, []);
  }

  // Build edges within the subset
  for (const id of conceptIds) {
    const prereqs = getPrerequisitesFor(id);
    for (const prereq of prereqs) {
      if (conceptIds.has(prereq.prerequisite_id)) {
        adjList.get(prereq.prerequisite_id)!.push(id);
        inDegree.set(id, (inDegree.get(id) ?? 0) + 1);
      }
    }
  }

  // Start with nodes that have no prerequisites in the subset
  // Sort by difficulty within each "level" for consistent ordering
  const queue: string[] = [];
  for (const [id, degree] of inDegree) {
    if (degree === 0) queue.push(id);
  }
  queue.sort((a, b) => {
    const ca = conceptMap.get(a);
    const cb = conceptMap.get(b);
    return (ca?.difficulty ?? 0) - (cb?.difficulty ?? 0);
  });

  const result: string[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);

    const neighbors = adjList.get(current) ?? [];
    const newReady: string[] = [];
    for (const neighbor of neighbors) {
      const newDegree = (inDegree.get(neighbor) ?? 1) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) {
        newReady.push(neighbor);
      }
    }
    // Sort newly ready nodes by difficulty
    newReady.sort((a, b) => {
      const ca = conceptMap.get(a);
      const cb = conceptMap.get(b);
      return (ca?.difficulty ?? 0) - (cb?.difficulty ?? 0);
    });
    queue.push(...newReady);
  }

  return result;
}
