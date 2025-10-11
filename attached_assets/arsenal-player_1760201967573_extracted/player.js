// Arsenal player: loads tracks/manifest.json and handles lyrics (LRC or TXT)
const state = {
  tracks: [], index: -1,
  audio: document.getElementById('audio'),
  els: {
    list: document.getElementById('trackList'),
    title: document.getElementById('title'),
    artist: document.getElementById('artist'),
    cover: document.getElementById('cover'),
    play: document.getElementById('play'),
    prev: document.getElementById('prev'),
    next: document.getElementById('next'),
    seek: document.getElementById('seek'),
    lyrics: document.getElementById('lyrics'),
    download: document.getElementById('download'),
    search: document.getElementById('search'),
  },
  lrc: null,
};

function dedupeByTitle(tracks){
  const seen = new Map();
  for(const t of tracks){
    const key = (t.title||'').trim().toLowerCase();
    if(!key) continue;
    if(!seen.has(key)) seen.set(key, t);
  }
  return Array.from(seen.values());
}

async function loadManifest(){
  const res = await fetch('/tracks/manifest.json', {cache:'no-store'});
  const data = await res.json();
  state.tracks = dedupeByTitle(data.tracks || []);
  renderList(state.tracks);
}

function renderList(items){
  const ul = state.els.list; ul.innerHTML = '';
  items.forEach((t,i)=>{
    const li = document.createElement('li');
    li.innerHTML = `<strong>${t.title}</strong><br><small class="muted">${t.artist||''}</small>`;
    li.addEventListener('click', ()=> selectTrack(i));
    ul.appendChild(li);
  });
}

function selectTrack(i){
  state.index = i;
  const t = state.tracks[i];
  const {audio, els} = state;
  els.title.textContent = t.title || '—';
  els.artist.textContent = t.artist || '—';
  els.cover.src = t.coverUrl || '/assets/img/cover.png';
  audio.src = t.mp3Url;
  audio.play().catch(()=>{});
  els.play.textContent = '⏸';
  els.download.href = t.mp3Url;
  els.download.setAttribute('download', (t.title||'track')+'.mp3');
  loadLyrics(t.lyricsUrl);
  Array.from(els.list.children).forEach((li,idx)=> li.classList.toggle('active', idx===i));
  if('mediaSession' in navigator){
    navigator.mediaSession.metadata = new MediaMetadata({title:t.title, artist:t.artist, artwork: t.coverUrl?[{src:t.coverUrl}] : []});
  }
}

async function loadLyrics(url){
  state.lrc = null;
  const el = state.els.lyrics;
  if(!url){ el.textContent = '—'; return; }
  try{
    const res = await fetch(url, {cache:'no-store'});
    const txt = await res.text();
    if(url.endsWith('.lrc')){ state.lrc = parseLRC(txt); updateSyncedLyrics(); }
    else { el.textContent = txt; }
  }catch(_){ el.textContent = 'Lyrics unavailable.'; }
}

function parseLRC(s){
  const out = [];
  const re = /^\[(\d{1,2}):(\d{2})(?:\.(\d{1,2}))?\](.*)$/;
  for(const line of s.split(/\r?\n/)){
    const m = line.match(re);
    if(m){
      const t = parseInt(m[1])*60 + parseInt(m[2]) + (m[3]?parseInt(m[3]):0)/100;
      out.push({t, text:m[4].trim()});
    }
  }
  return out.sort((a,b)=>a.t-b.t);
}

function updateSyncedLyrics(){
  const el = state.els.lyrics;
  if(!state.lrc){ return; }
  const t = state.audio.currentTime;
  let idx = 0;
  while(idx < state.lrc.length-1 && state.lrc[idx+1].t <= t){ idx++; }
  const start = Math.max(0, idx-3);
  const end = Math.min(state.lrc.length, idx+5);
  el.innerHTML = state.lrc.slice(start,end).map((l,j)=>{
    const active = (start+j)===idx ? ' style="color:#21d4fd;font-weight:700"' : '';
    return `<div${active}>${l.text}</div>`;
  }).join('');
}

state.audio.addEventListener('timeupdate', ()=>{
  state.els.seek.value = (state.audio.currentTime / (state.audio.duration||1))*100;
  if(state.lrc) updateSyncedLyrics();
});
state.els.seek.addEventListener('input', ()=>{
  state.audio.currentTime = state.audio.duration * (state.els.seek.value/100);
});
state.els.play.addEventListener('click', ()=>{
  if(state.audio.paused){ state.audio.play(); state.els.play.textContent='⏸'; }
  else { state.audio.pause(); state.els.play.textContent='▶️'; }
});
state.els.prev.addEventListener('click', ()=>{ if(state.index>0) selectTrack(state.index-1); });
state.els.next.addEventListener('click', ()=>{ if(state.index<state.tracks.length-1) selectTrack(state.index+1); });
state.audio.addEventListener('ended', ()=>{ if(state.index < state.tracks.length-1) selectTrack(state.index+1); });
state.els.search.addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase().trim();
  const filtered = state.tracks.filter(t=> (t.title||'').toLowerCase().includes(q) || (t.artist||'').toLowerCase().includes(q));
  renderList(filtered);
});
loadManifest().then(()=>{ if(state.tracks.length) selectTrack(0); });