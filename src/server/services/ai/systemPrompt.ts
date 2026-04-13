import type { Profile, StudentGoal, StudentMastery, StudentInsight, Concept } from '../../../types/database';

interface StudentContext {
  profile: Profile;
  goal: StudentGoal | null;
  overallMastery: number;
  insights: StudentInsight[];
}

interface ConceptContext {
  concept: Concept;
  mastery: StudentMastery | null;
  prerequisites: Array<{
    concept: Concept;
    mastery: StudentMastery | null;
  }>;
}

type ConversationType = 'tutoring' | 'diagnostic' | 'practice' | 'review';

// Layer 1: Tutor Identity (static)
const TUTOR_IDENTITY = `You are MathematiTron, a patient and precise AI math tutor. Your teaching philosophy:

- **Socratic method**: Guide students to discover answers through questions rather than giving answers immediately.
- **Progressive hints**: When a student is stuck, offer hints in 3 levels — gentle nudge, structural hint, then worked example.
- **Precision**: Use correct mathematical notation. Wrap LaTeX in $...$ for inline and $$...$$ for display math.
- **Encouragement**: Celebrate correct reasoning, not just correct answers. Acknowledge effort and partial understanding.
- **Honesty**: If you're uncertain about something, say so. Never fabricate mathematical facts.
- **Conciseness**: Teach efficiently. Don't repeat what the student already understands. Adjust depth to their level.
- **Adaptive pacing**: If a student grasps something quickly, move on. If they struggle, slow down and try a different angle.`;

// Layer 5: Behavioral instructions per conversation type
const BEHAVIORAL_INSTRUCTIONS: Record<ConversationType, string> = {
  tutoring: `You are in a tutoring session. Your role:
- Teach the concept from the student's current understanding.
- Use examples that build complexity gradually.
- Check understanding frequently with quick questions.
- If the student asks a tangential question, briefly address it and guide back to the topic.
- When the student demonstrates understanding, suggest they try a practice problem.`,

  diagnostic: `You are conducting a diagnostic assessment. Your role:
- Ask targeted questions to assess the student's knowledge level.
- Start broad, then drill into specific concepts based on their responses.
- Keep questions concise and focused.
- Don't teach during the diagnostic — just assess.
- After 6-10 questions, you should have a clear picture of their level.`,

  practice: `You are guiding a practice session. Your role:
- Present problems one at a time.
- When the student answers, validate and explain if incorrect.
- Use progressive hints if they're stuck.
- Track difficulty — if they get 3 right in a row, increase difficulty.
- Summarise performance at natural break points.`,

  review: `You are reviewing the student's progress. Your role:
- Summarise what they've learned in recent sessions.
- Identify patterns in mistakes and strengths.
- Suggest specific areas to focus on next.
- Be encouraging about progress made.`,
};

// Layer 2: Student Profile
function buildStudentProfile(ctx: StudentContext): string {
  const parts: string[] = ['## Student Profile'];

  const name = ctx.profile.display_name ?? 'Student';
  parts.push(`- **Name**: ${name}`);

  if (ctx.goal) {
    const goalLabels: Record<string, string> = {
      sat_math: 'SAT Math Prep',
      act_math: 'ACT Math Prep',
      gcse_math: 'GCSE Maths',
      a_level_math: 'A-Level Maths',
      learn_topic: 'Learn a Specific Topic',
      grade_level: 'Catch Up to Grade Level',
      custom: 'Custom Goal',
    };
    parts.push(`- **Goal**: ${goalLabels[ctx.goal.goal_type] ?? ctx.goal.goal_type}`);
    if (ctx.goal.goal_description) {
      parts.push(`- **Goal Details**: ${ctx.goal.goal_description}`);
    }
    if (ctx.goal.target_date) {
      parts.push(`- **Target Date**: ${ctx.goal.target_date}`);
    }
  }

  parts.push(`- **Overall Mastery**: ${Math.round(ctx.overallMastery)}%`);

  // Include insights (misconceptions, learning style, etc.)
  const misconceptions = ctx.insights.filter(i => i.insight_type === 'misconception');
  const strengths = ctx.insights.filter(i => i.insight_type === 'strength');
  const learningStyle = ctx.insights.filter(i => i.insight_type === 'learning_style');

  if (misconceptions.length > 0) {
    parts.push(`- **Known Misconceptions**: ${misconceptions.slice(0, 5).map(i => i.content).join('; ')}`);
  }
  if (strengths.length > 0) {
    parts.push(`- **Strengths**: ${strengths.slice(0, 5).map(i => i.content).join('; ')}`);
  }
  if (learningStyle.length > 0) {
    parts.push(`- **Learning Style**: ${learningStyle.slice(0, 3).map(i => i.content).join('; ')}`);
  }

  return parts.join('\n');
}

// Layer 3: Concept Context
function buildConceptContext(ctx: ConceptContext | null): string {
  if (!ctx) return '';

  const parts: string[] = ['## Current Topic'];
  parts.push(`- **Concept**: ${ctx.concept.name}`);
  parts.push(`- **Description**: ${ctx.concept.description}`);
  parts.push(`- **Category**: ${ctx.concept.category.replace(/-/g, ' ')}`);
  parts.push(`- **Difficulty**: ${ctx.concept.difficulty}/10`);

  if (ctx.mastery) {
    parts.push(`- **Student's Mastery**: ${Math.round(ctx.mastery.mastery_level)}%`);
    parts.push(`- **Total Attempts**: ${ctx.mastery.total_attempts} (${ctx.mastery.correct_attempts} correct)`);
  } else {
    parts.push(`- **Student's Mastery**: Not started`);
  }

  if (ctx.prerequisites.length > 0) {
    parts.push('\n### Prerequisites');
    for (const p of ctx.prerequisites) {
      const masteryLevel = p.mastery ? `${Math.round(p.mastery.mastery_level)}%` : 'not started';
      parts.push(`- ${p.concept.name}: ${masteryLevel}`);
    }
  }

  return parts.join('\n');
}

// Layer 4: Conversation summary (injected separately as it comes from DB)

export function buildSystemPrompt(
  studentCtx: StudentContext,
  conceptCtx: ConceptContext | null,
  conversationType: ConversationType,
  conversationSummary?: string,
): string {
  const sections = [
    TUTOR_IDENTITY,
    buildStudentProfile(studentCtx),
    buildConceptContext(conceptCtx),
  ];

  if (conversationSummary) {
    sections.push(`## Conversation Summary (older messages)\n${conversationSummary}`);
  }

  sections.push(BEHAVIORAL_INSTRUCTIONS[conversationType]);

  return sections.filter(Boolean).join('\n\n---\n\n');
}
