const CACHE_NAME = 'swasthya-setu-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './frontend/index.html',
  './frontend/auth.css',
  './frontend/patient.css',
  './frontend/doctor.css',
  './frontend/admin.css',
  './frontend/worker.css',
  './frontend/i18n.js',
  './frontend/auth.js',
  './frontend/auth-ui.js',
  './frontend/patient.js',
  './frontend/doctor.js',
  './frontend/admin.js',
  './frontend/worker.js',
  './frontend/firebase-config.js',
  './frontend/firebase-service.js',
  './frontend/pdf-generator.js',
  './manifest.json'
];

// Install Event - Cache Core Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching Swasthya Setu Offline Assets');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('[ServiceWorker] Some assets could not be cached on install:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Stale-while-revalidate / Offline fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Return fallback if completely offline
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
