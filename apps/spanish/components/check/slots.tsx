'use client';

// Spanish check items (DESIGN §6): prompts and answer areas for form, conjugate, agree, dictation and
// stress. Typed answers always show the accent bar (core AccentBar, keys from course.input).
import { Fragment, useRef, useState } from 'react';
import type { AnswerProps, CheckSlots } from '@ladder/core/course/types';
import type { ExtraItem } from '@ladder/core/lib/types';
import { AccentBar } from '@ladder/core/components/ui/AccentBar';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useSettings, useT } from '@ladder/core/components/ProgressProvider';
import { parseInline, stripMarkup } from '@ladder/core/lib/markup';
import { cellResults, modeOf } from '@/course/items';
import { foldAccents } from '@/lib/es/text';
import { stemEnding } from '@/lib/es/conjugate';
import type { SpanishKey } from '@/i18n/overrides';
import type { AgreeItem, ConjugateItem, DictationItem, FormItem, StressItem } from '@/course/schema';
import type { z } from 'zod';
import { GenderChip } from '../GenderChip';

type Form = z.infer<typeof FormItem> & ExtraItem;
type Conjugate = z.infer<typeof ConjugateItem> & ExtraItem;
type Agree = z.infer<typeof AgreeItem> & ExtraItem;
type Dictation = z.infer<typeof DictationItem> & ExtraItem;
type Stress = z.infer<typeof StressItem> & ExtraItem;

const PERSON_LABEL: Record<string, string> = {
  yo: 'yo',
  tu: 'tú',
  el: 'él / ella / usted',
  nosotros: 'nosotros/as',
  vosotros: 'vosotros/as',
  ellos: 'ellos / ellas / ustedes',
};

const toneRing = (tone: 'idle' | 'good' | 'off') => (tone === 'good' ? 'var(--good)' : tone === 'off' ? 'var(--off)' : 'var(--rule)');

/** A text input with the accent bar under it; Enter checks in practice. */
function TypedInput({
  label,
  value,
  onChange,
  onEnter,
  disabled,
  tone,
  wide = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
  disabled?: boolean;
  tone: 'idle' | 'good' | 'off';
  wide?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={ref}
        type="text"
        lang="es-419"
        aria-label={label}
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnter) {
            e.preventDefault();
            onEnter();
          }
        }}
        className={`min-h-pill ${wide ? 'w-full' : 'w-[12ch]'} rounded-md bg-surface px-4 font-display text-[1.375rem] text-ink`}
        style={{ boxShadow: `inset 0 0 0 2px ${toneRing(tone)}` }}
      />
      {!disabled && <AccentBar target={ref} />}
    </div>
  );
}

function FormPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<SpanishKey>();
  const f = item as Form;
  const target =
    'tense' in f.target
      ? `${PERSON_LABEL[f.target.person]} · ${t(`tense.${f.target.tense}` as SpanishKey)}`
      : `${t(f.target.gender === 'f' ? 'gender.f' : 'gender.m')} · ${t(f.target.number === 'pl' ? 'number.pl' : 'number.sg')}`;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">{f.prompt ?? t('check.formPrompt')}</p>
      <p className="flex flex-wrap items-baseline gap-x-3 rounded-lg bg-paper-2 px-4 py-3">
        <span lang="es-419" className="font-display text-sentence font-medium">
          {f.base}
        </span>
        <span className="label text-muted">→ {target}</span>
      </p>
      {f.frame && (
        <p lang="es-419" className="font-display text-[1.375rem]">
          {stripMarkup(f.frame)}
        </p>
      )}
    </div>
  );
}

/** Type one form, or a dictated sentence. */
function TypedAnswer({ mode, value, solved, tone, onChange, submit, label }: AnswerProps & { label: string }) {
  const { t } = useT<SpanishKey>();
  const practice = mode === 'practice';
  const [typed, setTyped] = useState(() => (!practice && typeof value === 'string' ? value : ''));
  return (
    <div className="flex flex-col gap-3">
      <TypedInput
        label={label}
        value={typed}
        disabled={solved}
        tone={tone}
        onChange={(v) => {
          setTyped(v);
          onChange(v);
        }}
        onEnter={practice ? () => typed.trim() && submit(typed) : undefined}
      />
      {practice && !solved && (
        <button type="button" className="btn btn-primary self-start" disabled={!typed.trim()} onClick={() => submit(typed)}>
          {t('check.checkOrder')}
        </button>
      )}
    </div>
  );
}

function FormAnswer(p: AnswerProps) {
  const { t } = useT<SpanishKey>();
  return <TypedAnswer {...p} label={t('check.formLabel')} />;
}

function DictationPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<SpanishKey>();
  const d = item as Dictation;
  const play = usePlay();
  const [playing, setPlaying] = useState(false);
  const run = async () => {
    setPlaying(true);
    await play(stripMarkup(d.audio));
    setPlaying(false);
  };
  return (
    <div className="flex items-center gap-4">
      <PlayButton text={stripMarkup(d.audio)} onPlay={run} playing={playing} label={t('check.listenPlay')} />
      <p className="text-small text-muted">{d.prompt ?? t('check.dictationPrompt')}</p>
    </div>
  );
}

function DictationAnswer(p: AnswerProps) {
  const { t } = useT<SpanishKey>();
  return <TypedAnswer {...p} label={t('check.dictationLabel')} />;
}

/** A form split into stem (ink) and ending (accent), DESIGN §4. */
function Ending({ verb, form }: { verb: string; form: string }) {
  const { stem, ending } = stemEnding({ inf: verb, id: '' }, form);
  return (
    <>
      {stem}
      <span className="es-ending">{ending}</span>
    </>
  );
}

function ConjugatePrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<SpanishKey>();
  const c = item as Conjugate;
  return (
    <p className="flex flex-wrap items-baseline gap-x-3">
      <span className="text-small text-muted">{c.prompt ?? t('check.conjugatePrompt')}</span>
      <span lang="es-419" className="font-display text-sentence font-medium">
        {c.verb}
      </span>
      <span className="label text-muted">{t(`tense.${c.tense}` as SpanishKey)}</span>
    </p>
  );
}

/** A compact grid: person labels in mono, one input per cell; correct cells fill --good-bg. */
function ConjugateAnswer({ item, mode, value, solved, onChange, submit }: AnswerProps) {
  const { t } = useT<SpanishKey>();
  const settings = useSettings();
  const c = item as Conjugate;
  const practice = mode === 'practice';
  const [cells, setCells] = useState<string[]>(() => (!practice && Array.isArray(value) ? value : c.persons.map(() => '')));
  const [checked, setChecked] = useState<boolean[] | null>(null);
  const focused = useRef<HTMLInputElement | null>(null);
  const want = c.persons.map((p) => c.answers[p]!);
  const set = (i: number, v: string) => {
    const next = cells.map((x, j) => (j === i ? v : x));
    setCells(next);
    setChecked(null);
    onChange(next);
  };
  const check = () => {
    setChecked(cellResults(cells, want, modeOf(c, { settings })));
    submit(cells);
  };
  return (
    <div className="flex flex-col gap-3">
      <table className="w-full border-separate" style={{ borderSpacing: '0 var(--s-2)' }}>
        <caption className="sr-only">
          {c.verb} · {t(`tense.${c.tense}` as SpanishKey)}
        </caption>
        <tbody>
          {c.persons.map((p, i) => {
            const ok = solved || checked?.[i];
            return (
              <tr key={p}>
                <th scope="row" className="label w-[40%] pe-3 text-start align-middle font-mono text-muted">
                  {PERSON_LABEL[p]}
                </th>
                <td>
                  {solved ? (
                    <span lang="es-419" className="flex min-h-pill items-center rounded-md bg-good-bg px-4 font-display text-[1.25rem]">
                      <Ending verb={c.verb} form={want[i]} />
                    </span>
                  ) : (
                    <input
                      type="text"
                      lang="es-419"
                      aria-label={`${c.verb}, ${PERSON_LABEL[p]}`}
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
                      spellCheck={false}
                      value={cells[i]}
                      onFocus={(e) => {
                        focused.current = e.currentTarget;
                      }}
                      onChange={(e) => set(i, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && practice && cells.every((x) => x.trim())) check();
                      }}
                      className={`min-h-pill w-full rounded-md px-4 font-display text-[1.25rem] text-ink ${ok ? 'bg-good-bg' : 'bg-surface'}`}
                      style={{ boxShadow: `inset 0 0 0 2px ${checked && !checked[i] ? 'var(--off)' : ok ? 'var(--good)' : 'var(--rule)'}` }}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!solved && <AccentBar target={focused} />}
      {practice && !solved && (
        <button type="button" className="btn btn-primary self-start" disabled={!cells.every((x) => x.trim())} onClick={check}>
          {t('check.checkOrder')}
        </button>
      )}
    </div>
  );
}

function AgreePrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<SpanishKey>();
  const a = item as Agree;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">{a.prompt ?? t('check.agreePrompt')}</p>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg bg-paper-2 px-4 py-3">
        <span className="font-display text-sentence text-muted">___</span>
        <span lang="es-419" className="font-display text-sentence font-medium">
          {a.noun.es}
        </span>
        <GenderChip gender={a.noun.gender} />
        <span className="label text-muted">{t(a.noun.number === 'pl' ? 'number.pl' : 'number.sg')}</span>
        <span className="font-display text-sentence text-muted">___</span>
        <span lang="es-419" className="text-muted">
          ({a.adj})
        </span>
      </p>
    </div>
  );
}

/** Two rows of tiles: the article and the adjective form. */
function AgreeAnswer({ item, mode, value, solved, tone, onChange, submit }: AnswerProps) {
  const { t } = useT<SpanishKey>();
  const a = item as Agree;
  const practice = mode === 'practice';
  const [pick, setPick] = useState<string[]>(() => (!practice && Array.isArray(value) ? value : ['', '']));
  const choose = (slot: number, v: string) => {
    if (solved) return;
    const next = pick.map((x, i) => (i === slot ? v : x));
    setPick(next);
    onChange(next);
  };
  const row = (slot: number, label: string, options: string[]) => (
    <div className="flex flex-col gap-2">
      <span className="label text-muted">{label}</span>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = pick[slot] === o;
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={on}
              disabled={solved}
              lang="es-419"
              onClick={() => choose(slot, o)}
              className="min-h-pill rounded-md px-4 font-display text-[1.25rem]"
              style={{ boxShadow: `inset 0 0 0 2px ${on ? (solved || tone === 'good' ? 'var(--good)' : tone === 'off' ? 'var(--off)' : 'var(--accent)') : 'var(--rule)'}`, background: on && solved ? 'var(--good-bg)' : undefined }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
  return (
    <div className="flex flex-col gap-4">
      {row(0, t('check.article'), a.options.article)}
      {row(1, t('check.adjective'), a.options.adjective)}
      {practice && !solved && (
        <button type="button" className="btn btn-primary self-start" disabled={!pick[0] || !pick[1]} onClick={() => submit(pick)}>
          {t('check.checkOrder')}
        </button>
      )}
    </div>
  );
}

function StressPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<SpanishKey>();
  const s = item as Stress;
  return (
    <p className="flex flex-wrap items-baseline gap-x-3">
      <span className="text-small text-muted">{s.prompt ?? t('check.stressPrompt')}</span>
      <span lang="es-419" className="font-display text-sentence font-medium">
        {foldAccents(s.word)}
      </span>
    </p>
  );
}

/** Syllable chips (tap the stressed one), then "perlu aksen?" yes / no. Always strict. */
function StressAnswer({ item, mode, value, solved, tone, onChange, submit }: AnswerProps) {
  const { t } = useT<SpanishKey>();
  const s = item as Stress;
  const practice = mode === 'practice';
  const [pick, setPick] = useState<string[]>(() => (!practice && Array.isArray(value) ? value : ['', '']));
  const choose = (slot: number, v: string) => {
    if (solved) return;
    const next = pick.map((x, i) => (i === slot ? v : x));
    setPick(next);
    onChange(next);
  };
  const ring = (on: boolean) => (on ? (solved || tone === 'good' ? 'var(--good)' : tone === 'off' ? 'var(--off)' : 'var(--accent)') : 'var(--rule)');
  return (
    <div className="flex flex-col gap-4">
      <div role="radiogroup" aria-label={t('check.stressSyllable')} className="flex flex-wrap gap-1">
        {s.syllables.map((syl, i) => {
          const on = pick[0] === String(i);
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={on}
              disabled={solved}
              lang="es-419"
              onClick={() => choose(0, String(i))}
              className="min-h-[48px] min-w-[48px] rounded-md px-3 font-display text-[1.375rem] transition-transform duration-quick"
              style={{ boxShadow: `inset 0 0 0 2px ${ring(on)}`, transform: on ? 'translateY(-8px)' : undefined }}
            >
              {foldAccents(syl)}
            </button>
          );
        })}
      </div>
      <div role="radiogroup" aria-label={t('check.needsAccent')} className="flex flex-wrap items-center gap-2">
        <span className="text-small text-muted">{t('check.needsAccent')}</span>
        {(['yes', 'no'] as const).map((v) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={pick[1] === v}
            disabled={solved}
            onClick={() => choose(1, v)}
            className="min-h-pill rounded-md px-4 font-body font-semibold"
            style={{ boxShadow: `inset 0 0 0 2px ${ring(pick[1] === v)}` }}
          >
            {t(v === 'yes' ? 'check.yes' : 'check.no')}
          </button>
        ))}
      </div>
      {practice && !solved && (
        <button type="button" className="btn btn-primary self-start" disabled={!pick[0] || !pick[1]} onClick={() => submit(pick)}>
          {t('check.checkOrder')}
        </button>
      )}
      {solved && (
        <p lang="es-419" className="font-display text-sentence">
          {s.word}
        </p>
      )}
    </div>
  );
}

/** Why lines with their markup: *italic* and [[focus]] are Spanish words, **bold** in the accent. */
function WhyText({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((tok, i) =>
        tok.t === 'em' || tok.t === 'focus' ? (
          <em key={i} lang="es-419">
            {tok.v}
          </em>
        ) : tok.t === 'strong' ? (
          <strong key={i} className="text-accent">
            {tok.v}
          </strong>
        ) : (
          <Fragment key={i}>{tok.v}</Fragment>
        ),
      )}
    </>
  );
}

export const checkSlots: CheckSlots = {
  WhyText,
  rootAttrs: (item) => ({ 'data-type': item.type }),
  types: {
    form: { Prompt: FormPrompt, Answer: FormAnswer },
    conjugate: { Prompt: ConjugatePrompt, Answer: ConjugateAnswer },
    agree: { Prompt: AgreePrompt, Answer: AgreeAnswer },
    dictation: { Prompt: DictationPrompt, Answer: DictationAnswer },
    stress: { Prompt: StressPrompt, Answer: StressAnswer },
  },
};
