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
      // German-only colours (DESIGN §3.2): the Dasar tier, gender chips, case letters.
      colors: {
        dasar: v('dasar'),
        'dasar-soft': v('dasar-soft'),
        masc: v('masc'),
        fem: v('fem'),
        neut: v('neut'),
        akk: v('akk'),
        dat: v('dat'),
        gen: v('gen'),
      },
    },
  },
};

export default config;
