'use client';

// Japanese Ladder's rendering slots for the engine (CourseConfig.components, ladder, climb, home,
// settings). Japanese reaches the page through JaText (plain) and JaSentence (furigana; M2).
import { Fragment, useEffect, useState } from 'react';
import type { LessonSession, SentenceSlotProps, StrandCard, TargetTextProps } from '@ladder/core/course/types';
import type { Gloss, Quote, Rung as CoreRung, Title } from '@ladder/core/lib/types';
import { useT } from '@ladder/core/components/ProgressProvider';
import { useLessonData } from '@ladder/core/components/lesson/LessonData';
import { TirukanCard } from '@ladder/core/components/lesson/TirukanCard';
import type { JapaneseKey } from '@/i18n/overrides';
import type { GlossaryEntry, JaLessonData, Lesson, Rung } from '@/course/types';
import { hasJapanese, toPlain } from '@/lib/ja/text';
import { morae } from '@/lib/ja/kana';
import { JaTextOverride, JaTextProvider, type RomajiMode } from './ja/JaContext';
import { LessonTopToggles } from './LessonTopToggles';
import { KanjiCard, PoliteCard, SoundCard, TalkCard, WordsCard, WorkCard } from './StrandCards';
import { Seal } from './Seal';
import { MoraBeatsMini } from '@/visuals/MoraBeatsMini';
import { JaText } from './ja/JaText';
import { JlptChip } from './JlptChip';
import { JaSentence } from './ja/JaSentence';

const jr = (r: CoreRung) => r as unknown as Rung;

type JaLine = { ja: string; kana: string; id?: string; en?: string; note?: { id: string; en: string } };
const raw = (x: { raw?: unknown }) => x.raw as JaLine;

/** Target lines through JaSentence, sized and supported per place (DESIGN §6.4). */
export function JapaneseSentence({ line, use }: SentenceSlotProps) {
  const e = raw(line);
  switch (use) {
    case 'example':
      return <JaSentence ja={e.ja} id={e.id} en={e.en} note={line.note} />;
    case 'worked':
      return <JaSentence ja={e.ja} id={e.id} en={e.en} note={e.note} />;
    case 'pairOff':
      return <JaSentence ja={e.ja} off play={false} size="body" />;
    case 'pairNatural':
      return <JaSentence ja={e.ja} size="body" />;
    case 'reading':
      // The reading is a list of lines (adapter.reading.text).
      return (
        <ol className="flex flex-col gap-3">
          {(line.raw as JaLine[]).map((l, i) => (
            <li key={i}>
              <JaSentence ja={l.ja} size="body" />
            </li>
          ))}
        </ol>
      );
    case 'dialogue':
      return <JaSentence ja={e.ja} id={e.id} en={e.en} size="body" />;
    case 'tirukan':
      // The sentence's beats above it (DESIGN §6.6).
      return (
        <>
          <MoraBeatsMini kana={e.kana} label={`${e.kana.replace(/\s+/g, '')}: ${morae(e.kana).length}`} />
          <JaSentence ja={e.ja} id={e.id} en={e.en} play={false} />
        </>
      );
  }
}

const JA_SIZE: Record<NonNullable<TargetTextProps['size']>, string> = {
  sentence: 'text-ja-sentence',
  body: 'text-ja-small',
  small: 'text-ja-small',
  glyph: 'text-ja-glyph',
  title: 'text-ja-body',
  inherit: '',
};

/** Target text outside sentences (keywords, answers): JaText at the Japanese sizes, markup removed. */
export function JapaneseTargetText({ children, block, as, size, face, variety: _v, className = '', ...rest }: TargetTextProps) {
  const cls = [size ? JA_SIZE[size] : '', className].filter(Boolean).join(' ');
  const tag = (as ?? (block ? 'div' : 'span')) as 'span';
  return (
    <JaText as={tag} face={face === 'ui' ? 'ui' : 'ja'} className={cls} {...rest}>
      {typeof children === 'string' ? toPlain(children) : children}
    </JaText>
  );
}

/** The rung's Japanese name per place (DESIGN §6.3): Noto Sans JP on the rail, hidden below 380px. */
export function RungSubtitle({ rung, place }: { rung: CoreRung; place: 'rail' | 'board' | 'climb' | 'placement' }) {
  const name = toPlain(jr(rung).name_ja);
  switch (place) {
    case 'rail':
      return (
        <JaText face="ui" className="hidden text-ja-small leading-none text-muted min-[380px]:inline">
          {name}
        </JaText>
      );
    case 'board':
      return (
        <JaText as="p" className="text-ja-body leading-none text-board-muted">
          {name}
        </JaText>
      );
    case 'climb':
      return (
        <JaText as="p" className="text-center text-ja-body text-brass">
          {name}
        </JaText>
      );
    case 'placement':
      return (
        <JaText face="ui" className="text-ja-small leading-none text-muted">
          {name}
        </JaText>
      );
  }
}

export const LevelChip = ({ rung, onBoard }: { rung: CoreRung; onBoard?: boolean }) => (
  <JlptChip jlpt={jr(rung).jlpt} jft={jr(rung).jft} onBoard={onBoard} />
);

/** はしご (hashigo, ladder) after the wordmark's range line: the first word a Kana 1 learner reads. */
export function WordmarkHashigo() {
  return (
    <JaText className="text-[1rem] leading-none" title="hashigo: tangga">
      はしご
    </JaText>
  );
}

/** はしご on the two-door board. */
export function DoorsOrnament() {
  return (
    <JaText className="text-ja-body leading-none text-board-ink" aria-hidden>
      はしご
    </JaText>
  );
}

/** 一歩ずつ (ippo zutsu, one step at a time) under the climb line (DESIGN §6.9). */
export function ClimbExtra() {
  return (
    <p className="flex flex-col items-center gap-1 text-board-muted">
      <JaText className="text-ja-body">一歩ずつ</JaText>
      <span lang="ja-Latn" className="text-small">
        ippo zutsu
      </span>
    </p>
  );
}

/** The Ukuran teks Jepang preview line: わたしは がくせいです。 */
export function JaSizePreview() {
  const { t } = useT<JapaneseKey>();
  return (
    <div className="flex flex-col gap-1 rounded-md bg-paper-2 px-4 py-2" aria-live="polite">
      <JaText as="p" className="text-ja-sentence font-medium">
        わたしは がくせいです。
      </JaText>
      <p className="text-small">
        <span className="id-text">{t('settings.jaSizePreview')}</span>
      </p>
    </div>
  );
}

// Strand cards (DESIGN §6.6): Bunyi, Kanji, Sopan, Kerja, Ngobrol and Tirukan on Examples; Kata on Contrast.
const jl = (l: unknown) => l as Lesson;
export const SoundStrand: StrandCard = ({ lesson }) => {
  const { pitch } = useLessonData<JaLessonData>();
  return jl(lesson).sound ? <SoundCard sound={jl(lesson).sound!} pitch={pitch} /> : null;
};
export const KanjiStrand: StrandCard = () => {
  const { kanjiCards } = useLessonData<JaLessonData>();
  return <KanjiCard cards={kanjiCards} />;
};
export const PoliteStrand: StrandCard = ({ lesson }) => (jl(lesson).polite ? <PoliteCard polite={jl(lesson).polite!} /> : null);
export const WorkStrand: StrandCard = ({ lesson }) => (jl(lesson).work ? <WorkCard work={jl(lesson).work!} /> : null);
export const TalkStrand: StrandCard = ({ lesson }) => (jl(lesson).talk ? <TalkCard talk={jl(lesson).talk!} /> : null);
export const TirukanStrand: StrandCard = ({ lesson }) => {
  const x = jl(lesson).tirukan;
  return <TirukanCard line={{ text: x.ja, translit: x.kana, meaning: { id: x.id, ...(x.en ? { en: x.en } : {}) }, raw: x }} />;
};
export const WordsStrand: StrandCard = ({ lesson }) => (jl(lesson).words ? <WordsCard words={jl(lesson).words!} /> : null);

/** Kana 1's romaji fade (CLAUDE.md §7.2): lessons 1–6 show it, 7–8 only on new kana, 9–10 none. */
export function romajiFor(rung: Rung, order: number): RomajiMode {
  if (rung.romaji !== 'fade') return 'hide';
  return order <= 6 ? 'show' : order <= 8 ? 'new' : 'hide';
}

/**
 * Lesson-scoped supports (CLAUDE.md §7.2): plain state, so they reset when the lesson closes. Furigana
 * and Romaji toggles in the top bar, the text provider around the step, and a one-time hold hint.
 */
export function useJapaneseSession(coreRung: CoreRung, step: number): LessonSession {
  const rung = jr(coreRung);
  const { t } = useT<JapaneseKey>();
  const data = useLessonData<JaLessonData>();
  const [furiganaOn, setFuriganaOn] = useState(false);
  const [romajiOn, setRomajiOn] = useState(false);
  const fades = rung.furigana === 'new' || rung.furigana === 'on-request';
  const base = romajiFor(rung, data.order);
  const [holdHint, setHoldHint] = useState(fades);
  // The hold hint shows once per lesson, on the first Examples visit.
  useEffect(() => {
    if (step > 2) setHoldHint(false);
  }, [step]);
  return {
    toggles: (
      <LessonTopToggles furigana={fades} furiganaOn={furiganaOn} onFurigana={setFuriganaOn} romaji={base === 'new'} romajiOn={romajiOn} onRomaji={setRomajiOn} />
    ),
    wrap: (children) => (
      <JaTextProvider
        furigana={rung.furigana}
        showFurigana={furiganaOn}
        romaji={base === 'new' && romajiOn ? 'show' : base}
        kanaNew={data.kanaNew}
        recentKanji={data.recentKanji}
        rungKanji={data.rungKanji}
      >
        {children}
      </JaTextProvider>
    ),
    examplesIntro: holdHint && (
      <p className="self-start rounded-sm bg-paper-2 px-3 py-1 text-small text-muted" role="note">
        {t('lesson.holdHint')}
      </p>
    ),
  };
}

type JaTitle = { ja: string; kana: string };

/** Titles' Japanese line with furigana under the UI-language heading; plain on the strip. */
export function TitleTarget({ title, place }: { title: Title; place: 'lesson' | 'reading' | 'dialogue' | 'strip' }) {
  const t = title.raw as JaTitle;
  if (place === 'strip') {
    return (
      <JaText as="span" className="text-ja-small text-muted">
        {toPlain(t.ja)}
      </JaText>
    );
  }
  return <JaSentence ja={t.ja} size="body" play={false} className={place === 'lesson' ? 'text-muted' : undefined} />;
}

/** Readings and dialogues follow the rung's furigana fade. */
export function CapstoneWrap({ rung, children }: { rung: CoreRung; children: React.ReactNode }) {
  return <JaTextProvider furigana={jr(rung).furigana}>{children}</JaTextProvider>;
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

/** The quoted resume line: Japanese at --t-ja-body with furigana in --board-muted (DESIGN §6.2). */
export function BoardQuote({ quote, rung }: { quote: Quote; rung: CoreRung | undefined }) {
  const parts = quote.text.split('___');
  const withBlanks = (w: string) =>
    parts.map((p, i) => (
      <span key={i}>
        {p}
        {i < parts.length - 1 && <Blank width={w} />}
      </span>
    ));
  const ja = quote.raw as JaTitle | undefined;
  if (ja?.ja) {
    return (
      <div className="on-board">
        <JaTextProvider furigana={rung ? jr(rung).furigana : 'always'}>
          <JaSentence ja={ja.ja} size="body" play={false} />
        </JaTextProvider>
      </div>
    );
  }
  if (hasJapanese(quote.text)) {
    return (
      <JaText as="p" className="text-ja-body text-board-ink">
        {withBlanks('w-[2em]')}
      </JaText>
    );
  }
  return (
    <p className="font-display text-h1 font-medium leading-tight tracking-[-0.01em] text-board-ink" lang="id">
      {withBlanks('w-[2.4em]')}
    </p>
  );
}

/** Glossary chip word: Japanese with furigana. */
export function GlossWord({ gloss }: { gloss: Gloss }) {
  const g = gloss.raw as GlossaryEntry;
  return (
    <JaTextOverride showFurigana>
      <JaSentence ja={g.ja} size="small" play={false} />
    </JaTextOverride>
  );
}

/** Glossary chip extra: the JLPT level, where the word has one. */
export function GlossExtra({ gloss }: { gloss: Gloss }) {
  const g = gloss.raw as GlossaryEntry;
  return g.jlpt ? <span className="label text-muted">{g.jlpt}</span> : null;
}

/** Placement: furigana shows unless the item tests reading kanji (furigana: false). */
export function PlacementWrap({ children }: { children: React.ReactNode }) {
  return <JaTextProvider furigana="always">{children}</JaTextProvider>;
}

/** The 済 seal on the lesson-done screen (DESIGN §6.9). */
export function DoneSeal() {
  const { t } = useT<JapaneseKey>();
  return <Seal size={64} label={t('lesson.done')} />;
}

/** A larger seal on the climb moment. */
export function ClimbSeal() {
  return <Seal size={88} />;
}

/** Runs of Japanese (kana, kanji, Japanese punctuation) in Latin text. */
const JA_RUN = /[\u3000-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff々〆ー]+(?:[ \u3000][\u3000-\u303f\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff々〆ー]+)*/gu;

/** Plain text with any Japanese runs wrapped in lang="ja" (CLAUDE.md §11: lang="ja" everywhere). */
export function WithJapanese({ text, accent = false }: { text: string; accent?: boolean }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(JA_RUN)) {
    if (m.index! > last) out.push(<Fragment key={`t${last}`}>{text.slice(last, m.index)}</Fragment>);
    out.push(
      <JaText key={`j${m.index}`} className={`text-[1.08em] ${accent ? 'text-accent' : ''}`}>
        {m[0]}
      </JaText>,
    );
    last = m.index! + m[0].length;
  }
  if (!out.length) return <>{text}</>;
  if (last < text.length) out.push(<Fragment key="end">{text.slice(last)}</Fragment>);
  return <>{out}</>;
}

/** Prose text runs: bare Japanese is detected and wrapped in lang="ja". */
export const ProseText = ({ text }: { text: string }) => <WithJapanese text={text} />;

/** **term**: accent colour for Japanese (never bold), accent bold for Latin; [[focus]] likewise. */
export function ProseTerm({ text, kind }: { text: string; kind: 'strong' | 'focus' }) {
  if (kind === 'focus') return hasJapanese(text) ? <JaText className="ja-focus text-[1.08em]">{text}</JaText> : <span className="focus-word">{text}</span>;
  if (hasJapanese(text) && !/[A-Za-z]/.test(text)) return <JaText className="text-[1.08em] text-accent">{text}</JaText>;
  return (
    <strong className="font-bold not-italic text-accent">
      <WithJapanese text={text} accent />
    </strong>
  );
}
