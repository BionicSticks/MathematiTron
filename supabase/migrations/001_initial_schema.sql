-- =============================================================================
-- MathPath AI - Initial Schema
-- =============================================================================

-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  onboarding_status TEXT DEFAULT 'new' NOT NULL
    CHECK (onboarding_status IN ('new', 'goal_set', 'diagnostic_started', 'diagnostic_complete', 'active')),
  timezone TEXT DEFAULT 'UTC'
);

-- Student goals
CREATE TABLE student_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  goal_type TEXT NOT NULL
    CHECK (goal_type IN ('sat_math', 'act_math', 'gcse_math', 'a_level_math', 'learn_topic', 'grade_level', 'custom')),
  goal_description TEXT,
  target_date DATE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- Concepts (seeded, read-only at runtime)
CREATE TABLE concepts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 10),
  estimated_minutes INTEGER DEFAULT 30 NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL
);

-- Concept prerequisites (directed edges)
CREATE TABLE concept_prerequisites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id TEXT NOT NULL REFERENCES concepts(id),
  prerequisite_id TEXT NOT NULL REFERENCES concepts(id),
  strength INTEGER DEFAULT 5 NOT NULL CHECK (strength BETWEEN 1 AND 10),
  UNIQUE(concept_id, prerequisite_id)
);

-- Student mastery per concept
CREATE TABLE student_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  concept_id TEXT NOT NULL REFERENCES concepts(id),
  mastery_level REAL DEFAULT 0 NOT NULL CHECK (mastery_level BETWEEN 0 AND 100),
  confidence REAL DEFAULT 0 NOT NULL CHECK (confidence BETWEEN 0 AND 100),
  total_attempts INTEGER DEFAULT 0 NOT NULL,
  correct_attempts INTEGER DEFAULT 0 NOT NULL,
  total_time_seconds INTEGER DEFAULT 0 NOT NULL,
  first_seen_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  last_practiced_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, concept_id)
);

-- Learning paths
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  goal_id UUID REFERENCES student_goals(id),
  ordered_concept_ids TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- Student insights (what AI has learned about the student)
CREATE TABLE student_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  concept_id TEXT REFERENCES concepts(id),
  insight_type TEXT NOT NULL
    CHECK (insight_type IN ('misconception', 'strength', 'learning_style', 'struggle_pattern')),
  content TEXT NOT NULL,
  source_message_id UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL
);

-- Conversations (tutoring sessions)
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  conversation_type TEXT DEFAULT 'tutoring' NOT NULL
    CHECK (conversation_type IN ('tutoring', 'diagnostic', 'practice', 'review')),
  primary_concept_id TEXT REFERENCES concepts(id),
  started_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  last_message_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  is_archived BOOLEAN DEFAULT false NOT NULL,
  metadata JSONB DEFAULT '{}' NOT NULL
);

-- Messages within conversations
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  concept_id TEXT REFERENCES concepts(id),
  message_type TEXT DEFAULT 'chat' NOT NULL
    CHECK (message_type IN ('chat', 'exercise', 'hint', 'explanation', 'feedback', 'diagnostic_question')),
  metadata JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  token_count INTEGER
);

-- Practice sessions
CREATE TABLE practice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id),
  concept_id TEXT NOT NULL REFERENCES concepts(id),
  started_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  completed_at TIMESTAMPTZ,
  problems_attempted INTEGER DEFAULT 0 NOT NULL,
  problems_correct INTEGER DEFAULT 0 NOT NULL
);

-- Practice problems
CREATE TABLE practice_problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_id UUID REFERENCES practice_sessions(id),
  concept_id TEXT NOT NULL REFERENCES concepts(id),
  problem_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  hints TEXT[],
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 10),
  user_answer TEXT,
  is_correct BOOLEAN,
  time_spent_seconds INTEGER,
  attempted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Daily activity tracking
CREATE TABLE daily_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL,
  total_time_seconds INTEGER DEFAULT 0 NOT NULL,
  problems_attempted INTEGER DEFAULT 0 NOT NULL,
  problems_correct INTEGER DEFAULT 0 NOT NULL,
  messages_sent INTEGER DEFAULT 0 NOT NULL,
  concepts_touched TEXT[],
  UNIQUE(user_id, activity_date)
);

-- =============================================================================
-- Indexes
-- =============================================================================

CREATE INDEX idx_student_mastery_user ON student_mastery(user_id);
CREATE INDEX idx_student_mastery_concept ON student_mastery(concept_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at);
CREATE INDEX idx_conversations_user ON conversations(user_id, last_message_at DESC);
CREATE INDEX idx_practice_problems_user_concept ON practice_problems(user_id, concept_id);
CREATE INDEX idx_daily_activity_user_date ON daily_activity(user_id, activity_date DESC);
CREATE INDEX idx_student_insights_user ON student_insights(user_id, concept_id);
CREATE INDEX idx_student_goals_user ON student_goals(user_id, is_active);
CREATE INDEX idx_learning_paths_user ON learning_paths(user_id, is_active);
CREATE INDEX idx_concepts_category ON concepts(category);

-- =============================================================================
-- Row Level Security
-- =============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE concept_prerequisites ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Student goals: users own their goals
CREATE POLICY "Users can manage own goals" ON student_goals FOR ALL USING (auth.uid() = user_id);

-- Concepts: public read access
CREATE POLICY "Anyone can read concepts" ON concepts FOR SELECT USING (true);

-- Concept prerequisites: public read access
CREATE POLICY "Anyone can read prerequisites" ON concept_prerequisites FOR SELECT USING (true);

-- Student mastery: users own their mastery data
CREATE POLICY "Users can manage own mastery" ON student_mastery FOR ALL USING (auth.uid() = user_id);

-- Learning paths: users own their paths
CREATE POLICY "Users can manage own learning paths" ON learning_paths FOR ALL USING (auth.uid() = user_id);

-- Student insights: users own their insights
CREATE POLICY "Users can manage own insights" ON student_insights FOR ALL USING (auth.uid() = user_id);

-- Conversations: users own their conversations
CREATE POLICY "Users can manage own conversations" ON conversations FOR ALL USING (auth.uid() = user_id);

-- Messages: users can access messages in their conversations
CREATE POLICY "Users can manage messages in own conversations" ON messages FOR ALL
  USING (conversation_id IN (SELECT id FROM conversations WHERE user_id = auth.uid()));

-- Practice sessions: users own their sessions
CREATE POLICY "Users can manage own practice sessions" ON practice_sessions FOR ALL USING (auth.uid() = user_id);

-- Practice problems: users own their problems
CREATE POLICY "Users can manage own practice problems" ON practice_problems FOR ALL USING (auth.uid() = user_id);

-- Daily activity: users own their activity
CREATE POLICY "Users can manage own daily activity" ON daily_activity FOR ALL USING (auth.uid() = user_id);

-- =============================================================================
-- Triggers
-- =============================================================================

-- Auto-create profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
