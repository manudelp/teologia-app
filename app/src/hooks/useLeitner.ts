import { useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { recordActivity } from '../utils/activity';
import type { Flashcard } from '../types';

export function useLeitner(cards: Flashcard[]) {
  const { progress, setProgress } = useApp();
  const { leitner } = progress;

  // Asignar caja 1 a cards nuevas (merge no destructivo)
  const getBox = useCallback((id: string): 1 | 2 | 3 => {
    return leitner.boxes[id] ?? 1;
  }, [leitner.boxes]);

  // Conteo por caja
  const counts = useMemo(() => {
    const c = { 1: 0, 2: 0, 3: 0 };
    cards.forEach((card) => { c[getBox(card.id)]++; });
    return c;
  }, [cards, getBox]);

  // Armar cola de estudio segun intervalos:
  // Caja 1: todas (varias veces por sesion)
  // Caja 2: una vez por sesion
  // Caja 3: cada 3 sesiones
  const studyQueue = useMemo(() => {
    const session = leitner.sessionCount;
    const queue: Flashcard[] = [];

    // Caja 3: solo si sesion es multiplo de 3
    const showBox3 = session % 3 === 0;

    // Primero caja 1 (prioridad), luego caja 2, luego caja 3
    const box1: Flashcard[] = [];
    const box2: Flashcard[] = [];
    const box3: Flashcard[] = [];

    cards.forEach((card) => {
      const box = getBox(card.id);
      if (box === 1) box1.push(card);
      else if (box === 2) box2.push(card);
      else if (box === 3 && showBox3) box3.push(card);
    });

    // Caja 1 aparece varias veces: duplicamos al final
    queue.push(...box1, ...box2, ...box3, ...box1);
    return queue;
  }, [cards, getBox, leitner.sessionCount]);

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

      // Record activity when card reaches box 3
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

  return { counts, studyQueue, markCard, getBox, startNewSession };
}
