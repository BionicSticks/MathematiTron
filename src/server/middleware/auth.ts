import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../db/client';
import type { Profile } from '../../types/database';

// Extend Express Request to include user info
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userProfile?: Profile;
      accessToken?: string;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }

  const token = authHeader.slice(7);

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.userId = user.id;
  req.accessToken = token;

  // Fetch profile
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  req.userProfile = profile ?? undefined;

  next();
}

/**
 * Require a minimum subscription tier. Must be used AFTER requireAuth.
 * Free-tier users get gated from AI-powered features.
 */
export function requireTier(...allowedTiers: Array<'free' | 'student' | 'family'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const tier = req.userProfile?.subscription_tier ?? 'free';
    if (allowedTiers.includes(tier as 'free' | 'student' | 'family')) {
      return next();
    }
    return res.status(403).json({
      error: 'This feature requires a paid subscription',
      requiredTier: allowedTiers[0],
      currentTier: tier,
    });
  };
}

// Optional auth - doesn't fail if no token, just sets user if present
export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.slice(7);
  const { data: { user } } = await supabaseAdmin.auth.getUser(token);

  if (user) {
    req.userId = user.id;
    req.accessToken = token;

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    req.userProfile = profile ?? undefined;
  }

  next();
}
