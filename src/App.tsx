import { useState, useEffect, useCallback } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { SearchModal } from './components/layout/SearchModal';
import { KeyboardHelp } from './components/layout/KeyboardHelp';
import { ChuletaView } from './components/chuleta/ChuletaView';
import { FlashcardView } from './components/flashcards/FlashcardView';
import { PreguntasView } from './components/preguntas/PreguntasView';
import { StatsView } from './components/stats/StatsView';
import type { SearchResult } from './hooks/useSearch';

function AppContent() {
  const { loading, view, setView, setSelectedChapter } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  // Atajos globales
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setHelpOpen((h) => !h);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSearchNavigate = useCallback((result: SearchResult) => {
    setSearchOpen(false);
    setSelectedChapter(result.chapterId);
    if (result.type === 'flashcard') setView('flashcards');
    else if (result.type === 'chuleta') setView('chuleta');
    else if (result.type === 'pregunta') setView('preguntas');
  }, [setView, setSelectedChapter]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <div className="spinner" />
        <p className="text-xs text-stone-400 dark:text-zinc-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 sm:pb-4">
      <Header onSearchOpen={() => setSearchOpen(true)} onHelpOpen={() => setHelpOpen(true)} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {view === 'chuleta' && <ChuletaView />}
        {view === 'flashcards' && <FlashcardView />}
        {view === 'preguntas' && <PreguntasView />}
        {view === 'stats' && <StatsView />}
      </main>
      <BottomNav />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleSearchNavigate} />
      <KeyboardHelp open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
