// AccentBar (CourseConfig.input.accentKeys): inserts at the cursor, keeps focus, names its keys.
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { useRef, useState } from 'react';
import { CourseProvider } from '@ladder/core/course/context';
import type { CourseConfig } from '@ladder/core/course/types';
import { ProgressProvider } from '@ladder/core/components/ProgressProvider';
import { AccentBar, insertAtCursor } from '@ladder/core/components/ui/AccentBar';
import { fakeArabic } from './fakeCourse';

const keys = [
  { char: 'á', labelKey: 'key.a' },
  { char: 'ñ', labelKey: 'key.n' },
];
const withKeys: CourseConfig = {
  ...fakeArabic,
  input: { accentKeys: keys },
  strings: {
    id: { ...fakeArabic.strings.id, 'key.a': 'a dengan aksen', 'key.n': 'eñe' } as never,
    en: { ...fakeArabic.strings.en, 'key.a': 'a with an accent', 'key.n': 'eñe' } as never,
  },
};

function Field() {
  const ref = useRef<HTMLInputElement>(null);
  const [v, setV] = useState('esta');
  return (
    <>
      <input ref={ref} aria-label="field" value={v} onChange={(e) => setV(e.target.value)} />
      <output data-testid="value">{v}</output>
      <AccentBar target={ref} />
    </>
  );
}

const wrap = (config: CourseConfig) =>
  render(
    <CourseProvider config={config}>
      <ProgressProvider>
        <Field />
      </ProgressProvider>
    </CourseProvider>,
  );

describe('AccentBar', () => {
  it('renders nothing when the course has no keys', () => {
    const r = wrap(fakeArabic);
    expect(r.queryByRole('group')).toBeNull();
  });

  it('inserts at the cursor, replacing a selection, and React sees the change', () => {
    const r = wrap(withKeys);
    const input = r.getByLabelText('field') as HTMLInputElement;
    input.focus();
    input.setSelectionRange(3, 4); // the final "a"
    fireEvent.click(r.getByRole('button', { name: 'a dengan aksen' }));
    expect(r.getByTestId('value').textContent).toBe('está');
    expect(document.activeElement).toBe(input);
    expect(input.selectionStart).toBe(4);
  });

  it('a key press never takes focus from the field', () => {
    const r = wrap(withKeys);
    const key = r.getByRole('button', { name: 'eñe' });
    const down = new MouseEvent('pointerdown', { bubbles: true, cancelable: true });
    key.dispatchEvent(down);
    expect(down.defaultPrevented).toBe(true);
  });

  it('insertAtCursor appends at the end without a selection', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.value = 'ma';
    input.setSelectionRange(2, 2);
    insertAtCursor(input, 'ñ');
    expect(input.value).toBe('mañ');
    input.remove();
  });
});
