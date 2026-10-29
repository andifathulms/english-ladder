import localFont from 'next/font/local';
import { IBM_Plex_Mono, Newsreader } from 'next/font/google';

// Self-hosted at build: no runtime requests to Google. German needs ä ö ü ß Ä Ö Ü „ “ ‚ ‘ » «
// (DESIGN §4): all are in `latin` (the glyph test checks the built fonts), so `latin-ext` is left out.
// Capital ẞ is only in latin-ext; content never uses it (plan R8, the lint forbids it).
//
// First paint on a slow phone (Lighthouse mobile): the fonts were 580 KB. Newsreader without its
// optical-size axis is 120 KB instead of 270 KB, and the display and mono faces are not preloaded
// (the body face is: most first-screen text is set in it). Text shows in the fallback until each
// face arrives (display: swap), with no layout shift measured.
export const display = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  // Next has no fallback metrics for Newsreader; Georgia is close enough without adjustment.
  adjustFontFallback: false,
  preload: false,
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
  preload: false,
});
