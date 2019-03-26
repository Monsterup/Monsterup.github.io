var CACHE_NAME = 'latihan-pwa-cache-v1';

var urlToCache = [
    '/',
    '/css/style.css',
    '/images/Winter.jpg',
    '/js/map-custom.js',
    '/js/jquery.min.js',
    '/js/map-custom.js',
    '/js/script.js',
    '/manifest.json',
    '/js/main.js'
];

// install cache on browser
self.addEventListener('install', function(event){
    //do install
    event.waitUntil(
        caches.open(CACHE_NAME).then(
            function(cache){
                //cek apakah cache sudah terinstall
                console.log("service worker do install . .");
                return cache.addAll(urlToCache);
            }
        )
    );
    self.skipWaiting();
});

//aktivasi service worker
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheName){
            return Promise.all(
                //jika sudah ada cache dengan versi beda maka di hapus
                cacheName.filter(function(cacheName){
                    return cacheName !== CACHE_NAME;
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
    if(self.clients && clients.claim){
        clients.claim();
    }
});
