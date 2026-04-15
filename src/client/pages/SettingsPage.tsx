import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AppShell } from '../components/layout/AppShell';
import { useAuth } from '../contexts/AuthContext';
import { apiFetch } from '../lib/api';
import type { StudentGoal } from '../../types/database';
import { User, Target, Globe, LogOut, Check } from 'lucide-react';

const GOAL_TYPES: Array<{ value: StudentGoal['goal_type']; label: string }> = [
  { value: 'sat_math', label: 'SAT Math' },
  { value: 'act_math', label: 'ACT Math' },
  { value: 'gcse_math', label: 'GCSE Maths' },
  { value: 'a_level_math', label: 'A-Level Maths' },
  { value: 'learn_topic', label: 'Learn a Topic' },
  { value: 'grade_level', label: 'Grade Level' },
  { value: 'custom', label: 'Custom Goal' },
];

const TIMEZONES = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin',
  'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney',
  'UTC',
];

export function SettingsPage() {
  const { profile, goal, signOut, refreshProfile } = useAuth();

  const [displayName, setDisplayName] = useState(profile?.display_name ?? '');
  const [timezone, setTimezone] = useState(profile?.timezone ?? 'UTC');
  const [goalType, setGoalType] = useState<StudentGoal['goal_type']>(goal?.goal_type ?? 'custom');
  const [goalDescription, setGoalDescription] = useState(goal?.goal_description ?? '');
  const [targetDate, setTargetDate] = useState(goal?.target_date?.split('T')[0] ?? '');

  const [profileSaved, setProfileSaved] = useState(false);
  const [goalSaved, setGoalSaved] = useState(false);

  const updateProfile = useMutation({
    mutationFn: () => apiFetch('/api/settings/profile', {
      method: 'PATCH',
      body: JSON.stringify({ display_name: displayName, timezone }),
    }),
    onSuccess: () => {
      refreshProfile();
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2000);
    },
  });

  const updateGoal = useMutation({
    mutationFn: () => apiFetch('/api/settings/goal', {
      method: 'PUT',
      body: JSON.stringify({
        goal_type: goalType,
        goal_description: goalDescription || undefined,
        target_date: targetDate || undefined,
      }),
    }),
    onSuccess: () => {
      refreshProfile();
      setGoalSaved(true);
      setTimeout(() => setGoalSaved(false), 2000);
    },
  });

  return (
    <AppShell>
      <div className="space-y-10 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
        </div>

        {/* Profile */}
        <section className="rounded-2xl bg-card shadow-ambient p-6 space-y-5">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary-dark" />
            <h2 className="text-lg font-semibold">Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                className="w-full rounded-xl surface-low px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="text"
                disabled
                value={profile?.id ? '' : ''}
                className="w-full rounded-xl surface-low px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
                placeholder="Managed by authentication"
              />
              <p className="text-xs text-muted-foreground mt-1">Email is managed by your authentication provider</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => updateProfile.mutate()}
              disabled={updateProfile.isPending}
              className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all glow-primary disabled:opacity-50"
            >
              {updateProfile.isPending ? 'Saving...' : 'Save Profile'}
            </button>
            {profileSaved && (
              <span className="flex items-center gap-1 text-sm text-primary-dark">
                <Check className="h-4 w-4" /> Saved
              </span>
            )}
          </div>
        </section>

        {/* Timezone */}
        <section className="rounded-2xl bg-card shadow-ambient p-6 space-y-5">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-secondary-dark" />
            <h2 className="text-lg font-semibold">Timezone</h2>
          </div>

          <select
            value={timezone}
            onChange={e => setTimezone(e.target.value)}
            className="w-full rounded-xl surface-low px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
          >
            {TIMEZONES.map(tz => (
              <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">Used for streak calculations and activity tracking</p>
        </section>

        {/* Goal */}
        <section className="rounded-2xl bg-card shadow-ambient p-6 space-y-5">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold">Learning Goal</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Goal Type</label>
              <select
                value={goalType}
                onChange={e => setGoalType(e.target.value as StudentGoal['goal_type'])}
                className="w-full rounded-xl surface-low px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
              >
                {GOAL_TYPES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Description</label>
              <input
                type="text"
                value={goalDescription}
                onChange={e => setGoalDescription(e.target.value)}
                className="w-full rounded-xl surface-low px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g., Get ready for my A-Level exam in June"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Target Date</label>
              <input
                type="date"
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
                className="w-full rounded-xl surface-low px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => updateGoal.mutate()}
              disabled={updateGoal.isPending}
              className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all glow-primary disabled:opacity-50"
            >
              {updateGoal.isPending ? 'Saving...' : 'Update Goal'}
            </button>
            {goalSaved && (
              <span className="flex items-center gap-1 text-sm text-primary-dark">
                <Check className="h-4 w-4" /> Goal updated
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">Changing your goal will generate a new learning path</p>
        </section>

        {/* Sign Out */}
        <section className="rounded-2xl bg-card shadow-ambient p-6">
          <button
            onClick={signOut}
            className="flex items-center gap-2 rounded-full surface-low px-6 py-2.5 text-sm font-medium text-destructive hover:surface-mid transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </section>
      </div>
    </AppShell>
  );
}
