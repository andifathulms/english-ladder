'use client';

import { useRoving } from '@ladder/core/components/visuals/useRoving';

/** A radiogroup of chips with roving focus (arrow keys), the shared control row of the visuals. */
export function Chips<T extends string>({
  label,
  options,
  value,
  onChange,
  render,
  lang,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  render?: (v: T) => React.ReactNode;
  /** The chips' text language (Spanish words: es-419). */
  lang?: string;
}) {
  const roving = useRoving(options, value, onChange);
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2" onKeyDown={roving.onKeyDown}>
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          lang={lang}
          {...roving.itemProps(o, i)}
          // With nothing chosen (e.g. a typed word), the first chip takes the group's tab stop.
          tabIndex={o === value || (i === 0 && !options.includes(value)) ? 0 : -1}
          className={`flex min-h-touch items-center rounded-full border-2 px-4 py-1 transition-colors duration-quick ${
            o === value ? 'border-accent bg-accent text-accent-ink' : 'border-rule bg-surface text-ink'
          }`}
        >
          {render ? render(o) : o}
        </button>
      ))}
    </div>
  );
}
