import { MessageCircle } from 'lucide-react';
import type { ChuletaSection, TableData, ComparisonData } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  section: ChuletaSection;
  chapterLabel?: string;
}

export function ChapterSection({ section, chapterLabel }: Props) {
  return (
    <div className="chuleta-section mt-8 first:mt-0">
      <h3 className="font-serif text-lg sm:text-xl text-stone-800 dark:text-zinc-200 mb-3">{section.title}</h3>
      {renderContent(section, chapterLabel)}
    </div>
  );
}

function renderContent(section: ChuletaSection, chapterLabel?: string) {
  switch (section.type) {
    case 'list':
      return <ListContent items={section.content as string[]} chapterLabel={chapterLabel} />;
    case 'table':
      return <TableContent data={section.content as TableData} chapterLabel={chapterLabel} />;
    case 'comparison':
      return <ComparisonContent data={section.content as ComparisonData} chapterLabel={chapterLabel} />;
    default:
      return null;
  }
}

function RefBtn({ text, chapter }: { text: string; chapter?: string }) {
  const { sendToChat } = useApp();
  const ref = chapter ? `${chapter} · ${text}` : text;
  return (
    <button
      onClick={() => sendToChat(ref)}
      className="opacity-0 group-hover:opacity-100 shrink-0 ml-1 p-0.5 text-stone-300 dark:text-zinc-700 hover:text-amber-500 dark:hover:text-amber-500 transition-all"
      title="Preguntar a Dios"
    >
      <MessageCircle size={12} />
    </button>
  );
}

function ListContent({ items, chapterLabel }: { items: string[]; chapterLabel?: string }) {
  // Group items: main items with sub-items become groups, standalone items stay as bullets
  const isDivider = (s: string) => /^\s*—/.test(s) && /—\s*$/.test(s);
  const groups: { header: string | null; children: string[]; divider?: boolean }[] = [];
  for (const item of items) {
    if (item.match(/^\s+[•\-]\s/)) {
      const text = item.replace(/^\s+[•\-]\s/, '');
      if (groups.length === 0) groups.push({ header: null, children: [] });
      groups[groups.length - 1].children.push(text);
    } else if (isDivider(item)) {
      groups.push({ header: item, children: [], divider: true });
    } else {
      groups.push({ header: item, children: [] });
    }
  }

  return (
    <div className="space-y-3">
      {groups.map((group, i) => (
        <div key={i}>
          {group.divider && group.header && (
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-stone-200 dark:bg-zinc-700" />
              <span className="text-xs font-medium text-stone-500 dark:text-zinc-500 uppercase tracking-wide">{group.header.replace(/—/g, '').trim()}</span>
              <div className="flex-1 h-px bg-stone-200 dark:bg-zinc-700" />
            </div>
          )}
          {group.header && group.children.length > 0 && !group.divider && (
            <div className="group flex items-center px-3 py-1.5 bg-stone-100/60 dark:bg-zinc-800/50 rounded-md mb-1.5">
              <span className="flex-1 text-sm font-medium text-stone-800 dark:text-zinc-200">{group.header}</span>
              <RefBtn text={`${group.header}: ${group.children.join(', ')}`} chapter={chapterLabel} />
            </div>
          )}
          {group.header && group.children.length === 0 && !group.divider && (
            <div className="group flex items-center gap-3 text-sm leading-relaxed text-stone-700 dark:text-zinc-300">
              {/^\d+\.\s/.test(group.header) ? (
                <>
                  <span className="text-amber-500 dark:text-amber-500 shrink-0 mt-0.5 font-medium tabular-nums w-5 text-right">{group.header.match(/^(\d+)\./)?.[1]}.</span>
                  <span className="flex-1">{group.header.replace(/^\d+\.\s/, '')}</span>
                </>
              ) : (
                <>
                  <span className="text-amber-400 dark:text-amber-600 shrink-0 mt-0.5">&bull;</span>
                  <span className="flex-1">{group.header}</span>
                </>
              )}
              <RefBtn text={group.header} chapter={chapterLabel} />
            </div>
          )}
          {group.children.length > 0 && (
            <div className="ml-3 border-l-2 border-amber-400/40 dark:border-amber-600/40 pl-3 space-y-1">
              {group.children.map((child, j) => (
                <div key={j} className="group flex items-center gap-1">
                  <p className="flex-1 text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">{child}</p>
                  <RefBtn text={child} chapter={chapterLabel} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TableContent({ data, chapterLabel }: { data: TableData; chapterLabel?: string }) {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {data.headers.map((h, i) => (
              <th key={i} className="text-left px-3 py-2 bg-stone-100/60 dark:bg-zinc-900/50 border-b border-stone-200/60 dark:border-zinc-800 font-medium text-stone-600 dark:text-zinc-400 text-xs">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i} className="group hover:bg-stone-50 dark:hover:bg-zinc-900/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 border-b border-stone-100/80 dark:border-zinc-800/50 text-stone-700 dark:text-zinc-300">
                  {cell}
                </td>
              ))}
              <td className="px-1 py-2 border-b border-stone-100/80 dark:border-zinc-800/50 w-6">
                <RefBtn text={row.join(' — ')} chapter={chapterLabel} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComparisonContent({ data, chapterLabel }: { data: ComparisonData; chapterLabel?: string }) {
  return (
    <div className="space-y-3">
      {data.items.map((item, i) => (
        <div key={i} className="group flex items-center text-sm leading-relaxed">
          <span className="font-medium text-stone-800 dark:text-zinc-200">{item.label}</span>
          <span className="text-stone-400 dark:text-zinc-600 mx-2">&mdash;</span>
          <span className="flex-1 text-stone-600 dark:text-zinc-400">{item.description}</span>
          <RefBtn text={`${item.label}: ${item.description}`} chapter={chapterLabel} />
        </div>
      ))}
    </div>
  );
}
