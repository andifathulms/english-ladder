// Ladder slots a course may turn on: the long-rung notch line and the course's level label.
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { CourseProvider } from '@ladder/core/course/context';
import type { CourseConfig } from '@ladder/core/course/types';
import { ProgressProvider } from '@ladder/core/components/ProgressProvider';
import { NotchBar } from '@ladder/core/components/ladder/NotchBar';
import { useLevel } from '@ladder/core/components/ui/useCefr';
import type { Rung } from '@ladder/core/lib/types';
import { fakeArabic } from './fakeCourse';

const wrap = (config: CourseConfig, ui: React.ReactNode) =>
  render(
    <CourseProvider config={config}>
      <ProgressProvider>{ui}</ProgressProvider>
    </CourseProvider>,
  );

function Level({ rung }: { rung: Rung }) {
  return <span data-testid="level">{useLevel()(rung)}</span>;
}

describe('ladder slots', () => {
  it('long rungs get the count line only when the course turns it on', () => {
    const long = { ...fakeArabic, ladder: { ...fakeArabic.ladder, longRung: { minLessons: 18 } } };
    const a = wrap(long, <NotchBar total={18} done={3} />);
    expect(a.container.textContent).toContain('3 / 18');
    a.unmount();
    const b = wrap(fakeArabic, <NotchBar total={18} done={3} />);
    expect(b.container.textContent).not.toContain('3 / 18');
  });

  it('the level label is the CEFR unless the adapter gives one', () => {
    const rung = { id: 'r', cefr: 'A1', hsk: '1' } as unknown as Rung;
    const a = wrap(fakeArabic, <Level rung={rung} />);
    expect(a.getByTestId('level').textContent).toBe('A1');
    a.unmount();
    const own = { ...fakeArabic, adapter: { ...fakeArabic.adapter, rung: { levelLabel: (r: Rung) => `HSK ${(r as unknown as { hsk: string }).hsk}` } } };
    const b = wrap(own, <Level rung={rung} />);
    expect(b.getByTestId('level').textContent).toBe('HSK 1');
  });
});

describe('two-door welcome', () => {
  it('shows a course line under door 1 only when the course gives one (home.DoorNote)', async () => {
    const { TwoDoorWelcome } = await import('@ladder/core/components/ladder/TwoDoorWelcome');
    const a = wrap(fakeArabic, <TwoDoorWelcome firstHref="/rung/a/" placementHref="/placement/" />);
    expect(a.queryByTestId('door-note')).toBeNull();
    a.unmount();
    const withNote = { ...fakeArabic, home: { ...fakeArabic.home, DoorNote: () => <p data-testid="door-note">Mulai dari Dasar.</p> } };
    const b = wrap(withNote, <TwoDoorWelcome firstHref="/rung/a/" placementHref="/placement/" />);
    expect(b.getByTestId('door-note').textContent).toBe('Mulai dari Dasar.');
    b.unmount();
    // No first door, no note under it.
    const c = wrap(withNote, <TwoDoorWelcome firstHref={null} placementHref="/placement/" />);
    expect(c.queryByTestId('door-note')).toBeNull();
  });
});
