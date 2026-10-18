// Shell slots a course may add (Japanese): course Settings rows, My words tabs, done and climb badges.
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CourseProvider } from '@ladder/core/course/context';
import type { CourseConfig } from '@ladder/core/course/types';
import { ProgressProvider } from '@ladder/core/components/ProgressProvider';
import { SettingsView } from '@ladder/core/components/SettingsView';
import { WordsView } from '@ladder/core/components/WordsView';
import * as store from '@ladder/core/lib/progress/store';
import { fakeArabic } from './fakeCourse';

const wrap = (config: CourseConfig, ui: React.ReactNode) =>
  render(
    <CourseProvider config={config}>
      <ProgressProvider>{ui}</ProgressProvider>
    </CourseProvider>,
  );

describe('course Settings rows', () => {
  it('renders toggles and choices in their groups, and saves them', () => {
    const config: CourseConfig = {
      ...fakeArabic,
      settings: {
        ...fakeArabic.settings,
        rows: [
          { group: 'display', key: 'pitchMarks', labelKey: 'settings.sfx' },
          { group: 'study', key: 'deckDaily', labelKey: 'settings.speed', options: [{ value: 5, label: '5' }, { value: 10, label: '10' }] },
        ],
      },
    };
    wrap(config, <SettingsView />);
    expect(screen.getByRole('heading', { name: /Belajar|Study/ })).toBeTruthy();
    const group = screen.getAllByRole('radiogroup').find((g) => g.textContent === '510')!;
    fireEvent.click(group.querySelectorAll('button')[0]);
    store.flush();
    expect(store.getState().settings.deckDaily).toBe(5);
  });

  it('adds nothing without rows', () => {
    wrap(fakeArabic, <SettingsView />);
    expect(screen.queryByRole('heading', { name: /Belajar|Study/ })).toBeNull();
  });
});

describe('My words tabs', () => {
  it('shows one segment per tab and opens the panel named by the hash', () => {
    window.location.hash = '#kanji';
    const config: CourseConfig = {
      ...fakeArabic,
      words: {
        tabs: {
          titleKey: 'words.title',
          list: [
            { hash: 'deck', labelKey: 'nav.home', Panel: () => <p>deck panel</p> },
            { hash: 'kanji', labelKey: 'nav.me', Panel: ({ data }) => <p>kanji panel {String(data)}</p> },
          ],
        },
      },
    };
    wrap(config, <WordsView lessons={[]} tabData="x" />);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByText('kanji panel x')).toBeTruthy();
    window.location.hash = '';
  });
});
