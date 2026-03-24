# MathematiTron

A personalised AI math tutor that adapts to each student's pace, goals, and learning style. Built with Claude as the core tutoring engine.

## What it does

MathematiTron is not a content platform — it's an AI tutor. There's no pre-built lesson library. Instead, the app knows the full landscape of mathematics (111 concepts from pre-algebra through topology) and teaches each student individually, generating explanations, exercises, and feedback in real-time based on their progress and goals.

**Why this exists (and ChatGPT doesn't cut it):**
- Persistent memory of student progress across sessions
- Structured mastery tracking per concept
- Goal-oriented pacing (e.g. "prep for A-Levels by June")
- Pattern recognition in student mistakes over time
- Prerequisite-aware curriculum — won't teach calculus if algebra isn't solid

## Features

- **Adaptive AI tutoring** — Claude-powered tutor that adjusts explanations to the student's level
- **Interactive concept map** — 111 mathematical concepts with prerequisite graph visualisation
- **Diagnostic assessment** — AI-driven conversation to figure out where the student is
- **Structured practice** — Generated exercises with progressive hints and answer validation
- **Student insights** — AI identifies misconceptions, strengths, and learning style over time
- **Goal setting** — Set targets (SAT prep, learn calculus, catch up to grade level, etc.) with optional deadlines
- **Progress tracking** — Per-concept mastery, streaks, activity history

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, ReactFlow, TanStack Query
- **Backend:** Express, TypeScript
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **AI:** Claude API (Anthropic SDK)
- **Math rendering:** KaTeX via react-markdown + rehype-katex

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- An [Anthropic API key](https://console.anthropic.com)

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/MathematiTron.git
   cd MathematiTron
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your environment file:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase URL, anon key, service role key, and Anthropic API key.

4. Set up the database — run the following in your Supabase SQL editor:
   - `supabase/migrations/001_initial_schema.sql` (creates tables, indexes, RLS policies)
   - `supabase/seed.sql` (seeds 111 math concepts and prerequisite graph)

5. Start the dev server:
   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000`

## Project Structure

```
src/
├── types/          # Shared TypeScript types (database, API)
├── server/
│   ├── middleware/  # Auth, error handling
│   ├── routes/     # API endpoints
│   ├── services/
│   │   ├── ai/         # Claude integration, system prompts, answer checking
│   │   ├── mastery/    # Mastery calculation, learning path generation
│   │   └── curriculum/ # In-memory concept graph
│   └── db/         # Supabase client and query modules
└── client/
    ├── components/ # UI components (layout, chat, concept map, etc.)
    ├── contexts/   # Auth state
    ├── hooks/      # Data fetching hooks
    ├── lib/        # Supabase client, API helpers, utilities
    └── pages/      # Route pages
```

## Curriculum

111 concepts across 15 categories, connected by 101 prerequisite relationships:

Pre-Algebra · Algebra · Geometry · Trigonometry · Calculus · Linear Algebra · Multivariable Calculus · Differential Equations · Real Analysis · Abstract Algebra · Complex Analysis · Number Theory · Discrete Mathematics · Topology · Probability & Statistics

## License

MIT
