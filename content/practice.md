# ApoloPractice

> Core de Practice PvP de ApoloMC. Duelos, colas, parties, FFA, entrenamiento, torneos y replays.

<span class="doc-meta">Paper API 1.21.4 · Java 21 · Estado documentado: 1.8.18-SNAPSHOT</span>

<a id="overview"></a>
## Resumen

ApoloPractice es un core modular de Practice PvP. El README describe duelos 1v1, matchmaking ranked/unranked, kits configurables, parties, FFA, torneos, entrenamiento local, replays, cosméticos y moderación.

La base automatizada se valida con Paper API 1.21.4 y Java 21. Algunas funciones —en particular el jugador falso para entrenamiento— requieren pruebas de servidor real antes de considerarse estables.

<a id="duels"></a>
## Duelos

Duelos 1v1 con solicitudes que expiran, aceptación, revancha, rendición y restauración del estado del jugador al finalizar.

```
/practice duel <jugador> [kit]
/practice accept <jugador>
/practice rematch
/practice forfeit
```

La restauración documentada incluye inventario, armadura, mano secundaria, experiencia, efectos, fuego y hambre.

<a id="queues"></a>
## Colas y ELO

El matchmaking admite colas ranked y unranked. Solo las partidas ranked modifican el rating.

```
/practice queue <kit> [ranked|unranked]
/practice leave
/practice top [elo|wins|kills]
```

En el selector de kits, el clic izquierdo elige ranked y el derecho unranked.

<a id="kits"></a>
## Kits y modos

Los kits se definen en YAML y pueden incluir contenido, armadura, vida, comida, construcción, hambre y límites de versión de cliente.

Modos documentados:
- **Estándar:** combate con reglas del kit.
- **Boxing:** victoria por golpes.
- **Spleef:** excavar nieve.
- **Construcción:** restauración automática de bloques al finalizar el duelo.

```
/practice kits
/practice menu
```

<a id="parties"></a>
## Parties y party wars

Las parties admiten hasta ocho jugadores. Las invitaciones expiran a los 60 segundos.

```
/practice party invite <jugador>
/practice party accept <jugador>
/practice party kick <jugador>
/practice party leave
/practice party disband
/practice party info
/practice partywar duel <líder rival> <kit>
```

Party-vs-party está documentado como una serie 2v2–4v4: cada integrante juega su lane 1v1 en paralelo y el core anuncia el resultado agregado. No equivale todavía a combate de equipo nativo en una sola arena.

<a id="ffa"></a>
## Free For All y espectadores

FFA permite unirse con un kit, salir de la modalidad y restaurar el estado completo del jugador.

```
/practice ffa join <kit>
/practice ffa leave
/practice ffa setspawn
/practice spectate <jugador>
/practice unspectate
```

<a id="tournaments"></a>
## Torneos

Torneos eliminatorios de hasta 32 participantes. El sistema elimina correctamente a participantes que se desconectan.

```
/practice tournament join
/practice tournament leave
/practice tournament status
/practice tournament create <kit> <nombre>
/practice tournament start
/practice tournament cancel
```

<a id="training"></a>
## Entrenamiento

Entrenamiento local contra una IA propia del core, con kit y dificultad.

```
/practice training start <kit> [easy|normal|hard]
/practice training stop
```

**Estado:** el proyecto incluye un primer adaptador NMS para jugador falso en Paper 1.21.4. La visibilidad, recepción de golpes y limpieza deben probarse en un servidor real; no se debe asumir que el bot ya está completamente validado.

<a id="replays"></a>
## Replays

Replays mediante snapshots, con reproducción visual como espectador y fantasma del rival.

```
/practice replay list
/practice replay play <id>
/practice replay pause
/practice replay resume
/practice replay speed <1|2|4>
/practice replay stop
```

La reproducción visual por snapshots no equivale todavía a una reconstrucción determinista de todos los eventos de combate.

<a id="stats"></a>
## Estadísticas y cosméticos

Estadísticas disponibles: victorias, derrotas, kills, muertes, rachas y ELO.

```
/practice stats [jugador conectado]
/practice top [elo|wins|kills]
/practice cosmetic list
/practice cosmetic set <efecto>
```

Los cosméticos son efectos de kill configurables por jugador y guardados en YAML.

<a id="commands"></a>
## Comandos y permisos

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

### Permisos registrados

| Permiso | Default / alcance |
|---|---|
| apolopractice.use | true; acceso al comando principal y funciones de jugador. |
| apolopractice.admin | OP; comandos administrativos, arenas/FFA, torneos y staff. |
| apolopractice.compatibility | OP; administración/consulta del módulo de compatibilidad. |

El proyecto define estos tres nodos principales en permissions.yml y plugin.yml. No presupongas que un subcomando tiene un permiso independiente si no está expuesto por el código. El acceso administrativo se agrupa bajo apolopractice.admin, mientras compatibility requiere apolopractice.compatibility.



<a id="config"></a>
## Configuración, almacenamiento y compatibilidad

La carpeta de datos es plugins/ApoloPractice/. Paper API 1.21.4 y Java 21 son el objetivo actual de compilación/CI. La compatibilidad de clientes depende del protocolo disponible y de las pruebas reales del servidor.

### Backend de datos

- SQLite es el backend predeterminado: perfiles en profiles.db.
- MySQL se conecta con las propiedades declaradas en config.yml.
- YAML mantiene perfiles en archivos individuales y puede importarse inicialmente a SQL.
- Cambiar el backend requiere reiniciar; /practice reload no cambia el motor de almacenamiento.

### Compatibilidad de cliente

compatibility.yml controla política global, límites del servidor, adaptadores ViaVersion/ViaBackwards/ViaRewind y excepciones por modo. También define en qué eventos del ciclo de jugador se valida versión: join, cola, duelo, entrada a arena o cambio de modo. Los límites por kit se guardan en kits.yml.

### Límites del estado actual

- Entrenamiento usa un primer adaptador NMS de ServerPlayer para Paper 1.21.4; la visibilidad, golpes recibidos y limpieza necesitan prueba en servidor real.
- Party war actual es formato de serie de lanes 1v1 en paralelo; no es combate de equipos en una arena compartida.
- Replay almacena snapshots y los muestra visualmente; no reconstruye determinísticamente cada evento.
- ViaVersion ayuda a detectar protocolos, pero no garantiza soporte universal de cualquier cliente.



<a id="variables"></a>
## Variables y placeholders

### PlaceholderAPI

La expansión se registra con el identificador apolopractice. Los placeholders son:

| Placeholder | Significado |
|---|---|
| %apolopractice_queue_count% | Cantidad de jugadores en cola. |
| %apolopractice_online% | Jugadores conectados/activos en Practice según el contador de la expansión. |
| %apolopractice_elo% | Rating/ELO del jugador. |
| %apolopractice_rating% | Alias del ELO. |
| %apolopractice_wins% | Victorias. |
| %apolopractice_losses% | Derrotas. |
| %apolopractice_kills% | Bajas. |
| %apolopractice_deaths% | Muertes. |
| %apolopractice_streak% | Racha actual. |
| %apolopractice_best_streak% | Mejor racha. |
| %apolopractice_winrate% | Porcentaje de victorias. |

Los placeholders por jugador requieren perfil; queue_count/online son contadores generales. PlaceholderAPI es una integración opcional y debe estar presente para que otros plugins puedan resolver la expansión.



<a id="yaml"></a>

### Ejemplo real: config.yml

```yaml
language: es
debug: false
storage:
  type: sqlite
  mysql:
    host: 127.0.0.1
    port: 3306
    database: apolopractice
    username: root
    password: ""
modules:
  profiles: true
  kits: true
  arenas: true
  duels: true
  queues: true
  ranked: true
  parties: true
  spectators: true
  statistics: true
  training: true
  compatibility: true
replay:
  interval-ticks: 5
  max-duration-seconds: 600
scoreboard:
  enabled: true
training:
  default-difficulty: normal
rewards:
  money-per-win: 0.0
combat:
  countdown-seconds: 3
  duel-request-expiry-seconds: 30
  restore-player-state: true
  boxing-hits-to-win: 100
```

**Cómo funciona:** `language/debug` controlan idioma y diagnóstico; `storage.type` elige sqlite/mysql/yaml; `modules` activa sistemas independientes; `replay` controla frecuencia y duración de snapshots; `scoreboard` activa la sidebar; `training` define dificultad; `rewards` integra Vault; `combat` controla cuenta atrás, caducidad de solicitudes, restauración del estado y condición de victoria de Boxing.

### Ejemplo real: compatibility.yml

```yaml
compatibility:
  enabled: true
  server:
    minimum-supported-client: "1.8"
    maximum-supported-client: "1.26+"
  integrations:
    viaversion: { enabled: true, required: false }
    viabackwards: { enabled: true, required: false }
    viarewind: { enabled: true, required: false }
  default-policy:
    allow-older-clients: true
    allow-newer-clients: true
    deny-unsupported-clients: true
  checks:
    on-join: true
    on-queue: true
    on-duel: true
    on-arena-entry: true
    on-mode-change: true
  modes:
    no-debuff:
      enabled: true
      min: "1.8"
      max: "1.26+"
      allow-older-clients: true
      allow-newer-clients: true
      incompatible-versions: []
```

**Cómo funciona:** define límites de versión por servidor y modo; activa integraciones ViaVersion/ViaBackwards/ViaRewind; `default-policy` decide cómo tratar clientes fuera del rango; `checks` determina en qué momentos validar; `modes` permite reglas específicas por modalidad.

### Ejemplo de kits.yml y arenas.yml

```yaml
kits:
  nodebuff:
    display-name: "&aNoDebuff"
    enabled: true
    ranked: true
    mode: nodebuff
    minimum-client-version: "1.8"
    maximum-client-version: "1.26+"
    contents: []
    armor: []
    health: 20.0
    food: 20
    build: false
```

```yaml
arenas:
  arena_1:
    enabled: true
    world: world
    spawn1:
      world: world
      x: 0.5
      y: 80.0
      z: 0.5
      yaw: 0.0
      pitch: 0.0
    spawn2:
      world: world
      x: 20.5
      y: 80.0
      z: 0.5
      yaw: 180.0
      pitch: 0.0
```

**Cómo funciona:** cada kit tiene ID, visibilidad, modalidad, límites de versión, inventario, armadura, salud, comida y construcción. Cada arena define mundo y dos ubicaciones completas. Los contenidos de inventario deben conservar el formato serializado que genera el plugin; usa la GUI/comandos del plugin para crear o editar cuando corresponda.

## Archivos YAML — referencia de configuración

Ruta: plugins/ApoloPractice/. Esta referencia cubre los archivos de recursos editables y los archivos que se generan al crear arenas/kits o guardar perfiles. No incluye plugin.yml.

### Archivos incluidos en el JAR

| Archivo | Rutas / opciones |
|---|---|
| config.yml | language establece idioma base de mensajes; debug activa registros de diagnóstico; storage.type admite sqlite, mysql o yaml; storage.mysql contiene host/port/database/username/password/SSL y parámetros del pool; modules controla perfiles, kits, arenas, duelos, colas, ranked, parties, espectadores, estadísticas, training y compatibilidad; replay define intervalo de snapshots y duración máxima; scoreboard.enabled controla la sidebar; training.default-difficulty fija dificultad; rewards.money-per-win define pago opcional por victoria vía Vault; combat.countdown-seconds, duel-request-expiry-seconds, restore-player-state y boxing-hits-to-win controlan cuenta atrás, caducidad de solicitudes, restauración y condición de victoria de Boxing. |
| compatibility.yml | global.enabled y límites min/max de versión del servidor; integration.via-version/via-backwards/via-rewind enabled/required; default-policy define qué hacer con clientes demasiado antiguos/nuevos/no admitidos; checks determina si validar al entrar, entrar a cola, iniciar duelo, entrar a arena o cambiar de modo; modes.<id> permite enabled, min/max, allow-older/allow-newer, listas de versiones incompatibles y mensaje de rechazo. |
| messages.yml | prefix y mensajes generales como no-permission, usage, reloaded, status y diagnósticos de compatibilidad. Los textos admiten MiniMessage. |
| permissions.yml | Descripción legible de apolopractice.use, apolopractice.admin y apolopractice.compatibility. El registro de nodos y valores por defecto se define en el descriptor del plugin y se resume en Comandos. |

### Archivos generados / editables en la carpeta del plugin

| Archivo/carpeta | Contenido y claves |
|---|---|
| kits.yml | Definiciones bajo kits.<id>. Cada kit permite display-name, enabled, ranked, mode, mínimo/máximo de versión de cliente, contents, armor, health, food y reglas de construcción. Se utiliza para modos estándar, Boxing, Spleef, Sumo y kits personalizados según el modo cargado. |
| arenas.yml | Registro bajo arenas.<id>: enabled, world, spawn1 y spawn2; cada spawn guarda world, x, y, z, yaw y pitch. Los spawns se establecen con /practice arena setspawn <id> 1|2. |
| profiles.db | SQLite cuando storage.type es sqlite. Conserva perfiles, rating, estadísticas y resultados. |
| profiles.yml | Perfiles individuales cuando storage.type es yaml. La importación inicial puede migrar los registros YAML a SQL. |
| replays/ | Archivos/snapshots visuales de las partidas. No es un log determinista de todos los paquetes/eventos de combate. |
| cosmetics/ | Datos de cosméticos/effecto de kill por UUID. |
| logs / archivos de recuperación | Diagnóstico y estados persistentes según el módulo activo; no editarlos manualmente salvo indicación de la documentación de esa versión. |

### Esquema de kits

Los kits se guardan en kits.yml bajo kits.<id>. Las claves importantes son:
- display-name: texto mostrado en la GUI.
- enabled: permite o desactiva ese kit.
- ranked: define si puede aparecer en matchmaking clasificado.
- mode: reglas de modo (estándar, boxing, spleef, sumo u otros compatibles).
- minimum-client-version y maximum-client-version: límites de protocolo para ese kit.
- contents y armor: inventario normal y armadura.
- health y food: atributos iniciales.
- build: permite reglas de construcción en modos que lo soportan.

La estructura de objetos debe respetar el formato que genera la versión instalada. Copia una definición existente y cambia IDs/materiales en lugar de inventar atributos desconocidos.

### Esquema de arenas

Cada arena se registra en arenas.yml y puede incluir:
- enabled: habilita o deshabilita la arena.
- world: nombre exacto del mundo.
- spawn1 y spawn2: ubicaciones de cada lado del duelo (world/x/y/z/yaw/pitch).

Los comandos arena list y arena setspawn consultan/actualizan esta información. Para revisar un mapa, valida ambos spawns y el mundo cargado antes de habilitarlo para cola/duelo.

### Cómo aplicar cambios

- /practice reload guarda estadísticas antes de recargar los archivos.
- /practice compatibility reload vuelve a leer los límites y reglas de compatibilidad.
- Los cambios de backend storage.type requieren reinicio.
- Cambios de kit/arena deben probarse con una partida privada antes de abrir colas ranked.
- Los cambios de NMS/entrenamiento, replay y compatibilidad necesitan validación en un servidor Paper real; una compilación de Maven no verifica estas funciones en juego.

