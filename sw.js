// Uygulamayı ilk açılıştan sonra çevrimdışı da çalıştırır (önce önbellek, sonra ağ).
const CACHE = 'g112-shift5-v9';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './img/u5_elif.jpg', './img/u5_can.jpg', './img/u5_arrival.jpg',
  './img/u5_scene_safety.jpg', './img/u5_green_flag.jpg',
  './img/u5_p1.jpg', './img/u5_p2.jpg', './img/u5_p3.jpg', './img/u5_p4.jpg',
  './img/u5_p5.jpg', './img/u5_p6.jpg', './img/u5_p7.jpg', './img/u5_p8.jpg',
  './img/u5_station.jpg', './img/u5_radio.jpg', './img/u5_end_of_shift.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
