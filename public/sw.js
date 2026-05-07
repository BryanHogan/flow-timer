// Bump CACHE_VERSION on each release to invalidate stale assets.
const CACHE_VERSION = 'flow-timer-v1';

const APP_SHELL = [
  '/',
  '/about',
  '/privacy',
  '/404',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/favicon.ico',
  '/icons/Chevron-Up-Icon.svg',
  '/icons/Close-Icon.svg',
  '/icons/Flow-Timer-Logo.svg',
  '/icons/Pause-Icon.svg',
  '/icons/Play-Icon.svg',
  '/icons/Reset-All-Icon.svg',
  '/icons/Reset-Timer-Icon.svg',
  '/icons/Settings-Icon.svg',
  '/icons/Skip-Back-Icon.svg',
  '/icons/Skip-Icon.svg',
  '/icons/Trash-Icon.svg',
  '/sounds/notification-clang.mp3',
  '/sounds/notification-pluck.mp3',
  '/images/Flow-Timer-Preview.png',
  '/images/192-flow-timer.png',
  '/images/512-flow-timer.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      // Use addAll with individual catches so one missing asset doesn't abort install.
      Promise.all(
        APP_SHELL.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch(() => {})
        )
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Network-first for navigations so new deploys propagate; fall back to cache offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then((cached) => cached || caches.match('/'))
        )
    );
    return;
  }

  // Stale-while-revalidate for same-origin static assets.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
