import { AppShell } from '../components/layout/AppShell';
import { useProgressSummary, useActivityHistory } from '../hooks/useProgress';
import { useConceptMap } from '../hooks/useConceptMap';
import { MasteryRing } from '../components/progress/MasteryRing';
import { StreakCalendar } from '../components/progress/StreakCalendar';
import { CategoryBreakdown } from '../components/progress/CategoryBreakdown';
import { MasteryTimeline } from '../components/progress/MasteryTimeline';
import { Flame, BookOpen, Clock, Target } from 'lucide-react';
import { useState, useMemo } from 'react';

type SortKey = 'name' | 'mastery' | 'attempts' | 'last_practiced';
type SortDir = 'asc' | 'desc';

export function ProgressPage() {
  const { data: progress, isLoading: loadingProgress } = useProgressSummary();
  const { data: activity, isLoading: loadingActivity } = useActivityHistory(90);
  const { data: conceptMap } = useConceptMap();

  const [sortKey, setSortKey] = useState<SortKey>('mastery');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const conceptDetails = useMemo(() => {
    if (!conceptMap || !progress) return [];
    const masteryMap = new Map(progress.allMastery.map(m => [m.concept_id, m]));

    return conceptMap.concepts.map(c => ({
      ...c,
      mastery: masteryMap.get(c.id),
    }));
  }, [conceptMap, progress]);

  const filteredConcepts = useMemo(() => {
    let list = conceptDetails;

    if (filterCategory !== 'all') {
      list = list.filter(c => c.category === filterCategory);
    }

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'mastery':
          cmp = (a.mastery?.mastery_level ?? 0) - (b.mastery?.mastery_level ?? 0);
          break;
        case 'attempts':
          cmp = (a.mastery?.total_attempts ?? 0) - (b.mastery?.total_attempts ?? 0);
          break;
        case 'last_practiced': {
          const aDate = a.mastery?.last_practiced_at ?? '';
          const bDate = b.mastery?.last_practiced_at ?? '';
          cmp = aDate.localeCompare(bDate);
          break;
        }
      }
      return sortDir === 'desc' ? -cmp : cmp;
    });

    return list;
  }, [conceptDetails, filterCategory, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  const isLoading = loadingProgress || loadingActivity;

  return (
    <AppShell>
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold">Progress</h1>
          <p className="text-muted-foreground mt-1">Track your learning journey</p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 rounded-2xl surface-low animate-pulse" />
              ))}
            </div>
            <div className="h-48 rounded-2xl surface-low animate-pulse" />
          </div>
        ) : progress ? (
          <>
            {/* Stats overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-card shadow-ambient p-5 flex items-center gap-4">
                <MasteryRing value={progress.averageMastery} size={56} strokeWidth={5} />
                <div>
                  <span className="text-sm text-muted-foreground">Overall Mastery</span>
                  <p className="text-xl font-bold">{progress.averageMastery}%</p>
                </div>
              </div>
              <StatCard
                icon={<Flame className="h-5 w-5 text-orange-500" />}
                label="Current Streak"
                value={`${progress.currentStreak} day${progress.currentStreak !== 1 ? 's' : ''}`}
                sublabel={`Longest: ${progress.longestStreak} days`}
              />
              <StatCard
                icon={<BookOpen className="h-5 w-5 text-secondary-dark" />}
                label="Concepts Started"
                value={`${progress.conceptsStarted}`}
                sublabel={`${progress.conceptsMastered} mastered`}
              />
              <StatCard
                icon={<Clock className="h-5 w-5 text-purple-500" />}
                label="Total Time"
                value={progress.totalTimeMinutes >= 60
                  ? `${Math.floor(progress.totalTimeMinutes / 60)}h ${progress.totalTimeMinutes % 60}m`
                  : `${progress.totalTimeMinutes} min`
                }
              />
            </div>

            {/* Streak Calendar */}
            <section className="rounded-2xl bg-card shadow-ambient p-6">
              <h2 className="text-lg font-semibold mb-4">Activity</h2>
              <div className="overflow-x-auto">
                <StreakCalendar activity={activity ?? []} days={90} />
              </div>
            </section>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mastery Timeline */}
              <section className="rounded-2xl bg-card shadow-ambient p-6">
                <h2 className="text-lg font-semibold mb-2">Mastery Over Time</h2>
                <MasteryTimeline mastery={progress.allMastery} />
              </section>

              {/* Category Breakdown */}
              <section className="rounded-2xl bg-card shadow-ambient p-6">
                <h2 className="text-lg font-semibold mb-4">By Category</h2>
                {conceptMap ? (
                  <CategoryBreakdown
                    mastery={progress.allMastery}
                    concepts={conceptMap.concepts}
                  />
                ) : null}
              </section>
            </div>

            {/* Per-concept mastery table */}
            <section className="rounded-2xl bg-card shadow-ambient p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h2 className="text-lg font-semibold">All Concepts</h2>
                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  className="rounded-xl surface-low px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="all">All categories</option>
                  {conceptMap?.categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium cursor-pointer hover:text-foreground" onClick={() => toggleSort('name')}>
                        Concept {sortKey === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="pb-3 pr-4 font-medium cursor-pointer hover:text-foreground text-right" onClick={() => toggleSort('mastery')}>
                        Mastery {sortKey === 'mastery' && (sortDir === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="pb-3 pr-4 font-medium cursor-pointer hover:text-foreground text-right" onClick={() => toggleSort('attempts')}>
                        Attempts {sortKey === 'attempts' && (sortDir === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="pb-3 font-medium cursor-pointer hover:text-foreground text-right" onClick={() => toggleSort('last_practiced')}>
                        Last Practiced {sortKey === 'last_practiced' && (sortDir === 'asc' ? '↑' : '↓')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredConcepts.map(concept => {
                      const m = concept.mastery;
                      const masteryLevel = m?.mastery_level ?? 0;
                      return (
                        <tr key={concept.id} className="hover:surface-low transition-colors">
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-3">
                              <Target className="h-4 w-4 text-muted-foreground shrink-0" />
                              <div>
                                <p className="font-medium">{concept.name}</p>
                                <p className="text-xs text-muted-foreground">{concept.category.replace(/-/g, ' ')}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 pr-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-1.5 rounded-full surface-mid overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${masteryLevel}%`,
                                    backgroundColor: masteryLevel >= 80 ? '#B6FF00' : masteryLevel >= 40 ? '#00C2FF' : '#d4d0c5',
                                  }}
                                />
                              </div>
                              <span className="w-10 text-right font-medium tabular-nums">
                                {m ? `${Math.round(masteryLevel)}%` : '—'}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 pr-4 text-right tabular-nums">
                            {m?.total_attempts ?? 0}
                          </td>
                          <td className="py-3 text-right text-muted-foreground">
                            {m?.last_practiced_at
                              ? new Date(m.last_practiced_at).toLocaleDateString()
                              : '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredConcepts.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No concepts in this category
                </p>
              )}
            </section>
          </>
        ) : null}
      </div>
    </AppShell>
  );
}

function StatCard({ icon, label, value, sublabel }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <div className="rounded-2xl bg-card shadow-ambient p-5">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-xl font-bold">{value}</p>
      {sublabel && <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>}
    </div>
  );
}
