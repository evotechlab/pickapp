const CACHE_NAME = 'pickapp-v5'; // Incrementato versione
const ASSETS = [
  '/pickapp/index.html',
  '/pickapp/manifest.json',
  '/pickapp/icon-512.png',
  '/pickapp/'
];

// Installazione
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Usiamo addAll ma con un catch per evitare che un singolo file rompa tutto
      return cache.addAll(ASSETS).catch(err => console.warn("Errore cache assets:", err));
    })
  );
  self.skipWaiting(); 
});

// Attivazione e pulizia vecchia cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

// Fetch con fallback sulla rete
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // Se sei offline e il file non è in cache, non crashare
        console.log("Offline e asset non in cache");
      });
    })
  );
});
