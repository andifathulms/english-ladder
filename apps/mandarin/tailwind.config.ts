import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { ladderPreset } from '@ladder/core/tailwind-preset';

const v = (name: string) => `var(--${name})`;

// Hanzi and pinyin component classes (DESIGN §4.3–4.4, §8.5), in the components layer like the
// shared component classes. Tone colours (.tone-*) are built dynamically and live unlayered in
// styles/mandarin.css so they are never purged; .zh lives there too, so it follows .label (a hanzi
// chip in a mono label keeps normal spacing and case), as it did in the source's globals.css.
const mandarinComponents = plugin(({ addComponents }) => {
  addComponents({
    // The Chinese sentence block: words wrap only between words (the <wbr> between rubies),
    // punctuation never starts a line.
    '.zh-line': { lineBreak: 'strict', wordBreak: 'keep-all', overflowWrap: 'normal' },
    '.zh-word': { display: 'inline', borderRadius: 'var(--r-sm)', font: 'inherit', color: 'inherit', background: 'none', padding: '0' },
    '.zh-tap': { cursor: 'pointer' },
    '.zh-tap:hover': { background: 'var(--accent-soft)' },
    '.zh-ruby': { rubyPosition: 'over', rubyAlign: 'center' },
    '.zh-ruby rt': {
      fontFamily: 'var(--font-body), system-ui, sans-serif',
      fontSize: 'var(--t-py-ruby)',
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: '1',
      letterSpacing: '0',
      color: 'var(--muted)',
      textTransform: 'none',
      userSelect: 'none',
    },
    // Hidden pinyin keeps its height so lines never jump when it is revealed.
    '.zh-ruby rt.rt-hidden': { visibility: 'hidden' },
    // Focus: a 2px accent underline offset 4px, plus accent colour when tone colours are off. Never bold.
    '.zh-focus': {
      textDecoration: 'underline',
      textDecorationColor: 'var(--accent)',
      textDecorationThickness: '2px',
      textUnderlineOffset: '4px',
      textDecorationSkipInk: 'none',
    },
    '.zh-focus:not(.zh-focus-tones)': { color: 'var(--accent)' },
    '.zh-focus:not(.zh-focus-tones) rt': { color: 'var(--accent)' },
    '.zh-speaking': { background: 'var(--accent-soft)', transition: 'background-color var(--m-quick-d) var(--ease)' },
    // Pinyin on its own: upright, never italic (italic means Indonesian).
    '.py': { fontFamily: 'var(--font-body), system-ui, sans-serif', fontStyle: 'normal' },
    '.py-focus': { textDecoration: 'underline', textDecorationThickness: '1.5px', textUnderlineOffset: '3px' },
    // Chinese on the red board: board ink, pinyin in board-muted.
    '.on-board .zh-line': { color: 'var(--board-ink)' },
    '.on-board .zh-ruby rt': { color: 'var(--board-muted)' },
    // 田字格: a square with a dashed cross (DESIGN §8.5).
    '.tianzige': {
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
        dasar: v('dasar'),
        'dasar-soft': v('dasar-soft'),
        'tone-0': v('tone-0'),
        'tone-1': v('tone-1'),
        'tone-2': v('tone-2'),
        'tone-3': v('tone-3'),
        'tone-4': v('tone-4'),
        'grid-line': v('grid-line'),
      },
      // Hanzi faces (DESIGN §4.1): WenKai for teaching text, Noto Sans SC for small UI hanzi.
      fontFamily: {
        zh: ['var(--font-zh)', 'var(--font-zh-ui)', 'system-ui', 'sans-serif'],
        'zh-ui': ['var(--font-zh-ui)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'zh-sentence': ['var(--t-zh-sentence)', { lineHeight: '2.4' }],
        'zh-body': ['var(--t-zh-body)', { lineHeight: '2.2' }],
        'zh-small': ['var(--t-zh-small)', { lineHeight: '1.9' }],
        'zh-glyph': ['var(--t-zh-glyph)', { lineHeight: '1.2' }],
      },
    },
  },
  plugins: [mandarinComponents],
};

export default config;
