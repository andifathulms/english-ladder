'use client';

import { useT } from '@ladder/core/components/ProgressProvider';
import type { GermanKey } from '@/i18n/overrides';

const ARTICLE = { m: 'der', f: 'die', n: 'das' } as const;
const TOKEN = { m: 'masc', f: 'fem', n: 'neut' } as const;

/** The chip's shape (DESIGN §3.2): a square for der, a circle for die, a triangle for das. */
function Shape({ gender }: { gender: 'm' | 'f' | 'n' }) {
  const c = `var(--${TOKEN[gender]})`;
  return (
    <svg aria-hidden width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
      {gender === 'm' && <rect x="1" y="1" width="8" height="8" fill={c} />}
      {gender === 'f' && <circle cx="5" cy="5" r="4.2" fill={c} />}
      {gender === 'n' && <path d="M5 0.8 9.4 9 0.6 9Z" fill={c} />}
    </svg>
  );
}

/**
 * A noun's gender: never colour alone and never blue/pink. The article in its gender colour, a shape
 * (square der, circle die, triangle das) and a text label for screen readers.
 */
export function GenderChip({ gender, size = 'small' }: { gender: 'm' | 'f' | 'n'; size?: 'small' | 'large' }) {
  const { t } = useT<GermanKey>();
  return (
    <span
      lang="de"
      data-gender={gender}
      className={`inline-flex items-center gap-[6px] whitespace-nowrap rounded-sm ${size === 'large' ? 'px-4 py-2 font-display text-h2' : 'label px-2 py-[2px]'}`}
      style={{ color: `var(--${TOKEN[gender]})`, boxShadow: `inset 0 0 0 1.5px var(--${TOKEN[gender]})` }}
    >
      <Shape gender={gender} />
      {ARTICLE[gender]}
      <span className="sr-only" lang="id">
        {' '}
        · {t(`gender.${gender}`)}
      </span>
    </span>
  );
}
