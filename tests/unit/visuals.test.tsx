import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ProgressProvider } from '@/components/ProgressProvider';
import { PlaceScene } from '@/components/visuals/PlaceScene';
import { NounBuilder } from '@/components/visuals/NounBuilder';
import { PLACE_SPEC, PLACES, placeSentence } from '@/components/visuals/placeLogic';
import { article, pluralParts } from '@/components/visuals/nounLogic';
import type { Noun } from '@/lib/types';

const wrap = (ui: React.ReactNode) => render(<ProgressProvider>{ui}</ProgressProvider>);

describe('place scene logic', () => {
  it('uses the table as reference only for under', () => {
    for (const p of PLACES) expect(PLACE_SPEC[p].ref).toBe(p === 'under' ? 'table' : 'box');
    expect(placeSentence('under').en).toBe('The ball is [[under]] the table.');
    expect(placeSentence('next to')).toEqual({ en: 'The ball is [[next to]] the box.', id: 'Bolanya di sebelah kotak.' });
  });
  it('draws behind before the box and in between the box back and front', () => {
    expect(PLACE_SPEC.behind.slot).toBe('behind');
    expect(PLACE_SPEC.in.slot).toBe('inside');
    expect(PLACE_SPEC.under.slot).toBe('under');
    expect(PLACE_SPEC['in front of'].slot).toBe('front');
  });
});

describe('PlaceScene', () => {
  it('moves the ball when a preposition is picked and updates the text alternative', () => {
    const { container } = wrap(<PlaceScene lang="id" initial="on" />);
    expect(container.querySelector('[data-ball="on"]')).not.toBeNull();
    fireEvent.click(screen.getByRole('radio', { name: 'under' }));
    expect(container.querySelector('[data-ball="under"]')).not.toBeNull();
    expect(screen.getByText('Bola ada di bawah meja.', { selector: '[aria-live]' })).toBeInTheDocument();
  });

  it('puts the behind ball in the slot before the box, so the box covers it', () => {
    const { container } = wrap(<PlaceScene lang="en" state="behind" interactive={false} />);
    const svg = container.querySelector('svg')!;
    const kids = Array.from(svg.querySelector(':scope > g')!.children);
    const ball = kids.findIndex((el) => el.getAttribute('data-ball') === 'behind');
    const boxBack = kids.findIndex((el) => el.getAttribute('points')?.startsWith('148,124 168,108'));
    expect(ball).toBeGreaterThan(-1);
    expect(ball).toBeLessThan(boxBack);
  });

  it('supports arrow keys between options', () => {
    wrap(<PlaceScene lang="en" initial="in" />);
    const first = screen.getByRole('radio', { name: 'in' });
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(screen.getByRole('radio', { name: 'on' })).toHaveAttribute('aria-checked', 'true');
  });
});

const nouns: Noun[] = [
  { word: 'hour', initial_sound: 'vowel', ipa_hint: '/aʊ/', plural: 'hours', plural_rule: 's', id: 'jam' },
  { word: 'university', initial_sound: 'consonant', ipa_hint: '/j/', plural: 'universities', plural_rule: 'y-ies', id: 'universitas' },
  { word: 'child', initial_sound: 'consonant', ipa_hint: '/tʃ/', plural: 'children', plural_rule: 'irregular', id: 'anak' },
];

describe('noun builder logic', () => {
  it('chooses a/an from the authored sound', () => {
    expect(article(nouns[0])).toBe('an');
    expect(article(nouns[1])).toBe('a');
  });
  it('splits plurals for display from authored data', () => {
    expect(pluralParts({ word: 'city', plural: 'cities' })).toEqual({ stem: 'cit', removed: 'y', added: 'ies' });
    expect(pluralParts({ word: 'knife', plural: 'knives' })).toEqual({ stem: 'kni', removed: 'fe', added: 'ves' });
    expect(pluralParts({ word: 'box', plural: 'boxes' })).toEqual({ stem: 'box', removed: '', added: 'es' });
  });
});

describe('NounBuilder', () => {
  it('shows an hour and a university', () => {
    const { container, rerender } = wrap(<NounBuilder lang="en" nouns={nouns} state="hour" interactive={false} />);
    expect(container.querySelector('.focus-word')!.textContent).toBe('an');
    rerender(
      <ProgressProvider>
        <NounBuilder lang="en" nouns={nouns} state="university" interactive={false} />
      </ProgressProvider>,
    );
    expect(container.querySelector('.focus-word')!.textContent).toBe('a');
  });
});
