import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { ContentData, UserProgress, ViewMode } from '../types';
import { loadContent } from '../data/loader';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AppState {
  content: ContentData | null;
  setContent: (data: ContentData) => void;
  loading: boolean;
  progress: UserProgress;
  setProgress: (p: UserProgress | ((prev: UserProgress) => UserProgress)) => void;
  view: ViewMode;
  setView: (v: ViewMode) => void;
  selectedChapter: string;
  setSelectedChapter: (c: string) => void;
  chatRef: string;
  sendToChat: (text: string) => void;
}

const defaultProgress: UserProgress = {
  leitner: { boxes: {}, lastSeen: {}, sessionCount: 0 },
  questions: { status: {} },
  lastChapter: 'todos',
  darkMode: false,
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useLocalStorage<UserProgress>('teo-progress', defaultProgress);
  const [view, setView] = useState<ViewMode>('chuleta');
  const [selectedChapter, setSelectedChapter] = useState<string>(progress.lastChapter || 'todos');
  const [chatRef, setChatRef] = useState('');

  // Cargar contenido: primero localStorage (custom), si no el JSON original
  useEffect(() => {
    const customRaw = localStorage.getItem('teo-custom-content');
    if (customRaw) {
      try {
        const custom = JSON.parse(customRaw) as ContentData;
        setContentState(custom);
        setLoading(false);
        return;
      } catch {
        // Si falla, caer al JSON original
      }
    }
    loadContent().then((data) => {
      setContentState(data);
      setLoading(false);
    });
  }, []);

  const setContent = useCallback((data: ContentData) => {
    setContentState(data);
    localStorage.setItem('teo-custom-content', JSON.stringify(data));
  }, []);

  const sendToChat = useCallback((text: string) => {
    setChatRef(text);
    setView('chat');
  }, []);

  // Persistir dark mode en el DOM
  useEffect(() => {
    document.documentElement.classList.toggle('dark', progress.darkMode);
  }, [progress.darkMode]);

  // Persistir ultimo capitulo seleccionado
  useEffect(() => {
    setProgress((prev) => ({ ...prev, lastChapter: selectedChapter }));
  }, [selectedChapter]);

  return (
    <AppContext.Provider value={{ content, setContent, loading, progress, setProgress, view, setView, selectedChapter, setSelectedChapter, chatRef, sendToChat }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider');
  return ctx;
}
