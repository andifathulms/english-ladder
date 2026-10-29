import { describe, expect, it } from 'vitest';
import { course } from '@/course.config';
import { DEFAULT_SETTINGS, STORAGE_KEY } from '@/course/progress';
import { scoreVoice } from '@/course/speech';
import { getCurriculum } from '@/course/content';

const voice = (lang: string, name = 'Voice', isDefault = false) => ({ lang, name, default: isDefault, localService: true, voiceURI: name }) as SpeechSynthesisVoice;

describe('course config', () => {
  it('has its own keys and every English Ladder fix on', () => {
    expect(STORAGE_KEY).toBe('german-ladder:v1');
    expect(course.cachePrefix).toBe('german-ladder-');
    expect(course.rangeLabel).toBe('A1 → C1');
    expect(Object.values(course.fixes ?? {}).every(Boolean)).toBe(true);
    expect(Object.keys(course.fixes ?? {})).toHaveLength(9);
  });

  it('defaults to rung-following spelling and case colours', () => {
    expect(DEFAULT_SETTINGS.spellingStrict).toBe('rung');
    expect(DEFAULT_SETTINGS.caseColours).toBe('rung');
  });

  it('lists all ten rungs, Dasar optional at the bottom, with the exits marked', () => {
    const rungs = getCurriculum();
    expect(rungs.map((r) => r.id)).toEqual(['dasar', 'easy-1', 'easy-2', 'easy-3', 'medium-1', 'medium-2', 'medium-3', 'hard-1', 'hard-2', 'hard-3']);
    expect(rungs[0].optional).toBe(true);
    expect(rungs.filter((r) => r.milestone).map((r) => `${r.id} ${r.milestone!.label}`)).toEqual([
      'easy-2 A1 · Goethe',
      'medium-1 A2',
      'medium-3 B1 · Ausbildung',
      'hard-2 B2 · Pflege/Studium',
      'hard-3 C1 · TestDaF/DSH',
    ]);
    expect(rungs.map((r) => r.cefr).slice(1, 5)).toEqual(['A1.1', 'A1.2', 'A2.1', 'A2.2']);
  });
});

describe('voice scorer', () => {
  it('prefers de-DE, then other German; excludes other languages', () => {
    expect(scoreVoice(voice('de-DE'))).toBeGreaterThan(scoreVoice(voice('de-AT')));
    expect(scoreVoice(voice('de-AT'))).toBeGreaterThan(-Infinity);
    expect(scoreVoice(voice('nl-NL'))).toBe(-Infinity);
  });
  it('a natural de-DE voice wins over a plain one, and novelty voices lose', () => {
    expect(scoreVoice(voice('de-DE', 'Microsoft Katja Online (Natural)'))).toBeGreaterThan(scoreVoice(voice('de-DE', 'Anna')));
    expect(scoreVoice(voice('de-DE', 'eSpeak German'))).toBeLessThan(scoreVoice(voice('de-AT', 'Anna')));
  });
});
