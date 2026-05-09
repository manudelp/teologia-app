import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';

function ActivityHeatmap({ log }: { log: Record<string, number> }) {
  const { days, maxCount } = useMemo(() => {
    const today = new Date();
    const days: { date: string; count: number; label: string }[] = [];
    for (let i = 20; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString('es', { day: 'numeric', month: 'short' });
      days.push({ date: key, count: log[key] || 0, label });
    }
    const maxCount = Math.max(1, ...days.map((d) => d.count));
    return { days, maxCount };
  }, [log]);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-stone-100 dark:bg-zinc-800';
    const intensity = count / maxCount;
    if (intensity <= 0.25) return 'bg-emerald-200 dark:bg-emerald-900';
    if (intensity <= 0.5) return 'bg-emerald-300 dark:bg-emerald-700';
    if (intensity <= 0.75) return 'bg-emerald-400 dark:bg-emerald-500';
    return 'bg-emerald-500 dark:bg-emerald-400';
  };

  return (
    <div className="flex gap-1">
      {days.map((day) => (
        <div
          key={day.date}
          className={`flex-1 aspect-square rounded-sm ${getColor(day.count)}`}
          title={`${day.label}: ${day.count} dominados`}
        />
      ))}
    </div>
  );
}

export function StatsView() {
  const { content, progress, setProgress } = useApp();

  const stats = useMemo(() => {
    if (!content) return null;

    const chapters = content.chapters.map((ch) => {
      const chFlashcards = content.flashcards.filter((fc) => fc.chapterId === ch.id);
      const chQuestions = content.questions.filter((q) => q.chapterId === ch.id);
      const fcDominadas = chFlashcards.filter((fc) => progress.leitner.boxes[fc.id] === 3).length;
      const qDominadas = chQuestions.filter((q) => progress.questions.status[q.id] === 'dominada').length;
      const total = chFlashcards.length + chQuestions.length;
      const dominadas = fcDominadas + qDominadas;
      const pct = total > 0 ? Math.round((dominadas / total) * 100) : 0;
      return { chapter: ch, total, dominadas, pct };
    });

    const allFc = content.flashcards;
    const box1 = allFc.filter((fc) => (progress.leitner.boxes[fc.id] ?? 1) === 1).length;
    const box2 = allFc.filter((fc) => progress.leitner.boxes[fc.id] === 2).length;
    const box3 = allFc.filter((fc) => progress.leitner.boxes[fc.id] === 3).length;
    const totalQuestions = content.questions.length;
    const totalQDominadas = content.questions.filter((q) => progress.questions.status[q.id] === 'dominada').length;
    const totalItems = allFc.length + totalQuestions;
    const totalDominadas = box3 + totalQDominadas;

    return { chapters, box1, box2, box3, totalFc: allFc.length, totalQuestions, totalQDominadas, totalItems, totalDominadas };
  }, [content, progress]);

  if (!content || !stats) return null;

  const handleReset = () => {
    if (window.confirm('Esto borra todo tu progreso (Leitner y preguntas). Seguro?')) {
      setProgress((prev) => ({
        ...prev,
        leitner: { boxes: {}, lastSeen: {}, sessionCount: 0 },
        questions: { status: {} },
      }));
    }
  };

  const sorted = [...stats.chapters].sort((a, b) => a.pct - b.pct);
  const globalPct = stats.totalItems > 0 ? Math.round((stats.totalDominadas / stats.totalItems) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-12">
        <p className="font-serif text-5xl sm:text-6xl text-stone-800 dark:text-zinc-200">
          {stats.totalDominadas} <span className="text-stone-300 dark:text-zinc-700">/</span> {stats.totalItems}
        </p>
        <p className="text-sm text-stone-500 dark:text-zinc-500 mt-2">dominados en total</p>
        <div className="mt-4 w-full h-2 bg-stone-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-400 dark:bg-emerald-500 rounded-full transition-all"
            style={{ width: `${globalPct}%` }}
          />
        </div>
        <p className="text-xs text-stone-400 dark:text-zinc-600 mt-1">{globalPct}%</p>
      </div>

      {/* Actividad */}
      <div className="mb-12">
        <h3 className="font-serif text-lg text-stone-800 dark:text-zinc-200 mb-4">Actividad</h3>
        <ActivityHeatmap log={progress.activityLog || {}} />
      </div>

      {/* Distribucion Leitner */}
      <div className="mb-12">
        <h3 className="font-serif text-lg text-stone-800 dark:text-zinc-200 mb-4">Distribucion Leitner</h3>
        <div className="space-y-3">
          <LeitnerBar label="Caja 1" count={stats.box1} total={stats.totalFc} color="bg-rose-300 dark:bg-rose-500" />
          <LeitnerBar label="Caja 2" count={stats.box2} total={stats.totalFc} color="bg-amber-300 dark:bg-amber-500" />
          <LeitnerBar label="Caja 3" count={stats.box3} total={stats.totalFc} color="bg-emerald-300 dark:bg-emerald-500" />
        </div>
      </div>

      {/* Progreso por capitulo */}
      <div className="mb-12">
        <h3 className="font-serif text-lg text-stone-800 dark:text-zinc-200 mb-4">Por capitulo</h3>
        <div className="space-y-3">
          {sorted.map(({ chapter, pct, dominadas, total }, i) => (
            <div
              key={chapter.id}
              className={`flex items-center gap-3 py-2 ${i === 0 && pct < 50 ? 'border-l-2 border-rose-300 dark:border-rose-600 pl-3' : ''}`}
            >
              <span className="text-xs font-serif text-stone-400 dark:text-zinc-600 w-6 shrink-0">{chapter.number}</span>
              <span className="text-sm text-stone-700 dark:text-zinc-300 flex-1 truncate">{chapter.title}</span>
              <div className="w-24 h-1.5 bg-stone-100 dark:bg-zinc-800 rounded-full overflow-hidden shrink-0">
                <div
                  className={`h-full rounded-full transition-all ${pct >= 80 ? 'bg-emerald-400' : pct >= 40 ? 'bg-amber-400' : 'bg-rose-400'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-stone-400 dark:text-zinc-600 w-16 text-right shrink-0">{dominadas}/{total}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className="text-center pt-8 border-t border-stone-100 dark:border-zinc-800/50">
        <button
          onClick={handleReset}
          className="text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 px-4 py-2 rounded-lg transition-colors"
        >
          Resetear todo el progreso
        </button>
      </div>
    </div>
  );
}

function LeitnerBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-stone-500 dark:text-zinc-500 w-12 shrink-0">{label}</span>
      <div className="flex-1 h-3 bg-stone-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-stone-500 dark:text-zinc-500 w-8 text-right">{count}</span>
    </div>
  );
}
