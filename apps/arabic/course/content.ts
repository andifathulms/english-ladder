// Build-time only: Arabic Ladder's content model — schemas, adapter, data files, check hooks.
import fs from 'node:fs';
import path from 'node:path';
import { createContent, type ContentModel } from '@ladder/core/lib/content/load';
import { configureAudio } from '@ladder/core/lib/speech/audio';
import { lintPhysical } from '@ladder/core/../scripts/lint-physical';
import { normalise } from '@/lib/arabic/text';
import { adapter } from './adapter';
import { itemText, itemTypes } from './items';
import {
  CurriculumSchema,
  DialogueSchema,
  LessonFrontmatterSchema,
  LettersSchema,
  LexiconSchema,
  MakhrajSchema,
  PlacementSchema,
  ReadingSchema,
  TestPoolSchema,
} from './schema';
import type { Dialogue, Lesson, Letter, LexiconEntry, MakhrajPoint, Placement, Reading, Rung, TestPool } from './types';
import { lintLessons } from './lint';
import { LOGICAL_DIRS } from './logicalDirs';
// audio-list reads this module's loaders at call time, so the import cycle is safe.
import { missingAudio } from '../scripts/audio-list';

// Audio keys (audio:list, the manifest check) use the same normaliser as the app.
configureAudio({ normalise, defaultVariety: 'fusha' });

/** Presentation-form code points (U+FB50–U+FEFF): content stores base letters only. */
const PRESENTATION = /[ﭐ-﷿ﹰ-﻿]/;

export const model: ContentModel = {
  schemas: {
    curriculum: CurriculumSchema as ContentModel['schemas']['curriculum'],
    lesson: LessonFrontmatterSchema as unknown as ContentModel['schemas']['lesson'],
    testPool: TestPoolSchema as unknown as ContentModel['schemas']['testPool'],
    reading: ReadingSchema as unknown as ContentModel['schemas']['reading'],
    dialogue: DialogueSchema as unknown as ContentModel['schemas']['dialogue'],
    placement: PlacementSchema as unknown as ContentModel['schemas']['placement'],
  },
  adapter,
  itemTypes,
  itemText,
  yaml: 'json',
  meta: { title: 'id' },
  // Letters and articulation points for the Huruf visuals, on every page that can show one.
  visualData: () => ({ letters: getLetters(), makhraj: getMakhraj() }),
  check: {
    lessonCountMatchesCurriculum: true,
    lesson: (l, where, ctx, file) => {
      const rung = ctx.rungs.find((r) => r.id === l.rung) as Rung | undefined;
      if (rung && rung.tier !== 'huruf' && (l as unknown as Lesson).glossary.length < 6) ctx.err(`${where}: needs 6–12 glossary entries`);
      if (PRESENTATION.test(fs.readFileSync(path.join(content.contentDir, l.rung, file), 'utf8'))) {
        ctx.err(`${where}: presentation-form code points (U+FB50–U+FEFF); store base letters`);
      }
    },
    extra: (ctx) => {
      // Dialogue capstones
      for (const rung of ctx.rungs) {
        if (!content.exists(`${rung.id}/dialogue.yaml`)) continue;
        try {
          const d = content.getDialogue(rung.id)!;
          if (d.rung !== rung.id) ctx.err(`${rung.id}/dialogue.yaml: rung "${d.rung}" does not match folder`);
          for (const item of d.items) ctx.claim(item.id, `${rung.id}/dialogue.yaml`);
        } catch (e) {
          ctx.err(`${rung.id}/dialogue.yaml: ${(e as Error).message}`);
        }
      }
      // Placement
      if (content.exists('placement.yaml')) {
        try {
          const p = getPlacement()!;
          for (const item of p.items) {
            ctx.claim(item.id, 'placement.yaml');
            if (item.match !== 'exact') ctx.err(`placement.yaml: ${item.id}: placement items need match: exact`);
            if (item.from && !ctx.allLessonIds.has(item.from)) ctx.err(`placement.yaml: ${item.id}: from "${item.from}" is not a lesson`);
          }
          const count = (s: string) => p.items.filter((i) => i.section === s).length;
          const want = { forms: 6, reading: 6, harakat: 4, sounds: 4 };
          for (const [s, n] of Object.entries(want)) if (count(s) !== n) ctx.err(`placement.yaml: ${count(s)} ${s} items, want ${n}`);
          if (!(p.thresholds.easy1 > p.thresholds.huruf2)) ctx.err('placement.yaml: thresholds.easy1 must be above thresholds.huruf2');
        } catch (e) {
          ctx.err(`placement.yaml: ${(e as Error).message}`);
        }
      }
      // Data
      try {
        const letters = getLetters();
        const seen = new Set<string>();
        for (const l of letters) {
          if (seen.has(l.letter)) ctx.err(`data/letters.yaml: duplicate letter ${l.letter}`);
          seen.add(l.letter);
          if (PRESENTATION.test(Object.values(l.forms).join(''))) ctx.err(`data/letters.yaml: ${l.letter}: presentation forms`);
        }
        const makhraj = new Set(getMakhraj().map((m) => m.id));
        for (const l of letters) if (makhraj.size && !makhraj.has(l.makhraj)) ctx.err(`data/letters.yaml: ${l.letter}: unknown makhraj "${l.makhraj}"`);
      } catch (e) {
        ctx.err(`data/letters.yaml or data/makhraj.yaml: ${(e as Error).message}`);
      }
      try {
        const rungIds = new Set(ctx.rungs.map((r) => r.id));
        for (const e of getLexicon()) if (!rungIds.has(e.rung)) ctx.err(`lexicon/core.yaml: ${e.ar}: unknown rung "${e.rung}"`);
      } catch (e) {
        ctx.err(`lexicon/core.yaml: ${(e as Error).message}`);
      }
      // Arabic lint: inventory, script, lexicon, harakat, reviewers
      for (const f of lintLessons(ctx.rungs as Rung[], ctx.lessonsByRung as unknown as Map<string, Lesson[]>)) (f.level === 'error' ? ctx.err : ctx.warn)(f.message);
      // No physical CSS in Arabic-bearing components
      for (const f of lintPhysical(LOGICAL_DIRS)) ctx.err(`${f.file}:${f.line}: physical CSS "${f.match}" (use a logical property)`);
      // Audio: every Arabic string in a live rung has a recording, or is accepted with fallback.
      const audio = missingAudio();
      if (audio.missing.length) {
        const msg = `${audio.missing.length} Arabic strings in live rungs have no recording (npm run audio:list)`;
        if (audio.accepted) ctx.warn(`${msg}; accepted with browser-speech fallback by content/audio/fallback.yaml`);
        else ctx.err(msg);
      }
    },
  },
};

export const content = createContent(model);

// Typed loaders for Arabic's own scripts and lint.
export const CONTENT_DIR = content.contentDir;
export const getCurriculum = () => content.getCurriculum() as Rung[];
export const getRung = (id: string) => content.getRung(id) as Rung | undefined;
export const getLessons = (rungId: string, opts?: { includeDrafts?: boolean }) => content.getLessons(rungId, opts) as unknown as Lesson[];
export const getTestPool = (rungId: string) => content.getTestPool(rungId) as unknown as TestPool | null;
export const getReading = (rungId: string) => content.getReading(rungId) as unknown as Reading | null;
export const getDialogue = (rungId: string) => content.getDialogue(rungId) as unknown as Dialogue | null;
export const getPlacement = () => content.getPlacement() as unknown as Placement | null;

export function getLetters(): Letter[] {
  return content.exists('data/letters.yaml') ? LettersSchema.parse(content.readYaml('data/letters.yaml')) : [];
}

export function getMakhraj(): MakhrajPoint[] {
  return content.exists('data/makhraj.yaml') ? MakhrajSchema.parse(content.readYaml('data/makhraj.yaml')) : [];
}

/** core.yaml plus any per-rung lexicon files beside it (lexicon/<rung>.yaml). */
export function getLexicon(): LexiconEntry[] {
  const dir = path.join(content.contentDir, 'lexicon');
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.yaml'))
    .sort((a, b) => (a === 'core.yaml' ? -1 : b === 'core.yaml' ? 1 : a.localeCompare(b)));
  return files.flatMap((f) => LexiconSchema.parse(content.readYaml(`lexicon/${f}`) ?? []));
}
