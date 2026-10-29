import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';
import { describe, expect, it } from 'vitest';
import { BridgesSchema, GrammarSchema, NounsSchema, VerbsSchema } from '@/course/schema';
import { compound, genderClue, pluralOf } from '@/lib/de';

const load = (name: string) => yaml.load(readFileSync(join(__dirname, '../../content/data', name), 'utf8'));

describe('content/data schemas', () => {
  it('verbs.yaml', () => expect(() => VerbsSchema.parse(load('verbs.yaml'))).not.toThrow());
  it('grammar.yaml, unique ids', () => {
    const g = GrammarSchema.parse(load('grammar.yaml'));
    expect(new Set(g.map((p) => p.id)).size).toBe(g.length);
  });
  it('bridges.yaml', () => expect(() => BridgesSchema.parse(load('bridges.yaml'))).not.toThrow());
});

// nouns.yaml plus the nouns added with each rung's lessons (data/nouns/<rung>.yaml).
const nounFiles = existsSync(join(__dirname, '../../content/data/nouns')) ? readdirSync(join(__dirname, '../../content/data/nouns')).filter((f) => f.endsWith('.yaml')).map((f) => `nouns/${f}`) : [];
const nouns = NounsSchema.parse(['nouns.yaml', ...nounFiles].flatMap((f) => (load(f) as unknown[] | null) ?? []));
const byWord = new Map(nouns.map((n) => [n.de, n]));

describe('nouns.yaml', () => {
  it('has at least 200 unique nouns', () => {
    expect(nouns.length).toBeGreaterThanOrEqual(200);
    expect(byWord.size).toBe(nouns.length);
  });

  it('genderClue agrees with every noun except the listed exceptions', () => {
    const wrong: string[] = [];
    const unmarked: string[] = [];
    for (const n of nouns) {
      const clue = genderClue(n.de, { person: n.person });
      const breaks = clue !== null && clue.gender !== n.gender;
      if (breaks && !n.exception) wrong.push(`${n.de} (${n.gender}, clue -${clue!.suffix} → ${clue!.gender})`);
      if (!breaks && n.exception && !n.parts) unmarked.push(n.de);
    }
    expect(wrong).toEqual([]);
    expect(unmarked).toEqual([]);
  });

  it('the exceptions are the expected ones', () => {
    // Every listed exception really breaks its clue (checked above); the core set is in nouns.yaml.
    expect(nouns.filter((n) => n.exception).map((n) => n.de)).toEqual(expect.arrayContaining(['Mutter', 'Schwester', 'Tochter', 'Krankenschwester', 'Kuchen', 'Moment', 'Irrtum']));
  });

  it('every plural matches its pattern', () => {
    const off = nouns
      .filter((n) => n.plural && n.pattern && n.pattern !== 'other')
      .filter((n) => pluralOf(n.de, n.pattern!) !== n.plural)
      .map((n) => `${n.de} ${n.pattern} → ${pluralOf(n.de, n.pattern!)} ≠ ${n.plural}`);
    expect(off).toEqual([]);
  });

  it('every compound joins to its word and takes its last part’s gender', () => {
    const compounds = nouns.filter((n) => n.parts);
    expect(compounds.length).toBeGreaterThanOrEqual(20);
    for (const n of compounds) {
      const last = byWord.get(n.parts![n.parts!.length - 1]);
      const c = compound(n.parts!, n.links ?? [], last?.gender);
      expect(c.word, n.de).toBe(n.de);
      if (last) expect(n.gender, `${n.de} takes ${last.de}'s gender`).toBe(last.gender);
    }
  });
});
