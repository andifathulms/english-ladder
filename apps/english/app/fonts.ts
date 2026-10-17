import localFont from 'next/font/local';
import { IBM_Plex_Mono, Newsreader } from 'next/font/google';

// Self-hosted at build: no runtime requests to Google.
export const display = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  // Next has no fallback metrics for Newsreader; Georgia is close enough without adjustment.
  adjustFontFallback: false,
});

// Atkinson Hyperlegible Next isn't in next/font/google for Next 14, so it ships from app/font-files.
export const body = localFont({
  src: [
    { path: './font-files/AtkinsonNext-Variable.woff2', weight: '200 800', style: 'normal' },
    { path: './font-files/AtkinsonNext-Italic-Variable.woff2', weight: '200 800', style: 'italic' },
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});
