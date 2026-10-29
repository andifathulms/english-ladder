'use client';

import { useState } from 'react';
import { useVisualData } from '@ladder/core/components/visuals/VisualData';
import type { VisualProps } from '@ladder/core/components/visuals/types';
import { Toggle } from '@ladder/core/components/ui/Toggle';
import { article, KASES, type Gender, type Kase } from '@/lib/de/articles';
import { conjugate } from '@/lib/de/conjugate';
import { GenderChip } from '@/components/GenderChip';
import { CASE_LABEL, CaseWord } from '@/components/de/CaseWord';
import { CASE_MACHINE_NOUNS, nounOf, verbOf, type DeVisualData } from './data';

type Role = Exclude<Kase, 'gen'>;
/** Sentence frames per verb: which roles it takes, in German order, and its Indonesian verb. */
const FRAMES = {
  haben: { roles: ['nom', 'akk'] as Role[], id: 'punya' },
  sehen: { roles: ['nom', 'akk'] as Role[], id: 'melihat' },
  geben: { roles: ['nom', 'dat', 'akk'] as Role[], id: 'memberi' },
  zeigen: { roles: ['nom', 'dat', 'akk'] as Role[], id: 'menunjukkan' },
};
type FrameId = keyof typeof FRAMES;
const QUESTION: Record<Role, string> = { nom: 'WER?', akk: 'WEN? / WAS?', dat: 'WEM?' };
const DEFAULT_NOUNS = CASE_MACHINE_NOUNS;

const COPY = {
  id: { article: 'Artikel tak tentu (ein)', grid: 'Tabel artikel', role: { nom: 'subjek', akk: 'objek langsung', dat: 'penerima' }, noun: 'Kata benda', sentence: 'Kalimat', on: 'tampil', off: 'sembunyi' },
  en: { article: 'Indefinite article (ein)', grid: 'Article table', role: { nom: 'subject', akk: 'direct object', dat: 'recipient' }, noun: 'Noun', sentence: 'Sentence', on: 'shown', off: 'hidden' },
};

export type CaseState = { verb: FrameId; nouns: Partial<Record<Role, string>>; indef: boolean };
type Props = VisualProps<CaseState> & { verb?: FrameId; indef?: boolean; nouns?: Partial<Record<Role, string[]>> };

/**
 * CaseMachine (DESIGN §7.3): a row of role slots (WER? · WEN? · WEM?), each with a noun and its gender
 * chip and the article in that role's case; only the changed letters take the case colour, always with
 * the case label. The sentence builds above, the Indonesian line (no endings at all) below. Articles come
 * from lib/de; genders from nouns.yaml. The genitive slot (WESSEN?) joins at Medium 2.
 */
export function CaseMachine({ state, interactive = true, onStateChange, verb = 'geben', indef: indefInit = false, nouns = DEFAULT_NOUNS, lang }: Props) {
  const c = COPY[lang];
  const data = useVisualData<DeVisualData>();
  const [own, setOwn] = useState<CaseState>(() => ({ verb, indef: indefInit, nouns: { nom: (nouns.nom ?? DEFAULT_NOUNS.nom)[0], dat: (nouns.dat ?? DEFAULT_NOUNS.dat)[0], akk: (nouns.akk ?? DEFAULT_NOUNS.akk)[0] } }));
  const s = state ?? own;
  const update = (patch: Partial<CaseState>) => {
    const next = { ...s, ...patch, nouns: { ...s.nouns, ...(patch.nouns ?? {}) } };
    setOwn(next);
    onStateChange?.(next);
  };
  const [grid, setGrid] = useState(false);
  const frame = FRAMES[s.verb];
  const v = verbOf(data, s.verb);
  const slot = (role: Role) => {
    const noun = nounOf(data, s.nouns[role] ?? '');
    if (!noun) return null;
    // The subject keeps the definite article; objects follow the toggle.
    const type = role !== 'nom' && s.indef ? 'indef' : 'def';
    return { role, noun, art: article(type, noun.gender, 'sg', role) ?? '' };
  };
  const slots = frame.roles.map(slot).filter((x): x is NonNullable<ReturnType<typeof slot>> => !!x);
  const finite = v ? conjugate(v, 'praesens', 'er') : s.verb;
  const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);
  const plainDe = `${slots.map((x, i) => (i === 0 ? `${cap(x.art)} ${x.noun.de} ${finite}` : `${x.art} ${x.noun.de}`)).join(' ')}.`;
  // The Indonesian line (DESIGN §7.3): the same sentence with no endings; roles live in word order.
  const word = (x: (typeof slots)[number] | undefined) => (x ? x.noun.id.split(/[;,(]/)[0].trim() : '');
  const order: Role[] = ['nom', 'dat', 'akk'];
  const byRole = Object.fromEntries(slots.map((x) => [x.role, x])) as Record<Role, (typeof slots)[number]>;
  const meaning = `${cap(word(byRole.nom))} itu ${frame.id} ${byRole.dat ? `${word(byRole.dat)} ` : ''}${word(byRole.akk)}.`;
  const alt = `${plainDe} ${slots.map((x) => `${x.art} ${x.noun.de}: ${CASE_LABEL[x.role]}, ${c.role[x.role]}`).join('; ')}.`;

  return (
    <div className="flex flex-col gap-4" data-visual="case-machine">
      {/* The sentence: changed letters coloured, the case labels in the slots below. */}
      <p lang="de" className="font-display text-sentence font-medium" aria-hidden data-sentence>
        {slots.map((x, i) => (
          <span key={x.role}>
            {i > 0 && ' '}
            <CaseWord form={i === 0 ? cap(x.art) : x.art} kase={x.role} /> {x.noun.de}
            {i === 0 && ` ${finite}`}
          </span>
        ))}
        .
      </p>
      <ol className="grid gap-2" style={{ gridTemplateColumns: `repeat(${slots.length}, minmax(0, 1fr))` }}>
        {order
          .filter((r) => frame.roles.includes(r))
          .map((role) => {
            const x = byRole[role];
            const list = nouns[role] ?? DEFAULT_NOUNS[role];
            return (
              <li key={role} className="flex flex-col gap-2 rounded-md bg-paper-2 p-2" data-role={role}>
                <span className="label text-muted">{QUESTION[role]}</span>
                <span className="flex flex-wrap items-center gap-1">
                  {x && <GenderChip gender={x.noun.gender} />}
                  <span className={`label case-${role} rounded-sm px-1`} style={{ boxShadow: 'inset 0 0 0 1px currentColor' }}>
                    {CASE_LABEL[role]}
                  </span>
                </span>
                {x && (
                  <span lang="de" className="font-display text-[1.125rem]">
                    <CaseWord form={x.art} kase={role} /> {x.noun.de}
                  </span>
                )}
                {interactive && (
                  <select
                    aria-label={`${QUESTION[role]} ${c.noun} (${c.role[role]})`}
                    value={s.nouns[role]}
                    onChange={(e) => update({ nouns: { [role]: e.target.value } })}
                    className="min-h-touch w-full rounded-sm bg-surface px-2 text-small"
                    lang="de"
                  >
                    {list.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                )}
              </li>
            );
          })}
      </ol>
      <p lang="id" className="id-text" data-meaning>
        {meaning}
      </p>
      <p className="sr-only" aria-live="polite">
        {alt}
      </p>
      {interactive && (
        <div className="flex flex-col gap-3 rounded-md bg-surface p-3">
          <Toggle label={c.article} checked={s.indef} onChange={(on) => update({ indef: on })} onLabel="ein" offLabel="der" />
          <Toggle label={c.grid} checked={grid} onChange={setGrid} onLabel={c.on} offLabel={c.off} />
        </div>
      )}
      {grid && <ArticleGrid indef={s.indef} highlight={slots.map((x) => [x.noun.gender, x.role] as [Gender, Kase])} />}
    </div>
  );
}

/** The reference grid (gender × case) with the current cells highlighted (DESIGN §7.3). */
function ArticleGrid({ indef, highlight }: { indef: boolean; highlight: [Gender, Kase][] }) {
  const genders: Gender[] = ['m', 'f', 'n'];
  const on = (g: Gender, k: Kase) => highlight.some(([hg, hk]) => hg === g && hk === k);
  return (
    <table className="w-full border-collapse text-small" data-grid>
      <thead>
        <tr>
          <th />
          {genders.map((g) => (
            <th key={g} scope="col" className="p-1">
              <GenderChip gender={g} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {KASES.filter((k) => k !== 'gen').map((k) => (
          <tr key={k}>
            <th scope="row" className={`label case-${k} p-1 text-start`}>
              {CASE_LABEL[k]}
            </th>
            {genders.map((g) => {
              const form = article(k === 'nom' || !indef ? 'def' : 'indef', g, 'sg', k) ?? '—';
              return (
                <td key={g} lang="de" className="p-1 text-center" style={{ background: on(g, k) ? 'var(--accent-soft)' : undefined, fontWeight: on(g, k) ? 700 : 400 }}>
                  <CaseWord form={form} kase={k} />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
