<a id="commands"></a>
# Comandos y permisos

Esta referencia separa comandos de jugador, administración y sistemas auxiliares. Los alias se muestran junto al comando original. Los permisos de las operaciones administrativas aparecen en la tabla de permisos al final de esta sección.

## Entrada, perfil y economía

| Comando | Argumentos / comportamiento |
|---|---|
| /help [página] | Ayuda paginada; alias /kithelp y /kphelp. |
| /helpstaff | Ayuda de staff; permiso kitpvp.helpstaff. |
| /menu | Abre el menú principal. |
| /kitpvp stats [jugador] | Consulta estadísticas de un jugador conectado. |
| /kitpvp reload | Recarga el core; permiso kitpvp.admin.reload. |
| /kitpvp diagnostics | Diagnóstico de versión, kits, jugadores conectados y backend; permiso kitpvp.admin. |
| /coins [jugador] | Consulta saldo; alias interno /balance. |
| /pay <jugador> <cantidad> | Transfiere monedas a un jugador conectado; respeta economy.transfers-enabled y economy.max-transfer. |
| /top <kills|deaths|coins|level|koth> | Top 10 en chat; koth consulta victorias KOTH. |
| /tops [kills|deaths|money|level|koth] | Abre el menú de clasificaciones. |

## Kits

~~~text
/kit
/kit <id>
/kit create <id> [nombre visible]
/kit edit <id>
/kit setinv <id>
/kit saveinv <id>
/kit delete <id> confirm
/kit reload
/kit give <jugador> <id>
/kit permission <id> <permiso|none>
/kit cooldown <id> <segundos>
~~~

create crea el archivo del kit. Si lo ejecuta un jugador con objetos en su inventario, el core puede usar ese inventario como base; de lo contrario abre el editor. edit abre el editor visual. setinv/saveinv guarda inventario, armadura y mano secundaria con sus metadatos. delete requiere escribir confirm. El cooldown admite de 0 a 604800 segundos. La administración requiere kitpvp.admin.kits; reclamar requiere kitpvp.kit.

## Habilidades

~~~text
/ability list
/ability <id>
/ability give <jugador> <id> [cantidad]
/ability reload
~~~

list muestra IDs cargados. El uso directo por ID es útil para pruebas; los objetos marcados se activan con clic derecho. give/reload requieren kitpvp.admin.abilities.

## Arenas y spawns

~~~text
/arena list
/arena create <id>
/arena delete <id>
/arena clone <origen> <nuevo-id>
/arena enable <id>
/arena disable <id>
/arena pos1 <id>
/arena pos2 <id>
/arena setrule <id> <pvp|build|hunger|fall-damage|natural-regeneration> <true|false>
/arena setspawn <id>
/arena addspawn <id>
/arena clearspawns <id>
/arena setspawna <id>
/arena setspawnb <id>
/arena join <id>

/spawn set <id>
/spawn list
/spawn remove <id>
/spawn teleport <id>
/spawn reload
/spawn random
~~~

Las esquinas pos1/pos2 delimitan el área de la arena. addspawn agrega un punto de aparición aleatorio adicional; clearspawns elimina los adicionales. setspawna y setspawnb son los dos puntos de duelo. setrule acepta las cinco reglas mostradas y un booleano. La gestión de arenas requiere kitpvp.admin.arenas; la de spawns, kitpvp.admin.spawns. list y join son accesos de consulta/entrada; random es para jugadores.

## NPCs y hologramas

~~~text
/npc create <id> <kit> [arena]
/npc setkit <id> <kit>
/npc setname <id> <nombre...>
/npc settype <id> <tipo_entidad>
/npc glow <id> <true|false>
/npc remove <id>
/npc list
/npc reload

/hologram create <id> [texto...]
/hologram addline <id> <texto...>
/hologram setline <id> <línea> <texto...>
/hologram removeline <id> <línea>
/hologram movehere <id>
/hologram remove <id>
/hologram list
/hologram reload
~~~

Los NPCs admiten entidades vivas de Bukkit y no requieren Citizens. La gestión de NPCs requiere kitpvp.admin.npc; la de hologramas, kitpvp.admin.holograms. El alias de hologram es /holo.

## Duelos, eventos, torneos y clanes

~~~text
/duel challenge <jugador> <arena>
/duel accept
/duel leave

/event status
/event join
/event leave
/event start <lms|koth> <arena>
/event begin
/event stop
/event setpoint [radio]

/tournament status
/tournament join
/tournament create <id> <arena>
/tournament start
/tournament resume
/tournament stop
/tournament leave

/clan create <nombre>
/clan invite <jugador>
/clan join [clan]
/clan leave
/clan info
/clan chat <mensaje>
/clan members
/clan list
/clan kick <jugador>
/clan promote <jugador>
/clan demote <jugador>
/clan transfer <jugador>
/clan rename <nombre>
/clan disband
/clan ally <clan>
/guerra [cancelar|fin <clan>]
~~~

Los eventos automáticos incluyen LMS y KOTH. start requiere tipo y arena; setpoint toma la ubicación actual y admite radio opcional. El staff controla la guerra de clanes mediante /guerra; su permiso es kitpvp.war.admin. Los comandos de torneo create/start/resume/stop necesitan kitpvp.admin.tournaments; los de eventos start/begin/stop/setpoint necesitan kitpvp.admin.events. Duelos y clanes aplican validaciones de líder, invitación, disponibilidad y estado de los jugadores.

## Misiones, recompensas y zonas AFK

~~~text
/mission status
/mission claim

/rewards
/rewards open <menu>
/rewards reload
/rewards reset <jugador> [menu] [recompensa]
/rewards forceopen <jugador> [menu]
/rewards help

/afkzone wand
/afkzone create <nombre>
/afkzone delete <nombre>
/afkzone redefine <nombre>
/afkzone tp <nombre>
/afkzone list
/afkzone status
/afkzone reload
~~~

/afkzone wand permite marcar las dos esquinas mediante clic izquierdo y derecho. Las zonas se guardan individualmente en afk-zones/. La administración requiere kitpvp.admin.afkzones. Para recompensas, reset y forceopen son acciones administrativas; revisa kitpvp.admin.rewards y los permisos rewards.open.* para menús individuales.

## Cosméticos, tops y scoreboard

~~~text
/cosmetics
/cosmetics menu
/cosmetics list [categoría]
/cosmetics select <categoría> <id>
/cosmetics equip <categoría> <id>
/cosmetics clear [categoría]
/cosmetics reload

/leaderboards
/leaderboards top <id>
/leaderboards reload
/tops [kills|deaths|money|level|koth]

/scoreboard toggle
/scoreboard on
/scoreboard off
/scoreboard status
/scoreboard reload
/scoreboard parse <texto>
/scoreboard debug
~~~

/leaderboards también tiene el alias /leaderboard. /scoreboard usa el alias /sb. La recarga de cosméticos requiere kitpvp.admin.cosmetics; la administración visual de scoreboard/tablist requiere kitpvp.admin.visual; el toggle personal requiere kitpvp.scoreboard.toggle.

## Mensajes, chat y comunicación

~~~text
/channel <global|world|local>
/msg <jugador> <mensaje>
/reply <mensaje>
/socialspy
/broadcast <mensaje>
/clearchat
/helpop <mensaje>
/ignore <jugador>
/unignore <jugador>
/mention <enable|disable>
/chatcolor <color|reset>
/emoji
/rules
/strings reload
~~~

Aliases: /channel también /c; /msg también /message; /reply también /r; /broadcast también /announce; /clearchat también /chatclear; /mention también /mentions. Los canales requieren los permisos kitpvp.channels.*. Las acciones de moderación de chat usan kitpvp.chat.admin, kitpvp.chat.broadcast, kitpvp.chat.clear, kitpvp.chat.socialspy y nodos relacionados.

## Reportes, inventario, objetos y filtros

~~~text
/report
/deathmessages <reload|status>
/commandfilter reload
/ir <restore|forcebackup|enable|disable|reload> [jugador]
/invsee <jugador>
/endersee <jugador>
/enderchest
/kititem give <jugador> <yunque|cofre> [cantidad]
/conditionalevents <list|reload|run> [evento] [jugador]
/itemedit <subcomando>
/itemstorage <save|update|delete|show|get> [id]
/itemeditinfo
/itemeditimport itemeditor
/serveritem <subcomando>
~~~

/report inicia el flujo de reporte de jugador o bug. /deathmessages admite los alias /deathmsg y /deathmessage. /commandfilter también es /cmdfilter. /ir tiene alias /inventoryrollback e /invrollback. /conditionalevents tiene alias /cevents y /ce. /itemedit puede usar alias /ie. Las operaciones de inventario tienen nodos separados para ver, editar, exención y bypass; consulta la tabla de permisos. Las herramientas ItemEdit usan kitpvp.itemedit.use/kitpvp.itemedit.admin.

## Permisos registrados

| Permiso | Uso |
|---|---|
| kitpvp.use | Funciones básicas. |
| kitpvp.helpstaff | Ayuda del staff. |
| kitpvp.report, kitpvp.report.notify | Enviar reportes y recibir notificaciones. |
| kitpvp.kit, kitpvp.kit.tank | Uso de kits y acceso al kit Tank. |
| kitpvp.stats | Consultar estadísticas. |
| kitpvp.pay | Transferir monedas. |
| kitpvp.admin | Administración general. |
| kitpvp.admin.reload | Recargar el core. |
| kitpvp.admin.economy | Modificar saldos. |
| kitpvp.admin.arenas, kitpvp.admin.spawns | Gestionar arenas y spawns. |
| kitpvp.admin.npc, kitpvp.admin.holograms | Gestionar NPCs y hologramas. |
| kitpvp.admin.abilities, kitpvp.admin.kits | Gestionar habilidades y kits. |
| kitpvp.admin.events, kitpvp.admin.tournaments | Gestionar eventos y torneos. |
| kitpvp.admin.cosmetics | Recargar cosméticos. |
| kitpvp.admin.afkzones | Gestionar zonas AFK. |
| kitpvp.admin.rewards | Administrar menús de recompensa. |
| kitpvp.admin.commandfilter | Recargar el filtro de comandos. |
| kitpvp.admin.visual | Recargar/probar el sistema visual. |
| kitpvp.admin.deathmessages | Administrar mensajes de muerte. |
| kitpvp.admin.conditionalevents | Gestionar eventos condicionales. |
| kitpvp.admin.leaderboards | Administrar leaderboards. |
| kitpvp.commandfilter.bypass | Omitir el filtro de comandos. |
| kitpvp.bypass.cooldown | Omitir cooldown de kit. |
| kitpvp.scoreboard.toggle | Ocultar/mostrar scoreboard. |
| kitpvp.tag.use, kitpvp.tag.admin | Usar y administrar tags. |
| kitpvp.enderchest | Abrir el ender chest propio. |
| kitpvp.rollback.restore, .forcebackup, .toggle, .reload | Acciones de inventory rollback. |
| kitpvp.invsee.inventory.view/edit/exempt/bypass | Control de acceso a inventarios ajenos. |
| kitpvp.invsee.ender.view/edit/exempt/bypass | Control de acceso a ender chests ajenos. |
| kitpvp.itemedit.use, kitpvp.itemedit.admin | Usar y administrar ItemEdit. |
| kitpvp.chat.* | Permisos de moderación, canales, color, mensajes y menciones. |
| kitpvp.channels.global/world/local | Enviar mensajes en canales. |
| kitpvp.channels.global.receive/world.receive/local.receive | Recibir mensajes por canal. |
| kitpvp.war.admin | Control administrativo de guerras de clan. |

Los nodos compuestos de chat e inventario se gestionan en permissions del plugin. Las descripciones exactas y valores por defecto se mantienen en el manifiesto de permisos que acompaña al JAR; esta guía no reproduce ese archivo de registro.