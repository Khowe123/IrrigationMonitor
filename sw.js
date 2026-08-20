// hff-v22 — only pre-cache app shell; CDN libs cached on first use
const CACHE='hff-v22';
const SHELL=['./','./index.html','./manifest.json','./icon.svg'];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(SHELL))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(e.request.url.includes('api.anthropic.com'))return;
  if(e.request.url.includes('supabase.co'))return;
  e.respondWith(
    caches.match(e.request).then(hit=>{
      if(hit)return hit;
      return fetch(e.request).then(res=>{
        if(res.ok){
          const c=res.clone();
          caches.open(CACHE).then(ch=>ch.put(e.request,c));
        }
        return res;
      }).catch(()=>caches.match('./index.html'));
    })
  );
});
