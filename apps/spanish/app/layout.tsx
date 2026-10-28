import type { Metadata, Viewport } from 'next';
import '@/styles/theme.css';
import '@ladder/core/styles/globals.css';
import '@/styles/spanish.css';
import { body, display, mono } from './fonts';
import { themeScript } from './themeScript';
import { THEME_COLOR } from '@/course/progress';
import { withBase } from '@ladder/core/lib/basePath';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: { default: 'Spanish Ladder', template: '%s · Spanish Ladder' },
  description: 'Kursus bahasa Spanyol bertingkat untuk penutur bahasa Indonesia, dari nol sampai C1. Pelan-pelan, tapi naik.',
  manifest: withBase('/manifest.webmanifest'),
  icons: { icon: withBase('/icons/icon.svg'), apple: withBase('/icons/icon-192.png') },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" dir="ltr" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* One theme-color, set from the in-app theme by the theme script and applySettings. */}
        <meta name="theme-color" content={THEME_COLOR.light} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
