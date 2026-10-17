import type { Noun } from '@ladder/core/lib/types';

export type PluralParts = { stem: string; removed: string; added: string };

/**
 * Splits authored singular/plural into stem + removed + added for step-by-step display.
 * Display only: the plural itself always comes from the data, never computed.
 */
export function pluralParts(n: Pick<Noun, 'word' | 'plural'>): PluralParts {
  let i = 0;
  while (i < n.word.length && i < n.plural.length && n.word[i] === n.plural[i]) i++;
  return { stem: n.word.slice(0, i), removed: n.word.slice(i), added: n.plural.slice(i) };
}

/** The article comes from the authored initial sound, never from the spelling. */
export function article(n: Pick<Noun, 'initial_sound'>): 'a' | 'an' {
  return n.initial_sound === 'vowel' ? 'an' : 'a';
}

export const RULE_LABEL: Record<Noun['plural_rule'], { en: string; id: string }> = {
  s: { en: '+s', id: '+s' },
  es: { en: '+es (after s, sh, ch, x and some -o words)', id: '+es (setelah s, sh, ch, x dan beberapa kata -o)' },
  'y-ies': { en: 'y → ies', id: 'y → ies' },
  'f-ves': { en: 'f / fe → ves', id: 'f / fe → ves' },
  irregular: { en: 'irregular: learn it as a word', id: 'tidak beraturan: hafalkan saja' },
  same: { en: 'same form', id: 'bentuknya sama' },
};

export const SOUND_LABEL = {
  vowel: { en: 'vowel sound', id: 'bunyi vokal' },
  consonant: { en: 'consonant sound', id: 'bunyi konsonan' },
};

/** Nouns whose spelling and sound disagree: the interesting ones for a/an. */
export function isTricky(n: Noun): boolean {
  const vowelLetter = /^[aeiou]/i.test(n.word);
  return vowelLetter !== (n.initial_sound === 'vowel');
}
