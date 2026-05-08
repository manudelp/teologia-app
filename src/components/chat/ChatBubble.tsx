import { Speech, X } from 'lucide-react';
import { ChatView } from './ChatView';

interface Props {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export function ChatBubble({ open, onClose, onOpen }: Props) {
  return (
    <>
      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[26rem] h-[75vh] sm:h-[36rem] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 bg-[#0c0c0e] border border-zinc-800/60">
          {/* Header */}
          <div className="relative px-5 py-4 border-b border-zinc-800/40 bg-gradient-to-b from-zinc-900/80 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700/50 flex items-center justify-center shadow-inner">
                  <Speech size={14} strokeWidth={1.5} className="text-zinc-300" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-zinc-200 tracking-wide">Dios</p>
                  <p className="text-[10px] text-zinc-600 tracking-wider uppercase">Guía teológica</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-400 transition-colors">
                <X size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-hidden px-4 pt-3 pb-4">
            <ChatView embedded />
          </div>
        </div>
      )}

      {/* FAB - solo desktop */}
      {!open && (
        <button
          onClick={onOpen}
          className="hidden sm:flex fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700/40 text-zinc-300 shadow-lg shadow-black/40 items-center justify-center hover:border-zinc-600/60 transition-colors"
          aria-label="Abrir chat"
        >
          <Speech size={18} strokeWidth={1.5} />
        </button>
      )}
    </>
  );
}
