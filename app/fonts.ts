import localFont from 'next/font/local';
import { Bricolage_Grotesque } from 'next/font/google';

// Self-hosted at build: no runtime requests to Google.
export const display = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-display',
  display: 'swap',
});

// Atkinson Hyperlegible Next and Mono aren't in next/font/google for Next 14, so they ship from app/font-files.
export const body = localFont({
  src: [
    { path: './font-files/AtkinsonNext-Variable.woff2', weight: '200 800', style: 'normal' },
    { path: './font-files/AtkinsonNext-Italic-Variable.woff2', weight: '200 800', style: 'italic' },
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const mono = localFont({
  src: [{ path: './font-files/AtkinsonMono-Variable.woff2', weight: '200 800', style: 'normal' }],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
});
