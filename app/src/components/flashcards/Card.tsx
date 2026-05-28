import { useRef, useEffect, useState, type ReactNode } from 'react';

interface Props {
  front: string;
  back: string;
  flipped: boolean;
  onFlip: () => void;
  mnemonic?: string;
  box: 1 | 2 | 3;
  examMode?: boolean;
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
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(16);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !textRef.current) return;

    requestAnimationFrame(() => {
      const container = containerRef.current;
      const content = contentRef.current;
      const el = textRef.current;
      if (!container || !content || !el) return;

      const availableHeight = container.clientHeight - 48;
      const MIN_FONT = 11;
      let min = MIN_FONT;
      let max = 24;

      while (max - min > 1) {
        const mid = Math.floor((min + max) / 2);
        el.style.fontSize = `${mid}px`;
        if (content.scrollHeight <= availableHeight) {
          min = mid;
        } else {
          max = mid;
        }
      }

      el.style.fontSize = '';
      setFontSize(min);

      // Check if even at min font it overflows — enable scroll
      el.style.fontSize = `${min}px`;
      setOverflows(content.scrollHeight > availableHeight);
      el.style.fontSize = '';
    });
  }, [text, hasMnemonic]);

  return { containerRef, contentRef, textRef, fontSize, overflows };
}

// Renderiza el texto del dorso respetando marcadores:
// \n = salto de linea, lineas que empiezan con • = bullet, **texto** = negrita
function formatBack(text: string): ReactNode {
  const lines = text.split('\n');
  const elements: ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    elements.push(
      <ul key={`ul-${elements.length}`} className="list-disc list-outside pl-4 space-y-0.5">
        {bulletBuffer.map((b, i) => <li key={i}>{renderInline(b)}</li>)}
      </ul>
    );
    bulletBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
      bulletBuffer.push(trimmed.slice(2));
    } else {
      flushBullets();
      if (trimmed === '') {
        elements.push(<div key={`sp-${elements.length}`} className="h-2" />);
      } else {
        elements.push(<p key={`p-${elements.length}`}>{renderInline(trimmed)}</p>);
      }
    }
  }
  flushBullets();

  return <div className="space-y-1.5">{elements}</div>;
}

function renderInline(text: string): ReactNode {
  // **bold** rendering
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return <>{parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <span key={i} className="font-semibold text-stone-800 dark:text-zinc-100">{p.slice(2, -2)}</span>
      : <span key={i}>{p}</span>
  )}</>;
}

export function Card({ front, back, flipped, onFlip, mnemonic, box, examMode }: Props) {
  const { containerRef, contentRef, textRef, fontSize, overflows } = useAutoFit(back, !!mnemonic);
  const scrolledRef = useRef(false);

  const cardBg = examMode
    ? 'bg-amber-50/40 border-2 border-amber-400/70 dark:bg-amber-950/10 dark:border-amber-500/40'
    : boxBg[box];

  const handleClick = () => {
    if (scrolledRef.current) {
      scrolledRef.current = false;
      return;
    }
    onFlip();
  };

  const handleScroll = () => {
    scrolledRef.current = true;
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => { if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); onFlip(); } }}
      className="card-flip-container w-full min-h-[280px] sm:min-h-[400px] cursor-pointer select-none"
      role="button"
      aria-label={flipped ? 'Dorso de la card. Click o espacio para voltear' : 'Frente de la card. Click o espacio para voltear'}
      tabIndex={0}
    >
      <div className={`card-flip-inner min-h-[280px] sm:min-h-[400px] ${flipped ? 'flipped' : ''}`}>
        {/* Frente */}
        <div className={`card-flip-face rounded-2xl ${cardBg} px-5 py-6 sm:px-8 sm:py-12`}>
          <p className="font-serif text-xl sm:text-3xl leading-snug text-stone-800 dark:text-zinc-100">{front}</p>
        </div>

        {/* Dorso */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className={`card-flip-face card-flip-back rounded-2xl ${cardBg} px-5 py-6 sm:px-8 sm:py-12 ${overflows ? 'overflow-y-auto' : ''}`}
        >
          <div ref={contentRef} className="w-full">
            <div
              ref={textRef}
              style={{ fontSize: `${fontSize}px` }}
              className="leading-relaxed text-stone-700 dark:text-zinc-300 text-left w-full"
            >
              {formatBack(back)}
            </div>
            {mnemonic && (
              <div className="mt-3 w-full px-3 py-2 bg-amber-50/50 dark:bg-amber-950/20 border-l-2 border-amber-400 dark:border-amber-600 rounded-r-lg">
                <p className="font-serif italic text-xs sm:text-sm text-amber-800 dark:text-amber-300">{mnemonic}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
