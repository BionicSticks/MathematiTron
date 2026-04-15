import { useMemo } from 'react';
import type { DailyActivity } from '../../../types/database';

interface StreakCalendarProps {
  activity: DailyActivity[];
  days?: number;
}

export function StreakCalendar({ activity, days = 90 }: StreakCalendarProps) {
  const { grid, months } = useMemo(() => {
    const activityMap = new Map<string, DailyActivity>();
    for (const day of activity) {
      activityMap.set(day.activity_date, day);
    }

    const today = new Date();
    const cells: Array<{ date: string; level: number; activity?: DailyActivity }> = [];

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayActivity = activityMap.get(dateStr);

      let level = 0;
      if (dayActivity) {
        const total = dayActivity.problems_attempted + dayActivity.messages_sent;
        if (total >= 20) level = 4;
        else if (total >= 10) level = 3;
        else if (total >= 5) level = 2;
        else level = 1;
      }

      cells.push({ date: dateStr, level, activity: dayActivity });
    }

    // Group by week (columns) for GitHub-style grid
    const weeks: typeof cells[] = [];
    // Pad start to align with weekday
    const firstDay = new Date(cells[0].date).getDay();
    const padded = Array(firstDay).fill(null).concat(cells);
    for (let i = 0; i < padded.length; i += 7) {
      weeks.push(padded.slice(i, i + 7));
    }

    // Extract month labels
    const monthLabels: Array<{ label: string; col: number }> = [];
    let lastMonth = '';
    weeks.forEach((week, colIdx) => {
      const firstCell = week.find((c): c is NonNullable<typeof c> => c !== null);
      if (firstCell) {
        const month = new Date(firstCell.date).toLocaleString('default', { month: 'short' });
        if (month !== lastMonth) {
          monthLabels.push({ label: month, col: colIdx });
          lastMonth = month;
        }
      }
    });

    return { grid: weeks, months: monthLabels };
  }, [activity, days]);

  const levelColors = [
    'bg-surface-low',           // 0 - no activity
    'bg-primary/30',            // 1 - light
    'bg-primary/50',            // 2 - medium
    'bg-primary/75',            // 3 - high
    'bg-primary',               // 4 - very high
  ];

  return (
    <div>
      {/* Month labels */}
      <div className="flex mb-1 text-xs text-muted-foreground" style={{ paddingLeft: 28 }}>
        {months.map(({ label, col }) => (
          <span
            key={`${label}-${col}`}
            className="absolute"
            style={{ marginLeft: col * 16 }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="flex gap-0.5 mt-6">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 text-xs text-muted-foreground mr-1 shrink-0">
          <span className="h-3" /> {/* Mon */}
          <span className="h-3 leading-3">Tue</span>
          <span className="h-3" /> {/* Wed */}
          <span className="h-3 leading-3">Thu</span>
          <span className="h-3" /> {/* Fri */}
          <span className="h-3 leading-3">Sat</span>
          <span className="h-3" /> {/* Sun */}
        </div>

        {/* Grid */}
        {grid.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-0.5">
            {Array.from({ length: 7 }, (_, dayIdx) => {
              const cell = week[dayIdx];
              if (!cell) return <div key={dayIdx} className="h-3 w-3" />;

              return (
                <div
                  key={cell.date}
                  className={`h-3 w-3 rounded-sm ${levelColors[cell.level]} transition-colors`}
                  title={`${cell.date}: ${cell.activity
                    ? `${cell.activity.problems_attempted} problems, ${Math.round(cell.activity.total_time_seconds / 60)} min`
                    : 'No activity'
                  }`}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground justify-end">
        <span>Less</span>
        {levelColors.map((color, i) => (
          <div key={i} className={`h-3 w-3 rounded-sm ${color}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
