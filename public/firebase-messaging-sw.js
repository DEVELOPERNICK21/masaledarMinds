/* Minimal service worker at root — silences /firebase-messaging-sw.js 404s from
   browser probes or stale registrations. This site does not use FCM; replace
   with the Firebase console snippet if you add push notifications later. */
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
