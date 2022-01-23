import { GraphqlSync } from '@/utils';

const graphqlSync = new GraphqlSync();
const cacheName = 'version2_1';


const filesToCache = [
  '/',
  '/manifest.json',
  '/main.js',
  '/images/lighthouse.png'
];

self.addEventListener('sync',(e : any)=>{
  const [method,token,payLoad] = e.tag.split('?sync?')
  e.waitUntil(graphqlSync[method](token,payLoad))
})
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
        return response || fetch(e.request)
      });
    })
  );
});