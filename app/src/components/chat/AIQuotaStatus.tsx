import { useState, useRef, useEffect } from 'react';
import { useQuota } from '../../context/QuotaContext';
import { ChevronDown } from 'lucide-react';

function MiniBar({ value, max }: { value: number; max: number | null }) {
  if (max === null) return (
    <div className="w-full h-0.5 rounded-full bg-emerald-500/20" />
  );
  const ratio = Math.min(value / max, 1);
  const color = ratio >= 0.9 ? 'bg-red-500' : ratio >= 0.7 ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div className="w-full h-0.5 rounded-full bg-zinc-800 overflow-hidden">
      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${ratio * 100}%` }} />
    </div>
  );
}

function Row({ label, value, max }: { label: string; value: number; max: number | null }) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-zinc-500">{label}</span>
        <span className="text-[10px] font-mono text-zinc-600">{value}/{max === null ? '∞' : max}</span>
      </div>
      <MiniBar value={value} max={max} />
    </div>
  );
}

export function AIQuotaStatus() {
  const { currentModel, setCurrentModel, quota, isLimited, availableModels } = useQuota();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const dotColor = isLimited ? 'bg-red-500' : 'bg-emerald-500/70';

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.preventDefault(); setOpen(o => !o); }}
        type="button"
        className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
      >
        <span className={`w-1 h-1 rounded-full ${dotColor}`} />
        <span className="hidden sm:inline">{currentModel.label}</span>
        <ChevronDown size={8} />
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 right-0 z-[60] w-52 p-3 rounded-xl bg-[#0e0e10] border border-zinc-800/60 shadow-xl shadow-black/50">
          <p className="text-[9px] font-medium text-zinc-600 uppercase tracking-widest mb-2">
            {currentModel.label}
          </p>
          <div className="space-y-1.5 mb-3">
            <Row label="RPM" value={quota.requestsMinute} max={currentModel.rpm} />
            <Row label="RPD" value={quota.requestsToday} max={currentModel.rpd} />
            <Row label="Tokens" value={quota.tokensUsed} max={currentModel.tpm} />
          </div>

          <div className="border-t border-zinc-800/40 pt-2">
            <p className="text-[9px] font-medium text-zinc-600 uppercase tracking-widest mb-1.5">Modelos</p>
            <div className="space-y-0.5">
              {availableModels.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => { setCurrentModel(m.id); setOpen(false); }}
                  disabled={!m.available}
                  className={`w-full text-left px-2 py-1 rounded text-[11px] transition-colors flex items-center justify-between ${
                    m.id === currentModel.id
                      ? 'bg-zinc-800/80 text-zinc-300'
                      : m.available
                        ? 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40'
                        : 'text-zinc-800 cursor-not-allowed'
                  }`}
                >
                  <span>{m.label}</span>
                  {!m.available && <span className="w-1 h-1 rounded-full bg-red-500/60" />}
                  {m.available && m.id === currentModel.id && <span className="w-1 h-1 rounded-full bg-emerald-500" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
