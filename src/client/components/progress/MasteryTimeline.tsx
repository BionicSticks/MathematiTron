import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { StudentMastery } from '../../../types/database';

interface MasteryTimelineProps {
  mastery: StudentMastery[];
}

type TimeRange = '1w' | '1m' | '3m' | 'all';

export function MasteryTimeline({ mastery }: MasteryTimelineProps) {
  const [range, setRange] = useState<TimeRange>('1m');

  const data = useMemo(() => {
    // Build daily snapshots from mastery update timestamps
    const updates = mastery
      .filter(m => m.total_attempts > 0)
      .map(m => ({
        date: m.last_practiced_at ?? m.first_seen_at,
        mastery_level: m.mastery_level,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (updates.length === 0) return [];

    // Group by date, take average mastery across all concepts at each date
    const byDate = new Map<string, number[]>();
    for (const u of updates) {
      const dateKey = new Date(u.date).toISOString().split('T')[0];
      if (!byDate.has(dateKey)) byDate.set(dateKey, []);
      byDate.get(dateKey)!.push(u.mastery_level);
    }

    // Filter by time range
    const now = Date.now();
    const rangeMs: Record<TimeRange, number> = {
      '1w': 7 * 86400000,
      '1m': 30 * 86400000,
      '3m': 90 * 86400000,
      'all': Infinity,
    };
    const cutoff = now - rangeMs[range];

    return Array.from(byDate.entries())
      .filter(([date]) => new Date(date).getTime() >= cutoff)
      .map(([date, levels]) => ({
        date,
        mastery: Math.round(levels.reduce((a, b) => a + b, 0) / levels.length),
      }));
  }, [mastery, range]);

  const ranges: Array<{ key: TimeRange; label: string }> = [
    { key: '1w', label: '1W' },
    { key: '1m', label: '1M' },
    { key: '3m', label: '3M' },
    { key: 'all', label: 'All' },
  ];

  return (
    <div>
      {/* Range selector */}
      <div className="flex gap-1 mb-4">
        {ranges.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setRange(key)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              range === key
                ? 'bg-primary text-primary-foreground'
                : 'surface-low text-muted-foreground hover:surface-mid'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
          No mastery data in this period
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ left: 0, right: 16, top: 8, bottom: 8 }}>
            <XAxis
              dataKey="date"
              fontSize={11}
              tickFormatter={d => new Date(d).toLocaleDateString('default', { month: 'short', day: 'numeric' })}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 100]}
              fontSize={11}
              tickFormatter={v => `${v}%`}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const item = payload[0].payload;
                return (
                  <div className="rounded-xl bg-card shadow-ambient px-4 py-2.5 text-sm">
                    <p className="text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                    <p className="font-semibold">{item.mastery}% avg mastery</p>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="mastery"
              stroke="#B6FF00"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#B6FF00', stroke: '#4a7a00', strokeWidth: 1.5 }}
              activeDot={{ r: 5, fill: '#B6FF00', stroke: '#4a7a00', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
