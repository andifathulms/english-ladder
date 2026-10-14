import type { Config } from 'tailwindcss';

// Every value maps to a CSS custom property from styles/tokens.css (DESIGN.md).
// The default palette is replaced, not extended, so literal colours can't sneak in.
const v = (name: string) => `var(--${name})`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      paper: v('paper'),
      'paper-2': v('paper-2'),
      surface: v('surface'),
      ink: v('ink'),
      muted: v('muted'),
      rule: v('rule'),
      accent: v('accent'),
      'accent-ink': v('accent-ink'),
      'accent-soft': v('accent-soft'),
      rung: v('rung'),
      'rung-soft': v('rung-soft'),
      good: v('good'),
      'good-bg': v('good-bg'),
      off: v('off'),
      'off-bg': v('off-bg'),
      easy: v('easy'),
      medium: v('medium'),
      hard: v('hard'),
    },
    fontFamily: {
      display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
    },
    fontSize: {
      hero: ['var(--t-hero)', { lineHeight: '1.05' }],
      h1: ['var(--t-h1)', { lineHeight: '1.15' }],
      h2: ['var(--t-h2)', { lineHeight: '1.2' }],
      sentence: ['var(--t-sentence)', { lineHeight: 'var(--t-sentence-lh)' }],
      body: ['var(--t-body)', { lineHeight: '1.6' }],
      small: ['var(--t-small)', { lineHeight: '1.5' }],
      label: ['var(--t-label)', { lineHeight: '1.3', letterSpacing: '0.1em' }],
    },
    spacing: {
      0: '0',
      px: '1px',
      1: 'var(--s-1)',
      2: 'var(--s-2)',
      3: 'var(--s-3)',
      4: 'var(--s-4)',
      5: 'var(--s-5)',
      6: 'var(--s-6)',
      7: 'var(--s-7)',
      8: 'var(--s-8)',
      gutter: 'var(--gutter)',
      touch: '44px',
      pill: '48px',
    },
    borderRadius: {
      none: '0',
      sm: 'var(--r-sm)',
      md: 'var(--r-md)',
      lg: 'var(--r-lg)',
      full: '999px',
    },
    boxShadow: {
      none: 'none',
      e1: 'var(--e-1)',
      e2: 'var(--e-2)',
    },
    transitionDuration: {
      quick: 'var(--m-quick-d)',
      base: 'var(--m-base-d)',
      object: 'var(--m-object-d)',
      moment: 'var(--m-moment-d)',
    },
    transitionTimingFunction: {
      DEFAULT: 'var(--ease)',
      ease: 'var(--ease)',
      object: 'var(--ease-object)',
      moment: 'var(--ease-moment)',
    },
    extend: {
      maxWidth: { lesson: '640px', home: '960px', measure: '65ch' },
      minHeight: { touch: '44px', pill: '48px' },
      minWidth: { touch: '44px' },
    },
  },
  plugins: [],
};

export default config;
