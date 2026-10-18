'use client';

// Japanese Ladder's check-item rendering (CourseConfig.check): Japanese prompts, options and tiles
// with furigana per the item's setting. The kana, mora, pitch and form item types land in M5.
import { useState } from 'react';
import type { AnswerProps, CheckSlots, TileTrayProps } from '@ladder/core/course/types';
import type { CheckItem as CoreItem, ExtraItem } from '@ladder/core/lib/types';
import { TileTray } from '@ladder/core/components/check/TileTray';
import { pillStyles, type PillState } from '@ladder/core/components/check/OptionPill';
import { IconCheck, IconClose, IconPlay } from '@ladder/core/components/ui/Icon';
import { useT } from '@ladder/core/components/ProgressProvider';
import { useCanPlay, usePlay } from '@ladder/core/components/useSpeech';
import { hasJapanese, toPlain } from '@/lib/ja/text';
import { morae } from '@/lib/ja/kana';
import { isKanaKey } from '@/lib/ja/audio';
import type { JapaneseKey } from '@/i18n/overrides';
import { JaInline } from '../ja/JaInline';
import { KanaInput } from '../ja/KanaInput';
import { MoraBeatsMini } from '@/visuals/MoraBeatsMini';
import { PitchLineMini } from '@/visuals/PitchLineMini';

type Fu = { furigana?: boolean };
const fu = (item: CoreItem | undefined) => (item as unknown as Fu | undefined)?.furigana;

const isLatinLine = (s: string) => /[A-Za-z]/.test(s.replace(/\*\*|\*|\[\[|\]\]|___|\{[^}]*\}/g, ''));

function Inline({ text, item }: { text: string; item: CoreItem }) {
  return <JaInline text={text} furigana={fu(item)} />;
}

/** A prompt: Japanese at --t-ja-sentence with furigana per the item; Latin as a display line. */
function Prompt({ item, text, fill, off }: { item: CoreItem; text: string; fill?: string; off?: boolean }) {
  const latin = isLatinLine(text);
  return (
    <p
      lang={latin ? 'id' : undefined}
      className={`${latin ? 'font-display text-sentence font-medium' : 'text-ja-sentence font-semibold'} ${off ? 'off-text' : 'text-ink'}`}
    >
      <JaInline text={text} furigana={fu(item)} fill={fill} />
    </p>
  );
}

const Wrong = ({ text, item }: { text: string; item: CoreItem }) => <Prompt item={item} text={text} off />;

/** Japanese option labels at --t-ja-body with furigana per the item; Latin labels as written. */
function PillLabel({ raw, wrong, item }: { text: string; wrong: boolean; raw: string; item?: CoreItem }) {
  const strike = wrong ? 'line-through decoration-[1.5px]' : '';
  if (hasJapanese(raw)) return <JaInline text={raw} furigana={fu(item)} className={`min-w-0 flex-1 text-ja-body font-normal ${strike}`} />;
  return <span className={strike}>{raw}</span>;
}

/** Word tiles with furigana when they are Japanese; the answer line shows the joined sentence. */
function Tray({ item, slots: _slots, ...p }: TileTrayProps & { item: CoreItem; slots: number }) {
  const ja = p.tiles.some(hasJapanese);
  if (!ja) return <TileTray {...p} tileAttrs={() => ({ lang: 'id' })} />;
  return (
    <TileTray
      {...p}
      tileAttrs={() => ({})}
      tileClass={() => 'text-ja-body font-normal'}
      Label={({ text }) => <JaInline text={text} furigana={fu(item)} />}
      AfterLine={({ placed }) =>
        placed.length ? (
          <p className="text-small text-muted" aria-live="polite">
            <span lang="ja" className="ja font-ja text-ja-small text-ink">
              {placed.map(toPlain).join('')}
            </span>
          </p>
        ) : null
      }
    />
  );
}

/** A big round play button for listen, kana, mora and pitch items. */
function BigPlay({ audio, label }: { audio: string; label: string }) {
  const play = usePlay();
  const [playing, setPlaying] = useState(false);
  const run = async () => {
    setPlaying(true);
    await play(audio);
    setPlaying(false);
  };
  return (
    <button type="button" onClick={run} aria-pressed={playing || undefined} aria-label={label} className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-accent text-accent-ink" data-play>
      <IconPlay size={24} />
    </button>
  );
}

/**
 * Plays what to identify. With no recording and no Japanese voice, the text is shown instead (kana
 * and minimal pairs never fall back to speech, so for those the text shows unless recorded).
 */
function ListenPrompt({ item, audio, prompt }: { item: CoreItem | ExtraItem; audio: string; prompt?: string }) {
  const { t } = useT();
  const canPlay = useCanPlay(audio);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">
        <JaInline text={prompt ?? t('check.listenPrompt')} furigana={fu(item as CoreItem)} />
      </p>
      {canPlay ? (
        <BigPlay audio={audio} label={t('check.listenPlay')} />
      ) : (
        <div className="flex flex-col gap-1 rounded-md bg-paper-2 p-4">
          <p className="text-small text-muted">{t('check.listenNoAudio')}</p>
          <p className="text-ja-sentence">
            <JaInline text={isKanaKey(audio) ? audio.slice(5) : audio} furigana={false} />
          </p>
        </div>
      )}
    </div>
  );
}

const Listen = ({ audio, prompt, item }: { audio: string; prompt?: string; item: CoreItem }) => <ListenPrompt item={item} audio={audio} prompt={prompt} />;

type KanaItem = ExtraItem & { audio?: string; ja?: string; prompt?: string; answer: string; script: 'hiragana' | 'katakana' | 'any' };
type MoraItem = ExtraItem & { audio: string; prompt?: string; ask: 'count' | 'spelling' };
type PitchItem = ExtraItem & { audio: string; prompt?: string; pair: { ja: string; kana: string; pitch: number; id: string; en?: string }[] };
type FormItem = ExtraItem & { word: string; target: string; prompt?: string; answer: string };

/** A kana item: hear the word, or read a kanji word shown without furigana. */
function KanaPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<JapaneseKey>();
  const k = item as KanaItem;
  if (k.audio) return <ListenPrompt item={item} audio={k.audio} prompt={k.prompt ?? t('check.kanaPromptAudio')} />;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">
        <JaInline text={k.prompt ?? t('check.kanaPromptRead')} />
      </p>
      <p className="rounded-lg bg-paper-2 px-4 py-3 text-ja-sentence font-semibold">
        <JaInline text={k.ja!} furigana={false} />
      </p>
    </div>
  );
}

/** Type the reading in romaji (or kana); Enter checks in practice. */
function KanaAnswer({ item, mode, value, solved, tone, onChange, submit }: AnswerProps) {
  const { t } = useT<JapaneseKey>();
  const k = item as KanaItem;
  const practice = mode === 'practice';
  const [typed, setTyped] = useState(() => (!practice && typeof value === 'string' ? value : ''));
  return (
    <div className="flex flex-col gap-3">
      <KanaInput
        label={t('check.kanaLabel')}
        script={k.script === 'katakana' ? 'katakana' : 'hiragana'}
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
    </div>
  );
}

function MoraPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<JapaneseKey>();
  const m = item as MoraItem;
  return <ListenPrompt item={item} audio={m.audio} prompt={m.prompt ?? t(m.ask === 'count' ? 'check.moraCount' : 'check.moraSpelling')} />;
}

/** An option pill with the course's look, for custom option content. */
function Pill({ index, state, disabled, onClick, children, badge = true }: { index: number; state: PillState; disabled?: boolean; onClick: () => void; children: React.ReactNode; badge?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={state === 'selected' || state === 'correct' ? true : undefined}
      aria-keyshortcuts={index < 4 ? String(index + 1) : undefined}
      data-state={state}
      className={`inline-flex min-h-pill w-full items-center gap-3 rounded-md border-2 px-5 py-2 text-start font-body text-body font-semibold transition-colors duration-quick ${state === 'idle' && !disabled ? 'hover:border-accent' : ''}`}
      style={pillStyles[state]}
    >
      {badge && index < 4 && (
        <span aria-hidden className="label flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-sm bg-paper-2 text-muted">
          {index + 1}
        </span>
      )}
      {(state === 'correct' || state === 'answer') && <IconCheck size={18} draw className="shrink-0" />}
      {state === 'wrong' && <IconClose size={16} className="shrink-0" />}
      {children}
    </button>
  );
}

/** Mora options: a count, or a spelling with its beat row drawn small beneath. */
function MoraOption({ value, index, state, disabled, onClick }: { value: string; index: number; state: PillState; disabled?: boolean; onClick: () => void }) {
  const { t } = useT<JapaneseKey>();
  const ja = hasJapanese(value);
  return (
    <Pill index={index} state={state} disabled={disabled} onClick={onClick}>
      {ja ? (
        <span className="flex flex-col gap-1">
          <span lang="ja" className={`ja font-ja text-ja-body font-normal ${state === 'wrong' ? 'line-through decoration-[1.5px]' : ''}`}>
            {value}
          </span>
          <MoraBeatsMini kana={value} label={t('check.beats', { n: morae(value).length })} />
        </span>
      ) : (
        <span className="tnum">{t('check.beats', { n: Number(value) })}</span>
      )}
    </Pill>
  );
}

function PitchPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<JapaneseKey>();
  const p = item as PitchItem;
  return <ListenPrompt item={item} audio={p.audio} prompt={p.prompt ?? t('check.pitchPrompt')} />;
}

/** Pitch options: the meaning, with the word and its pitch line. */
function PitchOption({ value, index, state, disabled, onClick, item }: { value: string; index: number; state: PillState; disabled?: boolean; onClick: () => void; item: ExtraItem }) {
  const { lang } = useT();
  const w = (item as PitchItem).pair.find((x) => x.id === value);
  return (
    <Pill index={index} state={state} disabled={disabled} onClick={onClick}>
      <span className="flex flex-col gap-1">
        <span lang={lang === 'en' && w?.en ? 'en' : 'id'} className={state === 'wrong' ? 'line-through decoration-[1.5px]' : ''}>
          {lang === 'en' && w?.en ? w.en : value}
        </span>
        {w && <PitchLineMini kana={w.kana} accent={w.pitch} label={`${toPlain(w.ja)}: ${w.pitch}`} />}
      </span>
    </Pill>
  );
}

/** The source word, its target form label and an arrow (DESIGN §6.7). */
function FormPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<JapaneseKey>();
  const f = item as FormItem;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">{f.prompt ? <JaInline text={f.prompt} /> : t('check.formPrompt')}</p>
      <p className="flex flex-wrap items-center gap-3">
        <span className="text-ja-sentence font-semibold">
          <JaInline text={f.word} furigana={fu(item as CoreItem)} />
        </span>
        <span aria-hidden className="text-h2 text-muted">
          →
        </span>
        <span className="label rounded-sm bg-accent-soft px-2 py-1 text-accent">{t(`form.${f.target}` as JapaneseKey)}</span>
      </p>
    </div>
  );
}

export const checkSlots: CheckSlots = {
  Inline,
  Prompt,
  Wrong,
  TileTray: Tray,
  rootAttrs: (item) => ({ 'data-type': item.type }),
  correctPillByGrade: true,
  dedupeWrong: true,
  optionLayout: (item, options) => {
    const ja = options.some(hasJapanese);
    return { wide: ja || item.type === 'fix' || item.type === 'scene' || item.type === 'listen', badge: ja };
  },
  pill: {
    attrs: (text) => ({ lang: hasJapanese(text) ? undefined : 'id', 'data-option': text }),
    Label: PillLabel,
    gapClass: 'gap-3',
  },
  Listen,
  types: {
    kana: { Prompt: KanaPrompt, Answer: KanaAnswer },
    mora: { Prompt: MoraPrompt, Option: MoraOption },
    pitch: { Prompt: PitchPrompt, Option: PitchOption },
    form: { Prompt: FormPrompt, Answer: KanaAnswer },
  },
};
