// === CONTENIDO ===

export interface Chapter {
  id: string;
  number: string;
  title: string;
  part: string;
}

export interface Flashcard {
  id: string;
  chapterId: string;
  front: string;
  back: string;
  priority: Priority;
  tags?: string[];
  mnemonic?: string;
}

export interface ChuletaSection {
  id: string;
  chapterId: string;
  type: 'definition' | 'table' | 'list' | 'quote' | 'comparison';
  title: string;
  content: string[] | TableData | ComparisonData;
  mnemonic?: string;
  priority?: Priority;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface ComparisonData {
  items: { label: string; description: string }[];
}

export interface ExamQuestion {
  id: string;
  chapterId: string;
  type: 'corta' | 'desarrollo';
  question: string;
  answer: string;
  priority: Priority;
}

export type Priority = 'alta' | 'media' | 'baja';

// === CONTENIDO COMPLETO ===

export interface ContentData {
  metadata: {
    examDate: string;
    subject: string;
    lastUpdated: string;
    coversUntil: string;
    pendingTopics: string[];
  };
  chapters: Chapter[];
  flashcards: Flashcard[];
  cheatsheet: ChuletaSection[];
  questions: ExamQuestion[];
}

// === PROGRESO DEL USUARIO (localStorage) ===

export interface UserProgress {
  leitner: LeitnerState;
  questions: QuestionProgress;
  lastChapter: string;
  darkMode: boolean;
  activityLog?: Record<string, number>; // { "2025-05-08": 3 }
}

export interface LeitnerState {
  boxes: Record<string, 1 | 2 | 3>;
  lastSeen: Record<string, number>;
  sessionCount: number;
}

export interface QuestionProgress {
  status: Record<string, 'dominada' | 'fallada' | 'pendiente'>;
}

// === NAVEGACION ===

export type ViewMode = 'flashcards' | 'chuleta' | 'preguntas' | 'stats' | 'chat';
