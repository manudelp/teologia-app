import { useRef, useEffect, useState } from 'react';

interface Props {
  front: string;
  back: string;
  flipped: boolean;
  onFlip: () => void;
  mnemonic?: string;
  box: 1 | 2 | 3;
}

const boxBg = {
  1: 'bg-rose-50/60 border border-rose-200/60 dark:bg-rose-950/20 dark:border-rose-900/30',
  2: 'bg-amber-50/60 border border-amber-200/60 dark:bg-amber-950/20 dark:border-amber-900/30',
  3: 'bg-emerald-50/60 border border-emerald-200/60 dark:bg-emerald-950/20 dark:border-emerald-900/30',
};

// Calcula el font-size maximo que permite que todo el contenido entre en el contenedor
function useAutoFit(text: string, hasMnemonic: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !textRef.current) return;

    requestAnimationFrame(() => {
      const container = containerRef.current;
      const content = contentRef.current;
      const el = textRef.current;
      if (!container || !content || !el) return;

      // Espacio disponible: alto del contenedor menos padding superior e inferior
      // (ajustado para el py-8 en mobile que suma 64px)
      const availableHeight = container.clientHeight - 64;

      let min = 12;
      let max = 28;

      while (max - min > 1) {
        const mid = Math.floor((min + max) / 2);
        el.style.fontSize = `${mid}px`;
        // Medir el contenido completo (texto + mnemotecnica)
        if (content.scrollHeight <= availableHeight) {
          min = mid;
        } else {
          max = mid;
        }
      }

      el.style.fontSize = '';
      setFontSize(min);
    });
  }, [text, hasMnemonic]);

  return { containerRef, contentRef, textRef, fontSize };
}

export function Card({ front, back, flipped, onFlip, mnemonic, box }: Props) {
  const { containerRef, contentRef, textRef, fontSize } = useAutoFit(back, !!mnemonic);

  return (
    <div
      onClick={onFlip}
      onKeyDown={(e) => { if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); onFlip(); } }}
      className="card-flip-container w-full min-h-[260px] sm:min-h-[400px] cursor-pointer select-none"
      role="button"
      aria-label={flipped ? 'Dorso de la card. Click o espacio para voltear' : 'Frente de la card. Click o espacio para voltear'}
      tabIndex={0}
    >
      <div className={`card-flip-inner min-h-[260px] sm:min-h-[400px] ${flipped ? 'flipped' : ''}`}>
        {/* Frente */}
        <div className={`card-flip-face rounded-2xl ${boxBg[box]} px-6 py-8 sm:px-8 sm:py-12`}>
          <p className="font-serif text-2xl sm:text-3xl leading-snug text-stone-800 dark:text-zinc-100">{front}</p>
        </div>

        {/* Dorso */}
        <div
          ref={containerRef}
          className={`card-flip-face card-flip-back rounded-2xl ${boxBg[box]} px-6 py-8 sm:px-8 sm:py-12`}
        >
          <div ref={contentRef} className="w-full">
            <p
              ref={textRef}
              style={{ fontSize: `${fontSize}px` }}
              className="leading-relaxed text-stone-700 dark:text-zinc-300 whitespace-pre-line text-left w-full"
            >
              {back}
            </p>
            {mnemonic && (
              <div className="mt-4 w-full px-4 py-3 bg-amber-50/50 dark:bg-amber-950/20 border-l-2 border-amber-400 dark:border-amber-600 rounded-r-lg">
                <p className="font-serif italic text-sm text-amber-800 dark:text-amber-300">{mnemonic}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
