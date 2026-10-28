// Grade notes (GradeResult.note) and the grade context: a course type can accept an answer with a
// note (Spanish: accepted without its accents), shown inline or in the feedback sheet.
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CourseProvider } from '@ladder/core/course/context';
import type { AnswerProps, CourseConfig } from '@ladder/core/course/types';
import { ProgressProvider } from '@ladder/core/components/ProgressProvider';
import { CheckItemView } from '@ladder/core/components/check/CheckItemView';
import { BottomActionBar } from '@ladder/core/components/lesson/BottomActionBar';
import { registerItemTypes } from '@ladder/core/lib/check/itemTypes';
import { grade } from '@ladder/core/lib/check/grade';
import type { CheckItem, ExtraItem } from '@ladder/core/lib/types';
import { fakeArabic } from './fakeCourse';

registerItemTypes({
  noted: {
    grade: (item, r, _text, ctx) => {
      if (r === 'esta') return ctx?.settings?.strict ? false : { correct: true, note: { key: 'note.accent', params: { answer: 'está' } } };
      return r === 'está';
    },
    itemText: () => 'noted',
    answerText: () => 'está',
    sentences: () => ['está'],
  },
});

const noted = { id: 'n1', type: 'noted', why: { id: 'Kenapa.', en: 'Why.' } } as unknown as CheckItem;

const course: CourseConfig = {
  ...fakeArabic,
  strings: {
    id: { ...fakeArabic.strings.id, 'note.accent': 'Hampir: *{answer}*' } as never,
    en: { ...fakeArabic.strings.en, 'note.accent': 'Almost: *{answer}*' } as never,
  },
  check: {
    types: {
      noted: {
        Prompt: () => <p>prompt</p>,
        Answer: ({ submit }: AnswerProps) => (
          <>
            <button type="button" onClick={() => submit('esta')}>
              lenient
            </button>
            <button type="button" onClick={() => submit('está')}>
              exact
            </button>
          </>
        ),
      },
    },
  },
};

const wrap = (ui: React.ReactNode) =>
  render(
    <CourseProvider config={course}>
      <ProgressProvider>{ui}</ProgressProvider>
    </CourseProvider>,
  );

describe('grade notes', () => {
  it('grade() turns a boolean into a result and passes a result through', () => {
    expect(grade(noted, 'está', fakeArabic.text)).toEqual({ correct: true });
    expect(grade(noted, 'esta', fakeArabic.text)).toEqual({ correct: true, note: { key: 'note.accent', params: { answer: 'está' } } });
    expect(grade(noted, 'esta', fakeArabic.text, { settings: { strict: true } as never }).correct).toBe(false);
  });

  it('a noted answer is solved and the note shows with the why line', () => {
    const onSolved = vi.fn();
    wrap(<CheckItemView item={noted} mode="practice" onSolved={onSolved} />);
    fireEvent.click(screen.getByRole('button', { name: 'lenient' }));
    expect(onSolved).toHaveBeenCalledWith(true, { key: 'note.accent', params: { answer: 'está' } });
    expect(document.querySelector('[data-note]')!.textContent).toBe('Hampir: está');
    expect(document.querySelector('[data-note] em')!.textContent).toBe('está');
  });

  it('an exact answer has no note, and onSolved keeps its one-argument call', () => {
    const onSolved = vi.fn();
    wrap(<CheckItemView item={noted} mode="practice" onSolved={onSolved} />);
    fireEvent.click(screen.getByRole('button', { name: 'exact' }));
    expect(onSolved).toHaveBeenCalledWith(true);
    expect(document.querySelector('[data-note]')).toBeNull();
  });

  it('the feedback sheet shows a note under the why line, and nothing without one', () => {
    const a = wrap(
      <BottomActionBar feedback={{ id: 'Kenapa.', en: 'Why.' }} note={{ key: 'note.accent', params: { answer: 'está' } }}>
        <span />
      </BottomActionBar>,
    );
    expect(a.container.querySelector('[data-note]')!.textContent).toBe('Hampir: está');
    a.unmount();
    const b = wrap(
      <BottomActionBar feedback={{ id: 'Kenapa.', en: 'Why.' }}>
        <span />
      </BottomActionBar>,
    );
    expect(b.container.querySelector('[data-note]')).toBeNull();
  });
});
