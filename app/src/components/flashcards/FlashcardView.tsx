import { useState, useCallback, useMemo, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLeitner } from '../../hooks/useLeitner';
import { useKeyboard } from '../../hooks/useKeyboard';
import { ChapterFilter } from '../layout/ChapterFilter';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';

export function FlashcardView() {
  const { content, selectedChapter, setSelectedChapter } = useApp();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    // Bloquear scroll vertical del body mientras estemos en la vista de flashcards
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
    };
  }, []);

  const filteredCards = useMemo(() => {
    if (!content) return [];
    return selectedChapter === 'todos'
      ? content.flashcards
      : content.flashcards.filter((fc) => fc.chapterId === selectedChapter);
  }, [content, selectedChapter]);

  const { counts, studyQueue, markCard, getBox, startNewSession, sessionCount } = useLeitner(filteredCards);

  const [pointerStart, setPointerStart] = useState<{ x: number, y: number } | null>(null);
  const [pointerEnd, setPointerEnd] = useState<{ x: number, y: number } | null>(null);
  const minSwipeDistance = 50;

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return; // ignore right click
    setPointerEnd(null);
    setPointerStart({ x: e.clientX, y: e.clientY });
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (pointerStart) {
      setPointerEnd({ x: e.clientX, y: e.clientY });
    }
  };

  const onPointerUp = () => {
    if (!pointerStart || !pointerEnd) {
      setPointerStart(null);
      return;
    }
    const distanceX = pointerStart.x - pointerEnd.x;
    const distanceY = pointerStart.y - pointerEnd.y;
    
    // Si la persona deslizo mas en vertical (scroll) que en horizontal, se ignora
    if (Math.abs(distanceY) > Math.abs(distanceX)) {
      setPointerStart(null);
      setPointerEnd(null);
      return;
    }

    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goNext();
    } else if (isRightSwipe) {
      goPrev();
    }
    
    setPointerStart(null);
    setPointerEnd(null);
  };

  const onPointerCancel = () => {
    setPointerStart(null);
    setPointerEnd(null);
  };

  // Resetear el índice cuando cambian las cards filtradas (ej. cambio de capítulo) o cuando se inicia una nueva sesión
  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [filteredCards, sessionCount]);

  const currentCard = studyQueue[index] ?? null;

  const flip = useCallback(() => setFlipped((f) => !f), []);

  const goNext = useCallback(() => {
    if (index < studyQueue.length) {
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
    if (index < studyQueue.length) {
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

  const isSessionFinished = index >= studyQueue.length;

  if (isSessionFinished) {
    const currentChapterIndex = content.chapters.findIndex((c) => c.id === selectedChapter);
    const nextChapter = currentChapterIndex >= 0 && currentChapterIndex < content.chapters.length - 1 
      ? content.chapters[currentChapterIndex + 1] 
      : null;

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
        <div className="text-center py-16 max-w-sm mx-auto animate-fadeUp">
          <h2 className="text-xl font-medium text-stone-700 dark:text-zinc-300 mb-3">Sesión completada</h2>
          <p className="text-stone-500 dark:text-zinc-400 text-sm leading-relaxed">
            Has repasado todas las flashcards para esta sesión.
          </p>
          <button
            onClick={startNewSession}
            className="mt-8 px-5 py-2.5 w-full text-sm font-medium bg-stone-800 dark:bg-zinc-200 text-stone-100 dark:text-zinc-800 rounded-lg hover:bg-stone-900 dark:hover:bg-white active:scale-[0.98] transition-all"
          >
            Nueva sesión
          </button>
          
          {nextChapter && (
            <div className="mt-8 pt-8 border-t border-stone-200 dark:border-zinc-800/80">
              <p className="text-xs uppercase tracking-wider text-stone-400 dark:text-zinc-500 mb-3">
                Siguiente capítulo
              </p>
              <button
                onClick={() => {
                  setSelectedChapter(nextChapter.id);
                  startNewSession();
                }}
                className="w-full relative px-4 py-3 text-left bg-stone-50 dark:bg-zinc-800/50 hover:bg-stone-100 dark:hover:bg-zinc-800 border border-stone-200 dark:border-zinc-700/50 rounded-xl transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-stone-400 dark:text-zinc-500 block mb-1">
                      {nextChapter.number}
                    </span>
                    <span className="text-sm font-medium text-stone-700 dark:text-zinc-300">
                      {nextChapter.title}
                    </span>
                  </div>
                  <span className="text-stone-300 dark:text-zinc-600 group-hover:text-stone-500 dark:group-hover:text-zinc-400 transition-colors">
                    &rarr;
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="overscroll-none touch-none">
      {/* Controles superiores - ancho completo */}
      <div className="flex items-end gap-3 mb-6">
        <ChapterFilter />
        <button
          onClick={startNewSession}
          className="shrink-0 p-2 text-stone-500 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300 bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          title="Nueva sesión"
        >
          <RotateCcw size={16} strokeWidth={1.75} />
        </button>
      </div>

      {/* Contenido centrado */}
      <div className="max-w-2xl mx-auto">

      {/* Indicador de cajas */}
      <ProgressBar counts={counts} current={index + 1} total={studyQueue.length} />

      {/* Card */}
      <div 
        className="mt-4 animate-fadeUp" 
        key={currentCard?.id}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {currentCard && (
          <Card
            front={currentCard.front}
            back={currentCard.back}
            flipped={flipped}
            onFlip={flip}
            mnemonic={currentCard.mnemonic}
            box={getBox(currentCard.id)}
          />
        )}
      </div>

      {/* Rating + Navigation */}
      <div className="mt-5 flex items-center gap-2">
        <button
          onClick={goPrev}
          disabled={index === 0}
          aria-label="Card anterior"
          className="p-2.5 rounded-xl text-stone-400 dark:text-zinc-600 hover:bg-stone-100 dark:hover:bg-zinc-800/60 disabled:opacity-20 transition-colors"
        >
          &larr;
        </button>
        <button
          onClick={() => rate(1)}
          aria-label="No la se"
          className="flex-1 py-2.5 text-sm font-medium bg-rose-50 border border-rose-200/60 dark:bg-rose-950/30 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-950/50 active:scale-[0.98] transition-all"
        >
          No la sé
        </button>
        <button
          onClick={() => rate(2)}
          aria-label="Mas o menos"
          className="flex-1 py-2.5 text-sm font-medium bg-amber-50 border border-amber-200/60 dark:bg-amber-950/30 dark:border-amber-900/40 text-amber-700 dark:text-amber-300 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-950/50 active:scale-[0.98] transition-all"
        >
          Más o menos
        </button>
        <button
          onClick={() => rate(3)}
          aria-label="La se"
          className="flex-1 py-2.5 text-sm font-medium bg-emerald-50 border border-emerald-200/60 dark:bg-emerald-950/30 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-950/50 active:scale-[0.98] transition-all"
        >
          La sé
        </button>
        <button
          onClick={goNext}
          disabled={index >= studyQueue.length - 1}
          aria-label="Card siguiente"
          className="p-2.5 rounded-xl text-stone-400 dark:text-zinc-600 hover:bg-stone-100 dark:hover:bg-zinc-800/60 disabled:opacity-20 transition-colors"
        >
          &rarr;
        </button>
      </div>
      </div>
    </div>
  );
}
