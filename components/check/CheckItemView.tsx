'use client';

import { useEffect, useRef, useState } from 'react';
import type { CheckItem, Noun } from '@/lib/types';
import { grade, type Response } from '@/lib/check/grade';
import { sfx } from '@/lib/speech/sfx';
import { stripMarkup } from '@/lib/markup';
import { OptionPill, type PillState } from './OptionPill';
import { TileTray } from './TileTray';
import { WhyLine } from './WhyLine';
import { Sentence } from '../lesson/Sentence';
import { VisualStage } from '../visuals/VisualStage';
import { IconPlay } from '../ui/Icon';
import { useT } from '../ProgressProvider';
import { useCanSpeak, useSpeak } from '../useSpeech';

type Common = { item: CheckItem; nouns?: Noun[] };
type Practice = Common & {
  mode: 'practice';
  /** Already solved earlier (e.g. going back to a finished item). */
  solved?: boolean;
  onSolved: (firstTry: boolean) => void;
  /** The parent shows the why line in its feedback sheet once solved. */
  whyInSheet?: boolean;
};
type Test = Common & { mode: 'test'; value?: Response; onChange: (r: Response) => void };

function Prompt({ text, fill }: { text: string; fill?: string }) {
  const [a, b] = text.split('___');
  if (b === undefined) return <Sentence en={text} play={false} />;
  return (
    <p lang="en" className="font-display text-sentence font-medium text-ink">
      {stripMarkup(a)}
      {fill ? (
        <span className="focus-word">{fill}</span>
      ) : (
        <span aria-label="blank" className="inline-block w-[3.5em] border-b-2 border-ink align-baseline">
          &nbsp;
        </span>
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
  const { item, nouns } = props;
  const { t } = useT();
  const [wrong, setWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(props.mode === 'practice' && !!props.solved);
  const [placed, setPlaced] = useState<number[]>(() => {
    if (item.type !== 'order') return [];
    if (props.mode === 'practice' && props.solved) return item.answer.map((w) => item.tiles.indexOf(w));
    if (props.mode === 'test' && Array.isArray(props.value)) {
      const used = new Set<number>();
      return props.value.map((w) => {
        const i = item.tiles.findIndex((x, j) => x === w && !used.has(j));
        used.add(i);
        return i;
      });
    }
    return [];
  });
  const [orderOff, setOrderOff] = useState(false);
  const missesRef = useRef(0);
  const liveRef = useRef<HTMLParagraphElement>(null);

  const options = 'options' in item ? item.options : [];
  const practice = props.mode === 'practice';

  const pick = (opt: string) => {
    if (!practice) {
      props.onChange(opt);
      return;
    }
    if (solved || wrong.includes(opt)) return;
    if (grade(item, opt).correct) {
      setSolved(true);
      sfx('correct');
      props.onSolved(missesRef.current === 0);
    } else {
      missesRef.current += 1;
      setWrong((w) => [...w, opt]);
      sfx('wrong');
    }
  };

  const checkOrder = () => {
    if (item.type !== 'order' || !practice) return;
    const resp = placed.map((i) => item.tiles[i]);
    if (grade(item, resp).correct) {
      setSolved(true);
      setOrderOff(false);
      sfx('correct');
      props.onSolved(missesRef.current === 0);
    } else {
      missesRef.current += 1;
      setOrderOff(true);
      setWrong((w) => [...w, resp.join(' ')]);
      sfx('wrong');
    }
  };

  // 1–4 picks an answer.
  useEffect(() => {
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
    if (solved && stripMarkup(opt) === stripMarkup(item.type === 'order' ? '' : item.answer)) return 'correct';
    if (wrong.includes(opt)) return 'wrong';
    return 'idle';
  };

  const missed = wrong.length;
  const inSheet = practice && !!props.whyInSheet;
  const showWhy = practice && (solved ? !inSheet : missed >= 2);
  const sentenceOptions = item.type === 'fix' || item.type === 'scene' || item.type === 'listen';

  return (
    <div className="flex flex-col gap-5" data-item={item.id}>
      {item.cue && (
        <p lang="id" className="id-text">
          {item.cue}
        </p>
      )}

      {(item.type === 'choice' || item.type === 'gap') && (
        <Prompt text={item.prompt} fill={solved ? item.answer : undefined} />
      )}
      {item.type === 'fix' && (
        <div className="flex flex-col gap-2">
          <p className="text-small text-muted">{t('check.fixPrompt')}</p>
          <Sentence en={item.wrong} off play={false} />
        </div>
      )}
      {item.type === 'scene' && (
        <div className="flex flex-col gap-3">
          <VisualStage visual={item.visual} nouns={nouns} interactive={false} />
          <p className="text-small text-muted">{item.prompt ?? t('check.scenePrompt')}</p>
        </div>
      )}
      {item.type === 'listen' && <ListenPrompt audio={item.audio} prompt={item.prompt} />}
      {item.type === 'order' && item.prompt && <Prompt text={item.prompt} />}

      {item.type === 'order' ? (
        <div className="flex flex-col gap-3">
          <TileTray
            tiles={item.tiles}
            placed={placed}
            onChange={(p) => {
              setPlaced(p);
              setOrderOff(false);
              if (!practice) props.onChange(p.map((i) => item.tiles[i]));
            }}
            locked={solved}
            tone={solved ? 'good' : orderOff ? 'off' : 'idle'}
          />
          {practice && !solved && (
            <button
              type="button"
              className="btn btn-primary self-start"
              disabled={placed.length !== item.tiles.length}
              onClick={checkOrder}
            >
              {t('check.checkOrder')}
            </button>
          )}
        </div>
      ) : (
        <div className={sentenceOptions ? 'flex flex-col gap-2' : 'flex flex-wrap gap-2'} role="group">
          {options.map((opt, i) => (
            <OptionPill
              key={opt}
              label={opt}
              index={i}
              wide={sentenceOptions}
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
      </div>
    </div>
  );
}
