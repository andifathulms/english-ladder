'use client';

// Case letters (DESIGN §3.2, §4): only the letters of an article or ending that differ from the
// nominative take the case colour, and a case always comes with its text label.
import { article, determinerReadings, type Kase } from '@/lib/de/articles';

let readings: ReturnType<typeof determinerReadings> | null = null;
const readingsOf = (form: string) => (readings ??= determinerReadings()).get(form.toLowerCase()) ?? [];

export const CASE_LABEL: Record<Kase, string> = { nom: 'Nom', akk: 'Akk', dat: 'Dat', gen: 'Gen' };

/** The letters of a determiner that differ from its nominative (d**en**, ein**em**): only those take the case colour. */
export function changedLetters(form: string, kase: Kase): { stem: string; changed: string } {
  if (kase === 'nom') return { stem: form, changed: '' };
  const rs = readingsOf(form);
  const r = rs.find((x) => x.kase === kase) ?? rs[0];
  const nom = r ? (article(r.type, r.gender ?? 'm', r.number, 'nom') ?? '') : '';
  let i = 0;
  while (i < form.length && i < nom.length && form[i].toLowerCase() === nom[i].toLowerCase()) i++;
  return { stem: form.slice(0, i), changed: form.slice(i) };
}

/** A determiner with its changed letters coloured and its case labelled (never colour alone). */
export function CaseWord({ form, kase }: { form: string; kase: Kase }) {
  const { stem, changed } = changedLetters(form, kase);
  return (
    <span lang="de" className="whitespace-nowrap">
      {stem}
      {changed && <span className={`case-${kase}`}>{changed}</span>}
    </span>
  );
}

