'use client';

// Mandarin Ladder's rendering slots for the engine (CourseConfig.components, prose, strands, lesson
// session, ladder, climb, home, capstones, glossary, words, settings). Hanzi reach the page through
// ZhText (plain) and ZhSentence (ruby pinyin, tone colours, tap-a-word).
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import type { LessonSession, SentenceSlotProps, StrandCard, TargetTextProps } from '@ladder/core/course/types';
import type { Gloss, Quote, Rung as CoreRung, Title } from '@ladder/core/lib/types';
import { useSettings, useT } from '@ladder/core/components/ProgressProvider';
import { TirukanCard } from '@ladder/core/components/lesson/TirukanCard';
import { useLessonData } from '@ladder/core/components/lesson/LessonData';
import { IconCards, IconChevron } from '@ladder/core/components/ui/Icon';
import { hanRuns, hasHan } from '@/lib/zh/text';
import type { MandarinKey } from '@/i18n/overrides';
import type { GlossaryEntry, Lesson, Rung, ZhLessonData } from '@/course/types';
import { tryAlign } from '@/lib/zh/align';
import { spokenTones } from '@/lib/zh/sandhi';
import { ZhSentence } from './zh/ZhSentence';
import { ZhText } from './zh/ZhText';
import { Pinyin, pyDisplay } from './zh/Pinyin';
import { ZhTextOverride, ZhTextProvider, useRungTones, useZhText } from './zh/ZhContext';
import { LessonTopToggles } from './LessonTopToggles';
import { HanziCard, NadaCard, TalkCard, WordsCard } from './StrandCards';
import { HskChip } from './HskChip';
import { StrokeOrder } from '@ladder/core/components/strokes/StrokeOrder';
import { ToneContourMini } from '@/visuals/ToneContourMini';

type ZhPy = { zh: string; py: string; id?: string; en?: string; note?: { id: string; en: string } };
const raw = (x: { raw?: unknown }) => x.raw as ZhPy;
const zhName = (r: CoreRung) => (r as unknown as Rung).name_zh.zh.replace(/\s+/g, '');

/** The phrase's spoken contour above the Tirukan sentence (DESIGN §6.6). */
function TirukanContour({ zh, py }: { zh: string; py: string }) {
  const { toneColours } = useZhText();
  const a = tryAlign(zh, py);
  const tones = a ? spokenTones(a) : [];
  return tones.length > 0 ? <ToneContourMini tones={tones} width={Math.min(320, 40 * tones.length + 12)} colours={toneColours} /> : null;
}

/** Target lines through ZhSentence, sized and supported per place (DESIGN §6.4). */
export function MandarinSentence({ line, use }: SentenceSlotProps) {
  const e = raw(line);
  switch (use) {
    case 'example':
      return <ZhSentence zh={e.zh} py={e.py} id={e.id} en={e.en} note={line.note} />;
    case 'worked':
      return <ZhSentence zh={e.zh} py={e.py} id={e.id} en={e.en} note={e.note} />;
    case 'pairOff':
      return <ZhSentence zh={e.zh} py={e.py} off play={false} size="body" />;
    case 'pairNatural':
      return <ZhSentence zh={e.zh} py={e.py} size="body" />;
    case 'reading':
      // The reading is a list of lines (adapter.reading.text).
      return (
        <ol className="flex flex-col gap-3">
          {(line.raw as ZhPy[]).map((l, i) => (
            <li key={i}>
              <ZhSentence zh={l.zh} py={l.py} size="body" />
            </li>
          ))}
        </ol>
      );
    case 'dialogue':
      return <ZhSentence zh={e.zh} py={e.py} id={e.id} en={e.en} size="body" />;
    case 'tirukan':
      return (
        <>
          <TirukanContour zh={e.zh} py={e.py} />
          <ZhSentence zh={e.zh} py={e.py} id={e.id} en={e.en} play={false} />
        </>
      );
  }
}

const ZH_SIZE: Record<NonNullable<TargetTextProps['size']>, string> = {
  sentence: 'text-zh-sentence',
  body: 'text-zh-small',
  small: 'text-zh-small',
  glyph: 'text-zh-glyph',
  title: 'text-zh-body',
  inherit: '',
};

/** Target text outside sentences (keywords, answers): ZhText at the hanzi sizes. */
export function MandarinTargetText({ children, block, as, size, face, variety: _v, className = '', ...rest }: TargetTextProps) {
  const cls = [size ? ZH_SIZE[size] : '', className].filter(Boolean).join(' ');
  const tag = (as ?? (block ? 'div' : 'span')) as 'span';
  return (
    <ZhText as={tag} face={face === 'ui' ? 'ui' : 'zh'} className={cls} {...rest}>
      {children}
    </ZhText>
  );
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
 * The quoted resume line. Chinese is set in WenKai at --t-zh-body with ruby pinyin in --board-muted
 * when the rung shows pinyin (DESIGN §6.2); Latin lines keep the display serif. A ___ is a brass line.
 */
export function BoardQuote({ quote, rung }: { quote: Quote; rung: CoreRung | undefined }) {
  const parts = quote.text.split('___');
  const withBlanks = (w: string) =>
    parts.map((p, i) => (
      <span key={i}>
        {p}
        {i < parts.length - 1 && <Blank width={w} />}
      </span>
    ));
  const zh = quote.raw as { zh: string; py: string } | undefined;
  if (zh?.zh && zh.py) {
    return (
      <div className="on-board">
        <ZhTextOverride showPinyin={(rung as unknown as Rung | undefined)?.pinyin === 'always'} toneColours={false}>
          <ZhSentence zh={zh.zh} py={zh.py} size="body" play={false} wordSheet={false} />
        </ZhTextOverride>
      </div>
    );
  }
  if (hasHan(quote.text)) {
    return (
      <ZhText as="p" className="text-zh-body text-board-ink">
        {withBlanks('w-[2em]')}
      </ZhText>
    );
  }
  return (
    <p className="font-display text-h1 font-medium leading-tight tracking-[-0.01em] text-board-ink" lang="id">
      {withBlanks('w-[2.4em]')}
    </p>
  );
}

/**
 * Plain text with any hanzi runs wrapped in lang="zh-Hans" (CLAUDE.md §5.2). Latin text is decomposed
 * (NFD) so pinyin tone vowels quoted in prose render in Atkinson, which positions combining marks.
 */
export function WithHanzi({ text: src, accent = false }: { text: string; accent?: boolean }) {
  const text = src.normalize('NFD');
  const runs = hanRuns(text);
  if (!runs.length) return <>{text}</>;
  const out: React.ReactNode[] = [];
  let last = 0;
  runs.forEach((r, i) => {
    if (r.start > last) out.push(<Fragment key={`t${i}`}>{text.slice(last, r.start)}</Fragment>);
    out.push(
      <ZhText key={`z${i}`} className={`text-[1.12em] ${accent ? 'text-accent' : ''}`}>
        {r.text}
      </ZhText>,
    );
    last = r.end;
  });
  if (last < text.length) out.push(<Fragment key="end">{text.slice(last)}</Fragment>);
  return <>{out}</>;
}

/** Latin text that looks like pinyin (tone marks), for lang="zh-Latn-pinyin". */
const looksPinyin = (s: string) => /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(s.normalize('NFC'));

/** Prose text runs: bare hanzi are detected and wrapped in lang="zh-Hans". */
export const ProseText = ({ text }: { text: string }) => <WithHanzi text={text} />;

/** **term**: accent colour for hanzi (never bold), accent bold for pinyin; [[focus]] likewise. */
export function ProseTerm({ text, kind }: { text: string; kind: 'strong' | 'focus' }) {
  if (kind === 'focus') {
    return hasHan(text) ? <ZhText className="zh-focus text-[1.12em]">{text}</ZhText> : <span className="focus-word">{text}</span>;
  }
  if (hasHan(text) && !/[A-Za-z]/.test(text)) return <ZhText className="text-[1.12em] text-accent">{text}</ZhText>;
  const py = looksPinyin(text);
  return (
    <strong lang={py ? 'zh-Latn-pinyin' : undefined} className="font-bold not-italic text-accent">
      {py ? pyDisplay(text) : <WithHanzi text={text} accent />}
    </strong>
  );
}

// Strand cards (DESIGN §6.6): Nada, Hanzi, Ngobrol and Tirukan on Examples; Kata on Contrast.
const zl = (l: unknown) => l as Lesson;
export const NadaStrand: StrandCard = ({ lesson }) => (zl(lesson).tone ? <NadaCard tone={zl(lesson).tone!} /> : null);
export const HanziStrand: StrandCard = () => {
  const { hanzi } = useLessonData<ZhLessonData>();
  return <HanziCard chars={hanzi} strokes={(ch) => <StrokeOrder char={ch} size={200} autoplay />} />;
};
export const TalkStrand: StrandCard = ({ lesson }) => (zl(lesson).talk ? <TalkCard talk={zl(lesson).talk!} /> : null);
export const TirukanStrand: StrandCard = ({ lesson }) => {
  const x = zl(lesson).tirukan;
  return <TirukanCard line={{ text: x.zh, translit: x.py, meaning: { id: x.id, ...(x.en ? { en: x.en } : {}) }, raw: x }} />;
};
export const WordsStrand: StrandCard = ({ lesson }) => {
  const { hokkien } = useLessonData<ZhLessonData>();
  return <WordsCard words={zl(lesson).words} hokkien={hokkien} />;
};

/**
 * Lesson-scoped supports (CLAUDE.md §7.2): plain state, so they reset when the lesson closes. Pinyin
 * and Nada toggles in the top bar, the text provider around the step, and a one-time hold hint.
 */
export function useMandarinSession(coreRung: CoreRung, step: number): LessonSession {
  const rung = coreRung as unknown as Rung;
  const { t } = useT<MandarinKey>();
  const settings = useSettings();
  const { words, recent } = useLessonData<ZhLessonData>();
  const [pinyinOn, setPinyinOn] = useState(false);
  // Nada mirrors the setting (or the rung's default) for this lesson only.
  const [toneOn, setToneOn] = useState<boolean | null>(null);
  const toneDefault = settings.toneColours === 'rung' ? rung.tone_colours_default : (settings.toneColours as boolean);
  const tones = toneOn ?? toneDefault;
  const [holdHint, setHoldHint] = useState(rung.pinyin === 'on-request' || rung.pinyin === 'new');
  // The hold hint shows once per lesson, on the first Examples visit.
  useEffect(() => {
    if (step > 2) setHoldHint(false);
  }, [step]);
  return {
    toggles: <LessonTopToggles pinyin={rung.pinyin} pinyinOn={pinyinOn} toneOn={tones} onPinyin={setPinyinOn} onTone={setToneOn} />,
    wrap: (children) => (
      <ZhTextProvider pinyin={rung.pinyin} pinyinOn={pinyinOn} toneColours={tones} recentWords={recent} words={words}>
        {children}
      </ZhTextProvider>
    ),
    examplesIntro: holdHint && (
      <p className="self-start rounded-sm bg-paper-2 px-3 py-1 text-small text-muted" role="note">
        {t('lesson.holdHint')}
      </p>
    ),
  };
}

/** Titles' Chinese line: ruby pinyin under the UI-language heading; plain hanzi on the strip. */
export function TitleTarget({ title, place }: { title: Title; place: 'lesson' | 'reading' | 'dialogue' | 'strip' }) {
  const t = title.raw as { zh: string; py: string };
  if (place === 'strip') {
    return (
      <ZhText as="span" className="text-zh-small text-muted">
        {t.zh.replace(/\s+|\[\[|\]\]/g, '')}
      </ZhText>
    );
  }
  return <ZhSentence zh={t.zh} py={t.py} size="body" play={false} wordSheet={false} className={place === 'lesson' ? 'text-muted' : undefined} />;
}

/** Readings and dialogues follow the rung's pinyin fade and tone-colour default. */
export function CapstoneWrap({ rung, children }: { rung: CoreRung; children: React.ReactNode }) {
  const r = rung as unknown as Rung;
  const tones = useRungTones(r);
  return (
    <ZhTextProvider pinyin={r.pinyin} toneColours={tones}>
      {children}
    </ZhTextProvider>
  );
}

/** The rung's Chinese name, per place (DESIGN §6.3): hidden below 380px on the rail. */
export function RungSubtitle({ rung, place }: { rung: CoreRung; place: 'rail' | 'board' | 'climb' | 'placement' }) {
  switch (place) {
    case 'rail':
      return (
        <ZhText face="ui" className="hidden text-zh-small leading-none text-muted min-[380px]:inline">
          {zhName(rung)}
        </ZhText>
      );
    case 'board':
      return (
        <p className="flex flex-wrap items-baseline gap-x-3 text-board-muted">
          <ZhText className="text-zh-body leading-none">{zhName(rung)}</ZhText>
          <span lang="zh-Latn-pinyin" className="text-small">
            {(rung as unknown as Rung).name_zh.py}
          </span>
        </p>
      );
    case 'climb':
      return (
        <ZhText as="p" className="text-center text-zh-body text-brass">
          {zhName(rung)}
        </ZhText>
      );
    case 'placement':
      return (
        <ZhText face="ui" className="text-zh-small leading-none text-muted">
          {zhName(rung)}
        </ZhText>
      );
  }
}

export const LevelChip = ({ rung, onBoard }: { rung: CoreRung; onBoard?: boolean }) => <HskChip hsk={(rung as unknown as Rung).hsk} onBoard={onBoard} />;

/** The word deck for the rung's HSK level, after the capstones (PRD §5.8). */
export function DeckLink({ rung, data }: { rung: CoreRung; data: unknown }) {
  const { t } = useT<MandarinKey>();
  const deck = data as { count: number } | null;
  if (!deck) return null;
  const hsk = (rung as unknown as Rung).hsk;
  return (
    <Link
      href="/words/#deck"
      className="card mt-2 flex min-h-[64px] items-center gap-4 p-4 text-ink no-underline transition-colors duration-quick hover:bg-paper-2"
    >
      <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-md bg-rung-soft" style={{ color: 'var(--rung)' }}>
        <IconCards />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-display text-card font-medium">{t('rung.deck', { hsk })}</span>
        <span className="text-small text-muted tnum">{t('rung.deckMeta', { n: deck.count, hsk })}</span>
      </span>
      <IconChevron className="shrink-0 text-muted" />
    </Link>
  );
}

/** Glossary chip word: hanzi with its pinyin (tone colours per the lesson). */
export function GlossWord({ gloss }: { gloss: Gloss }) {
  const { toneColours } = useZhText();
  const g = gloss.raw as GlossaryEntry;
  return (
    <span className="flex items-baseline gap-2">
      <ZhText className="text-zh-small">{g.zh.replace(/\s+/g, '')}</ZhText>
      <Pinyin text={g.py} tones={toneColours} className="text-small" />
    </span>
  );
}

/** Glossary chip measure word, after the meaning. */
export function GlossExtra({ gloss }: { gloss: Gloss }) {
  const g = gloss.raw as GlossaryEntry;
  return g.mw ? (
    <ZhText face="ui" className="label text-accent">
      {`一${g.mw}`}
    </ZhText>
  ) : null;
}

/** 一步一步 yí bù yí bù: step by step, under the climb line (DESIGN §6.9). */
export function ClimbExtra() {
  return (
    <p className="flex flex-col items-center gap-1 text-board-muted">
      <ZhText className="text-zh-body">一步一步</ZhText>
      <span lang="zh-Latn-pinyin" className="text-small">
        yí bù yí bù
      </span>
    </p>
  );
}

/** 阶梯 on the two-door board. */
export function DoorsOrnament() {
  return (
    <ZhText className="text-zh-body leading-none text-board-ink" aria-hidden>
      阶梯
    </ZhText>
  );
}

/** 阶梯 (jiētī, ladder) after the wordmark's range line, its pinyin as tiny ruby (DESIGN §2). */
export function WordmarkLadder() {
  return (
    <ZhText className="wordmark-ruby text-[1rem] leading-none" title="jiētī: tangga">
      <ruby>
        阶梯<rt lang="zh-Latn-pinyin">jiētī</rt>
      </ruby>
    </ZhText>
  );
}

/** The Ukuran hanzi preview line: 我很好。 (wǒ hěn hǎo, I'm fine). */
export function ZhSizePreview() {
  const { t } = useT<MandarinKey>();
  return (
    <div className="flex flex-col gap-1 rounded-md bg-paper-2 px-4 py-2" aria-live="polite">
      <ZhText as="p" className="text-zh-sentence font-medium">
        我很好。
      </ZhText>
      <p className="text-small">
        <span lang="zh-Latn-pinyin">{'wǒ hěn hǎo'.normalize('NFD')}</span> · <span className="id-text">{t('settings.zhSizePreview')}</span>
      </p>
    </div>
  );
}

/** Placement: pinyin shows unless the item tests reading characters (show_pinyin: false). */
export function PlacementWrap({ children }: { children: React.ReactNode }) {
  return (
    <ZhTextProvider pinyin="always" toneColours={false}>
      {children}
    </ZhTextProvider>
  );
}

