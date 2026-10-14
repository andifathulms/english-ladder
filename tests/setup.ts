import '@testing-library/jest-dom/vitest';

// Node 25+ defines its own experimental localStorage global, which shadows jsdom's.
// Replace it with a simple in-memory Storage so tests behave the same on every Node version.
if (typeof globalThis.localStorage?.clear !== 'function') {
  class MemoryStorage {
    private m = new Map<string, string>();
    get length() {
      return this.m.size;
    }
    clear() {
      this.m.clear();
    }
    getItem(k: string) {
      return this.m.has(k) ? this.m.get(k)! : null;
    }
    setItem(k: string, v: string) {
      this.m.set(k, String(v));
    }
    removeItem(k: string) {
      this.m.delete(k);
    }
    key(i: number) {
      return [...this.m.keys()][i] ?? null;
    }
  }
  Object.defineProperty(globalThis, 'localStorage', { value: new MemoryStorage(), configurable: true });
}
