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

### Ejemplo real: config.yml

```yaml
prefix: "&5&lAPOLO &8» &r"
combat:
  tag-seconds: 15
  prevent-quit: false
  quit-penalty: false
  kill-reward: 10
  death-loss: 0
  assist-reward: 2
  killstreak-rewards:
    "5": {coins: 50, xp: 25}
    "10": {coins: 150, xp: 100}
progression:
  xp-per-kill: 25
  xp-per-assist: 10
  base-xp: 100
  xp-per-level: 50
economy:
  starting-balance: 0
missions:
  daily-kills:
    goal: 5
    reward-coins: 100
    reward-xp: 50
storage:
  type: yaml
  autosave-seconds: 60
settings:
  default-kit: starter
  friendly-fire: true
  debug: false
pvp:
  spawn-protection-seconds: 3
arenas:
  restore-blocks: false
  restore-delay-seconds: 30
```

**Cómo funciona:** `combat` ajusta el tiempo de combate y recompensas; `progression` calcula experiencia; `economy` fija el saldo inicial; `missions` define metas; `storage.type` selecciona yaml/sqlite/mysql/mariadb según la versión; `settings` establece kit y fuego amigo; `pvp` controla protección de spawn; `arenas` activa rollback opcional. No publiques la clave de licencia ni contraseñas.

### Ejemplo real: storage.yml

```yaml
type: yaml
autosave-seconds: 60
sqlite:
  file: profiles.db
mysql:
  host: 127.0.0.1
  port: 3306
  database: kitpvp
  username: root
  password: ""
  use-ssl: false
```

**Cómo funciona:** `type` selecciona el backend; `autosave-seconds` define el intervalo de guardado; `sqlite.file` es el archivo local; `mysql` contiene conexión remota. No compartas contraseñas reales. El cambio de backend debe hacerse con copia de seguridad y según las instrucciones de la versión instalada.

### Ejemplo real: abilities.yml

```yaml
global-cooldown-seconds: 10
abilities:
  speed:
    enabled: true
    action: speed
    duration-seconds: 5
    cooldown-seconds: 30
    amplifier: 1
    item:
      enabled: true
      material: FEATHER
      name: "&b&lImpulso Veloz"
      consume-on-use: false
  heal:
    enabled: true
    action: heal
    cooldown-seconds: 30
    amount: 6
    item:
      enabled: true
      material: GOLDEN_APPLE
      consume-on-use: false
```

**Cómo funciona:** cada ID bajo `abilities` es una habilidad; `enabled` la habilita; `action` selecciona la acción implementada; duración, enfriamiento y amplificador/cantidad controlan el efecto; `item` configura el objeto que la activa. Los nombres de acción deben coincidir con los admitidos por el plugin.

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
| rewards/menus/default.yml | Menú de recompensas: title, rows, close.slot/material/name e items.<id>. Cada recompensa define slot, cooldown, claim-coins, claim-items y presentaciones claimable, unclaimable y no-permission con material/name/lore. |

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
| rewards/lang.yml | Textos de ayuda, recarga, errores, permisos, cooldown, confirmación de reclamo y reset; puedes cambiar mensajes sin alterar la lógica de premio. |
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



## Contenido íntegro de los archivos YAML del repositorio

### `ScorebordLs/animations.yml`

Fuente del repositorio; se conservan comentarios y estructura. Credenciales y URLs privadas se ocultan.

```yaml
# Configuración independiente de animaciones.
# STATIC usa el diseño de scoreboard.yml y tablist.yml.
# Frames laterales con caracteres ASCII para evitar glifos inconsistentes en Geyser/Bedrock.
scoreboard:
  mode: STATIC
  animation:
    frame-interval-updates: 2
    frames:
      - title: "<light_purple><bold>APOLO KITPVP</bold></light_purple>"
        lines:
          - "<dark_gray>----------------"
          - "<light_purple><bold>%player%</bold></light_purple>"
          - "<gray>Rango: <white>%rank%"
          - "<gray>Kills: <red>%kills%"
          - "<gray>Muertes: <gold>%deaths%"
          - "<gray>Asistencias: <yellow>%assists%"
          - "<gray>Nivel: <yellow>%level%"
          - "<gray>Racha: <green>%streak%"
          - "<gray>Monedas: <gold>%coins%"
          - "<gray>Ping: <aqua>%ping%ms"
          - "<gray>Online: <light_purple>%online%<dark_gray>/<white>%max_players%"
          - "<dark_gray>----------------"
      - title: "<white><bold>APOLO KITPVP</bold></white>"
        lines:
          - "<dark_gray>----------------"
          - "<light_purple><bold>%player%</bold></light_purple>"
          - "<gray>Rango: <white>%rank%"
          - "<gray>Kills: <red>%kills%"
          - "<gray>Muertes: <gold>%deaths%"
          - "<gray>Asistencias: <yellow>%assists%"
          - "<gray>Nivel: <yellow>%level%"
          - "<gray>Racha: <green>%streak%"
          - "<gray>Monedas: <gold>%coins%"
          - "<gray>Ping: <aqua>%ping%ms"
          - "<gray>Online: <light_purple>%online%<dark_gray>/<white>%max_players%"
          - "<dark_gray>----------------"
tablist:
  mode: STATIC
  animation:
    frame-interval-updates: 2
    frames:
      - header:
          - ""
          - "<gradient:#a855f7:#ffffff><bold>APOLOMC NETWORK</bold></gradient>"
          - "<gray>¡Bienvenido, <#e9d5ff>%player%<gray>!"
          - "<dark_gray>━━━━━━━━━━━━━━━━━━━━━━━━"
        footer:
          - "<gray>Rango: <#c084fc>%rank% <dark_gray>| <gray>Ping: <#38bdf8>%ping%ms"
          - "<gray>Jugadores: <#c084fc>%online%<dark_gray>/<white>%max_players%"
          - "<gradient:#a855f7:#ffffff>ApoloMC Network</gradient>"
          - ""
        player-name-format: "%prefix%<#e9d5ff>%player%"
      - header:
          - ""
          - "<gradient:#ffffff:#a855f7><bold>ＡＰＯＬＯＭＣ ＮＥＴＷＯＲＫ</bold></gradient>"
          - "<gray>¡Bienvenido, <#c084fc>%player%<gray>!"
          - "<dark_gray>━━━━━━━━━━━━━━━━━━━━━━━━"
        footer:
          - "<gray>Rango: <#e9d5ff>%rank% <dark_gray>| <gray>Ping: <#7dd3fc>%ping%ms"
          - "<gray>Jugadores: <#e9d5ff>%online%<dark_gray>/<white>%max_players%"
          - "<gradient:#ffffff:#a855f7>ApoloMC Network</gradient>"
          - ""
        player-name-format: "%prefix%<#ffffff>%player%"

# ----------------------------------------------------------------------------
#  Animaciones de texto reutilizables: úsalas en cualquier línea con %animation:nombre%
#  interval-ticks = ticks entre frames (20 = 1 s). Evita puntos en el nombre.
#  Los frames pueden contener otros placeholders (%player%, %condition:x%...).
# ----------------------------------------------------------------------------
text-animations:
  brillo:
    interval-ticks: 6
    frames:
      - "<#a855f7><bold>APOLOMC"
      - "<#c084fc><bold>APOLOMC"
      - "<#e9d5ff><bold>APOLOMC"
      - "<white><bold>APOLOMC"
      - "<#e9d5ff><bold>APOLOMC"
      - "<#c084fc><bold>APOLOMC"
  consejos:
    interval-ticks: 100
    frames:
      - "<gray>Usa <white>/kit<gray> para elegir tu kit"
      - "<gray>Únete a un <white>/clan<gray> con tus amigos"
      - "<gray>Oculta este panel con <white>/sb"


```

### `ScorebordLs/placeholders.yml`

Fuente del repositorio; se conservan comentarios y estructura. Credenciales y URLs privadas se ocultan.

```yaml
# ============================================================================
#  Placeholders del scoreboard y tablist - KitPvP-Core
# ============================================================================
#  Internos disponibles (todos con % a cada lado):
#   Jugador:   %player% %uuid% %world% %gamemode% %ping% %ping_color% %health% %health_int% %max_health% %health_bar%
#              %food% %x% %y% %z% %kit% %combat% (true/false) %combat_time% (segundos)
#   Progreso:  %kills% %deaths% %assists% %level% %coins% %streak% %maxstreak% %xp% %koth_wins% %kdr%
#              (las cifras grandes se abrevian: 9M; usa la versión _raw para el valor exacto: %kills_raw%...)
#              %xp_needed% %xp_remaining% %xp_percent% %xp_bar%
#   Rango:     %rank% (grupo) %rank_display% (capitalizado) %prefix% %suffix% %group_weight%
#   Clan:      %clan% %clan_tag% %clan_rank%
#   Servidor:  %online% %online_world% %max_players% %staff_online% %server_name% %tps% %tps_color% %mspt%
#              %memory_used% %memory_max% %memory_percent% (MB / %) %time% %date%
#   Propios:   %custom:nombre%  %condition:nombre%  %animation:nombre%  (definidos en este archivo / animations.yml)
#   Además funciona cualquier placeholder de PlaceholderAPI si está instalado.
#  Los nombres que usas en %custom:x%, %condition:x% y %animation:x% no deben llevar puntos.
# ============================================================================

server-name: "ApoloMC"
# Zona horaria y formatos para %time% y %date%.
timezone: "America/Argentina/Buenos_Aires"
time-format: "HH:mm"
date-format: "dd/MM/yyyy"
# Permiso que cuenta a un jugador como staff en %staff_online%.
staff-permission: "kitpvp.staff"
# true = los jugadores en vanish (metadata "vanished") no cuentan en %online%.
hide-vanished-from-count: true

# Textos cuando algo no existe.
texts:
  no-clan: ""
  no-kit: "Ninguno"

# Colores de %ping_color% y %tps_color% (se usan como etiquetas MiniMessage).
colors:
  good: "<green>"
  medium: "<yellow>"
  bad: "<red>"
  ping-good: 80
  ping-medium: 160
  tps-good: 18
  tps-medium: 15

# Barras de %health_bar% y %xp_bar%. Usa un carácter ASCII para que Bedrock lo muestre bien.
bars:
  length: 10
  char: "|"
  health-color: "<red>"
  xp-color: "<green>"
  empty-color: "<dark_gray>"

# Reemplazos del valor de un placeholder. Claves: valor exacto, "<empty>" (vacío) o "*" (cualquier otro).
# En el texto nuevo, %value% es el valor original. Las claves del placeholder deben ir entre comillas.
output-replacements:
  "%rank_display%":
    "<empty>": "Jugador"
    "Default": "Jugador"
  # "%ping%":
  #   "*": "%value% ms"

# Placeholders propios: %custom:saludo%
custom:
  saludo: "<gray>Hola, <white>%player%"

# Condiciones reutilizables. type: AND | OR. El resultado de %condition:nombre% es if-true / if-false.
# Cada condición admite: permission:nodo, world:mundo, %p%=valor, !=, >, >=, <, <=, <- (contiene), |= (uno de a,b,c),
# prefijo ! para negar y el nombre de otra condición.
conditions:
  has-clan:
    type: AND
    conditions:
      - "%clan_tag%!="
    if-true: "<gray>Clan: <aqua>%clan%"
    if-false: ""
  is-staff:
    type: OR
    conditions:
      - "permission:kitpvp.staff"
      - "permission:kitpvp.admin"
    if-true: "<red>[Staff]"
    if-false: ""
  high-ping:
    type: AND
    conditions:
      - "%ping%>150"
    if-true: "<red>Ping alto"
    if-false: ""

```

### `ScorebordLs/scoreboard.yml`

Fuente del repositorio; se conservan comentarios y estructura. Credenciales y URLs privadas se ocultan.

```yaml
# ============================================================================
#  Scoreboard lateral (sidebar) - KitPvP-Core
# ============================================================================
#  - Compatible con Java y Bedrock (Geyser): texto en las entradas, separadores ASCII y colores estándar.
#  - Actualización por diferencias: solo se reenvían las líneas que cambian (sin parpadeo).
#  - Placeholders: ver ScorebordLs/placeholders.yml (internos, %condition:x%, %animation:x%, %custom:x% y PlaceholderAPI).
#  - Una línea vacía (o que resuelve a vacío) se oculta. Para forzar una línea en blanco usa {space}.
#  - Los jugadores pueden ocultarlo con /sb (permiso kitpvp.scoreboard.toggle).
# ============================================================================
enabled: true
# Cada cuántos ticks se refresca (20 ticks = 1 s). Al ser por diferencias puede ser bajo sin parpadeo.
update-ticks: 10
# Mundos donde no se muestra.
disabled-worlds: []
# Oculta los números rojos de la derecha (clientes 1.20.3+; Bedrock puede seguir mostrándolos).
hide-scores: true
# false = colores legacy más cercanos (más compatible con Bedrock); true = hex/degradados completos en Java.
hex-colors: false
# Longitud máxima de cada línea (con códigos de color).
max-line-length: 128
# Título: texto simple o lista de frames (animado). Intervalo entre frames en ticks.
title: "<light_purple><bold>APOLO KITPVP</bold></light_purple>"
title-interval-ticks: 20
# Mostrar el bloque de Combate (cooldowns y combat tag) bajo las líneas. Máximo de filas del diseño (1-15).
show-combat: true
max-lines: 15
lines:
  - "<dark_gray>----------------"
  - "<light_purple><bold>%player%</bold></light_purple>"
  - "<gray>Rango: <white>%rank_display%"
  - "<gray>Kills: <red>%kills% <dark_gray>(<gray>KDR <white>%kdr%<dark_gray>)"
  - "<gray>Muertes: <gold>%deaths%"
  - "<gray>Asistencias: <yellow>%assists%"
  - "<gray>Nivel: <yellow>%level% <dark_gray>(<gray>%xp_percent%%<dark_gray>)"
  - "<gray>Racha: <green>%streak%"
  - "<gray>Monedas: <gold>%coins%"
  - "%condition:has-clan%"
  - "<gray>Ping: %ping_color%%ping%ms"
  - "<gray>Online: <light_purple>%online%<dark_gray>/<white>%max_players%"
  - "<dark_gray>----------------"

# ----------------------------------------------------------------------------
#  Diseños adicionales con condición (como los scoreboards de TAB).
#  Se evalúan por prioridad (mayor primero); el primero cuya condición se cumpla reemplaza al diseño de arriba.
#  Condiciones: permission:nodo | world:nombre | %placeholder%=valor | != | > | >= | < | <= | <- (contiene) | |= (uno de a,b,c)
#  Puedes negar con ! y reutilizar condiciones de placeholders.yml por su nombre.
# ----------------------------------------------------------------------------
scoreboards:
  staff:
    enabled: false
    priority: 10
    display-condition: "permission:kitpvp.staff"
    title: "<red><bold>STAFF</bold>"
    lines:
      - "<dark_gray>----------------"
      - "<gray>Staff online: <white>%staff_online%"
      - "<gray>TPS: %tps_color%%tps% <dark_gray>| <gray>MSPT: <white>%mspt%"
      - "<gray>RAM: <white>%memory_used%<dark_gray>/<white>%memory_max% MB"
      - "<gray>Jugadores: <white>%online%<dark_gray>/<white>%max_players%"
      - "<gray>Ping: %ping_color%%ping%ms"
      - "<dark_gray>----------------"
    show-combat: false
  en-combate:
    enabled: false
    priority: 5
    display-condition: "%combat%=true"
    title: "<red><bold>EN COMBATE</bold>"
    lines:
      - "<dark_gray>----------------"
      - "<gray>Vida: <white>%health_int%<dark_gray>/<white>20"
      - "%health_bar%"
      - "<gray>Racha: <green>%streak%"
      - "<gray>Combate: <white>%combat_time%s"
      - "<dark_gray>----------------"
    show-combat: false

# Sobrescribir título/líneas por mundo (solo para el diseño principal):
# worlds:
#   arena:
#     title: "<red><bold>ARENA</bold>"
#     lines:
#       - "<gray>Kills: <red>%kills%"

combat-display:
  enabled: true
  header: "<gold><bold>COMBATE</bold>"
  separator: "<dark_gray>----------------"
  tag-format: "<gray>En combate: <white>{time}"
  cooldowns:
    line-format: "<gray>{label}: <aqua>{time}"
    global-line-format: "<gray>Cooldown Global: <yellow>{time}"
    # Agrega entradas con un id único. Triggers: consume, projectile, interact.
    items:
      apple:
        enabled: true
        material: GOLDEN_APPLE
        trigger: consume
        label: "Manzana"
        seconds: 60
      ender-pearl:
        enabled: true
        material: ENDER_PEARL
        trigger: projectile
        label: "Perla"
        seconds: 15

```

### `ScorebordLs/tablist.yml`

Fuente del repositorio; se conservan comentarios y estructura. Credenciales y URLs privadas se ocultan.

```yaml
# ============================================================================
#  Tablist (lista de jugadores) - KitPvP-Core
# ============================================================================
#  Incluye: cabecera/pie, formato del nombre, diseños con condición, nametags (prefijo/sufijo sobre la cabeza),
#  orden de la lista, vida bajo el nombre y objetivo numérico junto al jugador (como la pestaña de TAB).
#  Las animaciones por frames se configuran en ScorebordLs/animations.yml.
#  Placeholders: ver ScorebordLs/placeholders.yml.
# ============================================================================
# Interruptor general de este archivo (header/footer, nombres, nametags, orden y objetivos).
enabled: true
update-ticks: 10
disabled-worlds: []
header:
  - ""
  - "<gradient:#a855f7:#ffffff><bold>APOLOMC NETWORK</bold></gradient>"
  - "<gray>¡Bienvenido, <#e9d5ff>%player%<gray>!"
  - "<dark_gray>━━━━━━━━━━━━━━━━━━━━━━━━"
footer:
  - "<gray>Rango: <#c084fc>%rank_display% <dark_gray>| <gray>Ping: %ping_color%%ping%ms"
  - "<gray>Jugadores: <#c084fc>%online%<dark_gray>/<white>%max_players% <dark_gray>| <gray>TPS: %tps_color%%tps%"
  - "<gradient:#a855f7:#ffffff>ApoloMC Network</gradient>"
  - ""
# Nombre en la lista. Prioridad: frame animado > diseño > mundo (worlds.<mundo>.player-name-format) > grupo > este valor.
player-name-format: "%tag%%prefix%&f%player%"
# Formato por grupo de LuckPerms (opcional):
# player-name-formats:
#   admin: "&c[Admin] &f%player%"

# ----------------------------------------------------------------------------
#  Diseños con condición (cabecera/pie/nombre distintos según permiso, mundo, combate...).
#  El primero (mayor prioridad) cuya condición se cumpla se aplica; lo que no defina usa los valores de arriba.
# ----------------------------------------------------------------------------
designs:
  staff:
    enabled: false
    priority: 10
    display-condition: "permission:kitpvp.staff"
    header:
      - "<red><bold>PANEL STAFF</bold>"
    footer:
      - "<gray>TPS: %tps_color%%tps% <dark_gray>| <gray>MSPT: <white>%mspt% <dark_gray>| <gray>RAM: <white>%memory_percent%%"
      - "<gray>Staff online: <white>%staff_online%"

# ----------------------------------------------------------------------------
#  Nametag: prefijo/sufijo sobre la cabeza (usa equipos del scoreboard, por jugador).
#  name-color: WHITE | AUTO (último color del prefijo) | NONE | cualquier color (RED, GOLD...)
#  visibility: ALWAYS | NEVER | HIDE_FOR_OTHER_TEAMS | HIDE_FOR_OWN_TEAM
#  collision: false = los jugadores no se empujan entre sí.
# ----------------------------------------------------------------------------
nametag:
  enabled: true
  prefix: "%tag%%prefix%"
  suffix: ""
  name-color: WHITE
  visibility: ALWAYS
  collision: false
  # Valores distintos por grupo de LuckPerms:
  # groups:
  #   admin:
  #     prefix: "&c[Admin] "
  #     name-color: RED

# ----------------------------------------------------------------------------
#  Orden de la lista de jugadores (aplica a Java). Los criterios se aplican en orden:
#    GROUP_WEIGHT                      peso del grupo de LuckPerms (mayor primero)
#    GROUPS:owner,admin,mod            orden explícito de grupos
#    PERMISSION:kitpvp.owner,kitpvp.admin   primero quien tenga el primer permiso
#    PLACEHOLDER_HIGH_TO_LOW:%kills_raw%   número de mayor a menor (LOW_TO_HIGH al revés)
#    PLACEHOLDER_A_TO_Z:%clan%         alfabético por placeholder
#    NAME                              alfabético por nombre (siempre desempata al final)
# ----------------------------------------------------------------------------
sorting:
  enabled: true
  types:
    - GROUP_WEIGHT
    - NAME

# ----------------------------------------------------------------------------
#  Texto bajo el nombre del jugador. mode: HEALTH | PING | KILLS | DEATHS | ASSISTS | LEVEL | STREAK | COINS | PLACEHOLDER
#  Con mode PLACEHOLDER define "placeholder: %kills_raw%" (debe dar un número).
# ----------------------------------------------------------------------------
belowname:
  enabled: false
  mode: HEALTH
  title: "<red>HP"
  placeholder: "%ping%"

# Número (o corazones con HEALTH) junto al nombre dentro de la lista de jugadores.
playerlist-objective:
  enabled: false
  mode: PING
  title: ""
  placeholder: "%ping%"

```

### `abilities-shop.yml`

Fuente del repositorio; se conservan comentarios y estructura. Credenciales y URLs privadas se ocultan.

```yaml
# Catálogo de habilidades y mejoras. Mantén las ventajas equilibradas.
settings:
  enabled: true
  permanent-unlocks: true
  default-max-level: 3
  require-combat-permission: false
abilities:
  speed:
    enabled: true
    price: 250
    max-level: 3
    duration-seconds: 5
    cooldown-seconds: 30
  strength:
    enabled: true
    price: 350
    max-level: 2
    duration-seconds: 4
    cooldown-seconds: 45
  heal:
    enabled: true
    price: 200
    max-level: 3
    cooldown-seconds: 60
  jump:
    enabled: true
    price: 200
    max-level: 3
    duration-seconds: 6
    cooldown-seconds: 35
  shield:
    enabled: true
    price: 500
    max-level: 2
    cooldown-seconds: 60

```

### `abilities.yml`

Fuente del repositorio; se conservan comentarios y estructura. Credenciales y URLs privadas se ocultan.

```yaml
# Cooldown compartido: ninguna ability puede activarse mientras este temporizador esté activo.
global-cooldown-seconds: 10
cooldown-display:
  global-actionbar-format: "&6Cooldown Global: &f{seconds}s"
  ability-actionbar-format: "&d{name}&7: &f{seconds}s"

abilities:
  speed:
    enabled: true
    action: speed
    duration-seconds: 5
    cooldown-seconds: 30
    amplifier: 1
    success-message: "&b¡Velocidad activada!"
    item:
      enabled: true
      material: FEATHER
      name: "&b&lImpulso Veloz"
      lore:
        - "&7Aumenta tu velocidad durante 5 segundos."
        - ""
        - "&eClic derecho para activar"
      consume-on-use: false
  strength:
    enabled: true
    action: strength
    duration-seconds: 5
    cooldown-seconds: 45
    amplifier: 0
    success-message: "&c¡Fuerza activada!"
    item:
      enabled: true
      material: BLAZE_POWDER
      name: "&c&lFuria"
      lore:
        - "&7Aumenta tu fuerza durante 5 segundos."
        - ""
        - "&eClic derecho para activar"
      consume-on-use: false
  heal:
    enabled: true
    action: heal
    cooldown-seconds: 30
    amount: 6
    success-message: "&a¡Has recuperado salud!"
    item:
      enabled: true
      material: GOLDEN_APPLE
      name: "&a&lPulso Vital"
      lore:
        - "&7Recupera 6 puntos de salud."
        - ""
        - "&eClic derecho para activar"
      consume-on-use: false
  jump:
    enabled: true
    action: jump
    duration-seconds: 6
    cooldown-seconds: 30
    amplifier: 1
    success-message: "&d¡Salto mejorado activado!"
    item:
      enabled: true
      material: RABBIT_FOOT
      name: "&d&lSalto Lunar"
      lore:
        - "&7Mejora tu salto durante 6 segundos."
        - ""
        - "&eClic derecho para activar"
      consume-on-use: false
  shield:
    enabled: true
    action: shield
    duration-seconds: 4
    cooldown-seconds: 40
    amplifier: 1
    success-message: "&6¡Escudo activado!"
    item:
      enabled: true
      material: SHIELD
      name: "&6&lBarrera"
      lore:
        - "&7Otorga absorción temporal."
        - ""
        - "&eClic derecho para activar"
      consume-on-use: false
  dash:
    enabled: true
    action: dash
    cooldown-seconds: 12
    power: 1.8
    vertical-power: 0.35
    success-message: "&e¡Impulso ejecutado!"
    item:
      enabled: true
      material: SUGAR
      name: "&e&lDash"
      lore:
        - "&7Impúlsate en la dirección que miras."
        - ""
        - "&eClic derecho para activar"
      consume-on-use: false
  fireball:
    enabled: true
    action: fireball
    cooldown-seconds: 20
    incendiary: false
    yield: 0.0
    success-message: "&c¡Bola de fuego lanzada!"
    item:
      enabled: true
      material: FIRE_CHARGE
      name: "&c&lEsfera Ígnea"
      lore:
        - "&7Lanza un proyectil hacia donde miras."
        - "&7No destruye bloques por defecto."
        - ""
        - "&eClic derecho para activar"
      consume-on-use: false

  switcher:
    enabled: true
    action: switcher
    cooldown-seconds: 22
    success-message: "&e¡Bola Switcher lanzada! Acertá a un enemigo para intercambiar posiciones."
    success-hit-message: "&d¡Intercambiaste posición con &f{player}&d!"
    target-message: "&c¡{player} intercambió posición contigo!"
    item:
      enabled: true
      material: SNOWBALL
      name: "&e&lSwitcher"
      lore:
        - "&7Lanza una bola que intercambia"
        - "&7tu posición con la del rival."
        - ""
        - "&eClic derecho para lanzar"
      consume-on-use: false

  rocket:
    enabled: true
    action: rocket
    cooldown-seconds: 18
    vertical-power: 1.25
    success-message: "&e¡Cohete lanzado! Acertá a un enemigo para impulsarlo."
    success-hit-message: "&e¡Lanzaste a &f{player}&e por los aires!"
    target-message: "&c¡{player} te lanzó por los aires!"
    item:
      enabled: true
      material: FIREWORK_ROCKET
      name: "&6&lRocket"
      lore:
        - "&7Lanza un proyectil que impulsa"
        - "&7al enemigo hacia arriba."
        - ""
        - "&eClic derecho para lanzar"
      consume-on-use: false

  debuff:
    enabled: true
    action: debuff
    cooldown-seconds: 25
    effect-duration-seconds: 4
    effect-amplifier: 0
    success-message: "&5¡Proyectil de debilitamiento lanzado!"
    success-hit-message: "&5¡Debilitaste a &f{player}&5!"
    target-message: "&c¡{player} te aplicó un debilitamiento!"
    item:
      enabled: true
      material: FERMENTED_SPIDER_EYE
      name: "&5&lDebuff"
      lore:
        - "&7Aplica Lentitud y Debilidad"
        - "&7si el proyectil golpea al rival."
        - ""
        - "&eClic derecho para lanzar"
      consume-on-use: false

  cleanse:
    enabled: true
    action: cleanse
    cooldown-seconds: 30
    remove-effect-keys:
      - poison
      - wither
      - slowness
      - weakness
      - blindness
      - hunger
      - mining_fatigue
      - darkness
      - levitation
    success-message: "&a¡Limpiaste tus efectos negativos!"
    item:
      enabled: true
      material: MILK_BUCKET
      name: "&f&lCleanse"
      lore:
        - "&7Elimina efectos negativos comunes."
        - ""
        - "&eClic derecho para activar"
      consume-on-use: false

  ninja:
    enabled: true
    action: ninja
    cooldown-seconds: 30
    range: 20
    no-target-message: "&cApunta directamente a un jugador a menos de 20 bloques."
    unsafe-target-message: "&cNo se encontró una posición segura detrás del objetivo."
    success-message: "&d¡Te teletransportaste detrás del objetivo!"
    target-message: "&c¡{player} apareció detrás de ti!"
    item:
      enabled: true
      material: ENDER_EYE
      name: "&d&lNinja"
      lore:
        - "&7Te teletransporta detrás del jugador"
        - "&7al que estés apuntando."
        - ""
        - "&eClic derecho para activar"
      consume-on-use: false

  vampire:
    enabled: true
    action: vampire_on_hit
    cooldown-seconds: 18
    heal-amount: 2.0
    success-message: "&c¡Vampiro! Recuperaste vida al golpear a &f{player}&c."
    no-heal-message: "&7Ya tienes la vida al máximo."
    cooldown-message: "&eEspera {seconds}s para volver a usar esta habilidad."
    hit-message: "&eGolpea a un jugador con este objeto para recuperar vida."
    item:
      enabled: true
      material: GHAST_TEAR
      name: "&c&lVampiro"
      lore:
        - "&7Recupera 1 corazón al golpear"
        - "&7a un enemigo (con cooldown)."
        - ""
        - "&eGolpea a un jugador para activar"
      consume-on-use: false

  inventory-scrambler:
    enabled: true
    action: shuffle_inventory
    cooldown-seconds: 25
    success-message: "&d¡Revolviste el inventario de &f{player}&d!"
    target-message: "&c¡{player} revolvió tu inventario!"
    cooldown-message: "&eEspera {seconds}s para volver a usar esta habilidad."
    no-items-message: "&7Ese jugador no tiene suficientes objetos para revolver."
    hit-message: "&eGolpea a otro jugador con este objeto para revolver su inventario."
    item:
      enabled: true
      material: ENDER_EYE
      name: "&5&lCaos de Mochila"
      lore:
        - "&7Revuelve los objetos de un enemigo."
        - "&7Se activa al golpear con el objeto."
        - ""
        - "&eGolpea a un jugador para activar"
      consume-on-use: false

```



## Contenido YAML — continuación

### `afk-zone-example.yml`

Contenido fuente con comentarios originales:

```yaml
# Plantilla para copiar a afk-zones/<nombre>.yml y editar.
enabled: false
permission: ""
messages:
  entered: "&aEntraste a la zona AFK. Próxima recompensa en &f%time%"
  left: "&7Saliste de la zona AFK. Tiempo: &f%time%"
  reward:
    - "&aRecompensa por &f%time%&a:"
    - "&7- &f%reward%"
in-zone:
  title: "&d⌚ &fZONA AFK"
  subtitle: "&ePróxima recompensa: &d%time%"
  actionbar: ""
  bossbar:
    enabled: true
    name: "&dZona AFK &7| &f%time%"
    color: PURPLE
    style: SOLID
reward-time-seconds: 60
roll-amount: 1
rewards:
  - chance: 50.0
    permission: ""
    minimum-time: 0
    maximum-time: 100000
    display: "1x Iron Ingot"
    items:
      - material: IRON_INGOT
        amount: 1
    commands: []
  - chance: 25.0
    permission: ""
    minimum-time: 0
    maximum-time: 100000
    display: "5x Diamond"
    items:
      - material: DIAMOND
        amount: 5
    commands: []
zone:
  location1: {world: "world", x: 0, y: 80, z: 0}
  location2: {world: "world", x: 5, y: 85, z: 5}

```

### `afk-zone.yml`

Contenido fuente con comentarios originales:

```yaml
# Configuración global de zonas AFK.
enabled: true
prefix: "&5&lAPOLO &8» &r"
zone-per-ip-limit: -1
reset-after-reward: false
# 0 = llena/decreciente; 1 = vacía/creciente.
bossbar-direction: 0

```

### `arenas.yml`

Contenido fuente con comentarios originales:

```yaml
# Individual arena definitions are stored in arenas/<id>.yml.
settings:
  auto-assign: false
  require-spawn: true

```

### `clans.yml`

Contenido fuente con comentarios originales:

```yaml
# Sistema de clanes nativo de KitPvP-Core; no requiere UltimateClans.
enabled: true
settings:
  max-members: 20
  # true permite daño entre miembros del mismo clan.
  friendly-fire: true
  # Activa solicitudes y aceptación de alianzas.
  alliances: true
  # false bloquea el daño entre miembros de clanes aliados.
  allied-friendly-fire: false
  min-name-length: 3
  max-name-length: 16

```

### `combat.yml`

Contenido fuente con comentarios originales:

```yaml
# KitPvP-Core — Configuración de Combate y CombatLog
tag:
  duration-seconds: 15
  announce: true

rewards:
  kill-coins: 10
  kill-xp: 25

friendly-fire:
  enabled: true
  clan-members: true

# Sanción automática personalizable por desconexión en combate (CombatLogX style)
punishment:
  enabled: true
  # Ejecutar al jugador que desconectó
  kill-player: true
  # Dropear los objetos del inventario en la posición de desconexión
  drop-items: true
  # Dropear la experiencia acumulada
  drop-exp: true
  # Penalizaciones económicas y estadísticas al infractor
  loss-coins: 50
  loss-xp: 25
  reset-streak: true
  # Otorgar la baja y recompensa al último jugador que lo atacó
  credit-attacker: true
  # Notificaciones
  broadcast: true
  broadcast-message: "&5&lCOMBAT &8» &c{player} &7se desconectó en combate y fue ejecutado."
  attacker-message: "&5&lCOMBAT &8» &a¡{player} se desconectó peleando contra ti! Has recibido la baja."
  penalty-message: "&c&lCOMBAT-LOG &7» &cFuiste sancionado por desconectarte durante el combate."
  # Comandos de consola a ejecutar en caso de desconexión en combate (usa {player} y {attacker})
  commands: []

```

### `command-filter.yml`

Contenido fuente con comentarios originales:

```yaml
# Command filtering for the KitPvP core.
# Command names are case-insensitive and may be written with or without the leading slash.
enabled: true

# If true, only commands listed under commands are executable by non-bypassed players.
use-commands-as-whitelist: false

# Block commands from execution. Supports command roots and full command forms.
commands:
  - "plugins"
  - "pl"
  - "version"
  - "ver"
  - "about"
  - "icanhasbukkit"
  - "?"
  - "helpop"
  - "essentials:help"
  - "bukkit:help"
  - "minecraft:help"
  - "essentials:plugins"
  - "essentials:version"
  - "essentials:about"
  - "bukkit:plugins"
  - "bukkit:pl"
  - "bukkit:version"
  - "bukkit:ver"
  - "bukkit:about"

# Block any command containing a namespace separator, such as minecraft: or bukkit:.
block-colon-commands: true

# Hide commands from tab completion. Set true to show only commands in commands.
filter-tab-completion: true

# Permission that bypasses command execution filtering.
bypass-permission: "kitpvp.commandfilter.bypass"

# Permission required to reload this configuration.
admin-permission: "kitpvp.admin.commandfilter"

blocked-message: "&cNo tienes permiso para ejecutar ese comando."
reload-message: "&aFiltro de comandos recargado correctamente."

```



## Contenido YAML — continuación

### `conditional-events.yml`

Contenido fuente con comentarios originales. Los campos sensibles se ocultan:

```yaml
# Motor nativo de eventos condicionales de KitPvP-Core.
# Se crea solo si no existe; la recarga no sobrescribe tus cambios.
#
# Tipos: player_join, player_quit, player_command, player_interact, player_consume,
# block_break, block_place, player_death, player_kill, player_respawn, repetitive
# Condiciones: equals, not equals, contains, startsWith, endsWith, >, <, >=, <=
# Se permiten "and" y "or".
# Variables: %player%, %player_name%, %player_uuid%, %player_world%, %online%,
# %max_players%, %server_name%, %player_health%, %player_food%, %player_level%,
# %player_gamemode%, %player_x%, %player_y%, %player_z%, %command%, %action%,
# %item_material%, %item_name%, %block_type%, %is_kitpvp_block%, %victim%, %killer%, %cause%, %world_from%, %world_to%.
#
# Acciones: message:<texto>, broadcast:<texto>, actionbar:<texto>, title:<titulo>;<subtitulo>,
# console_command:<comando>, give_item:<MATERIAL>;<cantidad>, repair_armor:<mensaje>, open_kit_chest,
# potion_effect:<EFECTO>;<segundos>;<amplificador>, heal:<cantidad>,
# set_food_level:<0-20>, teleport:<mundo>;<x>;<y>;<z>;<yaw>;<pitch>,
# play_sound:<SONIDO>;<volumen>;<tono>, cancel_event:true|false, wait_ticks:<ticks>.

settings:
  repetitive:
    enabled: false
    interval-ticks: 100

events:
  bienvenida:
    enabled: true
    type: player_join
    conditions: []
    actions:
      - "message:&d¡Bienvenido a ApoloMC, %player%!"
      - "play_sound:ENTITY_EXPERIENCE_ORB_PICKUP;1;1"


  # Repara solo al hacer clic derecho en un yunque portátil de KitPvP-Core.
  reparar-armadura-yunque:
    enabled: true
    type: player_interact
    conditions:
      - '%action% equals RIGHT_CLICK and %is_kitpvp_block% equals true and %block_type% contains ANVIL'
    actions:
      - 'cancel_event:true'
      - 'repair_armor:&a¡Tu armadura fue reparada!'

  # Abre el cofre virtual solo en un cofre portátil de KitPvP-Core.
  # Los jugadores pueden retirar/guardar objetos; el inventario se conserva por UUID.
  # Edita las listas de kits en kit-chest.yml.
  cofre-segun-kit:
    enabled: true
    type: player_interact
    conditions:
      - '%action% equals RIGHT_CLICK and %is_kitpvp_block% equals true and %block_type% equals CHEST'
    actions:
      - 'cancel_event:true'
      - 'open_kit_chest'


  cofre-trampa-segun-kit:
    enabled: true
    type: player_interact
    conditions:
      - '%action% equals RIGHT_CLICK and %is_kitpvp_block% equals true and %block_type% equals TRAPPED_CHEST'
    actions:
      - 'cancel_event:true'
      - 'open_kit_chest'

  ejemplo-comando:
    enabled: false
    type: player_command
    conditions:
      - '%command% contains /spawn'
    actions:
      - "actionbar:&aComando /spawn detectado."

```

### `config.yml`

Contenido fuente con comentarios originales. Los campos sensibles se ocultan:

```yaml
# SCON Grado Empresa (HMAC-SHA256), proyecto kitpvp-core. Configura aquí la clave emitida por el panel.
license-key: "REDACTED"

# KitPvP-Core defaults; existing server values are preserved by ConfigUpdater.
prefix: "&5&lAPOLO &8» &r"
combat:
  tag-seconds: 15
  prevent-quit: false
  quit-penalty: false
  kill-reward: 10
  death-loss: 0
  assist-reward: 2
  killstreak-rewards:
    "5": {coins: 50, xp: 25}
    "10": {coins: 150, xp: 100}
    "20": {coins: 400, xp: 250}
progression:
  xp-per-kill: 25
  xp-per-assist: 10
  base-xp: 100
  xp-per-level: 50
economy:
  starting-balance: 0
missions:
  daily-kills:
    goal: 5
    reward-coins: 100
    reward-xp: 50
  transfers-enabled: true
  max-transfer: 1000000
kits:
  menu-title: "&8Selector de Kits"
  cooldown-message: "&cDebes esperar {seconds}s para volver a usar este kit."
  clear-inventory: true
storage:
  type: yaml
  autosave-seconds: 60
settings:
  default-kit: starter
  friendly-fire: true
  debug: false

# PvP entry flow; spawn protection is measured in seconds.
pvp:
  spawn-protection-seconds: 3
  lobby-spawn:
    world: ""
    x: 0
    y: 80
    z: 0

# Optional arena block rollback. Only applies inside configured arena regions where build=true.
arenas:
  restore-blocks: false
  restore-delay-seconds: 30

```

### `cosmetics.yml`

Contenido fuente con comentarios originales. Los campos sensibles se ocultan:

```yaml
enabled: true
menu:
  title: "&8Cosméticos ApoloMC"
kill-effects:
  flame: {enabled: true, particle: FLAME, count: 35, sound: ENTITY_BLAZE_DEATH}
  hearts: {enabled: true, particle: HEART, count: 20, sound: ENTITY_PLAYER_LEVELUP}
  portal: {enabled: true, particle: PORTAL, count: 30, sound: BLOCK_PORTAL_AMBIENT}
categories:
  kill-effects:
    enabled: true
    icon: DIAMOND
    name: "&cEfectos de eliminación"
    description: "&7Efectos al derrotar a otro jugador"
    items:
      flame: {enabled: true, material: BLAZE_POWDER, name: "&cLlamas", particle: FLAME, count: 35, sound: ENTITY_BLAZE_DEATH}
      hearts: {enabled: true, material: HEART_OF_THE_SEA, name: "&dCorazones", particle: HEART, count: 20, sound: ENTITY_PLAYER_LEVELUP}
      portal: {enabled: true, material: ENDER_PEARL, name: "&5Portal", particle: PORTAL, count: 30, sound: BLOCK_PORTAL_AMBIENT}
      lightning: {enabled: true, material: TRIDENT, name: "&eRelámpago", particle: ELECTRIC_SPARK, count: 55, sound: ENTITY_LIGHTNING_BOLT_THUNDER}
      soul: {enabled: true, material: SOUL_LANTERN, name: "&bAlmas", particle: SOUL, count: 45, sound: ENTITY_WITHER_DEATH}
  particle-effects:
    enabled: true
    icon: BLAZE_POWDER
    name: "&bEstelas de partículas"
    description: "&7Partículas que acompañan tus movimientos"
    items:
      ender: {enabled: true, material: ENDER_EYE, name: "&5Rastro del End", particle: PORTAL}
      magic: {enabled: true, material: AMETHYST_SHARD, name: "&dMagia", particle: WITCH}
      flame: {enabled: true, material: BLAZE_POWDER, name: "&cLlamas", particle: FLAME}
      hearts: {enabled: true, material: POPPY, name: "&dCorazones", particle: HEART}
      stars: {enabled: true, material: NETHER_STAR, name: "&eEstrellas", particle: END_ROD}
      souls: {enabled: true, material: SOUL_TORCH, name: "&bAlmas", particle: SOUL}
      happy: {enabled: true, material: EMERALD, name: "&aNaturaleza", particle: HAPPY_VILLAGER}
  hats:
    enabled: true
    icon: GOLDEN_HELMET
    name: "&eSombreros mágicos"
    description: "&7Auras y efectos sobre tu cabeza"
    items:
      crown: {enabled: true, material: GOLDEN_HELMET, name: "&6Corona", particle: WAX_ON}
      halo: {enabled: true, material: END_ROD, name: "&fHalo", particle: END_ROD}
      flame: {enabled: true, material: FIRE_CHARGE, name: "&cCorona de fuego", particle: FLAME}
      witch: {enabled: true, material: CARVED_PUMPKIN, name: "&5Bruja", particle: WITCH}
      snow: {enabled: true, material: SNOWBALL, name: "&bNieve", particle: SNOWFLAKE}
  pets:
    enabled: true
    icon: WOLF_SPAWN_EGG
    name: "&aMascotas"
    description: "&7Compañeros cosméticos que te siguen"
    items:
      wolf: {enabled: true, material: WOLF_SPAWN_EGG, name: "&fLobo", entity: WOLF}
      cat: {enabled: true, material: CAT_SPAWN_EGG, name: "&dGato", entity: CAT}
      allay: {enabled: true, material: ALLAY_SPAWN_EGG, name: "&bAllay", entity: ALLAY}
      fox: {enabled: true, material: FOX_SPAWN_EGG, name: "&6Zorro", entity: FOX}
      bee: {enabled: true, material: BEE_SPAWN_EGG, name: "&eAbeja", entity: BEE}
      parrot: {enabled: true, material: PARROT_SPAWN_EGG, name: "&cLoro", entity: PARROT}
      axolotl: {enabled: true, material: AXOLOTL_SPAWN_EGG, name: "&dAjolote", entity: AXOLOTL}
  mounts:
    enabled: true
    icon: SADDLE
    name: "&6Monturas"
    description: "&7Monturas temporales para desplazarte"
    items:
      horse: {enabled: true, material: SADDLE, name: "&fCaballo", entity: HORSE}
      pig: {enabled: true, material: SADDLE, name: "&dCerdo", entity: PIG}
      strider: {enabled: true, material: STRIDER_SPAWN_EGG, name: "&cStrider", entity: STRIDER}
      camel: {enabled: true, material: CAMEL_SPAWN_EGG, name: "&6Camello", entity: CAMEL}
  gadgets:
    enabled: true
    icon: FIREWORK_ROCKET
    name: "&dGadgets"
    description: "&7Objetos cosméticos con efectos"
    items:
      fireworks: {enabled: true, material: FIREWORK_ROCKET, name: "&dFuegos artificiales", lore: ["&7Clic derecho para un destello"], particle: FIREWORK, count: 65, sound: ENTITY_FIREWORK_ROCKET_BLAST, cooldown-ticks: 40}
      magic: {enabled: true, material: AMETHYST_SHARD, name: "&5Varita mágica", lore: ["&7Clic derecho para liberar magia"], particle: WITCH, count: 50, sound: BLOCK_AMETHYST_BLOCK_CHIME, cooldown-ticks: 20}
      snow: {enabled: true, material: SNOWBALL, name: "&bBola mágica", lore: ["&7Clic derecho para una ráfaga helada"], particle: SNOWFLAKE, count: 45, sound: BLOCK_GLASS_BREAK, cooldown-ticks: 20}
      hearts: {enabled: true, material: POPPY, name: "&dCorazones", lore: ["&7Clic derecho para invocar corazones"], particle: HEART, count: 35, sound: ENTITY_PLAYER_LEVELUP, cooldown-ticks: 30}
  projectile-effects:
    enabled: true
    icon: ARROW
    name: "&cEstelas de proyectiles"
    description: "&7Efectos visuales en flechas y proyectiles"
    items:
      flame: {enabled: true, material: BLAZE_POWDER, name: "&cFlechas ígneas", particle: FLAME, count: 2}
      ender: {enabled: true, material: ENDER_EYE, name: "&5Flechas del End", particle: PORTAL, count: 3}
      hearts: {enabled: true, material: POPPY, name: "&dFlechas de amor", particle: HEART, count: 2}
      soul: {enabled: true, material: SOUL_TORCH, name: "&bFlechas de almas", particle: SOUL, count: 2}
  death-effects:
    enabled: true
    icon: SOUL_LANTERN
    name: "&8Efectos al morir"
    description: "&7Efectos que aparecen al morir"
    items:
      soul: {enabled: true, material: SOUL_LANTERN, name: "&bAlmas", particle: SOUL, count: 45, sound: ENTITY_WITHER_DEATH}
      explosion: {enabled: true, material: TNT, name: "&cExplosión visual", particle: EXPLOSION, count: 20, sound: ENTITY_GENERIC_EXPLODE}
      hearts: {enabled: true, material: POPPY, name: "&dCorazones", particle: HEART, count: 35, sound: ENTITY_PLAYER_LEVELUP}
  suits:
    enabled: true
    icon: LEATHER_CHESTPLATE
    name: "&bAuras de traje"
    description: "&7Auras visuales alrededor de tu personaje"
    items:
      emerald: {enabled: true, material: EMERALD, name: "&aEsmeralda", particle: HAPPY_VILLAGER}
      fire: {enabled: true, material: BLAZE_POWDER, name: "&cFuego", particle: FLAME}
      frost: {enabled: true, material: SNOWBALL, name: "&bEscarcha", particle: SNOWFLAKE}
      ender: {enabled: true, material: ENDER_EYE, name: "&5End", particle: PORTAL}
  morphs:
    enabled: true
    icon: CREEPER_HEAD
    name: "&2Auras de transformación"
    description: "&7Efectos temáticos; no cambia el modelo del jugador"
    items:
      creeper: {enabled: true, material: CREEPER_HEAD, name: "&aCreeper", particle: EXPLOSION}
      enderman: {enabled: true, material: ENDER_PEARL, name: "&5Enderman", particle: PORTAL}
      blaze: {enabled: true, material: BLAZE_ROD, name: "&6Blaze", particle: FLAME}
      guardian: {enabled: true, material: PRISMARINE_SHARD, name: "&bGuardián", particle: BUBBLE}
  emotes:
    enabled: true
    icon: TOTEM_OF_UNDYING
    name: "&eEmotes"
    description: "&7Gestos visuales al agacharte"
    items:
      happy: {enabled: true, material: SUNFLOWER, name: "&eFeliz", particle: HAPPY_VILLAGER, count: 12, sound: ENTITY_PLAYER_LEVELUP}
      heart: {enabled: true, material: POPPY, name: "&dCorazón", particle: HEART, count: 12, sound: BLOCK_NOTE_BLOCK_CHIME}
      angry: {enabled: true, material: BLAZE_POWDER, name: "&cEnojado", particle: ANGRY_VILLAGER, count: 12, sound: ENTITY_VILLAGER_NO}

```

### `death-messages.yml`

Contenido fuente con comentarios originales. Los campos sensibles se ocultan:

```yaml
# Mensajes de muerte administrados por KitPvP-Core.
# Edita una causa para personalizarla. Deja el valor como "" para ocultar ese mensaje.
# Se agregan automáticamente las causas de daño que falten en la versión de Paper instalada.
#
# Colores: &a, &#RRGGBB y MiniMessage (<gradient:#a855f7:#ffffff>texto</gradient>).
# Variables integradas: %victim%, %player%, {player}, {display-name}, %attacker%, {fighter}, {fighter-display-name}, %item%, %world%, %cause%, %x%, %y%, %z%.
# Placeholders de PlaceholderAPI se procesan si está instalado.
# En mensajes con atacante, %[ATTACKER]placeholder% se calcula para el atacante.

enabled: true
item-format: "&b%item%"
empty-hand-text: "air"
fallback-message: "&c%victim% &7murió."

death-messages:
  KILLED: "&c%victim% &7fue eliminado por &a%attacker%&7 usando %item%&7."
  BLOCK_EXPLOSION: "&c%victim% &7murió en una explosión."
  CONTACT: "&c%victim% &7se lastimó con un bloque peligroso."
  CRAMMING: "&c%victim% &7fue aplastado por demasiadas entidades."
  DRAGON_BREATH: "&c%victim% &7no sobrevivió al aliento de dragón."
  DROWNING: "&c%victim% &7se ahogó."
  DRYOUT: "&c%victim% &7se secó."
  ENTITY_ATTACK: "&c%victim% &7fue atacado por una entidad."
  ENTITY_EXPLOSION: "&c%victim% &7murió en una explosión."
  ENTITY_SWEEP_ATTACK: "&c%victim% &7fue alcanzado por un ataque en barrido."
  FALL: "&c%victim% &7cayó desde un lugar alto."
  FALLING_BLOCK: "&c%victim% &7fue aplastado por un bloque que cayó."
  FIRE: "&c%victim% &7murió en el fuego."
  FIRE_TICK: "&c%victim% &7se quemó."
  FLY_INTO_WALL: "&c%victim% &7chocó contra una pared mientras volaba."
  FREEZE: "&c%victim% &7murió congelado."
  HOT_FLOOR: "&c%victim% &7pisó una superficie demasiado caliente."
  LAVA: "&c%victim% &7no pudo escapar de la lava."
  LIGHTNING: "&c%victim% &7fue alcanzado por un rayo."
  MAGIC: "&c%victim% &7murió por daño mágico."
  MELTING: "&c%victim% &7se derritió."
  POISON: "&c%victim% &7murió envenenado."
  PROJECTILE: "&c%victim% &7fue alcanzado por un proyectil."
  SONIC_BOOM: "&c%victim% &7fue alcanzado por una onda sónica."
  STARVATION: "&c%victim% &7murió de hambre."
  SUFFOCATION: "&c%victim% &7se asfixió."
  SUICIDE: "&c%victim% &7murió."
  THORNS: "&c%victim% &7fue derrotado por espinas."
  VOID: "&c%victim% &7cayó al vacío."
  WITHER: "&c%victim% &7se marchitó."
  WORLD_BORDER: "&c%victim% &7quedó fuera de los límites del mundo."
  CAMPFIRE: "&c%victim% &7se quemó en una fogata."
  KILL: "&c%victim% &7murió."
  CUSTOM: "&c%victim% &7murió por una causa desconocida."

```

### `duels.yml`

Contenido fuente con comentarios originales. Los campos sensibles se ocultan:

```yaml
invitation:
  expiry-seconds: 30
  allow-spectators: true
  default-mode: "1v1"
  wager:
    enabled: false
    maximum: 10000
ranking:
  elo-start: 1000
  elo-k-factor: 32

```

### `economy.yml`

Contenido fuente con comentarios originales. Los campos sensibles se ocultan:

```yaml
currency:
  name: "monedas"
  symbol: "$"
  starting-balance: 0
transfers:
  enabled: true
  max-amount: 1000000
  minimum-amount: 1

```

