import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../contexts/AuthContext';
import { apiFetch } from '../lib/api';
import { useDiagnostic } from '../hooks/useDiagnostic';
import { DiagnosticIntro } from '../components/onboarding/DiagnosticIntro';
import { DiagnosticQuestionCard } from '../components/onboarding/DiagnosticQuestionCard';
import { DiagnosticResults } from '../components/onboarding/DiagnosticResults';
import { LearningPathPreview } from '../components/onboarding/LearningPathPreview';
import {
  GraduationCap,
  Target,
  BookOpen,
  Trophy,
  Calculator,
  Sparkles,
  ArrowRight,
  AlertCircle,
  RefreshCw,
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

const steps = [
  { label: 'Goal', key: 'goal' },
  { label: 'Assessment', key: 'assessment' },
  { label: 'Your Path', key: 'path' },
] as const;

type OnboardingStep = 'goal' | 'assessment' | 'path';

function getStepFromStatus(status: string): OnboardingStep {
  switch (status) {
    case 'new': return 'goal';
    case 'goal_set': return 'assessment';
    case 'diagnostic_started': return 'assessment';
    case 'diagnostic_complete': return 'path';
    default: return 'goal';
  }
}

export function OnboardingPage() {
  const [, navigate] = useLocation();
  const { profile, refreshProfile } = useAuth();

  const initialStep = getStepFromStatus(profile?.onboarding_status ?? 'new');
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(initialStep);

  // Goal selection state
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [customDescription, setCustomDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [isSubmittingGoal, setIsSubmittingGoal] = useState(false);

  // Diagnostic state
  const diagnostic = useDiagnostic();

  // Navigate to dashboard when diagnostic completes
  useEffect(() => {
    if (diagnostic.phase === 'complete') {
      navigate('/dashboard');
    }
  }, [diagnostic.phase, navigate]);

  const handleGoalSubmit = async () => {
    if (!selectedGoal) return;

    setIsSubmittingGoal(true);
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
      setCurrentStep('assessment');
    } catch (err) {
      console.error('Failed to set goal:', err);
    } finally {
      setIsSubmittingGoal(false);
    }
  };

  const activeStepIndex = steps.findIndex(s => s.key === currentStep);

  return (
    <div className="flex min-h-screen flex-col bg-background px-4 py-12">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {steps.map((step, i) => (
          <div key={step.key} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              i <= activeStepIndex ? 'text-primary-dark' : 'text-muted-foreground'
            }`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${
                i < activeStepIndex
                  ? 'bg-primary text-primary-foreground'
                  : i === activeStepIndex
                    ? 'bg-primary text-primary-foreground'
                    : 'surface-mid text-muted-foreground'
              }`}>
                {i + 1}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px w-8 sm:w-12 ${
                i < activeStepIndex ? 'bg-primary' : 'surface-mid'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-1 items-start justify-center">
        {/* Step 1: Goal Selection */}
        {currentStep === 'goal' && (
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="h-8 w-8 text-primary-dark" />
              <h1 className="text-2xl font-bold">Let's get started</h1>
            </div>
            <p className="text-muted-foreground mb-10">
              What would you like to achieve? This helps your AI tutor create a personalised learning path.
            </p>

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
                  <Icon className={`h-5 w-5 mt-0.5 ${selectedGoal === type ? 'text-primary-dark' : 'text-muted-foreground'}`} />
                  <div>
                    <h3 className="font-medium text-sm">{label}</h3>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </button>
              ))}
            </div>

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

            <button
              onClick={handleGoalSubmit}
              disabled={!selectedGoal || isSubmittingGoal}
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 disabled:opacity-50 transition-all glow-primary"
            >
              {isSubmittingGoal ? 'Setting up...' : 'Continue'}
              {!isSubmittingGoal && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        )}

        {/* Step 2: Diagnostic Assessment */}
        {currentStep === 'assessment' && (
          <>
            {diagnostic.phase === 'intro' && (
              <DiagnosticIntro
                onBegin={diagnostic.startDiagnostic}
                onSkip={diagnostic.skipDiagnostic}
                isLoading={false}
              />
            )}
            {diagnostic.phase === 'loading' && !diagnostic.currentQuestion && (
              <div className="flex flex-col items-center gap-4 py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Preparing your assessment...</p>
              </div>
            )}
            {(diagnostic.phase === 'assessing' || (diagnostic.phase === 'loading' && diagnostic.currentQuestion)) && diagnostic.currentQuestion && (
              <DiagnosticQuestionCard
                question={diagnostic.currentQuestion}
                onAnswer={diagnostic.submitAnswer}
                isLoading={diagnostic.phase === 'loading'}
              />
            )}
            {diagnostic.phase === 'results' && diagnostic.result && (
              <DiagnosticResults
                result={diagnostic.result}
                onViewPath={() => {
                  diagnostic.viewPath();
                  setCurrentStep('path');
                }}
              />
            )}
            {diagnostic.phase === 'error' && (
              <div className="w-full max-w-lg mx-auto">
                <div className="rounded-2xl bg-card shadow-ambient p-8 text-center">
                  <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-4" />
                  <h2 className="text-lg font-bold mb-2">Assessment unavailable</h2>
                  <p className="text-sm text-muted-foreground mb-8">{diagnostic.error}</p>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={diagnostic.retry}
                      className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all glow-primary"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Try again
                    </button>
                    <button
                      onClick={diagnostic.skipDiagnostic}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Skip for now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Step 3: Learning Path Preview */}
        {currentStep === 'path' && diagnostic.result && (
          <LearningPathPreview
            result={diagnostic.result}
            onConfirm={diagnostic.confirmPath}
            isLoading={diagnostic.phase === 'loading'}
          />
        )}
      </div>
    </div>
  );
}
