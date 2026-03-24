import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../contexts/AuthContext';
import { apiFetch } from '../lib/api';
import {
  GraduationCap,
  Target,
  BookOpen,
  Trophy,
  Calculator,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const goalOptions = [
  { type: 'sat_math', label: 'SAT Math Prep', desc: 'Prepare for the SAT mathematics section', icon: Trophy },
  { type: 'act_math', label: 'ACT Math Prep', desc: 'Prepare for the ACT mathematics section', icon: Trophy },
  { type: 'gcse_math', label: 'GCSE Maths', desc: 'Prepare for GCSE mathematics exams', icon: GraduationCap },
  { type: 'a_level_math', label: 'A-Level Maths', desc: 'Prepare for A-Level mathematics exams', icon: GraduationCap },
  { type: 'learn_topic', label: 'Learn a Specific Topic', desc: 'Focus on mastering a particular area of maths', icon: BookOpen },
  { type: 'grade_level', label: 'Catch Up to Grade Level', desc: 'Get up to speed with where you should be', icon: Target },
  { type: 'custom', label: 'Custom Goal', desc: 'Define your own learning objective', icon: Sparkles },
] as const;

export function OnboardingPage() {
  const [, navigate] = useLocation();
  const { refreshProfile } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [customDescription, setCustomDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedGoal) return;

    setIsSubmitting(true);
    try {
      await apiFetch('/api/onboarding/goal', {
        method: 'POST',
        body: JSON.stringify({
          goal_type: selectedGoal,
          goal_description: selectedGoal === 'custom' ? customDescription : undefined,
          target_date: targetDate || undefined,
        }),
      });
      await refreshProfile();
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to set goal:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Let's get started</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          What would you like to achieve? This helps your AI tutor create a personalised learning path.
        </p>

        {/* Goal selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {goalOptions.map(({ type, label, desc, icon: Icon }) => (
            <button
              key={type}
              onClick={() => setSelectedGoal(type)}
              className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                selectedGoal === type
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Icon className={`h-5 w-5 mt-0.5 ${selectedGoal === type ? 'text-primary' : 'text-muted-foreground'}`} />
              <div>
                <h3 className="font-medium text-sm">{label}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Custom description */}
        {selectedGoal === 'custom' && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1.5">Describe your goal</label>
            <textarea
              value={customDescription}
              onChange={e => setCustomDescription(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]"
              placeholder="e.g., I want to learn enough linear algebra to understand machine learning papers"
            />
          </div>
        )}

        {/* Target date */}
        {selectedGoal && (
          <div className="mb-8">
            <label className="block text-sm font-medium mb-1.5">
              Target date <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!selectedGoal || isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Setting up...' : 'Continue'}
          {!isSubmitting && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
