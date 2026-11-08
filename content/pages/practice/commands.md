<a id="commands"></a>
# Comandos y permisos

El comando raíz es /practice; los aliases registrados son /apolopractice y /prac.

| Comando | Argumentos / función |
|---|---|
| /practice | Abre el menú principal. |
| /practice menu | Abre el menú principal. |
| /practice kits | Abre el selector de kits. |
| /practice duel <jugador> [kit] | Envía una solicitud de duelo 1v1. |
| /practice accept <jugador> | Acepta una solicitud del jugador indicado. |
| /practice rematch | Solicita revancha de la última partida compatible. |
| /practice forfeit | Se rinde/abandona el duelo actual. |
| /practice queue <kit> [ranked|unranked] | Entra a la cola del kit en modo clasificado o no clasificado. |
| /practice leave | Sale de la cola o modalidad compatible. |
| /practice party invite <jugador> | Invita un jugador a la party. |
| /practice party accept <jugador> | Acepta invitación. |
| /practice party kick <jugador> | Expulsa a un miembro. |
| /practice party leave | Sale de la party. |
| /practice party disband | Disuelve la party. |
| /practice party info | Muestra miembros/estado de la party. |
| /practice partywar duel <líder rival> <kit> | Inicia serie party-vs-party. |
| /practice spectate <jugador> | Observa al jugador/partida. |
| /practice unspectate | Sale de espectador. |
| /practice ffa join <kit> | Entra al FFA usando el kit. |
| /practice ffa leave | Sale del FFA. |
| /practice ffa setspawn | Guarda el spawn FFA (admin). |
| /practice tournament join | Se une al torneo abierto. |
| /practice tournament leave | Abandona el torneo. |
| /practice tournament status | Consulta estado. |
| /practice tournament create <kit> <nombre> | Crea torneo (admin). |
| /practice tournament start | Inicia torneo (admin). |
| /practice tournament cancel | Cancela torneo (admin). |
| /practice training start <kit> [easy|normal|hard] | Inicia entrenamiento con IA. |
| /practice training stop | Detiene entrenamiento. |
| /practice replay list | Lista replays guardados. |
| /practice replay play <id> | Abre reproducción visual. |
| /practice replay pause/resume | Pausa o reanuda reproducción. |
| /practice replay speed <1|2|4> | Cambia velocidad. |
| /practice replay stop | Cierra el replay. |
| /practice stats [jugador conectado] | Consulta estadísticas. |
| /practice top [elo|wins|kills] | Consulta ranking. |
| /practice cosmetic list | Lista efectos cosméticos. |
| /practice cosmetic set <efecto> | Selecciona efecto de kill. |
| /practice arena list | Lista arenas. |
| /practice arena setspawn <id> <1|2> | Guarda spawn 1 o 2 de la arena (admin). |
| /practice staff freeze <jugador> | Congela jugador (staff). |
| /practice staff unfreeze <jugador> | Descongela jugador (staff). |
| /practice admin resetstats <jugador> | Reinicia estadísticas (admin). |
| /practice admin setelo <jugador> <elo> | Ajusta ELO (admin). |
| /practice reload | Guarda datos pendientes y recarga archivos. |
| /practice debug | Muestra diagnóstico. |
| /practice compatibility | Muestra información de compatibilidad. |
| /practice compatibility reload | Recarga reglas de compatibilidad. |

## Permisos registrados

| Permiso | Default / alcance |
|---|---|
| apolopractice.use | true; acceso al comando principal y funciones de jugador. |
| apolopractice.admin | OP; comandos administrativos, arenas/FFA, torneos y staff. |
| apolopractice.compatibility | OP; administración/consulta del módulo de compatibilidad. |

El proyecto define estos tres nodos principales en permissions.yml y plugin.yml. No presupongas que un subcomando tiene un permiso independiente si no está expuesto por el código. El acceso administrativo se agrupa bajo apolopractice.admin, mientras compatibility requiere apolopractice.compatibility.