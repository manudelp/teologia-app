import { Layers, BookOpen, MessageCircleQuestion, BarChart3, Speech, Search, Sun, Moon, Keyboard, FileText } from 'lucide-react';
import { ReadingProgress } from './ReadingProgress';
import { useApp } from '../../context/AppContext';

import type { ViewMode } from '../../types';
import type { LucideIcon } from 'lucide-react';

const tabs: { id: ViewMode; label: string; icon: LucideIcon }[] = [
  { id: 'chuleta', label: 'Repaso', icon: BookOpen },
  { id: 'flashcards', label: 'Flashcards', icon: Layers },
  { id: 'chat', label: 'Dios', icon: Speech },
  { id: 'preguntas', label: 'Preguntas', icon: MessageCircleQuestion },
  { id: 'parcial', label: 'Parcial', icon: FileText },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
];

interface Props {
  onSearchOpen: () => void;
  onHelpOpen: () => void;
}

export function Header({ onSearchOpen, onHelpOpen }: Props) {
  const { progress, setProgress, view, setView } = useApp();

  const toggleDark = () => {
    setProgress((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  return (
    <header className="no-print sticky top-0 z-50 bg-stone-50/95 dark:bg-zinc-950/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="font-serif text-xl font-semibold text-stone-800 dark:text-zinc-200">
          Teología
        </h1>

        {/* Tabs - desktop */}
        <nav className="hidden sm:flex items-center gap-1" aria-label="Navegacion principal">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  view === tab.id
                    ? 'bg-stone-200/70 dark:bg-zinc-800 text-stone-900 dark:text-zinc-100 font-medium'
                    : 'text-stone-500 dark:text-zinc-500 hover:text-stone-800 dark:hover:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <Icon size={16} strokeWidth={1.75} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSearchOpen}
            className="p-2 rounded-lg text-stone-400 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-800/60 transition-colors"
            aria-label="Buscar (Ctrl+K)"
            title="Buscar (Ctrl+K)"
          >
            <Search size={18} strokeWidth={1.75} />
          </button>
          <button
            onClick={onHelpOpen}
            className="p-2 rounded-lg text-stone-400 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-800/60 transition-colors"
            aria-label="Atajos de teclado (?)"
            title="Atajos de teclado (?)"
          >
            <Keyboard size={18} strokeWidth={1.75} />
          </button>
          <button
            onClick={toggleDark}
            className="p-2 rounded-lg text-stone-400 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-800/60 transition-colors"
            aria-label="Alternar modo oscuro"
          >
            {progress.darkMode ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
          </button>
        </div>
      </div>
      {view === 'chuleta' && <ReadingProgress />}
    </header>
  );
}
