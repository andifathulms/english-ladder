import type { Config } from 'tailwindcss';
import { ladderPreset } from '@ladder/core/tailwind-preset';

const v = (name: string) => `var(--${name})`;

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
      // Spanish-only colours (DESIGN §3.2): the Dasar tier, gender markers, the España strand.
      colors: {
        dasar: v('dasar'),
        'dasar-soft': v('dasar-soft'),
        masc: v('masc'),
        fem: v('fem'),
        es: v('es'),
        'es-soft': v('es-soft'),
      },
    },
  },
};

export default config;
