import { Layers, BookOpen, MessageCircleQuestion, Speech, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { ViewMode } from '../../types';
import type { LucideIcon } from 'lucide-react';

const leftTabs: { id: ViewMode; label: string; icon: LucideIcon }[] = [
  { id: 'chuleta', label: 'Repaso', icon: BookOpen },
  { id: 'flashcards', label: 'Cards', icon: Layers },
];

const rightTabs: { id: ViewMode; label: string; icon: LucideIcon }[] = [
  { id: 'preguntas', label: 'Preguntas', icon: MessageCircleQuestion },
  { id: 'parcial', label: 'Parcial', icon: FileText },
];

export function BottomNav() {
  const { view, setView } = useApp();

  const renderTab = (tab: { id: ViewMode; label: string; icon: LucideIcon }) => {
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
  };

  return (
    <nav className="no-print sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-50/95 dark:bg-zinc-950/95 backdrop-blur-sm border-t border-stone-200/60 dark:border-zinc-800 flex items-end" aria-label="Navegacion mobile">
      {leftTabs.map(renderTab)}

      <div className="flex-1 flex justify-center -mt-7">
        <button
          onClick={() => setView('chat')}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
            view === 'chat'
              ? 'bg-stone-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
              : 'bg-stone-800 dark:bg-zinc-200 text-white dark:text-zinc-900'
          }`}
          aria-label="Chat IA"
        >
          <Speech size={22} strokeWidth={1.75} />
        </button>
      </div>

      {rightTabs.map(renderTab)}
    </nav>
  );
}
