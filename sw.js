console.info('SW File');

// Start Install Event
self.addEventListener('install', function(event) {
    // Wait until the promise is fulfiled.
    event.waitUntil(
        // Start caching files, within our serviceworker cache
        caches.open('serviceworker').then(function(cache) {
            console.log('Start cache');
            // List of cache files
            return cache.addAll([
                "/index.html",
                "/stylesheets/app.css"
            ])
        })
    );
});

// Fetch our cache
self.addEventListener('fetch', function(event) {
    // Respond to the request
    event.respondWith(
        fetch(event.request).catch(function() {
            // Reutn cache
            return caches.match(event.request);
        })
    );
});
