/**
 * serive worker file
 */

const swVer = '1.0.0';

const assetsCache = [
    "./index.html",
    "./stylesheets/app.css"
]

// Start Install Event
self.addEventListener('install', function(event) {
  // Wait until the promise is fulfiled.
  event.waitUntil(
    // Start caching files, within our serviceworker cache
    caches.open(swVer).then(function(cache) {
      // List of cache files
      return cache.addAll(assetsCache)
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
	return self.clients.claim();
});

// Fetch our cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
