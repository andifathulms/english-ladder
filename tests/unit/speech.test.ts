import { describe, expect, it } from 'vitest';
import { chunks, pickVoice } from '@/lib/speech/speak';

const v = (name: string, lang: string, extra: Partial<SpeechSynthesisVoice> = {}) =>
  ({ name, lang, localService: true, default: false, voiceURI: name, ...extra }) as SpeechSynthesisVoice;

// Roughly what Chrome on macOS reports, novelty voices first.
const mac = [
  v('Albert', 'en-US'),
  v('Bad News', 'en-US'),
  v('Daniel', 'en-GB'),
  v('Samantha', 'en-US'),
  v('Google US English', 'en-US', { localService: false }),
  v('Google UK English Female', 'en-GB', { localService: false }),
  v('Google UK English Male', 'en-GB', { localService: false }),
  v('Damayanti', 'id-ID'),
];

describe('pickVoice', () => {
  it('prefers a clear British female voice by default', () => {
    expect(pickVoice(mac)?.name).toBe('Google UK English Female');
  });
  it('honours a male preference within the accent', () => {
    expect(pickVoice(mac, 'gb', 'male')?.name).toBe('Google UK English Male');
  });
  it('never picks a novelty voice when a real one exists', () => {
    const list = [v('Albert', 'en-US'), v('Zarvox', 'en-US'), v('Samantha', 'en-US')];
    expect(pickVoice(list, 'us')?.name).toBe('Samantha');
  });
  it('prefers Microsoft neural voices on Windows', () => {
    const win = [
      v('Microsoft David - English (United States)', 'en-US'),
      v('Microsoft Zira - English (United States)', 'en-US'),
      v('Microsoft Libby Online (Natural) - English (United Kingdom)', 'en-GB', { localService: false }),
    ];
    expect(pickVoice(win)?.name).toMatch(/Libby/);
  });
  it('returns null without English voices', () => {
    expect(pickVoice([v('Damayanti', 'id-ID')])).toBeNull();
  });
});

describe('chunks', () => {
  it('keeps short text whole', () => {
    expect(chunks('I am ready.')).toEqual([{ text: 'I am ready.', start: 0 }]);
  });
  it('splits long text at sentence ends and keeps offsets', () => {
    const text = 'This is Rina. She is a nurse. Her hospital is next to a big mosque.';
    const parts = chunks(text, 30);
    expect(parts.map((p) => p.text)).toEqual(['This is Rina. She is a nurse.', 'Her hospital is next to a big mosque.']);
    for (const p of parts) expect(text.slice(p.start, p.start + p.text.length)).toBe(p.text);
  });
});
