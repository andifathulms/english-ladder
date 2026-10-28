import { describe, expect, it } from 'vitest';
import { course } from '@/course.config';
import { DEFAULT_SETTINGS, STORAGE_KEY } from '@/course/progress';
import { scoreVoice } from '@/course/speech';
import { getCurriculum } from '@/course/content';

const voice = (lang: string, name = 'Voice', isDefault = false) => ({ lang, name, default: isDefault, localService: true, voiceURI: name }) as SpeechSynthesisVoice;

describe('course config', () => {
  it('has its own keys and every English Ladder fix on', () => {
    expect(STORAGE_KEY).toBe('spanish-ladder:v1');
    expect(course.cachePrefix).toBe('spanish-ladder-');
    expect(Object.values(course.fixes ?? {}).every(Boolean)).toBe(true);
    expect(Object.keys(course.fixes ?? {})).toHaveLength(9);
  });

  it('defaults to Latin American speech and rung-following accents', () => {
    expect(DEFAULT_SETTINGS.variety).toBe('latam');
    expect(DEFAULT_SETTINGS.accentStrict).toBe('rung');
  });

  it('lists all ten rungs, Dasar optional at the bottom', () => {
    const rungs = getCurriculum();
    expect(rungs.map((r) => r.id)).toEqual(['dasar', 'easy-1', 'easy-2', 'easy-3', 'medium-1', 'medium-2', 'medium-3', 'hard-1', 'hard-2', 'hard-3']);
    expect(rungs[0].optional).toBe(true);
  });
});

describe('voice scorer', () => {
  it('prefers es-MX > es-US > es-419 > es-ES for Latin American lines', () => {
    const order = ['es-MX', 'es-US', 'es-419', 'es-ES'].map((l) => scoreVoice(voice(l)));
    expect([...order].sort((a, b) => b - a)).toEqual(order);
  });

  it('prefers es-ES for Spain lines and excludes other languages', () => {
    expect(scoreVoice(voice('es-ES'), 'es')).toBeGreaterThan(scoreVoice(voice('es-MX'), 'es'));
    expect(scoreVoice(voice('pt-BR'))).toBe(-Infinity);
  });

  it('a line variety wins over the setting', () => {
    const s = { ...DEFAULT_SETTINGS, variety: 'latam' };
    expect(course.speech.voiceScorer(voice('es-ES'), s, 'es')).toBeGreaterThan(course.speech.voiceScorer(voice('es-MX'), s, 'es'));
    const spain = { ...DEFAULT_SETTINGS, variety: 'es' };
    expect(course.speech.voiceScorer(voice('es-ES'), spain)).toBeGreaterThan(course.speech.voiceScorer(voice('es-MX'), spain));
  });
});
