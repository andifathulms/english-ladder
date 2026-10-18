'use client';

// Mandarin Ladder's check-item rendering (CourseConfig.check): Chinese prompts, options and tiles in
// ruby per the item's pinyin setting, and the tone / pinyin / build / trace item types (CLAUDE.md §5.4).
import { Fragment, useState } from 'react';
import type { AnswerProps, CheckSlots, TileTrayProps } from '@ladder/core/course/types';
import type { CheckItem as CoreItem, ExtraItem } from '@ladder/core/lib/types';
import type { PillState } from '@ladder/core/components/check/OptionPill';
import { TileTray } from '@ladder/core/components/check/TileTray';
import { IconPlay } from '@ladder/core/components/ui/Icon';
import { useT } from '@ladder/core/components/ProgressProvider';
import { useCanPlay, usePlay } from '@ladder/core/components/useSpeech';
import { hasHan, joinZh } from '@/lib/zh/text';
import { isSyllableKey } from '@/lib/zh/audio';
import { recordTrace } from '@/course/progress';
import type { CheckItem } from '@/course/types';
import type { MandarinKey } from '@/i18n/overrides';
import { ZhInline } from '../zh/ZhInline';
import { ToneOption } from '../zh/ToneOption';
import { PinyinInput } from '../zh/PinyinInput';
import { ComponentTiles } from '../zh/ComponentTiles';
import { Pinyin } from '../zh/Pinyin';
import { TraceCheck } from '@ladder/core/components/strokes/TraceCheck';
import { ProseTerm } from '../slots';
import { parseInline } from '@ladder/core/lib/markup';

type Py = { py?: Record<string, string>; show_pinyin?: boolean };
const pyOf = (item: CoreItem | ExtraItem) => item as unknown as Py;

const isLatinLine = (s: string) => /[A-Za-z]/.test(s.replace(/\*\*|\*|\[\[|\]\]|___/g, ''));

/** Cues and short prompts: hanzi with ruby from the item's py map. */
function Inline({ text, item }: { text: string; item: CoreItem }) {
  return <ZhInline text={text} py={pyOf(item).py} />;
}

/** A prompt or sentence: Chinese in ruby per the item's pinyin setting, Latin as a display line. */
function Prompt({ item, text, fill, off }: { item: CoreItem; text: string; fill?: string; off?: boolean }) {
  const latin = isLatinLine(text);
  return (
    <p
      lang={latin ? 'id' : undefined}
      className={`${latin ? 'font-display text-sentence font-medium' : 'text-zh-sentence font-medium'} ${off ? 'off-text' : 'text-ink'}`}
    >
      <ZhInline text={text} py={pyOf(item).py} showPinyin={pyOf(item).show_pinyin} fill={fill} />
    </p>
  );
}

const Wrong = ({ text, item }: { text: string; item: CoreItem }) => <Prompt item={item} text={text} off />;

/** A big round play button for listen, tone and pinyin items. */
function BigPlay({ audio, label }: { audio: string; label: string }) {
  const play = usePlay();
  const [playing, setPlaying] = useState(false);
  const run = async () => {
    setPlaying(true);
    await play(audio);
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

/**
 * Plays the audio to identify. With no recording and no Chinese voice, the text is shown instead:
 * Chinese text without pinyin, a syllable as its pinyin (then the item tests reading the marks).
 */
function ListenPrompt({ item, audio, prompt }: { item: CoreItem | ExtraItem; audio: string; prompt?: string }) {
  const { t } = useT();
  const canPlay = useCanPlay(audio);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">
        <ZhInline text={prompt ?? t('check.listenPrompt')} py={pyOf(item).py} />
      </p>
      {canPlay ? (
        <BigPlay audio={audio} label={t('check.listenPlay')} />
      ) : (
        <div className="flex flex-col gap-1 rounded-md bg-paper-2 p-4">
          <p className="text-small text-muted">{t('check.listenNoAudio')}</p>
          {isSyllableKey(audio) ? (
            <Pinyin text={audio.slice(4)} className="text-h2" />
          ) : (
            <p className="text-zh-sentence">
              <ZhInline text={audio} py={pyOf(item).py} showPinyin={false} />
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const Listen = ({ audio, prompt, item }: { audio: string; prompt?: string; item: CoreItem }) => <ListenPrompt item={item} audio={audio} prompt={prompt} />;

/** Chinese has no spaces, so the answer line also shows the sentence joined (DESIGN §6.7). */
function Joined({ placed }: { placed: string[] }) {
  if (!placed.length) return null;
  return (
    <p className="text-small text-muted" aria-live="polite">
      <span lang="zh-Hans" className="zh font-zh text-zh-small text-ink">
        {joinZh(placed.map((text) => ({ text })))}
      </span>
    </p>
  );
}

/** Word tiles in ruby when they are Chinese. */
function Tray({ item, slots: _slots, ...p }: TileTrayProps & { item: CoreItem; slots: number }) {
  const zh = p.tiles.some(hasHan);
  if (!zh) return <TileTray {...p} tileAttrs={() => ({ lang: 'id' })} />;
  const { py, show_pinyin } = pyOf(item);
  return (
    <TileTray
      {...p}
      tileAttrs={() => ({})}
      tileClass={() => 'text-zh-body font-normal'}
      Label={({ text }) => <ZhInline text={text} py={py} showPinyin={show_pinyin} />}
      AfterLine={Joined}
    />
  );
}

/** Chinese option labels in ruby at --t-zh-body; Latin labels decomposed (pinyin marks in Atkinson). */
function PillLabel({ raw, wrong, item }: { text: string; wrong: boolean; raw: string; item?: CoreItem }) {
  const strike = wrong ? 'line-through decoration-[1.5px]' : '';
  if (hasHan(raw)) {
    const { py, show_pinyin } = item ? pyOf(item) : ({} as Py);
    return <ZhInline text={raw} py={py} showPinyin={show_pinyin} className={`min-w-0 flex-1 text-zh-body font-normal ${strike}`} />;
  }
  return <span className={strike}>{raw.normalize('NFD')}</span>;
}

type Tone = ExtraItem & { audio: string; prompt?: string; ask: 'written' | 'spoken' };
type Typed = ExtraItem & { audio: string; prompt?: string; answer: string };
type Built = ExtraItem & { char: string; prompt?: string; parts: string[]; answer: string[] };

function TonePrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<MandarinKey>();
  const i = item as Tone;
  return <ListenPrompt item={item} audio={i.audio} prompt={i.prompt ?? t(i.ask === 'spoken' ? 'check.tonePromptSpoken' : 'check.tonePrompt')} />;
}

function PinyinPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<MandarinKey>();
  const i = item as Typed;
  return <ListenPrompt item={item} audio={i.audio} prompt={i.prompt ?? t('check.pinyinPrompt')} />;
}

/** Build and trace items: the prompt, when authored, as a small line. */
function SmallPrompt({ item }: { item: ExtraItem }) {
  if (!item.prompt) return null;
  return (
    <p className="text-small text-muted">
      <ZhInline text={item.prompt as string} py={pyOf(item).py} />
    </p>
  );
}

const ToneOptionSlot = ({ value, index, state, disabled, onClick }: { value: string; index: number; state: PillState; disabled?: boolean; onClick: () => void }) => (
  <ToneOption tones={value.split(',').map(Number)} index={index} state={state} disabled={disabled} onClick={onClick} />
);

/** Type the pinyin (numbers or marks); Enter checks in practice. */
function PinyinAnswer({ item, mode, value, solved, tone, onChange, submit }: AnswerProps) {
  const { t } = useT<MandarinKey>();
  const practice = mode === 'practice';
  const [typed, setTyped] = useState(() => (!practice && typeof value === 'string' ? value : ''));
  return (
    <div className="flex flex-col gap-3">
      <PinyinInput
        value={typed}
        label={t('check.pinyinLabel')}
        disabled={solved}
        tone={tone}
        onChange={(v) => {
          setTyped(v);
          onChange(v);
        }}
        onSubmit={practice ? () => typed.trim() && submit(typed) : undefined}
      />
      {practice && !solved && (
        <button type="button" className="btn btn-primary self-start" disabled={!typed.trim()} onClick={() => submit(typed)}>
          {t('check.checkOrder')}
        </button>
      )}
      {practice && solved && <Pinyin text={(item as Typed).answer} tones className="text-h2" />}
    </div>
  );
}

/** Pick the components that make the character. */
function BuildAnswer({ item, mode, value, solved, tone, onChange, submit }: AnswerProps) {
  const { t } = useT();
  const b = item as Built;
  const practice = mode === 'practice';
  const [chosen, setChosen] = useState<string[]>(() => (practice && solved ? b.answer : !practice && Array.isArray(value) ? value : []));
  return (
    <div className="flex flex-col gap-3">
      <ComponentTiles
        parts={b.parts}
        chosen={chosen}
        need={b.answer.length}
        char={b.char}
        solved={solved}
        locked={solved}
        tone={tone}
        onChange={(c) => {
          setChosen(c);
          onChange(c);
        }}
      />
      {practice && !solved && (
        <button type="button" className="btn btn-primary self-start" disabled={chosen.length !== b.answer.length} onClick={() => submit(chosen)}>
          {t('check.checkOrder')}
        </button>
      )}
    </div>
  );
}

/** Draw the character; the best trace is kept (Saya), and up to two misses pass first try. */
function TraceAnswer({ item, mode, solved, onChange, submit }: AnswerProps) {
  const it = item as unknown as Extract<CheckItem, { type: 'trace' }>;
  return (
    <TraceCheck
      item={it}
      solved={solved}
      onDone={(misses) => {
        const resp = `misses:${misses}`;
        recordTrace(it.char, misses);
        if (mode === 'test') onChange(resp);
        else submit(resp, { misses: misses > 2 ? 1 : 0 });
      }}
    />
  );
}

/** Why lines with their markup drawn (D5): **term** and [[focus]] as in explanations, *italic*; other text as before. */
function WhyText({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((tok, i) =>
        tok.t === 'strong' || tok.t === 'focus' ? (
          <ProseTerm key={i} text={tok.v} kind={tok.t} />
        ) : tok.t === 'em' ? (
          <em key={i}>{tok.v}</em>
        ) : (
          <Fragment key={i}>{tok.v}</Fragment>
        ),
      )}
    </>
  );
}

export const checkSlots: CheckSlots = {
  Inline,
  Prompt,
  Wrong,
  Listen,
  TileTray: Tray,
  rootAttrs: (item) => ({ 'data-type': item.type }),
  correctPillByGrade: true,
  dedupeWrong: true,
  WhyText,
  optionLayout: (item, options) => {
    const zh = options.some(hasHan);
    return { wide: zh || item.type === 'fix' || item.type === 'scene' || item.type === 'listen', badge: zh };
  },
  pill: {
    attrs: (text) => ({ lang: hasHan(text) ? undefined : 'id', 'data-option': text }),
    Label: PillLabel,
    gapClass: 'gap-3',
  },
  types: {
    tone: { Prompt: TonePrompt, Option: ToneOptionSlot, optionsLabelKey: 'check.toneOptions' },
    pinyin: { Prompt: PinyinPrompt, Answer: PinyinAnswer },
    build: { Prompt: SmallPrompt, Answer: BuildAnswer },
    trace: { Prompt: SmallPrompt, Answer: TraceAnswer },
  },
};
