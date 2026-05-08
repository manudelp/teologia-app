interface Props {
  front: string;
  back: string;
  flipped: boolean;
  onFlip: () => void;
  mnemonic?: string;
  box: 1 | 2 | 3;
  position: string;
}

const boxBg = {
  1: 'bg-rose-50/60 dark:bg-rose-950/20',
  2: 'bg-amber-50/60 dark:bg-amber-950/20',
  3: 'bg-emerald-50/60 dark:bg-emerald-950/20',
};

const boxText = {
  1: 'text-rose-600/70 dark:text-rose-400/70',
  2: 'text-amber-600/70 dark:text-amber-400/70',
  3: 'text-emerald-600/70 dark:text-emerald-400/70',
};

const boxLabels = { 1: 'Caja 1', 2: 'Caja 2', 3: 'Caja 3' };

export function Card({ front, back, flipped, onFlip, mnemonic, box, position }: Props) {
  return (
    <div
      onClick={onFlip}
      onKeyDown={(e) => { if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); onFlip(); } }}
      className="card-flip-container w-full min-h-[320px] sm:min-h-[400px] cursor-pointer select-none"
      role="button"
      aria-label={flipped ? 'Dorso de la card. Click o espacio para voltear' : 'Frente de la card. Click o espacio para voltear'}
      tabIndex={0}
    >
      <div className={`card-flip-inner min-h-[320px] sm:min-h-[400px] ${flipped ? 'flipped' : ''}`}>
        {/* Frente */}
        <div className={`card-flip-face rounded-2xl ${boxBg[box]} px-8 py-12`}>
          <div className="absolute top-4 left-5 right-5 flex justify-between">
            <span className={`text-xs font-medium ${boxText[box]}`}>{boxLabels[box]}</span>
            <span className="text-xs text-stone-400 dark:text-zinc-600">{position}</span>
          </div>
          <p className="font-serif text-2xl sm:text-3xl leading-snug text-stone-800 dark:text-zinc-100">{front}</p>
          <p className="mt-6 text-xs text-stone-400 dark:text-zinc-600">Espacio o click para voltear</p>
        </div>

        {/* Dorso */}
        <div className={`card-flip-face card-flip-back rounded-2xl ${boxBg[box]} px-8 py-12 overflow-y-auto`}>
          <div className="absolute top-4 left-5 right-5 flex justify-between">
            <span className={`text-xs font-medium ${boxText[box]}`}>{boxLabels[box]}</span>
            <span className="text-xs text-stone-400 dark:text-zinc-600">{position}</span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-zinc-300 whitespace-pre-line text-left w-full">{back}</p>
          {mnemonic && (
            <div className="mt-4 w-full px-4 py-3 bg-amber-50/50 dark:bg-amber-950/20 border-l-2 border-amber-400 dark:border-amber-600 rounded-r-lg">
              <p className="font-serif italic text-sm text-amber-800 dark:text-amber-300">{mnemonic}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
