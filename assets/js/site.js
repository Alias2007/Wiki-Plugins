(function(){
const $=s=>document.querySelector(s);
let navData=null,docCache={};
const contentRoot=$('#pageContent'),navRoot=$('#pluginNavigation'),search=$('#globalSearch'),results=$('#searchResults');
function route(){const raw=location.hash.replace(/^#/,'');if(!raw||raw==='home')return{home:true};const [plugin,page='overview']=raw.split('/');return{plugin,page};}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function pluginById(id){return navData.plugins.find(p=>p.id===id);}
function renderNavigation(){
 navRoot.innerHTML='';
 navData.plugins.forEach(plugin=>{
  const group=document.createElement('section');group.className='plugin-group';group.dataset.plugin=plugin.id;
  const button=document.createElement('button');button.className='plugin-heading';button.type='button';
  button.innerHTML='<i class="plugin-dot"></i><span>'+escapeHtml(plugin.name)+'</span><span class="plugin-chevron">▾</span>';
  button.addEventListener('click',()=>group.classList.toggle('collapsed'));
  const pages=document.createElement('div');pages.className='plugin-pages';
  plugin.pages.forEach(page=>{
   const a=document.createElement('a');a.className='plugin-page';a.href='#'+plugin.id+'/'+page.id;a.textContent=page.title;a.dataset.route=plugin.id+'/'+page.id;pages.appendChild(a);
  });
  group.append(button,pages);navRoot.appendChild(group);
 });
 const count=$('#pluginCount');if(count)count.textContent=navData.plugins.length+' PLUGINS';
}
function homeHtml(){
 const cards=navData.plugins.map(p=>'<a class="plugin-card" href="#'+p.id+'/overview"><div class="plugin-card-head"><span class="plugin-type">'+escapeHtml(p.type)+'</span><span>↗</span></div><h2>'+escapeHtml(p.name)+'</h2><p>'+escapeHtml(p.description)+'</p><small>'+p.pages.length+' secciones de documentación</small><div class="card-link">ABRIR DOCUMENTACIÓN →</div></a>').join('');
 return '<section class="home-hero"><div class="eyebrow">APOLOMC NETWORK · CENTRO DE AYUDA</div><h1>Documentación de plugins</h1><p>Encuentra cómo funciona cada sistema, qué comandos utiliza, qué variables ofrece y dónde se configura. Selecciona un plugin para ver sus funciones y subcategorías.</p></section><div class="section-label">CATEGORÍAS DE PLUGINS</div><div class="plugin-grid">'+cards+'</div><div class="section-label">ACCESO RÁPIDO</div><div class="doc-nav"><a href="#apoloevent/commands">ApoloEvent · Comandos</a><a href="#kitpvp/variables">KitPvP-Core · Variables</a><a href="#rankup/unlocks">ApoloRankUp · Desbloqueos</a><a href="#apolorr/commands">ApoloRR · Comandos</a><a href="#practice/commands">ApoloPractice · Administración</a></div>';
}
async function getDoc(plugin){
 if(docCache[plugin])return docCache[plugin];
 const response=await fetch('content/'+plugin+'.md?v=3');
 if(!response.ok)throw new Error('No se pudo cargar content/'+plugin+'.md ('+response.status+')');
 const text=await response.text();docCache[plugin]=text;return text;
}
function activeNav(plugin,page){
 document.querySelectorAll('.plugin-page').forEach(a=>a.classList.toggle('active',a.dataset.route===plugin+'/'+page));
 document.querySelectorAll('.plugin-group').forEach(g=>{if(g.dataset.plugin===plugin)g.classList.remove('collapsed');});
 $('#homeLink').classList.toggle('active',!plugin);
}
async function showRoute(){
 const r=route();
 if(r.home){activeNav('','');$('#breadcrumbs').innerHTML='<span>ApoloMC</span><span>/</span><b>Inicio</b>';contentRoot.innerHTML=homeHtml();return;}
 const plugin=pluginById(r.plugin);
 if(!plugin){location.hash='#home';return;}
 const page=plugin.pages.find(x=>x.id===r.page)||plugin.pages[0];
 activeNav(plugin.id,page.id);
 $('#breadcrumbs').innerHTML='<span>ApoloMC</span><span>/</span><span>'+escapeHtml(plugin.name)+'</span><span>/</span><b>'+escapeHtml(page.title)+'</b>';
 contentRoot.innerHTML='<div class="loading">Cargando '+escapeHtml(plugin.name)+'…</div>';
 try{
  const md=await getDoc(plugin.id);
  contentRoot.innerHTML=marked.parse(md);
  contentRoot.querySelectorAll('pre').forEach(pre=>{
   const code=pre.querySelector('code');if(!code)return;
   const b=document.createElement('button');b.className='copy-code';b.type='button';b.textContent='Copiar';
   b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(code.innerText);b.textContent='Copiado';setTimeout(()=>b.textContent='Copiar',1200);}catch(e){b.textContent='No disponible';}});
   pre.insertBefore(b,pre.firstChild);
  });
  const target=contentRoot.querySelector('#'+CSS.escape(page.id));
  if(target)target.scrollIntoView({block:'start',behavior:'smooth'});
 }catch(e){contentRoot.innerHTML='<h1>No se pudo abrir esta sección</h1><p>'+escapeHtml(e.message)+'</p><p>Comprueba que el archivo esté publicado en la rama gh-pages.</p>';}
}
function sectionIndex(plugin,md){
 const pieces=md.split(/(?=<a id="[^"]+"><\/a>)/g);
 return pieces.map(piece=>{
  const match=piece.match(/^<a id="([^"]+)"><\/a>/);
  if(!match)return null;
  const page=plugin.pages.find(x=>x.id===match[1]);
  return page?{plugin:plugin.id,pluginName:plugin.name,page,text:(page.title+' '+page.description+' '+(page.tags||'')+' '+piece).toLowerCase()}:null;
 }).filter(Boolean);
}
async function buildSearch(){
 const indexed=[];
 await Promise.all(navData.plugins.map(async plugin=>{
  try{indexed.push(...sectionIndex(plugin,await getDoc(plugin.id)));}catch(e){}
 }));
 function show(query){
  const q=query.trim().toLowerCase();if(!q){results.hidden=true;results.innerHTML='';return;}
  const hits=indexed.filter(x=>x.text.includes(q)).slice(0,14);
  results.innerHTML=hits.length?hits.map(x=>'<a class="search-result" href="#'+x.plugin+'/'+x.page.id+'"><b>'+escapeHtml(x.pluginName)+' · '+escapeHtml(x.page.title)+'</b><small>'+escapeHtml(x.page.description)+'</small></a>').join(''):'<div class="empty-result">No encontramos una sección con ese término.</div>';
  results.hidden=false;
 }
 search.addEventListener('input',()=>show(search.value));
 search.addEventListener('keydown',e=>{if(e.key==='Escape'){results.hidden=true;search.blur();}if(e.key==='Enter'){const first=results.querySelector('a');if(first)location.hash=first.getAttribute('href').slice(1);results.hidden=true;}});
 document.addEventListener('click',e=>{if(!e.target.closest('.top-search'))results.hidden=true;});
 document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();search.focus();}});
}
async function init(){
 try{
  const r=await fetch('data/navigation.json?v=3');if(!r.ok)throw new Error('No se pudo cargar el índice.');
  navData=await r.json();renderNavigation();await showRoute();buildSearch();
  window.addEventListener('hashchange',showRoute);
 }catch(e){contentRoot.innerHTML='<h1>Error al cargar documentación</h1><p>'+escapeHtml(e.message)+'</p>';}
}
$('#mobileMenu').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
$('#sidebar').addEventListener('click',e=>{if(e.target.closest('a'))$('#sidebar').classList.remove('open');});
$('#homeLink').addEventListener('click',()=>$('#sidebar').classList.remove('open'));
init();
})();