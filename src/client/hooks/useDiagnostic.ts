import { useState, useRef, useCallback } from 'react';
import { apiFetch } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import type {
  DiagnosticQuestion,
  DiagnosticStartResponse,
  DiagnosticAnswerResponse,
  DiagnosticResult,
} from '../../types/api';

export type DiagnosticPhase = 'intro' | 'assessing' | 'loading' | 'results' | 'path_preview' | 'error' | 'complete';

interface AnswerRecord {
  question: DiagnosticQuestion;
  answer: string | null;
  timeSpent: number;
}

interface DiagnosticState {
  phase: DiagnosticPhase;
  conversationId: string | null;
  currentQuestion: DiagnosticQuestion | null;
  answerHistory: AnswerRecord[];
  result: DiagnosticResult | null;
  error: string | null;
}

export function useDiagnostic() {
  const { refreshProfile } = useAuth();
  const [state, setState] = useState<DiagnosticState>({
    phase: 'intro',
    conversationId: null,
    currentQuestion: null,
    answerHistory: [],
    result: null,
    error: null,
  });

  const questionStartTime = useRef<number>(Date.now());
  const lastAction = useRef<'start' | 'respond'>('start');

  const startDiagnostic = useCallback(async () => {
    setState(prev => ({ ...prev, phase: 'loading', error: null }));
    lastAction.current = 'start';

    try {
      const data = await apiFetch<DiagnosticStartResponse>('/api/onboarding/diagnostic/start', {
        method: 'POST',
      });

      questionStartTime.current = Date.now();
      setState(prev => ({
        ...prev,
        phase: 'assessing',
        conversationId: data.conversationId,
        currentQuestion: data.question,
      }));
    } catch (err: any) {
      const msg = err?.message ?? 'Something went wrong';
      setState(prev => ({
        ...prev,
        phase: 'error',
        error: msg.includes('temporarily unavailable')
          ? 'AI service is temporarily unavailable. You can try again or skip the diagnostic.'
          : msg,
      }));
    }
  }, []);

  const submitAnswer = useCallback(async (answer: string | null) => {
    if (!state.conversationId || !state.currentQuestion) return;

    const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000);
    const answeredQuestion = state.currentQuestion;

    setState(prev => ({ ...prev, phase: 'loading' }));
    lastAction.current = 'respond';

    try {
      const data = await apiFetch<DiagnosticAnswerResponse>('/api/onboarding/diagnostic/respond', {
        method: 'POST',
        body: JSON.stringify({
          conversationId: state.conversationId,
          answer,
          questionNumber: answeredQuestion.questionNumber,
          timeSpentSeconds: timeSpent,
        }),
      });

      const record: AnswerRecord = {
        question: answeredQuestion,
        answer,
        timeSpent,
      };

      if (data.isComplete && data.result) {
        setState(prev => ({
          ...prev,
          phase: 'results',
          currentQuestion: null,
          answerHistory: [...prev.answerHistory, record],
          result: data.result!,
        }));
      } else if (data.nextQuestion) {
        questionStartTime.current = Date.now();
        setState(prev => ({
          ...prev,
          phase: 'assessing',
          currentQuestion: data.nextQuestion!,
          answerHistory: [...prev.answerHistory, record],
        }));
      }
    } catch (err: any) {
      const msg = err?.message ?? 'Something went wrong';
      setState(prev => ({
        ...prev,
        phase: 'error',
        error: msg.includes('temporarily unavailable')
          ? 'AI service is temporarily unavailable. You can try again or skip the diagnostic.'
          : msg,
      }));
    }
  }, [state.conversationId, state.currentQuestion]);

  const viewPath = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'path_preview' }));
  }, []);

  const confirmPath = useCallback(async () => {
    setState(prev => ({ ...prev, phase: 'loading' }));

    try {
      await apiFetch('/api/onboarding/diagnostic/complete', {
        method: 'POST',
      });
      await refreshProfile();
      setState(prev => ({ ...prev, phase: 'complete' }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        phase: 'error',
        error: err.message ?? 'Something went wrong',
      }));
    }
  }, [refreshProfile]);

  const skipDiagnostic = useCallback(async () => {
    setState(prev => ({ ...prev, phase: 'loading' }));

    try {
      await apiFetch('/api/onboarding/diagnostic/skip', {
        method: 'POST',
      });
      await refreshProfile();
      setState(prev => ({ ...prev, phase: 'complete' }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        phase: 'error',
        error: err.message ?? 'Something went wrong',
      }));
    }
  }, [refreshProfile]);

  const retry = useCallback(() => {
    if (lastAction.current === 'start') {
      startDiagnostic();
    } else {
      // Go back to assessing with the current question
      setState(prev => ({
        ...prev,
        phase: prev.currentQuestion ? 'assessing' : 'intro',
        error: null,
      }));
    }
  }, [startDiagnostic]);

  return {
    ...state,
    startDiagnostic,
    submitAnswer,
    viewPath,
    confirmPath,
    skipDiagnostic,
    retry,
  };
}
