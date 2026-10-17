// Recorded audio is per course: off (speech only) unless the course configures it; keys are
// sha1(normalise(text)|variety)[0:12] so recordings survive markup and normalisation.
import { afterEach, describe, expect, it } from 'vitest';
import { __setManifest, audioFor, audioKey, configureAudio, loadManifest } from '@ladder/core/lib/speech/audio';
import { sha1 } from '@ladder/core/lib/speech/sha1';

afterEach(() => {
  configureAudio(null);
  __setManifest(null);
});

describe('recorded audio', () => {
  it('keys text by sha1(normalise(stripMarkup(text)) | variety), 12 hex digits', () => {
    configureAudio({ normalise: (s) => s.trim(), defaultVariety: 'fusha' });
    expect(audioKey(' كِتَابٌ [[جَدِيدٌ]] ')).toBe(sha1('كِتَابٌ جَدِيدٌ|fusha').slice(0, 12));
    expect(audioKey('x', 'eg')).toBe(sha1('x|eg').slice(0, 12));
  });

  it('finds a recording only when the course has audio', async () => {
    configureAudio({ normalise: (s) => s, defaultVariety: 'fusha' });
    __setManifest({ [audioKey('salam')]: { file: 'a.mp3', dur: 800 } });
    expect(audioFor('salam')?.file).toBe('a.mp3');
    expect(audioFor('salam', 'eg')).toBeNull();
    configureAudio(null);
    expect(audioFor('salam')).toBeNull();
    expect(await loadManifest()).toBeTruthy();
  });
});
