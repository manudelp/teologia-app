import { Layers, BookOpen, MessageCircleQuestion, BarChart3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ViewMode } from '../../types';
import type { LucideIcon } from 'lucide-react';

const tabs: { id: ViewMode; label: string; icon: LucideIcon }[] = [
  { id: 'flashcards', label: 'Cards', icon: Layers },
  { id: 'chuleta', label: 'Repaso', icon: BookOpen },
  { id: 'preguntas', label: 'Preguntas', icon: MessageCircleQuestion },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
];

export function BottomNav() {
  const { view, setView } = useApp();

  return (
    <nav className="no-print sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-50/95 dark:bg-zinc-950/95 backdrop-blur-sm border-t border-stone-200/60 dark:border-zinc-800 flex" aria-label="Navegacion mobile">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
              view === tab.id
                ? 'text-stone-900 dark:text-zinc-100'
                : 'text-stone-400 dark:text-zinc-600'
            }`}
          >
            <Icon size={20} strokeWidth={1.75} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
