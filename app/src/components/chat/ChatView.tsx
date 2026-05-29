import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Trash2, Speech, Copy, RefreshCw, X } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useApp } from '../../context/AppContext';
import { useQuota } from '../../context/QuotaContext';
import { AIQuotaStatus } from './AIQuotaStatus';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  chapterRef?: string;
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function formatTime(ts: number): string {
  if (!ts) return '';
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}


const GENERIC_QUESTIONS = [
  'Explica las 5 Vías de Santo Tomás',
  '¿Qué es la Trinidad?',
  'Diferencia entre fe y razón',
  '¿Qué definió el Concilio Vaticano I?',
  'Resumen de Cristología',
];

function getSuggestedQuestions(content: ReturnType<typeof useApp>['content'], selectedChapter: string): string[] {
  if (!content || selectedChapter === 'todos') return GENERIC_QUESTIONS;
  const chQuestions = content.questions.filter(q => q.chapterId === selectedChapter);
  const chFlashcards = content.flashcards.filter(fc => fc.chapterId === selectedChapter);
  const suggestions: string[] = [];
  for (const q of chQuestions.slice(0, 3)) suggestions.push(q.question);
  for (const fc of chFlashcards.slice(0, 5 - suggestions.length)) suggestions.push(fc.front);
  return suggestions.length > 0 ? suggestions.slice(0, 5) : GENERIC_QUESTIONS;
}

function buildSystemPrompt(content: ReturnType<typeof useApp>['content'], selectedChapter: string): string {
  if (!content) return '';
  
  // If a chapter is selected, prioritize that content
  const relevantCards = selectedChapter === 'todos'
    ? content.flashcards
    : content.flashcards.filter(fc => fc.chapterId === selectedChapter);
  const cards = relevantCards.map(f => `${f.front}: ${f.back}`).join('\n');
  
  const chapterContext = selectedChapter !== 'todos'
    ? `\n\nEl usuario está estudiando el capítulo: ${content.chapters.find(c => c.id === selectedChapter)?.title ?? selectedChapter}. Prioriza respuestas relevantes a ese tema.`
    : '';

  return `Sos un tutor experto en teología católica. Tu único objetivo es ayudar al usuario a APROBAR su parcial de teología (Ingeniería, USAL Pilar).${chapterContext}

COMPORTAMIENTO:
- Respondé de forma DIRECTA y CLARA. Nada de rodeos.
- Priorizá lo que la profesora preguntaría en un examen.
- Usá estructura: títulos, bullets, negritas para conceptos clave.
- Si un concepto tiene una definición precisa, dala textual primero y después explicá.
- Cuando haya distinciones importantes (ej: mortal vs venial, fe vs razón), usá comparaciones lado a lado.
- Si el usuario pregunta algo vago, pedile que precise.
- Corregí errores con firmeza pero sin agresividad.
- Cerrá respuestas complejas con un resumen de 1-2 líneas tipo "para el examen".

ESTILO:
- Lenguaje claro, moderno, sin sermones ni frases arcaicas.
- No uses emojis.
- Usá **negrita** para términos clave, ## para secciones, > para citas.
- Sé conciso: si se puede decir en 3 bullets, no escribas 3 párrafos.

RESTRICCIONES:
- Nunca inventes citas bíblicas ni información teológica.
- Distinguí entre doctrina oficial, interpretación teológica y contexto histórico.
- No hables de política ni temas fuera de teología.

CONTENIDO DEL CURSO:\n${cards}`;
}

// Minimal markdown renderer — no large headings, subtle formatting
function RenderContent({ text }: { text: string }) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Headers rendered as bold labels
    if (line.match(/^#{1,4}\s/)) {
      const content = line.replace(/^#+\s/, '');
      elements.push(<p key={i} className="text-[15px] font-semibold text-stone-800 dark:text-zinc-200 mt-4 mb-1.5">{content}</p>);
    }
    // Tables
    else if (line.includes('|') && line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines
        .filter(l => !l.match(/^\|?[\s:-]+\|/))
        .map(l => l.split('|').filter(c => c.trim()).map(c => c.trim()));
      if (rows.length > 0) {
        const [header, ...body] = rows;
        elements.push(
          <div key={`table-${i}`} className="my-3 overflow-x-auto">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr>
                  {header.map((cell, j) => (
                    <th key={j} className="text-left px-3 py-1.5 font-semibold text-stone-800 dark:text-zinc-200 border-b border-stone-200 dark:border-zinc-800">
                      <InlineFormat text={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, j) => (
                  <tr key={j}>
                    {row.map((cell, k) => (
                      <td key={k} className="px-3 py-1.5 text-stone-700 dark:text-zinc-300 border-b border-stone-100 dark:border-zinc-800/50">
                        <InlineFormat text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }
    // Horizontal rule
    else if (line.match(/^-{3,}$/) || line.match(/^\*{3,}$/) || line.match(/^_{3,}$/)) {
      elements.push(<hr key={i} className="border-stone-200 dark:border-zinc-800 my-4" />);
    }
    // Blockquotes
    else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-stone-300 dark:border-zinc-700 pl-3 my-2 text-stone-500 dark:text-zinc-400 italic text-[14px]">
          <InlineFormat text={line.slice(2)} />
        </blockquote>
      );
    }
    // List items
    else if (line.match(/^[-*•]\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*•]\s/)) {
        items.push(lines[i].replace(/^[-*•]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className="space-y-1 my-2 pl-4">
          {items.map((item, j) => (
            <li key={j} className="text-[14px] text-stone-700 dark:text-zinc-300 leading-relaxed list-disc marker:text-stone-400 dark:marker:text-zinc-600">
              <InlineFormat text={item} />
            </li>
          ))}
        </ul>
      );
      continue;
    }
    // Numbered lists
    else if (line.match(/^\d+[.)]\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+[.)]\s/)) {
        items.push(lines[i].replace(/^\d+[.)]\s/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-1 my-2">
          {items.map((item, j) => (
            <li key={j} className="flex gap-2 text-[14px] text-stone-700 dark:text-zinc-300 leading-relaxed">
              <span className="text-stone-400 dark:text-zinc-500 shrink-0 font-mono text-[12px] mt-0.5">{j + 1}.</span>
              <span><InlineFormat text={item} /></span>
            </li>
          ))}
        </ol>
      );
      continue;
    }
    // Empty line
    else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2.5" />);
    }
    // Regular paragraph
    else {
      elements.push(<p key={i} className="text-[14px] text-stone-700 dark:text-zinc-300 leading-[1.8] my-0.5"><InlineFormat text={line} /></p>);
    }
    i++;
  }

  return <div className="space-y-0 font-[family-name:var(--font-reading)]">{elements}</div>;
}

function InlineFormat({ text }: { text: string }) {
  // Handle bold (**text**) and italic (*text*)
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-stone-900 dark:text-zinc-100 font-medium">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i} className="italic">{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function ChatView() {
  const { content, chatRef, sendToChat, selectedChapter } = useApp();
  const { isLimited, recordRequest, currentModel } = useQuota();
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('teo-chat-history');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeRef, setActiveRef] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Persist messages
  useEffect(() => {
    localStorage.setItem('teo-chat-history', JSON.stringify(messages));
  }, [messages]);

  // Consume chatRef from cheatsheet as a chip
  useEffect(() => {
    if (chatRef) {
      setActiveRef(chatRef);
      sendToChat('');
    }
  }, [chatRef, sendToChat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading || isLimited) return;

    const fullMsg = activeRef ? `Sobre esto: "${activeRef}"

${msg}` : msg;
    const userMsg: Message = { role: 'user', text: fullMsg, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setActiveRef(null);
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: currentModel.id });
      const systemPrompt = buildSystemPrompt(content, selectedChapter);

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: systemPrompt + '\n\nResponde "Entendido." para confirmar.' }] },
          { role: 'model', parts: [{ text: 'Entendido.' }] },
          ...history,
        ],
      });

      const result = await chat.sendMessageStream(msg);
      let fullText = '';

      // Add placeholder message
      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: Date.now() }]);
      setLoading(false);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], text: fullText };
          return updated;
        });
      }

      const response = await result.response;
      const totalTokens = response.usageMetadata?.totalTokenCount ?? 0;
      recordRequest(totalTokens);
    } catch (e) {
      const raw = e instanceof Error ? e.message : '';
      let errMsg: string;
      if (raw.includes('503') || raw.includes('overloaded')) {
        errMsg = 'Servidor sobrecargado. Intenta de nuevo en unos segundos.';
      } else if (raw.includes('429') || raw.includes('quota') || raw.includes('rate')) {
        errMsg = 'Cuota excedida. Cambia de modelo desde el selector.';
      } else if (raw.includes('404') || raw.includes('not found') || raw.includes('is not supported')) {
        errMsg = 'Modelo no disponible. Selecciona otro desde el selector.';
      } else if (raw.includes('API_KEY') || raw.includes('401') || raw.includes('403')) {
        errMsg = 'Error de autenticación. Verifica la API key.';
      } else if (raw.includes('fetch') || raw.includes('network') || raw.includes('Failed')) {
        errMsg = 'No se pudo conectar. Verifica tu conexión a internet.';
      } else {
        errMsg = 'Ocurrió un error. Intenta de nuevo en unos segundos.';
      }
      setMessages(prev => [...prev, { role: 'model', text: errMsg, timestamp: Date.now() }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, isLimited, currentModel, content, messages, recordRequest, activeRef]);

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('teo-chat-history');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Content area */}
      <div className="flex-1 overflow-y-auto pb-1 scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-1">
            <Speech size={48} strokeWidth={1} className="text-stone-300 dark:text-zinc-800 mb-4" />
            <p className="text-[13px] text-stone-400 dark:text-zinc-600 text-center max-w-[18rem] mb-8">Preguntá lo que necesites para el examen.</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {getSuggestedQuestions(content, selectedChapter).map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-zinc-800/60 text-[11px] text-stone-500 dark:text-zinc-500 hover:text-stone-800 dark:hover:text-zinc-300 hover:border-stone-300 dark:hover:border-zinc-700/60 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 pt-4 max-w-3xl mx-auto px-6">
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.role === 'user' ? (
                  <div className="flex flex-col items-end gap-1 mb-1">
                    <div className="bg-stone-100 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700/30 rounded-xl rounded-br-sm px-3 py-2 max-w-[85%] text-[14px] text-stone-800 dark:text-zinc-300">
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-stone-400 dark:text-zinc-700 px-1">{formatTime(msg.timestamp)}</span>
                  </div>
                ) : (
                  <div className="max-w-full">
                    <p className="text-[14px] font-serif font-semibold text-stone-500 dark:text-zinc-400 mb-2">Dios bajó y dijo:</p>
                    <RenderContent text={msg.text} />
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(msg.text)}
                        className="text-stone-400 dark:text-zinc-700 hover:text-stone-600 dark:hover:text-zinc-400 transition-colors"
                        title="Copiar"
                      >
                        <Copy size={13} />
                      </button>
                      <button
                        onClick={() => { const prev = messages[i - 1]; if (prev?.role === 'user') sendMessage(prev.text); }}
                        className="text-stone-400 dark:text-zinc-700 hover:text-stone-600 dark:hover:text-zinc-400 transition-colors"
                        title="Rehacer"
                      >
                        <RefreshCw size={13} />
                      </button>
                      {msg.chapterRef && (
                        <span className="text-[10px] text-stone-400 dark:text-zinc-600 italic ml-2">{msg.chapterRef}</span>
                      )}
                      <span className="text-[10px] text-stone-300 dark:text-zinc-800 ml-auto">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1.5 py-2">
                <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-zinc-600 animate-pulse" />
                <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-zinc-600 animate-pulse [animation-delay:150ms]" />
                <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-zinc-600 animate-pulse [animation-delay:300ms]" />
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 pt-2 pb-14 sm:pb-1 max-w-3xl mx-auto w-full px-4 sm:px-6">
        {activeRef && (
          <div className="flex items-center gap-2 px-3 py-2 mb-1.5 rounded-lg bg-stone-200/60 dark:bg-zinc-800 border border-stone-300/60 dark:border-zinc-700/50">
            <span className="text-[11px] text-stone-600 dark:text-zinc-300 truncate flex-1">“{activeRef}”</span>
            <button onClick={() => setActiveRef(null)} className="shrink-0 text-stone-400 dark:text-zinc-600 hover:text-stone-600 dark:hover:text-zinc-400">
              <X size={11} />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2 px-4 h-11 bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800/50 rounded-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            disabled={isLimited}
            placeholder={isLimited ? 'Límite alcanzado' : 'Pregunta algo...'}
            className="flex-1 bg-transparent text-[14px] text-stone-800 dark:text-zinc-200 placeholder:text-stone-400 dark:placeholder:text-zinc-600 outline-none disabled:opacity-40"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading || isLimited}
            className="shrink-0 w-8 h-8 rounded-full bg-stone-800 dark:bg-zinc-200 flex items-center justify-center disabled:opacity-20 transition-opacity"
          >
            <Send size={14} strokeWidth={2} className="text-white dark:text-zinc-900" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-1.5 px-1">
          <div>
            {messages.length > 0 && (
              <button onClick={clearHistory} className="flex items-center gap-1 text-[10px] text-stone-400 dark:text-zinc-700 hover:text-stone-600 dark:hover:text-zinc-500 transition-colors">
                <Trash2 size={9} />
                Limpiar
              </button>
            )}
          </div>
          <AIQuotaStatus />
        </div>
      </div>
    </div>
  );
}
