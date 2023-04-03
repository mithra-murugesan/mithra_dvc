self.addEventListener('install', (e) => {

   
  e.waitUntil(
    caches.open('mithra').then((cache) => cache.addAll([
      '/mithra_murugesan/',
    ])),
  );  
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
