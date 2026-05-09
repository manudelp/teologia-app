import { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useSearch } from '../../hooks/useSearch';
import type { SearchResult } from '../../hooks/useSearch';

interface Props {
  open: boolean;
  onClose: () => void;
  onNavigate: (result: SearchResult) => void;
}

export function SearchModal({ open, onClose, onNavigate }: Props) {
  const { content } = useApp();
  const { query, setQuery, results } = useSearch(content);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, setQuery]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const hasResults = results.flashcards.length > 0 || results.chuleta.length > 0 || results.preguntas.length > 0;

  const chapterName = (chapterId: string) => {
    const ch = content?.chapters.find((c) => c.id === chapterId);
    return ch ? `${ch.number}. ${ch.title}` : chapterId;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      <div
        className="animate-fadeUp relative w-full max-w-2xl mx-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="p-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en flashcards, repaso, preguntas..."
            className="w-full px-4 py-3 text-sm bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-xl text-stone-900 dark:text-zinc-100 placeholder:text-stone-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500/70"
            aria-label="Busqueda global"
          />
        </div>

        {/* Resultados */}
        <div className="max-h-[50vh] overflow-y-auto px-4 pb-4">
          {query.trim() && !hasResults && (
            <p className="text-center text-sm text-stone-400 dark:text-zinc-600 py-6">Sin resultados</p>
          )}

          {results.flashcards.length > 0 && (
            <ResultGroup label="Flashcards" items={results.flashcards} chapterName={chapterName} onSelect={onNavigate} />
          )}
          {results.chuleta.length > 0 && (
            <ResultGroup label="Repaso" items={results.chuleta} chapterName={chapterName} onSelect={onNavigate} />
          )}
          {results.preguntas.length > 0 && (
            <ResultGroup label="Preguntas" items={results.preguntas} chapterName={chapterName} onSelect={onNavigate} />
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-center gap-4 text-xs text-stone-400 dark:text-zinc-600">
          <span><kbd className="px-1.5 py-0.5 bg-stone-100 dark:bg-zinc-800 rounded text-[10px] font-mono">esc</kbd> cerrar</span>
        </div>
      </div>
    </div>
  );
}

function ResultGroup({ label, items, chapterName, onSelect }: {
  label: string;
  items: SearchResult[];
  chapterName: (id: string) => string;
  onSelect: (r: SearchResult) => void;
}) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-stone-400 dark:text-zinc-600 px-2 py-1.5">{label}</p>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-stone-50 dark:hover:bg-zinc-800/60 transition-colors flex items-center justify-between gap-3"
        >
          <p className="text-sm text-stone-700 dark:text-zinc-300 truncate">{item.title}</p>
          <p className="text-[10px] text-stone-400 dark:text-zinc-600 shrink-0">{chapterName(item.chapterId)}</p>
        </button>
      ))}
    </div>
  );
}
