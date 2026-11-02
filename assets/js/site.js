(function(){
'use strict';
const $=s=>document.querySelector(s);
let navData=null,docCache={},currentRender=0,searchIndex=[];
const root=$('#pageContent'),navRoot=$('#pluginNavigation'),search=$('#globalSearch'),results=$('#searchResults');
const langs=['es','en','pt','fr','de'];
const ui={
es:{documentation:'DOCUMENTACIÓN',home:'Inicio',missing:'¿Falta información?',searchTip:'Busca por comando, permiso, variable o nombre de función.',suggest:'Enviar sugerencia ↗',hero:'Documentación de plugins',intro:'Encuentra funciones, comandos, variables y configuración de los cinco plugins de ApoloMC.',categories:'CATEGORÍAS DE PLUGINS',quick:'ACCESO RÁPIDO',searchPlaceholder:'Buscar comandos, variables o funciones…',noResults:'No encontramos una sección con ese término.',loading:'Cargando documentación…',rights:'Todos los derechos reservados.',open:'ABRIR DOCUMENTACIÓN →',copy:'Copiar',copied:'Copiado',copyFail:'No disponible',pluginCount:'PLUGINS',translationWait:'Traduciendo documentación…',translationDone:'Traducción automática aplicada. Los comandos, rutas YAML, permisos y variables se conservan exactamente.',translationFail:'No se pudo conectar al servicio de traducción. Se muestra el contenido original en español.',homeCrumb:'Inicio',categoriesLabel:'Categorías',theme:'Tema',language:'Idioma'},
en:{documentation:'DOCUMENTATION',home:'Home',missing:'Missing information?',searchTip:'Search by command, permission, variable or feature name.',suggest:'Send a suggestion ↗',hero:'Plugin documentation',intro:'Find features, commands, variables and configuration for all five ApoloMC plugins.',categories:'PLUGIN CATEGORIES',quick:'QUICK ACCESS',searchPlaceholder:'Search commands, variables or features…',noResults:'No section matched that term.',loading:'Loading documentation…',rights:'All rights reserved.',open:'OPEN DOCUMENTATION →',copy:'Copy',copied:'Copied',copyFail:'Unavailable',pluginCount:'PLUGINS',translationWait:'Translating documentation…',translationDone:'Automatic translation applied. Commands, YAML paths, permissions and variables remain unchanged.',translationFail:'The translation service could not be reached. The original Spanish content is shown.',homeCrumb:'Home',categoriesLabel:'Categories',theme:'Theme',language:'Language'},
pt:{documentation:'DOCUMENTAÇÃO',home:'Início',missing:'Falta alguma informação?',searchTip:'Pesquise por comando, permissão, variável ou nome da função.',suggest:'Enviar sugestão ↗',hero:'Documentação dos plugins',intro:'Encontre funções, comandos, variáveis e configurações dos cinco plugins ApoloMC.',categories:'CATEGORIAS DE PLUGINS',quick:'ACESSO RÁPIDO',searchPlaceholder:'Pesquisar comandos, variáveis ou funções…',noResults:'Nenhuma seção correspondeu ao termo.',loading:'Carregando documentação…',rights:'Todos os direitos reservados.',open:'ABRIR DOCUMENTAÇÃO →',copy:'Copiar',copied:'Copiado',copyFail:'Indisponível',pluginCount:'PLUGINS',translationWait:'Traduzindo documentação…',translationDone:'Tradução automática aplicada. Comandos, caminhos YAML, permissões e variáveis permanecem inalterados.',translationFail:'Não foi possível acessar o serviço de tradução. O conteúdo original em espanhol será exibido.',homeCrumb:'Início',categoriesLabel:'Categorias',theme:'Tema',language:'Idioma'},
fr:{documentation:'DOCUMENTATION',home:'Accueil',missing:'Une information manque ?',searchTip:'Recherchez par commande, permission, variable ou nom de fonction.',suggest:'Envoyer une suggestion ↗',hero:'Documentation des plugins',intro:'Retrouvez les fonctions, commandes, variables et configurations des cinq plugins ApoloMC.',categories:'CATÉGORIES DE PLUGINS',quick:'ACCÈS RAPIDE',searchPlaceholder:'Rechercher des commandes, variables ou fonctions…',noResults:'Aucune section ne correspond à ce terme.',loading:'Chargement de la documentation…',rights:'Tous droits réservés.',open:'OUVRIR LA DOCUMENTATION →',copy:'Copier',copied:'Copié',copyFail:'Indisponible',pluginCount:'PLUGINS',translationWait:'Traduction de la documentation…',translationDone:'Traduction automatique appliquée. Les commandes, chemins YAML, permissions et variables sont conservés.',translationFail:'Le service de traduction est inaccessible. Le contenu espagnol d’origine est affiché.',homeCrumb:'Accueil',categoriesLabel:'Catégories',theme:'Thème',language:'Langue'},
de:{documentation:'DOKUMENTATION',home:'Startseite',missing:'Fehlen Informationen?',searchTip:'Suche nach Befehl, Berechtigung, Variable oder Funktionsname.',suggest:'Vorschlag senden ↗',hero:'Plugin-Dokumentation',intro:'Finde Funktionen, Befehle, Variablen und Einstellungen aller fünf ApoloMC-Plugins.',categories:'PLUGIN-KATEGORIEN',quick:'SCHNELLZUGRIFF',searchPlaceholder:'Befehle, Variablen oder Funktionen suchen…',noResults:'Keine passende Sektion gefunden.',loading:'Dokumentation wird geladen…',rights:'Alle Rechte vorbehalten.',open:'DOKUMENTATION ÖFFNEN →',copy:'Kopieren',copied:'Kopiert',copyFail:'Nicht verfügbar',pluginCount:'PLUGINS',translationWait:'Dokumentation wird übersetzt…',translationDone:'Automatische Übersetzung angewendet. Befehle, YAML-Pfade, Berechtigungen und Variablen bleiben unverändert.',translationFail:'Der Übersetzungsdienst ist nicht erreichbar. Der spanische Originaltext wird angezeigt.',homeCrumb:'Startseite',categoriesLabel:'Kategorien',theme:'Design',language:'Sprache'}
};
const themes=['purple','midnight','ocean','forest','rose','white','black'];
const pageLabels={
overview:{en:'Overview',pt:'Visão geral',fr:'Présentation',de:'Übersicht'},
backroom:{en:'Backroom',pt:'Backroom',fr:'Backroom',de:'Backroom'},
horses:{es:'Carrera de caballos',en:'Horse race',pt:'Corrida de cavalos',fr:'Course de chevaux',de:'Pferderennen'},
colormatch:{en:'ColorMatch',pt:'ColorMatch',fr:'ColorMatch',de:'ColorMatch'},
bosses:{es:'Bosses y minas',en:'Bosses and mines',pt:'Chefes e minas',fr:'Boss et mines',de:'Bosse und Minen'},
minigames:{en:'MiniGames',pt:'MiniGames',fr:'Mini-jeux',de:'Minispiele'},
airdrop:{en:'AirDrop',pt:'AirDrop',fr:'AirDrop',de:'AirDrop'},
commands:{es:'Comandos y permisos',en:'Commands and permissions',pt:'Comandos e permissões',fr:'Commandes et permissions',de:'Befehle und Berechtigungen'},
variables:{es:'Variables y placeholders',en:'Variables and placeholders',pt:'Variáveis e placeholders',fr:'Variables et placeholders',de:'Variablen und Platzhalter'},
config:{es:'Configuración',en:'Configuration',pt:'Configuração',fr:'Configuration',de:'Konfiguration'},
kits:{es:'Kits y selector',en:'Kits and selector',pt:'Kits e seletor',fr:'Kits et sélecteur',de:'Kits und Auswahl'},
abilities:{es:'Habilidades',en:'Abilities',pt:'Habilidades',fr:'Compétences',de:'Fähigkeiten'},
combat:{es:'Combate y mensajes',en:'Combat and messages',pt:'Combate e mensagens',fr:'Combat et messages',de:'Kampf und Nachrichten'},
arenas:{es:'Arenas y spawns',en:'Arenas and spawns',pt:'Arenas e spawns',fr:'Arènes et apparitions',de:'Arenen und Spawns'},
npcs:{en:'NPCs',pt:'NPCs',fr:'PNJ',de:'NPCs'},
events:{es:'Eventos y torneos',en:'Events and tournaments',pt:'Eventos e torneios',fr:'Événements et tournois',de:'Events und Turniere'},
economy:{es:'Economía y clanes',en:'Economy and clans',pt:'Economia e clãs',fr:'Économie et clans',de:'Wirtschaft und Clans'},
rewards:{es:'Recompensas y AFK',en:'Rewards and AFK zones',pt:'Recompensas e zonas AFK',fr:'Récompenses et zones AFK',de:'Belohnungen und AFK-Zonen'},
visuals:{es:'Scoreboard y tablist',en:'Scoreboard and tab list',pt:'Scoreboard e tablist',fr:'Scoreboard et tablist',de:'Scoreboard und Tablist'},
levels:{es:'Niveles y ascensos',en:'Levels and rank-ups',pt:'Níveis e progressão',fr:'Niveaux et promotions',de:'Level und Aufstiege'},
unlocks:{en:'Unlocks',pt:'Desbloqueios',fr:'Déblocages',de:'Freischaltungen'},
interfaces:{es:'Interfaces y menús',en:'Interfaces and menus',pt:'Interfaces e menus',fr:'Interfaces et menus',de:'Oberflächen und Menüs'},
technical:{es:'Información técnica',en:'Technical information',pt:'Informações técnicas',fr:'Informations techniques',de:'Technische Informationen'},
scope:{es:'Alcance de la guía',en:'Documentation scope',pt:'Escopo da documentação',fr:'Portée de la documentation',de:'Umfang der Dokumentation'},
duels:{en:'Duels',pt:'Duelos',fr:'Duels',de:'Duelle'},
queues:{es:'Colas y ELO',en:'Queues and ELO',pt:'Filas e ELO',fr:'Files et ELO',de:'Warteschlangen und ELO'},
parties:{en:'Parties',pt:'Grupos',fr:'Groupes',de:'Gruppen'},
ffa:{en:'Free For All',pt:'Free For All',fr:'Chacun pour soi',de:'Jeder gegen jeden'},
tournaments:{en:'Tournaments',pt:'Torneios',fr:'Tournois',de:'Turniere'},
training:{es:'Entrenamiento',en:'Training',pt:'Treinamento',fr:'Entraînement',de:'Training'},
replays:{en:'Replays',pt:'Replays',fr:'Replays',de:'Wiederholungen'},
stats:{es:'Estadísticas y cosméticos',en:'Statistics and cosmetics',pt:'Estatísticas e cosméticos',fr:'Statistiques et cosmétiques',de:'Statistiken und Kosmetik'},
yaml:{es:'Archivos YAML',en:'YAML files',pt:'Arquivos YAML',fr:'Fichiers YAML',de:'YAML-Dateien'}
};
const pluginLabels={
apoloevent:{type:{es:'Eventos',en:'Events',pt:'Eventos',fr:'Événements',de:'Events'},description:{es:'Eventos competitivos, minijuegos, bosses y AirDrops.',en:'Competitive events, minigames, bosses and AirDrops.',pt:'Eventos competitivos, minijogos, chefes e AirDrops.',fr:'Événements compétitifs, mini-jeux, boss et AirDrops.',de:'Wettbewerbe, Minispiele, Bosse und AirDrops.'}},
kitpvp:{type:{es:'PvP',en:'PvP',pt:'PvP',fr:'PvP',de:'PvP'},description:{es:'Kits, combate, arenas, economía y competición.',en:'Kits, combat, arenas, economy and competitions.',pt:'Kits, combate, arenas, economia e competições.',fr:'Kits, combat, arènes, économie et compétitions.',de:'Kits, Kampf, Arenen, Wirtschaft und Wettbewerbe.'}},
rankup:{type:{es:'Progresión',en:'Progression',pt:'Progressão',fr:'Progression',de:'Fortschritt'},description:{es:'Niveles, costes y desbloqueos por progreso.',en:'Levels, costs and progression-based unlocks.',pt:'Níveis, custos e desbloqueios por progresso.',fr:'Niveaux, coûts et déblocages selon la progression.',de:'Level, Kosten und fortschrittsbasierte Freischaltungen.'}},
apolorr:{type:{es:'Minijuegos',en:'Minigames',pt:'Minijogos',fr:'Mini-jeux',de:'Minispiele'},description:{es:'Minijuegos e interfaces de entretenimiento.',en:'Minigames and entertainment interfaces.',pt:'Minijogos e interfaces de entretenimento.',fr:'Mini-jeux et interfaces de divertissement.',de:'Minispiele und Unterhaltungsoberflächen.'}},
practice:{type:{es:'Practice PvP',en:'Practice PvP',pt:'Practice PvP',fr:'Practice PvP',de:'Practice PvP'},description:{es:'Duelos, colas, parties, entrenamiento y replays.',en:'Duels, queues, parties, training and replays.',pt:'Duelos, filas, grupos, treino e replays.',fr:'Duels, files, groupes, entraînement et replays.',de:'Duelle, Warteschlangen, Gruppen, Training und Replays.'}}
};
function lang(){const saved=localStorage.getItem('apolo-language');if(!saved){localStorage.setItem('apolo-language','es');return 'es';}return langs.includes(saved)?saved:'es';}
function tr(key){return (ui[lang()]&&ui[lang()][key])||ui.es[key]||key;}
function translatedLabel(map,key,fallback){return map&&map[key]&&(map[key][lang()]||map[key].es)||fallback;}
function applyPreferences(){
 const language=lang(),theme=localStorage.getItem('apolo-theme')||'purple';
 document.documentElement.lang=language;document.documentElement.dataset.theme=themes.includes(theme)?theme:'purple';
 $('#languageSelect').value=language;$('#themeSelect').value=themes.includes(theme)?theme:'purple';
 document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=tr(el.dataset.i18n));
 search.placeholder=tr('searchPlaceholder');search.setAttribute('aria-label',tr('searchPlaceholder'));
 $('#languageSelect').setAttribute('aria-label',tr('language'));$('#themeSelect').setAttribute('aria-label',tr('theme'));
}
function route(){const raw=location.hash.replace(/^#/,'');if(!raw||raw==='home')return{home:true};const [plugin,page='overview']=raw.split('/');return{plugin,page};}
function esc(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function pluginById(id){return navData.plugins.find(p=>p.id===id);}
function pageTitle(p,page){return translatedLabel(pageLabels,page.id,page.title);}
function renderNavigation(){
 navRoot.innerHTML='';
 navData.plugins.forEach(plugin=>{
  const group=document.createElement('section');group.className='plugin-group';group.dataset.plugin=plugin.id;
  const button=document.createElement('button');button.className='plugin-heading';button.type='button';
  button.innerHTML='<i class="plugin-dot"></i><span>'+esc(plugin.name)+'</span><span class="plugin-chevron">▾</span>';
  group.classList.add('collapsed');button.setAttribute('aria-expanded','false');button.addEventListener('click',()=>{const collapsed=group.classList.toggle('collapsed');button.setAttribute('aria-expanded',String(!collapsed));});
  const pages=document.createElement('div');pages.className='plugin-pages';
  plugin.pages.forEach(page=>{const a=document.createElement('a');a.className='plugin-page';a.href='#'+plugin.id+'/'+page.id;a.textContent=pageTitle(plugin,page);a.dataset.route=plugin.id+'/'+page.id;pages.appendChild(a);});
  group.append(button,pages);navRoot.appendChild(group);
 });
 $('#pluginCount').textContent=navData.plugins.length+' '+tr('pluginCount');
}
function homeHtml(){
 const cards=navData.plugins.map(p=>'<a class="plugin-card" href="#'+p.id+'/overview"><div class="plugin-card-head"><span class="plugin-type">'+esc(translatedLabel(pluginLabels[p.id]?.type,'',p.type))+'</span><span>↗</span></div><h2>'+esc(p.name)+'</h2><p>'+esc(translatedLabel(pluginLabels[p.id]?.description,'',p.description))+'</p><small>'+p.pages.length+' '+(lang()==='es'?'secciones':lang()==='pt'?'seções':lang()==='fr'?'sections':lang()==='de'?'Abschnitte':'sections')+'</small><div class="card-link">'+tr('open')+'</div></a>').join('');
 return '<section class="home-hero"><div class="eyebrow">APOLOMC · DEDICATOR NETWORK</div><h1>'+tr('hero')+'</h1><p>'+tr('intro')+'</p></section><div class="section-label">'+tr('categories')+'</div><div class="plugin-grid">'+cards+'</div><div class="section-label">'+tr('quick')+'</div><div class="doc-nav">'+navData.plugins.map(p=>'<a href="#'+p.id+'/overview">'+esc(p.name)+'</a>').join('')+'</div>';
}
async function getDoc(plugin){if(docCache[plugin])return docCache[plugin];const response=await fetch('content/'+plugin+'.md?v=7');if(!response.ok)throw new Error('No se pudo cargar content/'+plugin+'.md ('+response.status+')');return docCache[plugin]=await response.text();}
function activeNav(plugin,page){
 document.querySelectorAll('.plugin-page').forEach(a=>a.classList.toggle('active',a.dataset.route===plugin+'/'+page));
 document.querySelectorAll('.plugin-group').forEach(g=>{g.classList.add('collapsed');const b=g.querySelector('.plugin-heading');if(b)b.setAttribute('aria-expanded','false');});
 $('#homeLink').classList.toggle('active',!plugin);
}
function setStatus(message,kind){let el=root.querySelector('.translation-status');if(!el){el=document.createElement('div');el.className='translation-status';root.prepend(el);}el.textContent=message;el.dataset.state=kind||'info';}
function protectedTextNode(node){
 let el=node.parentElement;
 while(el&&el!==root){if(['CODE','PRE','KBD','SCRIPT','STYLE','SAMP','VAR','TEXTAREA','INPUT','BUTTON'].includes(el.tagName)||el.classList.contains('copy-code')||el.classList.contains('notranslate')||el.closest('[translate="no"]'))return true;el=el.parentElement;}
 return false;
}
function collectTextNodes(container){
 const walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT);
 const out=[];let n;
 while((n=walker.nextNode())){if(!protectedTextNode(n)&&n.nodeValue.trim().length>1)out.push(n);}
 return out;
}
async function googleTranslateChunk(nodes,target){
 const original=nodes.map(n=>n.nodeValue);
 const marker=i=>'ZXQAPOLO'+String(i).padStart(4,'0')+'QXZ';
 const payload=original.map((s,i)=>marker(i)+' '+s).join(' ');
 const endpoint='https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl='+encodeURIComponent(target)+'&dt=t&q='+encodeURIComponent(payload);
 const response=await fetch(endpoint,{method:'GET',mode:'cors',cache:'no-store'});
 if(!response.ok)throw new Error('HTTP '+response.status);
 const data=await response.json();
 const translated=(data[0]||[]).map(part=>part[0]||'').join('');
 const pattern=/ZXQAPOLO(\d{4})QXZ/g;
 const matches=[...translated.matchAll(pattern)];
 if(matches.length!==nodes.length)throw new Error('No se pudieron preservar los segmentos de traducción.');
 for(let i=0;i<matches.length;i++){
  const index=Number(matches[i][1]),start=matches[i].index+matches[i][0].length,end=i+1<matches.length?matches[i+1].index:translated.length;
  if(index>=0&&index<nodes.length){const value=translated.slice(start,end).trim();if(value)nodes[index].nodeValue=value;}
 }
}
async function translateRenderedContent(target,renderId){
 if(target==='es')return;
 setStatus(tr('translationWait'),'loading');
 const nodes=collectTextNodes(root).filter(n=>!n.parentElement?.closest('.translation-status'));
 const chunks=[];let batch=[],length=0;
 for(const node of nodes){const size=node.nodeValue.length+24;if(batch.length&&length+size>1700){chunks.push(batch);batch=[];length=0;}batch.push(node);length+=size;}
 if(batch.length)chunks.push(batch);
 try{
  for(let i=0;i<chunks.length;i+=3){
   if(renderId!==currentRender)return;
   await Promise.all(chunks.slice(i,i+3).map(group=>googleTranslateChunk(group,target)));
  }
  if(renderId===currentRender)setStatus(tr('translationDone'),'success');
 }catch(error){
  if(renderId===currentRender)setStatus(tr('translationFail'),'error');
  console.warn('ApoloMC translator:',error);
 }
}
function addCopyButtons(){
 root.querySelectorAll('pre').forEach(pre=>{
  const code=pre.querySelector('code');if(!code||pre.querySelector('.copy-code'))return;
  const b=document.createElement('button');b.className='copy-code';b.type='button';b.textContent=tr('copy');
  b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(code.innerText);b.textContent=tr('copied');setTimeout(()=>b.textContent=tr('copy'),1200);}catch(e){b.textContent=tr('copyFail');}});
  pre.insertBefore(b,pre.firstChild);
 });
}
async function showRoute(){
 const renderId=++currentRender,r=route(),language=lang();
 if(r.home){activeNav('','');$('#breadcrumbs').innerHTML='<span>ApoloMC</span><span>/</span><b>'+tr('homeCrumb')+'</b>';root.innerHTML=homeHtml();return;}
 const plugin=pluginById(r.plugin);if(!plugin){location.hash='#home';return;}
 const page=plugin.pages.find(x=>x.id===r.page)||plugin.pages[0];
 activeNav(plugin.id,page.id);
 $('#breadcrumbs').innerHTML='<span>ApoloMC</span><span>/</span><span>'+esc(plugin.name)+'</span><span>/</span><b>'+esc(pageTitle(plugin,page))+'</b>';
 root.innerHTML='<div class="loading">'+tr('loading')+'</div>';
 try{
  const md=await getDoc(plugin.id);if(renderId!==currentRender)return;
  root.innerHTML=marked.parse(md);
  addCopyButtons();
  if(language!=='es')await translateRenderedContent(language,renderId);
  if(renderId!==currentRender)return;
  const target=root.querySelector('#'+CSS.escape(page.id));if(target)target.scrollIntoView({block:'start',behavior:'smooth'});
 }catch(e){if(renderId===currentRender)root.innerHTML='<h1>Error</h1><p>'+esc(e.message)+'</p>';}
}
function sectionIndex(plugin,md){
 return md.split(/(?=<a id="[^"]+">)/g).map(piece=>{const match=piece.match(/^<a id="([^"]+)">/);if(!match)return null;const page=plugin.pages.find(x=>x.id===match[1]);return page?{plugin:plugin.id,pluginName:plugin.name,page,text:(page.title+' '+page.description+' '+(page.tags||'')+' '+piece).toLowerCase()}:null;}).filter(Boolean);
}
async function buildSearch(){
 const indexed=[];await Promise.all(navData.plugins.map(async plugin=>{try{indexed.push(...sectionIndex(plugin,await getDoc(plugin.id)));}catch(e){}}));searchIndex=indexed;
 function show(query){const q=query.trim().toLowerCase();if(!q){results.hidden=true;results.innerHTML='';return;}const hits=searchIndex.filter(x=>x.text.includes(q)).slice(0,14);results.innerHTML=hits.length?hits.map(x=>'<a class="search-result" href="#'+x.plugin+'/'+x.page.id+'"><b>'+esc(x.pluginName)+' · '+esc(pageTitle(pluginById(x.plugin),x.page))+'</b><small>'+esc(x.page.description)+'</small></a>').join(''):'<div class="empty-result">'+tr('noResults')+'</div>';results.hidden=false;}
 if(!search.dataset.bound){search.addEventListener('input',()=>show(search.value));search.addEventListener('keydown',e=>{if(e.key==='Escape'){results.hidden=true;search.blur();}if(e.key==='Enter'){const first=results.querySelector('a');if(first)location.hash=first.getAttribute('href').slice(1);results.hidden=true;}});document.addEventListener('click',e=>{if(!e.target.closest('.top-search'))results.hidden=true;});document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();search.focus();}});search.dataset.bound='1';}
}
async function init(){
 try{const r=await fetch('data/navigation.json?v=7');if(!r.ok)throw new Error('No se pudo cargar el índice.');navData=await r.json();renderNavigation();applyPreferences();await showRoute();await buildSearch();window.addEventListener('hashchange',showRoute);}
 catch(e){root.innerHTML='<h1>Error al cargar documentación</h1><p>'+esc(e.message)+'</p>';}
}
$('#languageSelect').addEventListener('change',async e=>{localStorage.setItem('apolo-language',e.target.value);applyPreferences();renderNavigation();await showRoute();});
$('#themeSelect').addEventListener('change',e=>{localStorage.setItem('apolo-theme',e.target.value);applyPreferences();});
$('#mobileMenu').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
$('#sidebar').addEventListener('click',e=>{if(e.target.closest('a'))$('#sidebar').classList.remove('open');});
$('#homeLink').addEventListener('click',()=>$('#sidebar').classList.remove('open'));
init();
})();