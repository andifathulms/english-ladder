/* Ladder service worker template. Copy to apps/<app>/public/sw.js and replace the two
   placeholders: __CACHE_PREFIX__ (e.g. "english-ladder-") and __SHELL__ (the precache list).
   Bump CACHE_VERSION on every release. Logic is course-agnostic; only the cache prefix and the
   precached shell differ per app. */
const CACHE_VERSION = 'v1.0.0';
const CACHE = `__CACHE_PREFIX__${CACHE_VERSION}`;
const PREFIX = '__CACHE_PREFIX__';
// Works under any base path: everything is relative to the registration scope.
const SCOPE = self.registration.scope;
const SHELL = __SHELL__;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((c) => Promise.all(SHELL.map((p) => c.add(new URL(p, SCOPE)).catch(() => {}))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !req.url.startsWith(SCOPE)) return;

  // Hashed build assets and fonts never change: cache first.
  if (url.pathname.includes('/_next/static/')) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
            return res;
          }),
      ),
    );
    return;
  }

  // Pages and RSC payloads: stale-while-revalidate, so opened lessons work offline.
  event.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(req, { ignoreSearch: url.searchParams.has('_rsc') }).then((hit) => {
        const fresh = fetch(req)
          .then((res) => {
            if (res.ok) c.put(req, res.clone());
            return res;
          })
          .catch(() => hit || c.match(new URL('', SCOPE)));
        return hit || fresh;
      }),
    ),
  );
});
