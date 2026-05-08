import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChapterFilter } from '../layout/ChapterFilter';
import { ChapterSection } from './ChapterSection';

export function ChuletaView() {
  const { content, selectedChapter } = useApp();
  const [showMnemonics, setShowMnemonics] = useState(true);

  if (!content) return null;

  const sections = selectedChapter === 'todos'
    ? content.cheatsheet
    : content.cheatsheet.filter((s) => s.chapterId === selectedChapter);

  const grouped = content.chapters
    .filter((ch) => selectedChapter === 'todos' || ch.id === selectedChapter)
    .map((ch) => ({
      chapter: ch,
      items: sections.filter((s) => s.chapterId === ch.id),
    }))
    .filter((g) => g.items.length > 0);

  const handlePrint = () => window.print();

  return (
    <div>
      <div className="no-print mb-8">
        <div className="flex items-end gap-3">
          <ChapterFilter />
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setShowMnemonics(!showMnemonics)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                showMnemonics
                  ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                  : 'bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-500 hover:bg-stone-200 dark:hover:bg-zinc-700'
              }`}
              aria-pressed={showMnemonics}
            >
              Mnemo
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-500 hover:bg-stone-200 dark:hover:bg-zinc-700 hover:text-stone-700 dark:hover:text-zinc-300 transition-colors"
            >
              Imprimir
            </button>
          </div>
        </div>
      </div>

      {grouped.map(({ chapter, items }) => (
        <div key={chapter.id} className="mb-16 print-break">
          {/* Header de capitulo estilo libro */}
          <div className="mb-8">
            <p className="font-serif text-4xl sm:text-5xl text-stone-200 dark:text-zinc-800 leading-none">{chapter.number}</p>
            <h2 className="font-serif text-xl sm:text-2xl text-stone-800 dark:text-zinc-200 mt-1">{chapter.title}</h2>
            <p className="text-xs text-stone-400 dark:text-zinc-600 mt-1">{chapter.part}</p>
          </div>
          {items.map((section) => (
            <ChapterSection key={section.id} section={section} showMnemonics={showMnemonics} />
          ))}
        </div>
      ))}

      {grouped.length === 0 && (
        <div className="text-center py-16">
          <p className="text-stone-300 dark:text-zinc-700 text-3xl mb-3">&mdash;</p>
          <p className="text-stone-500 dark:text-zinc-500 text-sm">No hay contenido de repaso para este capitulo.</p>
        </div>
      )}
    </div>
  );
}
