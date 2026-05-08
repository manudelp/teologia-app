import { useMemo, useCallback, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChapterFilter } from '../layout/ChapterFilter';
import { PriorityFilter } from '../layout/PriorityFilter';
import { QuestionCard } from './QuestionCard';
import type { Priority } from '../../types';

export function PreguntasView() {
  const { content, selectedChapter, progress, setProgress } = useApp();
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'todas'>('alta');

  const filtered = useMemo(() => {
    if (!content) return [];
    return content.questions.filter((q) => {
      if (selectedChapter !== 'todos' && q.chapterId !== selectedChapter) return false;
      if (priorityFilter !== 'todas' && q.priority !== priorityFilter) return false;
      return true;
    });
  }, [content, selectedChapter, priorityFilter]);

  const dominadasCount = useMemo(() => {
    return filtered.filter((q) => progress.questions.status[q.id] === 'dominada').length;
  }, [filtered, progress.questions.status]);

  const getStatus = useCallback((id: string) => {
    return progress.questions.status[id] ?? 'pendiente';
  }, [progress.questions.status]);

  const handleMark = useCallback((id: string, status: 'dominada' | 'fallada' | 'pendiente') => {
    setProgress((prev) => {
      const newStatus = { ...prev.questions.status };
      if (status === 'pendiente') {
        delete newStatus[id];
      } else {
        newStatus[id] = status;
      }
      return { ...prev, questions: { status: newStatus } };
    });
  }, [setProgress]);

  if (!content) return null;

  return (
    <div>
      {/* Controles - ancho completo */}
      <div className="flex items-end gap-3 mb-6">
        <ChapterFilter />
        <PriorityFilter value={priorityFilter} onChange={setPriorityFilter} />
      </div>

      {/* Contenido centrado */}
      <div className="max-w-3xl mx-auto">

      {/* Indicador de progreso */}
      <div className="mb-6 text-sm text-stone-500 dark:text-zinc-500">
        Dominadas: <span className="font-medium text-emerald-600 dark:text-emerald-400">{dominadasCount}</span> / {filtered.length}
      </div>

      {/* Lista de preguntas */}
      <div>
        {filtered.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            status={getStatus(q.id)}
            onMark={handleMark}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-stone-300 dark:text-zinc-700 text-3xl mb-3">&mdash;</p>
          <p className="text-stone-500 dark:text-zinc-500 text-sm">
            No hay preguntas con prioridad "{priorityFilter}" para este capitulo.
          </p>
          <p className="text-xs text-stone-400 dark:text-zinc-600 mt-1">
            Proba cambiando el filtro de prioridad o el capitulo.
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
