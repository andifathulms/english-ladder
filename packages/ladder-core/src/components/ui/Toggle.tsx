'use client';

import { useId } from 'react';

type Props = { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void; onLabel: string; offLabel: string };

export function Toggle({ label, hint, checked, onChange, onLabel, offLabel }: Props) {
  // An id without spaces: aria-labelledby is a list of ids, so "t-Efek suara" named nothing.
  const id = `t${useId().replace(/:/g, '')}`;
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex min-w-0 flex-1 flex-col">
        <span id={id} className="font-bold">{label}</span>
        {hint && <span className="text-small text-muted">{hint}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        onClick={() => onChange(!checked)}
        className="flex min-h-touch shrink-0 items-center gap-2"
      >
        <span
          aria-hidden
          className="relative h-[28px] w-[48px] rounded-full transition-colors duration-quick"
          style={{ background: checked ? 'var(--accent)' : 'var(--rule)' }}
        >
          <span
            className="toggle-knob absolute top-[3px] h-[22px] w-[22px] rounded-full transition-transform duration-quick"
            style={
              {
                insetInlineStart: 3,
                background: 'var(--surface)',
                '--knob-x': checked ? '20px' : '0px',
              } as React.CSSProperties
            }
          />
        </span>
        <span className="label text-muted">{checked ? onLabel : offLabel}</span>
      </button>
    </div>
  );
}
