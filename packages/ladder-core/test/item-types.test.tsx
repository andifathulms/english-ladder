// A course can add its own check-item types: grading/text logic registered once, rendering
// through CourseConfig.check. The engine's flow (pick, misses, solved) stays the same.
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CourseProvider } from '@ladder/core/course/context';
import type { CourseConfig } from '@ladder/core/course/types';
import { ProgressProvider } from '@ladder/core/components/ProgressProvider';
import { CheckItemView } from '@ladder/core/components/check/CheckItemView';
import { registerItemTypes } from '@ladder/core/lib/check/itemTypes';
import { grade } from '@ladder/core/lib/check/grade';
import { answerText, itemText } from '@ladder/core/lib/check/text';
import type { CheckItem, ExtraItem } from '@ladder/core/lib/types';
import { fakeArabic } from './fakeCourse';

type Mark = ExtraItem & { word: string; options: string[]; answer: string };

registerItemTypes({
  mark: {
    grade: (item, r) => r === (item as Mark).answer,
    itemText: (item) => (item as Mark).word,
    answerText: (item) => `${(item as Mark).word} · ${(item as Mark).answer}`,
    sentences: (item) => [(item as Mark).word],
    options: (item) => (item as Mark).options,
  },
  spell: {
    grade: (item, r) => (Array.isArray(r) ? r.join('') : r) === (item as Mark).answer,
    itemText: () => 'spell',
    answerText: (item) => (item as Mark).answer,
    sentences: (item) => [(item as Mark).answer],
    tiles: (item) => ({ tiles: [...(item.letters as string[])].reverse(), answer: item.letters as string[] }),
  },
});

const course: CourseConfig = {
  ...fakeArabic,
  check: {
    types: {
      mark: {
        Prompt: ({ item }) => <p data-testid="mark-prompt">{(item as Mark).word}</p>,
        Option: ({ value, state, onClick }) => (
          <button type="button" data-mark={value} data-state={state} onClick={onClick}>
            {value}
          </button>
        ),
        optionsLabel: 'marks',
      },
      spell: { Prompt: () => <p data-testid="spell-prompt">spell it</p> },
    },
  },
};

const wrap = (ui: React.ReactNode) =>
  render(
    <CourseProvider config={course}>
      <ProgressProvider>{ui}</ProgressProvider>
    </CourseProvider>,
  );

const mark = { id: 'm1', type: 'mark', word: 'kataba', options: ['fatha', 'kasra'], answer: 'fatha', why: { id: 'a', en: 'b' } } as unknown as CheckItem;
const spell = { id: 's1', type: 'spell', letters: ['k', 't', 'b'], answer: 'ktb', why: { id: 'a', en: 'b' } } as unknown as CheckItem;

describe('course item types', () => {
  it('grade and text go through the registered logic', () => {
    expect(grade(mark, 'fatha', fakeArabic.text).correct).toBe(true);
    expect(grade(mark, 'kasra', fakeArabic.text).correct).toBe(false);
    expect(itemText(mark)).toBe('kataba');
    expect(answerText(mark)).toBe('kataba · fatha');
  });

  it('renders the course prompt and options, and runs the usual pick flow', () => {
    const onSolved = vi.fn();
    wrap(<CheckItemView item={mark} mode="practice" onSolved={onSolved} />);
    expect(screen.getByTestId('mark-prompt').textContent).toBe('kataba');
    expect(screen.getByRole('group', { name: 'marks' })).toBeTruthy();
    fireEvent.click(document.querySelector('[data-mark="kasra"]')!);
    expect(document.querySelector('[data-mark="kasra"]')!.getAttribute('data-state')).toBe('wrong');
    fireEvent.click(document.querySelector('[data-mark="fatha"]')!);
    expect(onSolved).toHaveBeenCalledWith(false);
    expect(document.querySelector('[data-mark="fatha"]')!.getAttribute('data-state')).toBe('correct');
  });

  it('a type with tiles uses the tile tray and grades the placed tiles', () => {
    const onSolved = vi.fn();
    wrap(<CheckItemView item={spell} mode="practice" onSolved={onSolved} />);
    expect(screen.getByTestId('spell-prompt')).toBeTruthy();
    for (const l of ['k', 't', 'b']) fireEvent.click(screen.getAllByRole('button', { name: l })[0]);
    fireEvent.click(screen.getByRole('button', { name: /^(Periksa|Check)$/ }));
    expect(onSolved).toHaveBeenCalledWith(true);
  });

  it('equals in the text rules decides answer equality', () => {
    const text = { ...fakeArabic.text, equals: (a: string, b: string) => a.toLowerCase() === b.toLowerCase() };
    const item = { id: 'c', type: 'choice', prompt: 'p', options: ['Ya', 'No'], answer: 'ya', why: { id: '', en: '' } } as CheckItem;
    expect(grade(item, 'Ya', text).correct).toBe(true);
  });
});

import { tilesNeeded } from '@ladder/core/lib/check/itemTypes';

describe('tile items in tests', () => {
  it('counts the answer tiles of course tile types (a spell item is answered once all letters are placed)', () => {
    expect(tilesNeeded(spell)).toBe(3);
    expect(tilesNeeded(mark)).toBe(0);
  });
});

import { overrideItemText } from '@ladder/core/lib/check/itemTypes';

describe('engine item text overrides', () => {
  it('a course can word a core type its own way', () => {
    const listen = { id: 'l', type: 'listen', audio: 'x', options: ['a', 'b'], answer: 'a', why: { id: '', en: '' } } as CheckItem;
    expect(itemText(listen)).toBe('Listen and choose.');
    overrideItemText('listen', () => 'Dengarkan, lalu pilih.');
    expect(itemText(listen)).toBe('Dengarkan, lalu pilih.');
  });
});
