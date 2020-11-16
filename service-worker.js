importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
} else {
  console.log(`Workbox gagal dimuat`);
}

let urlsToCache = [
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
];

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "2" },
  { url: "/css/style.css", revision: "2" },
  { url: "/css/materialize.min.css", revision: "2" },
  { url: "/js/api.js", revision: "2" },
  { url: "/js/db.js", revision: "2" },
  { url: "/js/idb.js", revision: "2" },
  { url: "/js/materialize.min.js", revision: "2" },
  { url: "/js/nav.js", revision: "2" },
  { url: "/js/registerSW.js", revision: "2" },
  { url: "/assets/icon_144.png", revision: "2" },
  { url: "/assets/icon_192.png", revision: "2" },
  { url: "/assets/logo_white.png", revision: "2" },
  { url: "/assets/logo.png", revision: "2" },
  { url: "/assets/player.jpg", revision: "2" },
  { url: "/assets/question_mark.jpg", revision: "2" },
  { url: "/index.html", revision: "2" },
  { url: "/manifest.json", revision: "2" },
  { url: "/package-lock.json", revision: "2" },
  { url: "/service-worker.js", revision: "2" },
  { url: "/hosting.txt", revision: "2" },
]);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-static-font',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'football-data',
  })
);

self.addEventListener("push", (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  let options = {
    body: body,
    icon: "./assets/icon_192.png",
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification("Halo sobat UEFA", options)
  );
});
