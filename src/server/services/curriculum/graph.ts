import { supabaseAdmin } from '../../db/client';
import type { Concept, ConceptPrerequisite } from '../../../types/database';

// In-memory cache of the curriculum graph (loaded once at startup)
let conceptsCache: Concept[] | null = null;
let prerequisitesCache: ConceptPrerequisite[] | null = null;
let prerequisiteMap: Map<string, ConceptPrerequisite[]> | null = null;
let dependentsMap: Map<string, string[]> | null = null;

export async function loadCurriculum(): Promise<void> {
  const [conceptsResult, prereqsResult] = await Promise.all([
    supabaseAdmin.from('concepts').select('*').order('display_order'),
    supabaseAdmin.from('concept_prerequisites').select('*'),
  ]);

  if (conceptsResult.error) throw conceptsResult.error;
  if (prereqsResult.error) throw prereqsResult.error;

  conceptsCache = conceptsResult.data;
  prerequisitesCache = prereqsResult.data;

  // Build prerequisite lookup: concept_id -> its prerequisites
  prerequisiteMap = new Map();
  for (const prereq of prerequisitesCache) {
    const existing = prerequisiteMap.get(prereq.concept_id) ?? [];
    existing.push(prereq);
    prerequisiteMap.set(prereq.concept_id, existing);
  }

  // Build dependents lookup: prerequisite_id -> concepts that depend on it
  dependentsMap = new Map();
  for (const prereq of prerequisitesCache) {
    const existing = dependentsMap.get(prereq.prerequisite_id) ?? [];
    existing.push(prereq.concept_id);
    dependentsMap.set(prereq.prerequisite_id, existing);
  }

  console.log(`Curriculum loaded: ${conceptsCache.length} concepts, ${prerequisitesCache.length} prerequisites`);
}

export function getAllConcepts(): Concept[] {
  if (!conceptsCache) throw new Error('Curriculum not loaded');
  return conceptsCache;
}

export function getConcept(id: string): Concept | undefined {
  if (!conceptsCache) throw new Error('Curriculum not loaded');
  return conceptsCache.find(c => c.id === id);
}

export function getAllPrerequisites(): ConceptPrerequisite[] {
  if (!prerequisitesCache) throw new Error('Curriculum not loaded');
  return prerequisitesCache;
}

export function getPrerequisitesFor(conceptId: string): ConceptPrerequisite[] {
  if (!prerequisiteMap) throw new Error('Curriculum not loaded');
  return prerequisiteMap.get(conceptId) ?? [];
}

export function getDependentsOf(conceptId: string): string[] {
  if (!dependentsMap) throw new Error('Curriculum not loaded');
  return dependentsMap.get(conceptId) ?? [];
}

export function getCategories(): string[] {
  if (!conceptsCache) throw new Error('Curriculum not loaded');
  const categories = new Set(conceptsCache.map(c => c.category));
  return Array.from(categories);
}

export function getConceptsByCategory(category: string): Concept[] {
  if (!conceptsCache) throw new Error('Curriculum not loaded');
  return conceptsCache.filter(c => c.category === category);
}

// Get root concepts (no prerequisites)
export function getRootConcepts(): Concept[] {
  if (!conceptsCache || !prerequisiteMap) throw new Error('Curriculum not loaded');
  return conceptsCache.filter(c => !prerequisiteMap!.has(c.id));
}
