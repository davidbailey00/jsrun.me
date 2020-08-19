// version: 11

async function initialCache() {
  await caches.delete('jsrun.me');
  const cache = await caches.open('jsrun.me');
  await cache.addAll(['/', '/?html', '/?dweet', '/main.js', '/style.css']);
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
