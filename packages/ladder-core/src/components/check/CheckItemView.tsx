'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { isCoreItem, type CheckItem, type ExtraItem } from '@ladder/core/lib/types';
import { grade, type Response } from '@ladder/core/lib/check/grade';
import { sfx } from '@ladder/core/lib/speech/sfx';
import { stripMarkup } from '@ladder/core/lib/markup';
import { itemType, type GradeNote } from '@ladder/core/lib/check/itemTypes';
import { OptionPill, type PillState } from './OptionPill';
import { TileTray } from './TileTray';
import { WhyLine } from './WhyLine';
import { NoteLine } from './NoteLine';
import { Sentence } from '../lesson/Sentence';
import { VisualStage } from '../visuals/VisualStage';
import { IconPlay } from '../ui/Icon';
import { useSettings, useT } from '../ProgressProvider';
import { useCanSpeak, useSpeak } from '../useSpeech';
import { useCourse } from '@ladder/core/course/context';

type Common = {
  item: CheckItem;
  /** 1–4 picks an answer. Turn off when several items share a page. */
  numberKeys?: boolean;
};
type Practice = Common & {
  mode: 'practice';
  /** Already solved earlier (e.g. going back to a finished item). */
  solved?: boolean;
  /** `note`: what the grade added to a correct answer (e.g. accepted without accents). */
  onSolved: (firstTry: boolean, note?: GradeNote) => void;
  /** The parent shows the why line (and the note) in its feedback sheet once solved. */
  whyInSheet?: boolean;
};
type Test = Common & { mode: 'test'; value?: Response; onChange: (r: Response) => void };

function Prompt({ text, fill }: { text: string; fill?: string }) {
  const { target } = useCourse();
  const [a, b] = text.split('___');
  if (b === undefined) return <Sentence en={text} play={false} />;
  return (
    <p lang={target.lang} dir={target.dir} className="font-display text-sentence font-medium text-ink text-start">
      {stripMarkup(a)}
      {fill ? (
        <span className="focus-word">{fill}</span>
      ) : (
        <>
          <span aria-hidden className="inline-block w-[3.5em] border-b-2 border-ink align-baseline">
            &nbsp;
          </span>
          <span className="sr-only">blank</span>
        </>
      )}
      {stripMarkup(b)}
    </p>
  );
}

/** Plays the sentence to identify. Without an English voice, the sentence is shown instead. */
function ListenPrompt({ audio, prompt }: { audio: string; prompt?: string }) {
  const { t } = useT();
  const canSpeak = useCanSpeak();
  const speak = useSpeak();
  const [playing, setPlaying] = useState(false);
  const plain = stripMarkup(audio);
  const play = async () => {
    setPlaying(true);
    await speak(plain);
    setPlaying(false);
  };
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">{prompt ?? t('check.listenPrompt')}</p>
      {canSpeak ? (
        <button
          type="button"
          onClick={play}
          aria-pressed={playing || undefined}
          className={`btn self-start ${playing ? 'btn-primary' : 'btn-ghost'}`}
        >
          <IconPlay size={18} /> {t('check.listenPlay')}
        </button>
      ) : (
        <div className="flex flex-col gap-1 rounded-md bg-paper-2 p-4">
          <p className="text-small text-muted">{t('check.listenNoAudio')}</p>
          <Sentence en={audio} play={false} />
        </div>
      )}
    </div>
  );
}

export function CheckItemView(props: Practice | Test) {
  const { item } = props;
  const { t } = useT();
  const { text, check: slots = {} } = useCourse();
  const settings = useSettings();
  const ctx = { settings };
  // Course item types (anything but the engine's own) carry their logic and rendering.
  const extraTypeName = isCoreItem(item) ? null : (item as { type: string }).type;
  const logic = extraTypeName ? itemType(extraTypeName) : undefined;
  const view = extraTypeName ? slots.types?.[extraTypeName] : undefined;
  const ExtraOption = view?.Option;
  // Tiles: order items, and course types that have them (e.g. Arabic spell).
  const { tiles, answerTiles } = useMemo(() => {
    if (item.type === 'order') return { tiles: item.tiles, answerTiles: item.answer };
    const tl = logic?.tiles?.(item as ExtraItem);
    return tl ? { tiles: tl.tiles, answerTiles: tl.answer } : { tiles: [] as string[], answerTiles: [] as string[] };
  }, [item, logic]);
  const tileItem = item.type === 'order' || !!logic?.tiles;
  const [wrong, setWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(props.mode === 'practice' && !!props.solved);
  const [note, setNote] = useState<GradeNote | undefined>(undefined);
  const [placed, setPlaced] = useState<number[]>(() => {
    if (!tileItem) return [];
    if (props.mode === 'practice' && props.solved) return answerTiles.map((w) => tiles.indexOf(w));
    if (props.mode === 'test' && Array.isArray(props.value)) {
      const used = new Set<number>();
      return props.value.map((w) => {
        const i = tiles.findIndex((x, j) => x === w && !used.has(j));
        used.add(i);
        return i;
      });
    }
    return [];
  });
  const [orderOff, setOrderOff] = useState(false);
  const missesRef = useRef(0);
  const liveRef = useRef<HTMLParagraphElement>(null);

  // A course type's own option list wins (e.g. Mandarin tone options are arrays in the item).
  const options: string[] = logic?.options?.(item as ExtraItem) ?? ('options' in item ? (item.options as string[]) : []);
  const practice = props.mode === 'practice';

  const pick = (opt: string) => {
    if (!practice) {
      props.onChange(opt);
      return;
    }
    if (solved || wrong.includes(opt)) return;
    const r = grade(item, opt, text, ctx);
    if (r.correct) {
      setSolved(true);
      setNote(r.note);
      sfx('correct');
      if (r.note) props.onSolved(missesRef.current === 0, r.note);
      else props.onSolved(missesRef.current === 0);
    } else {
      missesRef.current += 1;
      setWrong((w) => [...w, opt]);
      sfx('wrong');
    }
  };

  /** Grades a whole response (tiles, or a course type's answer area). */
  const submit = (resp: Response, opts: { misses?: number } = {}) => {
    if (!practice || solved) return;
    if (opts.misses !== undefined) missesRef.current = opts.misses;
    const r = grade(item, resp, text, ctx);
    if (r.correct) {
      setSolved(true);
      setNote(r.note);
      setOrderOff(false);
      sfx('correct');
      if (r.note) props.onSolved(missesRef.current === 0, r.note);
      else props.onSolved(missesRef.current === 0);
    } else {
      const key = Array.isArray(resp) ? resp.join(' ') : resp;
      missesRef.current += 1;
      setOrderOff(true);
      setWrong((w) => (slots.dedupeWrong && w.includes(key) ? w : [...w, key]));
      sfx('wrong');
    }
  };

  const checkOrder = () => {
    if (!tileItem) return;
    submit(placed.map((i) => tiles[i]));
  };

  // 1–4 picks an answer.
  const numberKeys = props.numberKeys ?? true;
  useEffect(() => {
    if (!numberKeys) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const tag = (document.activeElement as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const n = Number(e.key);
      if (n >= 1 && n <= 4 && options[n - 1] !== undefined) {
        e.preventDefault();
        pick(options[n - 1]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const pillState = (opt: string): PillState => {
    if (!practice) return props.value === opt ? 'selected' : 'idle';
    const answer = 'answer' in item && typeof item.answer === 'string' ? item.answer : '';
    if (solved && (slots.correctPillByGrade ? grade(item, opt, text, ctx).correct : stripMarkup(opt) === stripMarkup(answer))) return 'correct';
    if (wrong.includes(opt)) return 'wrong';
    return 'idle';
  };

  const missed = wrong.length;
  const inSheet = practice && !!props.whyInSheet;
  const showWhy = practice && (solved ? !inSheet : missed >= 2);
  const layout = slots.optionLayout?.(item, options) ?? {
    wide: item.type === 'fix' || item.type === 'scene' || item.type === 'listen',
    badge: false,
  };
  const Inline = slots.Inline;
  const PromptView = slots.Prompt ?? Prompt;
  const Tray = slots.TileTray;
  const onTiles = (p: number[]) => {
    setPlaced(p);
    setOrderOff(false);
    if (!practice) props.onChange(p.map((i) => tiles[i]));
  };
  const tone = solved ? 'good' : orderOff ? 'off' : 'idle';

  return (
    <div className="flex flex-col gap-5" data-item={item.id} {...slots.rootAttrs?.(item)}>
      {item.cue && (
        <p lang="id" className="id-text">
          {Inline ? <Inline text={item.cue} item={item} /> : item.cue}
        </p>
      )}

      {(item.type === 'choice' || item.type === 'gap') && (
        <PromptView text={item.prompt} fill={solved ? item.answer : undefined} item={item} />
      )}
      {item.type === 'fix' && (
        <div className="flex flex-col gap-2">
          <p className="text-small text-muted">{t('check.fixPrompt')}</p>
          {slots.Wrong ? <slots.Wrong text={item.wrong} item={item} /> : <Sentence en={item.wrong} off play={false} />}
        </div>
      )}
      {item.type === 'scene' && (
        <div className="flex flex-col gap-3">
          <VisualStage visual={item.visual} interactive={false} />
          <p className="text-small text-muted">
            {Inline ? <Inline text={item.prompt ?? t('check.scenePrompt')} item={item} /> : (item.prompt ?? t('check.scenePrompt'))}
          </p>
        </div>
      )}
      {item.type === 'listen' &&
        (slots.Listen ? (
          <slots.Listen audio={item.audio} prompt={item.prompt} variety={item.variety} item={item} />
        ) : (
          <ListenPrompt audio={item.audio} prompt={item.prompt} />
        ))}
      {view && <view.Prompt item={item as ExtraItem} solved={solved} />}
      {item.type === 'order' && item.prompt && <PromptView text={item.prompt} item={item} />}

      {tileItem ? (
        <div className="flex flex-col gap-3">
          {Tray ? (
            <Tray tiles={tiles} placed={placed} onChange={onTiles} locked={solved} tone={tone} item={item} slots={answerTiles.length} />
          ) : (
            <TileTray tiles={tiles} placed={placed} onChange={onTiles} locked={solved} tone={tone} />
          )}
          {practice && !solved && (
            <button
              type="button"
              className="btn btn-primary self-start"
              disabled={placed.length !== answerTiles.length}
              onClick={checkOrder}
            >
              {t('check.checkOrder')}
            </button>
          )}
        </div>
      ) : view?.Answer && !options.length ? (
        <view.Answer
          item={item as ExtraItem}
          mode={props.mode}
          value={props.mode === 'test' ? props.value : undefined}
          solved={solved}
          tone={tone}
          onChange={(r) => {
            setOrderOff(false);
            if (!practice) props.onChange(r);
          }}
          submit={submit}
        />
      ) : ExtraOption ? (
        <div className="flex flex-wrap gap-2" role="group" aria-label={view.optionsLabelKey ? t(view.optionsLabelKey as never) : undefined}>
          {options.map((opt, i) => (
            <ExtraOption
              key={opt}
              value={opt}
              index={i}
              state={pillState(opt)}
              disabled={practice && (solved || wrong.includes(opt))}
              onClick={() => pick(opt)}
              item={item as ExtraItem}
            />
          ))}
        </div>
      ) : (
        <div className={layout.wide ? 'flex flex-col gap-2' : 'flex flex-wrap gap-2'} role="group">
          {options.map((opt, i) => (
            <OptionPill
              key={opt}
              label={opt}
              index={i}
              wide={layout.wide}
              badge={layout.badge}
              item={item}
              state={pillState(opt)}
              disabled={practice && (solved || wrong.includes(opt))}
              onClick={() => pick(opt)}
            />
          ))}
        </div>
      )}

      <div aria-live="polite" ref={liveRef} className="flex min-h-[1.6em] flex-col gap-2">
        {practice && !solved && missed > 0 && <p className="text-off">{t('check.wrong')}</p>}
        {practice && solved && !inSheet && <p className="sr-only">{t('check.correct')}</p>}
        {showWhy && <WhyLine why={item.why} hint={!solved} />}
        {solved && !inSheet && note && <NoteLine note={note} />}
      </div>
    </div>
  );
}
