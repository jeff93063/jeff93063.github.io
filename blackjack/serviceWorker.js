const staticCacheName = "blackjack-static-v10";
const assets = [
	"/blackjack/",
	"/blackjack/index.html",
	"/blackjack/club.svg",
	"/blackjack/diamond.svg",
	"/blackjack/heart.svg",
	"/blackjack/spade.svg"
];

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open(staticCacheName).then(cache => {
			cache.addAll(assets);
		})
	);
});

/*
self.addEventListener('activate', evt => {
	evt.waitUntil(
		caches.keys().then(keys =>{
			//console.log(keys);
			return Promise.all(keys
				.filter(key => key !== staticCacheName)
				.map(key => caches.delete(key))
			)
		})
	);
});
*/

self.addEventListener('activate', function(event) {
	var static_cache_prefix = staticCacheName.substring(0,staticCacheName.indexOf("-"));
	event.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key.indexOf(static_cache_prefix) > -1 && key!=staticCacheName) { 
					 console.log("Cache delete : "+key);
					 return caches.delete(key);
				}
			}));
		})
	);
});


self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request);
		})
	);
});
