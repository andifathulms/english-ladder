import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LessonDataProvider } from '@ladder/core/components/lesson/LessonData';
import { StressWords } from '@/components/de/StressWords';
import { StressSchema } from '@/course/schema';
import { stressSplit } from '@/lib/de';
import { scoreVoice } from '@/course/speech';

const stress = StressSchema.parse(yaml.load(readFileSync(join(__dirname, '../../content/data/stress.yaml'), 'utf8')));
const exceptions = Object.fromEntries(stress.map((e) => [e.word.toLowerCase(), e]));
const marked = (c: HTMLElement) => [...c.querySelectorAll('.de-stress')].map((e) => e.textContent);

describe('stressSplit', () => {
  it('uses the authored entry first, keeping the word’s case', () => {
    expect(stressSplit('Hotel', exceptions)).toEqual({ syllables: ['Ho', 'tel'], stress: 1 });
    expect(stressSplit('Hallo', exceptions)).toEqual({ syllables: ['Hal', 'lo'], stress: 1 });
  });
  it('else the rule', () => {
    expect(stressSplit('Arbeit', exceptions)).toEqual({ syllables: ['Ar', 'beit'], stress: 0 });
  });
  it('every authored entry differs from the rule (else it is not needed)', () => {
    const needless = stress.filter((e) => {
      const r = stressSplit(e.word);
      return r.syllables.join('-').toLowerCase() === e.syllables.join('-').toLowerCase() && r.stress === e.stress;
    });
    expect(needless.map((e) => e.word)).toEqual([]);
  });
});

describe('StressWords (Tirukan)', () => {
  it('underlines each word’s stressed syllable, from the lesson data when authored', () => {
    const { container } = render(
      <LessonDataProvider value={{ stress: { hallo: exceptions.hallo } }}>
        <p>
          <StressWords text="[[Hallo]]! Guten Morgen, Herr Schmidt." />
        </p>
      </LessonDataProvider>,
    );
    expect(marked(container)).toEqual(['lo', 'Gu', 'Mor']);
    expect(container.textContent).toBe('Hallo! Guten Morgen, Herr Schmidt.');
  });
  it('works without lesson data', () => {
    const { container } = render(
      <p>
        <StressWords text="Wie geht es Ihnen?" />
      </p>,
    );
    expect(marked(container)).toEqual(['Ih']);
  });
});

describe('voice scorer: variety and gender (CLAUDE.md §5.4)', () => {
  const voice = (lang: string, name = 'X') => ({ lang, name, default: false, localService: true, voiceURI: name }) as SpeechSynthesisVoice;
  it('a DACH card can ask for its variety', () => {
    expect(scoreVoice(voice('de-AT'), 'female', 'at')).toBeGreaterThan(scoreVoice(voice('de-DE'), 'female', 'at'));
  });
  it('respects the gender setting', () => {
    expect(scoreVoice(voice('de-DE', 'Markus'), 'male')).toBeGreaterThan(scoreVoice(voice('de-DE', 'Anna'), 'male'));
    expect(scoreVoice(voice('de-DE', 'Anna'), 'female')).toBeGreaterThan(scoreVoice(voice('de-DE', 'Markus'), 'female'));
  });
});
