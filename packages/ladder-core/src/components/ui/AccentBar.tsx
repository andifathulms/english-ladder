'use client';

import type { RefObject } from 'react';
import { useCourse } from '@ladder/core/course/context';
import { useT } from '../ProgressProvider';

type Field = HTMLInputElement | HTMLTextAreaElement;

/**
 * Inserts text at a field's selection (replacing any selected text), as typing would: the value is
 * set through the native setter and an `input` event fires, so React's onChange sees it. The caret
 * lands after the insertion and the field keeps focus.
 */
export function insertAtCursor(field: Field, text: string) {
  const start = field.selectionStart ?? field.value.length;
  const end = field.selectionEnd ?? start;
  const next = field.value.slice(0, start) + text + field.value.slice(end);
  const proto = field instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, 'value')!.set!.call(field, next);
  field.dispatchEvent(new Event('input', { bubbles: true }));
  field.focus();
  field.setSelectionRange(start + text.length, start + text.length);
}

/**
 * A row of keys under a text field for letters a phone keyboard hides (CourseConfig.input.accentKeys):
 * Spanish á é í ó ú ü ñ ¿ ¡. Each key inserts at the cursor of `target` (the field, or the last
 * focused one) and has an accessible name. Pressing a key never takes focus from the field.
 */
export function AccentBar({ target }: { target: RefObject<Field | null> }) {
  const { t } = useT();
  const keys = useCourse().input?.accentKeys ?? [];
  if (!keys.length) return null;
  const tr = t as (k: string) => string;
  return (
    <div role="group" aria-label={tr('accentBar.label')} className="flex flex-wrap gap-1">
      {keys.map((k) => (
        <button
          key={k.char}
          type="button"
          aria-label={tr(k.labelKey)}
          // Keep the field focused (and the phone keyboard open) while the key is pressed.
          onPointerDown={(e) => e.preventDefault()}
          onClick={() => target.current && insertAtCursor(target.current, k.char)}
          className="flex h-[34px] min-w-[34px] items-center justify-center rounded-sm bg-paper-2 px-2 font-body text-body text-ink transition-colors duration-quick hover:bg-accent-soft"
        >
          {k.char}
        </button>
      ))}
    </div>
  );
}
