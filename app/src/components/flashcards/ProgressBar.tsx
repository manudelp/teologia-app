interface Props {
  counts: { 1: number; 2: number; 3: number };
}

export function ProgressBar({ counts }: Props) {
  const total = counts[1] + counts[2] + counts[3];
  if (total === 0) return null;

  return (
    <div className="flex items-center justify-center gap-4 text-xs font-medium">
      <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
        Caja 1: {counts[1]}
      </span>
      <span className="text-stone-300 dark:text-zinc-700">&middot;</span>
      <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
        Caja 2: {counts[2]}
      </span>
      <span className="text-stone-300 dark:text-zinc-700">&middot;</span>
      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
        Caja 3: {counts[3]}
      </span>
    </div>
  );
}
