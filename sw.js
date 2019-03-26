var CACHE_NAME = 'latihan-pwa-cache-v1';

var urlToCache = [
    '/',
    '/images/Winter.jpg',
    '/css/style.css',
    '/js/jquery.min.js',
    '/js/main.js',
    '/js/script.js',
    '/manifest.json',
    '/sw.js'
];

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(
            function(cache){
                return cache.addAll(urlToCache);
            }
        )
    )
});

self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheName){
            return Promise.all(
                cacheName.filter(function(cacheName){
                    return cacheName !== CACHE_NAME;
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            )
        })
    );
})