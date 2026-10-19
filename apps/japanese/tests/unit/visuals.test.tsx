// Kana visuals (DESIGN §8.1–8.4): the kana table and beat layout, and the four components.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { VisualDataProvider } from '@ladder/core/components/visuals/VisualData';
import { getKana } from '@/course/content';
import { DAKUON_ROWS, SEION_ROWS, grid, kanaNote, yoon } from '@/lib/ja/kanaTable';
import { beatCount, blocks } from '@/lib/ja/beats';
import { morae } from '@/lib/ja/kana';
import { KanaChart } from '@/visuals/KanaChart';
import { KanaOrigins } from '@/visuals/KanaOrigins';
import { MoraBeats } from '@/visuals/MoraBeats';
import { PitchLine, pitchSaid } from '@/visuals/PitchLine';
import { registry } from '@/visuals/registry';
import { VISUAL_IDS } from '@/visuals/visualIds';
import { AllProviders } from '../providers';

const kana = getKana();
const wrap = (ui: React.ReactNode) =>
  render(
    <AllProviders>
      <VisualDataProvider value={{ kana }}>{ui}</VisualDataProvider>
    </AllProviders>,
  );

describe('kana table', () => {
  it('lays out 46 plain kana in 11 rows, with the gaps of や and わ', () => {
    const rows = grid(kana.seion, SEION_ROWS);
    expect(rows).toHaveLength(11);
    expect(rows[7].map((k) => k?.hira ?? '')).toEqual(['や', '', 'ゆ', '', 'よ']);
    expect(rows[9].map((k) => k?.hira ?? '')).toEqual(['わ', '', '', '', 'を']);
    expect(rows[10].map((k) => k?.hira)).toEqual(['ん']);
    expect(grid(kana.dakuon, DAKUON_ROWS).flat().filter(Boolean)).toHaveLength(25);
  });
  it('derives 33 combinations from the い column, never authored', () => {
    const y = yoon(kana);
    expect(y).toHaveLength(33);
    expect(y.map((k) => k.hira)).toContain('きゃ');
    expect(y.map((k) => k.kata)).toContain('ジョ');
    for (const k of y) expect(morae(k.hira)).toHaveLength(1);
  });
  it('explains the irregular, particle and same-as cells with generated romaji', () => {
    const shi = kana.seion.find((k) => k.hira === 'し')!;
    expect(kanaNote(shi)).toEqual({ key: 'kana.noteIrregular', vars: { kana: 'し', romaji: 'shi', regular: 'si' } });
    expect(kanaNote(kana.seion.find((k) => k.hira === 'を')!)?.key).toBe('kana.noteParticle');
    expect(kanaNote(kana.dakuon.find((k) => k.hira === 'ぢ')!)?.vars.like).toBe('じ');
    expect(kanaNote(kana.seion.find((k) => k.hira === 'か')!)).toBeNull();
  });
  it('dates the vowels to lesson 1 and the か row to lesson 2', () => {
    expect(kana.seion.filter((k) => k.row === '').every((k) => k.lesson === 1)).toBe(true);
    expect(kana.seion.filter((k) => k.row === 'k').every((k) => k.lesson === 2)).toBe(true);
  });
});

describe('beat blocks', () => {
  it('give っ an empty block, ん its own, and a long vowel one block across two beats', () => {
    expect(blocks('きって').map((b) => b.kind)).toEqual(['mora', 'small-tsu', 'mora']);
    expect(blocks('ほん').map((b) => b.kind)).toEqual(['mora', 'n']);
    const oba = blocks('おばあさん');
    expect(oba.map((b) => b.text)).toEqual(['お', 'ばあ', 'さ', 'ん']);
    expect(beatCount(oba)).toBe(5);
    expect(beatCount(blocks('コーヒー'))).toBe(4);
    expect(beatCount(blocks('エレベーター'))).toBe(6);
  });
  it('count beats as the morae, always', () => {
    for (const w of ['おばさん', 'がっこう', 'せんせい', 'しんぶん', 'でんしゃ', 'スキー', 'パーティー']) {
      expect(beatCount(blocks(w))).toBe(morae(w).length);
    }
  });
});

describe('the registry', () => {
  it('has every Kana visual, under an id content may use', () => {
    for (const id of ['kana-chart', 'kana-origins', 'mora-beats', 'pitch-line', 'stroke-order']) {
      expect(registry[id]).toBeDefined();
      expect(VISUAL_IDS).toContain(id);
    }
  });
});

describe('KanaChart', () => {
  it('shows the plain grid, and the dakuten rows and combinations when asked', () => {
    const plain = wrap(<KanaChart lang="id" />);
    expect(plain.container.querySelectorAll('[data-kana]')).toHaveLength(46);
    plain.unmount();
    const { container } = wrap(<KanaChart lang="id" initial={{ dakuten: true, combos: true }} />);
    expect(container.querySelectorAll('[data-kana]')).toHaveLength(46 + 25 + 33);
    // The toggles turn the extra grids off again.
    fireEvent.click(screen.getByRole('button', { name: /Kana gabungan/ }));
    expect(container.querySelectorAll('[data-kana]')).toHaveLength(46 + 25);
  });
  it('switches to katakana and marks the irregular cells', () => {
    const { container } = wrap(<KanaChart lang="id" />);
    fireEvent.click(screen.getByRole('radio', { name: 'カタカナ' }));
    expect(container.querySelector('[data-kana="し"]')).toHaveTextContent('シ');
    expect(container.querySelector('[data-kana="し"] [title]')).not.toBeNull();
    expect(container.querySelector('[data-kana="か"] [title]')).toBeNull();
  });
  it('rings the lesson\'s kana', () => {
    const { container } = wrap(<KanaChart lang="id" highlight={['か', 'き']} />);
    expect(container.querySelectorAll('.ring-accent')).toHaveLength(2);
  });
  it('moves between cells with the arrow keys', () => {
    const { container } = wrap(<KanaChart lang="id" />);
    const a = container.querySelector('[data-kana="あ"]') as HTMLButtonElement;
    a.focus();
    fireEvent.keyDown(a, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(container.querySelector('[data-kana="か"]'));
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(container.querySelector('[data-kana="き"]'));
  });
});

describe('KanaOrigins', () => {
  it('names the source kanji, and switches to katakana origins', () => {
    wrap(<KanaOrigins lang="id" kana={['あ', 'か']} />);
    expect(screen.getByRole('img', { name: 'あ berasal dari kanji 安' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('radio', { name: 'カタカナ' }));
    expect(screen.getByRole('img', { name: 'ア berasal dari kanji 阿' })).toBeInTheDocument();
  });
  it('says so when the origin is not agreed (ン)', () => {
    wrap(<KanaOrigins lang="id" initial={{ kana: 'ん', script: 'kata' }} />);
    expect(screen.getByRole('img', { name: 'Asal ン tidak diketahui pasti.' })).toBeInTheDocument();
  });
});

describe('MoraBeats', () => {
  afterEach(() => vi.useRealTimers());
  const words = [
    { ja: 'おばさん', kana: 'おばさん', id: 'bibi' },
    { ja: 'おばあさん', kana: 'おばあさん', id: 'nenek' },
  ];
  it('labels each word with its beat count, in compare mode both rows', () => {
    wrap(<MoraBeats lang="id" words={words} compare />);
    expect(screen.getByRole('img', { name: 'おばさん: 4 ketukan · bibi' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'おばあさん: 5 ketukan · nenek' })).toBeInTheDocument();
  });
  it('lights the blocks in time, one beat apart (fake clock)', () => {
    vi.useFakeTimers();
    const { container } = wrap(<MoraBeats lang="id" words={[words[1]]} />);
    fireEvent.click(screen.getByRole('button', { name: /おばあさん/ }));
    const lit = () => [...container.querySelectorAll('[data-kind]')].findIndex((b) => b.className.includes('bg-accent-soft'));
    act(() => vi.advanceTimersByTime(1));
    expect(lit()).toBe(0);
    // お is one beat, ばあ two: the third block lights three beats in.
    act(() => vi.advanceTimersByTime(220));
    expect(lit()).toBe(1);
    act(() => vi.advanceTimersByTime(440));
    expect(lit()).toBe(2);
    act(() => vi.advanceTimersByTime(2000));
    expect(lit()).toBe(-1);
  });
});

describe('PitchLine', () => {
  const pairs: Parameters<typeof PitchLine>[0]['pairs'] = [
    [
      { ja: '{橋|はし}', kana: 'はし', accent: 2, id: 'jembatan', drawing: 'bridge' },
      { ja: '{箸|はし}', kana: 'はし', accent: 1, id: 'sumpit', drawing: 'chopsticks' },
    ],
    [
      { ja: '{雨|あめ}', kana: 'あめ', accent: 1, id: 'hujan' },
      { ja: '{飴|あめ}', kana: 'あめ', accent: 0, id: 'permen' },
    ],
  ];
  const t = (k: string, v?: Record<string, string | number>) => (k === 'pitch.particle' ? `が ${v?.level}` : k === 'pitch.high' ? 'H' : 'L');
  it('says the pattern: 橋 low-high dropping onto が, 箸 high-low, 飴 staying high', () => {
    expect(pitchSaid({ kana: 'はし', accent: 2 }, t as never)).toBe('は L, し H, が L');
    expect(pitchSaid({ kana: 'はし', accent: 1 }, t as never)).toBe('は H, し L, が L');
    expect(pitchSaid({ kana: 'あめ', accent: 0 }, t as never)).toBe('あ L, め H, が H');
  });
  it('draws a pair side by side, with the drop mark only where the pitch falls', () => {
    const { container } = wrap(<PitchLine lang="id" pairs={pairs} />);
    const cards = container.querySelectorAll('[data-accent]');
    expect(cards).toHaveLength(2);
    expect(cards[0].querySelector('[data-drop]')).not.toBeNull();
    expect(container.querySelector('[data-drawing="bridge"]')).not.toBeNull();
    expect(screen.getByRole('img', { name: /jembatan: は rendah, し tinggi, partikel が rendah/ })).toBeInTheDocument();
  });
  it('switches pairs from the radiogroup; heiban (飴) has no drop mark', () => {
    const { container } = wrap(<PitchLine lang="id" pairs={pairs} />);
    fireEvent.click(screen.getByRole('radio', { name: 'あめ' }));
    const ame = container.querySelector('[data-accent="0"]')!;
    expect(ame.querySelector('[data-drop]')).toBeNull();
    expect(container.querySelector('[data-accent="1"] [data-drop]')).not.toBeNull();
  });
});
