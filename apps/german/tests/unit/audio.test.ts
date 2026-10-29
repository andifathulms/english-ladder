import { describe, expect, it } from 'vitest';
import { audioKey } from '@ladder/core/lib/speech/audio';
import { allAudio } from '@/course/audio';
import { getCurriculum } from '@/course/content';
import { course } from '@/course.config';

describe('recordings (CLAUDE.md §5.4)', () => {
  const rows = allAudio(getCurriculum().filter((r) => r.status === 'live'));

  it('lists Dasar pairs and words and every Tirukan sentence', () => {
    expect(new Set(rows.map((r) => r.kind))).toEqual(new Set(['pair', 'word', 'tirukan']));
    expect(rows.filter((r) => r.kind === 'tirukan')).toHaveLength(30);
    expect(rows.some((r) => r.text === 'schön') && rows.some((r) => r.text === 'schon')).toBe(true);
  });

  it('keys match what the app plays (the course normaliser, no variety)', () => {
    const play = (s: string) => audioKey(s, undefined, course.text.normalise);
    const schoen = rows.find((r) => r.text === 'schön')!;
    expect(schoen.key).toBe(play('„schön“'));
    expect(audioKey('Guten Tag!', undefined, course.text.normalise)).toBe(audioKey('Guten Tag', undefined, course.text.normalise));
    expect(new Set(rows.map((r) => r.key)).size).toBe(rows.length);
  });
});
