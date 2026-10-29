import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';
import { describe, expect, it } from 'vitest';
import { conjugateAll, regularPartizip, TENSES, type VerbData } from '@/lib/de';

const verbs = yaml.load(readFileSync(join(__dirname, '../../content/data/verbs.yaml'), 'utf8')) as VerbData[];

describe('verbs.yaml', () => {
  it('has unique infinitives', () => {
    expect(new Set(verbs.map((v) => v.inf)).size).toBe(verbs.length);
  });
  for (const v of verbs)
    it(`${v.inf}: the library gives every reference form`, () => {
      for (const tense of TENSES) {
        const want = v.check?.[tense];
        if (!want) continue;
        const got = conjugateAll(v, tense);
        expect(got, `${v.inf} ${tense}`).toEqual(want);
      }
    });
  it('weak verbs without a listed praeteritum stem have the regular participle', () => {
    for (const v of verbs.filter((x) => !x.praet && !x.irregular)) expect(v.partizip, v.inf).toBe(regularPartizip(v));
  });
});
