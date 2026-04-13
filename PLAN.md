# MathematiTron — Implementation Plan

## What This Is

MathematiTron is a personalised AI math tutor. Not a content platform — there are no pre-built lessons. The AI IS the tutor. It knows the full landscape of mathematics (111 concepts from pre-algebra through topology) and teaches each student individually, generating explanations, exercises, and feedback in real-time based on their progress and goals.

The killer differentiator vs ChatGPT: **persistent memory**. Mastery per concept, identified misconceptions, learning style observations, goal-oriented pacing — all tracked across sessions and injected into every AI interaction. The tutor gets better the more you use it.

**Repo:** https://github.com/BionicSticks/MathematiTron
**Old codebase (reference only):** `/Users/marc/Documents/OwnProjects/AITutorMath/`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, Tailwind CSS 4, Wouter (routing), TanStack Query |
| Backend | Express 5, TypeScript |
| Database | Supabase (PostgreSQL + Auth + RLS) — direct client, no ORM |
| AI | Claude Sonnet via Anthropic SDK |
| Math rendering | KaTeX via react-markdown + rehype-katex + remark-math |
| Streaming | SSE (Server-Sent Events) |
| Concept map | ReactFlow |
| Charts | Recharts |
| Animation | Framer Motion |
| Forms | react-hook-form + zod |
| Icons | Lucide React |

---

## Database Schema (14 tables)

All implemented in `supabase/migrations/001_initial_schema.sql`. Seeded via `supabase/seed.sql`.

**Auth & Users:**
- `profiles` — extends Supabase auth.users: display_name, avatar_url, onboarding_status (new → goal_set → diagnostic_started → diagnostic_complete → active), timezone
- `student_goals` — goal_type (sat_math, act_math, gcse_math, a_level_math, learn_topic, grade_level, custom), goal_description, target_date, is_active

**Curriculum (seeded, read-only):**
- `concepts` — 111 rows: text id (e.g. 'alg-01'), name, description, category (15 categories), difficulty (1-10), estimated_minutes, display_order
- `concept_prerequisites` — 101 directed edges: concept_id → prerequisite_id, strength (1-10)

**Student Progress:**
- `student_mastery` — per-user per-concept: mastery_level (0-100), confidence (0-100), total_attempts, correct_attempts, total_time_seconds, timestamps
- `learning_paths` — AI-generated ordered list of concept IDs per student, tied to active goal
- `student_insights` — what AI has learned about student: type (misconception/strength/learning_style/struggle_pattern), content, linked to concept and source message

**Chat / Tutoring:**
- `conversations` — type (tutoring/diagnostic/practice/review), primary_concept_id, title, metadata (includes summary for long conversations)
- `messages` — role (user/assistant/system), content, concept_id, message_type (chat/exercise/hint/explanation/feedback/diagnostic_question), metadata, token_count

**Practice:**
- `practice_sessions` — user, concept, conversation link, problems_attempted, problems_correct
- `practice_problems` — problem_text, correct_answer, explanation, hints[], difficulty, user_answer, is_correct, time_spent_seconds

**Activity:**
- `daily_activity` — one row per user per day: total_time_seconds, problems_attempted/correct, messages_sent, concepts_touched

All user-facing tables have RLS: `auth.uid() = user_id`. Concepts/prerequisites are public read-only. Auto-profile creation trigger on auth.users insert.

---

## AI Tutor Design

### System Prompt: 5 Layers

Every Claude API call builds a system prompt from:

1. **Tutor Identity** (static) — patient, Socratic, precise, never gives away answers immediately, uses progressive hints
2. **Student Profile** (per-request) — name, goal, target date, overall mastery, strengths, struggles, learning style (all from DB)
3. **Concept Context** (per-conversation) — current topic, its prerequisites, student's mastery of each prerequisite
4. **Conversation History** — last 20 messages verbatim + summary of older messages
5. **Behavioral Instructions** (per-conversation type) — different prompts for diagnostic, tutoring, practice review

### Server vs AI Responsibility

| Decision | Owner | Why |
|----------|-------|-----|
| How to explain a concept | AI | Teaching is its strength |
| What concept to teach next | Server algorithm | Deterministic, debuggable, respects prerequisite graph |
| When to move on vs drill deeper | AI (guided by mastery data) | Needs pedagogical judgment |
| Problem difficulty | Server (based on mastery) | Consistent difficulty curve |
| Whether answer is correct | Server (fuzzy match) + AI fallback | Exact match first, AI judge for complex expressions |
| Student insights extraction | AI (background) | Pattern recognition across conversations |

### Mastery Update Signals

Weighted, not binary:
- `practice_correct`: +5 (scaled by difficulty)
- `practice_incorrect`: -3
- `practice_correct_with_hints`: +2
- `diagnostic_correct`: +15
- `demonstrated_in_chat`: +3 (AI detected correct application)
- `time_decay`: -2 (14+ days without practice)

### Answer Validation Pipeline

1. Exact match (normalized: trim, lowercase, remove spaces)
2. Numeric equivalence (within 0.001)
3. Variant match (AI generates acceptable alternatives when creating problem)
4. AI judge fallback (for expressions, proofs, symbolic answers)

### Context Window Management

- Last 20 messages included verbatim
- Older messages summarized (stored in conversation.metadata)
- Summary regenerated every 30 messages
- Student profile + concept context always included (~500-800 tokens)

### Insight Extraction

Background process every 5th chat message: Claude analyzes recent messages and extracts misconceptions, strengths, learning style observations. Stored in `student_insights`, injected into future system prompts. This is what makes the tutor get better over time.

---

## Frontend Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Landing | Sign-up / sign-in |
| `/onboarding` | Onboarding | Goal setting → diagnostic → learning path preview |
| `/dashboard` | Dashboard | Streak, stats, suggested next concept, recent activity |
| `/map` | Concept Map | Interactive ReactFlow graph with mastery overlay |
| `/chat` | Tutor Chat | New conversation |
| `/chat/:id` | Tutor Chat | Continue existing conversation |
| `/practice` | Practice Mode | Concept selector for practice |
| `/practice/:conceptId` | Practice Mode | Structured exercises for specific concept |
| `/progress` | Progress | Stats, charts, streak calendar, category breakdown |
| `/settings` | Settings | Profile, goals, preferences |

### Key Components

- **Chat:** ChatPanel, MessageBubble, StreamingMessage, ChatInput, ExerciseCard, MathBlock (KaTeX)
- **Concept Map:** ConceptMapView (ReactFlow), ConceptNode (custom node), ConceptDetailPanel (slide-out)
- **Progress:** MasteryRing, StreakCalendar (heatmap), CategoryBreakdown, MasteryTimeline
- **Practice:** ProblemCard, AnswerInput, HintDisplay, SessionSummary
- **Onboarding:** GoalSelector, DiagnosticChat, DiagnosticResults, LearningPathPreview

---

## Project Structure

```
MathematiTron/
├── PLAN.md                                 # This file
├── .env.local                              # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY
├── package.json
├── vite.config.ts
├── tsconfig.json
│
├── supabase/
│   ├── migrations/001_initial_schema.sql   # 14 tables + RLS + triggers
│   └── seed.sql                            # 111 concepts + 101 prerequisites
│
├── src/
│   ├── types/
│   │   ├── database.ts                     # DB entity types
│   │   └── api.ts                          # Request/response types
│   │
│   ├── server/
│   │   ├── index.ts                        # Express setup, Vite middleware
│   │   ├── middleware/
│   │   │   ├── auth.ts                     # JWT validation, requireAuth, optionalAuth
│   │   │   └── errorHandler.ts
│   │   ├── routes/
│   │   │   ├── auth.ts                     # GET /me
│   │   │   ├── curriculum.ts               # /concepts, /prerequisites, /map
│   │   │   ├── dashboard.ts                # Stats, streaks, suggestions
│   │   │   ├── progress.ts                 # Mastery summary, history
│   │   │   ├── conversations.ts            # CRUD + message send
│   │   │   └── onboarding.ts               # Goal setting (+ diagnostic in Phase 4)
│   │   ├── services/
│   │   │   ├── ai/                         # [Phase 3+] Claude integration
│   │   │   ├── mastery/                    # [Phase 5+] Mastery calculation
│   │   │   └── curriculum/
│   │   │       ├── graph.ts                # In-memory concept cache, lookups
│   │   │       └── prerequisites.ts        # Locking logic (60% threshold)
│   │   └── db/
│   │       ├── client.ts                   # supabaseAdmin + supabaseForUser
│   │       └── queries/
│   │           ├── profiles.ts
│   │           ├── mastery.ts
│   │           ├── conversations.ts
│   │           ├── activity.ts
│   │           ├── learningPaths.ts
│   │           ├── insights.ts
│   │           └── practice.ts
│   │
│   └── client/
│       ├── main.tsx
│       ├── App.tsx                         # Router + providers
│       ├── index.css                       # Tailwind
│       ├── lib/
│       │   ├── supabase.ts
│       │   ├── queryClient.ts
│       │   ├── api.ts                      # Fetch wrapper with auth headers
│       │   └── utils.ts
│       ├── hooks/                          # [Phase 2+] Data fetching hooks
│       ├── contexts/
│       │   └── AuthContext.tsx              # Session, profile, goal state
│       ├── components/
│       │   ├── layout/
│       │   │   ├── AppShell.tsx
│       │   │   └── Sidebar.tsx
│       │   ├── chat/                       # [Phase 3]
│       │   ├── concept-map/                # [Phase 2]
│       │   ├── progress/                   # [Phase 6]
│       │   ├── practice/                   # [Phase 5]
│       │   ├── onboarding/                 # [Phase 4]
│       │   └── ui/                         # Shared primitives
│       └── pages/
│           ├── LandingPage.tsx
│           ├── OnboardingPage.tsx
│           ├── DashboardPage.tsx
│           ├── ConceptMapPage.tsx           # [Placeholder → Phase 2]
│           ├── TutorChatPage.tsx            # [Placeholder → Phase 3]
│           ├── PracticeModePage.tsx         # [Placeholder → Phase 5]
│           ├── ProgressPage.tsx             # [Placeholder → Phase 6]
│           ├── SettingsPage.tsx             # [Placeholder → Phase 6]
│           └── NotFoundPage.tsx
```

---

## Implementation Phases

---

### Phase 1: Foundation — COMPLETE

**What was built:**
- Project init: Vite + React 19 + Tailwind 4 + Express 5 + TypeScript
- Supabase setup: PostgreSQL with 14 tables, all RLS policies, auto-profile trigger
- Seed data: 77 concepts across 15 categories, 103 prerequisite edges
- Auth: Supabase email/password, JWT middleware (requireAuth + optionalAuth), AuthContext with session persistence
- Onboarding: Goal selection page (7 types, custom description, optional target date), updates profile status to 'goal_set'
- Dashboard: Stats grid (streak, mastered count, overall mastery %, time this week), 7-day activity, 3 suggested next concepts (from learning path or unlocked), quick action buttons
- Curriculum service: In-memory concept/prerequisite cache loaded at startup, prerequisite checking (60% threshold), category/root concept queries
- Conversation CRUD: Create, list, get (with messages), update (title/archive), message saving (AI response stubbed)
- Progress endpoints: Overall summary, per-concept mastery, activity history with streak calculation
- DB query modules: profiles, mastery, conversations, activity, learningPaths, insights, practice
- UI: LandingPage (split hero + auth form), AppShell with sidebar (6 nav items + user section + sign out), all page shells created as placeholders
- Routing: Wouter with auth gating (unauthenticated → landing, new user → onboarding, active → main app)

**What's NOT built but schema exists for:**
- AI integration (no Claude calls yet)
- Learning path generation (queries exist, no algorithm)
- Insight extraction (table exists, not populated)
- Practice problems (table exists, no generation)
- Daily activity tracking (table exists, not written to)

---

### Phase 2: Concept Map + Progress — COMPLETE

**Goal:** User sees an interactive, navigable concept map with mastery overlay and a MasteryRing component on the dashboard.

**Backend (already done):**
- `GET /api/curriculum/map` — returns all 111 concepts with mastery overlay, locked status, prerequisites per concept, and category list

**Frontend — files to create:**

`src/client/components/concept-map/ConceptNode.tsx`
- Custom ReactFlow node component
- Visual states: mastered (green, filled), in-progress (blue, partial), started (yellow), available (neutral), locked (grey, lock icon)
- Shows: concept name, category badge, mastery % if started
- Mastery progress bar within node
- Click handler (navigate to `/chat?concept=<id>` if unlocked)

`src/client/components/concept-map/ConceptMapView.tsx`
- ReactFlow canvas wrapper
- Fetches from `/api/curriculum/map` via TanStack Query
- Builds nodes (grouped by category, hierarchical positioning) and edges (from prerequisites)
- Edge styling: animated for unlocked paths, grey for locked
- Smooth-step edge type with arrow markers
- Controls: zoom in/out, fit view
- MiniMap for navigation
- Background: dot grid
- `fitView` on initial load

`src/client/components/concept-map/ConceptDetailPanel.tsx`
- Slide-out panel when a concept node is clicked
- Shows: full description, difficulty, estimated time, prerequisites (with their mastery status), dependent concepts
- Action button: "Start Learning" → navigates to `/chat?concept=<id>`
- If locked: shows which prerequisites need work and their current mastery

`src/client/hooks/useConceptMap.ts`
- TanStack Query hook wrapping `/api/curriculum/map`
- Returns concepts, categories, loading/error states

`src/client/components/progress/MasteryRing.tsx`
- Circular progress indicator (SVG)
- Props: value (0-100), size, label
- Animated fill on mount (Framer Motion)
- Used on dashboard and concept detail panel

**Frontend — files to modify:**

`src/client/pages/ConceptMapPage.tsx`
- Replace placeholder with full implementation
- AppShell wrapper
- Legend bar (mastered/in-progress/started/available/locked)
- ConceptMapView (full height, responsive)
- ConceptDetailPanel (conditional render on selection)

`src/client/pages/DashboardPage.tsx`
- Add MasteryRing showing overall mastery % (replace or augment the existing stat card)

**Design reference:**
- Port layout logic from old codebase: `AITutorMath/client/src/pages/concept-map-interactive.tsx`
- Node sizing: min-w-[200px], max-w-[240px]
- Category-based column layout: categories as columns, concepts as rows within
- Horizontal spacing: ~350px between categories, vertical: ~120px between concepts
- Follow design_guidelines.md: no continuous animations, purposeful motion only, 44px min touch targets

**What was built:**
- ConceptNode — custom ReactFlow node with 5 visual states (mastered/in-progress/started/available/locked), mastery progress bar, category label
- ConceptMapView — ReactFlow canvas with category-column layout, prerequisite edges (animated for unlocked, grey for locked), controls, minimap, dot background, fit-to-view
- ConceptDetailPanel — slide-out panel showing description, difficulty, time estimate, prerequisites with mastery %, unlocked concepts, action buttons (Start Learning → chat, Practice)
- useConceptMap — TanStack Query hook for /api/curriculum/map
- MasteryRing — animated SVG circular progress (Framer Motion) with colour thresholds, used on dashboard and detail panel
- ConceptMapPage — full-width layout using Sidebar directly (not AppShell) for edge-to-edge map
- DashboardPage — replaced flat mastery stat card with MasteryRing component

**Result:** User can explore the full 77-concept curriculum as an interactive graph. Nodes show mastery state. Clicking opens detail panel with "Start Learning" action. MasteryRing appears on dashboard.

---

### Phase 2.5: UI Redesign — COMPLETE

**Goal:** Apply "Kinetic Archivist" editorial design system across all pages.

**What was built:**
- Light editorial theme: warm off-white (#fbf9f2) background, white card surfaces with ambient shadows
- Surface tier system: surface-low → surface-mid → surface-high → surface-highest for depth without borders
- "No-Line" rule: all explicit borders removed, replaced by tonal surface shifts and ambient shadows
- Glassmorphism utility classes (glass, glass-strong) for floating panels
- Primary: dark green (#4a7a00), Secondary: cyan (#0090c0) — to be updated to vivid neon (#B6FF00) for buttons/accents in future polish pass
- Typography: Inter with tightened headline tracking (-0.02em), generous body line-height (1.65), h1=2rem h2=1.5rem h3=1.125rem
- Fully rounded CTA buttons with glow-primary shadow effect
- Input fields: surface-tier backgrounds, no borders, ring-glow focus state
- Concept map: white card nodes with ambient shadows on off-white canvas, green edges for unlocked paths
- Sidebar: white card with ambient shadow, surface-tier active states, solid primary avatar badge
- All pages updated: Landing, Onboarding, Dashboard, ConceptMap, ConceptDetailPanel, ConceptNode, MasteryRing, NotFound
- Design file: `DESIGN (1).md` — original dark "Kinetic Archivist" spec from Stitch (used as reference, inverted to light)

---

### Phase 3: AI Tutor Chat (THE CORE) — COMPLETE

**Goal:** User can have real-time conversations with Claude as their math tutor. Messages stream via SSE, math renders with KaTeX, conversations persist across sessions.

**Backend — files to create:**

`src/server/services/ai/client.ts`
- Anthropic SDK setup
- Single Claude Sonnet client, shared across services
- Rate limiting / error handling wrapper

`src/server/services/ai/systemPrompt.ts`
- Builds the 5-layer system prompt per request:
  1. Tutor identity (static string)
  2. Student profile (from DB: name, goal, target date, overall mastery, strengths, struggles, learning style)
  3. Concept context (current topic, prerequisites, student's mastery of each)
  4. Conversation history (last 20 messages verbatim + summary of older)
  5. Behavioral instructions (varies by conversation type: tutoring/diagnostic/practice/review)

`src/server/services/ai/tutor.ts`
- `streamTutorResponse(conversation, userMessage, studentProfile, conceptContext)` → SSE stream
- Calls Claude with assembled system prompt + message history
- Streams response chunks as SSE events (`delta`, `done`, `error`)
- Saves complete assistant message to DB after stream ends
- Tracks token usage in message metadata

`src/server/services/ai/contextManager.ts`
- Manages conversation context window
- Includes last 20 messages verbatim
- Summarizes older messages (stored in conversation.metadata.summary)
- Triggers re-summarization every 30 messages
- Always keeps student profile + concept context (~500-800 tokens)

**Backend — files to modify:**

`src/server/routes/conversations.ts`
- Replace stub in `POST /:id/messages` with real SSE streaming
- Set headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`
- Pipe Claude stream to response
- Save assistant message on stream completion
- Update conversation.last_message_at

`src/server/index.ts`
- No changes needed (route already mounted)

**Frontend — files to create:**

`src/client/hooks/useStreaming.ts`
- SSE consumption hook
- Manages EventSource connection to `POST /:id/messages`
- Accumulates streamed text chunks
- Returns: streamedText, isStreaming, error
- Handles reconnection / cleanup

`src/client/hooks/useChat.ts`
- Conversation management hook
- Create conversation, send message, load history
- Integrates useStreaming for live responses
- Optimistic UI updates (show user message immediately)

`src/client/components/chat/ChatPanel.tsx`
- Main chat interface
- Message list with auto-scroll
- Renders message history + streaming message
- Empty state: "Start by asking a question about [concept]"

`src/client/components/chat/MessageBubble.tsx`
- Individual message display
- Different styling for user vs assistant
- Renders content through MathBlock for LaTeX support
- Timestamp, role indicator

`src/client/components/chat/StreamingMessage.tsx`
- Displays in-progress assistant response
- Typing indicator while waiting
- Progressive text reveal as chunks arrive
- Renders through MathBlock

`src/client/components/chat/ChatInput.tsx`
- Text input with send button
- Shift+Enter for newlines, Enter to send
- Disabled while streaming
- Character count / limit indicator

`src/client/components/chat/MathBlock.tsx`
- Wraps react-markdown with remark-math + rehype-katex
- Renders inline `$...$` and block `$$...$$` LaTeX
- Fallback for malformed LaTeX (show raw text, don't crash)

**Frontend — files to modify:**

`src/client/pages/TutorChatPage.tsx`
- Replace placeholder with full implementation
- Layout: conversation sidebar (list) + main chat panel
- Route param `:id` loads existing conversation
- Query param `?concept=<id>` starts new conversation for that concept
- New conversation button

**Result:** User can chat with the AI tutor. Messages stream in real-time with KaTeX math rendering. Conversations are listed in sidebar and persist across sessions. Context is managed to keep conversations coherent over long sessions.

**What was built:**
- AI client: Anthropic SDK setup with Claude Sonnet, shared client instance
- 5-layer system prompt: tutor identity (Socratic, progressive hints, LaTeX) + student profile (name, goal, mastery, insights) + concept context (topic, prerequisites, mastery) + conversation summary + behavioral instructions per type (tutoring/diagnostic/practice/review)
- Context manager: last 20 messages verbatim, older messages summarised every 30 messages, summary stored in conversation.metadata
- Streaming tutor: SSE streaming from Claude → browser, saves complete assistant message to DB on stream end, tracks token usage
- Conversations route: POST /:id/messages now streams real AI responses via SSE (replaced Phase 1 stub)
- SSE parser: updated client-side apiStream() to handle named SSE events (event: delta/done/error)
- Chat hooks: useChat() — conversation CRUD, message sending, streaming state, optimistic UI updates, abort support
- Chat components: ChatPanel (message list + auto-scroll + empty state), MessageBubble (user/assistant styling with avatars), StreamingMessage (typing indicator + progressive reveal), ChatInput (auto-resize textarea, Enter to send, Shift+Enter for newlines), MathBlock (react-markdown + remark-math + rehype-katex for LaTeX)
- TutorChatPage: full implementation with conversation sidebar (list + new chat button), main chat area, concept-linked conversations via ?concept= query param
- Blocked on: Anthropic API credits (separate from Claude subscription) — need to add credits at console.anthropic.com before chat works end-to-end

---

### Phase 4: Onboarding + Diagnostic

**Goal:** New users complete a diagnostic conversation with the AI to assess their starting level, then see a personalised learning path.

**Backend — files to create:**

`src/server/services/ai/diagnostic.ts`
- Specialized diagnostic prompt: asks targeted questions across difficulty levels to map student's knowledge
- Starts broad (what topics are familiar?), then drills into specific concepts
- Generates initial mastery estimates from responses
- Produces a diagnostic summary

`src/server/services/mastery/pathGenerator.ts`
- Takes student goal + diagnostic results
- Generates ordered concept sequence respecting prerequisites
- Prioritises concepts needed for the goal
- Skips concepts already mastered
- Saves to `learning_paths` table

**Backend — files to modify:**

`src/server/routes/onboarding.ts`
- Add `POST /diagnostic/start` — creates diagnostic conversation, returns first AI question
- Add `POST /diagnostic/respond` — sends student answer, gets next question (SSE)
- Add `POST /diagnostic/complete` — AI analyzes all responses, generates mastery estimates, creates learning path, updates profile status to 'diagnostic_complete' then 'active'

**Frontend — files to create:**

`src/client/components/onboarding/DiagnosticChat.tsx`
- Chat interface for diagnostic conversation
- Progress indicator (e.g. "Question 3 of ~8")
- Uses streaming like TutorChat but with diagnostic-specific UI
- "I'm not sure / Skip" option for each question

`src/client/components/onboarding/DiagnosticResults.tsx`
- Visual summary of diagnostic findings
- Category-by-category mastery estimate
- Strengths highlighted, gaps identified

`src/client/components/onboarding/LearningPathPreview.tsx`
- Shows the generated learning path as an ordered list
- Estimated time to goal
- "Looks good, let's start" / "Adjust" actions

**Frontend — files to modify:**

`src/client/pages/OnboardingPage.tsx`
- Extend from single-step (goal selection) to multi-step flow:
  1. Goal selection (existing)
  2. Diagnostic chat (new)
  3. Results + learning path preview (new)
  4. Redirect to dashboard

`src/client/App.tsx`
- Update onboarding routing to handle diagnostic_started and diagnostic_complete statuses

**Result:** New users: set goal → diagnostic chat with AI → see their strengths/gaps → get a personalised learning path → start learning.

---

### Phase 5: Practice Mode + Mastery

**Goal:** Structured practice with AI-generated problems, progressive hints, answer validation, and real mastery tracking that feeds back into the system.

**Backend — files to create:**

`src/server/services/ai/problemGenerator.ts`
- Generates practice problems via Claude for a given concept + difficulty
- Returns: problem_text (with LaTeX), correct_answer, explanation, hints[] (progressive, 3 levels), difficulty
- Difficulty scaled by student's current mastery of the concept

`src/server/services/ai/answerChecker.ts`
- Answer validation pipeline:
  1. Exact match (normalized)
  2. Numeric equivalence (within 0.001)
  3. AI judge fallback (for expressions, proofs, symbolic answers)
- Returns: isCorrect, explanation of why correct/incorrect

`src/server/services/mastery/calculator.ts`
- Mastery update algorithm using weighted signals
- Updates `student_mastery` table
- Accounts for difficulty, hints used, time taken
- Applies time decay for concepts not practiced in 14+ days

`src/server/services/ai/insightExtractor.ts`
- Background process triggered every 5th chat message
- Claude analyzes recent messages and extracts: misconceptions, strengths, learning style, struggle patterns
- Stores in `student_insights` table
- Deduplicates against existing insights

`src/server/services/mastery/nextConcept.ts`
- "What to work on next" algorithm
- Considers: learning path order, prerequisites met, time since last practice, mastery decay
- Returns ranked list of suggested concepts

**Backend — files to create:**

`src/server/routes/practice.ts`
- `POST /sessions` — start practice session for a concept
- `POST /sessions/:id/generate` — generate next problem
- `POST /sessions/:id/submit` — submit answer, get validation + mastery update
- `POST /sessions/:id/hint` — get next hint for current problem
- `PATCH /sessions/:id/complete` — end session, return summary

**Backend — files to modify:**

`src/server/index.ts`
- Mount practice routes

`src/server/routes/conversations.ts`
- After saving assistant message, trigger insight extraction every 5th message

**Frontend — files to create:**

`src/client/hooks/usePractice.ts`
- Practice session management
- Start session, get problem, submit answer, request hint, complete session

`src/client/components/practice/ProblemCard.tsx`
- Displays problem text (with KaTeX rendering)
- Difficulty indicator
- Problem counter ("3 of 10")

`src/client/components/practice/AnswerInput.tsx`
- Text input for answers
- Submit button
- Visual feedback: green pulse for correct, red shake for incorrect

`src/client/components/practice/HintDisplay.tsx`
- Progressive hint reveal (hint 1, then 2, then 3)
- Each hint click reveals next level
- Hints rendered with KaTeX support

`src/client/components/practice/SessionSummary.tsx`
- End-of-session summary
- Problems attempted/correct, mastery change, time spent
- "Continue practicing" or "Try another concept" actions

**Frontend — files to modify:**

`src/client/pages/PracticeModePage.tsx`
- Replace placeholder with full implementation
- Without `:conceptId`: concept picker (grid of unlocked concepts with mastery indicators)
- With `:conceptId`: active practice session (ProblemCard + AnswerInput + HintDisplay)
- Session summary on completion

**Frontend — files to modify:**

`src/client/pages/DashboardPage.tsx`
- Suggested concepts now link to `/practice/:conceptId` as well as `/chat?concept=:id`

**Result:** Structured practice with AI-generated problems at appropriate difficulty. Progressive hints. Real answer validation. Mastery updates that propagate to concept map, dashboard, and future AI interactions.

---

### Phase 6: Progress, Insights, Polish

**Goal:** Detailed progress visualisation, daily activity tracking, insight display, settings page, and responsive polish across the entire app.

**Backend — files to create/modify:**

`src/server/middleware/activityTracker.ts`
- Middleware that updates `daily_activity` table on relevant API calls
- Increments: messages_sent (on message save), problems_attempted/correct (on practice submit), total_time (estimated from session duration), concepts_touched

`src/server/routes/insights.ts`
- `GET /` — returns all active insights grouped by type
- `DELETE /:id` — dismiss/deactivate an insight

**Backend — files to modify:**

`src/server/index.ts`
- Mount insights routes
- Apply activity tracking middleware to conversation and practice routes

**Frontend — files to create:**

`src/client/components/progress/StreakCalendar.tsx`
- GitHub-style heatmap calendar showing daily practice activity
- 90-day view
- Colour intensity = activity level
- Tooltip on hover: date, time spent, problems solved

`src/client/components/progress/CategoryBreakdown.tsx`
- Bar chart (Recharts) showing mastery by category
- 15 categories, sorted by mastery level
- Colour-coded: mastered (green), in-progress (blue), not started (grey)

`src/client/components/progress/MasteryTimeline.tsx`
- Line chart (Recharts) showing overall mastery over time
- Derived from mastery update timestamps
- Zoomable time range (1 week, 1 month, 3 months, all time)

`src/client/hooks/useProgress.ts`
- TanStack Query hooks for progress endpoints
- Activity history, mastery summary, per-concept data

`src/client/hooks/useInsights.ts`
- Fetch and manage student insights

**Frontend — files to modify:**

`src/client/pages/ProgressPage.tsx`
- Replace placeholder with full implementation
- Layout: stats summary at top (reuse StatCard pattern from dashboard)
- StreakCalendar
- MasteryRing (overall)
- CategoryBreakdown chart
- MasteryTimeline chart
- Per-concept mastery table (sortable, filterable)

`src/client/pages/SettingsPage.tsx`
- Replace placeholder with:
  - Profile editing (display name, avatar)
  - Active goal display + ability to change goal
  - Timezone setting
  - Sign out

`src/client/pages/DashboardPage.tsx`
- Add insights summary card ("Your tutor noticed...")
- Add streak calendar mini-view (last 7 days)

`src/client/components/layout/Sidebar.tsx`
- Add streak indicator next to user name
- Mobile responsive: hamburger menu collapse

**Responsive polish:**
- Mobile (< 768px): sidebar collapses to hamburger, concept map switches to scrollable list, dashboard cards stack single column
- Tablet (768-1024px): sidebar narrower (240px), 2-column dashboard
- Desktop (> 1024px): full sidebar, 3-column dashboard, side-by-side layouts

**Loading/empty/error states across all pages:**
- Skeleton loaders for data fetching
- Empty states with helpful CTAs ("No conversations yet — start one!")
- Error boundaries with retry actions

**Result:** Complete application. Full progress visualisation, daily activity tracking, AI-generated insights displayed to user, responsive across all devices, polished loading/error/empty states.

---

## Verification Plan

After each phase:

1. Manual walkthrough of the new user flow up to that point
2. Verify Supabase auth works (sign up, log in, log out, JWT validation)
3. Verify API endpoints return correct data
4. Verify concept map renders with correct mastery states
5. Verify chat streams properly and messages persist across page refreshes
6. Verify mastery updates propagate to concept map and dashboard
7. Verify onboarding flow completes and learning path generates

Key integration tests:
- Full onboarding → diagnostic → first lesson flow
- Practice session → mastery update → concept map reflects change
- Long conversation → context summarization → continued coherence
- Answer validation: exact match, numeric equivalence, AI judge fallback

---

## Reference Material

- **Old codebase concept map:** `AITutorMath/client/src/pages/concept-map-interactive.tsx` — ReactFlow patterns, node layout, status colours
- **Design guidelines:** `AITutorMath/design_guidelines.md` — typography (Inter), spacing, component specs, responsive breakpoints, animation principles
- **Architecture plan (original):** `AITutorMath/plan/architecture.md` — the plan that started this rebuild
