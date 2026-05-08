import { useEffect, useMemo } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

function isMac() {
  return navigator.platform.toUpperCase().includes('MAC') || navigator.userAgent.includes('Mac');
}

export function KeyboardHelp({ open, onClose }: Props) {
  const mod = useMemo(() => isMac() ? '\u2318' : 'Ctrl', []);

  const groups = useMemo(() => [
    {
      title: 'General',
      shortcuts: [
        { keys: `${mod} + K`, action: 'Busqueda global' },
        { keys: '?', action: 'Mostrar/ocultar atajos' },
        { keys: 'Esc', action: 'Cerrar modal' },
      ],
    },
    {
      title: 'Flashcards',
      shortcuts: [
        { keys: 'Espacio', action: 'Voltear card' },
        { keys: '1', action: 'No la se' },
        { keys: '2', action: 'Mas o menos' },
        { keys: '3', action: 'La se' },
        { keys: '\u2190 \u2192', action: 'Navegar sin marcar' },
      ],
    },
  ], [mod]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      <div
        className="animate-fadeUp relative w-full max-w-md mx-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Atajos de teclado"
      >
        <h2 className="font-serif text-xl text-stone-800 dark:text-zinc-200 mb-5">Atajos de teclado</h2>

        {groups.map((group) => (
          <div key={group.title} className="mb-5 last:mb-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-stone-400 dark:text-zinc-600 mb-2">{group.title}</p>
            <div className="space-y-2">
              {group.shortcuts.map((s) => (
                <div key={s.keys} className="flex items-center justify-between">
                  <kbd className="px-2 py-0.5 text-xs font-mono bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-400 rounded border border-stone-200 dark:border-zinc-700">
                    {s.keys}
                  </kbd>
                  <span className="text-sm text-stone-500 dark:text-zinc-500">{s.action}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 text-sm text-stone-500 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300 bg-stone-50 dark:bg-zinc-800 hover:bg-stone-100 dark:hover:bg-zinc-700 rounded-xl transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
