const CACHE_NAME = 'pickapp-v2';
const ASSETS = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://unpkg.com/html5-qrcode'
];

// Installazione: salva i file in cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Intercettazione richieste: risponde dalla cache se offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
