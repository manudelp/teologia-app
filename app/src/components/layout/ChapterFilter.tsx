import { useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export function ChapterFilter() {
  const { content, selectedChapter, setSelectedChapter } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll al activo cuando cambia
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = activeRef.current;
      const left = el.offsetLeft - container.offsetLeft - 12;
      container.scrollTo({ left, behavior: 'smooth' });
    }
  }, [selectedChapter]);

  if (!content) return null;

  return (
    <div className="no-print min-w-0 flex-1">
      <p className="text-[10px] font-medium uppercase tracking-wider text-stone-400 dark:text-zinc-600 mb-1.5">Capitulo</p>
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto scrollbar-hide"
      >
        <Pill
          ref={selectedChapter === 'todos' ? activeRef : null}
          active={selectedChapter === 'todos'}
          onClick={() => setSelectedChapter('todos')}
          label="Todos"
          title="Todos los capitulos"
        />
        {content.chapters.map((ch) => (
          <Pill
            key={ch.id}
            ref={selectedChapter === ch.id ? activeRef : null}
            active={selectedChapter === ch.id}
            onClick={() => setSelectedChapter(ch.id)}
            label={ch.number}
            title={`${ch.number}. ${ch.title}`}
          />
        ))}
      </div>
    </div>
  );
}

import { forwardRef } from 'react';

interface PillProps {
  active: boolean;
  onClick: () => void;
  label: string;
  title: string;
}

const Pill = forwardRef<HTMLButtonElement, PillProps>(({ active, onClick, label, title }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    title={title}
    className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
      active
        ? 'bg-stone-800 dark:bg-zinc-200 text-white dark:text-zinc-900'
        : 'bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-500 hover:bg-stone-200 dark:hover:bg-zinc-700 hover:text-stone-700 dark:hover:text-zinc-300'
    }`}
  >
    {label}
  </button>
));
