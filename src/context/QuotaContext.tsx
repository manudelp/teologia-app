import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';

export interface ModelConfig {
  id: string;
  label: string;
  rpm: number;
  rpd: number;
  tpm: number | null; // null = ilimitado
}

export const AVAILABLE_MODELS: ModelConfig[] = [
  { id: 'gemini-3.1-flash-lite', label: '3.1 Flash Lite', rpm: 15, rpd: 500, tpm: 250_000 },
  { id: 'gemini-2.5-flash', label: '2.5 Flash', rpm: 5, rpd: 20, tpm: 250_000 },
  { id: 'gemini-2.5-flash-lite', label: '2.5 Flash Lite', rpm: 10, rpd: 20, tpm: 250_000 },
  { id: 'gemini-3-flash', label: '3 Flash', rpm: 5, rpd: 20, tpm: 250_000 },
];

export interface ModelQuota {
  requestsMinute: number;
  requestsToday: number;
  tokensUsed: number;
}

interface QuotaContextValue {
  currentModel: ModelConfig;
  setCurrentModel: (id: string) => void;
  quota: ModelQuota;
  isLimited: boolean;
  availableModels: (ModelConfig & { available: boolean })[];
  recordRequest: (tokens: number) => void;
}

const QuotaContext = createContext<QuotaContextValue | null>(null);

type StoredQuotas = Record<string, { requestsToday: number; tokensUsed: number; day: string }>;

function getStoredQuotas(): StoredQuotas {
  try {
    const raw = localStorage.getItem('teo-ai-quotas');
    if (raw) {
      const parsed = JSON.parse(raw) as StoredQuotas;
      const today = new Date().toDateString();
      // Reset models whose day changed
      for (const key of Object.keys(parsed)) {
        if (parsed[key].day !== today) {
          parsed[key] = { requestsToday: 0, tokensUsed: 0, day: today };
        }
      }
      return parsed;
    }
  } catch { /* ignore */ }
  return {};
}

export function QuotaProvider({ children }: { children: ReactNode }) {
  const [currentModelId, setCurrentModelId] = useState<string>(() => {
    return localStorage.getItem('teo-ai-model') || AVAILABLE_MODELS[0].id;
  });
  const [quotas, setQuotas] = useState<Record<string, ModelQuota>>(() => {
    const stored = getStoredQuotas();
    const initial: Record<string, ModelQuota> = {};
    for (const m of AVAILABLE_MODELS) {
      const s = stored[m.id];
      initial[m.id] = {
        requestsMinute: 0,
        requestsToday: s?.requestsToday ?? 0,
        tokensUsed: s?.tokensUsed ?? 0,
      };
    }
    return initial;
  });

  const minuteTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const currentModel = AVAILABLE_MODELS.find(m => m.id === currentModelId) || AVAILABLE_MODELS[0];
  const quota = quotas[currentModel.id] || { requestsMinute: 0, requestsToday: 0, tokensUsed: 0 };

  const isModelLimited = (model: ModelConfig, q: ModelQuota) =>
    q.requestsMinute >= model.rpm || q.requestsToday >= model.rpd || (model.tpm !== null && q.tokensUsed >= model.tpm);

  const isLimited = isModelLimited(currentModel, quota);

  const availableModels = AVAILABLE_MODELS.map(m => ({
    ...m,
    available: !isModelLimited(m, quotas[m.id] || { requestsMinute: 0, requestsToday: 0, tokensUsed: 0 }),
  }));

  // Reset RPM cada 60s
  useEffect(() => {
    minuteTimerRef.current = setInterval(() => {
      setQuotas(prev => {
        const next = { ...prev };
        let changed = false;
        for (const key of Object.keys(next)) {
          if (next[key].requestsMinute > 0) {
            next[key] = { ...next[key], requestsMinute: 0 };
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, 60_000);
    return () => clearInterval(minuteTimerRef.current);
  }, []);

  // Reset diario
  useEffect(() => {
    const check = setInterval(() => {
      const today = new Date().toDateString();
      const raw = localStorage.getItem('teo-ai-quotas');
      if (raw) {
        const stored = JSON.parse(raw) as StoredQuotas;
        const anyOld = Object.values(stored).some(s => s.day !== today);
        if (anyOld) {
          setQuotas(prev => {
            const next = { ...prev };
            for (const key of Object.keys(next)) {
              next[key] = { ...next[key], requestsToday: 0, tokensUsed: 0 };
            }
            return next;
          });
        }
      }
    }, 30_000);
    return () => clearInterval(check);
  }, []);

  // Persistir
  useEffect(() => {
    const today = new Date().toDateString();
    const stored: StoredQuotas = {};
    for (const [id, q] of Object.entries(quotas)) {
      stored[id] = { requestsToday: q.requestsToday, tokensUsed: q.tokensUsed, day: today };
    }
    localStorage.setItem('teo-ai-quotas', JSON.stringify(stored));
  }, [quotas]);

  const setCurrentModel = useCallback((id: string) => {
    setCurrentModelId(id);
    localStorage.setItem('teo-ai-model', id);
  }, []);

  const recordRequest = useCallback((tokens: number) => {
    setQuotas(prev => ({
      ...prev,
      [currentModelId]: {
        requestsMinute: (prev[currentModelId]?.requestsMinute ?? 0) + 1,
        requestsToday: (prev[currentModelId]?.requestsToday ?? 0) + 1,
        tokensUsed: (prev[currentModelId]?.tokensUsed ?? 0) + tokens,
      },
    }));
  }, [currentModelId]);

  return (
    <QuotaContext.Provider value={{ currentModel, setCurrentModel, quota, isLimited, availableModels, recordRequest }}>
      {children}
    </QuotaContext.Provider>
  );
}

export function useQuota() {
  const ctx = useContext(QuotaContext);
  if (!ctx) throw new Error('useQuota debe usarse dentro de QuotaProvider');
  return ctx;
}
