import type { ChuletaSection, TableData, ComparisonData } from '../../types';

interface Props {
  section: ChuletaSection;
}

export function ChapterSection({ section }: Props) {
  return (
    <div className="chuleta-section mt-8 first:mt-0">
      <h3 className="font-serif text-lg sm:text-xl text-stone-800 dark:text-zinc-200 mb-3">{section.title}</h3>
      {renderContent(section)}
    </div>
  );
}

function renderContent(section: ChuletaSection) {
  switch (section.type) {
    case 'list':
      return <ListContent items={section.content as string[]} />;
    case 'table':
      return <TableContent data={section.content as TableData} />;
    case 'comparison':
      return <ComparisonContent data={section.content as ComparisonData} />;
    default:
      return null;
  }
}

function ListContent({ items }: { items: string[] }) {
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
            <div className="px-3 py-1.5 bg-stone-100/60 dark:bg-zinc-800/50 rounded-md mb-1.5">
              <span className="text-sm font-medium text-stone-800 dark:text-zinc-200">{group.header}</span>
            </div>
          )}
          {group.header && group.children.length === 0 && !group.divider && (
            <div className="flex gap-3 text-sm leading-relaxed text-stone-700 dark:text-zinc-300">
              {/^\d+\.\s/.test(group.header) ? (
                <>
                  <span className="text-amber-500 dark:text-amber-500 shrink-0 mt-0.5 font-medium tabular-nums w-5 text-right">{group.header.match(/^(\d+)\./)?.[1]}.</span>
                  <span>{group.header.replace(/^\d+\.\s/, '')}</span>
                </>
              ) : (
                <>
                  <span className="text-amber-400 dark:text-amber-600 shrink-0 mt-0.5">&bull;</span>
                  <span>{group.header}</span>
                </>
              )}
            </div>
          )}
          {group.children.length > 0 && (
            <div className="ml-3 border-l-2 border-amber-400/40 dark:border-amber-600/40 pl-3 space-y-1">
              {group.children.map((child, j) => (
                <p key={j} className="text-sm text-stone-600 dark:text-zinc-400 leading-relaxed">{child}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TableContent({ data }: { data: TableData }) {
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
            <tr key={i} className="hover:bg-stone-50 dark:hover:bg-zinc-900/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 border-b border-stone-100/80 dark:border-zinc-800/50 text-stone-700 dark:text-zinc-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComparisonContent({ data }: { data: ComparisonData }) {
  return (
    <div className="space-y-3">
      {data.items.map((item, i) => (
        <div key={i} className="text-sm leading-relaxed">
          <span className="font-medium text-stone-800 dark:text-zinc-200">{item.label}</span>
          <span className="text-stone-400 dark:text-zinc-600 mx-2">&mdash;</span>
          <span className="text-stone-600 dark:text-zinc-400">{item.description}</span>
        </div>
      ))}
    </div>
  );
}
