import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ladder/core': path.resolve(__dirname, '../../packages/ladder-core/src'),
      '@': path.resolve(__dirname),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    // Engine tests run once, with English (apps/english/vitest.config.ts).
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    globals: true,
  },
});
