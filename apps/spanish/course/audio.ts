// Build-time only: what Spanish Ladder records (PRD §5.6, CLAUDE.md §5.4). The lightest audio of the
// five apps: Dasar's sound words and minimal/stress pairs, every Tirukan sentence, and the España
// rows in a Spain voice. Everything else plays with the browser's Spanish voice. Keys are core's:
// sha1(normEs(text) + '|' + variety), so a recording plays wherever the same text appears.
import { configureAudio, audioKey } from '@ladder/core/lib/speech/audio';
import { stripMarkup } from '@ladder/core/lib/markup';
import { normEs } from '@/lib/es/text';
import { getLessons, getTestPool } from './content';
import type { Rung } from './types';

// Scripts key clips exactly as the app does (startCourse: normalise = normEs, default variety latam).
configureAudio({ normalise: (s) => normEs(s), defaultVariety: 'latam' });

export type AudioRow = { key: string; file: string; kind: 'pair' | 'word' | 'tirukan' | 'spain'; text: string; variety: 'latam' | 'es'; where: string };

export function allAudio(rungs: Rung[]): AudioRow[] {
  const rows = new Map<string, AudioRow>();
  const add = (kind: AudioRow['kind'], raw: string, where: string, variety: 'latam' | 'es' = 'latam') => {
    const text = stripMarkup(raw).trim();
    const key = audioKey(text, variety);
    if (!rows.has(key)) rows.set(key, { key, file: key, kind, text, variety, where });
  };
  for (const r of rungs) {
    for (const l of getLessons(r.id, { includeDrafts: true })) {
      if (r.tier === 'dasar') {
        for (const [a, b] of l.sound?.pairs ?? []) {
          add('pair', a, l.id);
          add('pair', b, l.id);
        }
        for (const w of l.sound?.words ?? []) add('word', w, l.id);
        for (const c of l.check) if (c.type === 'stress') add('pair', c.word, l.id);
        for (const c of l.check) if (c.type === 'listen') add('pair', c.audio, l.id);
      }
      add('tirukan', l.tirukan.es, l.id);
      for (const row of l.spain?.rows ?? []) add('spain', row.es, l.id, 'es');
    }
    if (r.tier === 'dasar') {
      for (const c of getTestPool(r.id)?.items ?? []) {
        if (c.type === 'stress') add('pair', c.word, `${r.id}/test.yaml`);
        if (c.type === 'listen') add('pair', c.audio, `${r.id}/test.yaml`, c.variety === 'es' ? 'es' : 'latam');
      }
    }
  }
  return [...rows.values()];
}
