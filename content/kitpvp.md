# KitPvP-Core

> Core modular de KitPvP para Paper 1.21.4. Esta sección documenta los sistemas del proyecto, sus comandos, permisos, variables y archivos.

<span class="doc-meta">Paper 1.21.4 · Java 21 · Maven · README del proyecto: 1.0.9</span>

<a id="overview"></a>
## Resumen

KitPvP-Core reúne combate, kits mediante GUI, NPCs nativos, arenas, torneos, eventos automáticos, economía interna, clanes, misiones, cosméticos y almacenamiento YAML/SQL.

<a id="kits"></a>
## Kits y selector

El selector de kits es una GUI paginada. Los kits se definen individualmente en YAML. Los cooldowns se guardan en `kit-cooldowns.yml` y persisten tras reinicios.

Comandos:
```
/kit
/kit <id>
/kit create <id> [nombre]
/kit edit <id>
/kit setinv <id>
/kit delete <id> confirm
/kit give <jugador> <id>
/kit permission <id> <perm>
/kit cooldown <id> <seg>
```

- `/kit`: abre el selector.
- `/kit <id>`: reclama un kit si tiene permiso y no está en cooldown.
- `/kit create`: crea una plantilla.
- `/kit edit`: abre el editor visual.
- `/kit setinv`: guarda el inventario actual, incluyendo metadatos y NBT.
- `/kit permission`: asigna el permiso del kit.
- `/kit cooldown`: modifica el cooldown en segundos.

<a id="abilities"></a>
## Habilidades especiales

Las habilidades se configuran en `abilities.yml`. Cada definición puede incluir estado activo, acción, cooldown e ítem activador (material, nombre, lore, modelo y consumo).

Acciones documentadas: `speed`, `strength`, `heal`, `jump`, `shield`, `dash` y `fireball`.

```
/ability list
/ability <id>
/ability give <jugador> <id> [cantidad]
/ability reload
```

La entrega y recarga requieren `kitpvp.admin.abilities`. Los ítems se activan con clic derecho y respetan cooldown por jugador. El proyectil ígneo no incendia ni destruye bloques por defecto.

<a id="combat"></a>
## Combate y mensajes de muerte

El core incorpora sistema de combate y sanción por desconexión en combate, con acciones configurables como ejecución, pérdida de inventario/experiencia y multas de monedas o XP, según `combat.yml`.

Mensajes de muerte configurables:
- Archivo: `death-messages.yml`.
- Recarga: `/deathmessages reload` o `/kitpvp reload`.
- Variables: `%victim%`, `%attacker%`, `%item%`.
- Si PlaceholderAPI está instalado, también pueden utilizarse sus placeholders y los placeholders específicos de atacante expuestos por el core.
- Para ocultar una causa, deja su texto vacío.

<a id="arenas"></a>
## Arenas y spawns

Las arenas tienen límites, reglas por región y puntos de aparición validados para evitar ubicaciones inseguras. El core permite restaurar bloques modificados durante peleas y aplicar protección temporal al reaparecer.

Comandos de administración:
```
/arena <create|delete|pos1|pos2|...>
/spawn <set|remove|list|random>
```

WorldGuard es opcional. La región se asocia en el YAML de cada arena:

```yaml
worldguard:
  region: arena-pvp
```

Las reglas documentadas sincronizan PvP, construcción y daño por caída con flags correspondientes.

<a id="npcs"></a>
## NPCs nativos

Los NPCs interactivos son nativos y no requieren Citizens.

```
/npc <create|setkit|remove|list>
/npc create selector menu
/npc create arena-selector menu <arena>
```

Pueden abrir el selector global de kits o llevar a un selector asociado a una arena.

<a id="events"></a>
## Eventos y torneos

- **LMS (Last Man Standing):** evento de último jugador en pie.
- **KOTH (King of the Hill):** captura y control de punto configurable.
- **Torneos 1v1:** llaves eliminatorias con spawns diferenciados para cada contendiente.

Comandos:
```
/event <start|stop|begin|setpoint>
/tournament <create|start|stop|status>
/tournament resume
```

La programación automática de LMS/KOTH se configura en `events.yml`. Los premios de campeón y subcampeón se definen en `tournaments.yml`.

<a id="economy"></a>
## Economía, clanes y misiones

El core incluye saldo interno, pagos entre jugadores, sistema de clanes con chat privado y misiones diarias.

```
/coins [jugador]
/pay <jugador> <cant>
/economy <give|take|set> <jugador> <cant>
```

`/coins` consulta el saldo; `/pay` transfiere monedas a un jugador conectado; `/economy` es la herramienta administrativa para modificar saldos.

<a id="rewards"></a>
## Recompensas y zonas AFK

### Recompensas diarias y semanales

Los menús se encuentran en `rewards/menus/`; las reclamaciones se guardan en `reward-claims.yml`.

```
/rewards
/rewards open <menu>
/rewards reload
/rewards reset <jugador> [menu] [recompensa]
/rewards forceopen <jugador> [menu]
```

Admiten cooldown individual, permisos, objetos, monedas internas y comandos de consola.

### Zonas AFK

Cada zona se guarda en `afk-zones/<nombre>.yml`. Puede configurar tiempo, tiradas, probabilidades, permisos, comandos, objetos, título, actionbar y bossbar.

```
/afkzone wand
/afkzone create <nombre>
/afkzone redefine <nombre>
/afkzone tp <nombre>
/afkzone reload
```

`/afkzone wand` permite marcar dos esquinas: clic izquierdo y derecho. El archivo global `afk-zone.yml` controla la activación, el límite de cuentas por IP y la apariencia de la bossbar.

<a id="visuals"></a>
## Scoreboard y tablist

Los archivos se encuentran en `ScorebordLs/`:
- `scoreboard.yml`: panel lateral y diseños condicionales.
- `tablist.yml`: cabecera, pie, nametags, orden y objetivos.
- `animations.yml`: frames y animaciones.
- `placeholders.yml`: placeholders propios, condiciones y reemplazos.

Comandos:
```
/scoreboard toggle
/scoreboard on
/scoreboard off
/scoreboard status
/scoreboard reload
/scoreboard parse <texto>
/scoreboard debug
/sb
```

El alias `/sb` permite alternar el panel. `reload`, `parse` y `debug` requieren `kitpvp.admin.visual`; el toggle usa `kitpvp.scoreboard.toggle`.

<a id="commands"></a>
## Comandos y permisos

Esta referencia separa comandos de jugador, administración y sistemas auxiliares. Los alias se muestran junto al comando original. Los permisos de las operaciones administrativas aparecen en la tabla de permisos al final de esta sección.

### Entrada, perfil y economía

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

### Kits

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

### Habilidades

~~~text
/ability list
/ability <id>
/ability give <jugador> <id> [cantidad]
/ability reload
~~~

list muestra IDs cargados. El uso directo por ID es útil para pruebas; los objetos marcados se activan con clic derecho. give/reload requieren kitpvp.admin.abilities.

### Arenas y spawns

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

### NPCs y hologramas

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

### Duelos, eventos, torneos y clanes

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

### Misiones, recompensas y zonas AFK

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

### Cosméticos, tops y scoreboard

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

### Mensajes, chat y comunicación

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

### Reportes, inventario, objetos y filtros

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

### Permisos registrados

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



<a id="variables"></a>
## Variables y placeholders

### Placeholders internos de ScorebordLs

Los siguientes placeholders se usan con porcentaje a cada lado, por ejemplo %player%.

| Grupo | Placeholders |
|---|---|
| Jugador | %player%, %uuid%, %world%, %gamemode%, %ping%, %ping_color%, %health%, %health_int%, %max_health%, %health_bar%, %food%, %x%, %y%, %z%, %kit%, %combat%, %combat_time%. |
| Progreso | %kills%, %deaths%, %assists%, %level%, %coins%, %streak%, %maxstreak%, %xp%, %koth_wins%, %kdr%, %xp_needed%, %xp_remaining%, %xp_percent%, %xp_bar%. |
| Valores exactos | Las cifras grandes se pueden representar abreviadas; usa el sufijo _raw para obtener el valor sin abreviar, por ejemplo %kills_raw%. |
| Rango | %rank%, %rank_display%, %prefix%, %suffix%, %group_weight%. |
| Clan | %clan%, %clan_tag%, %clan_rank%. |
| Servidor | %online%, %online_world%, %max_players%, %staff_online%, %server_name%, %tps%, %tps_color%, %mspt%, %memory_used%, %memory_max%, %memory_percent%, %time%, %date%. |

### Placeholders personalizados de ScorebordLs

- %custom:nombre% obtiene una entrada declarada bajo custom en ScorebordLs/placeholders.yml.
- %condition:nombre% evalúa una condición con salidas if-true e if-false.
- %animation:nombre% reproduce el texto animado definido bajo text-animations en ScorebordLs/animations.yml.
- output-replacements permite sustituir el resultado de un placeholder, por ejemplo el texto de un rango.

Las condiciones pueden consultar permission:nodo, world:nombre, comparar placeholders con =, !=, >, >=, < o <=, comprobar contenido con <-, comparar con cualquiera de varios valores mediante |= y negar una condición con !.

### PlaceholderAPI — expansión propia kitpvp

El identificador de expansión es kitpvp. Los placeholders principales publicados por el README son:

~~~text
%kitpvp_kills%
%kitpvp_deaths%
%kitpvp_kdr%
%kitpvp_coins%
%kitpvp_streak%
%kitpvp_level%
%kitpvp_clan%
%kitpvp_tagged%
%kitpvp_current_kit%
%kitpvp_tournament_status%
%kitpvp_active_event%
~~~

La expansión también contiene valores de perfil como assists, max_streak, balance, xp, required_xp, clan_tag, clan_rank, clan_members, clan_online, clan_leader, clan_allies, tag, tag_id y combat_status. Su respuesta depende de que exista un perfil o de que el jugador tenga datos de clan/tag.

### Variables de mensajes y sistemas configurables

| Contexto | Variables |
|---|---|
| Mensajes de muerte | %victim%, %player%, {player}, {display-name}, %attacker%, {fighter}, {fighter-display-name}, %item%, %world%, %cause%, %x%, %y%, %z%. |
| Reemplazo específico del atacante | %[ATTACKER]placeholder% calcula el placeholder para el atacante del combate. |
| Conditional events | %player%, %player_name%, %player_uuid%, %player_world%, %online%, %max_players%, %server_name%, %player_health%, %player_food%, %player_level%, %player_gamemode%, %player_x%, %player_y%, %player_z%, %command%, %action%, %item_material%, %item_name%, %block_type%, %is_kitpvp_block%, %victim%, %killer%, %cause%, %world_from%, %world_to%. |
| Chat | %tag%, %clan%, %rank%, %prefix%, %player%, %name%, %message%; %chatprefix% agrega el prefijo general del chat. |
| Mensajes de recompensa | {amount}, {player}, {time}, {reward}, según el mensaje. |



<a id="config"></a>
## Configuración, almacenamiento y API

Carpeta: `plugins/KitPvP-Core/`.

| Archivo | Uso |
|---|---|
| `config.yml` | Opciones generales. |
| `messages.yml` | Mensajes. |
| `death-messages.yml` | Mensajes por causa de muerte. |
| `storage.yml` | YAML, SQLite, MySQL o MariaDB. |
| `permissions.yml` | Permisos. |
| `arenas.yml`, `spawns.yml`, `npcs.yml` | Arenas, apariciones y NPCs. |
| `events.yml`, `tournaments.yml` | Eventos y torneos. |
| `ScorebordLs/` | Scoreboard y tablist. |
| `kits/` | Definiciones de kits. |
| `inventario/` | Menús editables. |

### Integraciones

Vault, PlaceholderAPI, LuckPerms y WorldGuard son dependencias opcionales según la función. EssentialsX puede coexistir: el core gestiona los comandos en conflicto y evita anuncios duplicados de muerte.

### API pública

```java
KitPvPApi api = KitPvPCore.getApi();
double balance = api.getCoins(player.getUniqueId());
api.depositCoins(player.getUniqueId(), 500.0);
boolean inCombat = api.isTagged(player.getUniqueId());
```

También está documentado el evento Bukkit `KitPvPKillEvent`, con acceso a killer y victim.



<a id="yaml"></a>
## Archivos YAML — referencia de configuración

Ruta base: plugins/KitPvP-Core/. Este inventario excluye plugin.yml. También distingue archivos que administra el desarrollador de datos que el plugin genera y actualiza en funcionamiento. Realiza copias de seguridad antes de modificar configuraciones y conserva las rutas originales.

### Archivos principales y almacenamiento

| Archivo | Secciones y configuración |
|---|---|
| config.yml | license-key recibe la clave SCON emitida para el proyecto; no publiques esa clave. prefix define el prefijo general; combat configura tag, castigo de desconexión y premios; progression define XP por kill/asistencia, XP base y crecimiento por nivel; economy configura saldo inicial; missions.daily-kills define objetivo y premio; missions.transfers-enabled/max-transfer limita pagos; kits contiene título del selector, mensaje de cooldown y si se limpia el inventario; storage define backend/autosave; settings controla kit predeterminado, friendly-fire y debug; pvp.spawn-protection-seconds y lobby-spawn definen protección y lobby; arenas.restore-blocks/restore-delay-seconds habilita restauración de bloques. |
| storage.yml | type admite yaml, sqlite, mysql o mariadb; autosave-seconds define frecuencia de guardado; sqlite.file indica archivo DB; mysql.host/port/database/username/password/use-ssl configura conexión. Mantén la contraseña fuera de documentación pública. SQL mantiene YAML como respaldo/exportación. Cambiar backend debe hacerse con copia de datos y comprobación antes de producción. |
| messages.yml | prefix y mensajes del core; help configura encabezado, pie y páginas de /help; helpstaff configura la ayuda administrativa. Variables de ayuda: {page}, {pages}, {version}. |
| permissions.yml | Mapa de nodos y descripciones legibles. La autoridad de los nodos registrados sigue siendo el manifiesto de permisos que acompaña al plugin. |
| integrations.yml | vault.enabled y vault.use-external-economy decide si Vault usa economía externa o interna; placeholderapi.enabled habilita la expansión; luckperms.enabled y luckperms.kit-groups relaciona kits con grupos; worldguard.enabled permite sincronizar reglas de arenas con regiones existentes. |
| essentialsx.yml | Ajustes del adaptador de compatibilidad EssentialsX y control de comandos/mensajes duplicados. |

### Kits, habilidades e inventarios

| Archivo | Secciones y configuración |
|---|---|
| kits/<id>.yml | Un archivo por kit. display-name es el nombre del selector; permission es el nodo requerido (vacío permite acceso según permisos generales); cooldown-seconds define espera; items lista identificadores con material/cantidad y metadatos del objeto. Los kits actuales starter, warrior, archer y tank son ejemplos reales, no una lista cerrada. |
| abilities.yml | global-cooldown-seconds y cooldown-display controlan el enfriamiento global y el texto del actionbar; abilities.<id> define enabled, action, duración, cooldown, amplificador/cantidad/efectos, success-message e item (enabled/material/name/lore/consume-on-use). IDs presentes incluyen speed, strength, heal, jump, shield, dash, fireball, switcher, rocket, debuff, cleanse, ninja, vampire e inventory-scrambler. |
| abilities-shop.yml | settings.enabled, permanent-unlocks, default-max-level y require-combat-permission; abilities.<id> define disponibilidad, price, max-level, duration-seconds y cooldown-seconds. El catálogo actual contiene speed, strength, heal, jump y shield. |
| kit-shop.yml | settings.enabled, permanent-unlocks, allow-free-kits, selection-mode (NPC, GUI o BOTH) y prevent-double-purchase; kits debe asociar IDs existentes en la carpeta kits/. |
| kit-chest.yml | size/title/fallback-kit/messages; kits.<id>.items.<item> configura slot, material, amount y potion-type cuando el artículo sea una poción. Es un cofre virtual individual y no un cofre compartido del mundo. |
| server-items.yml | Mapa items con definiciones de objetos compartidos administrados por el sistema serveritem. |
| inventario/menu-principal.yml | GUI principal: title, size y botones kits, stats, coins, missions, duels, clans, abilities; cada botón configura slot, material, name y lore. |
| inventario/kits.yml | Selector: title, size e items por kit con slot/material/name/lore. |
| inventario/tienda.yml | GUI de tienda; title, size e items. El catálogo comercial se define en kit-shop.yml/abilities-shop.yml. |
| inventario/habilidades.yml | Botones del menú de habilidades con slot, material, nombre y lore. |
| inventario/duelos.yml, inventario/eventos.yml, inventario/estadisticas.yml, inventario/admin.yml | Plantillas de GUI; title, size e items. Comprueba qué botones están implementados en la versión del core antes de añadir identificadores propios. |
| inventario/cosmeticos.yml | main.title/size y slots por categoría; main.buttons configura cerrar; category.sizes/titles permite sobrescribir tamaño/título; category.items permite fijar slot por artículo; buttons controla volver, desactivar y cerrar. |

### Combate, progreso, economía, clanes y eventos

| Archivo | Secciones y configuración |
|---|---|
| combat.yml | tag.duration-seconds/announce; rewards.kill-coins/kill-xp; friendly-fire.enabled/clan-members; punishment.enabled, kill-player, drop-items, drop-exp, loss-coins, loss-xp, reset-streak, credit-attacker, broadcast, mensajes y commands para desconexión en combate. |
| progression.yml | experience.kill/assist/base-required/increase-per-level/max-level; prestige.enabled/max-prestige. Es el esquema de progresión ampliado, mientras config.yml conserva valores generales usados por el core. |
| economy.yml | currency.name/symbol/starting-balance; transfers.enabled/max-amount/minimum-amount. config.yml también contiene flags de transferencias. |
| clans.yml | enabled; settings.max-members, friendly-fire, alliances, allied-friendly-fire, min-name-length y max-name-length. Controla tamaño y reglas de relación entre miembros/aliados. |
| duels.yml | invitation.expiry-seconds, allow-spectators y default-mode; ranking.elo-start y elo-k-factor. Las funciones económicas opcionales de duelo no se detallan en esta guía. |
| events.yml | scheduler.enabled/interval-minutes; events.lms y events.koth tienen enabled, min-players, max-players y duration-seconds; koth.world/x/y/z/radius/points-to-win fija el punto de captura. |
| tournaments.yml | settings.max-players, format y require-duel-spawns; rewards.winner-coins y runner-up-coins. |
| missions.yml | daily.enabled/reset-hour-utc; weekly.enabled/reset-day; missions contiene las definiciones de misiones. |
| rewards.yml | settings.enabled, kill-reward, assist-reward, environmental-death-reward, suicide-reward, reward-victim-self y duplicate-event-window-ms; anti-farm controla ventana y límite de kills repetidas; streaks define premios por racha; first-kill-of-day controla el primer premio diario; messages define textos de premio. |
| reports.yml | enabled, cooldown-seconds, max-reason-length; staff-notifications.enabled/permission y textos; discord.webhook-url/username/message-template. La URL de webhook es secreta y no debe publicarse. |

### Utilidades, moderación y sistemas automáticos

| Archivo | Secciones y configuración |
|---|---|
| command-filter.yml | enabled; use-commands-as-whitelist; commands contiene raíces o comandos completos bloqueados; block-colon-commands bloquea namespaces; filter-tab-completion filtra sugerencias; bypass-permission y admin-permission; textos blocked/reload. |
| conditional-events.yml | settings.repetitive.enabled/interval-ticks; events.<id> tiene enabled, type, conditions y actions. Tipos: player_join, player_quit, player_command, player_interact, player_consume, block_break, block_place, player_death, player_kill, player_respawn y repetitive. Condiciones admiten equals, not equals, contains, startsWith, endsWith y comparadores numéricos; se pueden combinar con and/or. Las variables están listadas en la página Variables. |
| afk-zone.yml | Ajustes globales enabled, prefix, zone-per-ip-limit, reset-after-reward y bossbar-direction. |
| afk-zone-example.yml | Plantilla para copiar a afk-zones/<nombre>.yml: enabled, permission, messages, in-zone.title/subtitle/actionbar/bossbar, reward-time-seconds, roll-amount, rewards[] (chance, permission, minimum-time, maximum-time, display, items y commands) y zone.location1/location2. |
| npcs.yml | settings.enabled, interaction RIGHT_CLICK/LEFT_CLICK, default-type (entidad viva), prevent-duplicate-entities, remove-orphans-on-disable; npcs guarda entradas administradas. |
| spawns.yml | settings.required-spawns/max-spawns/allow-more-spawns/avoid-consecutive-repeat/require-solid-floor/require-two-air-blocks/reject-liquid/minimum-y/fallback-to-lobby; spawns guarda puntos numéricos. |
| arenas.yml | settings.auto-assign y require-spawn. Las definiciones individuales se almacenan en arenas/<id>.yml, no en un único archivo gigante. |
| holograms.yml | settings.enabled/update-ticks; holograms almacena identificadores y líneas de hologramas. |
| inventory-rollback.yml | enabled; backups.join/leave/death/world-change/manual indica cuándo crear snapshots; retention.deaths/other controla cantidad conservada. |
| death-messages.yml | enabled, item-format, empty-hand-text, fallback-message y death-messages por causa de Paper. Variables: %victim%, %player%, {player}, {display-name}, %attacker%, {fighter}, {fighter-display-name}, %item%, %world%, %cause%, %x%, %y%, %z%. Un valor vacío oculta esa causa. |
| tags.yml | menu.title/page-size/show-locked/locked-material/filler-material/no-active-text; items previous/next/clear/active/close; lore y messages; tags.<id> define display, permission y lore. Los tags activos del jugador se guardan por UUID en tags-data.yml. |

### ScorebordLs — scoreboard, tablist y placeholders

| Archivo | Secciones y configuración |
|---|---|
| ScorebordLs/scoreboard.yml | enabled/update-ticks/disabled-worlds/hide-scores/hex-colors/max-line-length; title y lines definen panel principal; scoreboards.<id> permite diseños alternativos con display-condition y prioridad; combat-display/cooldowns personaliza el bloque de combate y temporizadores. Una línea que resuelve a vacío se oculta; usa {space} para una línea vacía. |
| ScorebordLs/tablist.yml | enabled/update-ticks/disabled-worlds; header/footer; player-name-format; designs para diseños condicionados; nametag para prefijo/sufijo/color/visibilidad/colisión; sorting para ordenar jugadores; belowname y playerlist-objective para objetivos numéricos. |
| ScorebordLs/animations.yml | scoreboard.mode STATIC/ANIMATED, frame-interval-updates y frames de title/lines; tablist.animation configura intervalos y frames de header/footer; text-animations.<id>.frames alimenta %animation:<id>%. |
| ScorebordLs/placeholders.yml | texts, colors, bars, output-replacements, custom y conditions. custom crea %custom:nombre%; conditions crea %condition:nombre% con condiciones y salidas if-true/if-false. Ver la página Variables para tokens internos y sintaxis de condiciones. |

### Cosméticos y clasificaciones

| Archivo | Secciones y configuración |
|---|---|
| cosmetics.yml | enabled/menu; kill-effects y categories. Las categorías actuales son kill-effects, particle-effects, hats, pets, mounts, gadgets, projectile-effects, death-effects, suits, morphs y emotes. Cada una puede controlar enabled, icon, name, description e items; los ítems definen material, nombre y parámetros del efecto. |
| leaderboard-menu.yml | enabled; menu.title/entries/auto-refresh-seconds y botones; design define marco, pilares, estilos por puesto, lore, sonidos y posiciones; tops.<id> define categorías, iconos, descripciones y campos de datos. Los tops internos leen los perfiles; tableros externos pueden depender de ajLeaderboards y PlaceholderAPI. |
| leaderboard-animated.yml | Cartel 3D: enabled/auto-start/location-set; location.world/x/y/z/yaw/pitch; rotation.start-index/seconds-per-top/entries; display.height-offset/line-width/view-range/refresh-ticks/shadow/background; style.title-format/separator/row-format/barras. El modo actual es estático: las claves heredadas de animación no implican desplazamiento físico. |
| ScorebordLs/animations.yml | Además de las animaciones de scoreboard/tablist, text-animations permite crear secuencias de texto referenciadas desde placeholders. |

### Archivos generados o mantenidos automáticamente

Estos archivos los escribe el plugin y no conviene tratarlos como configuración manual ordinaria:

- kit-cooldowns.yml: persistencia de cooldowns de kits.
- reward-claims.yml: registro de reclamaciones de recompensas.
- tags-data.yml: selección de tags por UUID.
- profiles.db / perfiles YAML: perfiles y estadísticas según el backend elegido.
- arenas/<id>.yml: arena individual; afk-zones/<nombre>.yml: zona AFK individual.
- rewards/menus/*.yml: menús de recompensas; inventario-rollback/<uuid>/: snapshots.
- cosmetics/ y datos de NPC: selecciones e identificadores persistentes.

### Cómo aplicar cambios

- /kitpvp reload recarga configuración general, kits y mensajes; consulta la consola para comprobar errores.
- /ability reload recarga abilities.yml.
- /scoreboard reload recarga scoreboard, tablist, placeholders y animaciones.
- /strings reload aplica strings.yml.
- /deathmessages reload recarga mensajes por causa.
- /commandfilter reload aplica command-filter.yml.
- /rewards reload vuelve a leer menús/textos de recompensas.
- /afkzone reload recarga la configuración de zonas.
- /npc reload y /hologram reload reconstruyen sus datos administrados sin duplicar entidades.
- Cambiar backend en storage.yml requiere plan de migración y reinicio. Conserva copia de perfiles.db y YAML antes de cambiar type.

