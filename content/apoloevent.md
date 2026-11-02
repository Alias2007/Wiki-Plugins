# ApoloEvent

> Plugin de eventos y minijuegos de ApoloMC Network. Referencia organizada por modalidad, comandos, variables y configuración.

<span class="doc-meta">Paper 1.21.4 · Java 21 · README del proyecto: 0.5.115</span>

<a id="overview"></a>
## Resumen

ApoloEvent reúne eventos competitivos, minijuegos, jefes, AirDrops, mapas configurables, recompensas y menús editables mediante YAML.

**Áreas principales:** Backroom, carrera de caballos, ColorMatch, Boss, Eclipse de Sangre, preparación de arenas MiniGames, AirDrop y bosses automáticos de minas.

El plugin mantiene datos de tops en SQLite, registra acciones administrativas en `audit.log` y permite actualizar textos sin reemplazar las personalizaciones existentes.

<a id="backroom"></a>
## Backroom

Carrera por un mapa con puntos de control y meta. Incorpora espectadores, habilidades, PvP configurable, partículas para orientar a los participantes, objetos de velocidad/fuerza y brújula rastreadora.

**Configuración:** `events/backroom.yml`.

**Integración de clanes:** UltimateClans puede permitir o bloquear el combate entre miembros del mismo clan y aliados. Solo afecta a participantes activos cuando el PvP del evento está habilitado.

```yaml
integrations:
  ultimateclans:
    enabled: true
    same-clan: true
    allies: true
```

<a id="horses"></a>
## Carrera de caballos

Carrera con monturas, checkpoints secuenciales, tiempo límite, objetos especiales y recompensas por posición.

**Configuración:** `events/horse.yml`.

Comandos principales:
```
/evento caballos start
/evento caballos stop
/evento caballos join
/evento caballos leave
/evento caballos forcestart
/evento setcheckpoint caballos <número>
/evento anuncio caballos <tiempo>
```

El argumento `<tiempo>` acepta segundos (`30s`), minutos (`10m`), horas (`2h`), minutos como número o una hora `HH:mm`. El anuncio no inicia el evento.

<a id="colormatch"></a>
## ColorMatch

Minijuego de supervivencia por colores, con rondas, efectos, perfiles de arena y recompensas. Permite preparar lobby y región, construir la arena, iniciar/detener partidas y restaurar los bloques al finalizar.

**Configuración:** `events/colormatch.yml`.

```
/evento colormatch setlobby
/evento colormatch pos1
/evento colormatch pos2
/evento colormatch build
/evento colormatch start
/evento colormatch stop
/evento colormatch reload
/evento colormatch join
/evento colormatch leave
```

<a id="bosses"></a>
## Bosses y bosses de minas

### Evento Boss

El evento reconoce participantes al entrar a una región de WorldGuard configurada en `events/boss.yml`. No los teletransporta automáticamente. Revisa `region.world` y `region.id`.

Jefes integrados:
1. Warden
2. Wither
3. Ravager
4. Zombie grande con cabeza de calabaza y equipo de hierro
5. Piglin Brute

```
/evento boss seleccionar <1-5>
/evento boss start
/evento boss stop
/evento boss crear <id>
/evento boss listar
/evento boss editar <id>
/evento boss invocar <id>
/evento boss eliminar <id>
```

Los jefes personalizados se guardan en `plugins/ApoloEvent/bosses/`. Pueden definir estadísticas, equipo, habilidades periódicas, fases por porcentaje de vida, ayudantes y reaparición. El archivo `example.yml` sirve como plantilla.

**Inventario:** el evento Boss no captura ni restaura el inventario. Al morir, el participante pierde sus objetos y queda fuera del evento.

### Bosses automáticos de minas

Se configuran en `mine-events.yml`. Admiten regiones, nombre de mina, anuncios, efectos, animaciones, guardianes y persistencia de bosses vivos en `mine-boss-state.yml` cuando está activada.

<a id="minigames"></a>
## MiniGames

El menú se abre con:
```
/evento minigames
```

El sistema permite preparar arenas base de Spleef, ColorMatch, Minefield y JumpRun. **Estado documentado:** todavía no tienen partidas jugables completas; por ahora está disponible la preparación y guardado de arenas/ubicaciones.

<a id="airdrop"></a>
## AirDrop

Entregas programadas mediante `airdrop.times` o manuales.

```
/airdrop spawn
/airdrop track
```

Incluye avisos previos, rarezas, caducidad, recompensas, holograma y seguimiento con brújula. Tiene ajustes específicos de aparición para Nether y End.

**Configuración:** `airdrop.yml`.

<a id="commands"></a>
## Comandos y permisos

Los comandos se separan por sistema. Los subcomandos de administración requieren evento.admin, apoloevent.admin o el permiso específico indicado.

### Consulta y participación

| Comando | Función |
|---|---|
| /evento | Abre el menú de eventos. |
| /evento help | Ayuda de jugador y, para staff, ayuda administrativa. |
| /evento list | Estado, participantes y límite de cada sesión. |
| /evento info <evento> | Estado y participantes de un evento. |
| /evento join <evento> | Participar en un evento compatible. |
| /evento leave | Abandonar el evento actual. |
| /eventostaff | Abrir el panel de staff. |
| /evento top | Abrir el menú de clasificaciones. |

### Ciclo de vida de eventos

~~~text
/evento start <evento>
/evento forcestart <evento>
/evento stop <evento>
/evento backroom start|forcestart|stop|join|leave
/evento caballos start|forcestart|stop|join|leave
/evento eclipse start|forcestart|stop|join|leave
/evento boss start|forcestart|stop
~~~

forcestart permite iniciar sin cumplir el mínimo de participantes. Los aliases de sesión para caballos incluyen horse y horserace; para Backroom, br.

### Preparación de mapas, spawns y checkpoints

~~~text
/evento setspawn <evento> <jugadores|staff|meta|spectator>
/evento setspawn boss jugadores
/evento setfinish <backroom|caballos> <pos1|pos2>
/evento setcheckpoint caballos <número>
/evento checkpointfin backroom <pos1|pos2>
/evento checkpointstart backroom
/evento setboss <1|2|3>
/evento map <evento> <enable|disable>
/evento map <backroom|caballos> setworld <mundo>
/evento map <backroom|caballos> clone <plantilla> <mundo-destino>
~~~

Las órdenes setspawn players de Backroom y caballos se pueden repetir para guardar varios puntos de aparición. Los checkpoints de caballos admiten IDs del 1 al 100. setboss guarda una de las tres ubicaciones del jefe; el spawn de participantes del Boss se establece con setspawn boss jugadores.

Para clonar, coloca el mundo completo, incluido level.dat, en plugins/ApoloEvent/templates/<nombre>/. La clonación no debe sobrescribir un mundo activo. Después revisa que las coordenadas configuradas correspondan al mundo destino.

### Anuncios programados

~~~text
/evento anuncio backroom <tiempo>
/evento anuncio caballos <tiempo>
~~~

El tiempo puede ser segundos (30s), minutos (10m), horas (2h), minutos como número o una hora HH:mm. El anuncio informa y cuenta hacia atrás, pero no inicia automáticamente el evento: el staff debe ejecutar /evento start <evento>.

### Boss integrado y jefes personalizados

~~~text
/evento boss seleccionar <1|2|3|4|5|random>
/evento boss start
/evento boss stop
/evento boss crear <id>
/evento boss listar
/evento boss editar <id>
/evento boss invocar <id>
/evento boss eliminar <id>
~~~

Tipos clásicos: 1 Warden, 2 Wither, 3 Ravager, 4 Zombie grande, 5 Piglin Brute. random selecciona uno de los cinco. crear copia bosses/example.yml; edita el archivo y ejecuta invocar <id>. El evento debe estar detenido antes de cambiar el Boss seleccionado o eliminar el Boss activo.

### Eclipse de Sangre

~~~text
/evento eclipse join
/evento eclipse leave
/evento eclipse start
/evento eclipse forcestart
/evento eclipse stop
/evento eclipse setspawn <jugadores|staff|meta|spectator>
~~~

El spawn se establece desde la ubicación actual del administrador. El evento utiliza las opciones de events/eclipse.yml y el mapa registrado en maps.yml.

### ColorMatch

Comandos de jugador:
~~~text
/evento colormatch help
/evento colormatch join
/evento colormatch leave
/evento colormatch status
/evento colormatch stats [jugador]
/evento colormatch top
/evento colormatch kits
/evento colormatch kit <id>
~~~

Preparación y administración:
~~~text
/evento colormatch enable|disable
/evento colormatch setlobby
/evento colormatch setup
/evento colormatch setupglass
/evento colormatch setupclay
/evento colormatch setupsmall
/evento colormatch setupsmallglass
/evento colormatch setupsmallclay
/evento colormatch pos1
/evento colormatch pos2
/evento colormatch build
/evento colormatch setminplayers <cantidad>
/evento colormatch setmaxplayers <cantidad>
/evento colormatch setrounds <cantidad>
/evento colormatch setcountdown <segundos>
/evento colormatch setroundtime <segundos>
/evento colormatch setbreak <segundos>
/evento colormatch setregionlimit <bloques>
/evento colormatch setreward [puesto|participacion] <cantidad>
/evento colormatch setmode <modo>
/evento colormatch setdifficulty <easy|normal|hard>
/evento colormatch start
/evento colormatch stop
/evento colormatch reload
/evento colormatch arena list
/evento colormatch arena save <nombre>
/evento colormatch arena load <nombre>
~~~

Los perfiles se guardan en events/colormatch-arenas/<nombre>.yml. El perfil guarda lobby, esquinas, modo, cantidad de jugadores, rondas, tiempos, tamaño de región y dificultad. Solo se pueden cambiar o cargar perfiles cuando no hay partida ni participantes. setreward <cantidad> modifica el dinero del ganador; setreward <2-100> <cantidad> define premio de puesto; setreward participacion <cantidad> define el premio de participación. También acepta ganador, winner o 1 para el primer puesto. El pago requiere Vault o una economía compatible.

### MiniGames

~~~text
/evento minigames
/evento minigames menu
/evento minigames setup <spleef|colormatch|minefield|jumprun>
/evento minigames setspawn <juego>
/evento minigames reload
~~~

El constructor actual acepta los cuatro tipos listados en setup. El menú también muestra otros módulos configurables, pero no debe interpretarse como confirmación de que todos tienen una partida completa implementada.

### AirDrop

~~~text
/airdrop help
/airdrop track
/airdrop locate
/airdrop start
/airdrop stop
/airdrop spawn
/airdrop reload
/airdrop validate
/airdrop list
/airdrop clear
/airdrop info
/airdrop rewards <rareza>
/airdrop edit <rareza>
~~~

track y locate son comandos de jugador. rewards y edit abren un inventario para editar los objetos de la rareza seleccionada; al cerrar, el contenido se guarda en airdrop-rewards.yml. Las operaciones administrativas requieren apoloevent.airdrop.admin.

### Tops, recarga, validación y textos

~~~text
/evento top
/evento top <horse|backroom|boss|mineboss> [all|week|month]
/evento reload
/evento validate
/evento textos estado
/evento textos restaurar <messages|boss|colormatch|airdrop> confirmar
~~~

Los tops soportan los períodos histórico all, semana week y mes month. validate revisa archivos y valores de configuración. textos estado informa del estado de actualización; restaurar vuelve a los textos predeterminados del archivo elegido y crea una copia de seguridad en backups/.

### Permisos

| Permiso | Uso |
|---|---|
| evento.admin, apoloevent.admin | Administración general. |
| apoloevent.cmd.start | Iniciar o forzar inicio. |
| apoloevent.cmd.stop | Detener eventos. |
| apoloevent.cmd.reload | Recargar y gestionar textos. |
| apoloevent.cmd.setup | Mapas, spawns, checkpoints y ubicaciones. |
| apoloevent.cmd.boss | Selección y gestión de Boss. |
| apoloevent.cmd.announce | Anuncios programados. |
| apoloevent.boss | Entrar al evento Boss. |
| apoloevent.join | Participar. |
| apoloevent.backroom, apoloevent.horse | Acceso específico a esas modalidades. |
| apoloevent.staff | Panel y acciones de staff. |
| apoloevent.spectator | Acceso de espectador. |
| apoloevent.top | Consultar clasificaciones. |
| apoloevent.bypass | Omitir restricciones compatibles con bypass. |
| apoloevent.colormatch.admin | Administración de ColorMatch. |
| apoloevent.airdrop.track | Seguimiento de AirDrop. |
| apoloevent.airdrop.admin | Administración de AirDrop. |

Los comandos de administrador aceptan evento.admin, apoloevent.admin o el nodo específico correspondiente.

<a id="variables"></a>
## Variables y placeholders

### PlaceholderAPI — tops de eventos

La expansión de tops usa el identificador apoloevent. Categorías admitidas: horse, backroom, boss, mineboss y el alias mine_boss.

| Patrón | Devuelve |
|---|---|
| %apoloevent_<categoria>_top_<1-10>_name% | Nombre del jugador en esa posición histórica. |
| %apoloevent_<categoria>_top_<1-10>_score% | Puntuación de esa posición histórica. |
| %apoloevent_<categoria>_<all|week|month>_top_<1-10>_name% | Nombre por período. |
| %apoloevent_<categoria>_<all|week|month>_top_<1-10>_score% | Puntuación por período. |
| %apoloevent_<categoria>_position% | Posición del jugador consultado en el histórico. |
| %apoloevent_<categoria>_score% | Puntuación histórica del jugador consultado. |
| %apoloevent_<categoria>_<all|week|month>_position% | Posición por período. |
| %apoloevent_<categoria>_<all|week|month>_score% | Puntuación por período. |

Las posiciones de top se limitan a 1–10. Si el jugador no tiene posición, la expansión devuelve -; si una posición del top no tiene datos, devuelve Sin datos para nombre y 0 para puntuación.

Ejemplos:
~~~text
%apoloevent_horse_top_1_name%
%apoloevent_backroom_week_top_3_score%
%apoloevent_boss_month_position%
%apoloevent_mineboss_score%
~~~

### PlaceholderAPI — AirDrop

El identificador de la expansión es apoloevent_airdrop.

| Placeholder | Significado |
|---|---|
| %apoloevent_airdrop_enabled% | Si el AirDrop está habilitado/ejecutándose. |
| %apoloevent_airdrop_world% | Mundo configurado. |
| %apoloevent_airdrop_timezone% | Zona horaria para los horarios. |
| %apoloevent_airdrop_max_radius% | Radio máximo de aparición. |
| %apoloevent_airdrop_min_radius% | Radio protegido alrededor del spawn. |
| %apoloevent_airdrop_times% | Horarios programados concatenados. |
| %apoloevent_airdrop_active_crates% | Crates que siguen activas. |
| %apoloevent_airdrop_last_timestamp% | Timestamp Unix de la última aparición. |
| %apoloevent_airdrop_last_x%, %apoloevent_airdrop_last_y%, %apoloevent_airdrop_last_z% | Coordenadas de la última aparición. |
| %apoloevent_airdrop_last_world% | Mundo de la última aparición. |
| %apoloevent_airdrop_last_tier% | Rareza de la última crate. |

### Variables en mensajes y anuncios

| Variable | Uso |
|---|---|
| {boss} | Nombre del Boss. |
| {mine} | Nombre visible de la mina. |
| {world} | Mundo del evento o aparición. |
| {x}, {y}, {z} | Coordenadas. |
| {minutes}, {time} | Minutos restantes y hora programada en el aviso previo de AirDrop. |
| {crate} | Rareza/tipo de crate en el aviso de desaparición. |
| {player}, {uuid}, {item}, {reward} | Datos de jugador/objeto/recompensa en mensajes o comandos de recompensa de Boss. |

Las variables entre llaves son tokens de texto de configuración; no son placeholders de PlaceholderAPI a menos que se encuentren dentro de un placeholder con formato %.

<a id="config"></a>
## Configuración

| Archivo | Función |
|---|---|
| `config.yml` | Opciones generales, integraciones y tops. |
| `messages.yml` | Mensajes y textos. |
| `inventario/*.yml` | Menús. |
| `events/backroom.yml` | Backroom y PvP. |
| `events/horse.yml` | Carrera de caballos. |
| `events/boss.yml` | Boss integrado. |
| `events/colormatch.yml` | ColorMatch. |
| `events/eclipse.yml` | Eclipse de Sangre. |
| `bosses/*.yml` | Bosses personalizados. |
| `mine-events.yml` | Bosses de minas. |
| `mine-boss-state.yml` | Persistencia de bosses. |
| `airdrop.yml` | Horarios y recompensas de AirDrop. |
| `recovery.yml` | Recuperación de datos. |
| `event-tops.db` | Datos SQLite de clasificaciones. |
| `audit.log` | Registro administrativo. |

### Integraciones

- **WorldGuard:** regiones del evento Boss; Backroom también debe permitir PvP en la región cuando lo requiera.
- **UltimateClans:** reglas de combate entre miembros y aliados en Backroom.
- **PlaceholderAPI:** variables para estadísticas y tops.
- **Vault:** recompensas monetarias cuando está configurado y hay proveedor de economía.

Los cambios de configuración deben probarse en una copia del servidor. La sintaxis y las opciones concretas pueden cambiar entre versiones.


<a id="yaml"></a>

### Ejemplo real: config.yml

Este bloque corresponde al archivo de recursos del repositorio. Cambia únicamente los valores que necesites; conserva la estructura y la indentación.

```yaml
language: es
version: 1
lobby:
  enabled: false
  world: world
  x: 0.5
  y: 80
  z: 0.5
  yaw: 0
  pitch: 0
defaults:
  max-players: 32
  countdown-seconds: 10
  min-players: 2
restore:
  return-to-previous-location: true
debug: false
integrations:
  ultimateclans:
    enabled: true
    same-clan: true
    allies: true
tops:
  rewards:
    weekly:
      enabled: false
      announcement: "&6[Tops] &eSe entregaron las recompensas semanales."
      commands:
        horse_wins:
          1: []
          2: []
          3: []
        backroom_wins:
          1: []
          2: []
          3: []
auto-update-texts: true
audit:
  enabled: true
```

**Cómo leerlo:** `defaults` define valores comunes para eventos; `lobby` configura el destino opcional; `restore` devuelve al jugador a su ubicación anterior; `integrations.ultimateclans` evita daño entre miembros/aliados cuando la integración está disponible; `tops.rewards.weekly` ejecuta comandos por posición al cambiar la semana; `auto-update-texts` actualiza textos predeterminados sin sobrescribir los que el administrador personalizó; `audit` registra acciones administrativas.

### Ejemplo real: events/backroom.yml

```yaml
pvp:
  enabled: false
  block-indirect-damage-when-disabled: true
elimination:
  void-and-death: true
  spectator-mode: true
countdown-seconds: 10
min-players: 2
max-players: 32
rewards:
  first:
    enabled: true
    commands: []
    experience: 100
    items: ['DIAMOND:3']
  second:
    enabled: true
    commands: []
    experience: 50
    items: ['GOLD_INGOT:5']
kit:
  helmet: LEATHER_HELMET
  chestplate: LEATHER_CHESTPLATE
  leggings: LEATHER_LEGGINGS
  boots: LEATHER_BOOTS
  sword: WOODEN_SWORD
  sword-slot: 0
abilities:
  goal-trail:
    enabled: true
    after-minutes: 20
    duration-seconds: 4
  items:
    cooldown-seconds: 30
    tracker:
      enabled: true
      material: COMPASS
      slot: 3
      cooldown-seconds: 50
      range: 32
```

**Cómo funciona:** `pvp.enabled` activa el combate; `elimination` decide eliminación y espectador; `min-players/max-players/countdown-seconds` controlan el inicio; `rewards` define premios por puesto; `kit` fija el equipo; `abilities` configura el rastro y objetos especiales. Las demás claves de este archivo (mensajes del menú, efectos y habilidades) se explican en la tabla de arriba.

## Archivos YAML — referencia de configuración

Ruta base: plugins/ApoloEvent/. Los archivos de esta página son recursos configurables del proyecto; no incluye plugin.yml. Haz una copia antes de editar. YAML depende de la indentación: usa espacios, no tabuladores.

### Configuración global y registro de eventos

| Archivo | Secciones y claves que debes conocer |
|---|---|
| config.yml | language define el idioma base de mensajes; lobby.enabled/world/x/y/z/yaw/pitch define el lobby opcional; defaults.max-players/countdown-seconds/min-players son valores por defecto para sesiones; restore.return-to-previous-location devuelve al jugador a su ubicación previa; debug activa diagnósticos; integrations.ultimateclans.enabled/same-clan/allies controla el friendly-fire entre miembros y aliados de clan en Backroom; tops.rewards.weekly.enabled/announcement/commands define premios y anuncio de los primeros tres puestos semanales por categoría; auto-update-texts permite añadir/actualizar textos no personalizados; audit.enabled registra acciones administrativas en audit.log. |
| events.yml | events.backroom, events.caballos y events.eclipse: enabled, max-players, min-players y map. Controla si cada sesión se ofrece y sus límites de participantes. |
| maps.yml | maps.<evento>.type/enabled/world registra el mapa. Spawns, puntos múltiples de jugador, meta, esquinas de meta, checkpoints y puntos específicos se guardan aquí al ejecutar comandos /evento set*. Las coordenadas deben pertenecer al mundo indicado. |
| messages.yml | prefix, mensajes generales, sección game, sección staff, líneas help-player y help-staff, textos de tops y anuncios. Los mensajes admiten códigos de color Bukkit con &; los tokens como {player} son reemplazos de cada mensaje. |
| legacy-texts.yml | Archivo interno que conserva valores antiguos para detectar textos sin personalizar durante la actualización. No editar manualmente. |

### Archivos por evento

| Archivo | Opciones configurables |
|---|---|
| events/backroom.yml | PvP: pvp.enabled y block-indirect-damage-when-disabled; eliminación y espectadores: elimination.void-and-death/spectator-mode; cuenta atrás, mínimo/máximo de jugadores y avisos; recompensas first/second/third.enabled/commands/experience/items; kit permite cambiar armadura, espada y slot; abilities.goal-trail define rastro de meta, espera, duración, espaciado y tamaño; abilities.items define cooldown y duración de efectos speed/strength y alcance, objetivos y revelado del tracker; winner-menu y spectator-items personalizan la GUI de salida/espectador. |
| events/horse.yml | max-players, min-players, countdown-seconds, race-timeout-seconds, allow-own-horses; horse.type/speed/jump-strength/max-health/color/style/saddle/remove-on-finish; checkpoints.enabled; recompensas first/second/third; items.speed-slot/stun-slot/speed-multiplier/cooldown-seconds; menú final y objetos de espectador. |
| events/eclipse.yml | enabled, max/min players, map, cuenta atrás; pvp.enabled; oleadas waves.enabled/interval-seconds/max-mobs/types; oscuridad darkness.enabled/time; kit inicial (armadura, espada, slot y comida); recompensas por puesto; habilidad abilities.tracker; winner-menu. |
| events/colormatch.yml | En settings: activar/desactivar, mínimos/máximos, rondas, cuenta atrás, duración de ronda y descanso, límite de región, bloques construidos por tick, dificultad, modo de arena, avisos, limpieza de efectos, efectos y kits seleccionables; sonidos y volumen/tono; pagos y comandos del ganador; recompensas por puestos/participación y mínimo de jugadores; lista allowed-commands. titles configura títulos/subtítulos y messages define los textos de juego. |
| events/boss.yml | max-players, duration-seconds, teleport-players-to-arena; region.enabled/world/id/check-interval-ticks registra participantes al entrar a WorldGuard; auto.enabled/interval-seconds programa apariciones; boss.selection elige tipo clásico, aleatorio o personalizado; boss.world/x/y/z/yaw/pitch configura coordenadas; bosses.<WARDEN|WITHER|RAVAGER|ZOMBIE|PIGLIN_BRUTE> permite ajustar nombre, vida, daño, casco, escala, armadura, arma, adornos y encantamientos; boss-kill-reward contiene chance general y tablas de objetos por tipo; además hay secciones para comandos, escalado de combate, agresividad, defensa, visuales, barra de Boss, ayudantes, fases, recompensas, mensajes y cinemática. Consulta los comentarios del propio archivo para los valores admitidos por cada acción. |

### Recompensas de Boss integrado

Dentro de events/boss.yml, boss-kill-reward.chance-percent es la probabilidad global de activar el sistema. bosses.<tipo>.item contiene los drops para ese tipo concreto: chance-percent, mensajes de drop/no-drop y una lista de objetos con material, cantidad, nombre, lore, trim y encantamientos. El código limita a un objeto por derrota y a una recompensa de comandos según la configuración. Los porcentajes individuales se interpretan como porcentaje, no como fracción decimal.

### Bosses personalizados

Los archivos están en bosses/; example.yml es la plantilla creada por /evento boss crear <id>.

| Clave | Qué controla |
|---|---|
| id | Identificador del archivo. |
| boss.entity/name/max-health/attack-damage | Tipo de entidad, nombre visible, vida y daño. |
| boss.helmet/scale/armor-material/weapon | Casco, tamaño, material de armadura y arma. |
| boss.armor-trim | Patrón template y material del adorno. |
| boss.armor-enchantments, boss.weapon-enchantments | Encantamientos por pieza o arma. |
| abilities.enabled, abilities.skills | Habilidades periódicas. La plantilla muestra acciones como partículas, sonido, efectos de poción cercanos, daño en área, rayo, explosión e invocación. Cada acción tiene parámetros propios. |
| phases[] | Fases activadas al cruzar health-percent; cada fase puede llevar mensaje y lista de acciones. |

Los archivos titan-apocalipsis.yml y creeper-infernal.yml muestran opciones adicionales de IA, velocidad, modo de selección de objetivo, reaparición y fases. No copies una sección de un jefe a otro sin verificar que el tipo de acción/entidad sea compatible.

### Minas y recompensas de bosses automáticos

| Archivo | Secciones y claves |
|---|---|
| mine-events.yml | Requiere WorldGuard. mine-events.enabled/scan-interval-ticks/resume-after-restart/regions controla el gestor y las regiones vigiladas; announcements.broadcast-enabled/message define el aviso; discord-webhook.enabled/url/username/avatar-url/message configura el webhook (mantén la URL privada); bosses.<id> permite habilitar cada jefe y fijar región, probabilidad, cooldown, duración, mundo/posición, tipo, nombre, vida, daño, agresividad, embestida, golpe asistido, defensa, escalado por tiempo/vida, nombre de mina, efectos, guardianes, armadura, animación, premios por daño y recompensa de otros participantes; time-rewards controla el premio por permanecer en la región; bounties controla recompensas por bajas/condición de activación y anti-farm. |
| mine-boss-kill.yml | Configura objetos adicionales por jefe de mina: mensajes de drop/no-drop, bosses.<id>.enabled, mine-name, chance-percent, lista items y dentro de cada objeto la probabilidad individual, material, cantidad, nombre, lore y encantamientos. El archivo se puede editar mientras el servidor está encendido. |
| bosses/*.yml | Definiciones YAML de jefes del evento Boss, no los bosses de minas. |

### AirDrop

| Archivo | Secciones y claves |
|---|---|
| airdrop.yml | airdrop.enabled/world/times controla activación, mundo y horarios; announce-before-minutes/message el aviso previo; timezone zona horaria; catch-up-minutes tolerancia tras lag/reinicio; despawn-minutes/announce caducidad; spawn.max-radius/min-radius-from-world-spawn/attempts/avoid-protected-regions/nether-min-y/retry-minutes/announce regula la búsqueda del punto; open-cooldown-seconds limita aperturas consecutivas; hologram.enabled/height/text, compass.enabled, fireworks.enabled/power/type/colors controlan la presentación; crates.<basic|rare|epic|legendary> permite habilitar cada rareza, nombre, bloque y peso relativo. |
| airdrop-rewards.yml | Archivo generado para el contenido de objetos de cada rareza. Se gestiona con /airdrop rewards <rareza> o /airdrop edit <rareza>; el inventario se guarda al cerrarlo, conservando metadatos y encantamientos. |

### Menús configurables

Los archivos bajo inventario/ controlan título, tamaño, slots, material, nombre y lore de botones.

| Archivo | Menú |
|---|---|
| inventario/evento.yml | Menú principal y accesos a Eclipse, Backroom, ColorMatch, Caballos y MiniGames. |
| inventario/eventostaff.yml | Botones del panel de administración para iniciar/detener modalidades. |
| inventario/backroom.yml | Menú informativo de Backroom. |
| inventario/caballos.yml | Menú informativo de Carrera de caballos. |
| inventario/colormatch.yml | Botones join, leave, status, stats y top de ColorMatch. |

### Archivos y datos generados durante el funcionamiento

Estos archivos no son plantillas de configuración equivalentes a los anteriores; el plugin los crea para guardar estados:

- mine-boss-state.yml: estado persistente de jefes de minas si resume-after-restart está activado.
- recovery.yml y colormatch-player-recovery.yml: datos de recuperación de jugadores.
- events/colormatch-arenas/<perfil>.yml: perfiles de arena guardados mediante /evento colormatch arena save.
- event-tops.db: base SQLite de clasificación.
- audit.log: auditoría de comandos administrativos.
- backups/: copias de seguridad de textos al restaurar o actualizar.

### Cómo aplicar cambios

- /evento reload: recarga configuración global, eventos, mapas, menús y textos. Un Boss ya activo aplica ciertos cambios en el siguiente inicio.
- /evento colormatch reload: vuelve a leer ColorMatch solo cuando no hay una partida activa.
- /airdrop reload: vuelve a leer la configuración de AirDrop.
- /evento validate y /airdrop validate: valida opciones antes de activar eventos.
- Cambiar coordenadas en juego con los comandos /evento set* es más seguro que introducir ubicaciones manualmente.
- Después de modificar configuraciones, revisa la consola y ejecuta pruebas en un mundo de ensayo antes de habilitar el mapa para jugadores.



## Contenido íntegro de configuración: archivos restantes

### `events/colormatch.yml`

Este bloque es el contenido del recurso del repositorio. Los comentarios YAML originales se conservan como guía. Ajusta los valores según las opciones documentadas en el propio archivo.

```yaml
# ColorMatch nativo para Paper 1.21.4 / Java 21.
# Configura lobby, marca pos1 y pos2 a la misma altura y ejecuta /evento colormatch setup.
# Arenas normales: hasta 32x32 (region-limit). Se pueden agrandar hasta 128x128; las grandes se construyen por partes.
# Los perfiles small usan un cuadrado central de 8x8; los demás usan el área seleccionada.
# Los bloques originales se restauran al finalizar o detener la partida.
settings:
  enabled: true # /evento colormatch enable|disable
  min-players: 2
  max-players: 16
  rounds: 10
  countdown-seconds: 15
  round-seconds: 5 # /evento colormatch setroundtime <2-60>
  break-seconds: 2 # /evento colormatch setbreak <0-30>
  region-limit: 32 # lado máximo de la arena en bloques (8-128); /evento colormatch setregionlimit <n>
  blocks-per-tick: 2048 # bloques que se construyen/rompen por tick; las arenas más grandes se reparten en varios ticks
  difficulty: normal # easy, normal, hard
  arena-mode: wool # wool, glass, clay, small, small_glass, small_clay
  announce-join-leave: true
  clear-effects: true
  # Efectos opcionales: TIPO:AMPLIFICADOR:DURACION_TICKS. Ejemplo: SPEED:0:1200
  kit-effects: []
  # Los estados de inventario se guardan en colormatch-player-recovery.yml para poder recuperarlos tras reinicios inesperados.
  # Clases seleccionables antes de entrar. Los efectos usan TIPO:AMPLIFICADOR:DURACION_TICKS.
  kits:
    normal:
      name: '&7Normal'
      effects: []
    runner:
      name: '&aCorredor'
      effects: ['SPEED:0:1200']
    jumper:
      name: '&bSaltador'
      effects: ['JUMP_BOOST:1:1200']
  # Sonidos Bukkit configurables. Usa NONE para desactivar uno.
  sound-volume: 1.0
  sound-pitch: 1.0
  sounds:
    join: ENTITY_EXPERIENCE_ORB_PICKUP
    leave: BLOCK_NOTE_BLOCK_BASS
    countdown: BLOCK_NOTE_BLOCK_PLING
    start: ENTITY_PLAYER_LEVELUP
    target: BLOCK_NOTE_BLOCK_PLING
    eliminated: ENTITY_ITEM_BREAK
    winner: UI_TOAST_CHALLENGE_COMPLETE
    end: BLOCK_ANVIL_LAND
  # Pago opcional mediante Vault o una economía compatible. 0 desactiva el pago directo.
  winner-money: 0.0
  # Comandos de consola al ganador. Placeholders: {player}, {uuid}, {place}
  winner-commands: []
  # Recompensas extra (además de winner-money / winner-commands, que son las del 1º).
  # places.<n>: premio del puesto n (2, 3, 4...). Para dar también un premio al 1º añade places.1.
  # participation: lo recibe quien jugó y no tiene premio de puesto.
  # money: pago por Vault. commands: comandos de consola con {player}, {uuid} y {place}.
  # min-players: mínimo de jugadores al empezar para entregar estas recompensas (evita regalar premios en partidas de 1).
  rewards:
    min-players: 2
    places:
      2:
        money: 0.0
        commands: []
      3:
        money: 0.0
        commands: []
    participation:
      money: 0.0
      commands: []
  # Comandos permitidos durante la partida (el resto se bloquea)
  allowed-commands:
    - /evento colormatch leave
    - /evento cm leave
# Títulos en pantalla (usa {seconds}, {round}, {color}, {player}). Pon enabled: false para desactivarlos.
titles:
  enabled: true
  countdown:
    title: '&e&l{seconds}'
    subtitle: '&7¡Prepárate!'
  round:
    title: '&d&lRonda {round}'
    subtitle: '&7Párate sobre {color}'
  winner:
    title: '&6&l★ VICTORIA ★'
    subtitle: '&e{player}'
messages:
  prefix: '&8[&d&lColorMatch&8] &r'
  join: '&a✔ Te uniste a &d&lColorMatch&a. &7Jugadores: &f{players}&7/&f{max}'
  join-broadcast: '&d{player} &7entró a ColorMatch &8(&f{players}&7/&f{max}&8)'
  leave-broadcast: '&d{player} &7salió de ColorMatch.'
  already-joined: '&c✖ Ya estás en la partida.'
  not-joined: '&c✖ No estás en ColorMatch.'
  need-arena: '&c✖ El administrador debe configurar y construir la arena de ColorMatch.'
  need-lobby: '&c✖ El lobby no está configurado. Un administrador debe usar &e/evento colormatch setlobby&c.'
  countdown: '&e» ColorMatch comienza en &f&l{seconds}&e segundos.'
  target: '&8» &eRonda &f{round}&7/&f{rounds} &8| &e¡Párate sobre: {color}&e!'
  eliminated: '&c✖ &f{player} &cquedó eliminado.'
  winner: '&6&l★ &e¡{player} ganó ColorMatch! &6&l★'
  no-winner: '&7La partida terminó sin ganador.'
  stopped: '&c✖ La partida de ColorMatch fue detenida.'
  disabled: '&c✖ ColorMatch está desactivado actualmente.'
  already-running: '&c✖ La partida ya comenzó. Espera a la siguiente.'
  full: '&c✖ La partida está llena. Máximo: &f{max}&c jugadores.'
  left: '&a✔ Saliste de ColorMatch.'
  command-blocked: '&c✖ No puedes usar ese comando durante ColorMatch.'
  kit-selected: '&a✔ Clase seleccionada: {kit}&a. Entra con &e/evento colormatch join&a.'
  kit-not-found: '&c✖ Esa clase no existe. Usa &e/evento colormatch kits&c.'
  kit-locked: '&c✖ Solo puedes cambiar de clase antes de entrar y mientras no haya una partida en curso.'
  kits-list: '&dClases disponibles: &f{kits}'
  spectator-bounds: '&7Como espectador no puedes alejarte de la arena.'
  money-reward: '&a✔ &f{player} &arecibió &6{amount} &apor ganar.'
# Estadísticas persistentes: events/colormatch-stats.yml

```

### `events/eclipse.yml`

Este bloque es el contenido del recurso del repositorio. Los comentarios YAML originales se conservan como guía. Ajusta los valores según las opciones documentadas en el propio archivo.

```yaml
# Evento Eclipse de Sangre — evento nocturno de supervivencia PvP.
# Los jugadores aparecen en una arena oscura, PvP activado, mobs aparecen en oleadas.
# Gana el último sobreviviente.
enabled: true
max-players: 24
min-players: 2
map: eclipse
countdown-seconds: 15
# PvP siempre activo en Eclipse
pvp:
  enabled: true
# Oleadas de mobs
waves:
  enabled: true
  interval-seconds: 45
  max-mobs: 8
  types: [ZOMBIE, SKELETON, CREEPER, SPIDER, ENDERMAN]
# Oscuridad (forzar noche en el mundo del mapa)
darkness:
  enabled: true
  time: 18000 # medianoche
# Kit inicial
kit:
  helmet: IRON_HELMET
  chestplate: IRON_CHESTPLATE
  leggings: IRON_LEGGINGS
  boots: IRON_BOOTS
  sword: IRON_SWORD
  sword-slot: 0
  food: 20
# Recompensas por puesto (el último en pie es el 1.º). Con enabled: false no se entrega nada.
rewards:
  first:
    enabled: true
    commands: []
    experience: 150
    items: ['DIAMOND:5']
  second:
    enabled: true
    commands: []
    experience: 75
    items: ['GOLD_INGOT:8']
  third:
    enabled: true
    commands: []
    experience: 40
    items: ['IRON_INGOT:8']
# Habilidades
abilities:
  tracker:
    enabled: true
    name: "&e&lRastreador de Eclipse"
    material: COMPASS
    slot: 7
    cooldown-seconds: 60
    range: 100
# Menú del ganador
winner-menu:
  title: "&5&l¡Has ganado el Eclipse!"
  exit:
    slot: 11
    name: "&cSalir del evento"
    material: BARRIER
  spectate:
    slot: 15
    name: "&aSeguir observando"
    material: COMPASS

```

### `events/horse.yml`

Este bloque es el contenido del recurso del repositorio. Los comentarios YAML originales se conservan como guía. Ajusta los valores según las opciones documentadas en el propio archivo.

```yaml
max-players: 16
min-players: 2
countdown-seconds: 5
race-timeout-seconds: 300
allow-own-horses: false
horse:
  type: HORSE
  speed: 0.225
  jump-strength: 0.0
  max-health: 30.0
  color: CHESTNUT
  style: NONE
  saddle: true
  remove-on-finish: true
checkpoints:
  enabled: false
rewards:
  first:
    enabled: true
    commands: []
    experience: 100
    items: ['DIAMOND:3']
  second:
    enabled: true
    commands: []
    experience: 50
    items: ['GOLD_INGOT:5']
  third:
    enabled: true
    commands: []
    experience: 25
    items: ['IRON_INGOT:5']

# Objetos especiales de la carrera
items:
  speed-slot: 0
  stun-slot: 1
  speed-multiplier: 2.2
  # Enfriamiento individual por objeto y jugador.
  cooldown-seconds: 20


# Menú para quienes cruzan la meta o quedan eliminados y pasan a espectador.
winner-menu:
  title: '&6&lCarrera de caballos: ¿Qué deseas hacer?'
  exit:
    material: RED_CONCRETE
    slot: 11
    name: '&c&lSalir del Evento'
    lore:
      - '&7Vuelve a tu ubicación anterior.'
      - '&ePulsa para salir.'
  spectate:
    material: BLUE_CONCRETE
    slot: 15
    name: '&9&lEspectear'
    lore:
      - '&7Observa el resto de la carrera.'
      - '&7Para salir del modo espectador:'
      - '&e/evento leave'
spectator-items:
  exit:
    material: BARRIER
    slot: 8
    name: '&cSalir del evento'
    lore:
      - '&7Para salir del modo espectador:'
      - '&e/evento leave'

```

### `inventario/backroom.yml`

Este bloque es el contenido del recurso del repositorio. Los comentarios YAML originales se conservan como guía. Ajusta los valores según las opciones documentadas en el propio archivo.

```yaml
size: 27
title: '&5&lBackroom'
items:
  info: {slot: 13, material: COMPASS, name: '&dInformación', lore: ['&7PvP configurable en events/backroom.yml']}

```

### `inventario/caballos.yml`

Este bloque es el contenido del recurso del repositorio. Los comentarios YAML originales se conservan como guía. Ajusta los valores según las opciones documentadas en el propio archivo.

```yaml
size: 27
title: '&6&lCarrera de Caballos'
items:
  info: {slot: 13, material: SADDLE, name: '&6Información', lore: ['&7Inscríbete y compite']}

```

### `inventario/colormatch.yml`

Este bloque es el contenido del recurso del repositorio. Los comentarios YAML originales se conservan como guía. Ajusta los valores según las opciones documentadas en el propio archivo.

```yaml
title: '&d&lColorMatch'
size: 27
items:
  join:
    slot: 11
    material: LIME_WOOL
    name: '&a&lEntrar a ColorMatch'
    lore: ['&7Salta al color correcto y sé', '&7el último jugador en pie.', '&eClic para entrar']
  leave:
    slot: 15
    material: RED_WOOL
    name: '&c&lSalir de ColorMatch'
    lore: ['&7Abandona la partida actual.']
  status:
    slot: 13
    material: BOOK
    name: '&e&lEstado de la partida'
    lore: ['&7Consulta el estado y la ronda actual.', '&eClic para ver el estado']
  stats:
    slot: 22
    material: PLAYER_HEAD
    name: '&b&lMis estadísticas'
    lore: ['&7Victorias, partidas y eliminaciones.', '&eClic para consultar']
  top:
    slot: 4
    material: GOLD_INGOT
    name: '&6&lTop de victorias'
    lore: ['&7Los mejores jugadores de ColorMatch.', '&eClic para ver el top']

```

