// Every form of every listed verb, for the content lint (CLAUDE.md §4.1, §4.4): which verb, tense
// and person a word can be. Reflexive forms are indexed without their pronoun. Pure.
import { PERSONS, TENSES, conjugate, gerundio, participio, splitReflexive, type Person, type Tense, type VerbData } from './conjugate';

export type FormInfo = { inf: string; tense: Tense | 'infinitivo' | 'gerundio' | 'participio'; person?: Person };

export function buildFormIndex(verbs: VerbData[]): Map<string, FormInfo[]> {
  const index = new Map<string, FormInfo[]>();
  const add = (form: string, info: FormInfo) => {
    if (!form) return;
    const key = form.replace(/^(me|te|se|nos|os) /, '').toLowerCase();
    const list = index.get(key) ?? [];
    if (!list.some((x) => x.inf === info.inf && x.tense === info.tense && x.person === info.person)) list.push(info);
    index.set(key, list);
  };
  for (const v of verbs) {
    const { base } = splitReflexive(v.inf);
    add(base, { inf: v.inf, tense: 'infinitivo' });
    add(gerundio(v), { inf: v.inf, tense: 'gerundio' });
    add(participio(v), { inf: v.inf, tense: 'participio' });
    for (const tense of TENSES) for (const person of PERSONS) add(conjugate(v, tense, person), { inf: v.inf, tense, person });
  }
  return index;
}
