/* Validates all content. Exits non-zero on any error. Run by `npm run build`. */
import fs from 'node:fs';
import path from 'node:path';
import { ZodError } from 'zod';
import {
  CONTENT_DIR,
  getCurriculum,
  getNouns,
  getTestPool,
  lessonFiles,
  parseLessonFile,
} from '../lib/content/load';
import { focusCount } from '../lib/markup';
import type { CheckItem, Lesson } from '../lib/types';
import { lintLessons } from '../lib/content/lint';

const errors: string[] = [];
const warnings: string[] = [];
const err = (m: string) => errors.push(m);

function fmtZod(file: string, e: unknown): string {
  if (e instanceof ZodError) {
    return e.issues.map((i) => `${file}: ${i.path.join('.') || '(root)'}: ${i.message}`).join('\n');
  }
  return `${file}: ${(e as Error).message}`;
}

function sentencesOf(item: CheckItem): string[] {
  switch (item.type) {
    case 'choice':
    case 'gap':
      return [item.prompt, ...item.options];
    case 'order':
      return [item.answer.join(' ')];
    case 'scene':
      return item.options;
    case 'fix':
      return [item.wrong, ...item.options];
    case 'listen':
      return [item.audio, ...item.options];
  }
}

// 1. Curriculum
let rungs: ReturnType<typeof getCurriculum> = [];
try {
  rungs = getCurriculum();
} catch (e) {
  err(fmtZod('curriculum.yaml', e));
}
const rungIds = new Set(rungs.map((r) => r.id));
if (rungIds.size !== rungs.length) err('curriculum.yaml: duplicate rung ids');

// 2. Lessons
const itemIds = new Map<string, string>();
const lessonsByRung = new Map<string, Lesson[]>();
const allLessonIds = new Set<string>();

for (const rung of rungs) {
  const lessons: Lesson[] = [];
  for (const file of lessonFiles(rung.id)) {
    const where = `${rung.id}/${file}`;
    try {
      const l = parseLessonFile(rung.id, file);
      if (l.rung !== rung.id) err(`${where}: rung "${l.rung}" does not match folder`);
      if (Number(file.slice(0, 2)) !== l.order) err(`${where}: order ${l.order} does not match file name`);
      if (allLessonIds.has(l.id)) err(`${where}: duplicate lesson id ${l.id}`);
      allLessonIds.add(l.id);
      for (const inv of l.introduces) {
        if (!rung.inventory.includes(inv)) err(`${where}: introduces "${inv}" not in rung inventory`);
      }
      for (const c of l.check) {
        if (itemIds.has(c.id)) err(`${where}: check id ${c.id} already used in ${itemIds.get(c.id)}`);
        itemIds.set(c.id, where);
        for (const s of sentencesOf(c)) {
          if (focusCount(s) > 1) err(`${where}: ${c.id}: more than one [[focus]] in "${s}"`);
        }
      }
      for (const s of [...l.examples.map((e) => e.en), ...(l.talk ?? []).map((t) => t.en), l.pair.natural, l.pair.off]) {
        if (focusCount(s) > 1) err(`${where}: more than one [[focus]] in "${s}"`);
      }
      lessons.push(l);
    } catch (e) {
      err(fmtZod(where, e));
    }
  }
  lessons.sort((a, b) => a.order - b.order);
  lessonsByRung.set(rung.id, lessons);
  if (rung.status === 'live' && lessons.length === 0) err(`${rung.id}: live rung has no lessons`);
}

for (const lessons of lessonsByRung.values()) {
  for (const l of lessons) {
    if (l.next && !allLessonIds.has(l.next)) err(`${l.rung}/${l.slug}: next "${l.next}" is not a lesson`);
  }
}

// 3. Test pools
for (const rung of rungs) {
  const file = path.join(CONTENT_DIR, rung.id, 'test.yaml');
  if (!fs.existsSync(file)) {
    if (rung.status === 'live' && (lessonsByRung.get(rung.id)?.length ?? 0) >= 8) {
      err(`${rung.id}: live rung with 8 lessons has no test.yaml`);
    }
    continue;
  }
  try {
    const pool = getTestPool(rung.id)!;
    const lessons = lessonsByRung.get(rung.id) ?? [];
    const ids = new Set(lessons.map((l) => l.id));
    for (const item of pool.items) {
      if (!item.from || !ids.has(item.from)) err(`${rung.id}/test.yaml: ${item.id}: from "${item.from}" is not a lesson`);
      if (itemIds.has(item.id)) err(`${rung.id}/test.yaml: ${item.id} already used in ${itemIds.get(item.id)}`);
      itemIds.set(item.id, `${rung.id}/test.yaml`);
    }
    for (const l of lessons) {
      if (!pool.items.some((i) => i.from === l.id)) err(`${rung.id}/test.yaml: no item from ${l.id}`);
    }
  } catch (e) {
    err(fmtZod(`${rung.id}/test.yaml`, e));
  }
}

// 4. Nouns
try {
  const nouns = getNouns();
  const seen = new Set<string>();
  for (const n of nouns) {
    if (seen.has(n.word)) err(`data/nouns.yaml: duplicate noun "${n.word}"`);
    seen.add(n.word);
  }
} catch (e) {
  err(fmtZod('data/nouns.yaml', e));
}

// 5. Inventory, lexicon and structure lint
const lint = lintLessons(rungs, lessonsByRung);
for (const f of lint) (f.level === 'error' ? errors : warnings).push(f.message);

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
const lessonCount = [...lessonsByRung.values()].reduce((n, l) => n + l.length, 0);
console.log(
  `content:check — ${rungs.length} rungs, ${lessonCount} lessons, ${itemIds.size} check items: ` +
    `${errors.length} errors, ${warnings.length} warnings`,
);
process.exit(errors.length ? 1 : 0);
