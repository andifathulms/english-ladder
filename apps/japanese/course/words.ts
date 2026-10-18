// Build-time only: My words data. Facts for the glossary words learners can meet (ContentModel.wordData).
import fs from 'node:fs';
import path from 'node:path';
import type { LessonSummary } from '@ladder/core/lib/types';
import { toPlain } from '@/lib/ja/text';
import type { WordFacts } from '@/components/WordsRow';
import type { GlossaryEntry } from './types';

const vendor = <T>(f: string): T => JSON.parse(fs.readFileSync(path.join(process.cwd(), 'content/data/vendor', f), 'utf8')) as T;

/** Tokyo accent and JLPT level for the glossary words shown in My words. */
export function wordFacts(lessons: LessonSummary[]): WordFacts {
  const pitch = vendor<Record<string, number[]>>('pitch.json');
  const levels = new Map(vendor<{ ja: string; kana: string; jlpt: string }[]>('jlpt-words.json').map((w) => [`${w.ja}|${w.kana}`, w.jlpt]));
  const facts: WordFacts = {};
  for (const l of lessons) {
    for (const g of l.glossary) {
      const e = g.raw as GlossaryEntry;
      const key = `${toPlain(e.ja)}|${e.kana}`;
      if (facts[key]) continue;
      const p = pitch[key]?.[0];
      const lv = levels.get(key);
      facts[key] = { ...(p !== undefined ? { pitch: p } : {}), ...(lv ? { jlpt: lv } : {}) };
    }
  }
  return facts;
}
