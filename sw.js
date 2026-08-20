// hff-v23 — app shell cache with network-first HTML updates
const CACHE='hff-v23';
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

  const url=new URL(e.request.url);
  const isHtml=e.request.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/');

  if(isHtml){
    e.respondWith(
      fetch(e.request)
        .then(res=>{
          if(res.ok){
            const copy=res.clone();
            caches.open(CACHE).then(c=>c.put(e.request,copy));
          }
          return res;
        })
        .catch(()=>caches.match(e.request).then(hit=>hit||caches.match('./index.html')))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(hit=>{
      if(hit)return hit;
      return fetch(e.request).then(res=>{
        if(res.ok){
          const copy=res.clone();
          caches.open(CACHE).then(c=>c.put(e.request,copy));
        }
        return res;
      });
    })
  );
});
