'use client';

// German Ladder's rendering slots (CourseConfig.components): how German lines draw per place.
import Link from 'next/link';
import type { SentenceSlotProps } from '@ladder/core/course/types';
import type { Rung as CoreRung } from '@ladder/core/lib/types';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { useT } from '@ladder/core/components/ProgressProvider';
import { rungHref } from '@ladder/core/lib/routes';
import type { Rung } from '@/course/types';
import type { GermanKey } from '@/i18n/overrides';
import { StressWords } from './de/StressWords';

/** Tirukan: the line to repeat, each word's stressed syllable underlined (no play button: the card has its own). */
function TirukanLine({ text, id }: { text: string; id?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p lang="de" className="font-display text-sentence font-medium text-ink">
        <StressWords text={text} />
      </p>
      {id && (
        <p lang="id" className="id-text">
          {id}
        </p>
      )}
    </div>
  );
}

/** Core's Sentence everywhere, and the stress view for Tirukan. */
export function GermanSentence({ line, use }: SentenceSlotProps) {
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
      return <Sentence en={line.text} id={line.meaning?.id} size="body" />;
    case 'tirukan':
      return <TirukanLine text={line.text} id={line.meaning?.id} />;
  }
}

/** *Leiter* (ladder) beside the wordmark's range line, display italic (DESIGN §2). */
export function WordmarkLeiter() {
  return (
    <span lang="de" className="font-display text-[1rem] italic leading-none">
      Leiter
    </span>
  );
}

/** The exit flag (DESIGN §6): a small brass flag chip on rungs that complete A1, B1, B2 or C1. */
export function ExitFlag({ label, onBoard = false }: { label: string; onBoard?: boolean }) {
  const { t } = useT<GermanKey>();
  return (
    <span
      className={`label inline-flex items-center gap-1 whitespace-nowrap rounded-sm px-[6px] py-[1px] ${onBoard ? 'text-brass' : 'text-dasar'}`}
      style={{ boxShadow: 'inset 0 0 0 1px currentColor' }}
      title={t('rung.exit')}
    >
      <svg aria-hidden width="8" height="10" viewBox="0 0 8 10">
        <path d="M1 0v10M1 1h6L5.5 3 7 5H1" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="sr-only">{t('rung.exit')}: </span>
      {label}
    </span>
  );
}

/** The level chip (DESIGN §6): the CEFR half-level (A1.1, A1.2 …) in mono, plus the exit flag. */
export function CefrChip({ rung, onBoard = false }: { rung: CoreRung; onBoard?: boolean }) {
  const { t } = useT<GermanKey>();
  const r = rung as unknown as Rung;
  const level = r.cefr === 'Pre-A1' ? t('rung.preA1') : r.cefr;
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <span className={`label tnum whitespace-nowrap ${onBoard ? 'text-brass' : 'text-muted'}`}>{level}</span>
      {r.milestone && <ExitFlag label={r.milestone.label} onBoard={onBoard} />}
    </span>
  );
}

/** The rung's subtitle ("Hallo!", "Alltag") on the rail and the boards. */
export function rungSubtitle(rung: CoreRung): string | null {
  return (rung as unknown as Rung).subtitle ?? null;
}

/** Under door 1: "Mau latihan bunyi dulu? Mulai dari Dasar." (PRD §5.1). */
export function DoorNote() {
  const { t } = useT<GermanKey>();
  return (
    <p className="text-small text-board-muted">
      {t('home.doorNote')}{' '}
      <Link href={rungHref('dasar')} className="font-bold text-board-ink">
        {t('home.doorNoteLink')}
      </Link>
    </p>
  );
}

/** Under the climb line (DESIGN §6): the exit on A1, B1, B2 rungs, then *Schritt für Schritt.* */
export function ClimbExtra({ rung }: { rung: CoreRung }) {
  const { t } = useT<GermanKey>();
  const m = (rung as unknown as Rung).milestone;
  return (
    <>
      {m && (
        <p className="max-w-measure text-body text-board-ink" data-exit>
          {t('climb.exit', { level: m.label.split(' · ')[0], exam: m.exam })}
        </p>
      )}
      <p lang="de" className="font-display text-h2 italic text-board-muted">
        Schritt für Schritt.
      </p>
    </>
  );
}
