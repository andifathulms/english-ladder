import type { Config } from 'tailwindcss';
import { ladderPreset } from '@ladder/core/tailwind-preset';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './visuals/**/*.{ts,tsx}',
    '../../packages/ladder-core/src/**/*.{ts,tsx}',
  ],
  presets: [ladderPreset as Config],
};

export default config;
