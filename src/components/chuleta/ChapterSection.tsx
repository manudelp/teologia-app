import type { ChuletaSection, TableData, ComparisonData } from '../../types';

interface Props {
  section: ChuletaSection;
  showMnemonics: boolean;
}

export function ChapterSection({ section, showMnemonics }: Props) {
  return (
    <div className="chuleta-section mt-8 first:mt-0">
      <h3 className="font-serif text-lg sm:text-xl text-stone-800 dark:text-zinc-200 mb-3">{section.title}</h3>
      {renderContent(section)}
      {showMnemonics && section.mnemonic && (
        <div className="mt-4 px-4 py-3 bg-amber-50/50 dark:bg-amber-950/20 border-l-2 border-amber-400 dark:border-amber-600 rounded-r-lg">
          <p className="font-serif italic text-sm text-amber-800 dark:text-amber-300">{section.mnemonic}</p>
        </div>
      )}
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
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-stone-700 dark:text-zinc-300">
          <span className="text-amber-400 dark:text-amber-600 shrink-0 mt-0.5">&bull;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
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
