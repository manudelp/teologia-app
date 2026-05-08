import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import type { ContentData } from '../types';

export interface SearchResult {
  type: 'flashcard' | 'chuleta' | 'pregunta';
  id: string;
  chapterId: string;
  title: string;
  snippet: string;
}

const LIMIT = 8;

export function useSearch(content: ContentData | null) {
  const [query, setQuery] = useState('');

  const fuseFlashcards = useMemo(() => {
    if (!content) return null;
    return new Fuse(content.flashcards, {
      keys: ['front', 'back'],
      threshold: 0.35,
      includeScore: true,
    });
  }, [content]);

  const fuseChuleta = useMemo(() => {
    if (!content) return null;
    // Aplanar content a string para busqueda
    const items = content.cheatsheet.map((s) => ({
      ...s,
      searchContent: Array.isArray(s.content)
        ? s.content.join(' ')
        : typeof s.content === 'object' && 'rows' in s.content
          ? s.content.rows.flat().join(' ')
          : typeof s.content === 'object' && 'items' in s.content
            ? s.content.items.map((i) => `${i.label} ${i.description}`).join(' ')
            : '',
    }));
    return new Fuse(items, {
      keys: ['title', 'searchContent'],
      threshold: 0.35,
      includeScore: true,
    });
  }, [content]);

  const fusePreguntas = useMemo(() => {
    if (!content) return null;
    return new Fuse(content.questions, {
      keys: ['question', 'answer'],
      threshold: 0.35,
      includeScore: true,
    });
  }, [content]);

  const results = useMemo(() => {
    if (!query.trim() || !fuseFlashcards || !fuseChuleta || !fusePreguntas) {
      return { flashcards: [], chuleta: [], preguntas: [] };
    }

    const fc = fuseFlashcards.search(query, { limit: LIMIT }).map((r) => ({
      type: 'flashcard' as const,
      id: r.item.id,
      chapterId: r.item.chapterId,
      title: r.item.front,
      snippet: r.item.back.slice(0, 100),
    }));

    const ch = fuseChuleta.search(query, { limit: LIMIT }).map((r) => ({
      type: 'chuleta' as const,
      id: r.item.id,
      chapterId: r.item.chapterId,
      title: r.item.title,
      snippet: '',
    }));

    const pr = fusePreguntas.search(query, { limit: LIMIT }).map((r) => ({
      type: 'pregunta' as const,
      id: r.item.id,
      chapterId: r.item.chapterId,
      title: r.item.question.slice(0, 80),
      snippet: '',
    }));

    return { flashcards: fc, chuleta: ch, preguntas: pr };
  }, [query, fuseFlashcards, fuseChuleta, fusePreguntas]);

  return { query, setQuery, results };
}
