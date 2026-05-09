interface Props {
  counts: { 1: number; 2: number; 3: number };
  current: number;
  total: number;
}

export function ProgressBar({ counts, current, total }: Props) {
  const totalCards = counts[1] + counts[2] + counts[3];
  if (totalCards === 0) return null;

  const pct = total > 0 ? (current / total) * 100 : 0;
  const mastered = counts[3];
  const masteredPct = totalCards > 0 ? Math.round((mastered / totalCards) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full bg-stone-100 dark:bg-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] text-stone-400 dark:text-zinc-600 shrink-0">
        {current}/{total}
      </span>
      {masteredPct > 0 && (
        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 shrink-0">
          {masteredPct}%
        </span>
      )}
    </div>
  );
}
