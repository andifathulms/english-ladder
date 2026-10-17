'use client';

// Arabic Ladder's check-item rendering (CourseConfig.check): mixed prompts stay LTR with Arabic
// islands, Arabic options and tiles, and the read / spell / mark item types (CLAUDE.md §5.3).
import { useState } from 'react';
import type { CheckSlots, TileTrayProps } from '@ladder/core/course/types';
import type { CheckItem, ExtraItem } from '@ladder/core/lib/types';
import { parseInline, stripMarkup } from '@ladder/core/lib/markup';
import { TileTray } from '@ladder/core/components/check/TileTray';
import { Sentence } from '@ladder/core/components/lesson/Sentence';
import { IconPlay } from '@ladder/core/components/ui/Icon';
import { useT } from '@ladder/core/components/ProgressProvider';
import { useCanPlay, usePlay } from '@ladder/core/components/useSpeech';
import { findArabicRuns, hasArabic } from '@/lib/arabic/text';
import { withoutMark, type MarkName } from '@/lib/arabic/marks';
import type { ArabicKey } from '@/i18n/overrides';
import { ArIsland } from '@/components/ar/ArIsland';
import { ArSentence } from '@/components/ar/ArSentence';
import { ArTileTray } from './ArTileTray';
import { MarkOption } from './MarkOption';

/** Short prompt text with *italic* and **term** markup, Arabic runs in islands. */
function Inline({ text, arClass }: { text: string; arClass?: string }) {
  return (
    <>
      {parseInline(text).map((tok, i) =>
        tok.t === 'em' ? (
          <em key={i}>{tok.v}</em>
        ) : tok.t === 'strong' || tok.t === 'focus' ? (
          hasArabic(tok.v) ? (
            <ArIsland key={i} className={`text-accent ${arClass ?? ''}`}>
              {tok.v}
            </ArIsland>
          ) : (
            <strong key={i} className="text-accent">
              {tok.v}
            </strong>
          )
        ) : hasArabic(tok.v) ? (
          <WithArabic key={i} text={tok.v} arClass={arClass} />
        ) : (
          <span key={i}>{tok.v}</span>
        ),
      )}
    </>
  );
}

/** Latin text with Arabic runs wrapped in inline islands (the line stays LTR). */
function WithArabic({ text, arClass }: { text: string; arClass?: string }) {
  const runs = findArabicRuns(text);
  const out: React.ReactNode[] = [];
  let last = 0;
  runs.forEach((r, i) => {
    if (r.start > last) out.push(<span key={`t${i}`}>{text.slice(last, r.start)}</span>);
    out.push(
      <ArIsland key={`a${i}`} className={arClass}>
        {r.text}
      </ArIsland>,
    );
    last = r.end;
  });
  if (last < text.length) out.push(<span key="end">{text.slice(last)}</span>);
  return <>{out}</>;
}

/** Mostly Latin text (a question in Indonesian) stays an LTR line even when it quotes Arabic. */
const isLatinLine = (s: string) => /[A-Za-z]/.test(stripMarkup(s));

/** A choice/gap prompt. Arabic prompts are an RTL island with the blank as an underline. */
function Prompt({ text, fill }: { text: string; fill?: string }) {
  const [a, b] = text.split('___');
  if (b === undefined) {
    if (hasArabic(text) && !isLatinLine(text)) return <ArSentence ar={text} play={false} showTranslit={false} />;
    return (
      <p lang="id" className="font-display text-sentence font-medium text-ink">
        <Inline text={text} arClass="text-ar-sentence leading-none" />
      </p>
    );
  }
  const blank = (
    <>
      <span aria-hidden className="mx-1 inline-block w-[3.5em] border-b-2 border-ink align-baseline">
        &nbsp;
      </span>
      <span className="sr-only">blank</span>
    </>
  );
  if ((hasArabic(text) && !isLatinLine(text)) || (!isLatinLine(text) && fill && hasArabic(fill))) {
    return (
      <ArIsland block as="p" size="sentence" className="text-ink">
        {stripMarkup(a)}
        {fill ? <span className="ar-focus">{fill}</span> : blank}
        {stripMarkup(b)}
      </ArIsland>
    );
  }
  return (
    <p lang="id" className="font-display text-sentence font-medium text-ink">
      <WithArabic text={stripMarkup(a)} arClass="text-ar-sentence leading-none" />
      {fill ? (
        hasArabic(fill) ? (
          <ArIsland className="ar-focus text-ar-sentence leading-none">{fill}</ArIsland>
        ) : (
          <span className="focus-word">{fill}</span>
        )
      ) : (
        blank
      )}
      <WithArabic text={stripMarkup(b)} arClass="text-ar-sentence leading-none" />
    </p>
  );
}

/** A fix item's wrong sentence: Arabic in an island, Latin as a plain line. */
function Wrong({ text }: { text: string }) {
  return hasArabic(text) && !isLatinLine(text) ? (
    <ArSentence ar={text} off play={false} showTranslit={false} />
  ) : (
    <Sentence en={text} off attrs={{ lang: 'en' }} />
  );
}

/** A big round play button for listen and dictation items. */
function BigPlay({ audio, variety, label }: { audio: string; variety: 'fusha' | 'eg'; label: string }) {
  const play = usePlay();
  const [playing, setPlaying] = useState(false);
  const run = async () => {
    setPlaying(true);
    await play(stripMarkup(audio), variety);
    setPlaying(false);
  };
  return (
    <button
      type="button"
      onClick={run}
      aria-pressed={playing || undefined}
      aria-label={label}
      className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-accent text-accent-ink"
      data-play
    >
      <IconPlay size={24} />
    </button>
  );
}

/** Plays the line to identify. With no recording and no Arabic voice, the text is shown instead. */
function Listen({ audio, prompt, variety = 'fusha' }: { audio: string; prompt?: string; variety?: string }) {
  const { t } = useT();
  const v = variety as 'fusha' | 'eg';
  const canPlay = useCanPlay(audio, v);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">{<Inline text={prompt ?? t('check.listenPrompt')} />}</p>
      {canPlay ? (
        <BigPlay audio={audio} variety={v} label={t('check.listenPlay')} />
      ) : (
        <div className="flex flex-col gap-1 rounded-md bg-paper-2 p-4">
          <p className="text-small text-muted">{t('check.listenNoAudio')}</p>
          <ArSentence ar={audio} variety={v} play={false} showTranslit={false} size="body" />
        </div>
      )}
    </div>
  );
}

/** Spell items and Arabic order items use the Arabic tray; Latin order items the engine's. */
function Tray({ item, slots, ...p }: TileTrayProps & { item: CheckItem; slots: number }) {
  const arabic = item.type === ('spell' as string) || (item.type === 'order' && item.tiles.some(hasArabic));
  return arabic ? <ArTileTray {...p} mode={item.type === 'order' ? 'order' : 'spell'} slots={slots} /> : <TileTray {...p} />;
}

type Read = ExtraItem & { ar: string; prompt?: string };
type Spell = ExtraItem & { prompt?: string; audio?: string; dictation?: boolean };
type Mark = ExtraItem & { ar: string; target: number; prompt?: string };

/** Reading items never show transliteration, whatever the rung's setting (CLAUDE.md §5.3). */
function ReadPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<ArabicKey>();
  const r = item as Read;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">{<Inline text={r.prompt ?? t('check.readPrompt')} />}</p>
      <div className="rounded-lg bg-paper-2 px-4 py-3">
        <ArSentence
          ar={r.ar}
          size={[...stripMarkup(r.ar)].filter((c) => /[ء-ي]/.test(c)).length <= 2 ? 'glyph' : 'sentence'}
          play={false}
          showTranslit={false}
        />
      </div>
    </div>
  );
}

/** The word with the target letter's mark hidden: the letter sits in a dashed circle. */
function MarkPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<ArabicKey>();
  const m = item as Mark;
  const { before, letter, after } = withoutMark(stripMarkup(m.ar), m.target);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">{<Inline text={m.prompt ?? t('check.markPrompt')} />}</p>
      <div className="rounded-lg bg-paper-2 px-4 py-4">
        <ArIsland block as="p" size="sentence" className="text-center text-ink" aria-label={stripMarkup(m.ar)}>
          {before}
          <span className="relative inline-block rounded-full px-1 outline-dashed outline-2 outline-offset-4 outline-accent">{letter}</span>
          {after}
        </ArIsland>
      </div>
    </div>
  );
}

function SpellPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<ArabicKey>();
  const s = item as Spell;
  return (
    <div className="flex flex-col gap-3">
      {s.prompt && (
        <p className="text-small text-muted">
          <Inline text={s.prompt} />
        </p>
      )}
      {s.dictation && s.audio && (
        <div className="flex items-center gap-3">
          <BigPlay audio={s.audio} variety="fusha" label={t('check.dictationPlay')} />
          <span className="text-small text-muted">{t('check.dictationHint')}</span>
        </div>
      )}
    </div>
  );
}

const LATIN_TR = /[āīūḥṣḍṭẓʿʾ]/;

export const checkSlots: CheckSlots = {
  Inline: ({ text }) => <Inline text={text} />,
  Prompt,
  Wrong,
  Listen,
  TileTray: Tray,
  optionLayout: (item, options) => {
    const arabic = options.some(hasArabic);
    return { wide: arabic || item.type === 'fix' || item.type === 'scene' || item.type === 'listen', badge: arabic };
  },
  pill: {
    attrs: (text) => (hasArabic(text) ? {} : { lang: LATIN_TR.test(text) ? 'ar-Latn' : 'id' }),
    gapClass: 'gap-3',
    Label: ({ text, wrong }) =>
      hasArabic(text) ? (
        <ArIsland block size="body" className={`min-w-0 flex-1 font-normal ${wrong ? 'line-through decoration-[1.5px]' : ''}`}>
          {text}
        </ArIsland>
      ) : (
        <span className={wrong ? 'line-through decoration-[1.5px]' : undefined}>{text}</span>
      ),
  },
  types: {
    read: { Prompt: ReadPrompt },
    spell: { Prompt: SpellPrompt },
    mark: {
      Prompt: MarkPrompt,
      Option: ({ value, ...p }) => <MarkOption mark={value as MarkName} {...p} />,
      optionsLabelKey: 'check.markOptions',
    },
  },
};
