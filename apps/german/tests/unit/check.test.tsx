import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CheckItemView } from '@ladder/core/components/check/CheckItemView';
import type { CheckItem } from '@ladder/core/lib/types';
import { AllProviders } from '../providers';
import { changedLetters } from '@/components/de/CaseWord';

const why = { id: 'Alasannya.', en: 'The reason.' };
const practice = (item: Record<string, unknown>) => {
  const onSolved = vi.fn();
  const r = render(
    <AllProviders>
      <CheckItemView mode="practice" item={{ why, ...item } as unknown as CheckItem} onSolved={onSolved} />
    </AllProviders>,
  );
  return { ...r, onSolved };
};
const typeAndCheck = (label: string, text: string) => {
  fireEvent.change(screen.getByRole('textbox', { name: label }), { target: { value: text } });
  fireEvent.click(screen.getByRole('button', { name: 'Periksa' }));
};

describe('typed answers (DESIGN §6)', () => {
  const form = { id: 'f1', type: 'form', base: 'fahren', target: { person: 'er', tense: 'praesens' }, answer: 'fährt', spelling: 'lenient', nounCaps: true };
  it('a digraph passes with a note naming the right spelling', () => {
    const { onSolved, container } = practice(form);
    typeAndCheck('Bentuknya', 'faehrt');
    expect(onSolved).toHaveBeenCalledWith(true, { key: 'check.spelling.digraph', params: { answer: 'fährt' } });
    expect(container.querySelector('[data-note]')?.textContent).toContain('fährt');
  });
  it('a noun without its capital fails, with the caps hint under the field', () => {
    const d = { id: 'd1', type: 'dictation', audio: 'Ich habe einen Bruder.', answer: 'Ich habe einen Bruder.', spelling: 'lenient', nounCaps: true };
    const { onSolved, container } = practice(d);
    typeAndCheck('Kalimatnya', 'ich habe einen bruder');
    expect(onSolved).not.toHaveBeenCalled();
    expect(container.querySelector('[data-caps-hint]')?.textContent).toBe('Kata benda selalu diawali huruf besar: Bruder.');
  });
  it('shows the accent bar with seven keys', () => {
    practice(form);
    expect(screen.getByRole('group', { name: 'Huruf khusus' }).querySelectorAll('button')).toHaveLength(7);
  });
});

describe('gender items', () => {
  it('three large chips; the right one solves', () => {
    const { onSolved, container } = practice({ id: 'g1', type: 'gender', noun: 'Zeitung', answer: 'f' });
    const chips = [...container.querySelectorAll('[data-gender]')].map((c) => c.getAttribute('data-gender'));
    expect(chips).toEqual(['m', 'f', 'n']);
    fireEvent.click(container.querySelector('[data-gender="m"]')!.closest('button')!);
    expect(onSolved).not.toHaveBeenCalled();
    fireEvent.click(container.querySelector('[data-gender="f"]')!.closest('button')!);
    expect(onSolved).toHaveBeenCalledWith(false);
  });
});

describe('case items', () => {
  const item = { id: 'k1', type: 'case', sentence: 'Ich habe ___ Bruder.', role: 'akk', noun: 'Bruder', options: ['einen', 'ein', 'einem'], answer: 'einen' };
  it('labels the role, and once solved colours only the changed letters', () => {
    const { container } = practice(item);
    expect(container.textContent).toContain('Akk');
    fireEvent.click(screen.getByRole('button', { name: /einen/ }));
    const coloured = container.querySelector('.case-akk:not(.label)');
    expect(coloured?.textContent).toBe('en');
    expect(coloured?.parentElement?.textContent).toBe('einen');
  });
  it('changed letters against the nominative', () => {
    expect(changedLetters('den', 'akk')).toEqual({ stem: 'de', changed: 'n' });
    expect(changedLetters('dem', 'dat')).toEqual({ stem: 'de', changed: 'm' });
    expect(changedLetters('einem', 'dat')).toEqual({ stem: 'ein', changed: 'em' });
    expect(changedLetters('der', 'nom')).toEqual({ stem: 'der', changed: '' });
  });
});

describe('wordorder items (CLAUDE.md §5.2)', () => {
  const item = { id: 'w1', type: 'wordorder', tiles: ['auf', 'Ich', 'um 6 Uhr', 'stehe'], answer: ['Ich', 'stehe', 'um 6 Uhr', 'auf'], zones: ['p1', 'verb', 'middle', 'end'] };
  const place = (container: HTMLElement, words: string[]) => {
    for (const w of words) fireEvent.click(container.querySelector(`[data-tile="${w}"]`)!);
  };
  it('accepts another valid order and shows the bracket zones', () => {
    const { container, onSolved } = practice(item);
    place(container, ['um 6 Uhr', 'stehe', 'Ich', 'auf']);
    const zones = [...container.querySelectorAll('[data-zone]')].map((z) => `${z.getAttribute('data-zone')}:${z.querySelector('[lang]')?.textContent}`);
    expect(zones).toEqual(['p1:um 6 Uhr', 'verb:stehe', 'middle:Ich', 'end:auf']);
    fireEvent.click(screen.getByRole('button', { name: 'Periksa' }));
    expect(onSolved).toHaveBeenCalledWith(true);
  });
  it('rejects the verb in third place', () => {
    const { container, onSolved } = practice(item);
    place(container, ['um 6 Uhr', 'Ich', 'stehe', 'auf']);
    fireEvent.click(screen.getByRole('button', { name: 'Periksa' }));
    expect(onSolved).not.toHaveBeenCalled();
  });
});

describe('wechsel items', () => {
  it('shows wohin? with motion and the accusative label once solved', () => {
    const { container } = practice({ id: 'x1', type: 'wechsel', scene: { place: 'on', motion: true }, sentence: 'Ich lege das Buch auf ___ Tisch.', verb: 'legen', options: ['den', 'dem'], answer: 'den' });
    expect(container.querySelector('[data-motion="true"]')?.textContent).toBe('wohin? bergerak');
    fireEvent.click(screen.getByRole('button', { name: /^den/ }));
    expect(container.textContent).toContain('Akk');
  });
});
