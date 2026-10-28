import { describe, expect, it } from 'vitest';
import { audioKey } from '@ladder/core/lib/speech/audio';
import { allAudio } from '@/course/audio';
import { getCurriculum } from '@/course/content';
import { course } from '@/course.config';

describe('recordings (PRD §5.6)', () => {
  const rows = allAudio(getCurriculum().filter((r) => r.status === 'live'));

  it('lists Dasar pairs and words, every Tirukan sentence and the España lines', () => {
    const kinds = new Set(rows.map((r) => r.kind));
    expect(kinds).toEqual(new Set(['pair', 'word', 'tirukan', 'spain']));
    expect(rows.filter((r) => r.kind === 'tirukan')).toHaveLength(30);
    expect(rows.some((r) => r.text === 'perro') && rows.some((r) => r.text === 'pero')).toBe(true);
    expect(rows.filter((r) => r.kind === 'spain').every((r) => r.variety === 'es')).toBe(true);
  });

  it('keys match what the app plays: case and ¿ ¡ never matter, the variety does', () => {
    expect(course.audio?.defaultVariety).toBe('latam');
    const perro = rows.find((r) => r.text === 'perro')!;
    expect(perro.key).toBe(audioKey('Perro'));
    expect(audioKey('¿Cómo estás?', 'es')).not.toBe(audioKey('¿Cómo estás?', 'latam'));
    expect(new Set(rows.map((r) => r.key)).size).toBe(rows.length);
  });
});
