import { useState, useRef, useCallback, useEffect } from 'react';
import { apiFetch } from '../lib/api';
import type {
  GeneratedProblem,
  ProblemSubmitResponse,
  PracticeSessionStartResponse,
  PracticeNextProblemResponse,
  PracticeSessionEndResponse,
} from '../../types/api';

export type PracticePhase = 'picking' | 'loading' | 'solving' | 'feedback' | 'summary' | 'error';

interface PracticeState {
  phase: PracticePhase;
  sessionId: string | null;
  conceptId: string | null;
  conceptName: string | null;
  currentProblem: GeneratedProblem | null;
  problemNumber: number;
  hintsRevealed: number;
  lastResult: ProblemSubmitResponse | null;
  sessionResults: ProblemSubmitResponse[];
  mastery: number;
  startMastery: number;
  currentDifficulty: number;
  recentCorrect: boolean[];
  summary: PracticeSessionEndResponse | null;
  error: string | null;
}

export function usePractice(initialConceptId?: string) {
  const [state, setState] = useState<PracticeState>({
    phase: initialConceptId ? 'loading' : 'picking',
    sessionId: null,
    conceptId: null,
    conceptName: null,
    currentProblem: null,
    problemNumber: 1,
    hintsRevealed: 0,
    lastResult: null,
    sessionResults: [],
    mastery: 0,
    startMastery: 0,
    currentDifficulty: 3,
    recentCorrect: [],
    summary: null,
    error: null,
  });

  const problemStartTime = useRef<number>(Date.now());
  const hasAutoStarted = useRef(false);

  const startSession = useCallback(async (conceptId: string, conceptName?: string) => {
    setState(prev => ({ ...prev, phase: 'loading', error: null }));

    try {
      const data = await apiFetch<PracticeSessionStartResponse>('/api/practice/session/start', {
        method: 'POST',
        body: JSON.stringify({ conceptId }),
      });

      problemStartTime.current = Date.now();
      setState(prev => ({
        ...prev,
        phase: 'solving',
        sessionId: data.sessionId,
        conceptId,
        conceptName: conceptName ?? conceptId,
        currentProblem: data.problem,
        problemNumber: 1,
        hintsRevealed: 0,
        lastResult: null,
        sessionResults: [],
        mastery: data.mastery,
        startMastery: data.mastery,
        currentDifficulty: data.problem.difficulty,
        recentCorrect: [],
        summary: null,
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        phase: 'error',
        error: err.message ?? 'Failed to start practice session',
      }));
    }
  }, []);

  // Auto-start if conceptId provided
  useEffect(() => {
    if (initialConceptId && !hasAutoStarted.current) {
      hasAutoStarted.current = true;
      startSession(initialConceptId);
    }
  }, [initialConceptId, startSession]);

  const revealHint = useCallback(() => {
    setState(prev => ({
      ...prev,
      hintsRevealed: Math.min(3, prev.hintsRevealed + 1),
    }));
  }, []);

  const submitAnswer = useCallback(async (answer: string) => {
    if (!state.sessionId || !state.currentProblem) return;

    const timeSpent = Math.round((Date.now() - problemStartTime.current) / 1000);
    setState(prev => ({ ...prev, phase: 'loading' }));

    try {
      const result = await apiFetch<ProblemSubmitResponse>(`/api/practice/session/${state.sessionId}/submit`, {
        method: 'POST',
        body: JSON.stringify({
          problem_id: state.currentProblem!.id,
          answer,
          time_spent_seconds: timeSpent,
          hints_used: state.hintsRevealed,
        }),
      });

      setState(prev => ({
        ...prev,
        phase: 'feedback',
        lastResult: result,
        sessionResults: [...prev.sessionResults, result],
        mastery: result.newMasteryLevel,
        recentCorrect: [result.isCorrect, ...prev.recentCorrect].slice(0, 5),
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        phase: 'error',
        error: err.message ?? 'Failed to submit answer',
      }));
    }
  }, [state.sessionId, state.currentProblem, state.hintsRevealed]);

  const nextProblem = useCallback(async () => {
    if (!state.sessionId) return;

    // After 10 problems, end session
    if (state.problemNumber >= 10) {
      return endSession();
    }

    setState(prev => ({ ...prev, phase: 'loading' }));

    try {
      const data = await apiFetch<PracticeNextProblemResponse>(`/api/practice/session/${state.sessionId}/next`, {
        method: 'POST',
        body: JSON.stringify({
          recentResults: state.recentCorrect,
          currentDifficulty: state.currentDifficulty,
        }),
      });

      problemStartTime.current = Date.now();
      setState(prev => ({
        ...prev,
        phase: 'solving',
        currentProblem: data.problem,
        problemNumber: prev.problemNumber + 1,
        hintsRevealed: 0,
        lastResult: null,
        currentDifficulty: data.problem.difficulty,
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        phase: 'error',
        error: err.message ?? 'Failed to get next problem',
      }));
    }
  }, [state.sessionId, state.problemNumber, state.recentCorrect, state.currentDifficulty]);

  const endSession = useCallback(async () => {
    if (!state.sessionId) return;

    setState(prev => ({ ...prev, phase: 'loading' }));

    try {
      const data = await apiFetch<PracticeSessionEndResponse>(`/api/practice/session/${state.sessionId}/end`, {
        method: 'POST',
        body: JSON.stringify({ startMastery: state.startMastery }),
      });

      setState(prev => ({
        ...prev,
        phase: 'summary',
        summary: data,
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        phase: 'error',
        error: err.message ?? 'Failed to end session',
      }));
    }
  }, [state.sessionId, state.startMastery]);

  const reset = useCallback(() => {
    hasAutoStarted.current = false;
    setState({
      phase: 'picking',
      sessionId: null,
      conceptId: null,
      conceptName: null,
      currentProblem: null,
      problemNumber: 1,
      hintsRevealed: 0,
      lastResult: null,
      sessionResults: [],
      mastery: 0,
      startMastery: 0,
      currentDifficulty: 3,
      recentCorrect: [],
      summary: null,
      error: null,
    });
  }, []);

  return {
    ...state,
    startSession,
    revealHint,
    submitAnswer,
    nextProblem,
    endSession,
    reset,
  };
}
