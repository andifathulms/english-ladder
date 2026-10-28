// Spanish content lint (CLAUDE.md §4): inventory, lexicon, conjugations, agreement, accents and
// opening marks, variety separation, bridges, check-item answers against lib/es, sizes. Build time
// only; called from the content model's check hook. Pure given its data.
import { TENSES, adjForms, agreeAdj, article, conjugate, foldAccents, plural, stressOf, syllabify, type FormInfo, type Gender, type Num, type Tense, type VerbData } from '@/lib/es';
import type { CheckItem, GlossaryEntry, Lesson, Rung } from './types';

export type Finding = { level: 'error' | 'warn'; message: string };

export type Grammar = { id: string; level: string; verbs?: string[]; forms?: string[]; detect?: string };
export type Bridges = {
  bridges: { es: string; pt: string; id: string; kind: 'same' | 'near' | 'off' }[];
  false_friends: { es: string; means: { id: string; en: string }; warn: { id: string; en: string } }[];
};
export type Lexicon = { rungs: Record<string, string[]>; spain_only: Record<string, string>; latam_only: Record<string, string> };

export type LintData = {
  verbs: VerbData[];
  grammar: Grammar[];
  bridges: Bridges;
  lexicon: Lexicon;
  names: string[];
  /** Word lists per rung (content/data/words/<rung>.yaml), when they exist. */
  wordLists: Record<string, GlossaryEntry[]>;
  formIndex: Map<string, FormInfo[]>;
};

/** A Spanish string to lint, and where it comes from. */
export type Text = { text: string; where: string; variety: 'latam' | 'es' };

// ---------- tokens ----------

const stripMarks = (s: string) => s.replace(/\[\[|\]\]|\*\*|\*/g, '');
const WORD_RE = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/gu;
type Tok = { raw: string; low: string; start: number; afterOpenQ: boolean };

function tokens(s: string): Tok[] {
  const plain = stripMarks(s).normalize('NFC');
  const out: Tok[] = [];
  for (const m of plain.matchAll(WORD_RE)) {
    const before = plain.slice(0, m.index).trimEnd();
    out.push({ raw: m[0], low: m[0].toLowerCase(), start: m.index!, afterOpenQ: /[¿¡]$/.test(before) });
  }
  return out;
}

// ---------- the scope a text is linted in ----------

type Surface = { kind: 'noun' | 'adj' | 'other'; lemma: string; gender?: 'm' | 'f' | 'mf'; number?: Num; el?: boolean; forms?: string[] };

type Scope = {
  ids: Set<string>;
  core: Set<string>;
  surfaces: Map<string, Surface[]>;
  verbs: Set<string>;
  chunkForms: Set<string>;
  allowedVerbs: Set<string>;
  names: Set<string>;
  extra: Set<string>;
  /** Spain words given as a glossary entry's es_es: known in Spain lines only. */
  spainWords: Set<string>;
  hasId: (id: string) => boolean;
};

function addSurface(map: Map<string, Surface[]>, form: string, s: Surface) {
  const key = form.toLowerCase();
  const list = map.get(key) ?? [];
  list.push(s);
  map.set(key, list);
}

/** Every surface form of a word list or glossary entry (nouns and their plural; adjectives' four forms). */
function surfacesOf(g: GlossaryEntry, map: Map<string, Surface[]>, verbs: Set<string>, spain?: Set<string>) {
  if (g.es_es && spain) for (const w of g.es_es.toLowerCase().split(/\s+/)) spain.add(w);
  const words = g.es.split(/\s+/);
  if (g.pos === 'verb') {
    verbs.add(g.es.toLowerCase());
    return;
  }
  if (words.length > 1) {
    // A phrase ("al lado de", "por favor"): its words are known as they are.
    for (const w of words) addSurface(map, w.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, ''), { kind: 'other', lemma: g.es });
    return;
  }
  if (g.pos === 'noun') {
    const gender = g.gender ?? 'm';
    addSurface(map, g.es, { kind: 'noun', lemma: g.es, gender, number: 'sg', el: g.el });
    addSurface(map, g.plural ?? plural(g.es), { kind: 'noun', lemma: g.es, gender, number: 'pl', el: g.el });
    return;
  }
  if (g.pos === 'adj') {
    const forms = g.forms && g.forms.length === 4 ? g.forms : adjForms(g.es);
    const keys: [Gender, Num][] = [
      ['m', 'sg'],
      ['f', 'sg'],
      ['m', 'pl'],
      ['f', 'pl'],
    ];
    forms.forEach((f, i) => addSurface(map, f, { kind: 'adj', lemma: g.es, gender: keys[i][0], number: keys[i][1], forms }));
    return;
  }
  addSurface(map, g.es, { kind: 'other', lemma: g.es });
  if (g.plural) addSurface(map, g.plural, { kind: 'other', lemma: g.es });
}

/** The vocabulary and grammar a text may use: earlier rungs, plus this rung up to `order`. */
function scopeFor(rungs: Rung[], lessonsByRung: Map<string, Lesson[]>, data: LintData, rungId: string, order: number, extra: string[] = []): Scope {
  const ri = rungs.findIndex((r) => r.id === rungId);
  const ids = new Set<string>();
  const core = new Set<string>();
  const surfaces = new Map<string, Surface[]>();
  const verbs = new Set<string>();
  const spainWords = new Set<string>();
  for (let i = 0; i <= ri; i++) {
    const r = rungs[i];
    for (const w of data.lexicon.rungs[r.id] ?? []) core.add(w.toLowerCase());
    for (const g of data.wordLists[r.id] ?? []) surfacesOf(g, surfaces, verbs, spainWords);
    const lessons = lessonsByRung.get(r.id) ?? [];
    // Earlier rungs, and (for a test, capstone or placement section) this rung, whole.
    if (i < ri || order === Infinity) for (const id of r.inventory) ids.add(id);
    for (const l of lessons) {
      if (i === ri && l.order > order) continue;
      for (const id of l.introduces) ids.add(id);
      for (const g of l.glossary) surfacesOf(g, surfaces, verbs, spainWords);
    }
  }
  const grammar = data.grammar.filter((g) => ids.has(g.id));
  const chunkForms = new Set(grammar.flatMap((g) => g.forms ?? []).flatMap((f) => f.toLowerCase().split(/\s+/)));
  const allowedVerbs = new Set(grammar.flatMap((g) => g.verbs ?? []));
  const names = new Set(data.names.flatMap((n) => n.split(/\s+/)));
  return { ids, core, surfaces, verbs, chunkForms, allowedVerbs, names, extra: new Set(extra.flatMap((e) => e.toLowerCase().split(/\s+/))), spainWords, hasId: (id) => ids.has(id) };
}

// ---------- inventory: which grammar point a verb reading needs ----------

const TENSE_ID: Partial<Record<Tense, string>> = {
  preterito: 'a2-indefinido',
  imperfecto: 'a2-imperfecto',
  futuro: 'a2-futuro',
  condicional: 'a2-condicional',
  subjuntivo: 'b1-subjunctive',
};

/** The grammar point a reading of a verb form needs, or null when nothing is needed. */
function neededFor(f: FormInfo, v: VerbData | undefined, scope: Scope, variety: 'latam' | 'es'): string | null {
  if (f.tense === 'infinitivo') return null;
  if (f.person === 'vosotros' && variety !== 'es') return 'hard2-vosotros';
  if (f.tense === 'gerundio') return 'a2-estar-gerund';
  if (f.tense === 'participio') return 'a2-perfecto';
  if (f.tense === 'imperativo') return f.person === 'tu' ? 'a1-imperative-tu' : f.person === 'vosotros' ? (variety === 'es' ? null : 'hard2-vosotros') : 'a2-imperative-usted';
  if (f.tense !== 'presente') return TENSE_ID[f.tense] ?? null;
  // Present tense.
  if (scope.allowedVerbs.has(f.inf)) return null;
  if (f.inf === 'gustar' || f.inf === 'encantar') return 'a1-gustar';
  if (!v) return null;
  const group = f.inf.replace(/se$/, '').slice(-2);
  const base = group === 'ar' ? 'a1-present-ar' : 'a1-present-er-ir';
  const boot = f.person === 'yo' || f.person === 'tu' || f.person === 'el' || f.person === 'ellos';
  const listedYo = !!v.irregular?.presente && (Array.isArray(v.irregular.presente) || (typeof v.irregular.presente === 'object' && 'yo' in v.irregular.presente));
  if (Array.isArray(v.irregular?.presente)) return 'a1-yo-irregular';
  if (f.person === 'yo' && (v.zc || listedYo)) return 'a1-yo-irregular';
  if (boot && (v.stem || v.stress)) return 'a1-stem-change';
  return base;
}

// ---------- one text ----------

const ARTICLES: Record<string, { g: Gender; n: Num; def: boolean }> = {
  el: { g: 'm', n: 'sg', def: true },
  la: { g: 'f', n: 'sg', def: true },
  los: { g: 'm', n: 'pl', def: true },
  las: { g: 'f', n: 'pl', def: true },
  un: { g: 'm', n: 'sg', def: false },
  una: { g: 'f', n: 'sg', def: false },
  unos: { g: 'm', n: 'pl', def: false },
  unas: { g: 'f', n: 'pl', def: false },
};
const QUESTION_WORDS: Record<string, string> = {
  que: 'qué',
  quien: 'quién',
  quienes: 'quiénes',
  donde: 'dónde',
  adonde: 'adónde',
  cuando: 'cuándo',
  como: 'cómo',
  cual: 'cuál',
  cuales: 'cuáles',
  cuanto: 'cuánto',
  cuanta: 'cuánta',
  cuantos: 'cuántos',
  cuantas: 'cuántas',
};

function lintText(t: Text, scope: Scope, data: LintData, draft: boolean, out: Finding[]) {
  const err = (m: string) => out.push({ level: 'error', message: `${t.where}: ${m}` });
  const unknown = (m: string) => out.push({ level: draft ? 'warn' : 'error', message: `${t.where}: ${m}` });
  const plain = stripMarks(t.text);

  // Opening marks (CLAUDE.md §4.3): every ? and ! has its ¿ and ¡ before it.
  const pairs: [string, string][] = [
    ['?', '¿'],
    ['!', '¡'],
  ];
  for (const [close, open] of pairs) {
    let depth = 0;
    for (const ch of plain) {
      if (ch === open) depth++;
      else if (ch === close) {
        if (depth === 0) {
          err(`"${close}" without "${open}" in "${plain}"`);
          break;
        }
        depth--;
      }
    }
  }

  const toks = tokens(t.text);
  const vByInf = new Map(data.verbs.map((v) => [v.inf, v]));
  const known = (tok: Tok) =>
    (t.variety === 'es' && scope.spainWords.has(tok.low)) ||
    scope.core.has(tok.low) || scope.surfaces.has(tok.low) || scope.extra.has(tok.low) || scope.chunkForms.has(tok.low) || (tok.raw[0] !== tok.low[0] && scope.names.has(tok.raw));

  toks.forEach((tok, i) => {
    const next = toks[i + 1];
    // Variety separation (CLAUDE.md §4.2).
    if (t.variety === 'latam' && data.lexicon.spain_only[tok.low]) err(`"${tok.raw}" is Spain Spanish; the Latin American line uses "${data.lexicon.spain_only[tok.low]}" (put Spain's in es_es)`);
    if (t.variety === 'es' && data.lexicon.latam_only[tok.low]) err(`"${tok.raw}" is Latin American; a Spain line uses "${data.lexicon.latam_only[tok.low]}"`);
    // Question words after ¿ / ¡ carry their accent.
    if (tok.afterOpenQ && QUESTION_WORDS[tok.low]) err(`"${tok.raw}" opens a question: write "${QUESTION_WORDS[tok.low]}"`);
    if (tok.low === 'por' && next && toks[i].afterOpenQ && next.low === 'que') err(`"¿Por que": write "¿Por qué"`);
    if (tok.low === 'mas') err(`"mas" (but) is literary: write "más" or "pero"`);

    // Verb readings of this word: every verb in verbs.yaml for the grammar, and the verbs the scope
    // knows for the vocabulary.
    const allReadings = data.formIndex.get(tok.low) ?? [];
    const readings = allReadings.filter((f) => scope.verbs.has(f.inf) || scope.allowedVerbs.has(f.inf) || f.inf === 'gustar');
    const nonVerb = scope.core.has(tok.low) || scope.surfaces.has(tok.low) || scope.chunkForms.has(tok.low);

    // Diacritic pairs: tú and él as subjects, before a verb.
    if ((tok.low === 'tu' || tok.low === 'el') && next && !scope.surfaces.get(next.low)?.some((s) => s.kind !== 'other') && (data.formIndex.get(next.low) ?? []).some((f) => f.tense !== 'infinitivo' && (tok.low === 'tu' ? f.person === 'tu' : f.person === 'el'))) {
      err(`"${tok.raw} ${next.raw}": the pronoun is written "${tok.low === 'tu' ? 'tú' : 'él'}"`);
    }

    // vosotros forms are Spain's: shown in es_es lines, produced only from Hard 2 (CLAUDE.md §4.1).
    if (t.variety === 'latam' && allReadings.length && allReadings.every((f) => f.person === 'vosotros') && !scope.hasId('hard2-vosotros')) {
      err(`"${tok.raw}" is a vosotros form: Latin American lines use ustedes (put Spain's in es_es)`);
      return;
    }

    if (allReadings.length && !nonVerb) {
      const needs = allReadings.map((f) => neededFor(f, vByInf.get(f.inf), scope, t.variety));
      if (!needs.some((n) => n === null || scope.hasId(n))) {
        const n = needs.find((x) => x !== null)!;
        const f = allReadings[needs.indexOf(n)];
        err(`"${tok.raw}" (${f.inf}, ${f.tense}${f.person ? ` ${f.person}` : ''}) needs ${n}, which isn't taught yet`);
        return;
      }
      // Reflexive pronoun + reflexive verb: a1-reflexive (llamarse is taught as a chunk).
      const prev = toks[i - 1];
      if (prev && ['me', 'te', 'se', 'nos', 'os'].includes(prev.low) && readings.some((f) => f.inf.endsWith('se') && !scope.allowedVerbs.has(f.inf)) && !scope.hasId('a1-reflexive')) {
        err(`"${prev.raw} ${tok.raw}" is a reflexive verb, which needs a1-reflexive`);
      }
      if (readings.length) return;
      unknown(`"${tok.raw}" is a form of "${allReadings[0].inf}", which is not in a glossary or word list yet`);
      return;
    }
    if (known(tok)) return;
    // A known word with different accents: a spelling error, whatever the status.
    const folded = foldAccents(tok.low);
    const near = [...scope.core, ...scope.surfaces.keys(), ...[...data.formIndex.keys()].filter((k) => readingsOk(k))].find((w) => w !== tok.low && foldAccents(w) === folded);
    if (near) {
      err(`"${tok.raw}": the accents are wrong, write "${near}"`);
      return;
    }
    if (scope.names.has(tok.raw)) return;
    unknown(`unknown word "${tok.raw}" (not on the rung's list, a glossary, names or extra)`);
  });

  function readingsOk(form: string) {
    return (data.formIndex.get(form) ?? []).some((f) => scope.verbs.has(f.inf) || scope.allowedVerbs.has(f.inf));
  }

  // se lo / se la …: a2-double-pronouns.
  if (/\bse (lo|la|los|las)\b/i.test(plain) && !scope.hasId('a2-double-pronouns')) err(`"se lo" clusters need a2-double-pronouns`);

  // Agreement in simple noun phrases (CLAUDE.md §4.5): article + noun (+ adjective).
  toks.forEach((tok, i) => {
    const art = tok.low === 'del' || tok.low === 'al' ? ARTICLES.el : ARTICLES[tok.low];
    const nouns = (toks[i + 1] && scope.surfaces.get(toks[i + 1].low)?.filter((s) => s.kind === 'noun' && s.gender)) ?? [];
    if (!art || !nouns.length) return;
    // A noun can read as singular and plural (el lunes, los lunes): any reading that agrees will do.
    const want = nouns.flatMap((n) => (n.gender === 'mf' ? (['m', 'f'] as Gender[]) : [n.gender as Gender]).map((g) => article(g, n.number!, art.def, { el: n.el })));
    const given = tok.low === 'del' || tok.low === 'al' ? 'el' : tok.low;
    if (!want.includes(given)) err(`"${tok.raw} ${toks[i + 1].raw}": the article is "${want[0]}"`);
    const noun = nouns.find((n) => (n.gender === 'mf' ? (['m', 'f'] as Gender[]) : [n.gender as Gender]).some((g) => article(g, n.number!, art.def, { el: n.el }) === given)) ?? nouns[0];
    const adjTok = toks[i + 2];
    const adj = adjTok && scope.surfaces.get(adjTok.low)?.find((s) => s.kind === 'adj');
    if (!adj || noun.gender === 'mf') return;
    const form = agreeAdj(adj.lemma, noun.gender as Gender, noun.number!, adj.forms);
    if (form !== adjTok.low) err(`"${toks[i + 1].raw} ${adjTok.raw}": the adjective agrees as "${form}"`);
  });
}

// ---------- check items ----------

/** The correct Spanish an item shows or expects (distractors are wrong on purpose and skipped). */
export function itemTexts(item: CheckItem): { text: string; variety: 'latam' | 'es' }[] {
  const latam = (text: string) => ({ text, variety: 'latam' as const });
  if (item.lang === 'id') return [];
  switch (item.type) {
    case 'choice':
    case 'scene':
      return [...(item.prompt ? [latam(item.prompt)] : []), latam(item.answer)];
    case 'gap':
      return [latam(item.prompt.replace('___', item.answer))];
    case 'listen':
      return [{ text: item.audio, variety: item.variety === 'es' ? 'es' : 'latam' }, { text: item.answer, variety: item.variety === 'es' ? 'es' : 'latam' }];
    case 'fix':
      return [latam(item.answer)];
    case 'order':
      return [latam(item.answer.join(' '))];
    case 'form':
      return [latam(item.frame ? item.frame.replace('___', item.answer) : item.answer)];
    case 'conjugate':
      return Object.values(item.answers).map((a) => latam(a));
    case 'agree':
      return [latam(`${item.answers.article} ${item.noun.es} ${item.answers.adjective}`)];
    case 'dictation':
      return [latam(item.answer)];
    case 'stress':
      return [latam(item.word)];
  }
}

const isTense = (t: string): t is Tense => (TENSES as readonly string[]).includes(t);

/** Typed and grid items against lib/es: forms, persons, agreement, stress. */
function lintItem(item: CheckItem, where: string, data: LintData, scope: Scope, out: Finding[]) {
  const err = (m: string) => out.push({ level: 'error', message: `${where}: ${item.id}: ${m}` });
  const verb = (inf: string) => data.verbs.find((v) => v.inf === inf);
  if (item.type === 'form') {
    if ('tense' in item.target) {
      const v = verb(item.base);
      if (!v) return err(`"${item.base}" is not in verbs.yaml`);
      const want = conjugate(v, item.target.tense, item.target.person);
      if (item.answer !== want) err(`answer "${item.answer}" ≠ lib/es "${want}" (${item.base}, ${item.target.tense}, ${item.target.person})`);
      if (item.target.person === 'vosotros' && !scope.hasId('hard2-vosotros')) err('learners never produce vosotros before Hard 2');
    } else {
      const adj = /\(([^)]+)\)/.exec(item.base)?.[1];
      if (!adj) return err('an agreement form item names its adjective in parentheses: "la casa (blanco)"');
      const forms = scope.surfaces.get(adj.toLowerCase())?.find((s) => s.kind === 'adj')?.forms;
      const want = agreeAdj(adj, item.target.gender, item.target.number, forms);
      if (item.answer !== want) err(`answer "${item.answer}" ≠ lib/es "${want}" (${adj}, ${item.target.gender} ${item.target.number})`);
    }
  }
  if (item.type === 'conjugate') {
    const v = verb(item.verb);
    if (!v) return err(`"${item.verb}" is not in verbs.yaml`);
    if (!isTense(item.tense)) return;
    for (const p of item.persons) {
      const want = conjugate(v, item.tense, p);
      if (item.answers[p] !== want) err(`${p}: "${item.answers[p]}" ≠ lib/es "${want}"`);
      if (p === 'vosotros' && !scope.hasId('hard2-vosotros')) err('learners never produce vosotros before Hard 2');
    }
  }
  if (item.type === 'agree') {
    const nounEntry = scope.surfaces.get(item.noun.es.toLowerCase())?.find((s) => s.kind === 'noun');
    const art = article(item.noun.gender, item.noun.number, item.definite, { el: nounEntry?.el });
    if (item.answers.article !== art) err(`article "${item.answers.article}" ≠ lib/es "${art}"`);
    const forms = scope.surfaces.get(item.adj.toLowerCase())?.find((s) => s.kind === 'adj')?.forms;
    const adj = agreeAdj(item.adj, item.noun.gender, item.noun.number, forms);
    if (item.answers.adjective !== adj) err(`adjective "${item.answers.adjective}" ≠ lib/es "${adj}"`);
    if (nounEntry && nounEntry.gender !== 'mf' && nounEntry.gender !== item.noun.gender) err(`noun gender ${item.noun.gender} ≠ the glossary's ${nounEntry.gender}`);
  }
  if (item.type === 'stress') {
    const syl = syllabify(item.word).map((s) => foldAccents(s.toLowerCase()));
    if (syl.join('-') !== item.syllables.map((s) => foldAccents(s.toLowerCase())).join('-')) err(`syllables ${item.syllables.join('-')} ≠ lib/es ${syl.join('-')}`);
    if (stressOf(item.word) !== item.stressed) err(`stressed ${item.stressed} ≠ lib/es ${stressOf(item.word)}`);
    if (/[áéíóú]/.test(item.word) !== item.needsAccent) err(`needsAccent ${item.needsAccent} but "${item.word}" is ${/[áéíóú]/.test(item.word) ? '' : 'not '}written with one`);
  }
}

// ---------- lessons and other texts ----------

/** The Spanish strings of a lesson, each with its variety (pair.off is wrong on purpose and skipped). */
function lessonTexts(l: Lesson): Text[] {
  const at = (where: string, text: string, variety: 'latam' | 'es' = 'latam'): Text => ({ text, where: `${l.id} ${where}`, variety });
  return [
    ...l.examples.flatMap((e, i) => [at(`examples[${i}]`, e.es), ...(e.es_es ? [at(`examples[${i}].es_es`, e.es_es, 'es')] : [])]),
    ...(l.worked ?? []).flatMap((e, i) => [at(`worked[${i}]`, e.es), ...(e.es_es ? [at(`worked[${i}].es_es`, e.es_es, 'es')] : [])]),
    at('pair.natural', l.pair.natural),
    ...(l.talk?.lines ?? []).map((t, i) => at(`talk[${i}]`, t.es)),
    at('tirukan', l.tirukan.es),
    ...(l.spain?.rows ?? []).flatMap((r, i) => [at(`spain[${i}].latam`, r.latam), at(`spain[${i}].es`, r.es, 'es')]),
    ...l.check.flatMap((c) => itemTexts(c).map((x) => at(c.id, x.text, x.variety))),
  ];
}

export function lintLessons(rungs: Rung[], lessonsByRung: Map<string, Lesson[]>, data: LintData): Finding[] {
  const out: Finding[] = [];
  const grammarIds = new Set(data.grammar.map((g) => g.id));
  const bridgeWords = new Set([...data.bridges.bridges.map((b) => b.es), ...data.bridges.false_friends.map((f) => f.es)]);
  const verbInfs = new Set(data.verbs.map((v) => v.inf));
  for (const r of rungs) {
    for (const id of r.inventory) if (!grammarIds.has(id)) out.push({ level: 'error', message: `curriculum ${r.id}: inventory "${id}" is not in grammar.yaml` });
    for (const l of lessonsByRung.get(r.id) ?? []) {
      const draft = l.status === 'draft';
      const scope = scopeFor(rungs, lessonsByRung, data, r.id, l.order, (l.extra ?? []).map((e) => e.es));
      for (const id of l.introduces) {
        if (!grammarIds.has(id)) out.push({ level: 'error', message: `${l.id}: introduces "${id}", which is not in grammar.yaml` });
        else if (!r.inventory.includes(id)) out.push({ level: 'error', message: `${l.id}: introduces "${id}", which is not in ${r.id}'s inventory` });
      }
      for (const t of lessonTexts(l)) lintText(t, scope, data, draft, out);
      for (const item of l.check) lintItem(item, l.id, data, scope, out);
      for (const g of l.glossary) {
        if (g.pos === 'verb' && !verbInfs.has(g.es)) out.push({ level: 'error', message: `${l.id}: glossary verb "${g.es}" is not in verbs.yaml` });
        if (g.bridge) {
          const b = data.bridges.bridges.find((x) => x.es === g.es);
          if (!b || b.pt !== g.bridge.pt || b.id !== g.bridge.id) out.push({ level: 'error', message: `${l.id}: glossary bridge for "${g.es}" is not the one in bridges.yaml` });
        }
        if (g.pos === 'noun' && g.plural && g.plural !== plural(g.es)) out.push({ level: 'warn', message: `${l.id}: "${g.es}" plural "${g.plural}" differs from the rule ("${plural(g.es)}"); fine if irregular` });
      }
      for (const w of l.words?.bridges ?? []) if (!bridgeWords.has(w)) out.push({ level: 'error', message: `${l.id}: Kata card word "${w}" is not in bridges.yaml` });
      // Sizes (CLAUDE.md §4.10): 6–12 glossary words (Dasar lessons teach fewer).
      if (r.tier !== 'dasar' && l.glossary.length < 6) out.push({ level: 'warn', message: `${l.id}: ${l.glossary.length} glossary words; aim for 6–12` });
      // es_es only where Spain really differs.
      for (const e of l.examples) if (e.es_es && stripMarks(e.es_es) === stripMarks(e.es)) out.push({ level: 'error', message: `${l.id}: an es_es line identical to its es line; leave es_es out` });
    }
  }
  return out;
}

/** Test pools, readings, dialogues and placement: the whole rung's inventory (or a rung's, for placement). */
export function lintPool(rungs: Rung[], lessonsByRung: Map<string, Lesson[]>, data: LintData, rungId: string, where: string, texts: { text: string; variety: 'latam' | 'es' }[], items: CheckItem[]): Finding[] {
  const out: Finding[] = [];
  const scope = scopeFor(rungs, lessonsByRung, data, rungId, Infinity);
  for (const t of texts) lintText({ ...t, where }, scope, data, true, out);
  for (const item of items) {
    for (const x of itemTexts(item)) lintText({ ...x, where: `${where} ${item.id}` }, scope, data, true, out);
    lintItem(item, where, data, scope, out);
  }
  return out;
}

