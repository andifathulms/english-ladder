'use client';

import { useState } from 'react';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { useVisualData } from '@ladder/core/components/visuals/VisualData';
import { PlayButton } from '@ladder/core/components/lesson/PlayButton';
import { Toggle } from '@ladder/core/components/ui/Toggle';
import { usePlay } from '@ladder/core/components/useSpeech';
import { useReducedMotion } from '@ladder/core/components/ProgressProvider';
import { PERSONS, conjugate, stemEnding, type Person, type Tense, type VerbData } from '@/lib/es/conjugate';
import { foldAccents } from '@/lib/es/text';
import { Chips } from './Chips';

export type GridData = { verbs: VerbData[] };

const PERSON_LABEL: Record<Person, string> = {
  yo: 'yo',
  tu: 'tú',
  el: 'él / ella / usted',
  nosotros: 'nosotros/as',
  vosotros: 'vosotros/as',
  ellos: 'ellos / ellas / ustedes',
};
const BOOT: Person[] = ['yo', 'tu', 'el', 'ellos'];

const TENSE_NAME: Record<Tense, { id: string; en: string }> = {
  presente: { id: 'presente', en: 'present' },
  preterito: { id: 'pretérito indefinido', en: 'preterite' },
  imperfecto: { id: 'imperfecto', en: 'imperfect' },
  futuro: { id: 'futuro', en: 'future' },
  condicional: { id: 'condicional', en: 'conditional' },
  subjuntivo: { id: 'subjuntivo', en: 'subjunctive' },
  imperativo: { id: 'imperativo', en: 'imperative' },
};

const TEXT = {
  id: {
    search: 'Cari kata kerja (boleh tanpa aksen)',
    verbs: 'Kata kerja',
    tense: 'Kala',
    pattern: 'Tampilkan pola akhiran saja',
    on: 'Ya',
    off: 'Tidak',
    spain: 'ESPAÑA',
    spainShow: 'Tampilkan bentuk vosotros (Spanyol)',
    irregular: 'tak beraturan',
    boot: 'akar berubah',
    person: 'Persona',
    legend: 'Akar dalam tinta, akhiran berwarna. Garis putus-putus: tak beraturan. Garis biru: akarnya berubah (bentuk "sepatu").',
  },
  en: {
    search: 'Find a verb (accents optional)',
    verbs: 'Verbs',
    tense: 'Tense',
    pattern: 'Show the ending pattern only',
    on: 'On',
    off: 'Off',
    spain: 'ESPAÑA',
    spainShow: 'Show the vosotros forms (Spain)',
    irregular: 'irregular',
    boot: 'stem changes',
    person: 'Person',
    legend: 'Stem in ink, ending in colour. Dashed: irregular. Blue outline: the stem changes (the "boot").',
  },
};

/** How a cell came about: regular, a stem change (the boot), or irregular. */
function kind(v: VerbData, tense: Tense, p: Person, form: string): 'regular' | 'boot' | 'irregular' {
  const plainVerb: VerbData = { inf: v.inf, id: v.id };
  if (form === conjugate(plainVerb, tense, p)) return 'regular';
  const noOverrides: VerbData = { ...v, irregular: undefined };
  if ((v.stem || v.stress) && tense === 'presente' && BOOT.includes(p) && form === conjugate(noOverrides, tense, p)) return 'boot';
  return 'irregular';
}

/**
 * ConjugationGrid (DESIGN §7.4): the six persons of one verb in one tense, as a real table. Stems in
 * ink, endings in the accent; irregular cells dashed in --off; stem-changing persons outlined as the
 * "boot"; vosotros greyed behind an España chip. Pattern view keeps only the endings. Every form comes
 * from lib/es and verbs.yaml.
 */
export function ConjugationGrid({
  interactive = true,
  lang,
  verb = 'hablar',
  tenses = ['presente'],
  fixed = false,
}: VisualProps<never> & { verb?: string; tenses?: Tense[]; fixed?: boolean }) {
  const t = TEXT[lang];
  const data = useVisualData<GridData>();
  const verbs = data?.verbs ?? [];
  const reduced = useReducedMotion();
  const play = usePlay();
  const [inf, setInf] = useState(verb);
  const [tense, setTense] = useState<Tense>(tenses[0] ?? 'presente');
  const [query, setQuery] = useState('');
  const [pattern, setPattern] = useState(false);
  const [showSpain, setShowSpain] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);
  const v = verbs.find((x) => x.inf === inf) ?? verbs[0];
  if (!v) return null;

  const q = foldAccents(query.trim().toLowerCase());
  const matches = q ? verbs.filter((x) => foldAccents(x.inf).includes(q) || x.id.toLowerCase().includes(q)).slice(0, 8) : [];
  const rows = PERSONS.map((p) => {
    const form = conjugate(v, tense, p);
    return { p, form, kind: form ? kind(v, tense, p, form) : ('regular' as const), split: stemEnding(v, form) };
  }).filter((r) => r.form);
  const run = async (form: string, p: Person) => {
    setPlaying(form);
    await play(form, p === 'vosotros' ? 'es' : undefined);
    setPlaying(null);
  };
  const outline = (k: string) =>
    k === 'irregular' ? 'inset 0 0 0 2px var(--off)' : k === 'boot' ? 'inset 0 0 0 2px var(--accent)' : 'inset 0 0 0 1px var(--rule)';

  return (
    <div className="flex flex-col gap-4" data-visual="conjugation-grid">
      <p className="flex flex-wrap items-baseline gap-x-3">
        <span lang="es-419" className="font-display text-h2 font-semibold">
          {v.inf}
        </span>
        <span className="id-text">{v.id}</span>
      </p>
      <table className="w-full border-separate" style={{ borderSpacing: '0 var(--s-1)' }}>
        <caption className="sr-only">
          {v.inf} · {TENSE_NAME[tense][lang]}
        </caption>
        <thead>
          <tr>
            <th scope="col" className="label pb-1 text-start text-muted">
              {t.person}
            </th>
            <th scope="col" className="label pb-1 text-start text-muted">
              {TENSE_NAME[tense][lang]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const spain = r.p === 'vosotros';
            const hidden = spain && !showSpain;
            return (
              <tr key={r.p}>
                <th scope="row" className="label w-[42%] pe-2 text-start align-middle font-mono text-muted">
                  {PERSON_LABEL[r.p]}
                  {spain && (
                    <button
                      type="button"
                      onClick={() => setShowSpain((x) => !x)}
                      aria-pressed={showSpain}
                      aria-label={t.spainShow}
                      className="label ms-2 rounded-sm bg-es-soft px-1 text-es"
                    >
                      {t.spain}
                    </button>
                  )}
                </th>
                <td>
                  <span
                    className={`flex min-h-touch items-center justify-between gap-2 rounded-md ps-3 ${hidden ? 'bg-paper text-muted' : 'bg-surface'}`}
                    style={{
                      boxShadow: outline(r.kind),
                      outline: r.kind === 'irregular' ? '2px dashed var(--off)' : undefined,
                      outlineOffset: r.kind === 'irregular' ? '-2px' : undefined,
                      transition: reduced ? 'none' : 'box-shadow var(--m-base-d) var(--ease)',
                    }}
                  >
                    <span lang={spain ? 'es-ES' : 'es-419'} className="font-display text-[1.25rem]">
                      {hidden ? '·····' : pattern && r.split.ending ? (
                        <span className="es-ending">-{r.split.ending}</span>
                      ) : (
                        <>
                          {r.split.stem}
                          <span className="es-ending">{r.split.ending}</span>
                        </>
                      )}
                    </span>
                    {!hidden && (
                      <span className="flex items-center gap-1">
                        {r.kind !== 'regular' && <span className="label text-muted">{r.kind === 'boot' ? t.boot : t.irregular}</span>}
                        <PlayButton text={r.form} variety={spain ? 'es' : undefined} onPlay={() => run(r.form, r.p)} playing={playing === r.form} small />
                      </span>
                    )}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-small text-muted">{t.legend}</p>
      <p className="sr-only" aria-live="polite">
        {`${v.inf}, ${TENSE_NAME[tense][lang]}: ${rows.filter((r) => r.p !== 'vosotros' || showSpain).map((r) => `${PERSON_LABEL[r.p]} ${r.form}`).join(', ')}`}
      </p>
      {interactive && (
        <div className="flex flex-col gap-3">
          {tenses.length > 1 && (
            <Chips label={t.tense} options={tenses} value={tense} onChange={setTense} render={(x) => TENSE_NAME[x][lang]} />
          )}
          <Toggle label={t.pattern} checked={pattern} onChange={setPattern} onLabel={t.on} offLabel={t.off} />
          {!fixed && (
            <>
              <label className="flex flex-col gap-2">
                <span className="label text-muted">{t.search}</span>
                <input
                  type="search"
                  lang="es-419"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  className="min-h-pill w-full rounded-md bg-surface px-4 text-body text-ink"
                  style={{ boxShadow: 'inset 0 0 0 2px var(--rule)' }}
                />
              </label>
              {matches.length > 0 && (
                <Chips
                  label={t.verbs}
                  options={matches.map((m) => m.inf)}
                  value={inf}
                  onChange={(x) => {
                    setInf(x);
                    setQuery('');
                  }}
                  lang="es-419"
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
