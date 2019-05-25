const staticCacheName = 'everton-strack-2019-05-25-11-08';

const filesToCache = [
  
'/',
  
'/sobre/',
  
'/blog/',
  
'/contato/',
  
'/projetos/',
  
'/404/',
  

'/blog/o-poder-do-nao/',
  
'/blog/react-hooks/',
  
'/blog/uma-conversa-sobre-coisas-importantes/',
  
'/blog/o-que-voce-busca-na-vida/',
  
'/blog/internacionalizacao-com-create-react-app/',
  
'/blog/usando-sass-com-reactjs/',
  

'/assets/styles/all.css',
  
'/assets/images/404.jpg',
  
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
this.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        // return caches.match('/offline/index.html');
        return '<h2>Você está Offline</h2>';
      })
  )
});