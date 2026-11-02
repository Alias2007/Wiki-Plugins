# ApoloRankUp

> Sistema de progresión por niveles: requisitos, costes, ascensos y contenido que se habilita al avanzar.

<a id="overview"></a>
## Resumen

ApoloRankUp controla el progreso de los jugadores mediante niveles configurables. El nivel puede restringir comandos, mundos, regiones, bloques, objetos y entidades. Los requisitos se definen en archivos YAML y el sistema admite almacenamiento local o SQL.

<a id="levels"></a>
## Niveles y ascensos

El archivo levels.yml contiene la escalera de niveles bajo levels.<número>. Los números no tienen que ser consecutivos: al ascender, el plugin busca el siguiente nivel numérico configurado por encima del nivel actual.

Cada nivel admite:

| Clave | Tipo / significado |
|---|---|
| name | Nombre visible del rango; admite MiniMessage y códigos &. |
| cost | Coste económico. Requiere Vault y un proveedor de economía cuando es mayor que cero. |
| requirements.items | Mapa de materiales y cantidades que el jugador debe tener; los objetos se consumen al ascender. |
| rewards | Lista de comandos ejecutados por consola cuando el ascenso termina. |
| reward-display | Lista de textos mostrados en el menú en lugar de exponer comandos internos. |

Ejemplo:
~~~yaml
levels:
  '3':
    name: Explorador
    cost: 500
    requirements:
      items:
        IRON_INGOT: 16
    rewards:
      - "give %player% diamond 2"
    reward-display:
      - "2x Diamante"
~~~

El plugin comprueba dinero y objetos antes de procesar la subida. Si el proveedor Vault no está disponible y el nivel tiene coste, el ascenso se bloquea sin consumir materiales. Al completar el nivel se ejecutan las recompensas y se actualizan los comandos del jugador conectado.



<a id="unlocks"></a>
## Desbloqueos por nivel

unlocks.yml determina las acciones bloqueadas hasta que el jugador alcance el nivel requerido.

| Sección | Control |
|---|---|
| commands | Comandos, alias y forma plugin:comando; los bloqueados también se ocultan del autocompletado. |
| regions | Regiones WorldGuard; restrict admite enter, break y place. |
| worlds | Mundos y dimensiones; también se comprueba acceso por portal o teletransporte. |
| blocks.break | Materiales que no se pueden romper antes del nivel requerido. |
| blocks.place | Materiales que no se pueden colocar antes del nivel requerido. |
| items.use | Uso de objetos, clic derecho, comer/beber y planeo con élitros. |
| items.craft | Recetas que no se pueden fabricar. |
| entities.attack | Entidades que no se pueden atacar. |

Cada regla puede escribirse corta (CLAVE: 3) o completa:
~~~yaml
commands:
  shop:
    level: 3
    name: "Tienda"
    message: "Necesitás el nivel %level% para entrar."
regions:
  mina_vip:
    name: "Mina VIP"
    level: 5
    restrict: [enter, break, place]
blocks:
  break:
    ANCIENT_DEBRIS:
      level: 5
      name: "Restos antiguos"
  place:
    TNT: 4
items:
  use:
    ELYTRA: 5
  craft:
    ENCHANTING_TABLE: 3
entities:
  attack:
    WARDEN:
      level: 5
      name: "Warden"
~~~

En comandos se escribe el nombre sin /; el plugin también reconoce alias y la forma namespaced. En regiones debe usarse el ID exacto de WorldGuard, no el nombre visible. Los comodines de materiales/entidades admiten patrones como *_ORE, DIAMOND_* y *_SWORD; una regla exacta tiene prioridad sobre el comodín.

Una regla completa puede incluir name y message. Para los mensajes propios se admiten %level%, %level_name%, %player_level%, %target% y %player%. Los mensajes generales de bloqueo se personalizan en messages.yml.



<a id="commands"></a>
## Comandos y permisos

El comando principal es /rankup; el alias registrado es /ru.

| Comando | Permiso | Descripción |
|---|---|---|
| /rankup | apolorankup.use | Intenta ascender al siguiente nivel configurado. |
| /rankup menu | apolorankup.use | Abre el menú de progreso, requisitos, recompensas y desbloqueos. |
| /rankup unlocks [página] | apolorankup.use | Lista los desbloqueos y los niveles necesarios; 10 entradas por página. |
| /rankup info [jugador] | propio: uso público; otro jugador: apolorankup.admin | Muestra nivel actual, progreso, siguiente nivel, coste y materiales. |
| /rankup top | público | Muestra el top 10 por nivel. |
| /rankup reload | apolorankup.admin | Recarga configuración, mensajes, niveles y desbloqueos. |
| /rankup set <jugador> <nivel> | apolorankup.admin | Establece un nivel existente. |
| /rankup add <jugador> <cantidad> | apolorankup.admin | Avanza una cantidad de posiciones dentro de la escalera configurada. |

### Permisos de bypass

| Permiso | Alcance |
|---|---|
| apolorankup.bypass | Omite todos los bloqueos. |
| apolorankup.bypass.commands | Omite bloqueos de comandos. |
| apolorankup.bypass.regions | Omite bloqueos de regiones WorldGuard. |
| apolorankup.bypass.worlds | Omite bloqueos de mundos/dimensiones. |
| apolorankup.bypass.blocks | Omite bloqueos de romper/colocar bloques. |
| apolorankup.bypass.items | Omite bloqueos de usar/craftear objetos. |
| apolorankup.bypass.entities | Omite bloqueos de ataque a entidades. |

Los permisos de bypass se entregan por defecto a OP según el registro del plugin. No concedas el bypass general si solo necesitas liberar una categoría.



<a id="config"></a>
## Configuración y datos

La carpeta de trabajo es plugins/ApoloRankUp/. El plugin requiere Paper y Java 21; Vault se utiliza cuando un nivel cobra dinero y WorldGuard para bloqueos de región.

| Archivo | Uso |
|---|---|
| config.yml | Nivel inicial, almacenamiento, caché, bloqueos, barreras visuales, notificaciones y efectos de ascenso. |
| levels.yml | Definición de niveles, costes, requisitos y recompensas. |
| unlocks.yml | Comandos, regiones, mundos, bloques, objetos y entidades bloqueados por nivel. |
| menu.yml | Diseño del menú gráfico de RankUp. |
| messages.yml | Textos del jugador y administración. |
| players.db | Datos SQLite cuando storage.type es sqlite. |
| players.yml | Persistencia YAML cuando storage.type es yaml. |

### Integraciones y comportamiento

- Vault: se consulta para cobrar cost en levels.yml. Si no hay un proveedor compatible y el nivel cuesta dinero, el ascenso no se procesa.
- WorldGuard: regions en unlocks.yml se relaciona con el ID exacto de región. La barrera de cristal opcional es visual y por jugador; no reemplaza ni modifica el terreno real. Aunque barrier.enabled esté desactivado, el bloqueo de la región sigue vigente.
- SQL: SQLite es la opción local recomendada para un solo servidor; MySQL permite compartir niveles entre servidores. Cambiar el backend requiere reiniciar y planificar migración/copias de seguridad.
- El caché de /rankup top se controla en config.yml top.cache-seconds.



<a id="yaml"></a>

### Ejemplo real: config.yml

```yaml
default-level: 1
storage:
  type: sqlite
  autosave-ticks: 6000
  sync-interval-seconds: 20
  table-prefix: "apolorankup_"
  sqlite:
    file: "players.db"
  mysql:
    host: "127.0.0.1"
    port: 3306
    database: "apolomc"
    username: "apolorankup"
    password: "CHANGE_ME"
    use-ssl: false
    pool-size: 5
top:
  cache-seconds: 30
locks:
  hide-locked-commands: true
  eject-on-join: true
barrier:
  enabled: true
  material: RED_STAINED_GLASS
  radius: 8
  update-ticks: 10
notifications:
  chat-for: [COMMAND, ITEM_CRAFT]
  action-bar-for: [REGION_ENTER, REGION_BREAK, REGION_PLACE, WORLD]
  cooldown-ms: 1500
rankup-effects:
  title:
    enabled: true
    fade-in-ticks: 10
    stay-ticks: 50
    fade-out-ticks: 20
  sound:
    enabled: true
  particles:
    enabled: true
  broadcast:
    enabled: true
    min-level: 2
```

**Cómo funciona:** `default-level` debe existir en levels.yml; `storage.type` elige sqlite/yaml/mysql; los parámetros mysql solo se usan con MySQL; `top.cache-seconds` guarda temporalmente el top; `locks` decide cómo se muestran/aplican bloqueos; `barrier` dibuja una barrera visual por jugador; `notifications` decide canal y espera entre avisos; `rankup-effects` controla título, sonido, partículas y anuncio. No publiques credenciales.

### Ejemplo real: levels.yml

```yaml
levels:
  '1':
    name: Novato
    cost: 0
    requirements:
      items: {}
    rewards: []
  '2':
    name: Minero
    cost: 0
    requirements:
      items:
        COBBLESTONE: 32
    rewards:
      - "give %player% coal 8"
    reward-display:
      - "8x Carbón"
  '3':
    name: Explorador
    cost: 500
    requirements:
      items:
        IRON_INGOT: 16
    rewards:
      - "give %player% diamond 2"
    reward-display:
      - "2x Diamante"
```

**Cómo funciona:** cada clave numérica define un nivel; `name` es el nombre visible; `cost` requiere Vault y economía; `requirements.items` son materiales requeridos; `rewards` son comandos de consola; `reward-display` muestra el premio en el menú. El ascenso usa el siguiente ID existente.

### Ejemplo real: unlocks.yml

```yaml
enabled: true
commands:
  shop:
    level: 3
  ah:
    level: 5
    name: "/ah (subastas)"
regions:
  mina_a:
    name: "Mina A"
    level: 1
  mina_b:
    name: "Mina B"
    level: 3
worlds:
  world_nether:
    name: "El Nether"
    level: 3
blocks:
  break:
    DIAMOND_ORE: 4
  place:
    TNT: 4
items:
  use:
    ENDER_PEARL: 3
  craft:
    ENCHANTING_TABLE: 3
entities:
  attack:
    WARDEN: 5
```

**Cómo funciona:** `enabled` activa el sistema; `commands`, `regions`, `worlds`, `blocks`, `items` y `entities` establecen nivel mínimo por acción. Los IDs de regiones deben coincidir con WorldGuard; los materiales y entidades usan nombres Bukkit; se admiten comodines según la guía.

## Archivos YAML — referencia de configuración

Ruta: plugins/ApoloRankUp/. Esta página cubre los cinco archivos configurables del proyecto; excluye plugin.yml.

### config.yml — ajustes generales

| Ruta | Función y valores |
|---|---|
| default-level | Nivel asignado a jugadores nuevos. Debe existir en levels.yml. |
| storage.type | yaml, sqlite o mysql. El tipo define dónde se guardan los perfiles. Reiniciar al cambiarlo. |
| storage.autosave-ticks | Intervalo de seguridad de guardado en ticks; cambios de nivel se guardan al instante. |
| storage.sync-interval-seconds | Solo MySQL: intervalo para refrescar niveles de jugadores conectados que pueden cambiar desde otro servidor. |
| storage.table-prefix | Prefijo para tablas SQL. |
| storage.sqlite.file | Nombre/ruta del archivo SQLite; por defecto players.db. |
| storage.mysql.host/port/database/username/password/use-ssl | Datos de conexión MySQL. No publiques ni compartas password. |
| storage.mysql.pool-size | Máximo de conexiones del pool. |
| storage.mysql.connection-timeout-ms | Tiempo máximo para establecer una conexión. |
| storage.mysql.max-lifetime-ms | Vida máxima de una conexión del pool. |
| top.cache-seconds | Segundos que se reutiliza el resultado de /rankup top. |
| locks.hide-locked-commands | Oculta comandos bloqueados del autocompletado. |
| locks.eject-on-join | Envía al spawn principal a jugadores que reaparecen dentro de zonas/mundos para los que ya no tienen nivel. |
| barrier.enabled | Activa la pared visual por jugador frente a bordes de región bloqueados. WorldGuard requerido. Desactivarla no abre la región. |
| barrier.material | Material de la barrera; por defecto RED_STAINED_GLASS. |
| barrier.radius | Distancia de dibujo, de 3 a 16 bloques. |
| barrier.update-ticks | Frecuencia de actualización de la pared. |
| barrier.refresh-seconds | Intervalo de reenvío completo de la pared para recuperar cambios de chunks. |
| barrier.max-blocks | Límite de bloques falsos por jugador. |
| notifications.chat-for | Lista de tipos de bloqueo que notifican en chat. |
| notifications.action-bar-for | Lista de tipos de bloqueo que notifican en actionbar. |
| notifications.cooldown-ms | Tiempo mínimo entre avisos del mismo tipo al mismo jugador. |
| notifications.sound.key/volume/pitch | Sonido al chocar contra un bloqueo; key vacío lo desactiva. |
| rankup-effects.title | enabled, title, subtitle, fade-in-ticks, stay-ticks y fade-out-ticks del título al ascender. |
| rankup-effects.sound | enabled, key, volume y pitch del sonido de ascenso. |
| rankup-effects.particles.enabled | Activa partículas al subir de nivel. |
| rankup-effects.broadcast.enabled/min-level | Controla anuncio global y nivel mínimo para anunciar. |

Los tipos de notificación incluyen COMMAND, REGION_ENTER, REGION_BREAK, REGION_PLACE, WORLD, BLOCK_BREAK, BLOCK_PLACE, ITEM_USE, ITEM_CRAFT y ENTITY_ATTACK; también puede usarse ALL según las listas aceptadas por el sistema.

Ejemplo MySQL: cambia type a mysql y completa host/port/database/username/password. Mantén las credenciales solo en el servidor y reinicia para aplicar el backend.

### levels.yml — escalera de progreso

El nivel se define bajo levels.<id>. Las claves son numéricas, pero pueden saltarse números; el siguiente ascenso utiliza el siguiente ID existente por encima del nivel actual.

| Clave | Uso |
|---|---|
| name | Nombre visible del nivel. |
| cost | Dinero requerido; Vault + economía compatibles. |
| requirements.items | Materiales Bukkit y cantidades que deben entregarse/consumirse. |
| rewards | Comandos ejecutados por la consola después del ascenso. |
| reward-display | Textos visibles en GUI para describir premios sin enseñar comandos internos. |

Placeholders válidos en comandos de recompensa: %player%, %uuid%, %level%, %level_name%, %previous_level% y %next_level%. Las claves de levels.yml no configuran bloqueos; esos van en unlocks.yml.

### unlocks.yml — restricciones por nivel

| Ruta | Qué controla |
|---|---|
| enabled | Interruptor global de bloqueos. |
| commands.<comando>.level | Nivel mínimo para ejecutar el comando. Admite name y message opcionales. |
| regions.<id>.level/name/restrict | Nivel mínimo y restricciones de WorldGuard. restrict: enter, break y/o place. |
| worlds.<world>.level/name | Acceso a un mundo o dimensión. |
| blocks.break.<material> | Nivel mínimo para romper ese material. |
| blocks.place.<material> | Nivel mínimo para colocar ese material. |
| items.use.<material> | Nivel mínimo para usar un objeto. |
| items.craft.<material> | Nivel mínimo para fabricar una receta/objeto. |
| entities.attack.<entity> | Nivel mínimo para atacar esa entidad. |

Formato corto (material: 4) o extendido:
~~~yaml
ANCIENT_DEBRIS:
  level: 5
  name: "Restos antiguos"
~~~
El nombre se usa en mensajes/listados. Para comandos se debe omitir la barra inicial. Los nombres de regiones deben coincidir exactamente con WorldGuard. Los comodines admiten patrones como *_ORE y DIAMOND_*; una regla exacta tiene prioridad sobre un comodín. Bypass: apolorankup.bypass o uno de los permisos por categoría.

### menu.yml — GUI de RankUp

| Ruta | Función |
|---|---|
| menu.title | Título del menú. |
| menu.size | Tamaño, múltiplo de 9, entre 9 y 54 slots. |
| menu.filler.enabled/material/name | Panel de relleno. |
| menu.items.<id>.slot/material/name/lore | Ubicación, icono, título y lore de cada botón. |
| menu.items.<id>.action | Acción: rankup, unlocks, top, refresh, close o none. |

Los IDs rankup y unlocks pueden añadir automáticamente requisitos, recompensas y próximos desbloqueos. PLAYER_HEAD muestra la cabeza del jugador.

Placeholders de menú: %player%, %level%, %level_name%, %max_level%, %next_level%, %next_level_name%, %cost%, %progress% y %progress_bar%.

### messages.yml — textos, mensajes y variables

- prefix define el prefijo general.
- lock-types cambia las etiquetas de cada clase de bloqueo (command, region-enter, region-break, region-place, world, block-break, block-place, item-use, item-craft, entity-attack).
- messages contiene cadenas por clave: ayuda, errores, ascenso, avisos, top, info, unlocks y menú.
- Se admiten MiniMessage y códigos clásicos &.
- Si se elimina una clave, el plugin usa el valor predeterminado incluido en el código.

Tokens usados en los mensajes incluyen %prefix%, %player%, %level%, %level_name%, %cost%, %balance%, %item%, %amount%, %missing%, %progress%, %progress_bar%, %next_level%, %target%, %type%, %page%, %pages%, %position%, %uuid% y otros relacionados con la clave específica. No todos los tokens se aplican a cada mensaje; respeta los placeholders que correspondan a la línea que estás editando.

### Datos generados

- players.db: SQLite cuando storage.type: sqlite.
- players.yml: perfiles cuando storage.type: yaml.
- Las tablas MySQL utilizan el table-prefix configurado.
- Los backups deben realizarse antes de cambiar el tipo de almacenamiento.

