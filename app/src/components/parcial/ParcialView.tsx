import { useState, useMemo, type ReactNode } from 'react';
import { useApp } from '../../context/AppContext';
import type { ExamSimQuestion } from '../../types';

export function ParcialView() {
  const { content } = useApp();
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const questions = content?.examSimulation ?? [];

  const toggle = (id: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!content || questions.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="font-serif text-2xl text-stone-800 dark:text-zinc-200 mb-2">Simulacro de parcial</h2>
        <p className="text-sm text-stone-500 dark:text-zinc-500 leading-relaxed">
          Basado en el parcial 2023. Intentá responder cada pregunta antes de ver la respuesta.
        </p>
      </div>

      <div className="space-y-1">
        {questions.map((q, i) => (
          <ExamCard
            key={q.id}
            number={i + 1}
            question={q}
            content={content}
            isRevealed={revealed.has(q.id)}
            onToggle={() => toggle(q.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ExamCard({ number, question, content, isRevealed, onToggle }: {
  number: number;
  question: ExamSimQuestion;
  content: NonNullable<ReturnType<typeof useApp>['content']>;
  isRevealed: boolean;
  onToggle: () => void;
}) {
  const relatedAnswers = useMemo(() => {
    return question.relatedQuestions
      .map((id) => content.questions.find((q) => q.id === id))
      .filter(Boolean);
  }, [question.relatedQuestions, content.questions]);

  return (
    <div className="py-6 border-b border-stone-100 dark:border-zinc-800/50 last:border-b-0">
      <div className="flex gap-3 mb-2">
        <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-stone-100 dark:bg-zinc-800 text-xs font-medium text-stone-600 dark:text-zinc-400">
          {number}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {question.topics.map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300">
              {t}
            </span>
          ))}
        </div>
      </div>

      <p className="font-serif text-lg sm:text-xl leading-snug text-stone-800 dark:text-zinc-100 mb-4 ml-10">
        {question.question}
      </p>

      {!isRevealed ? (
        <button
          onClick={onToggle}
          className="ml-10 px-4 py-2 text-sm text-stone-500 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300 bg-stone-100 dark:bg-zinc-800/60 hover:bg-stone-200/70 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          Ver respuesta
        </button>
      ) : (
        <div className="ml-10 animate-fadeUp">
          <div className="space-y-4">
            {relatedAnswers.map((q) => (
              <div key={q!.id} className="p-4 rounded-xl bg-stone-100/50 dark:bg-zinc-900/50">
                <p className="text-xs font-medium text-stone-400 dark:text-zinc-600 mb-2">{q!.question}</p>
                <AnswerText text={q!.answer} />
              </div>
            ))}
            {relatedAnswers.length === 0 && (
              <p className="text-sm text-stone-400 dark:text-zinc-600 italic">
                Este tema no está cubierto en el material actual. Consultá con el chat.
              </p>
            )}
          </div>
          <button
            onClick={onToggle}
            className="mt-3 px-3 py-1.5 text-xs text-stone-400 dark:text-zinc-600 hover:text-stone-600 dark:hover:text-zinc-400 transition-colors"
          >
            Ocultar
          </button>
        </div>
      )}
    </div>
  );
}

function AnswerText({ text }: { text: string }) {
  const lines = text.split('\n');
  const elements: ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    elements.push(
      <ul key={`ul-${elements.length}`} className="list-disc list-outside pl-4 space-y-1">
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

  return <div className="text-sm leading-relaxed text-stone-700 dark:text-zinc-300 space-y-1.5">{elements}</div>;
}

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return <>{parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <span key={i} className="font-semibold text-stone-800 dark:text-zinc-100">{p.slice(2, -2)}</span>
      : <span key={i}>{p}</span>
  )}</>;
}
