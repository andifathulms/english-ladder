'use client';

// Arabic Ladder's rendering slots for the engine (CourseConfig.components, prose, strands, lesson
// session, climb, home, capstones, settings). Arabic only reaches the page through ArIsland.
import { Fragment, useEffect, useState } from 'react';
import type { SentenceSlotProps, StrandCard, LessonSession } from '@ladder/core/course/types';
import type { Quote, Rung as CoreRung } from '@ladder/core/lib/types';
import { useT } from '@ladder/core/components/ProgressProvider';
import { TirukanCard } from '@ladder/core/components/lesson/TirukanCard';
import { hasArabic, findArabicRuns } from '@/lib/arabic/text';
import type { ArabicKey } from '@/i18n/overrides';
import type { Lesson, Rung } from '@/course/types';
import { ArIsland } from './ar/ArIsland';
import { ArSentence } from './ar/ArSentence';
import { Translit } from './ar/Translit';
import { LessonTextProvider } from './ar/LessonText';
import { LessonTopToggles } from './LessonTopToggles';
import { MesirCard, SoundCard, TalkCard, WordsCard } from './StrandCards';
import { MakhrajThumb } from '@/visuals/Makhraj';

/** Target lines through ArSentence, sized and supported per place (DESIGN §6.4). */
export function ArabicSentence({ line, use }: SentenceSlotProps) {
  const p = { ar: line.text, tr: line.translit, id: line.meaning?.id, en: line.meaning?.en };
  switch (use) {
    case 'example':
      return <ArSentence {...p} note={line.note} />;
    case 'worked':
      return <ArSentence {...p} />;
    case 'pairOff':
      return <ArSentence ar={line.text} tr={line.translit} off play={false} size="body" />;
    case 'pairNatural':
      return <ArSentence ar={line.text} tr={line.translit} size="body" />;
    case 'reading':
      return <ArSentence ar={line.text} tr={line.translit} size="body" />;
    case 'dialogue':
      return <ArSentence {...p} size="body" variety={line.variety as 'fusha' | 'eg' | undefined} chip={false} showTranslit />;
    case 'tirukan':
      return <ArSentence {...p} play={false} />;
  }
}

/** A ___ blank on the board: a brass underline, announced as "blank". */
function Blank({ width }: { width: string }) {
  return (
    <>
      <span aria-hidden className={`mx-[2px] inline-block h-[0.9em] ${width} border-b-[3px] border-brass align-[-0.1em]`} />
      <span className="sr-only">blank</span>
    </>
  );
}

/**
 * The quoted resume line. Arabic is set in Naskh at --t-ar-body in an RTL island, with the
 * transliteration beneath when the rung shows it; Latin lines keep the display serif.
 */
export function BoardQuote({ quote, rung }: { quote: Quote; rung: CoreRung | undefined }) {
  const showTr = (rung as Rung | undefined)?.translit === 'always';
  const parts = quote.text.split('___');
  const withBlanks = (w: string) =>
    parts.map((p, i) => (
      <span key={i}>
        {p}
        {i < parts.length - 1 && <Blank width={w} />}
      </span>
    ));
  if (hasArabic(quote.text)) {
    return (
      <div className="flex flex-col gap-1">
        <ArIsland block as="p" size="body" className="text-board-ink">
          {withBlanks('w-[3em]')}
        </ArIsland>
        {showTr && quote.tr && <Translit text={quote.tr} onBoard />}
      </div>
    );
  }
  return (
    <p className="font-display text-h1 font-medium leading-tight tracking-[-0.01em] text-board-ink" lang="id">
      {withBlanks('w-[2.4em]')}
    </p>
  );
}

/** Plain prose text with any Arabic runs wrapped in inline islands. */
function WithIslands({ text, accent = false }: { text: string; accent?: boolean }) {
  const runs = findArabicRuns(text);
  if (!runs.length) return <>{text}</>;
  const out: React.ReactNode[] = [];
  let last = 0;
  runs.forEach((r, i) => {
    if (r.start > last) out.push(<Fragment key={`t${i}`}>{text.slice(last, r.start)}</Fragment>);
    out.push(
      <ArIsland key={`a${i}`} size="small" className={accent ? 'text-accent' : undefined}>
        {r.text}
      </ArIsland>,
    );
    last = r.end;
  });
  if (last < text.length) out.push(<Fragment key="end">{text.slice(last)}</Fragment>);
  return <>{out}</>;
}

/** Prose text runs: bare Arabic is detected and wrapped in an island. */
export const ProseText = ({ text }: { text: string }) => <WithIslands text={text} />;

/** **term** is accent bold for Latin, accent colour only for Arabic (never bold); [[focus]] likewise. */
export function ProseTerm({ text, kind }: { text: string; kind: 'strong' | 'focus' }) {
  if (kind === 'focus') {
    return hasArabic(text) ? (
      <ArIsland size="small" className="ar-focus">
        {text}
      </ArIsland>
    ) : (
      <span lang="ar-Latn" className="focus-word">
        {text}
      </span>
    );
  }
  if (hasArabic(text) && !/[A-Za-z]/.test(text)) {
    return (
      <ArIsland size="small" className="text-accent">
        {text}
      </ArIsland>
    );
  }
  return (
    <strong lang="ar-Latn" className="font-bold not-italic text-accent">
      <WithIslands text={text} accent />
    </strong>
  );
}

// Strand cards (DESIGN §6.6): Mesir, Bunyi, Ngobrol and Tirukan on Examples; Kata on Contrast.
const ar = (l: unknown) => l as Lesson;
export const MesirStrand: StrandCard = ({ lesson }) => <MesirCard examples={ar(lesson).examples} note={ar(lesson).eg_note} />;
export const SoundStrand: StrandCard = ({ lesson }) => {
  const sound = ar(lesson).sound;
  if (!sound) return null;
  return <SoundCard sound={sound} thumb={<MakhrajThumb letters={[sound.focus, sound.compare ?? ''].filter((c) => c.length === 1)} />} />;
};
export const TalkStrand: StrandCard = ({ lesson }) => (ar(lesson).talk ? <TalkCard talk={ar(lesson).talk!} /> : null);
export const TirukanStrand: StrandCard = ({ lesson }) => {
  const x = ar(lesson).tirukan;
  return <TirukanCard line={{ text: x.ar, translit: x.tr, meaning: { id: x.id, ...(x.en ? { en: x.en } : {}) } }} />;
};
export const WordsStrand: StrandCard = ({ lesson }) => (ar(lesson).words ? <WordsCard words={ar(lesson).words!} /> : null);

/**
 * Lesson-scoped supports (CLAUDE.md §7.2): plain state, so they reset when the lesson closes. Latin
 * and Harakat toggles in the top bar, the text provider around the step, and a one-time hold hint.
 */
export function useArabicSession(coreRung: CoreRung, step: number): LessonSession {
  const rung = coreRung as Rung;
  const { t } = useT<ArabicKey>();
  const [latinOn, setLatinOn] = useState(false);
  const [harakatOn, setHarakatOn] = useState(false);
  const [holdHint, setHoldHint] = useState(rung.harakat !== 'full');
  const showTranslit = rung.translit === 'always' || (rung.translit === 'on-request' && latinOn);
  // The hold hint shows once per lesson, on the first Examples visit.
  useEffect(() => {
    if (step > 2) setHoldHint(false);
  }, [step]);
  return {
    toggles: (
      <LessonTopToggles
        translit={rung.translit}
        harakat={rung.harakat}
        latinOn={latinOn}
        harakatOn={harakatOn}
        onLatin={setLatinOn}
        onHarakat={setHarakatOn}
      />
    ),
    wrap: (children) => (
      <LessonTextProvider harakat={rung.harakat} showTranslit={showTranslit} harakatOn={harakatOn}>
        {children}
      </LessonTextProvider>
    ),
    examplesIntro: holdHint && (
      <p className="self-start rounded-sm bg-paper-2 px-3 py-1 text-small text-muted" role="note">
        {t('lesson.holdHint')}
      </p>
    ),
  };
}

/** سُلَّمًا سُلَّمًا (sullaman sullaman, rung by rung) under the climb line. */
export function ClimbExtra() {
  return (
    <ArIsland block as="p" size="title" face="display" className="text-center text-board-muted" title="sullaman sullaman: setapak demi setapak">
      سُلَّمًا سُلَّمًا
    </ArIsland>
  );
}

/** سُلَّم on the two-door board. */
export function DoorsOrnament() {
  return (
    <ArIsland face="display" className="text-ar-title leading-none text-board-ink" aria-hidden>
      سُلَّم
    </ArIsland>
  );
}

/** سُلَّم after the wordmark's range line. */
export function WordmarkSullam() {
  return (
    <ArIsland className="text-[1rem] leading-none" title="sullam: tangga">
      سُلَّم
    </ArIsland>
  );
}

/** The Ukuran teks Arab preview line: كِتَابٌ جَدِيدٌ (kitābun jadīdun, a new book). */
export function ArabicSizePreview() {
  const { t } = useT<ArabicKey>();
  return (
    <div className="flex flex-col gap-1 rounded-md bg-paper-2 px-4 py-2" aria-live="polite">
      <ArIsland block size="sentence">
        كِتَابٌ جَدِيدٌ
      </ArIsland>
      <p className="text-small">
        <span lang="ar-Latn" className="tr-text">
          kitābun jadīdun
        </span>{' '}
        · <span className="id-text">{t('settings.arabicSizePreview')}</span>
      </p>
    </div>
  );
}

/** Placement: reading is what's being checked, so full harakat and no transliteration anywhere. */
export function PlacementWrap({ children }: { children: React.ReactNode }) {
  return (
    <LessonTextProvider harakat="full" showTranslit={false}>
      {children}
    </LessonTextProvider>
  );
}
