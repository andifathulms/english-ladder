import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { ladderPreset } from '@ladder/core/tailwind-preset';

const v = (name: string) => `var(--${name})`;

// Japanese component classes (DESIGN §4.3–4.4), in the components layer like the shared component
// classes. .ja lives unlayered in styles/japanese.css, so it follows .label.
const japaneseComponents = plugin(({ addComponents }) => {
  addComponents({
    // The Japanese sentence block: words stay whole, small kana and punctuation never start a line.
    '.ja-line': { lineBreak: 'strict', wordBreak: 'keep-all', overflowWrap: 'normal' },
    '.ja-word': { display: 'inline', borderRadius: 'var(--r-sm)', font: 'inherit', color: 'inherit', background: 'none', padding: '0' },
    '.ja-tap': { cursor: 'pointer' },
    '.ja-tap:hover': { background: 'var(--accent-soft)' },
    '.ja-ruby': { rubyPosition: 'over', rubyAlign: 'center' },
    '.ja-ruby rt': {
      fontFamily: 'var(--font-ja), var(--font-ja-ui), system-ui, sans-serif',
      fontSize: 'var(--t-furigana)',
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: '1',
      letterSpacing: '0',
      color: 'var(--muted)',
      textTransform: 'none',
      userSelect: 'none',
    },
    // Hidden furigana keeps its height so lines never jump when it is revealed.
    '.ja-ruby rt.rt-hidden': { visibility: 'hidden' },
    // Focus: a 2px accent underline offset 4px, in accent colour. Never bold.
    '.ja-focus': {
      color: 'var(--accent)',
      textDecoration: 'underline',
      textDecorationColor: 'var(--accent)',
      textDecorationThickness: '2px',
      textUnderlineOffset: '4px',
      textDecorationSkipInk: 'none',
    },
    '.ja-focus rt': { color: 'var(--accent)' },
    '.ja-speaking': { background: 'var(--accent-soft)', transition: 'background-color var(--m-quick-d) var(--ease)' },
    // Romaji: upright, never italic (italic means Indonesian).
    '.romaji': { fontFamily: 'var(--font-body), system-ui, sans-serif', fontStyle: 'normal', fontSize: 'var(--t-romaji)', color: 'var(--muted)' },
    // Japanese on the sumi board: board ink, furigana in board-muted.
    '.on-board .ja-line': { color: 'var(--board-ink)' },
    '.on-board .ja-ruby rt': { color: 'var(--board-muted)' },
    // Practice grid: a square with a dashed cross (DESIGN §8.5).
    '.practice-grid': {
      backgroundImage: [
        'linear-gradient(var(--grid-line), var(--grid-line))',
        'linear-gradient(var(--grid-line), var(--grid-line))',
        'repeating-linear-gradient(90deg, var(--grid-line) 0 4px, transparent 4px 8px)',
        'repeating-linear-gradient(0deg, var(--grid-line) 0 4px, transparent 4px 8px)',
      ].join(', '),
      backgroundSize: '100% 1px, 1px 100%, 100% 1px, 1px 100%',
      backgroundPosition: '0 0, 0 0, 0 50%, 50% 0',
      backgroundRepeat: 'no-repeat',
      boxShadow: 'inset 0 0 0 1px var(--grid-line)',
    },
  });
});

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './visuals/**/*.{ts,tsx}',
    './course/**/*.{ts,tsx}',
    './lib/**/*.ts',
    '../../packages/ladder-core/src/**/*.{ts,tsx}',
  ],
  presets: [ladderPreset as Config],
  theme: {
    extend: {
      colors: {
        kana: v('kana'),
        'kana-soft': v('kana-soft'),
        pitch: v('pitch'),
        beat: v('beat'),
        seal: v('seal'),
        'grid-line': v('grid-line'),
      },
      // Japanese faces (DESIGN §4.1): Klee One for teaching text, Noto Sans JP for small UI Japanese.
      fontFamily: {
        ja: ['var(--font-ja)', 'var(--font-ja-ui)', 'system-ui', 'sans-serif'],
        'ja-ui': ['var(--font-ja-ui)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'ja-sentence': ['var(--t-ja-sentence)', { lineHeight: '2.3' }],
        'ja-body': ['var(--t-ja-body)', { lineHeight: '2.1' }],
        'ja-small': ['var(--t-ja-small)', { lineHeight: '1.8' }],
        'ja-glyph': ['var(--t-ja-glyph)', { lineHeight: '1.2' }],
      },
    },
  },
  plugins: [japaneseComponents],
};

export default config;
