// version: 1

async function initialCache() {
  const cache = await caches.open('jsrun.me');
  await cache.addAll(['/', '/main.js', '/style.css']);
}

async function respond(request) {
  const response = await caches.match(request);
  return response ?? fetch(request);
}

self.addEventListener('install', (event) => {
  event.waitUntil(initialCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(respond(event.request));
});
