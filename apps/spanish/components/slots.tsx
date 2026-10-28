'use client';

// Spanish Ladder's rendering slots (CourseConfig.components): how Spanish lines draw per place.
import type { SentenceSlotProps } from '@ladder/core/course/types';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { EsLine } from './es/EsLine';
import Link from 'next/link';
import type { Rung as CoreRung } from '@ladder/core/lib/types';
import { useT } from '@ladder/core/components/ProgressProvider';
import { rungHref } from '@ladder/core/lib/routes';
import type { Rung } from '@/course/types';
import type { SpanishKey } from '@/i18n/overrides';

/** Core's Sentence everywhere, except Tirukan (stressed syllables lightly underlined) and lines
 *  with a variety of their own (a Spain-set dialogue). */
export function SpanishSentence({ line, use }: SentenceSlotProps) {
  const variety = line.variety === 'es' ? 'es' : 'latam';
  switch (use) {
    case 'example':
      return <Sentence en={line.text} id={line.meaning?.id} note={line.note} />;
    case 'worked':
      return <Sentence en={line.text} id={line.meaning?.id} />;
    case 'pairOff':
      return <Sentence en={line.text} off play={false} />;
    case 'pairNatural':
      return <Sentence en={line.text} />;
    case 'reading':
    case 'dialogue':
      return <EsLine text={line.text} id={line.meaning?.id} variety={variety} size="body" />;
    case 'tirukan':
      return <EsLine text={line.text} id={line.meaning?.id} play={false} stress />;
  }
}

/** *escalera* (ladder, staircase) beside the wordmark's range line, display italic (DESIGN §2). */
export function WordmarkEscalera() {
  return (
    <span lang="es" className="font-display text-[1rem] italic leading-none">
      escalera
    </span>
  );
}

/** The level chip (DESIGN §6): "A1 · DELE" in mono, muted on paper and brass on the board; Dasar
 *  has no DELE level and shows "Pra-A1". */
export function DeleChip({ rung, onBoard = false }: { rung: CoreRung; onBoard?: boolean }) {
  const { t } = useT<SpanishKey>();
  const r = rung as unknown as Rung;
  const label = r.dele === '—' ? t('rung.noDele') : `${r.dele} · ${t('rung.dele')}`;
  return <span className={`label tnum whitespace-nowrap ${onBoard ? 'text-brass' : 'text-muted'}`}>{label}</span>;
}

/** The rung's Indonesian subtitle ("Aku dan duniaku") on the rail and the boards. */
export function rungSubtitle(rung: CoreRung): string | null {
  return (rung as unknown as Rung).subtitle ?? null;
}

/** Under door 1: "Mau latihan bunyi dulu? Mulai dari Dasar." (PRD §5.1). */
export function DoorNote() {
  const { t } = useT<SpanishKey>();
  return (
    <p className="text-small text-board-muted">
      {t('home.doorNote')}{' '}
      <Link href={rungHref('dasar')} className="font-bold text-board-ink">
        {t('home.doorNoteLink')}
      </Link>
    </p>
  );
}

/** *Paso a paso.* under the climb line (DESIGN §6). */
export function ClimbExtra() {
  return (
    <p lang="es" className="font-display text-h2 italic text-board-muted">
      Paso a paso.
    </p>
  );
}
