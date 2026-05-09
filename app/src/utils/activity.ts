import type { UserProgress } from '../types';

export function recordActivity(prev: UserProgress): UserProgress {
  const today = new Date().toISOString().slice(0, 10);
  const log = { ...prev.activityLog };
  log[today] = (log[today] || 0) + 1;
  return { ...prev, activityLog: log };
}
