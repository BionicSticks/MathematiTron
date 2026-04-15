-- =============================================================================
-- Static Problem Bank — pre-generated problems for free tier + API fallback
-- =============================================================================

CREATE TABLE static_problem_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_id TEXT NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  problem_text TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  explanation TEXT NOT NULL,
  hints TEXT[] NOT NULL DEFAULT '{}',
  difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 10),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'ai_batch', 'ai_realtime')),
  quality_score INTEGER DEFAULT 5 CHECK (quality_score BETWEEN 1 AND 10)
);

-- Index for fast lookups by concept + difficulty
CREATE INDEX idx_static_problems_concept ON static_problem_bank(concept_id);
CREATE INDEX idx_static_problems_concept_difficulty ON static_problem_bank(concept_id, difficulty);

-- RLS: public read (problems are not user-specific), admin write
ALTER TABLE static_problem_bank ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read static problems"
  ON static_problem_bank FOR SELECT
  USING (true);

-- Add subscription_tier to profiles for free/paid gating
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free'
  CHECK (subscription_tier IN ('free', 'student', 'family'));
