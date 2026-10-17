import { describe, expect, it } from 'vitest';
import { translate } from '@ladder/core/lib/i18n';
import { course } from '@/course.config';

// Arabic Ladder's merged tables: the engine's base plus its overrides and own keys.
const { id, en } = course.strings as unknown as Record<'id' | 'en', Record<string, string>>;

describe('i18n', () => {
  it('has the same keys in both languages', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(id).sort());
  });
  it('interpolates variables', () => {
    expect(translate(course.strings, 'id', 'lesson.stepAnnounce', { n: 3, name: 'Contoh' })).toBe(
      'Langkah 3 dari 6: Contoh',
    );
  });
  it('never uses exclamation marks in feedback copy', () => {
    for (const k of ['check.wrong', 'check.correct', 'test.notYet'] as const) {
      expect(id[k]).not.toContain('!');
      expect(en[k]).not.toContain('!');
    }
  });
});
