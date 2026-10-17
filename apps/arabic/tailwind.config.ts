import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { ladderPreset } from '@ladder/core/tailwind-preset';

const v = (name: string) => `var(--${name})`;

// Arabic islands (ArIsland). Never italic, uppercased or letter-spaced (DESIGN §4.3).
const arabicComponents = plugin(({ addComponents }) => {
  addComponents({
    '.ar': {
      letterSpacing: 'normal',
      textTransform: 'none',
      fontStyle: 'normal',
      fontSynthesis: 'none',
      wordSpacing: 'normal',
      unicodeBidi: 'isolate',
    },
    'div.ar, p.ar, li.ar, h1.ar, h2.ar, h3.ar': { textAlign: 'start' },
    // Arabic focus: colour plus underline only, never bold, clear of kasrah and descenders.
    '.ar-focus': {
      color: 'var(--accent)',
      textDecoration: 'underline',
      textDecorationThickness: '2px',
      textUnderlineOffset: '6px',
      textDecorationSkipInk: 'none',
    },
    // Transliteration: upright, muted, under the Arabic.
    '.tr-text': { fontFamily: 'var(--font-ar-display), Georgia, serif', fontStyle: 'normal', color: 'var(--muted)' },
    '.tr-focus': { textDecoration: 'underline', textDecorationThickness: '1.5px', textUnderlineOffset: '3px' },
  });
});

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './visuals/**/*.{ts,tsx}',
    './course/**/*.{ts,tsx}',
    '../../packages/ladder-core/src/**/*.{ts,tsx}',
  ],
  presets: [ladderPreset as Config],
  theme: {
    extend: {
      colors: { huruf: v('huruf'), 'huruf-soft': v('huruf-soft'), harakat: v('harakat'), eg: v('eg'), 'eg-soft': v('eg-soft') },
      // Arabic faces (DESIGN §4.1). Never apply these outside ArIsland.
      fontFamily: {
        ar: ['var(--font-ar)', 'serif'],
        'ar-display': ['var(--font-ar-display)', 'var(--font-ar)', 'serif'],
        'ar-ui': ['var(--font-ar-ui)', 'var(--font-ar)', 'sans-serif'],
      },
      fontSize: {
        'ar-sentence': ['var(--t-ar-sentence)', { lineHeight: '2' }],
        'ar-body': ['var(--t-ar-body)', { lineHeight: '1.9' }],
        'ar-small': ['var(--t-ar-small)', { lineHeight: '1.8' }],
        'ar-glyph': ['var(--t-ar-glyph)', { lineHeight: '1.4' }],
        'ar-title': ['var(--t-ar-title)', { lineHeight: '1.6' }],
        tr: ['var(--t-tr)', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [arabicComponents],
};

export default config;
