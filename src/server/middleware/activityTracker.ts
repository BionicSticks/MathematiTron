import type { Request, Response, NextFunction } from 'express';
import { upsertDailyActivity } from '../db/queries/activity';

// Middleware that tracks activity after successful responses
// Attach to conversation and practice routes
export function trackMessage(conceptId?: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run the actual handler first
    const originalJson = res.json.bind(res);
    res.json = function (body: unknown) {
      // Track after successful response
      if (res.statusCode < 400 && req.userId) {
        upsertDailyActivity(req.userId, {
          messages_sent: 1,
          concept_id: conceptId ?? (req.body?.concept_id as string),
        }).catch(() => {}); // Fire-and-forget
      }
      return originalJson(body);
    };
    next();
  };
}

export function trackPracticeSubmit() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);
    res.json = function (body: unknown) {
      if (res.statusCode < 400 && req.userId) {
        const result = body as { isCorrect?: boolean };
        upsertDailyActivity(req.userId, {
          problems_attempted: 1,
          problems_correct: result.isCorrect ? 1 : 0,
          time_seconds: (req.body?.time_spent_seconds as number) ?? 0,
        }).catch(() => {}); // Fire-and-forget
      }
      return originalJson(body);
    };
    next();
  };
}
