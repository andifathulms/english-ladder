/* Validates all content. Exits non-zero on any error. Run by `npm run build`.
 *
 * Course-agnostic: it loads the content model of whichever app invokes it (cwd/course/content.ts)
 * and the visual ids from its course.config.ts. Generic checks run here; the course's own rules
 * (language lint, data files, capstones, placement) run through ContentModel.check hooks. */
import path from 'node:path';
import { ZodError } from 'zod';
import { focusCount } from '../src/lib/markup';
import { isCoreItem, type CheckItem, type ExtraItem, type Lesson } from '../src/lib/types';
import { extraType, overrideItemText, registerItemTypes } from '../src/lib/check/itemTypes';
import type { CheckContext, Content } from '../src/lib/content/load';

const { content } = (await import(path.resolve(process.cwd(), 'course/content.ts'))) as { content: Content };
const { course } = (await import(path.resolve(process.cwd(), 'course.config.ts'))) as {
  course: { visualIds: readonly string[] };
};
const visualIds = new Set(course.visualIds);
// The app's modules may load core through its path alias (a separate module instance), so
// register the course's item types with this instance as well.
if (content.model.itemTypes) registerItemTypes(content.model.itemTypes);
for (const [type, fn] of Object.entries(content.model.itemText ?? {})) overrideItemText(type, fn);
const hooks = content.model.check ?? {};

const errors: string[] = [];
const warnings: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

function fmtZod(file: string, e: unknown): string {
  if (e instanceof ZodError) {
    return e.issues.map((i) => `${file}: ${i.path.join('.') || '(root)'}: ${i.message}`).join('\n');
  }
  return `${file}: ${(e as Error).message}`;
}

function sentencesOf(item: CheckItem): string[] {
  if (!isCoreItem(item)) return extraType(item).sentences(item as ExtraItem);
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

const itemIds = new Map<string, string>();
const claim = (id: string, where: string) => {
  if (itemIds.has(id)) err(`${where}: ${id} already used in ${itemIds.get(id)}`);
  itemIds.set(id, where);
};

// 1. Curriculum
let rungs: ReturnType<typeof content.getCurriculum> = [];
try {
  rungs = content.getCurriculum();
} catch (e) {
  err(fmtZod('curriculum.yaml', e));
}
const rungIds = new Set(rungs.map((r) => r.id));
if (rungIds.size !== rungs.length) err('curriculum.yaml: duplicate rung ids');

// 2. Lessons
const lessonsByRung = new Map<string, Lesson[]>();
const allLessonIds = new Set<string>();
const ctx: CheckContext = { rungs, lessonsByRung, allLessonIds, err, warn, claim, sentencesOf, content };

for (const rung of rungs) {
  const lessons: Lesson[] = [];
  for (const file of content.lessonFiles(rung.id)) {
    const where = `${rung.id}/${file}`;
    try {
      const l = content.parseLessonFile(rung.id, file);
      if (l.rung !== rung.id) err(`${where}: rung "${l.rung}" does not match folder`);
      if (Number(file.slice(0, 2)) !== l.order) err(`${where}: order ${l.order} does not match file name`);
      if (allLessonIds.has(l.id)) err(`${where}: duplicate lesson id ${l.id}`);
      allLessonIds.add(l.id);
      for (const inv of l.introduces) {
        if (!rung.inventory.includes(inv)) err(`${where}: introduces "${inv}" not in rung inventory`);
      }
      if (l.visual && !visualIds.has(l.visual.id)) err(`${where}: unknown visual "${l.visual.id}"`);
      for (const c of l.check) {
        claim(c.id, where);
        if (c.type === 'scene' && !visualIds.has(c.visual.id)) err(`${where}: ${c.id}: unknown visual "${c.visual.id}"`);
        for (const s of sentencesOf(c)) {
          if (focusCount(s) > 1) err(`${where}: ${c.id}: more than one [[focus]] in "${s}"`);
        }
      }
      for (const s of content.adapter.lesson.focusTexts(l)) {
        if (focusCount(s) > 1) err(`${where}: more than one [[focus]] in "${s}"`);
      }
      hooks.lesson?.(l, where, ctx, file);
      lessons.push(l);
    } catch (e) {
      err(fmtZod(where, e));
    }
  }
  lessons.sort((a, b) => a.order - b.order);
  lessonsByRung.set(rung.id, lessons);
  if (rung.status === 'live') {
    if (lessons.length === 0) err(`${rung.id}: live rung has no lessons`);
    // Notch counts come from data.
    if (hooks.lessonCountMatchesCurriculum && lessons.length !== rung.lessons) {
      err(`${rung.id}: curriculum says ${rung.lessons} lessons, found ${lessons.length}`);
    }
  }
}

for (const lessons of lessonsByRung.values()) {
  for (const l of lessons) {
    if (l.next && !allLessonIds.has(l.next)) err(`${l.rung}/${l.slug}: next "${l.next}" is not a lesson`);
  }
}

// 3. Test pools
for (const rung of rungs) {
  const lessons = lessonsByRung.get(rung.id) ?? [];
  if (!content.exists(`${rung.id}/test.yaml`)) {
    const required = hooks.requiresTestPool ? hooks.requiresTestPool(rung, lessons.length) : true;
    if (rung.status === 'live' && required) err(`${rung.id}: live rung with ${lessons.length} lessons has no test.yaml`);
    continue;
  }
  try {
    const pool = content.getTestPool(rung.id)!;
    if (pool.rung !== rung.id) err(`${rung.id}/test.yaml: rung "${pool.rung}" does not match folder`);
    const ids = new Set(lessons.map((l) => l.id));
    for (const item of pool.items) {
      if (!item.from || !ids.has(item.from)) err(`${rung.id}/test.yaml: ${item.id}: from "${item.from}" is not a lesson`);
      claim(item.id, `${rung.id}/test.yaml`);
    }
    for (const l of lessons) {
      if (!pool.items.some((i) => i.from === l.id)) err(`${rung.id}/test.yaml: no item from ${l.id}`);
    }
  } catch (e) {
    err(fmtZod(`${rung.id}/test.yaml`, e));
  }
}

// 3b. Readings
for (const rung of rungs) {
  if (!content.exists(`${rung.id}/reading.yaml`)) continue;
  try {
    const reading = content.getReading(rung.id)!;
    if (reading.rung !== rung.id) err(`${rung.id}/reading.yaml: rung "${reading.rung}" does not match folder`);
    for (const item of reading.items) claim(item.id, `${rung.id}/reading.yaml`);
  } catch (e) {
    err(fmtZod(`${rung.id}/reading.yaml`, e));
  }
}

// 4. The course's own checks: data files, capstones, placement, language lint.
try {
  hooks.extra?.(ctx);
} catch (e) {
  err(fmtZod('content', e));
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
const lessonCount = [...lessonsByRung.values()].reduce((n, l) => n + l.length, 0);
console.log(
  `content:check — ${rungs.length} rungs, ${lessonCount} lessons, ${itemIds.size} check items: ` +
    `${errors.length} errors, ${warnings.length} warnings`,
);
process.exit(errors.length ? 1 : 0);
