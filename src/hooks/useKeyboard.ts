import { useEffect } from 'react';

interface KeyboardActions {
  onFlip: () => void;
  onRate: (rating: 1 | 2 | 3) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function useKeyboard(actions: KeyboardActions, active: boolean) {
  useEffect(() => {
    if (!active) return;

    const handler = (e: KeyboardEvent) => {
      // Ignorar si el foco esta en un input/select
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          actions.onFlip();
          break;
        case 'Digit1':
        case 'Numpad1':
          e.preventDefault();
          actions.onRate(1);
          break;
        case 'Digit2':
        case 'Numpad2':
          e.preventDefault();
          actions.onRate(2);
          break;
        case 'Digit3':
        case 'Numpad3':
          e.preventDefault();
          actions.onRate(3);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          actions.onPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          actions.onNext();
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [actions, active]);
}
