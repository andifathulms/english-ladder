'use client';

import { useT } from '@ladder/core/components/ProgressProvider';
import type { SpanishKey } from '@/i18n/overrides';

/**
 * A noun's gender (DESIGN §3.2): never colour alone and never blue/pink. A square chip for
 * masculine and a round one for feminine, each with its article and a text label for screen readers.
 */
export function GenderChip({ gender, el = false }: { gender: 'm' | 'f' | 'mf'; el?: boolean }) {
  const { t } = useT<SpanishKey>();
  if (gender === 'mf') {
    return (
      <span className="label inline-flex items-center gap-1 whitespace-nowrap rounded-sm bg-paper-2 px-2 py-[2px] text-muted" title={t('gender.mf')}>
        el/la<span className="sr-only"> · {t('gender.mf')}</span>
      </span>
    );
  }
  const f = gender === 'f';
  return (
    <span
      className={`label inline-flex items-center gap-1 whitespace-nowrap px-2 py-[2px] ${f ? 'rounded-full text-fem' : 'rounded-sm text-masc'}`}
      style={{ boxShadow: `inset 0 0 0 1.5px var(--${f ? 'fem' : 'masc'})` }}
    >
      {f ? (el ? 'el · f' : 'la') : 'el'}
      <span className="sr-only"> · {t(f ? 'gender.f' : 'gender.m')}</span>
    </span>
  );
}
