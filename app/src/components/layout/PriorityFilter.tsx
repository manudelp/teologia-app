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
  return (
    <div className="no-print">
      <p className="text-[10px] font-medium uppercase tracking-wider text-stone-400 dark:text-zinc-600 mb-1.5">Prioridad</p>
      <div className="flex gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              value === opt.value
                ? 'bg-stone-800 dark:bg-zinc-200 text-white dark:text-zinc-900'
                : 'bg-stone-100 dark:bg-zinc-800 text-stone-500 dark:text-zinc-500 hover:bg-stone-200 dark:hover:bg-zinc-700 hover:text-stone-700 dark:hover:text-zinc-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
