// Core database types matching Supabase schema

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  onboarding_status: 'new' | 'goal_set' | 'diagnostic_started' | 'diagnostic_complete' | 'active';
  timezone: string;
}

export interface StudentGoal {
  id: string;
  user_id: string;
  goal_type: 'sat_math' | 'act_math' | 'gcse_math' | 'a_level_math' | 'learn_topic' | 'grade_level' | 'custom';
  goal_description: string | null;
  target_date: string | null;
  created_at: string;
  is_active: boolean;
}

export interface Concept {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: number;
  estimated_minutes: number;
  display_order: number;
}

export interface ConceptPrerequisite {
  id: string;
  concept_id: string;
  prerequisite_id: string;
  strength: number;
}

export interface StudentMastery {
  id: string;
  user_id: string;
  concept_id: string;
  mastery_level: number;
  confidence: number;
  total_attempts: number;
  correct_attempts: number;
  total_time_seconds: number;
  first_seen_at: string;
  last_practiced_at: string | null;
  updated_at: string;
}

export interface LearningPath {
  id: string;
  user_id: string;
  goal_id: string | null;
  ordered_concept_ids: string[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface StudentInsight {
  id: string;
  user_id: string;
  concept_id: string | null;
  insight_type: 'misconception' | 'strength' | 'learning_style' | 'struggle_pattern';
  content: string;
  source_message_id: string | null;
  created_at: string;
  is_active: boolean;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string | null;
  conversation_type: 'tutoring' | 'diagnostic' | 'practice' | 'review';
  primary_concept_id: string | null;
  started_at: string;
  last_message_at: string;
  is_archived: boolean;
  metadata: Record<string, unknown>;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  concept_id: string | null;
  message_type: 'chat' | 'exercise' | 'hint' | 'explanation' | 'feedback' | 'diagnostic_question';
  metadata: Record<string, unknown>;
  created_at: string;
  token_count: number | null;
}

export interface PracticeSession {
  id: string;
  user_id: string;
  conversation_id: string | null;
  concept_id: string;
  started_at: string;
  completed_at: string | null;
  problems_attempted: number;
  problems_correct: number;
}

export interface PracticeProblem {
  id: string;
  user_id: string;
  session_id: string | null;
  concept_id: string;
  problem_text: string;
  correct_answer: string;
  explanation: string | null;
  hints: string[] | null;
  difficulty: number | null;
  user_answer: string | null;
  is_correct: boolean | null;
  time_spent_seconds: number | null;
  attempted_at: string | null;
  created_at: string;
}

export interface DailyActivity {
  id: string;
  user_id: string;
  activity_date: string;
  total_time_seconds: number;
  problems_attempted: number;
  problems_correct: number;
  messages_sent: number;
  concepts_touched: string[] | null;
}
