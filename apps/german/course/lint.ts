// German content lint (CLAUDE.md §4): inventory detectors, lexicon, agreement and case, verb position
// and separable prefixes, conjugation, spelling (noun capitals, ß, quotation marks), register, data
// consistency, check-item answers against lib/de, bracket focus, sizes. Build time only; called from
// the content model's check hooks. Pure given its data.
import {
  article,
  conjugate,
  validOrder,
  type FormInfo,
  type Gender,
  type Kase,
  type Num,
  type Reading,
  type StressEntry,
  type VerbData,
  type Zone,
} from '@/lib/de';
import { clauseOf } from './items';
import type { DeBridge, DeFalseFriend } from './lessonData';
import type { CheckItem, GlossaryEntry, Lesson, Rung } from './types';

export type Finding = { level: 'error' | 'warn'; message: string };

export type Grammar = { id: string; level: string; verbs?: string[]; chunks?: string[]; detect?: string };
export type Noun = { de: string; gender: Gender; plural: string | null; id: string; person?: boolean; exception?: string; parts?: string[]; links?: (string | null)[] };
export type Bridges = { bridges: DeBridge[]; false_friends: DeFalseFriend[] };
export type Lexicon = { rungs: Record<string, string[]> };

export type LintData = {
  verbs: VerbData[];
  nouns: Noun[];
  grammar: Grammar[];
  bridges: Bridges;
  lexicon: Lexicon;
  names: string[];
  /** Word lists per rung (content/data/words/<rung>.yaml), when they exist. */
  wordLists: Record<string, GlossaryEntry[]>;
  formIndex: Map<string, FormInfo[]>;
  /** Determiner forms and their readings (lib/de/articles determinerReadings). */
  determiners: Map<string, Reading[]>;
  /** Authored word stress (data/stress.yaml). */
  stress: StressEntry[];
};

/** A German string to lint, and where it comes from. `work`: a Kerja card line (Sie register). */
export type Text = { text: string; where: string; work?: boolean };

// ---------- tokens ----------

const stripMarks = (s: string) => s.replace(/\[\[|\]\]|\*\*|\*/g, '');
// Hyphenated words (E-Mail) and contractions (geht’s, wie geht's) are one token.
const WORD_RE = /[A-Za-zÄÖÜäöüßẞ]+(?:-[A-Za-zÄÖÜäöüß]+)*(?:['’][a-z]+)?/gu;
type Tok = { raw: string; low: string; start: number; sentenceStart: boolean };

function tokens(s: string): Tok[] {
  const plain = stripMarks(s).normalize('NFC');
  const out: Tok[] = [];
  for (const m of plain.matchAll(WORD_RE)) {
    const before = plain.slice(0, m.index).trimEnd();
    out.push({ raw: m[0], low: m[0].toLowerCase(), start: m.index!, sentenceStart: before === '' || /[.!?:„«»"–]$/.test(before) });
  }
  return out;
}

/** Clauses: split at sentence punctuation and commas; each keeps its closing mark. */
function clauses(s: string): { text: string; end: string; afterComma: boolean }[] {
  const plain = stripMarks(s).normalize('NFC');
  const out: { text: string; end: string; afterComma: boolean }[] = [];
  let afterComma = false;
  for (const m of plain.matchAll(/([^.!?;,]+)([.!?;,]?)/g)) {
    if (m[1].trim()) out.push({ text: m[1], end: m[2], afterComma });
    afterComma = m[2] === ',';
  }
  return out;
}

// ---------- the scope a text is linted in ----------

type Surface = { kind: 'noun' | 'adj' | 'other'; lemma: string; gender?: Gender; number?: Num };

type Scope = {
  ids: Set<string>;
  core: Set<string>;
  surfaces: Map<string, Surface[]>;
  verbs: Set<string>;
  chunks: string[][];
  allowedVerbs: Set<string>;
  names: Set<string>;
  extra: Set<string>;
  detects: Set<string>;
  hasId: (id: string) => boolean;
};

function addSurface(map: Map<string, Surface[]>, form: string, s: Surface) {
  const key = form.toLowerCase();
  const list = map.get(key) ?? [];
  list.push(s);
  map.set(key, list);
}

const WORD_CHARS = /[^A-Za-zÄÖÜäöüß-]/g;

/** Every surface form of a word list or glossary entry (nouns with their plural). */
function surfacesOf(g: GlossaryEntry, map: Map<string, Surface[]>, verbs: Set<string>) {
  if (g.pos === 'verb') {
    verbs.add(g.de.toLowerCase());
    return;
  }
  const words = g.de.split(/\s+/);
  if (words.length > 1) {
    // A phrase ("Guten Tag", "zu Hause"): its words are known as they are.
    for (const w of words) addSurface(map, w.replace(WORD_CHARS, ''), { kind: 'other', lemma: g.de });
    return;
  }
  if (g.pos === 'noun') {
    addSurface(map, g.de, { kind: 'noun', lemma: g.de, gender: g.gender, number: 'sg' });
    if (g.plural && g.plural !== '—') addSurface(map, g.plural, { kind: 'noun', lemma: g.de, gender: g.gender, number: 'pl' });
    return;
  }
  addSurface(map, g.de, { kind: g.pos === 'adj' ? 'adj' : 'other', lemma: g.de });
  if (g.plural && g.plural !== '—') addSurface(map, g.plural, { kind: 'other', lemma: g.de });
}

/** The vocabulary and grammar a text may use: earlier rungs, plus this rung up to `order`. */
function scopeFor(rungs: Rung[], lessonsByRung: Map<string, Lesson[]>, data: LintData, rungId: string, order: number, extra: string[] = []): Scope {
  const ri = rungs.findIndex((r) => r.id === rungId);
  const ids = new Set<string>();
  const core = new Set<string>();
  const surfaces = new Map<string, Surface[]>();
  const verbs = new Set<string>();
  const phraseEntries = new Set<string>();
  const addEntry = (g: GlossaryEntry) => {
    surfacesOf(g, surfaces, verbs);
    if (/\s/.test(g.de.trim())) phraseEntries.add(g.de);
  };
  for (let i = 0; i <= ri; i++) {
    const r = rungs[i];
    for (const w of data.lexicon.rungs[r.id] ?? []) core.add(w.toLowerCase());
    for (const g of data.wordLists[r.id] ?? []) addEntry(g);
    const lessons = lessonsByRung.get(r.id) ?? [];
    // Earlier rungs, and (for a test, capstone or placement section) this rung, whole.
    if (i < ri || order === Infinity) for (const id of r.inventory) ids.add(id);
    for (const l of lessons) {
      if (i === ri && l.order > order) continue;
      for (const id of l.introduces) ids.add(id);
      for (const g of l.glossary) addEntry(g);
    }
  }
  const grammar = data.grammar.filter((g) => ids.has(g.id));
  // Chunks: the grammar points' fixed phrases, and every multi-word glossary entry (Guten Morgen).
  const phrases = [...phraseEntries];
  const chunks = [...grammar.flatMap((g) => g.chunks ?? []), ...phrases].map((c) => (c.toLowerCase().match(WORD_RE) ?? []) as string[]).filter((c) => c.length > 0);
  const allowedVerbs = new Set(grammar.flatMap((g) => g.verbs ?? []));
  const names = new Set(data.names.flatMap((n) => n.split(/\s+/)));
  const detects = new Set(grammar.map((g) => g.detect).filter((d): d is string => !!d));
  return {
    ids,
    core,
    surfaces,
    verbs,
    chunks,
    allowedVerbs,
    names,
    extra: new Set(extra.flatMap((e) => e.toLowerCase().split(/\s+/))),
    detects,
    hasId: (id) => ids.has(id),
  };
}

// ---------- word classes the checks need ----------

const SUBJECT: Record<string, ('ich' | 'du' | 'er' | 'wir' | 'ihr' | 'sie')[]> = {
  ich: ['ich'],
  du: ['du'],
  er: ['er'],
  es: ['er'],
  wir: ['wir'],
  ihr: ['ihr'],
  sie: ['er', 'sie'],
};
/** Words that may stand before the verb's position-1 constituent without counting (Vorfeld-neutral). */
const COORD = new Set(['und', 'aber', 'oder', 'denn', 'sondern', 'ja', 'nein', 'doch']);
/** Conjunctions that send the finite verb to the end (Easy 3+). */
const SUBORD = new Set(['weil', 'dass', 'wenn', 'ob', 'obwohl', 'bevor', 'nachdem', 'damit', 'sodass', 'falls']);
/** One-word adverbs: one of them in position 1 is the whole constituent ("Heute stehe ich …"). */
const ADVERBS = new Set(['heute', 'morgen', 'gestern', 'jetzt', 'dann', 'hier', 'dort', 'da', 'oft', 'immer', 'manchmal', 'leider', 'also', 'zuerst', 'danach', 'später', 'abends', 'morgens', 'mittags', 'nachmittags', 'sonntags', 'montags', 'auch', 'nur', 'schon', 'noch', 'gern', 'gerne', 'bitte']);
const DATIVE_ONLY = new Set(['dem', 'einem', 'keinem', 'meinem', 'deinem', 'seinem', 'ihrem', 'unserem', 'eurem', 'mir', 'dir', 'ihm', 'ihnen', 'zum', 'zur', 'beim', 'vom', 'im', 'am']);
const DATIVE_PREPS = new Set(['mit', 'bei', 'zu', 'aus', 'von', 'nach', 'seit', 'gegenüber', 'in', 'auf', 'unter', 'neben', 'hinter', 'vor', 'zwischen', 'an', 'über']);
const GENITIVE = new Set(['des', 'eines', 'keines', 'meines', 'deines', 'seines', 'ihres', 'unseres', 'eures', 'wegen', 'trotz', 'während', 'statt', 'innerhalb', 'außerhalb']);
const RELATIVE = new Set(['der', 'die', 'das', 'den', 'dem', 'denen', 'dessen', 'deren']);
const MODALS = new Set(['können', 'müssen', 'wollen', 'dürfen', 'sollen', 'mögen', 'möchten']);
const AUX = new Set(['haben', 'sein']);
const FINITE = new Set(['praesens', 'praeteritum', 'konj2', 'imperativ']);
/** Capitalised mid-sentence without being nouns: the formal pronouns. */
const FORMAL = new Set(['Sie', 'Ihnen', 'Ihr', 'Ihre', 'Ihren', 'Ihrem', 'Ihrer', 'Ihres']);

// ---------- one text ----------

function lintText(t: Text, scope: Scope, data: LintData, draft: boolean, out: Finding[], nounGender: Map<string, { gender: Gender; number: Num }[]>) {
  const err = (m: string) => out.push({ level: 'error', message: `${t.where}: ${m}` });
  const soft = (m: string) => out.push({ level: draft ? 'warn' : 'error', message: `${t.where}: ${m}` });
  const plain = stripMarks(t.text).normalize('NFC');

  // Spelling (CLAUDE.md §4.5): German quotation marks; no capital ẞ (Germany writes STRASSE or Straße).
  if (/"/.test(plain)) err(`straight quotes in "${plain}": write „…“`);
  if (/ẞ/.test(plain)) err(`capital ẞ in "${plain}": write Straße (or STRASSE in capitals)`);

  const toks = tokens(t.text);
  const readingsOf = (tok: Tok) => data.formIndex.get(tok.low) ?? [];
  const inScopeVerb = (f: FormInfo) => scope.verbs.has(f.inf) || scope.allowedVerbs.has(f.inf);
  const isNounSurface = (tok: Tok) => (scope.surfaces.get(tok.low) ?? []).some((s) => s.kind === 'noun') || nounGender.has(tok.raw);
  const nonVerb = (tok: Tok) => scope.core.has(tok.low) || (scope.surfaces.get(tok.low) ?? []).some((s) => s.kind !== 'noun' || /^[A-ZÄÖÜ]/.test(tok.raw));
  const inChunk = (i: number) =>
    scope.chunks.some((c) => {
      for (let s = Math.max(0, i - c.length + 1); s <= i; s++) if (c.every((w, k) => toks[s + k]?.low === w)) return true;
      return false;
    });

  // ---- words: known, capitals, ß, inventory by form ----
  toks.forEach((tok, i) => {
    const name = scope.names.has(tok.raw);
    // Noun capitals: a noun written small, or a non-noun capitalised mid-sentence.
    const nounReadings = (scope.surfaces.get(tok.low) ?? []).filter((s) => s.kind === 'noun');
    const otherReadings = (scope.surfaces.get(tok.low) ?? []).filter((s) => s.kind !== 'noun');
    const verbish = readingsOf(tok).length > 0;
    if (/^[a-zäöü]/.test(tok.raw) && nounReadings.length && !otherReadings.length && !scope.core.has(tok.low) && !verbish) {
      err(`"${tok.raw}" is a noun: write "${nounReadings[0].lemma === tok.low ? tok.raw[0].toUpperCase() + tok.raw.slice(1) : tok.raw[0].toUpperCase() + tok.raw.slice(1)}"`);
    }
    if (/^[A-ZÄÖÜ]/.test(tok.raw) && !tok.sentenceStart && !name && !FORMAL.has(tok.raw) && !nounReadings.length && !nounGender.has(tok.raw) && (scope.core.has(tok.low) || otherReadings.length || verbish)) {
      soft(`"${tok.raw}" is capitalised mid-sentence; only nouns, names and Sie are`);
    }

    // Inventory by verb form (CLAUDE.md §4.1).
    const all = readingsOf(tok);
    if (all.length && !(isNounSurface(tok) && /^[A-ZÄÖÜ]/.test(tok.raw) && !tok.sentenceStart)) {
      const tenses = new Set(all.map((f) => f.tense));
      const only = (...ts: string[]) => [...tenses].every((x) => ts.includes(x));
      if (only('konj2') && !scope.detects.has('konj2')) err(`"${tok.raw}" is Konjunktiv II, which isn't taught yet (Medium 2)`);
      if (only('praeteritum', 'konj2') && tenses.has('praeteritum')) {
        const inf = all[0].inf;
        const ok = AUX.has(inf) ? scope.detects.has('perfekt') : MODALS.has(inf) ? scope.hasId('a2-modal-praeteritum') || scope.hasId('b1-praeteritum') : scope.hasId('b1-praeteritum');
        if (!ok) err(`"${tok.raw}" (${inf}, Präteritum) isn't taught yet`);
      }
      if (only('imperativ') && !nonVerb(tok) && !scope.hasId('a1-imperative') && !inChunk(i)) err(`"${tok.raw}" is an imperative, which isn't taught yet (Easy 2 lesson 5)`);
    }

    // Lexicon: the word must be known for this rung (words of a taught chunk always are).
    if (inChunk(i)) return;
    if (all.length && !nonVerb(tok)) {
      if (all.some(inScopeVerb)) return;
      soft(`"${tok.raw}" is a form of "${all[0].inf}", which is not in a glossary or word list yet`);
      return;
    }
    const known = scope.core.has(tok.low) || scope.surfaces.has(tok.low) || scope.extra.has(tok.low) || inChunk(i) || name || /^\d/.test(tok.raw);
    if (known) return;
    // ss written for ß.
    if (tok.low.includes('ss')) {
      const fix = [...Array(tok.low.split('ss').length - 1).keys()].map((k) => {
        let n = -1;
        return tok.raw.replace(/ss/g, (m) => (++n === k ? 'ß' : m));
      }).find((c) => scope.surfaces.has(c.toLowerCase()) || data.formIndex.has(c.toLowerCase()) || scope.core.has(c.toLowerCase()));
      if (fix) {
        err(`"${tok.raw}": write "${fix}" (ß, Germany standard)`);
        return;
      }
    }
    soft(`unknown word "${tok.raw}" (not on the rung's list, a glossary, names or extra)`);
  });

  // ---- inventory by structure ----
  toks.forEach((tok, i) => {
    const prev = toks[i - 1];
    const dative = DATIVE_ONLY.has(tok.low) || (tok.low === 'der' && prev && DATIVE_PREPS.has(prev.low) && !['in', 'auf', 'an', 'über', 'unter', 'neben', 'hinter', 'vor', 'zwischen'].includes(prev.low) ? true : false) || (['der', 'den'].includes(tok.low) && prev && ['mit', 'bei', 'zu', 'aus', 'von', 'nach', 'seit'].includes(prev.low));
    if (dative && !scope.detects.has('dative') && !inChunk(i) && !(tok.raw === 'Ihnen' && inChunk(i))) {
      err(`"${prev && DATIVE_PREPS.has(prev.low) ? `${prev.raw} ` : ''}${tok.raw}" is a dative form, taught in Easy 2 lesson 6 (before that only as a listed chunk)`);
    }
    if (GENITIVE.has(tok.low) && !scope.detects.has('genitive')) err(`"${tok.raw}" is genitive, taught in Medium 2`);
    if (SUBORD.has(tok.low) && !scope.detects.has('subordinate')) err(`"${tok.raw}" starts a verb-final clause, taught from Easy 3`);
  });
  // Relative clauses: ", der/die/das …" not followed by a noun.
  for (const m of plain.matchAll(/,\s+(der|die|das|den|dem|denen|dessen|deren)\s+([A-Za-zÄÖÜäöüß]+)/g)) {
    if (RELATIVE.has(m[1]) && !/^[A-ZÄÖÜ]/.test(m[2]) && !(data.formIndex.get(m[2].toLowerCase()) ?? []).some((f) => FINITE.has(f.tense)) && !scope.detects.has('relative')) err(`", ${m[1]} ${m[2]}" looks like a relative clause, taught in Medium 2`);
  }
  // Perfekt and passive: a participle with haben/sein (Perfekt) or werden (passive) in one clause.
  for (const c of clauses(t.text)) {
    const ct = tokens(c.text);
    const parts = ct.filter((x) => (data.formIndex.get(x.low) ?? []).some((f) => f.tense === 'partizip') && !(data.formIndex.get(x.low) ?? []).some((f) => f.tense !== 'partizip') && !(/^[A-ZÄÖÜ]/.test(x.raw) && !x.sentenceStart));
    if (!parts.length) continue;
    const auxInfs = new Set(ct.flatMap((x) => (data.formIndex.get(x.low) ?? []).filter((f) => FINITE.has(f.tense)).map((f) => f.inf)));
    if ((auxInfs.has('haben') || auxInfs.has('sein')) && !scope.detects.has('perfekt')) err(`"${parts[0].raw}" with haben/sein is the Perfekt, taught in Easy 2 lesson 11`);
    if (auxInfs.has('werden') && !auxInfs.has('haben') && !auxInfs.has('sein') && !scope.detects.has('passive')) err(`werden + "${parts[0].raw}" is the passive, taught in Medium 3`);
  }
  // Attributive adjective endings: adjective + -e/-en/-er/-es/-em before a noun.
  toks.forEach((tok, i) => {
    const next = toks[i + 1];
    if (!next || !/^[A-ZÄÖÜ]/.test(next.raw) || !isNounSurface(next)) return;
    const m = /^(.+?)(e|en|er|es|em)$/.exec(tok.low);
    if (!m) return;
    const isAdj = [m[1], m[1] + 'e'].some((b) => (scope.surfaces.get(b) ?? []).some((s) => s.kind === 'adj'));
    if (isAdj && !inChunk(i) && !scope.detects.has('adj-ending')) err(`"${tok.raw} ${next.raw}": an adjective ending before a noun, taught in Medium 1 (say "${next.raw} ist ${m[1]}" until then)`);
  });

  // ---- agreement: determiner + noun (CLAUDE.md §4.2) ----
  toks.forEach((tok, i) => {
    const readings = data.determiners.get(tok.low);
    if (!readings) return;
    // Skip one adjective between them ("ein großes Haus").
    const n1 = toks[i + 1];
    // …but never over a verb: "Das ist Tee" is a pronoun, a verb and a noun.
    const isVerb = (t: Tok) => (data.formIndex.get(t.low) ?? []).some((f) => FINITE.has(f.tense));
    const noun = n1 && /^[A-ZÄÖÜ]/.test(n1.raw) ? n1 : toks[i + 2] && /^[A-ZÄÖÜ]/.test(toks[i + 2].raw) && n1 && /^[a-zäöü]/.test(n1.raw) && !data.determiners.has(n1.low) && !isVerb(n1) ? toks[i + 2] : null;
    if (!noun) return;
    const nr = nounGender.get(noun.raw);
    if (!nr) return;
    // die/der/das as pronouns ("Das ist …") have no noun after them; a capitalised noun follows here.
    const ok = nr.some((n) => readings.some((r) => r.number === n.number && (r.gender === null || r.gender === n.gender)));
    if (!ok) {
      const want = nr.map((n) => `${n.number === 'pl' ? 'pl' : n.gender}`).join('/');
      err(`"${tok.raw} ${noun.raw}": "${tok.raw}" doesn't agree with ${noun.raw} (${want})`);
    }
  });

  // ---- verb position, separable prefixes, conjugation (CLAUDE.md §4.3, §4.4) ----
  let prevSub = false;
  for (const c of clauses(t.text)) {
    const ct = tokens(c.text);
    if (!ct.length) continue;
    let start = 0;
    while (start < ct.length - 1 && COORD.has(ct[start].low)) start++;
    const body = ct.slice(start);
    const isSub = SUBORD.has(body[0].low) || (c.afterComma && RELATIVE.has(body[0].low) && !/^[A-ZÄÖÜ]/.test(body[1]?.raw ?? 'X'));
    const mainAfterSub = c.afterComma && prevSub;
    prevSub = isSub;
    if (isSub || mainAfterSub) continue;
    // A joined separable verb in a main clause ("Ich aufstehe"): right only in a verb-final clause.
    for (const x of body) {
      const joined = data.verbs.find((v) => v.sep && x.low.startsWith(v.sep) && x.low !== v.inf && x.low !== v.partizip && (data.formIndex.get(x.low.slice(v.sep.length)) ?? []).some((f) => f.inf === v.inf && FINITE.has(f.tense)));
      if (joined) err(`"${x.raw}": in a main clause the prefix separates ("${x.low.slice(joined.sep!.length)} … ${joined.sep}")`);
    }
    // Finite verb candidates: words with a finite reading, not nouns mid-sentence.
    const finiteAt = body.findIndex((x, k) => (data.formIndex.get(x.low) ?? []).some((f) => FINITE.has(f.tense)) && !(k > 0 && /^[A-ZÄÖÜ]/.test(x.raw) && x.raw !== 'Sie' && isNounSurface(x)) && !data.determiners.has(x.low));
    if (finiteAt < 0) continue;
    const front = body.slice(0, finiteAt);
    if (finiteAt >= 2) {
      const pron = front.slice(1).find((x) => ['ich', 'du', 'er', 'wir', 'ihr'].includes(x.low));
      if (pron || ADVERBS.has(front[0].low)) soft(`the verb "${body[finiteAt].raw}" comes after "${front.map((x) => x.raw).join(' ')}": in a main clause it stands in position 2`);
    }
    const verbTok = body[finiteAt];
    const vr = (data.formIndex.get(verbTok.low) ?? []).filter((f) => FINITE.has(f.tense));
    // Separable prefix: if the clause has the prefix, it must be last.
    const prefixes = new Set(vr.map((f) => f.prefix).filter((p): p is string => !!p));
    for (const p of prefixes) {
      const at = body.findIndex((x, k) => k > finiteAt && x.low === p);
      if (at >= 0 && at !== body.length - 1 && !(MODALS.has(vr[0].inf) || AUX.has(vr[0].inf))) err(`"${verbTok.raw} … ${p}": the separable prefix goes to the end of the clause`);
    }
    // Conjugation: a subject pronoun right before or after the finite verb.
    const subj = [body[finiteAt - 1], body[finiteAt + 1]].find((x, k) => x && (k === 0 ? finiteAt === 1 : true) && (SUBJECT[x.low] || x.raw === 'Sie'));
    if (subj && vr.length && !vr.every((f) => f.tense === 'imperativ')) {
      const persons = subj.raw === 'Sie' ? ['sie', 'er'] : SUBJECT[subj.low];
      // "ihr" before a noun is a possessive, not a subject.
      const isPossessive = subj.low === 'ihr' && subj === body[finiteAt + 1] && body[finiteAt + 2] && /^[A-ZÄÖÜ]/.test(body[finiteAt + 2].raw);
      if (!isPossessive && !vr.some((f) => f.tense !== 'imperativ' && f.person && persons.includes(f.person))) {
        err(`"${subj === body[finiteAt - 1] ? `${subj.raw} ${verbTok.raw}` : `${verbTok.raw} ${subj.raw}`}": "${verbTok.raw}" is not the ${persons.join('/')} form of ${vr[0].inf} (${conjugate(data.verbs.find((v) => v.inf === vr[0].inf)!, 'praesens', persons[0] as 'ich')})`);
      }
    }
  }

  // ---- register: Kerja cards use Sie (CLAUDE.md §4.6) ----
  if (t.work) for (const tok of toks) if (['du', 'dich', 'dir', 'dein', 'deine', 'deinen', 'deinem', 'deiner'].includes(tok.low)) err(`"${tok.raw}" in a Kerja card: workplace lines use Sie`);
}

// ---------- bracket focus (G1) ----------

/**
 * Two [[focus]] marks are fine when they form one verbal bracket (CLAUDE.md §3.2): a finite verb and
 * its separable prefix, a modal (or möchte) and an infinitive, or haben/sein/werden and a participle.
 */
export function bracketFocusError(text: string, count: number, formIndex: Map<string, FormInfo[]>): string | null {
  if (count <= 1) return null;
  if (count > 2) return `${count} [[focus]] marks (two at most, for one verbal bracket)`;
  const marks = [...text.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1].toLowerCase().trim());
  const [a, b] = marks;
  const fa = (formIndex.get(a) ?? []).filter((f) => FINITE.has(f.tense));
  const fb = formIndex.get(b) ?? [];
  const ok = fa.some(
    (f) =>
      (f.prefix && f.prefix === b) ||
      (MODALS.has(f.inf) && fb.some((g) => g.tense === 'infinitiv')) ||
      (['haben', 'sein', 'werden'].includes(f.inf) && fb.some((g) => g.tense === 'partizip')) ||
      (f.inf === 'werden' && fb.some((g) => g.tense === 'infinitiv')),
  );
  return ok ? null : `two [[focus]] marks ("${a}", "${b}") that don't form one verbal bracket`;
}

// ---------- check items ----------

/** The correct German an item shows or expects (distractors are wrong on purpose and skipped). */
export function itemTexts(item: CheckItem): string[] {
  if (item.lang === 'id') return [];
  switch (item.type) {
    case 'choice':
    case 'scene':
      return [...(item.prompt ? [item.prompt] : []), item.answer];
    case 'gap':
      return [item.prompt.replace('___', item.answer)];
    case 'listen':
      return [item.audio, item.answer];
    case 'fix':
      return [item.answer];
    case 'order':
    case 'wordorder':
      return [item.answer.join(' ')];
    case 'form':
      return [item.frame ? item.frame.replace('___', item.answer) : item.answer];
    case 'conjugate':
      return Object.values(item.answers);
    case 'dictation':
      return [item.answer];
    case 'gender':
      return [item.noun];
    case 'case':
    case 'wechsel':
      return [item.sentence.replace('___', item.answer)];
  }
}

/** Items against lib/de: forms, grids, genders, articles by case, word orders, two-way prepositions. */
function lintItem(item: CheckItem, where: string, data: LintData, nounGender: Map<string, { gender: Gender; number: Num }[]>, out: Finding[]) {
  const err = (m: string) => out.push({ level: 'error', message: `${where}: ${item.id}: ${m}` });
  const verb = (inf: string) => data.verbs.find((v) => v.inf === inf);
  /** The article a slot needs: one of `answer`'s readings must have this case and the noun's gender/number. */
  const articleFits = (answer: string, noun: string, kase: Kase) => {
    const nr = nounGender.get(noun);
    const readings = data.determiners.get(answer.toLowerCase());
    if (!nr) return err(`noun "${noun}" has no gender in nouns.yaml or a glossary`);
    if (!readings) return err(`"${answer}" is not a determiner form lib/de knows`);
    const ok = nr.some((n) => readings.some((r) => r.kase === kase && r.number === n.number && (r.gender === null || r.gender === n.gender)));
    if (!ok) {
      const want = nr.map((n) => {
        const types = [...new Set(readings.map((r) => r.type))];
        return types.map((ty) => article(ty, n.gender, n.number, kase)).filter(Boolean).join('/');
      });
      err(`"${answer} ${noun}" is not ${kase}: lib/de gives "${want.join('/')}"`);
    }
  };
  switch (item.type) {
    case 'form': {
      const v = verb(item.base);
      if (!v) return err(`"${item.base}" is not in verbs.yaml`);
      const want = conjugate(v, item.target.tense, item.target.person);
      if (item.answer !== want) err(`answer "${item.answer}" ≠ lib/de "${want}" (${item.base}, ${item.target.tense}, ${item.target.person})`);
      return;
    }
    case 'conjugate': {
      const v = verb(item.verb);
      if (!v) return err(`"${item.verb}" is not in verbs.yaml`);
      for (const p of item.persons) {
        const want = conjugate(v, item.tense, p);
        if (item.answers[p] !== want) err(`${p}: "${item.answers[p]}" ≠ lib/de "${want}"`);
      }
      return;
    }
    case 'gender': {
      const nr = nounGender.get(item.noun);
      if (!nr) return err(`noun "${item.noun}" has no gender in nouns.yaml or a glossary`);
      if (!nr.some((n) => n.gender === item.answer)) err(`${item.noun} is ${nr[0].gender}, not ${item.answer}`);
      return;
    }
    case 'case':
      return articleFits(item.answer, item.noun, item.role);
    case 'wechsel': {
      const after = item.sentence.split('___')[1]?.trim().match(/^[A-ZÄÖÜ][A-Za-zÄÖÜäöüß]*/)?.[0];
      if (!after) return err('the ___ slot needs a noun after it');
      return articleFits(item.answer, after, item.scene.motion ? 'akk' : 'dat');
    }
    case 'wordorder': {
      if (!item.zones) return;
      const zones = item.zones as Zone[];
      const clause = clauseOf(zones);
      if (!validOrder(item.answer, item.answer, zones, clause)) err(`the answer is not a valid ${clause} order for its zones`);
      // The zones must describe the sentence: a finite verb in the verb zone, bracket parts at the end.
      const verbTile = item.answer[zones.indexOf('verb')];
      if (!verbTile || !(data.formIndex.get(verbTile.toLowerCase()) ?? []).some((f) => FINITE.has(f.tense))) err(`zone "verb" tile "${verbTile}" is not a finite verb form`);
      item.answer.forEach((tile, k) => {
        if (zones[k] !== 'end') return;
        const fs = data.formIndex.get(tile.toLowerCase()) ?? [];
        const isPrefix = data.verbs.some((v) => v.sep === tile.toLowerCase());
        if (!isPrefix && !fs.some((f) => f.tense === 'infinitiv' || f.tense === 'partizip')) err(`zone "end" tile "${tile}" is not a prefix, infinitive or participle`);
      });
      for (const a of item.accept ?? []) if (!validOrder(a, item.answer, zones, clause)) out.push({ level: 'warn', message: `${where}: ${item.id}: accept "${a.join(' ')}" is not a valid bracket order` });
      return;
    }
  }
}

// ---------- lessons and other texts ----------

/** The German strings of a lesson (pair.off is wrong on purpose and skipped). */
function lessonTexts(l: Lesson): Text[] {
  const at = (where: string, text: string, work = false): Text => ({ text, where: `${l.id} ${where}`, ...(work ? { work } : {}) });
  return [
    ...l.examples.map((e, i) => at(`examples[${i}]`, e.de)),
    ...(l.worked ?? []).map((e, i) => at(`worked[${i}]`, e.de)),
    at('pair.natural', l.pair.natural),
    ...(l.talk?.lines ?? []).map((t, i) => at(`talk[${i}]`, t.de)),
    ...(l.work?.lines ?? []).map((t, i) => at(`work[${i}]`, t.de, true)),
    at('tirukan', l.tirukan.de),
    ...l.check.flatMap((c) => itemTexts(c).map((x) => at(c.id, x))),
  ];
}

/** Every noun's gender and number by surface form: nouns.yaml, word lists and glossaries. */
export function nounIndex(data: LintData, lessonsByRung: Map<string, Lesson[]>): Map<string, { gender: Gender; number: Num }[]> {
  const out = new Map<string, { gender: Gender; number: Num }[]>();
  const add = (form: string, gender: Gender, number: Num) => {
    const list = out.get(form) ?? [];
    if (!list.some((x) => x.gender === gender && x.number === number)) list.push({ gender, number });
    out.set(form, list);
  };
  for (const n of data.nouns) {
    add(n.de, n.gender, 'sg');
    if (n.plural) add(n.plural, n.gender, 'pl');
  }
  const glossaries = [...Object.values(data.wordLists).flat(), ...[...lessonsByRung.values()].flat().flatMap((l) => l.glossary)];
  for (const g of glossaries) {
    if (g.pos !== 'noun' || !g.gender || /\s/.test(g.de)) continue;
    add(g.de, g.gender, 'sg');
    if (g.plural && g.plural !== '—') add(g.plural, g.gender, 'pl');
  }
  return out;
}

export function lintLessons(rungs: Rung[], lessonsByRung: Map<string, Lesson[]>, data: LintData): Finding[] {
  const out: Finding[] = [];
  const grammarIds = new Set(data.grammar.map((g) => g.id));
  const bridgeWords = new Set([...data.bridges.bridges.map((b) => b.de), ...data.bridges.false_friends.map((f) => f.de)]);
  const nounsByWord = new Map(data.nouns.map((n) => [n.de, n]));
  const verbsByInf = new Map(data.verbs.map((v) => [v.inf, v]));
  const nounGender = nounIndex(data, lessonsByRung);
  for (const r of rungs) {
    for (const id of r.inventory) if (!grammarIds.has(id)) out.push({ level: 'error', message: `curriculum ${r.id}: inventory "${id}" is not in grammar.yaml` });
    for (const l of lessonsByRung.get(r.id) ?? []) {
      const draft = l.status === 'draft';
      const scope = scopeFor(rungs, lessonsByRung, data, r.id, l.order, (l.extra ?? []).map((e) => e.de));
      for (const id of l.introduces) {
        if (!grammarIds.has(id)) out.push({ level: 'error', message: `${l.id}: introduces "${id}", which is not in grammar.yaml` });
        else if (!r.inventory.includes(id)) out.push({ level: 'error', message: `${l.id}: introduces "${id}", which is not in ${r.id}'s inventory` });
      }
      for (const t of lessonTexts(l)) lintText(t, scope, data, draft, out, nounGender);
      for (const item of l.check) lintItem(item, l.id, data, nounGender, out);
      for (const g of l.glossary) {
        if (g.pos === 'verb') {
          const v = verbsByInf.get(g.de);
          if (!v) out.push({ level: 'error', message: `${l.id}: glossary verb "${g.de}" is not in verbs.yaml` });
          else if (g.verb && (g.verb.aux !== v.aux || g.verb.partizip !== v.partizip || (g.sep ?? null) !== (v.sep ?? null))) {
            out.push({ level: 'error', message: `${l.id}: glossary "${g.de}" (sep, aux, partizip) differs from verbs.yaml` });
          }
        }
        if (g.pos === 'noun') {
          const n = nounsByWord.get(g.de);
          if (n && (n.gender !== g.gender || (g.plural && (n.plural ?? '—') !== g.plural))) out.push({ level: 'error', message: `${l.id}: glossary "${g.de}" (gender, plural) differs from nouns.yaml` });
        }
        if (g.bridge) {
          const b = data.bridges.bridges.find((x) => x.de === g.de);
          if (!b || b.nl !== g.bridge.nl || b.id !== g.bridge.id) out.push({ level: 'error', message: `${l.id}: glossary bridge for "${g.de}" is not the one in bridges.yaml` });
        }
      }
      for (const w of l.words?.bridges ?? []) if (!bridgeWords.has(w)) out.push({ level: 'error', message: `${l.id}: Kata card word "${w}" is not in bridges.yaml` });
      for (const parts of l.words?.compounds ?? []) {
        const joined = data.nouns.find((n) => n.parts && n.parts.join('|') === parts.join('|'));
        if (!joined) out.push({ level: 'error', message: `${l.id}: Kata card compound ${parts.join(' + ')} is not in nouns.yaml` });
      }
      // Reviewers (CLAUDE.md §4.9): Kerja cards at B1+ need someone with workplace experience.
      if (l.status === 'reviewed' && l.work && /^[BC]/.test(r.cefr) && !l.review?.work_by) out.push({ level: 'error', message: `${l.id}: a reviewed Kerja card at ${r.cefr} needs review.work_by` });
      // Sizes (CLAUDE.md §4.10): 6–12 glossary words (Dasar lessons teach fewer).
      if (r.tier !== 'dasar' && l.glossary.length < 6) out.push({ level: 'warn', message: `${l.id}: ${l.glossary.length} glossary words; aim for 6–12` });
    }
  }
  return out;
}

/** Test pools, readings, dialogues and placement: the whole rung's inventory (or a rung's, for placement). */
export function lintPool(rungs: Rung[], lessonsByRung: Map<string, Lesson[]>, data: LintData, rungId: string, where: string, texts: string[], items: CheckItem[]): Finding[] {
  const out: Finding[] = [];
  const scope = scopeFor(rungs, lessonsByRung, data, rungId, Infinity);
  const nounGender = nounIndex(data, lessonsByRung);
  for (const text of texts) lintText({ text, where }, scope, data, true, out, nounGender);
  for (const item of items) {
    for (const x of itemTexts(item)) lintText({ text: x, where: `${where} ${item.id}` }, scope, data, true, out, nounGender);
    lintItem(item, where, data, nounGender, out);
  }
  return out;
}
