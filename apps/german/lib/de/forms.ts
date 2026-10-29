// Every finite form of every listed verb, for the content lint (CLAUDE.md §4): which verb, tense and
// person a word can be. Separable verbs are indexed by their finite part, with the prefix to expect at
// the end. Pure.
import { PERSONS, TENSES, conjugateParts, separate, type Person, type Tense, type VerbData } from './conjugate';

export type FormInfo = { inf: string; tense: Tense | 'infinitiv' | 'partizip'; person?: Person; prefix?: string | null };

export function buildFormIndex(verbs: VerbData[]): Map<string, FormInfo[]> {
  const index = new Map<string, FormInfo[]>();
  const add = (form: string, info: FormInfo) => {
    if (!form) return;
    const key = form.toLowerCase();
    const list = index.get(key) ?? [];
    if (!list.some((x) => x.inf === info.inf && x.tense === info.tense && x.person === info.person)) list.push(info);
    index.set(key, list);
  };
  for (const v of verbs) {
    const { prefix, base } = separate(v);
    add(v.inf, { inf: v.inf, tense: 'infinitiv' });
    if (prefix) add(base, { inf: v.inf, tense: 'infinitiv', prefix });
    add(v.partizip, { inf: v.inf, tense: 'partizip' });
    for (const tense of TENSES) {
      if (tense === 'perfekt') continue;
      for (const person of PERSONS) {
        const parts = conjugateParts(v, tense, person);
        if (!parts) continue;
        // Imperative "kommen Sie": index the verb word only.
        const finite = parts.finite.replace(/ Sie$/, '');
        add(finite, { inf: v.inf, tense, person, prefix: tense === 'konj2' && !v.irregular?.konj2 ? null : prefix });
      }
    }
  }
  return index;
}
