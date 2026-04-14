// API request/response types

import type { Profile, StudentGoal, Concept, StudentMastery, Conversation, Message, LearningPath, StudentInsight } from './database';

// Auth
export interface AuthUser {
  profile: Profile;
  goal: StudentGoal | null;
}

// Dashboard
export interface DashboardStats {
  currentStreak: number;
  longestStreak: number;
  totalConcepts: number;
  masteredConcepts: number;
  overallMastery: number;
  totalTimeMinutes: number;
  recentActivity: Array<{
    date: string;
    timeSeconds: number;
    problemsAttempted: number;
    problemsCorrect: number;
  }>;
  suggestedConcepts: ConceptWithMastery[];
}

// Concept Map
export interface ConceptWithMastery extends Concept {
  mastery?: StudentMastery;
  isLocked: boolean;
  prerequisites: string[];
}

export interface ConceptMapData {
  concepts: ConceptWithMastery[];
  categories: string[];
}

// Conversations
export interface ConversationWithLastMessage extends Conversation {
  lastMessage?: Pick<Message, 'content' | 'role' | 'created_at'>;
}

export interface ConversationDetail extends Conversation {
  messages: Message[];
}

export interface SendMessageRequest {
  content: string;
  concept_id?: string;
}

export interface StreamEvent {
  type: 'delta' | 'done' | 'error';
  text?: string;
  message_id?: string;
  error?: string;
}

// Onboarding
export interface SetGoalRequest {
  goal_type: StudentGoal['goal_type'];
  goal_description?: string;
  target_date?: string;
}

// Diagnostic
export type DiagnosticQuestionType = 'multiple_choice' | 'short_answer' | 'math_expression';

export interface DiagnosticQuestion {
  questionNumber: number;
  totalExpected: number;
  categoryBeingProbed: string;
  conceptId: string | null;
  questionText: string;
  questionType: DiagnosticQuestionType;
  options?: string[];
  difficulty: number;
}

export interface DiagnosticStartResponse {
  conversationId: string;
  question: DiagnosticQuestion;
}

export interface DiagnosticAnswerRequest {
  conversationId: string;
  answer: string | null;
  questionNumber: number;
  timeSpentSeconds?: number;
}

export interface DiagnosticAnswerResponse {
  isComplete: boolean;
  nextQuestion?: DiagnosticQuestion;
  result?: DiagnosticResult;
}

export interface DiagnosticResult {
  conceptMastery: Array<{
    concept_id: string;
    concept_name: string;
    category: string;
    estimated_mastery: number;
  }>;
  categoryBreakdown: Array<{
    category: string;
    categoryLabel: string;
    averageMastery: number;
    conceptCount: number;
  }>;
  suggestedPath: string[];
  strengths: string[];
  gaps: string[];
  estimatedTotalMinutes: number;
  summary: string;
}

// Practice
export interface PracticeConceptsResponse {
  recommended: ConceptWithMastery[];
  available: ConceptWithMastery[];
}

export interface PracticeSessionStartResponse {
  sessionId: string;
  problem: GeneratedProblem;
  mastery: number;
}

export interface PracticeNextProblemResponse {
  problem: GeneratedProblem;
  problemNumber: number;
}

export interface PracticeSessionEndResponse {
  score: number;
  totalProblems: number;
  masteryChange: number;
  timeSpentSeconds: number;
  newMasteryLevel: number;
}

export interface GeneratedProblem {
  id: string;
  problem_text: string;
  hints: string[];
  difficulty: number;
}

export interface ProblemSubmitRequest {
  problem_id: string;
  answer: string;
  time_spent_seconds?: number;
}

export interface ProblemSubmitResponse {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  masteryDelta: number;
  newMasteryLevel: number;
}

// Progress
export interface ProgressSummary {
  allMastery: StudentMastery[];
  totalTimeMinutes: number;
  averageMastery: number;
  conceptsStarted: number;
  conceptsMastered: number;
  currentStreak: number;
  longestStreak: number;
}

// Learning Path
export interface LearningPathWithConcepts extends LearningPath {
  concepts: Concept[];
  nextConcept: ConceptWithMastery | null;
}

// Insights
export interface InsightsSummary {
  insights: StudentInsight[];
  byType: {
    misconceptions: StudentInsight[];
    strengths: StudentInsight[];
    learningStyle: StudentInsight[];
    strugglePatterns: StudentInsight[];
  };
}
