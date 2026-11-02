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



## Más archivos YAML: contenido del repositorio

### `inventario/evento.yml`

Contenido íntegro del archivo fuente (incluye comentarios originales):

```yaml
size: 5
title: '&5&lEventos'
items:
  eclipse:
    slot: 0
    material: ENDER_EYE
    name: '&4&lEclipse de Sangre'
    lore: ['&7Sobrevive a la noche y a los rivales.', '&7Estado: {state}', '&7Jugadores: {players}/{max}', '&eClic para entrar']
  backroom:
    slot: 1
    material: HONEY_BLOCK
    name: '&d&lBackroom'
    lore: ['&7Recorre los obstáculos.', '&7Estado: {state}', '&7Jugadores: {players}/{max}', '&eClic para entrar']
  colormatch:
    slot: 2
    material: LIME_WOOL
    name: '&d&lColorMatch'
    lore: ['&7¡Salta al color correcto!', '&7Estado: {state}', '&7Jugadores: {players}/{max}', '&eClic para entrar']
  caballos:
    slot: 3
    material: SADDLE
    name: '&6&lCarrera de Caballos'
    lore: ['&7Compite montando tu caballo.', '&7Estado: {state}', '&7Jugadores: {players}/{max}', '&eClic para entrar']
  minigames:
    slot: 4
    material: NETHER_STAR
    name: '&d&lMiniGames'
    lore: ['&7Minijuegos de fiesta.', '&7Spleef, ColorMatch y más.', '&eClic para abrir']

```

### `inventario/eventostaff.yml`

Contenido íntegro del archivo fuente (incluye comentarios originales):

```yaml
size: 27
title: '&4&lAdministración de eventos'
items:
  backroom: {slot: 11, material: HONEY_BLOCK, name: '&dBackroom', lore: ['&7Clic: iniciar/detener']}
  caballos: {slot: 15, material: SADDLE, name: '&6Carrera de Caballos', lore: ['&7Clic: iniciar/detener']}
  eclipse: {slot: 13, material: ENDER_EYE, name: '&4Eclipse de Sangre', lore: ['&7Clic: iniciar/detener']}

```

### `legacy-texts.yml`

Contenido íntegro del archivo fuente (incluye comentarios originales):

```yaml
# Textos que traían versiones anteriores del plugin. Solo se usa para saber si un texto sigue sin editar y puede
# actualizarse solo (ver ConfigUpdater). No lo edites.
entries:
- file: messages.yml
  key: prefix
  old:
  - '&8[&5ApoloEvent&8] '
- file: messages.yml
  key: no-permission
  old:
  - '&cNo tienes permiso para hacer eso.'
- file: messages.yml
  key: player-only
  old:
  - '&cEste comando solo puede usarlo un jugador.'
- file: messages.yml
  key: unknown-event
  old:
  - '&cEvento desconocido. Usa &e/evento list&c.'
- file: messages.yml
  key: already-active
  old:
  - '&cEse evento ya está activo.'
- file: messages.yml
  key: not-active
  old:
  - '&cEse evento no está activo.'
- file: messages.yml
  key: joined
  old:
  - '&aTe has inscrito en &d{event}&a.'
- file: messages.yml
  key: left
  old:
  - '&eHas salido del evento.'
- file: messages.yml
  key: started
  old:
  - '&aEl evento &d{event} &aha comenzado.'
- file: messages.yml
  key: stopped
  old:
  - '&cEl evento &d{event} &cse ha detenido.'
- file: messages.yml
  key: not-joinable
  old:
  - '&cEste evento no acepta participantes ahora.'
- file: messages.yml
  key: no-map
  old:
  - '&cNo hay un mapa válido configurado para este evento.'
- file: messages.yml
  key: pvp-enabled
  old:
  - '&cEl PvP de Backroom está activado.'
- file: messages.yml
  key: pvp-disabled
  old:
  - '&aEl PvP de Backroom está desactivado.'
- file: messages.yml
  key: winner
  old:
  - '&6¡{position} lugar: &e{player}&6!'
- file: messages.yml
  key: eliminated
  old:
  - '&c{player} ha sido eliminado de Backroom.'
- file: messages.yml
  key: restored
  old:
  - '&aTu estado original ha sido restaurado.'
- file: messages.yml
  key: leave-tip
  old:
  - '&e¿Quieres salir del evento? Escribe &c/evento leave&e para abandonar la partida.'
- file: messages.yml
  key: event-selected-announcement
  old:
  - '&5&l✦ APOLOEVENT ✦

    &e¡Se ha elegido el evento &d{event}&e!

    &f¡Prepárate y participa con los demás jugadores!

    &aUsa &e{command} &apara unirte.

    '
- file: messages.yml
  key: event-start-announcement
  old:
  - '&5&l✦ APOLOEVENT ✦

    &e¡El evento &d{event} &eha comenzado!

    &fConsulta cómo participar y únete a la actividad.

    &aUsa &e{command} &apara consultar cómo participar.

    '
- file: messages.yml
  key: event-announcement
  old:
  - '&5&lEvento &8- &d&l{event}

    &eEl evento iniciará en &6{time}&e.

    &f¡Prepárate y únete para participar!

    &aUsa &e/evento &ay toca en donde dice &d{menu-name}&a.

    '
- file: messages.yml
  key: event-countdown
  old:
  - '&6¡{event} comienza en &c{seconds}&6 segundo(s)!'
- file: messages.yml
  key: event-announcement-due
  old:
  - '&a¡Llegó la hora anunciada para {event}! &eEl staff debe iniciar el evento manualmente con &c{command}&e.'
- file: messages.yml
  key: prefixnot_joinable
  old:
  - '&cEste evento no acepta participantes ahora.'
- file: messages.yml
  key: prefixJoined
  old:
  - '&aTe has inscrito correctamente en el evento.'
- file: messages.yml
  key: prefixleave-tip
  old:
  - '&ePara salir del evento escribe &c/evento leave&e.'
- file: messages.yml
  key: game.already-linked
  old:
  - '&cYa estás vinculado a un evento.'
- file: messages.yml
  key: game.backroom-wait
  old:
  - '&7Puedes seguir en tu base. El staff te llevará al mapa cuando inicie Backroom.'
- file: messages.yml
  key: game.no-valid-spawn
  old:
  - '&cNo hay un spawn válido configurado para este evento.'
- file: messages.yml
  key: game.ability-cooldown
  old:
  - '&cPodrás usar esa habilidad en {seconds} segundos.'
- file: messages.yml
  key: game.tracker-none
  old:
  - '&eNo hay jugadores del evento dentro de {range} bloques.'
- file: messages.yml
  key: game.tracker-result
  old:
  - '&6Rastreador: &e{player} &7está a {distance} bloques.'
- file: messages.yml
  key: game.ability-tracker
  old:
  - '&a¡Rastreador activado! &7Enfriamiento: {cooldown} s.'
- file: messages.yml
  key: game.ability-speed
  old:
  - '&a¡Velocidad activada! &7Enfriamiento: {cooldown} s.'
- file: messages.yml
  key: game.ability-strength
  old:
  - '&a¡Fuerza activada! &7Enfriamiento: {cooldown} s.'
- file: messages.yml
  key: game.backroom-last-survivor
  old:
  - '&6¡VICTORIA! {player} es el último superviviente de Backroom y gana el primer lugar.'
- file: messages.yml
  key: game.victory-title
  old:
  - '&6¡VICTORIA!'
- file: messages.yml
  key: game.backroom-spectator
  old:
  - '&dEstás en modo espectador de Backroom. Escribe &e/evento leave&d para salir y volver a tu ubicación anterior.'
- file: messages.yml
  key: game.horse-spectator
  old:
  - '&6Estás en modo espectador de la Carrera de Caballos. Escribe &e/evento leave&6 para salir y volver a tu ubicación anterior.'
- file: messages.yml
  key: game.min-players
  old:
  - '&cSe necesitan al menos {min} jugadores.'
- file: messages.yml
  key: game.backroom-teleported
  old:
  - '&dHas sido llevado al mapa de Backroom. No podrás moverte ni atacar hasta que termine la cuenta atrás.'
- file: messages.yml
  key: game.horse-timeout
  old:
  - '&cLa carrera de caballos terminó por tiempo límite.'
- file: messages.yml
  key: game.go-title
  old:
  - '&a¡YA!'
- file: messages.yml
  key: game.boss-death
  old:
  - '&cHas muerto durante el evento Boss. Tu inventario se ha perdido y no será restaurado.'
- file: messages.yml
  key: game.horse-eliminated
  old:
  - '&c{player} queda eliminado de la Carrera de Caballos (puesto {place}).'
- file: messages.yml
  key: game.backroom-eliminated
  old:
  - '&c{player} queda en el puesto {place} de Backroom.'
- file: messages.yml
  key: game.checkpoint-done
  old:
  - '&aCheckpoint {current}/{total} completado.'
- file: messages.yml
  key: game.checkpoints-required
  old:
  - '&cDebes completar todos los checkpoints antes de cruzar la meta.'
- file: messages.yml
  key: game.backroom-checkpoint
  old:
  - '&dCheckpoint completado. ¡Ahora busca la meta final!'
- file: messages.yml
  key: game.place-broadcast
  old:
  - '&6¡VICTORIA! {player} — {place}.'
- file: messages.yml
  key: game.place-reward
  old:
  - '&aRecompensa de posición {place} entregada.'
- file: messages.yml
  key: game.countdown-cancelled
  old:
  - '&cCuenta atrás cancelada: no quedan suficientes jugadores.'
- file: messages.yml
  key: game.boss-not-active
  old:
  - '&cEl evento Boss no está activo. Espera el próximo anuncio.'
- file: messages.yml
  key: game.boss-enter-region
  old:
  - '&ePara participar, entra en la región WorldGuard configurada para el evento Boss.'
- file: messages.yml
  key: game.already-linked-other
  old:
  - '&cYa estás vinculado a otro evento.'
- file: messages.yml
  key: game.boss-full
  old:
  - '&cEl evento Boss está lleno.'
- file: messages.yml
  key: game.boss-left-region
  old:
  - '&7Saliste de la región del evento Boss y dejaste de participar.'
- file: messages.yml
  key: game.boss-round
  old:
  - '&4[Boss] &eEl Boss de esta ronda será &6{boss}&e.'
- file: messages.yml
  key: game.boss-timeout
  old:
  - '&cEl evento Boss terminó por tiempo. No hubo ganador.'
- file: messages.yml
  key: game.boss-stopped
  old:
  - '&cEl evento Boss fue detenido por un administrador.'
- file: messages.yml
  key: game.boss-respawn-failed
  old:
  - '&cEl Boss no pudo reaparecer; el evento termina sin ganador.'
- file: messages.yml
  key: game.boss-stage-1
  old:
  - '&e¡El Boss se está enfureciendo con el paso del tiempo!'
- file: messages.yml
  key: game.boss-stage-2
  old:
  - '&6¡El Boss está herido y se vuelve más agresivo!'
- file: messages.yml
  key: game.boss-stage-3
  old:
  - '&4&l¡FASE FINAL! ¡El Boss desata toda su furia!'
- file: messages.yml
  key: game.item-cooldown
  old:
  - '&cEse objeto estará disponible en {seconds} segundos.'
- file: messages.yml
  key: game.horse-not-found
  old:
  - '&cNo se encontró tu caballo de carrera.'
- file: messages.yml
  key: game.horse-boost
  old:
  - '&a¡Impulso activado! Podrás volver a usarlo en {seconds} segundos.'
- file: messages.yml
  key: game.horse-no-rivals
  old:
  - '&cNo hay rivales disponibles para alcanzar.'
- file: messages.yml
  key: game.horse-rival-not-found
  old:
  - '&cNo se encontró el caballo del rival.'
- file: messages.yml
  key: game.horse-frozen-title
  old:
  - '&b¡CONGELADO!'
- file: messages.yml
  key: game.horse-froze
  old:
  - '&aCongelaste a {player} por 5 segundos. Podrás volver a usar el hielo en {seconds} segundos.'
- file: messages.yml
  key: help-player
  old:
  - - '&5&l━━━━━━━━━━ ApoloEvent {version} ━━━━━━━━━━'
    - '&7Eventos: &dBackroom, Carrera de Caballos y Boss'
    - ''
    - '&a&l✦ COMANDOS PARA JUGADORES'
    - '&e/evento &7— Abrir el menú de eventos'
    - '&e/evento list &7— Ver los eventos y su estado'
    - '&e/evento info <evento> &7— Consultar el estado de un evento'
    - '&e/evento join <evento> &7— Entrar a un evento'
    - '&e/evento backroom join &7— Entrar a Backroom'
    - '&e/evento caballos join &7— Entrar a la carrera de caballos'
    - '&e/evento leave &7— Salir del evento actual'
    - '&e/evento top &7— Ver los tops de eventos (menú)'
    - '&e/evento top <horse|backroom|boss|mineboss> [all|week|month] &7— Top 10 en el chat'
    - '&e/evento help &7— Mostrar esta ayuda'
    - ''
    - '&7Usa &e/evento list &7para consultar los eventos disponibles.'
    - '&5&l━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  - - '&5&l━━━━━━━━━━ ApoloEvent {version} ━━━━━━━━━━'
    - '&7Eventos: &dBackroom, Carrera de Caballos y Boss'
    - ''
    - '&a&l✦ COMANDOS PARA JUGADORES'
    - '&e/evento &7— Abrir el menú de eventos'
    - '&e/evento list &7— Ver los eventos y su estado'
    - '&e/evento info <evento> &7— Consultar el estado de un evento'
    - '&e/evento join <evento> &7— Entrar a un evento'
    - '&e/evento backroom join &7— Entrar a Backroom'
    - '&e/evento caballos join &7— Entrar a la carrera de caballos'
    - '&e/evento leave &7— Salir del evento actual'
    - '&e/evento help &7— Mostrar esta ayuda'
    - ''
    - '&7Usa &e/evento list &7para consultar los eventos disponibles.'
    - '&5&l━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
- file: messages.yml
  key: help-staff
  old:
  - - '&c&l✦ STAFF: EVENTOS Y MAPAS'
    - '&e/eventostaff &7— Abrir el panel de staff'
    - '&e/evento start <evento> &7— Iniciar un evento'
    - '&e/evento forcestart <evento> &7— Forzar el inicio (ignora el mínimo de jugadores)'
    - '&e/evento stop <evento> &7— Detener un evento'
    - '&e/evento anuncio <caballos|backroom> <tiempo> &7— Programar un anuncio'
    - '&8  Tiempo: 10 (minutos), 30s, 10m, 2h o HH:mm; no inicia el evento.'
    - '&e/evento setspawn <evento> <jugadores|staff|meta|spectator> &7— Configurar spawns'
    - '&8  En Backroom, repite &e/evento setspawn backroom jugadores &8para agregar varios puntos.'
    - '&e/evento setfinish <evento> <pos1|pos2> &7— Marcar la meta final'
    - '&e/evento checkpointfin backroom <pos1|pos2> &7— Definir la zona final del checkpoint'
    - '&e/evento checkpointstart backroom &7— Guardar el punto de regreso tras el checkpoint'
    - '&e/evento setcheckpoint caballos <número> &7— Añadir un checkpoint de caballos'
    - '&e/evento map <backroom|caballos> <enable|disable> &7— Activar/desactivar mapa'
    - '&e/evento map <backroom|caballos> setworld <mundo> &7— Asignar el mundo del mapa'
    - '&e/evento map <evento> clone <plantilla> <mundo> &7— Clonar un mundo plantilla'
    - '&e/evento reload &7— Recargar configuraciones, mensajes y eventos de minas'
    - '&e/evento validate &7— Revisar mapas, mundos, regiones WorldGuard, bosses y minas'
    - '&8  Permisos: apoloevent.admin o por acción: apoloevent.cmd.start|stop|reload|setup|boss|announce'
    - '&8  Las acciones administrativas quedan registradas en plugins/ApoloEvent/audit.log'
    - ''
    - '&c&l✦ STAFF: EVENTO BOSS'
    - '&e/evento boss start|stop &7— Iniciar/detener el evento Boss'
    - '&e/evento boss seleccionar <1-5|random> &7— Elegir un Boss integrado o volver al aleatorio'
    - '&8  1 Warden | 2 Wither | 3 Ravager | 4 Zombie | 5 Piglin Brute'
    - '&e/evento boss crear <id> &7— Crear un Boss personalizado'
    - '&e/evento boss listar &7— Listar Bosses personalizados'
    - '&e/evento boss editar <id> &7— Mostrar la ruta YAML de configuración'
    - '&e/evento boss invocar <id> &7— Seleccionar un Boss personalizado'
    - '&e/evento boss eliminar <id> &7— Eliminar el archivo YAML del Boss'
    - '&8  Archivos: plugins/ApoloEvent/bosses/<id>.yml'
    - '&8  Edita entidad, nombre, vida, daño, tamaño, casco, armadura, arma y habilidades.'
    - '&8  Usa /evento setspawn boss jugadores para definir el spawn del evento Boss.'
  - - '&c&l✦ STAFF: EVENTOS Y MAPAS'
    - '&e/eventostaff &7— Abrir el panel de staff'
    - '&e/evento start <evento> &7— Iniciar un evento'
    - '&e/evento forcestart <evento> &7— Forzar el inicio (ignora el mínimo de jugadores)'
    - '&e/evento stop <evento> &7— Detener un evento'
    - '&e/evento anuncio <caballos|backroom> <tiempo> &7— Programar un anuncio'
    - '&8  Tiempo: 10 (minutos), 30s, 10m, 2h o HH:mm; no inicia el evento.'
    - '&e/evento setspawn <evento> <jugadores|staff|meta|spectator> &7— Configurar spawns'
    - '&8  En Backroom, repite &e/evento setspawn backroom jugadores &8para agregar varios puntos.'
    - '&e/evento setfinish <evento> <pos1|pos2> &7— Marcar la meta final'
    - '&e/evento checkpointfin backroom <pos1|pos2> &7— Definir la zona final del checkpoint'
    - '&e/evento checkpointstart backroom &7— Guardar el punto de regreso tras el checkpoint'
    - '&e/evento setcheckpoint caballos <número> &7— Añadir un checkpoint de caballos'
    - '&e/evento map <backroom|caballos> <enable|disable> &7— Activar/desactivar mapa'
    - '&e/evento map <backroom|caballos> setworld <mundo> &7— Asignar el mundo del mapa'
    - '&e/evento map <evento> clone <plantilla> <mundo> &7— Clonar un mundo plantilla'
    - '&e/evento reload &7— Recargar configuraciones, mensajes y eventos de minas'
    - '&8  Permisos: apoloevent.admin o por acción: apoloevent.cmd.start|stop|reload|setup|boss|announce'
    - '&8  Las acciones administrativas quedan registradas en plugins/ApoloEvent/audit.log'
    - ''
    - '&c&l✦ STAFF: EVENTO BOSS'
    - '&e/evento boss start|stop &7— Iniciar/detener el evento Boss'
    - '&e/evento boss seleccionar <1-5|random> &7— Elegir un Boss integrado o volver al aleatorio'
    - '&8  1 Warden | 2 Wither | 3 Ravager | 4 Zombie | 5 Piglin Brute'
    - '&e/evento boss crear <id> &7— Crear un Boss personalizado'
    - '&e/evento boss listar &7— Listar Bosses personalizados'
    - '&e/evento boss editar <id> &7— Mostrar la ruta YAML de configuración'
    - '&e/evento boss invocar <id> &7— Seleccionar un Boss personalizado'
    - '&e/evento boss eliminar <id> &7— Eliminar el archivo YAML del Boss'
    - '&8  Archivos: plugins/ApoloEvent/bosses/<id>.yml'
    - '&8  Edita entidad, nombre, vida, daño, tamaño, casco, armadura, arma y habilidades.'
    - '&8  Usa /evento setspawn boss jugadores para definir el spawn del evento Boss.'
  - - '&c&l✦ STAFF: EVENTOS Y MAPAS'
    - '&e/eventostaff &7— Abrir el panel de staff'
    - '&e/evento start <evento> &7— Iniciar un evento'
    - '&e/evento forcestart <evento> &7— Forzar el inicio'
    - '&e/evento stop <evento> &7— Detener un evento'
    - '&e/evento anuncio <caballos|backroom> <tiempo> &7— Programar un anuncio'
    - '&8  Tiempo: 10 (minutos), 30s, 10m, 2h o HH:mm; no inicia el evento.'
    - '&e/evento setspawn <evento> <jugadores|staff|meta|spectator> &7— Configurar spawns'
    - '&8  En Backroom, repite &e/evento setspawn backroom jugadores &8para agregar varios puntos.'
    - '&e/evento setfinish <evento> <pos1|pos2> &7— Marcar la meta final'
    - '&e/evento checkpointfin backroom <pos1|pos2> &7— Definir la zona final del checkpoint'
    - '&e/evento checkpointstart backroom &7— Guardar el punto de regreso tras el checkpoint'
    - '&e/evento setcheckpoint caballos <número> &7— Añadir un checkpoint de caballos'
    - '&e/evento map <backroom|caballos> <enable|disable> &7— Activar/desactivar mapa'
    - '&e/evento map <backroom|caballos> setworld <mundo> &7— Asignar el mundo del mapa'
    - '&e/evento map <evento> clone <plantilla> <mundo> &7— Clonar un mundo plantilla'
    - '&e/evento reload &7— Recargar configuraciones y mensajes'
    - ''
    - '&c&l✦ STAFF: EVENTO BOSS'
    - '&e/evento boss start|stop &7— Iniciar/detener el evento Boss'
    - '&e/evento boss seleccionar <1-5> &7— Elegir un Boss integrado'
    - '&8  1 Warden | 2 Wither | 3 Ravager | 4 Zombie | 5 Piglin Brute'
    - '&e/evento boss crear <id> &7— Crear un Boss personalizado'
    - '&e/evento boss listar &7— Listar Bosses personalizados'
    - '&e/evento boss editar <id> &7— Mostrar la ruta YAML de configuración'
    - '&e/evento boss invocar <id> &7— Seleccionar un Boss personalizado'
    - '&e/evento boss eliminar <id> &7— Eliminar el archivo YAML del Boss'
    - '&8  Archivos: plugins/ApoloEvent/bosses/<id>.yml'
    - '&8  Edita entidad, nombre, vida, daño, tamaño, casco, armadura, arma y habilidades.'
    - '&8  Usa /evento setspawn boss jugadores para definir el spawn del evento Boss.'
- file: events/boss.yml
  key: messages.title
  old:
  - '&c&l¡EL EVENTO BOSS COMENZÓ!'
- file: events/boss.yml
  key: messages.subtitle
  old:
  - '&eEntra en la región WorldGuard para luchar'
- file: events/boss.yml
  key: messages.chat
  old:
  - '&8[&cBoss&8] &e¡El evento Boss comenzó! Entra en la región de combate para participar.'
- file: events/boss.yml
  key: messages.joined
  old:
  - '&aTe uniste al evento Boss. ¡Derrota al jefe para ganar!'
- file: events/boss.yml
  key: messages.winner-title
  old:
  - '&6&l¡VICTORIA!'
- file: events/boss.yml
  key: messages.winner-subtitle
  old:
  - '&e{player} derrotó al Boss'
- file: events/boss.yml
  key: messages.winner-chat
  old:
  - '&6¡{player} derrotó al Boss y ganó la recompensa!'
- file: events/boss.yml
  key: messages.no-winner
  old:
  - '&cEl evento Boss terminó sin ganador.'
- file: events/boss.yml
  key: messages.reward
  old:
  - '&aHas derrotado al Boss y recibido la recompensa.'
- file: events/colormatch.yml
  key: messages.prefix
  old:
  - '&8[&dColorMatch&8] '
- file: events/colormatch.yml
  key: messages.join
  old:
  - '&aTe uniste a ColorMatch. Jugadores: &f{players}&7/&f{max}'
- file: events/colormatch.yml
  key: messages.join-broadcast
  old:
  - '&e{player} entró a ColorMatch. (&f{players}&7/&f{max}&e)'
- file: events/colormatch.yml
  key: messages.leave-broadcast
  old:
  - '&e{player} salió de ColorMatch.'
- file: events/colormatch.yml
  key: messages.already-joined
  old:
  - '&cYa estás en la partida.'
- file: events/colormatch.yml
  key: messages.not-joined
  old:
  - '&cNo estás en ColorMatch.'
- file: events/colormatch.yml
  key: messages.need-arena
  old:
  - '&cEl administrador debe configurar y construir la arena de ColorMatch.'
- file: events/colormatch.yml
  key: messages.need-lobby
  old:
  - '&cEl lobby no está configurado. Usa /evento colormatch setlobby.'
  - '&cEl lobby no está configurado. Un administrador debe usar /evento colormatch setlobby.'
- file: events/colormatch.yml
  key: messages.countdown
  old:
  - '&eColorMatch comienza en &f{seconds}&e segundos.'
- file: events/colormatch.yml
  key: messages.target
  old:
  - '&eRonda &f{round}&7/&f{rounds} &8| &e¡Párate sobre: {color}&e!'
- file: events/colormatch.yml
  key: messages.eliminated
  old:
  - '&c{player} quedó eliminado.'
- file: events/colormatch.yml
  key: messages.winner
  old:
  - '&6¡{player} ganó ColorMatch!'
- file: events/colormatch.yml
  key: messages.stopped
  old:
  - '&cLa partida ColorMatch fue detenida.'
- file: events/colormatch.yml
  key: messages.disabled
  old:
  - '&cColorMatch está desactivado actualmente.'
- file: events/colormatch.yml
  key: messages.already-running
  old:
  - '&cLa partida ya comenzó. Espera a la siguiente.'
- file: events/colormatch.yml
  key: messages.full
  old:
  - '&cLa partida está llena. Máximo: {max} jugadores.'
- file: events/colormatch.yml
  key: messages.left
  old:
  - '&aSaliste de ColorMatch.'
- file: events/colormatch.yml
  key: messages.command-blocked
  old:
  - '&cNo puedes usar ese comando durante ColorMatch.'
- file: events/colormatch.yml
  key: messages.kit-selected
  old:
  - '&aClase seleccionada: {kit}&a. Entra con /evento colormatch join.'
- file: events/colormatch.yml
  key: messages.kit-not-found
  old:
  - '&cEsa clase no existe. Usa /evento colormatch kits.'
- file: events/colormatch.yml
  key: messages.kit-locked
  old:
  - '&cSolo puedes cambiar de clase antes de entrar y mientras no haya una partida en curso.'
- file: events/colormatch.yml
  key: messages.kits-list
  old:
  - '&eClases disponibles: {kits}'
- file: events/colormatch.yml
  key: messages.money-reward
  old:
  - '&a{player} recibió {amount} por ganar.'
- file: airdrop.yml
  key: airdrop.announce-before-message
  old:
  - '&8[&6AirDrop&8] &e¡Un airdrop llegará en &c{minutes} minutos&e! Hora: &b{time}&e. Coordenadas: &b{x}&7, &b{y}&7, &b{z}&e en &b{world}&e.'
  - '&8[&6AirDrop&8] &e¡Un airdrop llegará en &c{minutes} minutos&e! Hora programada: &b{time}&e.'
- file: airdrop.yml
  key: airdrop.despawn-announce
  old:
  - '&8[&6AirDrop&8] &7Nadie abrió la crate &e{crate}&7 de &b{x}&7, &b{y}&7, &b{z}&7 y desapareció.'
- file: airdrop.yml
  key: airdrop.spawn.announce
  old:
  - '&8[&6AirDrop&8] &e¡Un airdrop apareció en &b{x}&7, &b{y}&7, &b{z}&e!'

```

### `maps.yml`

Contenido íntegro del archivo fuente (incluye comentarios originales):

```yaml
# Modalidad inicial: mundos preparados. Las coordenadas deben pertenecer al mundo indicado.
# Los puntos (spawns, meta, checkpoints) se configuran con los comandos /evento set*; no se incluyen
# valores de ejemplo aquí porque ApoloEvent añade las claves que falten al iniciar y al recargar.
maps:
  backroom:
    type: backroom
    enabled: false
    world: world_backroom
  caballos:
    type: caballos
    enabled: false
    world: world_caballos
  eclipse:
    type: eclipse
    enabled: false
    world: world_eclipse

```

### `messages.yml`

Contenido íntegro del archivo fuente (incluye comentarios originales):

```yaml
prefix: "&8[&5&l✦ ApoloEvent&8] &r"
no-permission: "&c✖ No tienes permiso para hacer eso."
player-only: "&c✖ Este comando solo puede usarlo un jugador."
unknown-event: "&c✖ Evento desconocido. Usa &e/evento list&c."
already-active: "&c✖ Ese evento ya está activo."
not-active: "&c✖ Ese evento no está activo."
joined: "&a✔ Te has inscrito en &d&l{event}&a."
left: "&e» Has salido del evento."
started: "&a✔ El evento &d&l{event} &aha comenzado."
stopped: "&c✖ El evento &d{event} &cse ha detenido."
not-joinable: "&c✖ Este evento no acepta participantes ahora."
no-map: "&c✖ No hay un mapa válido configurado para este evento."
pvp-enabled: "&c» El PvP de Backroom está &lactivado&c."
pvp-disabled: "&a» El PvP de Backroom está &ldesactivado&a."
winner: "&6&l★ &6¡{position} lugar: &e&l{player}&6! &6&l★"
eliminated: "&c✖ &f{player} &cha sido eliminado de Backroom."
restored: "&a✔ Tu estado original ha sido restaurado."
help: "&7Usa &e/evento help &7para ver los comandos disponibles."

leave-tip: "&e» ¿Quieres salir del evento? Escribe &c/evento leave&e para abandonar la partida."

# Anuncio global cuando se selecciona un Boss clásico o personalizado.
# Placeholders: {event}, {command}.
event-selected-announcement: |
  &5&l✦━━━━━━ APOLOEVENT ━━━━━━✦
  &e¡Se ha elegido el evento &d&l{event}&e!
  &f¡Prepárate y participa con los demás jugadores!
  &a➜ Usa &e{command} &apara unirte.
  &5&l✦━━━━━━━━━━━━━━━━━━━━━━✦

# Anuncio global cuando comienza Backroom o la carrera de caballos.
# Placeholders: {event}, {command}.
event-start-announcement: |
  &5&l✦━━━━━━ APOLOEVENT ━━━━━━✦
  &e¡El evento &d&l{event} &eha comenzado!
  &fConsulta cómo participar y únete a la actividad.
  &a➜ Usa &e{command} &apara consultar cómo participar.
  &5&l✦━━━━━━━━━━━━━━━━━━━━━━✦

# Anuncios programados de Backroom y carrera de caballos (solo anuncian; no inician el evento)
event-announcement: |
  &5&l✦━━━━━━ EVENTO ━━━━━━✦
  &d&l{event}
  &eEl evento iniciará en &6&l{time}&e.
  &f¡Prepárate y únete para participar!
  &a➜ Usa &e/evento &ay toca en donde dice &d{menu-name}&a.
  &5&l✦━━━━━━━━━━━━━━━━━━━━━━✦
event-countdown: "&6&l» &6¡&e&l{event} &6comienza en &c&l{seconds}&6 segundo(s)!"
event-announcement-due: "&a✔ ¡Llegó la hora anunciada para &d{event}&a! &eEl staff debe iniciar el evento manualmente con &c{command}&e."

# Claves compatibles para mensajes de estados de inscripción
prefixnot_joinable: "&c✖ Este evento no acepta participantes ahora."
prefixJoined: "&a✔ Te has inscrito correctamente en el evento."
prefixleave-tip: "&e» Para salir del evento escribe &c/evento leave&e."

# Ayuda de /evento help: edita estas listas para cambiar el texto del chat.
# Puedes agregar, quitar o reordenar líneas. Colores con &, "" crea una línea vacía.
# Placeholder disponible: {version}. help-player es visible para todos.
# help-staff solo se muestra a apoloevent.staff, evento.admin o apoloevent.admin.
help-player:
  - "&5&l━━━━━━━━━━ ApoloEvent {version} ━━━━━━━━━━"
  - "&7Eventos: &dBackroom, Carrera de Caballos y Boss"
  - ""
  - "&a&l✦ COMANDOS PARA JUGADORES"
  - "&e/evento &7— Abrir el menú de eventos"
  - "&e/evento list &7— Ver los eventos y su estado"
  - "&e/evento info <evento> &7— Consultar el estado de un evento"
  - "&e/evento join <evento> &7— Entrar a un evento"
  - "&e/evento backroom join &7— Entrar a Backroom"
  - "&e/evento caballos join &7— Entrar a la carrera de caballos"
  - "&e/evento eclipse join &7— Entrar al Eclipse de Sangre"
  - "&e/evento minigames &7— Abrir el menú de MiniGames"
  - "&e/evento leave &7— Salir del evento actual"
  - "&e/evento top &7— Ver los tops de eventos (menú)"
  - "&e/evento top <horse|backroom|boss|mineboss> [all|week|month] &7— Top 10 en el chat"
  - "&e/evento help &7— Mostrar esta ayuda"
  - "&e/airdrop help &7— Ayuda del sistema AirDrop"
  - ""
  - "&7Usa &e/evento list &7para consultar los eventos disponibles."
  - "&5&l━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
help-staff:
  - "&c&l✦ STAFF: EVENTOS Y MAPAS"
  - "&e/eventostaff &7— Abrir el panel de staff"
  - "&e/evento start <evento> &7— Iniciar un evento"
  - "&e/evento forcestart <evento> &7— Forzar el inicio (ignora el mínimo de jugadores)"
  - "&e/evento stop <evento> &7— Detener un evento"
  - "&e/evento anuncio <caballos|backroom> <tiempo> &7— Programar un anuncio"
  - "&8  Tiempo: 10 (minutos), 30s, 10m, 2h o HH:mm; no inicia el evento."
  - "&e/evento setspawn <evento> <jugadores|staff|meta|spectator> &7— Configurar spawns"
  - "&8  En Backroom, repite &e/evento setspawn backroom jugadores &8para agregar varios puntos."
  - "&e/evento setfinish <evento> <pos1|pos2> &7— Marcar la meta final"
  - "&e/evento checkpointfin backroom <pos1|pos2> &7— Definir la zona final del checkpoint"
  - "&e/evento checkpointstart backroom &7— Guardar el punto de regreso tras el checkpoint"
  - "&e/evento setcheckpoint caballos <número> &7— Añadir un checkpoint de caballos"
  - "&e/evento map <backroom|caballos> <enable|disable> &7— Activar/desactivar mapa"
  - "&e/evento map <backroom|caballos> setworld <mundo> &7— Asignar el mundo del mapa"
  - "&e/evento map <evento> clone <plantilla> <mundo> &7— Clonar un mundo plantilla"
  - "&e/evento reload &7— Recargar configuraciones, mensajes y eventos de minas"
  - "&e/evento validate &7— Revisar mapas, mundos, regiones WorldGuard, bosses y minas"
  - "&e/evento textos [restaurar <archivo> confirmar] &7— Ver o restaurar los textos del plugin"
  - "&e/airdrop validate &7— Validar la configuración de AirDrop"
  - "&8  Permisos: apoloevent.admin o por acción: apoloevent.cmd.start|stop|reload|setup|boss|announce"
  - "&8  Las acciones administrativas quedan registradas en plugins/ApoloEvent/audit.log"
  - ""
  - "&c&l✦ STAFF: EVENTO BOSS"
  - "&e/evento boss start|stop &7— Iniciar/detener el evento Boss"
  - "&e/evento boss seleccionar <1-5|random> &7— Elegir un Boss integrado o volver al aleatorio"
  - "&8  1 Warden | 2 Wither | 3 Ravager | 4 Zombie | 5 Piglin Brute"
  - "&e/evento boss crear <id> &7— Crear un Boss personalizado"
  - "&e/evento boss listar &7— Listar Bosses personalizados"
  - "&e/evento boss editar <id> &7— Mostrar la ruta YAML de configuración"
  - "&e/evento boss invocar <id> &7— Seleccionar un Boss personalizado"
  - "&e/evento boss eliminar <id> &7— Eliminar el archivo YAML del Boss"
  - "&8  Archivos: plugins/ApoloEvent/bosses/<id>.yml"
  - "&8  Edita entidad, nombre, vida, daño, tamaño, casco, armadura, arma y habilidades."
  - "&8  Usa /evento setspawn boss jugadores para definir el spawn del evento Boss."

# Textos del menú /evento top. Códigos de color con &. Se pueden traducir o cambiar libremente.
tops:
  menu:
    title: "&8&lTOPS DE EVENTOS"
    top-prefix: "Top"
    list-title: "TOP {category}"
    stats-title: "&a&lTus estadísticas"
    no-stats: "&8Aún no apareces en ningún ranking."
    rank-label: "puesto"
    position-label: "Puesto"
    empty: "&8Sin registros todavía."
    click-hint: "&eClic para ver el top 10"
    free-title: "&8#{position} — Libre"
    free-lore:
      - "&7Nadie ha ocupado este puesto todavía."
    you: "&a★ Eres tú"
    close: "&c&lCerrar"
    close-lore:
      - "&7Cerrar el menú"
    back: "&e&lVolver"
    back-lore:
      - "&7Volver a los tops de eventos"
    period-title: "&e&lPeriodo: &f{period}"
    period-lore:
      - "&7Pulsa para cambiar el periodo"
      - "&8Total · Semana · Mes"
    no-database: "La base de datos SQL no está disponible."
  periods:
    all: "Total"
    week: "Esta semana"
    month: "Este mes"
  categories:
    horse_wins: {name: "Carrera de Caballos", unit: "victorias", icon: SADDLE, color: "&6"}
    backroom_wins: {name: "Backroom", unit: "victorias", icon: SOUL_SAND, color: "&d"}
    boss_kills: {name: "Boss", unit: "derrotas", icon: NETHER_STAR, color: "&c"}
    mine_boss_kills: {name: "Boss de Mina", unit: "derrotas", icon: IRON_PICKAXE, color: "&b"}

# Textos de juego (Backroom, Carrera de caballos y evento Boss). Usa & para colores y {marcadores}.
# Si borras una línea, se usa el texto original del plugin. Los textos propios del Boss están en events/boss.yml (messages).
game:
  already-linked: "&c✖ Ya estás vinculado a un evento."
  backroom-wait: "&7» Puedes seguir en tu base. El staff te llevará al mapa cuando inicie Backroom."
  no-valid-spawn: "&c✖ No hay un spawn válido configurado para este evento."
  ability-cooldown: "&c✖ Podrás usar esa habilidad en &f{seconds}&c segundos."
  tracker-none: "&e» No hay jugadores del evento dentro de &f{range}&e bloques."
  tracker-result: "&6&l» Rastreador: &e{player} &7está a &f{distance}&7 bloques."
  ability-tracker: "&a✔ ¡&lRastreador&a activado! &7Enfriamiento: &f{cooldown} s&7."
  ability-speed: "&a✔ ¡&lVelocidad&a activada! &7Enfriamiento: &f{cooldown} s&7."
  ability-strength: "&a✔ ¡&lFuerza&a activada! &7Enfriamiento: &f{cooldown} s&7."
  backroom-last-survivor: "&6&l★ ¡VICTORIA! &e{player} &6es el último superviviente de Backroom y gana el primer lugar. &6&l★"
  victory-title: "&6&l★ ¡VICTORIA! ★"
  last-survivor-subtitle: "&eÚltimo superviviente"
  backroom-spectator: "&d» Estás en modo espectador de Backroom. Escribe &e/evento leave&d para salir y volver a tu ubicación anterior."
  horse-spectator: "&6» Estás en modo espectador de la Carrera de Caballos. Escribe &e/evento leave&6 para salir y volver a tu ubicación anterior."
  min-players: "&c✖ Se necesitan al menos &f{min}&c jugadores."
  backroom-teleported: "&d» Has sido llevado al mapa de Backroom. No podrás moverte ni atacar hasta que termine la cuenta atrás."
  horse-timeout: "&c✖ La carrera de caballos terminó por tiempo límite."
  go-title: "&a&l¡YA!"
  boss-death: "&c✖ Has muerto durante el evento Boss. Tu inventario se ha perdido y no será restaurado."
  horse-eliminated: "&c✖ &f{player} &cqueda eliminado de la Carrera de Caballos &7(puesto {place})&c."
  backroom-eliminated: "&c✖ &f{player} &cqueda en el puesto &f{place}&c de Backroom."
  checkpoint-done: "&a✔ Checkpoint &f{current}/{total}&a completado."
  checkpoints-required: "&c✖ Debes completar todos los checkpoints antes de cruzar la meta."
  backroom-checkpoint: "&d✔ Checkpoint completado. ¡Ahora busca la meta final!"
  place-1: "Primer lugar"
  place-2: "Segundo lugar"
  place-3: "Tercer lugar"
  place-n: "{place}º lugar"
  place-broadcast: "&6&l★ ¡VICTORIA! &e{player} &6— &f{place}&6. &6&l★"
  place-reward: "&a✔ Recompensa de posición &f{place}&a entregada."
  countdown-cancelled: "&c✖ Cuenta atrás cancelada: no quedan suficientes jugadores."
  boss-not-active: "&c✖ El evento Boss no está activo. Espera el próximo anuncio."
  boss-enter-region: "&e» Para participar, entra en la región WorldGuard configurada para el evento Boss."
  already-linked-other: "&c✖ Ya estás vinculado a otro evento."
  boss-full: "&c✖ El evento Boss está lleno."
  boss-left-region: "&7» Saliste de la región del evento Boss y dejaste de participar."
  boss-round: "&4&l[Boss] &eEl Boss de esta ronda será &6&l{boss}&e."
  boss-timeout: "&c✖ El evento Boss terminó por tiempo. No hubo ganador."
  boss-stopped: "&c✖ El evento Boss fue detenido por un administrador."
  boss-respawn-failed: "&c✖ El Boss no pudo reaparecer; el evento termina sin ganador."
  boss-stage-1: "&e&l» ¡El Boss se está enfureciendo con el paso del tiempo!"
  boss-stage-2: "&6&l» ¡El Boss está herido y se vuelve más agresivo!"
  boss-stage-3: "&4&l» ¡FASE FINAL! ¡El Boss desata toda su furia!"
  boss-awake-title: "&4&l¡EL BOSS HA DESPERTADO!"
  boss-awake-subtitle: "&7Prepárate para la batalla"
  boss-fight-title: "&c&l¡A LUCHAR!"
  boss-fight-subtitle: "&7Derrota al Boss"
  item-cooldown: "&c✖ Ese objeto estará disponible en &f{seconds}&c segundos."
  horse-not-found: "&c✖ No se encontró tu caballo de carrera."
  horse-boost: "&a✔ ¡Impulso activado! &7Podrás volver a usarlo en &f{seconds}&7 segundos."
  horse-no-rivals: "&c✖ No hay rivales disponibles para alcanzar."
  horse-rival-not-found: "&c✖ No se encontró el caballo del rival."
  horse-frozen-title: "&b&l¡CONGELADO!"
  horse-frozen-subtitle: "&7Tu caballo se detuvo 5 segundos"
  horse-froze: "&a✔ Congelaste a &f{player}&a por 5 segundos. &7Podrás volver a usar el hielo en &f{seconds}&7 segundos."
  # Textos del evento Eclipse de Sangre que se leen con text(): se pueden editar aquí.
  eclipse:
    eliminated: "&c✖ &f{player} &cha caído en el Eclipse de Sangre."
    victory-title: "&4&l¡VICTORIA DEL ECLIPSE!"
    victory-subtitle: "&e{player} sobrevive a la oscuridad"
    tracker-none: "&e» No hay jugadores cerca dentro de {range} bloques."
    tracker-result: "&6» Rastreador: &e{player} &7está a &f{distance}&7 bloques."
    tracker-cooldown: "&c✖ El rastreador estará disponible en {seconds} segundos."

# Textos de los comandos de staff (/evento ...). Cambia el texto, no las claves; {nombre} se rellena solo.
staff:
  uso-evento-top-horse-backroom: "&e» Uso: /evento top <horse|backroom|boss|mineboss> [all|week|month]"
  top-header: "&6&lTOP {category}&7 ({period})"
  sin-registros-todavia: "&7Sin registros todavía."
  top-line: "&e» #{position} &f{player}&7 — &a{score}"
  evento-help: "/evento help"
  colormatch-no-esta-disponible-revisa: "&c✖ ColorMatch no está disponible. Revisa la consola del servidor."
  uso-evento-top-horse-backroom-2: "Uso: /evento top <horse|backroom|boss|mineboss> [all|week|month]"
  uso-evento-anuncio-caballos-backroom: "&e» Uso: /evento anuncio <caballos|backroom> <minutos|segundos|horas|HH:mm>"
  ejemplos-evento-anuncio-backroom-10: "&7Ejemplos: /evento anuncio backroom 10 | /evento anuncio caballos 30s | 2h | 20:30"
  tiempo-invalido-usa-minutos-10: "&c✖ Tiempo inválido. Usa minutos (10), 10m, 30s, 2h o una hora HH:mm."
  el-tiempo-debe-ser-desde: "&c✖ El tiempo debe ser desde ahora hasta un máximo de 7 días."
  anuncio-programado-para-solo-anuncia: "&a✔ Anuncio programado para {eventName}. Solo anuncia: no inicia el evento automáticamente."
  apoloevent-recargado-correctamente: "&a✔ ApoloEvent recargado correctamente."
  se-anadieron-claves-faltantes-sin: "&7Se añadieron claves faltantes sin sobrescribir tus valores personalizados."
  recargados-config-yml-messages-yml: "&7Recargados: config.yml, messages.yml, events.yml, maps.yml, eventos y menús."
  el-boss-esta-activo-sus: "&e» El Boss está activo: sus cambios de estadísticas se aplicarán al próximo inicio."
  boss-personalizados: "&6Boss personalizados ({count}): {list}"
  ejemplo-evento-boss-crear-dragon: "&7Ejemplo: /evento boss crear dragon-infernal"
  uso-evento-boss-crear-editar: "&e» Uso: /evento boss <crear|editar|eliminar|invocar> <id>"
  id-invalido-usa-letras-numeros: "&c✖ ID inválido. Usa letras, números, guiones o guion bajo."
  ya-existe-un-boss-con: "&c✖ Ya existe un Boss con ID {id}."
  boss-creado: "&a✔ Boss creado: {path}"
  edita-el-yaml-y-usa: "&e» Edita el YAML y usa /evento boss invocar {id} para seleccionarlo."
  no-se-pudo-crear-el: "&c✖ No se pudo crear el archivo del Boss."
  no-existe-el-boss-personalizado: "&c✖ No existe el Boss personalizado: {id}. Usa /evento boss listar."
  archivo-de-configuracion: "&a✔ Archivo de configuración: {path}"
  edita-el-yaml-y-ejecuta: "&7Edita el YAML y ejecuta /evento boss invocar {id} para cargarlo."
  deten-el-evento-boss-antes: "&c✖ Detén el evento Boss antes de eliminar el Boss activo."
  no-se-pudo-eliminar-el: "&c✖ No se pudo eliminar el archivo."
  boss-eliminado: "&a✔ Boss eliminado: {id}"
  deten-el-evento-boss-antes-2: "&c✖ Detén el evento Boss antes de cambiar el Boss seleccionado."
  entidad-invalida-en-boss-entity: "&c✖ Entidad inválida en boss.entity: {entityName}"
  boss-personalizado-seleccionado-inicia-con: "&a✔ Boss personalizado seleccionado: {id}. Inicia con /evento boss start."
  no-se-pudo-guardar-events: "&c✖ No se pudo guardar events/boss.yml."
  uso-evento-setboss-1-2: "&c✖ Uso: /evento setboss <1|2|3>"
  solo-puedes-configurar-los-spawns: "&c✖ Solo puedes configurar los spawns 1, 2 y 3."
  spawn-del-boss-guardado: "&a✔ Spawn del Boss {point} guardado."
  uso-evento-boss-seleccionar-1: "&e» Uso: /evento boss seleccionar <1-5|random>"
  1-warden-2-wither-3: "&71 Warden | 2 Wither | 3 Ravager | 4 Zombie grande con calabaza, armadura y espada | 5 Piglin Brute"
  deten-el-evento-boss-antes-3: "&c✖ Detén el evento Boss antes de cambiar el tipo."
  seleccion-de-boss-aleatoria-entre: "&a✔ Selección de Boss: aleatoria entre los 5 perfiles clásicos en cada inicio."
  opcion-invalida-elige-un-numero: "&c✖ Opción inválida. Elige un número del 1 al 5."
  boss-seleccionado-vida-hp-dano: "&a✔ Boss seleccionado: &6{type}&a. Vida: {selectedHealth} HP, daño: {selectedDamage}."
  aparecera-en-el-proximo-inicio: "&7Aparecerá en el próximo inicio del evento Boss."
  usa-evento-boss-start-stop: "&e» Usa /evento boss <start|stop|seleccionar <1-5>>."
  estado-lista: "&d{display}&7 — {state} — {players}/{maxPlayers}"
  estado-participantes: "&d{display}&7 | estado={state} | participantes={players}/{maxPlayers}"
  usa-jugadores-staff-meta-spectator: "Usa jugadores|staff|meta|spectator"
  spawn-guardado-en-maps-yml: "&a✔ Spawn guardado en maps.yml."
  no-se-pudo-guardar-el: "&c✖ No se pudo guardar el spawn."
  spawn-de-jugadores-del-boss: "&a✔ Spawn de jugadores del Boss guardado."
  no-se-pudo-guardar-maps: "&c✖ No se pudo guardar maps.yml."
  para-boss-solo-necesitas-evento: "&c✖ Para Boss solo necesitas /evento setspawn boss jugadores."
  spawn-de-backroom-guardado-como: "&a✔ Spawn de Backroom guardado como punto {nextPoint}. Repite /evento setspawn backroom jugadores para agregar más."
  corral-guardado-como-posicion-repite: "&a✔ Corral guardado como posición {nextPoint}. Repite el comando para agregar más corrales."
  spawn-guardado: "&a✔ Spawn guardado: {event}/{type}"
  los-checkpoints-solo-se-configuran: "&c✖ Los checkpoints solo se configuran para caballos."
  usa-un-numero-de-checkpoint: "&c✖ Usa un número de checkpoint, por ejemplo 1."
  el-numero-debe-estar-entre: "&c✖ El número debe estar entre 1 y 100."
  checkpoint-guardado-y-checkpoints-activados: "&a✔ Checkpoint {number} guardado y checkpoints activados para la carrera."
  no-se-pudo-guardar-la: "&c✖ No se pudo guardar la configuración de checkpoints."
  uso-evento-checkpointfin-backroom-pos1: "&c✖ Uso: /evento checkpointfin backroom <pos1|pos2>"
  usa-evento-checkpointfin-backroom-pos1: "&c✖ Usa /evento checkpointfin backroom pos1 o pos2."
  esquina-del-checkpointfin-guardada: "&a✔ Esquina {corner} del checkpointfin guardada."
  uso-evento-checkpointstart-backroom: "&c✖ Uso: /evento checkpointstart backroom"
  checkpointstart-de-backroom-guardado-en: "&a✔ Checkpointstart de Backroom guardado en tu ubicación actual."
  usa-evento-setfinish-backroom-caballos: "&c✖ Usa /evento setfinish <backroom|caballos> <pos1|pos2>"
  esquina-de-la-meta-guardada: "&a✔ Esquina {corner} de la meta guardada para {display}."
  uso-evento-map-backroom-caballos: "&c✖ Uso: /evento map <backroom|caballos> clone <plantilla> <mundo-destino>"
  uso-evento-map-backroom-caballos-2: "&c✖ Uso: /evento map <backroom|caballos> setworld <mundo>"
  el-mundo-no-esta-cargado: "&c✖ El mundo '{worldName}' no está cargado. Comprueba el nombre y que esté cargado."
  mundo-del-mapa-establecido-en: "&a✔ Mundo del mapa {id} establecido en '{targetWorld}'. Los spawns y zonas configurados se mantienen; revisa que sus coordenadas correspondan a ese mundo."
  usa-evento-map-backroom-caballos: "&c✖ Usa /evento map <backroom|caballos> <enable|disable|setworld>"
  configura-primero-los-spawns-jugadores: "&c✖ Configura primero los spawns jugadores y meta con /evento setspawn."
  configura-las-dos-esquinas-de: "&c✖ Configura las dos esquinas de la meta con /evento setfinish {id} pos1 y pos2."
  apoloevent-recargado-correctamente-se-conservaron: "&a✔ ApoloEvent recargado correctamente; se conservaron tus valores y se añadieron solo las claves faltantes."
  los-nombres-solo-pueden-contener: "&c✖ Los nombres solo pueden contener letras, números, guion y guion bajo."
  deten-el-evento-y-vacia: "&c✖ Detén el evento y vacía sus participantes antes de preparar un mapa."
  el-mundo-de-destino-ya: "&c✖ El mundo de destino ya existe o está cargado."
  no-encuentro-la-plantilla-copia: "&c✖ No encuentro la plantilla. Copia el mundo a plugins/ApoloEvent/templates/{templateName} (debe contener level.dat)."
  copiando-plantilla-del-mapa-en: "&e» Copiando plantilla del mapa en segundo plano..."
  fallo-la-copia-del-mapa: "&c✖ Falló la copia del mapa; revisa la consola."
  el-mundo-se-copio-pero: "&c✖ El mundo se copió pero Bukkit no pudo cargarlo. Revisa la consola."
  mapa-clonado-y-cargado-en: "&a✔ Mapa {display} clonado y cargado en '{worldName}'. Configura spawns/meta y luego usa /evento map {id} enable."
  el-mundo-se-cargo-pero: "&c✖ El mundo se cargó, pero no se pudo guardar maps.yml."
  no-hay-spawns-validos-configurados: "&c✖ No hay spawns válidos configurados para Backroom. Revisa maps.yml."
  el-evento-boss-ya-esta: "&c✖ El evento Boss ya está activo."
  no-existe-el-mundo-configurado: "&c✖ No existe el mundo configurado en events/boss.yml: {world}"
  el-tipo-configurado-no-es: "&c✖ El tipo configurado no es una entidad viva."
  evento-boss-iniciado: "&a✔ Evento Boss iniciado."
  map-enabled: "&a✔ Mapa {id} habilitado."
  map-disabled: "&a✔ Mapa {id} deshabilitado."
  textos-estado: "&6&lTEXTOS &7(actualización automática: &f{auto}&7)"
  textos-ayuda: "&7Para volver a los textos del plugin: &e/evento textos restaurar <{files}> confirmar"
  textos-uso: "&e» Uso: /evento textos restaurar <{files}> confirmar"
  textos-confirmar: "&e» Esto reemplaza tus textos de &f{file}&e por los del plugin (con copia en backups/). Repite el comando con &aconfirmar&e al final."
  textos-restaurados: "&a✔ {file}: {count} texto(s) restaurados."
  textos-error: "&c✖ No se pudo restaurar {file}."
  textos-uso-general: "&e» Uso: /evento textos [estado] | /evento textos restaurar <archivo> confirmar"

# Evento Eclipse de Sangre
eclipse:
  title: "&4&l¡EL ECLIPSE DE SANGRE HA COMENZADO!"
  subtitle: "&eSobrevive a la oscuridad y a los rivales"
  chat: "&8[&4Eclipse&8] &e¡El Eclipse de Sangre ha comenzado! Sobrevive en la oscuridad para ganar."
  joined: "&aTe has unido al Eclipse de Sangre. Sobrevive a la oscuridad para ganar."
  left: "&eHas salido del Eclipse."
  already-active: "&cEl Eclipse ya está activo."
  not-active: "&cEl Eclipse no está activo."
  darkness: "&4&l¡Noche de Eclipse! La oscuridad cubre el mapa."
  wave-start: "&6Oleada {wave}: Aparecen criaturas de la oscuridad."
  wave-clear: "&aOleada {wave} eliminada. ¡Sigue sobreviviendo!"
  last-survivor: "&4&l¡ÚLTIMO SUPERVIVIENTE! {player} gana el Eclipse de Sangre."
  spectator: "&dEstás en modo espectador del Eclipse. Escribe &e/evento leave&d para salir."
  ability-tracker: "&a¡Rastreador activado! Detectando jugadores cercanos."
  no-winner: "&7» Nadie sobrevivió al Eclipse de Sangre. El evento termina sin ganador."

```

### `mine-boss-kill.yml`

Contenido íntegro del archivo fuente (incluye comentarios originales):

```yaml
# Recompensas de objetos para los bosses automáticos de minas.
# Este archivo es independiente de events/boss.yml y de mine-events.yml.
# Se lee cuando muere un boss; puedes editarlo sin reiniciar el servidor.
#
# bosses.<id>.mine-name: nombre visible personalizado para el placeholder {mine}.
# Si se omite, usa mine-events.yml y finalmente el identificador del boss.
# bosses.<id>.chance-percent: probabilidad general de que suelte algún objeto.
# items: tabla de objetos personalizados. Cada objeto tiene su propia probabilidad.
# Por derrota se entrega como máximo UN objeto, igual que en events/boss.yml.
# Materiales: nombres Bukkit/Minecraft (NETHERITE_SWORD, TRIDENT, MACE, etc.).
# Placeholders de broadcast: {boss}, {item}, {mine}.
# no-drop-message: anuncio cuando no sale ningún objeto adicional.
# En ese caso, el killer recibe la recompensa principal configurada en mine-events.yml.
no-drop-message: |
  &8&m----------------------------------------
  &6&l✦ BOSS DE MINA ✦
  &7El boss &c{boss} &7de &b{mine} &7no soltó ningún objeto adicional.
  &7La recompensa principal corresponde a: &a{player}
  &8&m----------------------------------------
# Encantamientos aceptan niveles de 1 a 255; se aplican aunque superen el nivel vanilla.

broadcast-message: |
  &8&m----------------------------------------
  &6&l✦ DROP DE BOSS DE MINA ✦
  &7El boss &c{boss} &7de &b{mine}
  &7ha soltado: &d&l{item}
  &8&m----------------------------------------

bosses:
  mina:
    enabled: true
    mine-name: 'Mina Principal OG'
    chance-percent: 100.0
    items:
      - chance-percent: 1.0
        material: NETHERITE_SWORD
        amount: 1
        name: '&c&lFilo de la Mina'
        lore:
          - '&7Recompensa exclusiva del boss de la mina.'
        enchantments:
          SHARPNESS: 6
          UNBREAKING: 4
          MENDING: 1
      - chance-percent: 2.0
        material: DIAMOND
        amount: 8
        name: '&b&lDiamantes Mineros'
        lore:
          - '&7Una recompensa por derrotar al boss.'
  mina_nether:
    enabled: true
    mine-name: 'Mina Nether OG'
    chance-percent: 100.0
    items:
      - chance-percent: 1.0
        material: NETHERITE_AXE
        amount: 1
        name: '&4&lHacha del Nether'
        lore:
          - '&7Drop exclusivo del boss del Nether.'
        enchantments:
          SHARPNESS: 7
          FIRE_ASPECT: 2
          UNBREAKING: 5
      - chance-percent: 2.0
        material: ANCIENT_DEBRIS
        amount: 4
        name: '&c&lRestos Ancestrales'
  warden_ancestral:
    enabled: true
    mine-name: 'Mina Ancestral OG'
    chance-percent: 100.0
    items:
      - chance-percent: 1.0
        material: MACE
        amount: 1
        name: '&5&lMazo Ancestral'
        lore:
          - '&7Recompensa del Warden Ancestral.'
        enchantments:
          DENSITY: 6
          BREACH: 4
          UNBREAKING: 5
      - chance-percent: 2.0
        material: ECHO_SHARD
        amount: 8
        name: '&d&lFragmentos de Eco'
  caballero_carmesi:
    enabled: true
    mine-name: 'Mina Carmesí OG'
    chance-percent: 100.0
    items:
      - chance-percent: 1.0
        material: NETHERITE_CHESTPLATE
        amount: 1
        name: '&4&lCoraza Carmesí'
        lore:
          - '&7Armadura exclusiva del Caballero Carmesí.'
        enchantments:
          PROTECTION: 6
          THORNS: 3
          UNBREAKING: 5
      - chance-percent: 2.0
        material: BLAZE_ROD
        amount: 8
        name: '&c&lNúcleo Carmesí'
        lore:
          - '&7Un núcleo de energía del Caballero Carmesí.'

```

### `mine-events.yml`

Contenido íntegro del archivo fuente (incluye comentarios originales):

```yaml
# Eventos automáticos de minas; WorldGuard es requerido.
mine-events:
  enabled: true
  scan-interval-ticks: 20
  # Si es true, un boss vivo sobrevive a un reinicio del servidor y a /evento reload (se retoma con su vida, daños y tiempo
  # restante; si el tiempo ya se acabó, se retira). Con false se retira al reiniciar o recargar.
  resume-after-restart: true
  regions: [mina, mina_nether]

  announcements:
    broadcast-enabled: true
    message: '&6&l[MINAS] &e¡Apareció el boss &c{boss}&e en &b{mine}&e!'

  # El webhook es opcional. Actívalo y pega tu URL privada de Discord para publicar anuncios.
  discord-webhook:
    enabled: false
    url: ''
    username: 'ApoloEvent | Bosses'
    avatar-url: ''
    message: |-
      **¡Apareció {boss} en {mine}!**
      Mundo: {world}
      Coordenadas: `{x}, {y}, {z}`

  # Cada boss tiene su propio cooldown, duración, región y recompensas.
  # Copia una sección y cambia su identificador para crear otro boss.
  bosses:
    mina:
      enabled: true
      region: mina
      spawn-chance-percent: 12
      cooldown-seconds: 1800
      duration-seconds: 600
      spawn:
        world: world
        x: 0.5
        y: 80.0
        z: 0.5
      type: RAVAGER
      name: '&4&lBoss de la Mina'
      max-health: 1200.0
      attack-damage: 18.0
      # Agresividad: persigue y golpea sin pausa al jugador más cercano.
      aggression:
        enabled: true
        period-ticks: 5          # cada cuántos ticks elige objetivo (5 = 4 veces por segundo)
        range: 48.0              # distancia máxima de persecución
        speed-multiplier: 1.25   # multiplica la velocidad de movimiento
        lunge:                   # embestida cuando el jugador está lejos
          enabled: true
          min-distance: 5.0
          max-distance: 28.0
          cooldown-ticks: 60
          power: 1.0
        melee-assist:            # golpe extra cuando el jugador está pegado al boss
          enabled: true
          reach: 1.4
          interval-ticks: 16
          damage-multiplier: 0.5
      # Defensa: el boss recibe el daño completo de la maza y otras armas fuertes.
      defense:
        ignore-armor: true
        damage-taken-multiplier: 1.0
        invulnerability-ticks: 10
      # Aumenta el daño del boss por tiempo transcurrido y por vida perdida.
      damage-scaling:
        enabled: true
        time:
          enabled: true
          interval-seconds: 60
          increase-percent: 10
        health:
          enabled: true
          lost-percent-per-stage: 10
          increase-percent: 15
        # Límite del aumento acumulado: 200 = hasta 3 veces el daño base.
        max-bonus-percent: 200
      mine-name: 'Mina Principal'
      special-effects-enabled: true
      # Puedes añadir más entradas. EXPULSION: knockback 100 equivale a fuerza 1.0.
      special-effects:
        - type: EXPULSION
          knockback: 100
          vertical: 0.35
          chance-percent: 100
          cooldown-ticks: 20
        - type: SLOWNESS
          duration-ticks: 50
          amplifier: 0
          chance-percent: 20
          cooldown-ticks: 100
        - type: FIRE
          fire-ticks: 60
          chance-percent: 15
          cooldown-ticks: 120
        - type: TELEPORT
          radius: 4
          chance-percent: 8
          cooldown-ticks: 200
      guardians:
        enabled: true
        spawn-chance-percent: 45
        count-min: 2
        count-max: 4
        name: '&c&lMini Guardián'
        name-visible: true
        max-health: 30
        attack-damage: 5
        movement-speed: 0.32
        protect-radius: 20
        leash-radius: 28
        ai-period-ticks: 10
        weapon: IRON_SWORD
        armor:
          helmet: IRON_HELMET
          chestplate: IRON_CHESTPLATE
          leggings: IRON_LEGGINGS
          boots: IRON_BOOTS
      animation:
        enabled: true
        mode: RING # RING, SPIRAL o AURA
        particle: FLAME
        radius: 1.2
        height: 2.0
        ring-height: 0.8
        points: 18
        period-ticks: 4
      top-rewards:
        percentages: [100, 75, 50, 35, 25]
        commands:
          - 'eco give {player} 1000000'
          # Añade aquí cualquier recompensa adicional mediante el comando correspondiente.
      other-damage-reward:
        enabled: true
        percentage: 10
        commands:
          - 'eco give {player} 1000000'

    mina_nether:
      enabled: true
      region: mina_nether
      spawn-chance-percent: 12
      cooldown-seconds: 2400
      duration-seconds: 600
      spawn:
        world: world_nether
        x: 0.5
        y: 80.0
        z: 0.5
      type: WITHER_SKELETON
      name: '&5&lBoss de la Mina Nether'
      max-health: 900.0
      attack-damage: 16.0
      # Agresividad: persigue y golpea sin pausa al jugador más cercano.
      aggression:
        enabled: true
        period-ticks: 5          # cada cuántos ticks elige objetivo (5 = 4 veces por segundo)
        range: 48.0              # distancia máxima de persecución
        speed-multiplier: 1.25   # multiplica la velocidad de movimiento
        lunge:                   # embestida cuando el jugador está lejos
          enabled: true
          min-distance: 5.0
          max-distance: 28.0
          cooldown-ticks: 60
          power: 1.0
        melee-assist:            # golpe extra cuando el jugador está pegado al boss
          enabled: true
          reach: 1.4
          interval-ticks: 16
          damage-multiplier: 0.5
      # Defensa: el boss recibe el daño completo de la maza y otras armas fuertes.
      defense:
        ignore-armor: true
        damage-taken-multiplier: 1.0
        invulnerability-ticks: 10
      # Aumenta el daño del boss por tiempo transcurrido y por vida perdida.
      damage-scaling:
        enabled: true
        time:
          enabled: true
          interval-seconds: 60
          increase-percent: 10
        health:
          enabled: true
          lost-percent-per-stage: 10
          increase-percent: 15
        # Límite del aumento acumulado: 200 = hasta 3 veces el daño base.
        max-bonus-percent: 200
      mine-name: 'Mina Nether'
      special-effects-enabled: true
      special-effects:
        - type: POTION
          potion: WITHER
          duration-ticks: 60
          amplifier: 0
          chance-percent: 30
          cooldown-ticks: 40
        - type: BLINDNESS
          duration-ticks: 40
          amplifier: 0
          chance-percent: 15
          cooldown-ticks: 120
        - type: PULL
          knockback: 70
          vertical: 0.15
          chance-percent: 12
          cooldown-ticks: 160
      guardians:
        enabled: true
        spawn-chance-percent: 60
        count-min: 3
        count-max: 5
        name: '&5&lMini Guardián Nether'
        name-visible: true
        max-health: 35
        attack-damage: 6
        movement-speed: 0.34
        protect-radius: 22
        leash-radius: 30
        ai-period-ticks: 10
        weapon: STONE_SWORD
        armor:
          helmet: CHAINMAIL_HELMET
          chestplate: CHAINMAIL_CHESTPLATE
          leggings: CHAINMAIL_LEGGINGS
          boots: CHAINMAIL_BOOTS
      animation:
        enabled: true
        mode: SPIRAL
        particle: SOUL_FIRE_FLAME
        radius: 1.3
        height: 2.2
        points: 20
        period-ticks: 4
      top-rewards:
        percentages: [100, 75, 50, 35, 25]
        commands:
          - 'eco give {player} 1000000'
      other-damage-reward:
        enabled: true
        percentage: 10
        commands:
          - 'eco give {player} 1000000'

    warden_ancestral:
      enabled: true
      region: mina
      spawn-chance-percent: 12
      cooldown-seconds: 2700
      duration-seconds: 720
      spawn:
        world: world
        x: 12.5
        y: 80.0
        z: 12.5
      type: WARDEN
      name: '&5&lWarden Ancestral'
      max-health: 1800.0
      attack-damage: 24.0
      # Agresividad: persigue y golpea sin pausa al jugador más cercano.
      aggression:
        enabled: true
        period-ticks: 5          # cada cuántos ticks elige objetivo (5 = 4 veces por segundo)
        range: 48.0              # distancia máxima de persecución
        speed-multiplier: 1.25   # multiplica la velocidad de movimiento
        lunge:                   # embestida cuando el jugador está lejos
          enabled: true
          min-distance: 5.0
          max-distance: 28.0
          cooldown-ticks: 60
          power: 1.0
        melee-assist:            # golpe extra cuando el jugador está pegado al boss
          enabled: true
          reach: 1.4
          interval-ticks: 16
          damage-multiplier: 0.5
      # Defensa: el boss recibe el daño completo de la maza y otras armas fuertes.
      defense:
        ignore-armor: true
        damage-taken-multiplier: 1.0
        invulnerability-ticks: 10
      # Aumenta el daño del boss por tiempo transcurrido y por vida perdida.
      damage-scaling:
        enabled: true
        time:
          enabled: true
          interval-seconds: 60
          increase-percent: 10
        health:
          enabled: true
          lost-percent-per-stage: 10
          increase-percent: 15
        # Límite del aumento acumulado: 200 = hasta 3 veces el daño base.
        max-bonus-percent: 200
      mine-name: 'Mina Principal'
      special-effects-enabled: true
      special-effects:
        - type: BLINDNESS
          duration-ticks: 100
          amplifier: 0
          chance-percent: 35
          cooldown-ticks: 160
        - type: SLOWNESS
          duration-ticks: 80
          amplifier: 1
          chance-percent: 25
          cooldown-ticks: 180
        - type: PULL
          knockback: 110
          vertical: 0.3
          chance-percent: 18
          cooldown-ticks: 220
        - type: FREEZE
          freeze-ticks: 100
          chance-percent: 15
          cooldown-ticks: 240
        - type: PARTICLES
          particle: SONIC_BOOM
          count: 12
          chance-percent: 20
          cooldown-ticks: 200
      guardians:
        enabled: true
        spawn-chance-percent: 75
        count-min: 3
        count-max: 5
        name: '&5&lMini Centinela Ancestral'
        name-visible: true
        max-health: 42
        attack-damage: 7
        movement-speed: 0.34
        protect-radius: 24
        leash-radius: 32
        ai-period-ticks: 8
        weapon: DIAMOND_SWORD
        armor:
          helmet: DIAMOND_HELMET
          chestplate: DIAMOND_CHESTPLATE
          leggings: DIAMOND_LEGGINGS
          boots: DIAMOND_BOOTS
      animation:
        enabled: true
        mode: AURA
        particle: SCULK_SOUL
        radius: 1.8
        height: 2.8
        points: 24
        period-ticks: 3
      top-rewards:
        percentages: [100, 75, 50, 35, 25]
        commands:
          - 'eco give {player} 1000000'
      other-damage-reward:
        enabled: true
        percentage: 10
        commands:
          - 'eco give {player} 1000000'

    caballero_carmesi:
      enabled: true
      region: mina_nether
      spawn-chance-percent: 12
      cooldown-seconds: 3000
      duration-seconds: 720
      spawn:
        world: world_nether
        x: 12.5
        y: 80.0
        z: 12.5
      type: PIGLIN_BRUTE
      name: '&c&lCaballero Carmesí'
      max-health: 1700.0
      attack-damage: 22.0
      # Agresividad: persigue y golpea sin pausa al jugador más cercano.
      aggression:
        enabled: true
        period-ticks: 5          # cada cuántos ticks elige objetivo (5 = 4 veces por segundo)
        range: 48.0              # distancia máxima de persecución
        speed-multiplier: 1.25   # multiplica la velocidad de movimiento
        lunge:                   # embestida cuando el jugador está lejos
          enabled: true
          min-distance: 5.0
          max-distance: 28.0
          cooldown-ticks: 60
          power: 1.0
        melee-assist:            # golpe extra cuando el jugador está pegado al boss
          enabled: true
          reach: 1.4
          interval-ticks: 16
          damage-multiplier: 0.5
      # Defensa: el boss recibe el daño completo de la maza y otras armas fuertes.
      defense:
        ignore-armor: true
        damage-taken-multiplier: 1.0
        invulnerability-ticks: 10
      # Aumenta el daño del boss por tiempo transcurrido y por vida perdida.
      damage-scaling:
        enabled: true
        time:
          enabled: true
          interval-seconds: 60
          increase-percent: 10
        health:
          enabled: true
          lost-percent-per-stage: 10
          increase-percent: 15
        # Límite del aumento acumulado: 200 = hasta 3 veces el daño base.
        max-bonus-percent: 200
      mine-name: 'Mina Nether'
      special-effects-enabled: true
      special-effects:
        - type: WITHER
          duration-ticks: 100
          amplifier: 0
          chance-percent: 25
          cooldown-ticks: 180
        - type: FIRE
          fire-ticks: 100
          chance-percent: 30
          cooldown-ticks: 200
        - type: EXPULSION
          knockback: 160
          vertical: 0.5
          chance-percent: 20
          cooldown-ticks: 160
        - type: EXPLOSION
          power: 1.5
          chance-percent: 8
          cooldown-ticks: 300
      guardians:
        enabled: true
        spawn-chance-percent: 80
        count-min: 4
        count-max: 6
        name: '&4&lMini Caballero'
        name-visible: true
        max-health: 42
        attack-damage: 7
        movement-speed: 0.36
        protect-radius: 26
        leash-radius: 34
        ai-period-ticks: 8
        weapon: NETHERITE_SWORD
        armor:
          helmet: NETHERITE_HELMET
          chestplate: NETHERITE_CHESTPLATE
          leggings: NETHERITE_LEGGINGS
          boots: NETHERITE_BOOTS
      animation:
        enabled: true
        mode: SPIRAL
        particle: SOUL_FIRE_FLAME
        radius: 1.8
        height: 2.8
        points: 24
        period-ticks: 3
      top-rewards:
        percentages: [100, 75, 50, 35, 25]
        commands:
          - 'eco give {player} 1000000'
      other-damage-reward:
        enabled: true
        percentage: 10
        commands:
          - 'eco give {player} 1000000'

  # Recompensas por permanecer en cualquiera de las regiones configuradas arriba.
  time-rewards:
    enabled: true
    interval-minutes: 15
    commands:
      - 'eco give {player} 1000000'
      # Añade aquí el comando real de COSMO.
    glow:
      after-minutes: 30

  bounties:
    enabled: true
    kills-to-activate: 5
    money-min: 250000
    money-max: 1000000
    cosmo-min: 0
    cosmo-max: 1000
    commands:
      - 'eco give {killer} {money}'
      # Añade aquí el comando real de COSMO.
    drop-head: true
    anti-farm-seconds: 300

```

### `minigames/minigames.yml`

Contenido íntegro del archivo fuente (incluye comentarios originales):

```yaml
# MiniGamesParty integrado en ApoloEvent. Cada arena tiene configuración propia.
settings:
  min-players: 2
  countdown-seconds: 10
  restore-arena-after-game: true
games:
  spleef: { enabled: true }
  colormatch: { enabled: true }
  minefield: { enabled: true }
  jumprun: { enabled: true }
  slapfight: { enabled: true }
  chickentag: { enabled: true }
  lastarcherstanding: { enabled: true }
  deadend: { enabled: true }
  disintegration: { enabled: true }
  sheepfrenzy: { enabled: true }
  smokemonster: { enabled: true }
arenas: {}

```

