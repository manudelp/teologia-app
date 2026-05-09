import { useState } from 'react';
import type { ExamQuestion } from '../../types';

interface Props {
  question: ExamQuestion;
  status: 'dominada' | 'fallada' | 'pendiente';
  onMark: (id: string, status: 'dominada' | 'fallada' | 'pendiente') => void;
}

export function QuestionCard({ question, status, onMark }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const isDominada = status === 'dominada';

  return (
    <div className={`py-8 border-b border-stone-100 dark:border-zinc-800/50 last:border-b-0 transition-opacity ${isDominada ? 'opacity-50' : ''}`}>
      {/* Badges */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${question.priority === 'alta' ? 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300' : 'bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-500'}`}>
          {question.priority === 'alta' ? 'Alta' : 'Media'}
        </span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${question.type === 'desarrollo' ? 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400' : 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400'}`}>
          {question.type === 'desarrollo' ? 'Desarrollo' : 'Corta'}
        </span>
        {isDominada && <span className="text-xs text-emerald-600 dark:text-emerald-400 ml-auto">Dominada</span>}
        {status === 'fallada' && <span className="text-xs text-rose-600 dark:text-rose-400 ml-auto">Fallada</span>}
      </div>

      {/* Pregunta */}
      <p className="font-serif text-xl sm:text-2xl leading-snug text-stone-800 dark:text-zinc-100 mb-4">
        {question.question}
      </p>

      {/* Respuesta */}
      {!showAnswer ? (
        <button
          onClick={() => setShowAnswer(true)}
          className="px-4 py-2 text-sm text-stone-500 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300 bg-stone-100 dark:bg-zinc-800/60 hover:bg-stone-200/70 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          Mostrar respuesta
        </button>
      ) : (
        <div className="animate-fadeUp">
          <div className={`p-6 rounded-xl bg-stone-100/50 dark:bg-zinc-900/50 ${question.type === 'desarrollo' ? 'max-h-[500px] overflow-y-auto' : ''}`}>
            <AnswerText text={question.answer} />
          </div>

          {/* Botones de marcado */}
          <div className="mt-4 flex gap-2 flex-wrap">
            {isDominada ? (
              <button
                onClick={() => onMark(question.id, 'pendiente')}
                className="px-3 py-1.5 text-xs font-medium text-stone-500 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-800/60 rounded-lg transition-colors"
              >
                Desmarcar
              </button>
            ) : (
              <>
                <button
                  onClick={() => onMark(question.id, 'dominada')}
                  className="px-4 py-2 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-950/50 active:scale-[0.98] transition-all"
                >
                  Dominada
                </button>
                <button
                  onClick={() => onMark(question.id, 'fallada')}
                  className="px-4 py-2 text-xs font-medium bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950/50 active:scale-[0.98] transition-all"
                >
                  Falle
                </button>
              </>
            )}
            <button
              onClick={() => setShowAnswer(false)}
              className="px-3 py-1.5 text-xs text-stone-400 dark:text-zinc-600 hover:text-stone-600 dark:hover:text-zinc-400 ml-auto transition-colors"
            >
              Ocultar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Parsea enumeraciones (1), (2), etc. en listas visuales
function AnswerText({ text }: { text: string }) {
  const enumPattern = /\(\d+\)/g;
  const matches = text.match(enumPattern);

  // Si hay 3+ enumeraciones, renderizar como lista
  if (matches && matches.length >= 3) {
    const parts = text.split(/\(\d+\)\s*/);
    const items = parts.filter((p) => p.trim());

    // Si el primer fragmento no empieza con (1), es un intro
    const startsWithEnum = text.trimStart().startsWith('(1)');
    const intro = startsWithEnum ? null : items.shift();

    return (
      <div className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-zinc-300">
        {intro && <p className="mb-3">{intro}</p>}
        <ol className="space-y-2 list-none">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-stone-400 dark:text-zinc-600 shrink-0 font-medium text-xs mt-0.5">({i + 1})</span>
              <span>{item.trim()}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-zinc-300 whitespace-pre-line">{text}</p>;
}
