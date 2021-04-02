---
layout: null
---

const staticCacheName = 'everton-strack-{{ site.time | date: "%Y-%m-%d-%H-%M" }}';

const filesToCache = [
  {% for page in site.pages_to_cache %}
'{{ page }}',
  {% endfor %}
{% for post in site.posts limit: 27 %}
'{{ post.url }}',
  {% endfor %}
{% for asset in site.files_to_cache %}
'{{ asset }}',
  {% endfor %}
];


// Cache on install
this.addEventListener("install", event => {
  this.skipWaiting();

  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
    })
  )
});

// Clear cache on activate
this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => (cacheName.startsWith('everton-strack-')))
          .filter(cacheName => (cacheName !== staticCacheName))
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Serve from Cache
// this.addEventListener("fetch", event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         return response || fetch(event.request);
//       })
//       .catch(() => {
//         // return caches.match('/offline/index.html');
//         return '<h2>Você está Offline</h2>';
//       })
//   )
// });

self.addEventListener('fetch', function(event){
  event.respondWith(async function () {
     let cache = await caches.open(staticCacheName);
     const cachedResponsePromise = await cache.match(event.request);
     const networkResponsePromise = fetch(event.request);
     event.waitUntil(async function () {
        const networkResponse = await networkResponsePromise;
        await cache.put(event.request, networkResponse.clone());
     }());
     return cachedResponsePromise || networkResponsePromise;
   }());
});
