import type { Priority } from '../../types';

interface Props {
  value: Priority | 'todas';
  onChange: (v: Priority | 'todas') => void;
}

const options: { value: Priority | 'todas'; label: string }[] = [
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Media' },
  { value: 'todas', label: 'Todas' },
];

export function PriorityFilter({ value, onChange }: Props) {
  const activeIdx = options.findIndex((o) => o.value === value);

  return (
    <div className="no-print">
      <p className="text-[10px] font-medium uppercase tracking-wider text-stone-400 dark:text-zinc-600 mb-1.5">Prioridad</p>
      <div className="relative grid grid-cols-3 bg-stone-100 dark:bg-zinc-800 rounded-lg p-0.5 min-w-[180px]">
        <div
          className="absolute top-0.5 bottom-0.5 w-[calc(100%/3-1px)] rounded-md bg-stone-800 dark:bg-zinc-200 transition-transform duration-200 ease-out"
          style={{ transform: `translateX(calc(${activeIdx} * 100% + ${activeIdx} * 1.5px))` }}
        />
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`relative z-10 text-center py-1.5 text-xs font-medium rounded-md transition-colors ${
              value === opt.value
                ? 'text-white dark:text-zinc-900'
                : 'text-stone-500 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
