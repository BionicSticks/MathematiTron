import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { StudentMastery } from '../../../types/database';

interface CategoryBreakdownProps {
  mastery: StudentMastery[];
  concepts: Array<{ id: string; category: string; name: string }>;
}

const CATEGORY_LABELS: Record<string, string> = {
  'pre-algebra': 'Pre-Algebra',
  'algebra': 'Algebra',
  'geometry': 'Geometry',
  'trigonometry': 'Trigonometry',
  'precalculus': 'Pre-Calculus',
  'calculus': 'Calculus',
  'statistics': 'Statistics',
  'probability': 'Probability',
  'linear-algebra': 'Linear Algebra',
  'discrete-math': 'Discrete Math',
  'number-theory': 'Number Theory',
  'differential-equations': 'Diff. Equations',
  'abstract-algebra': 'Abstract Algebra',
  'real-analysis': 'Real Analysis',
  'topology': 'Topology',
};

export function CategoryBreakdown({ mastery, concepts }: CategoryBreakdownProps) {
  const data = useMemo(() => {
    const masteryMap = new Map(mastery.map(m => [m.concept_id, m]));

    // Group concepts by category
    const categories = new Map<string, { total: number; masterySum: number; started: number }>();
    for (const concept of concepts) {
      const cat = concept.category;
      if (!categories.has(cat)) {
        categories.set(cat, { total: 0, masterySum: 0, started: 0 });
      }
      const entry = categories.get(cat)!;
      entry.total++;
      const m = masteryMap.get(concept.id);
      if (m && m.total_attempts > 0) {
        entry.masterySum += m.mastery_level;
        entry.started++;
      }
    }

    return Array.from(categories.entries())
      .map(([category, { total, masterySum, started }]) => ({
        category: CATEGORY_LABELS[category] ?? category,
        mastery: started > 0 ? Math.round(masterySum / total) : 0,
        started,
        total,
      }))
      .sort((a, b) => b.mastery - a.mastery);
  }, [mastery, concepts]);

  function getBarColor(value: number) {
    if (value >= 80) return '#B6FF00';  // primary neon
    if (value >= 40) return '#00C2FF';  // secondary cyan
    return '#d4d0c5';                    // surface-highest (not started)
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(data.length * 40, 200)}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
        <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} fontSize={12} />
        <YAxis
          type="category"
          dataKey="category"
          width={110}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const item = payload[0].payload;
            return (
              <div className="rounded-xl bg-card shadow-ambient px-4 py-2.5 text-sm">
                <p className="font-semibold">{item.category}</p>
                <p className="text-muted-foreground">
                  {item.mastery}% avg mastery &middot; {item.started}/{item.total} concepts started
                </p>
              </div>
            );
          }}
        />
        <Bar dataKey="mastery" radius={[0, 6, 6, 0]} barSize={20}>
          {data.map((entry, i) => (
            <Cell key={i} fill={getBarColor(entry.mastery)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
