var CACHE_NAME = 'latihan-pwa-cache-v1';

var urlToCache = [
    '/',
    '/css/bootstrap.css',
    '/css/main.css',
    '/css/style.css',
    '/images/Winter.jpg',    
    '/js/map-custom.js',
    '/js/jquery.min.js',
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

//fetch cache
self.addEventListener('fetch', function(event){
    var request = event.request;
    var url = new URL(request.url);

    /**
     * menggunakan data local cache
     */

     if(url.origin === location.origin){
         event.respondWith(
             caches.match(request).then(function(response){
                 //jika ada data di caache, maka tampilkan data cache, jika tidak maka petch request
                 return response || fetch(request);
             })
         )
     }else{
         //internet API
         event.respondWith(
             caches.open('mahasiswa-cache-v1').then(function(cache){
                 return fetch(request).then(function(liveRequest){
                     cache.put(request, liveRequest.clone());
                     //save cache to mahasiswa-cache-v1
                     return liveRequest;
                 }).catch(function(){
                     return caches.match(request).then(function(response){
                         if(response) return response;
                         return caches.match('/fallback.json');
                     })
                 })
             })
         )
     }
});