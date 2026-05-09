import { useState, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import type { ContentData } from '../../types';

type MergeReport = {
  newFlashcards: number;
  updatedFlashcards: number;
  newCheatsheet: number;
  updatedCheatsheet: number;
  newQuestions: number;
  updatedQuestions: number;
  newChapters: number;
};

export function ImportView() {
  const { content, setContent } = useApp();
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [report, setReport] = useState<MergeReport | null>(null);
  const [parsed, setParsed] = useState<ContentData | null>(null);

  const validate = useCallback(() => {
    setError('');
    setSuccess('');
    setReport(null);
    setParsed(null);

    let data: Partial<ContentData>;
    try {
      data = JSON.parse(text);
    } catch {
      setError('JSON invalido. Revisa la sintaxis.');
      return;
    }

    const hasContent = data.flashcards || data.cheatsheet || data.questions || data.chapters;
    if (!hasContent) {
      setError('El JSON debe tener al menos una de: chapters, flashcards, cheatsheet, questions.');
      return;
    }

    if (!content) return;

    const existingFcIds = new Set(content.flashcards.map((f) => f.id));
    const existingChIds = new Set(content.cheatsheet.map((c) => c.id));
    const existingQIds = new Set(content.questions.map((q) => q.id));
    const existingChapterIds = new Set(content.chapters.map((c) => c.id));

    const incomingFc = data.flashcards ?? [];
    const incomingCh = data.cheatsheet ?? [];
    const incomingQ = data.questions ?? [];
    const incomingChapters = data.chapters ?? [];

    const r: MergeReport = {
      newFlashcards: incomingFc.filter((f) => !existingFcIds.has(f.id)).length,
      updatedFlashcards: incomingFc.filter((f) => existingFcIds.has(f.id)).length,
      newCheatsheet: incomingCh.filter((c) => !existingChIds.has(c.id)).length,
      updatedCheatsheet: incomingCh.filter((c) => existingChIds.has(c.id)).length,
      newQuestions: incomingQ.filter((q) => !existingQIds.has(q.id)).length,
      updatedQuestions: incomingQ.filter((q) => existingQIds.has(q.id)).length,
      newChapters: incomingChapters.filter((c) => !existingChapterIds.has(c.id)).length,
    };

    setReport(r);
    setParsed(data as ContentData);
  }, [text, content]);

  const confirm = useCallback(() => {
    if (!parsed || !content) return;

    const mergeById = <T extends { id: string }>(existing: T[], incoming: T[]): T[] => {
      const map = new Map(existing.map((item) => [item.id, item]));
      incoming.forEach((item) => map.set(item.id, item));
      return Array.from(map.values());
    };

    const merged: ContentData = {
      metadata: parsed.metadata ?? content.metadata,
      chapters: mergeById(content.chapters, parsed.chapters ?? []),
      flashcards: mergeById(content.flashcards, parsed.flashcards ?? []),
      cheatsheet: mergeById(content.cheatsheet, parsed.cheatsheet ?? []),
      questions: mergeById(content.questions, parsed.questions ?? []),
    };

    localStorage.setItem('teo-custom-content', JSON.stringify(merged));
    setContent(merged);

    setText('');
    setReport(null);
    setParsed(null);
    setError('');
    setSuccess('Contenido importado correctamente.');
  }, [parsed, content, setContent]);

  const resetToOriginal = useCallback(() => {
    if (window.confirm('Esto descarta todo contenido importado y vuelve al JSON original. Tu progreso se mantiene. Seguro?')) {
      localStorage.removeItem('teo-custom-content');
      window.location.reload();
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-serif text-2xl text-stone-800 dark:text-zinc-200 mb-2">Importar contenido</h2>
      <p className="text-sm text-stone-500 dark:text-zinc-500 mb-6 leading-relaxed">
        Pega un JSON con la estructura del contenido (chapters, flashcards, cheatsheet, questions).
        Se hara merge no destructivo: tu progreso sobre cards existentes se mantiene.
      </p>

      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setSuccess(''); }}
        className="w-full h-64 p-4 text-xs font-mono bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-xl text-stone-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-amber-500/70 resize-y leading-relaxed"
        placeholder='{"chapters": [...], "flashcards": [...], ...}'
        aria-label="JSON de contenido a importar"
      />

      {error && (
        <div className="mt-3 px-4 py-3 bg-red-50 dark:bg-red-950/20 rounded-xl text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl text-sm text-emerald-700 dark:text-emerald-300">
          {success}
        </div>
      )}

      <div className="mt-4 flex gap-3">
        <button
          onClick={validate}
          disabled={!text.trim()}
          className="px-5 py-2.5 text-sm font-medium bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-40 active:scale-[0.98] transition-all"
        >
          Validar
        </button>
        {report && (
          <button
            onClick={confirm}
            className="px-5 py-2.5 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all"
          >
            Confirmar merge
          </button>
        )}
      </div>

      {/* Resumen del merge */}
      {report && (
        <div className="mt-6 p-5 rounded-xl bg-stone-100/50 dark:bg-zinc-900/50 text-sm">
          <p className="font-medium text-stone-700 dark:text-zinc-300 mb-3">Resumen del merge:</p>
          <ul className="space-y-1.5 text-stone-600 dark:text-zinc-400">
            {report.newChapters > 0 && <li>+ {report.newChapters} capitulos nuevos</li>}
            {report.newFlashcards > 0 && <li>+ {report.newFlashcards} flashcards nuevas</li>}
            {report.updatedFlashcards > 0 && <li>&circlearrowright; {report.updatedFlashcards} flashcards actualizadas</li>}
            {report.newCheatsheet > 0 && <li>+ {report.newCheatsheet} secciones de repaso nuevas</li>}
            {report.updatedCheatsheet > 0 && <li>&circlearrowright; {report.updatedCheatsheet} secciones actualizadas</li>}
            {report.newQuestions > 0 && <li>+ {report.newQuestions} preguntas nuevas</li>}
            {report.updatedQuestions > 0 && <li>&circlearrowright; {report.updatedQuestions} preguntas actualizadas</li>}
          </ul>
        </div>
      )}

      {/* Volver al original */}
      <div className="mt-12 pt-6 border-t border-stone-100 dark:border-zinc-800/50">
        <button
          onClick={resetToOriginal}
          className="text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 px-4 py-2 rounded-lg transition-colors"
        >
          Volver al contenido original
        </button>
        <p className="text-xs text-stone-400 dark:text-zinc-600 mt-1">
          Descarta todo lo importado. Tu progreso de estudio se mantiene.
        </p>
      </div>
    </div>
  );
}
