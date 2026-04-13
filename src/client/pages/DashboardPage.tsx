import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { apiFetch } from '../lib/api';
import { AppShell } from '../components/layout/AppShell';
import { Link } from 'wouter';
import type { DashboardStats } from '../../types/api';
import { Flame, BookOpen, Clock, ArrowRight, Map } from 'lucide-react';
import { MasteryRing } from '../components/progress/MasteryRing';

export function DashboardPage() {
  const { profile } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiFetch<DashboardStats>('/api/dashboard'),
  });

  const firstName = profile?.display_name?.split(' ')[0] ?? 'Student';

  return (
    <AppShell>
      <div className="space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {firstName}</h1>
          <p className="text-muted-foreground mt-1">Pick up where you left off</p>
        </div>

        {/* Stats Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 rounded-2xl surface-low animate-pulse" />
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Flame className="h-5 w-5 text-orange-500" />}
              label="Current Streak"
              value={`${stats.currentStreak} day${stats.currentStreak !== 1 ? 's' : ''}`}
            />
            <StatCard
              icon={<BookOpen className="h-5 w-5 text-secondary" />}
              label="Concepts Mastered"
              value={`${stats.masteredConcepts} / ${stats.totalConcepts}`}
            />
            <div className="rounded-2xl bg-card shadow-ambient p-5 flex items-center gap-4">
              <MasteryRing value={stats.overallMastery} size={56} strokeWidth={5} />
              <div>
                <span className="text-sm text-muted-foreground">Overall Mastery</span>
                <p className="text-xl font-bold">{stats.overallMastery}%</p>
              </div>
            </div>
            <StatCard
              icon={<Clock className="h-5 w-5 text-purple-500" />}
              label="Time This Week"
              value={`${stats.totalTimeMinutes} min`}
            />
          </div>
        ) : null}

        {/* Suggested Next Steps */}
        {stats?.suggestedConcepts && stats.suggestedConcepts.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.suggestedConcepts.map(concept => (
                <Link key={concept.id} href={`/chat?concept=${concept.id}`}>
                  <div className="group rounded-2xl bg-card shadow-ambient p-5 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {concept.category.replace('-', ' ')}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-semibold mb-1">{concept.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{concept.description}</p>
                    {concept.mastery && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-muted-foreground">Mastery</span>
                          <span className="font-medium">{Math.round(concept.mastery.mastery_level)}%</span>
                        </div>
                        <div className="h-1.5 rounded-full surface-mid overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${concept.mastery.mastery_level}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/chat">
              <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all glow-primary">
                Start a Tutoring Session
              </button>
            </Link>
            <Link href="/map">
              <button className="flex items-center gap-2 rounded-full surface-low px-6 py-2.5 text-sm font-medium hover:surface-mid transition-colors">
                <Map className="h-4 w-4" />
                View Concept Map
              </button>
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card shadow-ambient p-5">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
