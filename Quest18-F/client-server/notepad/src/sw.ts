import { Graphql } from "@/utils";

const graphql = new Graphql();
const cacheName = 'version1-3';
const filesToCache = [
  '/',
  '/manifest.json',
  '/main.js',
  '/images/lighthouse.png'
];

self.addEventListener('install', (e)=> {
  console.log(cacheName,'installed, remove all cache')
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((cacheName) => {
      caches.delete(cacheName);
    });
  });
});

self.addEventListener('activate',(e : any)=>{
  console.log(cacheName,'activated, cache files')
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
})

self.addEventListener('fetch', (e : any) => {
  e.respondWith(
    caches.open(cacheName).then((cache : any) => {
      return cache.match(e.request).then(function (response) {
        return response || fetch(e.request).then(function(response) {
          return response;
        });
      });
    })
  );
});