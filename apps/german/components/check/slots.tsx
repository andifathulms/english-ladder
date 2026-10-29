'use client';

// German check items (DESIGN §6): prompts and answer areas for form, conjugate, dictation, gender, case,
// wordorder and wechsel. Typed answers always show the accent bar (core AccentBar, keys from
// course.input). A wrong typed answer that only misses a noun's capital says so under the field.
import { Fragment, useRef, useState } from 'react';
import type { AnswerProps, CheckSlots, TileTrayProps } from '@ladder/core/course/types';
import type { CheckItem, ExtraItem } from '@ladder/core/lib/types';
import { AccentBar } from '@ladder/core/components/ui/AccentBar';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { TileTray } from '@ladder/core/components/check/TileTray';
import { NoteLine } from '@ladder/core/components/check/NoteLine';
import { PlaceDrawing } from '@ladder/core/components/visuals/place/PlaceDrawing';
import { isPlace } from '@ladder/core/components/visuals/place/geometry';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useSettings, useT } from '@ladder/core/components/ProgressProvider';
import { parseInline, stripMarkup } from '@ladder/core/lib/markup';
import type { GradeNote } from '@ladder/core/lib/check/itemTypes';
import { cellResults, gradeTyped } from '@/course/items';
import { zonesOf, type Zone } from '@/lib/de/bracket';
import type { Kase } from '@/lib/de/articles';
import { CASE_LABEL, CaseWord } from '../de/CaseWord';
import type { GermanKey } from '@/i18n/overrides';
import type { CaseItem, ConjugateItem, DictationItem, FormItem, GenderItem, WechselItem, WordorderItem } from '@/course/schema';
import type { z } from 'zod';
import { GenderChip } from '../GenderChip';

type Form = z.infer<typeof FormItem> & ExtraItem;
type Conjugate = z.infer<typeof ConjugateItem> & ExtraItem;
type Dictation = z.infer<typeof DictationItem> & ExtraItem;
type Gender = z.infer<typeof GenderItem> & ExtraItem;
type Case = z.infer<typeof CaseItem> & ExtraItem;
type Wordorder = z.infer<typeof WordorderItem> & ExtraItem;
type Wechsel = z.infer<typeof WechselItem> & ExtraItem;

export const PERSON_LABEL: Record<string, string> = {
  ich: 'ich',
  du: 'du',
  er: 'er / sie / es',
  wir: 'wir',
  ihr: 'ihr',
  sie: 'sie / Sie',
};

const toneRing = (tone: 'idle' | 'good' | 'off') => (tone === 'good' ? 'var(--good)' : tone === 'off' ? 'var(--off)' : 'var(--rule)');

/** A text input with the accent bar under it; Enter checks in practice. */
function TypedInput({ label, value, onChange, onEnter, disabled, tone }: { label: string; value: string; onChange: (v: string) => void; onEnter?: () => void; disabled?: boolean; tone: 'idle' | 'good' | 'off' }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={ref}
        type="text"
        lang="de"
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
        className="min-h-pill w-full rounded-md bg-surface px-4 font-display text-[1.375rem] text-ink"
        style={{ boxShadow: `inset 0 0 0 2px ${toneRing(tone)}` }}
      />
      {!disabled && <AccentBar target={ref} />}
    </div>
  );
}

/**
 * Type one form, or a dictated sentence. After a wrong try, a missing noun capital gets its note here
 * (core shows grade notes only with a correct answer; DESIGN §6 wants this one on the wrong try).
 */
function TypedAnswer({ item, mode, value, solved, tone, onChange, submit, label, accepted }: AnswerProps & { label: string; accepted: string[] }) {
  const { t } = useT<GermanKey>();
  const settings = useSettings();
  const practice = mode === 'practice';
  const [typed, setTyped] = useState(() => (!practice && typeof value === 'string' ? value : ''));
  const [hint, setHint] = useState<GradeNote | null>(null);
  const check = () => {
    const r = gradeTyped(typed, accepted, item as { spelling?: 'strict' | 'lenient'; nounCaps?: boolean }, { settings });
    setHint(!r.correct && r.note ? r.note : null);
    submit(typed);
  };
  return (
    <div className="flex flex-col gap-3">
      <TypedInput
        label={label}
        value={typed}
        disabled={solved}
        tone={tone}
        onChange={(v) => {
          setTyped(v);
          setHint(null);
          onChange(v);
        }}
        onEnter={practice ? () => typed.trim() && check() : undefined}
      />
      {practice && !solved && (
        <button type="button" className="btn btn-primary self-start" disabled={!typed.trim()} onClick={check}>
          {t('check.checkOrder')}
        </button>
      )}
      {hint && !solved && (
        <div data-caps-hint>
          <NoteLine note={hint} />
        </div>
      )}
    </div>
  );
}

// ---------- form, conjugate, dictation ----------

function FormPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<GermanKey>();
  const f = item as Form;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-small text-muted">{f.prompt ?? t('check.formPrompt')}</p>
      <p className="flex flex-wrap items-baseline gap-x-3 rounded-lg bg-paper-2 px-4 py-3">
        <span lang="de" className="font-display text-sentence font-medium">
          {f.base}
        </span>
        <span className="label text-muted">
          → {PERSON_LABEL[f.target.person]} · {t(`tense.${f.target.tense}` as GermanKey)}
        </span>
      </p>
      {f.frame && (
        <p lang="de" className="font-display text-[1.375rem]">
          {stripMarkup(f.frame)}
        </p>
      )}
    </div>
  );
}

function FormAnswer(p: AnswerProps) {
  const { t } = useT<GermanKey>();
  const f = p.item as Form;
  return <TypedAnswer {...p} label={t('check.formLabel')} accepted={[f.answer, ...(f.accept ?? [])]} />;
}

function DictationPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<GermanKey>();
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
  const { t } = useT<GermanKey>();
  const d = p.item as Dictation;
  return <TypedAnswer {...p} label={t('check.dictationLabel')} accepted={[d.answer, ...(d.accept ?? [])]} />;
}

function ConjugatePrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<GermanKey>();
  const c = item as Conjugate;
  return (
    <p className="flex flex-wrap items-baseline gap-x-3">
      <span className="text-small text-muted">{c.prompt ?? t('check.conjugatePrompt')}</span>
      <span lang="de" className="font-display text-sentence font-medium">
        {c.verb}
      </span>
      <span className="label text-muted">{t(`tense.${c.tense}` as GermanKey)}</span>
    </p>
  );
}

/** A compact grid: person labels in mono, one input per cell; correct cells fill --good-bg. */
function ConjugateAnswer({ item, mode, value, solved, onChange, submit }: AnswerProps) {
  const { t } = useT<GermanKey>();
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
    setChecked(cellResults(cells, want, c, { settings }));
    submit(cells);
  };
  return (
    <div className="flex flex-col gap-3">
      <table className="w-full border-separate" style={{ borderSpacing: '0 var(--s-2)' }}>
        <caption className="sr-only">
          {c.verb} · {t(`tense.${c.tense}` as GermanKey)}
        </caption>
        <tbody>
          {c.persons.map((p, i) => {
            const ok = solved || checked?.[i];
            return (
              <tr key={p}>
                <th scope="row" lang="de" className="label w-[40%] pe-3 text-start align-middle font-mono normal-case text-muted">
                  {PERSON_LABEL[p]}
                </th>
                <td>
                  {solved ? (
                    <span lang="de" className="flex min-h-pill items-center rounded-md bg-good-bg px-4 font-display text-[1.25rem]">
                      {want[i]}
                    </span>
                  ) : (
                    <input
                      type="text"
                      lang="de"
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

// ---------- gender ----------

function GenderPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<GermanKey>();
  const g = item as Gender;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-small text-muted">{g.prompt ?? t('check.genderPrompt')}</p>
      <p lang="de" className="font-display text-sentence font-medium">
        {g.noun}
      </p>
    </div>
  );
}

/** der, die, das as three large chips with their shapes (DESIGN §6). */
function GenderOption({ value, state, disabled, onClick }: { value: string; index: number; state: string; disabled?: boolean; onClick: () => void; item: ExtraItem }) {
  const ring = state === 'correct' ? 'var(--good)' : state === 'wrong' ? 'var(--off)' : state === 'selected' ? 'var(--accent)' : 'transparent';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={state === 'selected' || state === 'correct'}
      data-state={state}
      className="rounded-md p-1 disabled:cursor-default"
      style={{ boxShadow: `0 0 0 2px ${ring}`, opacity: state === 'wrong' ? 0.55 : 1, background: state === 'correct' ? 'var(--good-bg)' : undefined }}
    >
      <GenderChip gender={value as 'm' | 'f' | 'n'} size="large" />
    </button>
  );
}

// ---------- case ----------

function CaseLabel({ kase }: { kase: Kase }) {
  const { t } = useT<GermanKey>();
  return (
    <span className={`label case-${kase} rounded-sm px-2 py-[2px]`} style={{ boxShadow: 'inset 0 0 0 1px currentColor' }} title={t(`check.role.${kase}` as GermanKey)}>
      {CASE_LABEL[kase]}
      <span className="sr-only"> · {t(`check.role.${kase}` as GermanKey)}</span>
    </span>
  );
}

/** A sentence with one slot: underlined while open, the answer with its changed letters once solved. */
function SlotSentence({ sentence, answer, kase, solved }: { sentence: string; answer: string; kase: Kase; solved: boolean }) {
  const [before, after] = stripMarkup(sentence).split('___');
  return (
    <p lang="de" className="font-display text-sentence font-medium">
      {before}
      {solved ? (
        <CaseWord form={answer} kase={kase} />
      ) : (
        <span className="inline-block min-w-[3.5ch] border-b-2 border-accent align-baseline">
          <span aria-hidden>{'\u00a0'}</span>
          <span className="sr-only">___</span>
        </span>
      )}
      {after}
    </p>
  );
}

function CasePrompt({ item, solved }: { item: ExtraItem; solved: boolean }) {
  const { t } = useT<GermanKey>();
  const c = item as Case;
  return (
    <div className="flex flex-col gap-3">
      <p className="flex flex-wrap items-center gap-2 text-small text-muted">
        {c.prompt ?? t('check.casePrompt')} <CaseLabel kase={c.role} />
      </p>
      <SlotSentence sentence={c.sentence} answer={c.answer} kase={c.role} solved={solved} />
    </div>
  );
}

function CaseAnswer(p: AnswerProps) {
  const { t } = useT<GermanKey>();
  const c = p.item as Case;
  return <TypedAnswer {...p} label={t('check.caseLabel')} accepted={[c.answer]} />;
}

// ---------- wechsel ----------

function WechselPrompt({ item, solved }: { item: ExtraItem; solved: boolean }) {
  const { t, lang } = useT<GermanKey>();
  const w = item as Wechsel;
  const kase: Kase = w.scene.motion ? 'akk' : 'dat';
  const place = w.scene.place;
  return (
    <div className="flex flex-col gap-3">
      {isPlace(place) && (
        <div className="relative max-w-[360px] overflow-hidden rounded-lg bg-paper-2">
          <PlaceDrawing place={place} from={null} alt={t(w.scene.motion ? 'check.wohin' : 'check.wo')} labels={{ table: lang === 'en' ? 'table' : 'meja', box: lang === 'en' ? 'box' : 'kotak' }} />
          {w.scene.motion && (
            <svg aria-hidden viewBox="0 0 400 260" className="pointer-events-none absolute inset-0 h-full w-full">
              <path d="M70 60 C 140 10, 220 20, 250 90" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="6 5" />
              <path d="M242 80 L251 93 L257 78" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
            </svg>
          )}
        </div>
      )}
      <p className="flex flex-wrap items-center gap-2 text-small text-muted">
        <span className="label rounded-sm bg-paper-2 px-2 py-[2px] text-ink" data-motion={w.scene.motion}>
          {t(w.scene.motion ? 'check.wohin' : 'check.wo')}
        </span>
        {w.prompt ?? t('check.wechselPrompt')}
        {solved && <CaseLabel kase={kase} />}
      </p>
      <SlotSentence sentence={w.sentence} answer={w.answer} kase={kase} solved={solved} />
    </div>
  );
}

// ---------- wordorder ----------

function WordorderPrompt({ item }: { item: ExtraItem }) {
  const { t } = useT<GermanKey>();
  const w = item as Wordorder;
  return <p className="text-small text-muted">{w.prompt ?? t('check.wordorderPrompt')}</p>;
}

const ZONES: Zone[] = ['p1', 'verb', 'middle', 'end'];

/** The bracket frame under the answer line (DESIGN §6): four labelled zones; the verb zone lights when filled. */
function BracketZones({ item, placed }: { item: Wordorder; placed: string[] }) {
  const { t } = useT<GermanKey>();
  if (!item.zones) return null;
  const zones = item.zones as Zone[];
  // Zones of what is placed so far: the verb is position 2, the end part the last tiles.
  const given = placed.length === item.answer.length ? zonesOf(placed, item.answer, zones) : placed.map((_, i) => (i === 0 ? 'p1' : i === 1 ? 'verb' : 'middle'));
  const shown = ZONES.filter((z) => zones.includes(z) || z === 'middle');
  return (
    <ol className="grid gap-1" style={{ gridTemplateColumns: `repeat(${shown.length}, minmax(0, 1fr))` }} aria-label={t('check.bracket')} data-bracket>
      {shown.map((z) => {
        const words = placed.filter((_, i) => given[i] === z);
        const isVerb = z === 'verb';
        return (
          <li
            key={z}
            className="flex min-h-[56px] flex-col gap-1 rounded-sm px-2 py-1"
            style={{ boxShadow: `inset 0 0 0 ${isVerb ? 2 : 1}px ${isVerb ? 'var(--accent)' : 'var(--rule)'}`, background: isVerb && words.length ? 'var(--accent-soft)' : undefined }}
            data-zone={z}
          >
            <span className="label text-muted">{t(`zone.${z}` as GermanKey)}</span>
            <span lang="de" className="text-small">
              {words.join(' ')}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** Tile items: core's tray; wordorder items add the bracket frame under the answer line. */
function GermanTileTray(props: TileTrayProps & { item: CheckItem; slots: number }) {
  const { item, slots: _slots, ...tray } = props;
  if ((item as { type: string }).type !== 'wordorder') return <TileTray {...tray} />;
  const w = item as unknown as Wordorder;
  return <TileTray {...tray} AfterLine={({ placed }) => <BracketZones item={w} placed={placed} />} />;
}

// ---------- why lines ----------

/** Why lines with their markup: *italic* and [[focus]] are German words, **bold** in the accent. */
function WhyText({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((tok, i) =>
        tok.t === 'em' || tok.t === 'focus' ? (
          <em key={i} lang="de">
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
  TileTray: GermanTileTray,
  rootAttrs: (item) => ({ 'data-type': item.type }),
  types: {
    form: { Prompt: FormPrompt, Answer: FormAnswer },
    conjugate: { Prompt: ConjugatePrompt, Answer: ConjugateAnswer },
    dictation: { Prompt: DictationPrompt, Answer: DictationAnswer },
    gender: { Prompt: GenderPrompt, Option: GenderOption, optionsLabelKey: 'check.genderOptions' },
    case: { Prompt: CasePrompt, Answer: CaseAnswer },
    wechsel: { Prompt: WechselPrompt },
    wordorder: { Prompt: WordorderPrompt },
  },
};
