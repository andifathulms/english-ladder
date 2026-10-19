// JaSentence (CLAUDE.md §9): rt per kanji, hidden rt keeps its space, out-of-rung kanji always ruby'd,
// romaji in Kana 1, lang attributes.
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { JaSentence } from '@/components/ja/JaSentence';
import { JaTextProvider } from '@/components/ja/JaContext';
import { AllProviders } from '../providers';

const ja = 'ボール は {箱|はこ} の [[{上|うえ}]] に あります 。';
const mount = (props: Parameters<typeof JaTextProvider>[0]['children'] extends never ? never : Omit<Parameters<typeof JaTextProvider>[0], 'children'>, s = ja) =>
  render(
    <AllProviders>
      <JaTextProvider {...props}>
        <JaSentence ja={s} id="Bolanya ada di atas kotak." play={false} />
      </JaTextProvider>
    </AllProviders>,
  ).container;

describe('JaSentence', () => {
  it('gives each kanji its own rt, okurigana outside the ruby', () => {
    const c = mount({ furigana: 'always' }, '{食|た}べます');
    expect([...c.querySelectorAll('ruby')].map((r) => r.textContent)).toEqual(['食た']);
    expect(c.querySelector('p[lang="ja"]')!.textContent).toContain('べます');
    const two = mount({ furigana: 'always' }, '{漢字|かん|じ}');
    expect(two.querySelectorAll('rt')).toHaveLength(2);
  });

  it('hides furigana with visibility (keeps its space) when the fade says so', () => {
    const c = mount({ furigana: 'off', rungKanji: ['箱', '上'] });
    const rts = [...c.querySelectorAll('rt')];
    expect(rts).toHaveLength(2);
    expect(rts.every((rt) => rt.classList.contains('rt-hidden'))).toBe(true);
  });

  it('always shows furigana over kanji above the rung', () => {
    const c = mount({ furigana: 'off', rungKanji: ['上'] });
    const [box, up] = [...c.querySelectorAll('rt')];
    expect(box.classList.contains('rt-hidden')).toBe(false);
    expect(up.classList.contains('rt-hidden')).toBe(true);
  });

  it('shows the reading for screen readers, lang="ja", and the focus as an underline class', () => {
    const c = mount({ furigana: 'always' });
    const p = c.querySelector('p[lang="ja"]')!;
    expect(p.querySelector('.sr-only')!.textContent).toContain('ボールははこのうえにあります。');
    expect(c.querySelector('.ja-focus')!.textContent).toContain('上');
  });

  it('puts romaji under each word in Kana 1, only on new kana when fading', () => {
    const show = mount({ furigana: '—', romaji: 'show' }, 'わたし は がくせい です 。');
    expect([...show.querySelectorAll('[lang="ja-Latn"]')].map((e) => e.textContent)).toEqual(['watashi', 'wa', 'gakusei', 'desu']);
    const fade = mount({ furigana: '—', romaji: 'new', kanaNew: ['が'] }, 'わたし は がくせい です 。');
    expect([...fade.querySelectorAll('[lang="ja-Latn"]:not([aria-hidden])')].map((e) => e.textContent)).toEqual(['gakusei']);
    const none = mount({ furigana: '—', romaji: 'hide' }, 'わたし は がくせい です 。');
    expect(none.querySelectorAll('[lang="ja-Latn"]')).toHaveLength(0);
  });

  it('keeps punctuation with its word, so 。 never starts a line (romaji on or off)', () => {
    for (const romaji of ['show', 'hide'] as const) {
      const c = mount({ furigana: 'always', romaji }, 'わたし は ほん を よみます 。');
      const words = [...c.querySelectorAll('p[lang="ja"] > .ja-word')];
      expect(words).toHaveLength(5);
      expect(words[4].textContent).toMatch(/^よみます.*。$/u);
      expect(words[4].querySelector('.whitespace-nowrap')).not.toBeNull();
    }
    // An opening bracket sits with the word after it.
    const q = mount({ furigana: 'always' }, '「 はい 」 と いいます 。');
    const first = q.querySelector('p[lang="ja"] > .ja-word')!;
    expect(first.textContent).toBe('「はい」');
  });
});
