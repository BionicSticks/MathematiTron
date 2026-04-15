import { supabaseAdmin } from '../../db/client';

const DECAY_THRESHOLD_DAYS = 14;
const DECAY_AMOUNT = 2; // -2 mastery per period past threshold
const DECAY_PERIOD_DAYS = 7; // decay every 7 days after threshold
const MIN_MASTERY_AFTER_DECAY = 10; // don't decay below this if they've practiced

/**
 * Apply time decay to mastery for concepts not practiced in 14+ days.
 * Called on login / dashboard load. Idempotent — uses last_practiced_at
 * and updated_at to avoid double-decaying.
 */
export async function applyTimeDecay(userId: string): Promise<number> {
  const now = new Date();
  const { data: masteryRows, error } = await supabaseAdmin
    .from('student_mastery')
    .select('*')
    .eq('user_id', userId)
    .gt('mastery_level', 0)
    .gt('total_attempts', 0);

  if (error || !masteryRows?.length) return 0;

  let decayedCount = 0;

  for (const row of masteryRows) {
    const lastPracticed = row.last_practiced_at
      ? new Date(row.last_practiced_at)
      : new Date(row.first_seen_at);

    const daysSince = Math.floor((now.getTime() - lastPracticed.getTime()) / 86400000);

    if (daysSince < DECAY_THRESHOLD_DAYS) continue;

    // Check if we already decayed recently (within last DECAY_PERIOD_DAYS)
    const lastUpdated = new Date(row.updated_at);
    const daysSinceUpdate = Math.floor((now.getTime() - lastUpdated.getTime()) / 86400000);
    if (daysSinceUpdate < DECAY_PERIOD_DAYS) continue;

    // Calculate decay: -2 per period past threshold
    const periodsOverdue = Math.floor((daysSince - DECAY_THRESHOLD_DAYS) / DECAY_PERIOD_DAYS) + 1;
    const totalDecay = DECAY_AMOUNT * Math.min(periodsOverdue, 5); // cap at -10 per check
    const newMastery = Math.max(MIN_MASTERY_AFTER_DECAY, row.mastery_level - totalDecay);

    if (newMastery >= row.mastery_level) continue;

    await supabaseAdmin
      .from('student_mastery')
      .update({
        mastery_level: newMastery,
        updated_at: now.toISOString(),
      })
      .eq('id', row.id);

    decayedCount++;
  }

  return decayedCount;
}
