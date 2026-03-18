// Service Worker passivo per validazione PWA
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Lascia passare il traffico web normale
    event.respondWith(fetch(event.request));
});
