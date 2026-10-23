const V="copilot-v2",SHELL=["./","index.html","css/styles.css","js/app.js","offline.html","manifest.webmanifest","favicon.svg","apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","assets/README.txt"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res}).catch(()=>r.mode==="navigate"?caches.match("offline.html"):undefined)))});
