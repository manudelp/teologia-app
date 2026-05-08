import { useState, useCallback, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLeitner } from '../../hooks/useLeitner';
import { useKeyboard } from '../../hooks/useKeyboard';
import { ChapterFilter } from '../layout/ChapterFilter';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';

export function FlashcardView() {
  const { content, selectedChapter } = useApp();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const filteredCards = useMemo(() => {
    if (!content) return [];
    return selectedChapter === 'todos'
      ? content.flashcards
      : content.flashcards.filter((fc) => fc.chapterId === selectedChapter);
  }, [content, selectedChapter]);

  const { counts, studyQueue, markCard, getBox, startNewSession } = useLeitner(filteredCards);

  const currentCard = studyQueue[index] ?? null;

  const flip = useCallback(() => setFlipped((f) => !f), []);

  const goNext = useCallback(() => {
    if (index < studyQueue.length - 1) {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  }, [index, studyQueue.length]);

  const goPrev = useCallback(() => {
    if (index > 0) {
      setIndex((i) => i - 1);
      setFlipped(false);
    }
  }, [index]);

  const rate = useCallback((rating: 1 | 2 | 3) => {
    if (!currentCard) return;
    markCard(currentCard.id, rating);
    if (index < studyQueue.length - 1) {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  }, [currentCard, markCard, index, studyQueue.length]);

  useKeyboard({ onFlip: flip, onRate: rate, onPrev: goPrev, onNext: goNext }, true);

  if (!content) return null;

  if (studyQueue.length === 0) {
    const hasCards = filteredCards.length > 0;
    return (
      <div>
        <div className="flex items-end gap-3 mb-8">
          <ChapterFilter />
          <button
            onClick={startNewSession}
            className="shrink-0 px-3 py-1.5 text-xs font-medium text-stone-500 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300 bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Nueva sesion
          </button>
        </div>
        <div className="text-center py-16 max-w-sm mx-auto">
          <p className="text-4xl text-stone-300 dark:text-zinc-700 mb-4">{hasCards ? '\u2713' : '\u2014'}</p>
          <p className="text-stone-500 dark:text-zinc-400 text-sm leading-relaxed">
            {hasCards
              ? 'Todas las cards de este capitulo estan en caja 3 y no toca repasarlas en esta sesion.'
              : 'No hay flashcards para el capitulo seleccionado.'}
          </p>
          {hasCards && (
            <button
              onClick={startNewSession}
              className="mt-6 px-5 py-2.5 text-sm font-medium bg-amber-600 text-white rounded-lg hover:bg-amber-700 active:scale-[0.98] transition-all"
            >
              Iniciar nueva sesion
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Controles superiores - ancho completo */}
      <div className="flex items-end gap-3 mb-6">
        <ChapterFilter />
        <button
          onClick={startNewSession}
          className="shrink-0 px-3 py-1.5 text-xs font-medium text-stone-500 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300 bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          title="Incrementa el contador de sesion para rotar cards de caja 3"
        >
          Nueva sesion
        </button>
      </div>

      {/* Contenido centrado */}
      <div className="max-w-2xl mx-auto">

      {/* Indicador de cajas */}
      <ProgressBar counts={counts} />

      {/* Card */}
      <div className="mt-6 animate-fadeUp" key={currentCard?.id}>
        {currentCard && (
          <Card
            front={currentCard.front}
            back={currentCard.back}
            flipped={flipped}
            onFlip={flip}
            mnemonic={currentCard.mnemonic}
            box={getBox(currentCard.id)}
            position={`${index + 1} / ${studyQueue.length}`}
          />
        )}
      </div>

      {/* Botones de rating */}
      <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          onClick={() => rate(1)}
          aria-label="No la se, volver a caja 1"
          className="flex-1 py-3 px-4 text-sm font-medium bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-950/50 active:scale-[0.98] transition-all"
        >
          <span className="text-xs text-rose-400 dark:text-rose-500 mr-1">1</span> No la se
        </button>
        <button
          onClick={() => rate(2)}
          aria-label="Mas o menos, subir a caja 2"
          className="flex-1 py-3 px-4 text-sm font-medium bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-950/50 active:scale-[0.98] transition-all"
        >
          <span className="text-xs text-amber-400 dark:text-amber-500 mr-1">2</span> Mas o menos
        </button>
        <button
          onClick={() => rate(3)}
          aria-label="La se, subir de caja"
          className="flex-1 py-3 px-4 text-sm font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-950/50 active:scale-[0.98] transition-all"
        >
          <span className="text-xs text-emerald-400 dark:text-emerald-500 mr-1">3</span> La se
        </button>
      </div>

      {/* Navegacion manual */}
      <div className="mt-4 flex items-center justify-between text-sm text-stone-400 dark:text-zinc-500">
        <button
          onClick={goPrev}
          disabled={index === 0}
          aria-label="Card anterior"
          className="px-3 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800/60 disabled:opacity-30 transition-colors"
        >
          &larr;
        </button>
        <span aria-live="polite" className="text-xs">{index + 1} / {studyQueue.length}</span>
        <button
          onClick={goNext}
          disabled={index >= studyQueue.length - 1}
          aria-label="Card siguiente"
          className="px-3 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-zinc-800/60 disabled:opacity-30 transition-colors"
        >
          &rarr;
        </button>
      </div>

      {/* Ayuda de atajos */}
      <p className="mt-6 text-center text-xs text-stone-400 dark:text-zinc-600 hidden sm:block">
        Espacio = voltear &middot; 1/2/3 = marcar &middot; &larr; &rarr; = navegar &middot; ? = atajos
      </p>
      </div>
    </div>
  );
}
