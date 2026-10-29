// Build-time only: what German Ladder records (PRD §4.4, CLAUDE.md §5.4): Dasar's sound words and
// minimal pairs, its listen items, and every Tirukan sentence. Everything else plays with the browser's
// de-DE voice. Keys are core's: sha1(baseDe(text) + '|'), so a recording plays wherever the same text
// appears.
import { configureAudio, audioKey } from '@ladder/core/lib/speech/audio';
import { stripMarkup } from '@ladder/core/lib/markup';
import { baseDe } from '@/lib/de/text';
import { getLessons, getTestPool } from './content';
import type { Rung } from './types';

// Scripts key clips exactly as the app does (startCourse: normalise = course.text.normalise = baseDe).
configureAudio({ normalise: (s) => baseDe(s) });

export type AudioRow = { key: string; file: string; kind: 'pair' | 'word' | 'tirukan'; text: string; where: string };

export function allAudio(rungs: Rung[]): AudioRow[] {
  const rows = new Map<string, AudioRow>();
  const add = (kind: AudioRow['kind'], raw: string, where: string) => {
    const text = stripMarkup(raw).trim();
    const key = audioKey(text);
    if (!rows.has(key)) rows.set(key, { key, file: key, kind, text, where });
  };
  for (const r of rungs) {
    for (const l of getLessons(r.id, { includeDrafts: true })) {
      if (r.tier === 'dasar') {
        for (const [a, b] of l.sound?.pairs ?? []) {
          add('pair', a, l.id);
          add('pair', b, l.id);
        }
        for (const w of l.sound?.words ?? []) add('word', w, l.id);
        for (const c of l.check) if (c.type === 'listen' || c.type === 'dictation') add('pair', c.audio, l.id);
      }
      add('tirukan', l.tirukan.de, l.id);
    }
    if (r.tier === 'dasar') {
      for (const c of getTestPool(r.id)?.items ?? []) if (c.type === 'listen' || c.type === 'dictation') add('pair', c.audio, `${r.id}/test.yaml`);
    }
  }
  return [...rows.values()];
}
