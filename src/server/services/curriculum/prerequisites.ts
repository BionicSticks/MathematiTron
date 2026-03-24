import type { StudentMastery } from '../../../types/database';
import { getPrerequisitesFor } from './graph';

const PREREQUISITE_MASTERY_THRESHOLD = 60;

export function checkPrerequisitesMet(
  conceptId: string,
  masteryMap: Map<string, StudentMastery>
): { met: boolean; unmet: Array<{ prerequisiteId: string; currentMastery: number; requiredMastery: number }> } {
  const prereqs = getPrerequisitesFor(conceptId);
  const unmet: Array<{ prerequisiteId: string; currentMastery: number; requiredMastery: number }> = [];

  for (const prereq of prereqs) {
    const mastery = masteryMap.get(prereq.prerequisite_id);
    const currentLevel = mastery?.mastery_level ?? 0;

    if (currentLevel < PREREQUISITE_MASTERY_THRESHOLD) {
      unmet.push({
        prerequisiteId: prereq.prerequisite_id,
        currentMastery: currentLevel,
        requiredMastery: PREREQUISITE_MASTERY_THRESHOLD,
      });
    }
  }

  return { met: unmet.length === 0, unmet };
}

export function isConceptLocked(
  conceptId: string,
  masteryMap: Map<string, StudentMastery>
): boolean {
  const { met } = checkPrerequisitesMet(conceptId, masteryMap);
  return !met;
}

export function getWeakestPrerequisite(
  conceptId: string,
  masteryMap: Map<string, StudentMastery>
): string | null {
  const { unmet } = checkPrerequisitesMet(conceptId, masteryMap);
  if (unmet.length === 0) return null;

  // Return the prerequisite with lowest mastery
  unmet.sort((a, b) => a.currentMastery - b.currentMastery);
  return unmet[0].prerequisiteId;
}
