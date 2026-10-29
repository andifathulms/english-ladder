// The build-time data German visuals read (ContentModel.visualData → useVisualData). Type-only: safe
// for client code. Forms are always computed by lib/de from these; no visual hard-codes them.
import type { VerbData } from '@/lib/de/conjugate';
import type { Gender } from '@/lib/de/articles';

export type VisualNoun = { de: string; gender: Gender; plural: string | null; id: string; person?: boolean; exception?: string; parts?: string[]; links?: (string | null)[] };
export type DeVisualData = { nouns: VisualNoun[]; verbs: VerbData[] };

export const nounOf = (data: DeVisualData | undefined, de: string) => data?.nouns.find((n) => n.de === de);
export const verbOf = (data: DeVisualData | undefined, inf: string) => data?.verbs.find((v) => v.inf === inf);

// Each visual's defaults (used when a lesson gives no props), shared with the build so a page only
// carries the nouns and verbs its visuals use.
export const GENDER_TILES_NOUNS = ['Zeitung', 'Mädchen', 'Lehrer', 'Freiheit', 'Wohnung', 'Brötchen', 'Tisch', 'Hand', 'Dokument', 'Kuchen'];
export const CASE_MACHINE_NOUNS: Record<'nom' | 'akk' | 'dat', string[]> = {
  nom: ['Mann', 'Frau', 'Kind', 'Lehrer', 'Ärztin'],
  dat: ['Kind', 'Frau', 'Mann', 'Patient', 'Kollegin'],
  akk: ['Ball', 'Tasche', 'Buch', 'Apfel', 'Brief'],
};
export const CASE_MACHINE_VERBS = ['haben', 'sehen', 'geben', 'zeigen'];
export const COMPOUNDS = ['Krankenhaus', 'Handtuch', 'Arbeitsplatz', 'Wochenende', 'Kühlschrank'];
export const BRACKET_DEFAULTS = { verb: 'aufstehen', modal: 'können' };
export const PLANNER_VERBS = ['aufstehen', 'frühstücken', 'arbeiten', 'einkaufen', 'anrufen', 'lernen', 'fernsehen'];

type Spec = { id: string; props?: Record<string, unknown> };
const list = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : []);

/** The nouns and verbs a set of visuals needs: what their props name, or their defaults. */
export function neededWords(specs: Spec[]): { nouns: Set<string>; verbs: Set<string> } {
  const nouns = new Set<string>();
  const verbs = new Set<string>();
  for (const { id, props = {} } of specs) {
    if (id === 'gender-tiles') for (const n of props.nouns ? list(props.nouns) : GENDER_TILES_NOUNS) nouns.add(n);
    if (id === 'case-machine') {
      const given = (props.nouns ?? {}) as Partial<Record<'nom' | 'akk' | 'dat', string[]>>;
      for (const role of ['nom', 'akk', 'dat'] as const) for (const n of given[role] ?? CASE_MACHINE_NOUNS[role]) nouns.add(n);
      for (const v of CASE_MACHINE_VERBS) verbs.add(v);
    }
    if (id === 'compound-builder') for (const n of props.compounds ? list(props.compounds) : COMPOUNDS) nouns.add(n);
    if (id === 'verb-bracket') {
      verbs.add((props.verb as string) ?? BRACKET_DEFAULTS.verb);
      const modal = props.modal === undefined ? BRACKET_DEFAULTS.modal : (props.modal as string | null);
      if (modal) verbs.add(modal);
    }
    if (id === 'day-planner') for (const v of PLANNER_VERBS) verbs.add(v);
  }
  return { nouns, verbs };
}
