/* Sprechpost – Offline-Speicher. Version ergibt sich aus dem Inhalt der Dateien. */
const CACHE = 'sprechpost-6ad1fa3358';
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "vendor/mp4-muxer.js",
  "fonts/fonts.css",
  "fonts/barlow-condensed-latin-700-normal.woff2",
  "fonts/barlow-condensed-latin-ext-700-normal.woff2",
  "fonts/martian-mono-latin-400-normal.woff2",
  "fonts/martian-mono-latin-500-normal.woff2",
  "fonts/martian-mono-latin-ext-400-normal.woff2",
  "fonts/martian-mono-latin-ext-500-normal.woff2",
  "fonts/nunito-latin-900-normal.woff2",
  "fonts/nunito-latin-ext-900-normal.woff2",
  "fonts/schibsted-grotesk-latin-400-normal.woff2",
  "fonts/schibsted-grotesk-latin-500-normal.woff2",
  "fonts/schibsted-grotesk-latin-600-normal.woff2",
  "fonts/schibsted-grotesk-latin-700-normal.woff2",
  "fonts/schibsted-grotesk-latin-800-normal.woff2",
  "fonts/schibsted-grotesk-latin-900-normal.woff2",
  "fonts/schibsted-grotesk-latin-ext-400-normal.woff2",
  "fonts/schibsted-grotesk-latin-ext-500-normal.woff2",
  "fonts/schibsted-grotesk-latin-ext-600-normal.woff2",
  "fonts/schibsted-grotesk-latin-ext-700-normal.woff2",
  "fonts/schibsted-grotesk-latin-ext-800-normal.woff2",
  "fonts/schibsted-grotesk-latin-ext-900-normal.woff2",
  "icons/icon-v2-192.png",
  "icons/icon-v2-512.png",
  "icons/icon-v2-maskable-512.png",
  "icons/apple-touch-icon-v2.png",
  "icons/favicon.svg"
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('sprechpost-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Seite selbst: erst Netz (damit Updates sofort da sind), offline aus dem Speicher
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('./', copy)); } return res; })
        .catch(() => caches.match('./'))
    );
    return;
  }

  // Schriften, Bibliothek, Symbole: sofort aus dem Speicher, im Hintergrund auffrischen
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return res; })
        .catch(() => hit);
      return hit || net;
    })
  );
});
