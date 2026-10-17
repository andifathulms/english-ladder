import { describe, expect, it } from 'vitest';
import { translate, baseStrings } from '@ladder/core/lib/i18n';
import { id } from '@ladder/core/lib/i18n/id';
import { en } from '@ladder/core/lib/i18n/en';
import { course } from '@/course.config';

describe('i18n', () => {
  it('has the same keys in both languages', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(id).sort());
  });
  it("the course's merged strings keep the base keys (overrides add none)", () => {
    expect(Object.keys(course.strings.id).sort()).toEqual(Object.keys(id).sort());
    expect(Object.keys(course.strings.en).sort()).toEqual(Object.keys(en).sort());
  });
  it('interpolates variables', () => {
    expect(translate(baseStrings, 'id', 'lesson.stepAnnounce', { n: 3, name: 'Contoh' })).toBe(
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
