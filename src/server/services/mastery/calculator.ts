export interface MasteryContext {
  currentMastery: number;
  currentConfidence: number;
  totalAttempts: number;
  correctAttempts: number;
  problemDifficulty: number;
  hintsUsed: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface MasteryUpdate {
  masteryDelta: number;
  newMasteryLevel: number;
  newConfidence: number;
  newTotalAttempts: number;
  newCorrectAttempts: number;
}

export function calculateMasteryUpdate(ctx: MasteryContext): MasteryUpdate {
  const difficultyFactor = 0.7 + (ctx.problemDifficulty / 10) * 0.6;
  const hintFactor = Math.pow(0.7, ctx.hintsUsed);

  let delta: number;

  if (ctx.isCorrect) {
    const base = 8;
    let speedBonus = 0;
    if (ctx.timeSpentSeconds < 15) speedBonus = 2;
    else if (ctx.timeSpentSeconds < 30) speedBonus = 1;

    delta = Math.round(base * difficultyFactor * hintFactor + speedBonus);
  } else {
    const base = -3;
    delta = Math.round(base / difficultyFactor);
  }

  const newMasteryLevel = Math.max(0, Math.min(100, ctx.currentMastery + delta));
  const newConfidence = Math.min(100, ctx.currentConfidence + 2);

  return {
    masteryDelta: delta,
    newMasteryLevel,
    newConfidence,
    newTotalAttempts: ctx.totalAttempts + 1,
    newCorrectAttempts: ctx.correctAttempts + (ctx.isCorrect ? 1 : 0),
  };
}

export function selectNextDifficulty(recentResults: boolean[], currentDifficulty: number): number {
  if (recentResults.length >= 3 && recentResults.slice(0, 3).every(r => r)) {
    return Math.min(10, currentDifficulty + 1);
  }
  if (recentResults.length >= 2 && recentResults.slice(0, 2).every(r => !r)) {
    return Math.max(1, currentDifficulty - 1);
  }
  return currentDifficulty;
}

export function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  const normalize = (s: string) =>
    s.trim().toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/\s*([=+\-*/^])\s*/g, '$1');

  const ua = normalize(userAnswer);
  const ca = normalize(correctAnswer);

  // Exact match after normalization
  if (ua === ca) return true;

  // Numeric comparison
  const uaNum = parseNumber(ua);
  const caNum = parseNumber(ca);
  if (uaNum !== null && caNum !== null) {
    return Math.abs(uaNum - caNum) < 0.001;
  }

  return false;
}

function parseNumber(s: string): number | null {
  // Handle fractions like "17/12" or "-3/4"
  const fractionMatch = s.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (fractionMatch) {
    const num = parseInt(fractionMatch[1]);
    const den = parseInt(fractionMatch[2]);
    if (den !== 0) return num / den;
  }

  const n = Number(s);
  return isNaN(n) ? null : n;
}
