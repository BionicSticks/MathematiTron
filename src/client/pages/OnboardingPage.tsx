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
        <p className="text-muted-foreground mb-10">
          What would you like to achieve? This helps your AI tutor create a personalised learning path.
        </p>

        {/* Goal selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {goalOptions.map(({ type, label, desc, icon: Icon }) => (
            <button
              key={type}
              onClick={() => setSelectedGoal(type)}
              className={`flex items-start gap-3 rounded-xl p-4 text-left transition-all ${
                selectedGoal === type
                  ? 'bg-card shadow-ambient glow-primary'
                  : 'surface-low hover:bg-card hover:shadow-ambient'
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
          <div className="mb-8">
            <label className="block text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Describe your goal</label>
            <textarea
              value={customDescription}
              onChange={e => setCustomDescription(e.target.value)}
              className="w-full rounded-xl surface-low px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[80px] transition-shadow"
              placeholder="e.g., I want to learn enough linear algebra to understand machine learning papers"
            />
          </div>
        )}

        {/* Target date */}
        {selectedGoal && (
          <div className="mb-10">
            <label className="block text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">
              Target date <span className="font-normal">(optional)</span>
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
              className="rounded-xl surface-low px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!selectedGoal || isSubmitting}
          className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-50 transition-all glow-primary"
        >
          {isSubmitting ? 'Setting up...' : 'Continue'}
          {!isSubmitting && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
