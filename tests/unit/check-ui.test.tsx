import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { OptionPill } from '@/components/check/OptionPill';
import { CheckItemView } from '@/components/check/CheckItemView';
import { ProgressProvider } from '@/components/ProgressProvider';
import { BottomActionBar } from '@/components/lesson/BottomActionBar';
import type { CheckItem } from '@/lib/types';

const wrap = (ui: React.ReactNode) => render(<ProgressProvider>{ui}</ProgressProvider>);
const why = { id: 'On: di atas permukaan.', en: 'On: on top of a surface.' };
const item: CheckItem = {
  id: 'x1',
  type: 'gap',
  cue: 'Kuncinya di atas meja.',
  prompt: 'The keys are ___ the table.',
  options: ['in', 'on', 'at'],
  answer: 'on',
  why,
};

describe('OptionPill', () => {
  it.each(['idle', 'correct', 'wrong', 'selected'] as const)('renders %s state', (state) => {
    wrap(<OptionPill label="on" state={state} index={0} onClick={() => {}} />);
    const b = screen.getByRole('button', { name: 'on' });
    expect(b).toHaveAttribute('data-state', state);
    expect(b).toHaveAttribute('lang', 'en');
  });
  it('is disabled when told', () => {
    wrap(<OptionPill label="in" state="wrong" index={0} disabled onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'in' })).toBeDisabled();
  });
});

describe('CheckItemView (practice)', () => {
  it('keeps the item open on a wrong answer, then solves with firstTry=false', () => {
    const onSolved = vi.fn();
    wrap(<CheckItemView mode="practice" item={item} onSolved={onSolved} />);
    fireEvent.click(screen.getByRole('button', { name: 'in' }));
    expect(screen.getByText('Belum tepat, coba lagi.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'in' })).toBeDisabled();
    expect(onSolved).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'on' }));
    expect(onSolved).toHaveBeenCalledWith(false);
    expect(screen.getByText(why.id)).toBeInTheDocument();
  });

  it('shows the why line as a hint after two misses', () => {
    wrap(<CheckItemView mode="practice" item={item} onSolved={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'in' }));
    expect(screen.queryByText(why.id)).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'at' }));
    expect(screen.getByText(why.id)).toBeInTheDocument();
  });

  it('picks answers with number keys', () => {
    const onSolved = vi.fn();
    wrap(<CheckItemView mode="practice" item={item} onSolved={onSolved} />);
    fireEvent.keyDown(window, { key: '2' });
    expect(onSolved).toHaveBeenCalledWith(true);
  });
});

describe('feedback sheet', () => {
  it('leaves the why line to the sheet when whyInSheet is set', () => {
    wrap(<CheckItemView mode="practice" item={item} onSolved={() => {}} whyInSheet />);
    fireEvent.click(screen.getByRole('button', { name: 'on' }));
    expect(screen.queryByText(why.id)).toBeNull();
  });

  it('still shows the hint after two misses with whyInSheet', () => {
    wrap(<CheckItemView mode="practice" item={item} onSolved={() => {}} whyInSheet />);
    fireEvent.click(screen.getByRole('button', { name: 'in' }));
    fireEvent.click(screen.getByRole('button', { name: 'at' }));
    expect(screen.getByText(why.id)).toBeInTheDocument();
  });

  it('shows Tepat and the why line in the bottom bar', () => {
    wrap(
      <BottomActionBar feedback={why}>
        <button type="button">Lanjut</button>
      </BottomActionBar>,
    );
    expect(screen.getByText('Tepat')).toBeInTheDocument();
    expect(screen.getByText(why.id)).toBeInTheDocument();
  });
});

describe('CheckItemView (listen)', () => {
  const listen: CheckItem = {
    id: 'l1',
    type: 'listen',
    audio: "I'm tired.",
    options: ["I'm tired.", 'I tired.'],
    answer: "I'm tired.",
    why,
  };
  it('shows the sentence when the browser has no English voice, and still grades', () => {
    const onSolved = vi.fn();
    wrap(<CheckItemView mode="practice" item={listen} onSolved={onSolved} />);
    expect(screen.getByText(/tidak punya suara bahasa Inggris/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: "I'm tired." }));
    expect(onSolved).toHaveBeenCalledWith(true);
  });
});
