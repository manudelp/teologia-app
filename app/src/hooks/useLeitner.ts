import { useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { recordActivity } from '../utils/activity';
import type { Flashcard } from '../types';

export function useLeitner(cards: Flashcard[], examMode = false) {
  const { progress, setProgress } = useApp();
  const { leitner } = progress;

  const getBox = useCallback((id: string): 1 | 2 | 3 => {
    return leitner.boxes[id] ?? 1;
  }, [leitner.boxes]);

  const counts = useMemo(() => {
    const c = { 1: 0, 2: 0, 3: 0 };
    cards.forEach((card) => { c[getBox(card.id)]++; });
    return c;
  }, [cards, getBox]);

  const studyQueue = useMemo(() => {
    if (examMode) {
      // Exam mode: ALL cards, sorted by difficulty (box 1 first, then 2, then 3)
      // Within same box, cards seen less recently go first
      return [...cards].sort((a, b) => {
        const boxA = leitner.boxes[a.id] ?? 1;
        const boxB = leitner.boxes[b.id] ?? 1;
        if (boxA !== boxB) return boxA - boxB;
        const seenA = leitner.lastSeen[a.id] ?? 0;
        const seenB = leitner.lastSeen[b.id] ?? 0;
        return seenA - seenB;
      });
    }

    const session = leitner.sessionCount;
    const queue: Flashcard[] = [];
    const showBox3 = session % 3 === 0;
    const box1: Flashcard[] = [];
    const box2: Flashcard[] = [];
    const box3: Flashcard[] = [];

    cards.forEach((card) => {
      const box = leitner.boxes[card.id] ?? 1;
      if (box === 1) box1.push(card);
      else if (box === 2) box2.push(card);
      else if (box === 3 && showBox3) box3.push(card);
    });

    queue.push(...box1, ...box2, ...box3, ...box1);
    return queue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, leitner.sessionCount, examMode]);

  const markCard = useCallback((cardId: string, rating: 1 | 2 | 3) => {
    setProgress((prev) => {
      const boxes = { ...prev.leitner.boxes };
      const lastSeen = { ...prev.leitner.lastSeen };
      const prevBox = boxes[cardId] ?? 1;

      if (rating === 1) {
        boxes[cardId] = 1;
      } else if (rating === 2) {
        const current = boxes[cardId] ?? 1;
        boxes[cardId] = current === 1 ? 2 : current as 1 | 2 | 3;
      } else {
        const current = boxes[cardId] ?? 1;
        boxes[cardId] = Math.min(current + 1, 3) as 1 | 2 | 3;
      }

      lastSeen[cardId] = Date.now();

      let result = {
        ...prev,
        leitner: { ...prev.leitner, boxes, lastSeen },
      };

      if (boxes[cardId] === 3 && prevBox !== 3) {
        result = recordActivity(result);
      }

      return result;
    });
  }, [setProgress]);

  const startNewSession = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      leitner: { ...prev.leitner, sessionCount: prev.leitner.sessionCount + 1 },
    }));
  }, [setProgress]);

  return { counts, studyQueue, markCard, getBox, startNewSession, sessionCount: leitner.sessionCount };
}
