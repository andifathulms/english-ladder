'use client';

import { parseInline } from '@ladder/core/lib/markup';
import { IconCheck, IconClose } from '../ui/Icon';
import { useCourse } from '@ladder/core/course/context';

export type PillState = 'idle' | 'correct' | 'wrong' | 'selected' | 'answer';

type Props = {
  label: string;
  state: PillState;
  index: number;
  disabled?: boolean;
  onClick: () => void;
  wide?: boolean;
};

const styles: Record<PillState, React.CSSProperties> = {
  idle: { background: 'var(--surface)', color: 'var(--ink)', borderColor: 'var(--rule)' },
  selected: { background: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' },
  correct: { background: 'var(--good-bg)', color: 'var(--good)', borderColor: 'var(--good)' },
  answer: { background: 'var(--good-bg)', color: 'var(--good)', borderColor: 'var(--good)' },
  wrong: { background: 'var(--off-bg)', color: 'var(--off)', borderColor: 'var(--off-bg)' },
};

export function OptionPill({ label, state, index, disabled, onClick, wide }: Props) {
  const { target } = useCourse();
  const text = parseInline(label).map((t) => t.v).join('');
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={state === 'selected' || state === 'correct' ? true : undefined}
      aria-keyshortcuts={index < 4 ? String(index + 1) : undefined}
      data-state={state}
      lang={target.lang}
      dir={target.dir}
      className={`inline-flex min-h-pill items-center gap-2 border-2 px-5 py-2 text-start font-body text-body font-semibold transition-colors duration-quick ${
        wide ? 'w-full rounded-md' : 'rounded-full'
      } ${state === 'idle' && !disabled ? 'hover:border-accent' : ''}`}
      style={styles[state]}
    >
      {(state === 'correct' || state === 'answer') && <IconCheck size={18} draw className="shrink-0" />}
      {state === 'wrong' && <IconClose size={16} className="shrink-0" />}
      <span className={state === 'wrong' ? 'line-through decoration-[1.5px]' : undefined}>{text}</span>
    </button>
  );
}
