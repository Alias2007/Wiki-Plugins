<a id="yaml"></a>

# Archivos YAML

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

## Ejemplos reales

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


## Contenido íntegro de los archivos YAML

### `config.yml`

Contenido fuente del repositorio; se mantienen comentarios y estructura. Las contraseñas se sustituyen por seguridad.

```yaml
# ApoloRankUp - configuración general
# Los textos aceptan MiniMessage (<red>, <gradient:#00d2ff:#3a7bd5>...) y los códigos clásicos con &.

# Nivel inicial de los jugadores nuevos (debe existir en levels.yml).
default-level: 1

storage:
  # yaml   -> players.yml
  # sqlite -> base local (recomendado para un solo servidor)
  # mysql  -> base externa; permite compartir niveles entre varios servidores
  # Cambiar el tipo requiere reiniciar el servidor.
  type: sqlite
  # Cada cuánto se reintentan guardados fallidos y se escribe players.yml (ticks).
  # Los cambios de nivel se guardan al instante, esto es solo una red de seguridad.
  autosave-ticks: 6000
  # Solo MySQL: cada cuántos segundos se refrescan los niveles de los jugadores conectados
  # para ver cambios hechos desde otro servidor.
  sync-interval-seconds: 20
  table-prefix: "apolorankup_"
  sqlite:
    file: "players.db"
  mysql:
    host: "127.0.0.1"
    port: 3306
    database: "apolomc"
    username: "apolorankup"
    password: "REDACTED"
    use-ssl: false
    pool-size: 5
    connection-timeout-ms: 10000
    max-lifetime-ms: 1800000

top:
  # Segundos que se reutiliza el resultado de /rankup top antes de consultar de nuevo.
  cache-seconds: 30

locks:
  # Oculta del autocompletado los comandos que el jugador todavía no puede usar.
  hide-locked-commands: true
  # Si alguien está dentro de una zona o mundo que ya no puede pisar (al entrar al servidor, o porque le
  # bajaron el nivel), se lo lleva al spawn del mundo principal.
  eject-on-join: true

# Barrera de cristal en el borde de las zonas (regiones de WorldGuard) bloqueadas.
# Es solo visual y por jugador: la ve únicamente quien todavía no tiene el nivel; al subir de nivel
# desaparece para él y los demás jugadores nunca la ven. Solo reemplaza aire, nunca el terreno real.
# Necesita WorldGuard. Aunque la desactives, la zona sigue cerrada.
barrier:
  enabled: true
  material: RED_STAINED_GLASS
  # Hasta qué distancia (bloques) del jugador se dibuja la pared (3 a 16).
  radius: 8
  update-ticks: 10
  # Cada cuánto se reenvía la pared completa por si el cliente la perdió al recargar chunks.
  refresh-seconds: 5
  # Límite de bloques falsos por jugador.
  max-blocks: 1500

# Cómo se avisa cuando algo está bloqueado.
# Tipos: COMMAND, REGION_ENTER, REGION_BREAK, REGION_PLACE, WORLD, BLOCK_BREAK, BLOCK_PLACE,
#        ITEM_USE, ITEM_CRAFT, ENTITY_ATTACK  (o ALL)
notifications:
  chat-for: [COMMAND, ITEM_CRAFT]
  action-bar-for: [REGION_ENTER, REGION_BREAK, REGION_PLACE, WORLD, BLOCK_BREAK, BLOCK_PLACE, ITEM_USE, ENTITY_ATTACK]
  # Tiempo mínimo entre dos avisos del mismo tipo al mismo jugador.
  cooldown-ms: 1500
  # Sonido al toparse con un bloqueo (clave de Minecraft, vacío para desactivar).
  sound:
    key: "entity.villager.no"
    volume: 0.6
    pitch: 1.0

# Efectos al subir de nivel.
rankup-effects:
  title:
    enabled: true
    title: "<gradient:#00d2ff:#3a7bd5><bold>¡NIVEL %level%!</bold></gradient>"
    subtitle: "<gray>Ahora sos <white>%level_name%"
    fade-in-ticks: 10
    stay-ticks: 50
    fade-out-ticks: 20
  sound:
    enabled: true
    key: "entity.player.levelup"
    volume: 1.0
    pitch: 1.0
  particles:
    enabled: true
  broadcast:
    enabled: true
    # Solo se anuncia a partir de este nivel.
    min-level: 2

```

### `levels.yml`

Fuente vigente del repositorio para Paper 1.21.4 / Java 21. Cada nivel admite nombre, grupo LuckPerms existente, coste, requisitos combinables, recompensas y texto de presentación. Se conserva el formato anterior `requirements.items`; la referencia de los 15 tipos de requisitos y sus campos está en [Requisitos dinámicos](#requirements).

~~~yaml
# Niveles del rankup. Las claves son números; el jugador solo puede subir al siguiente
# nivel configurado por encima del suyo (los números no tienen que ser consecutivos).
#
# name:            nombre del rango (acepta MiniMessage / &).
# cost:            dinero necesario (requiere Vault + un plugin de economía).
# requirements:
#   items:         materiales que se consumen al ascender.
# rewards:         comandos que ejecuta la consola al ascender.
#                  Placeholders: %player% %uuid% %level% %level_name% %previous_level% %next_level%
# reward-display:  (opcional) texto que ve el jugador en el menú en lugar de los comandos.
# luckperms-group: nombre de un grupo QUE YA EXISTE en LuckPerms y pertenece al Track configurado.
#                  ApoloRankUp nunca crea ni agrega grupos/Tracks. Comprueba con /rankup luckperms check.
#
# Requisitos dinámicos: cada clave dentro de requirements (salvo items, formato antiguo) debe tener type.
# Tipos: vault(amount, consume), playtime(minutes|hours), level(amount), kills(amount), deaths(amount),
# blocks-broken(amount, material opcional), blocks-placed(amount, material opcional), mob-kills(amount),
# items(material, amount, consume), permissions(permission), luckperms-group(group),
# placeholder(placeholder, operator, value), statistic(statistic, amount, material/entity),
# quests(placeholder, operator, value), custom(placeholder, operator, value).
# Operators numéricos/texto: >=, >, <=, <, ==, !=. placeholder/quests/custom requieren PlaceholderAPI.
# Los requisitos de tipo items consumen por defecto (consume: true); usa consume: false para no consumirlos.
# vault también consume por defecto; el coste general 'cost' sigue siendo compatible.
#
# Qué se desbloquea con cada nivel (comandos, minas, mundos, bloques, ítems, mobs)
# se configura en unlocks.yml.

levels:
  '1':
    name: Novato
    luckperms-group: novato
    cost: 0
    requirements:
      items: {}
    rewards: []

  '2':
    name: Minero
    luckperms-group: minero
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
    luckperms-group: explorador
    cost: 500
    requirements:
      items:
        IRON_INGOT: 16
      playtime:
        type: playtime
        minutes: 60
    rewards:
      - "give %player% diamond 2"
    reward-display:
      - "2x Diamante"

  '4':
    name: Experto
    luckperms-group: experto
    cost: 2000
    requirements:
      items:
        GOLD_INGOT: 16
    rewards:
      - "give %player% emerald 4"
    reward-display:
      - "4x Esmeralda"

  '5':
    name: Maestro
    luckperms-group: maestro
    cost: 5000
    requirements:
      items:
        EMERALD: 16
    rewards:
      - "give %player% diamond 8"
    reward-display:
      - "8x Diamante"
~~~

### `menu.yml`

Contenido fuente del repositorio; se mantienen comentarios y estructura. Las contraseñas se sustituyen por seguridad.

```yaml
# Menú de /rankup menu
# size: múltiplo de 9 entre 9 y 54.
# Acciones: rankup, unlocks, top, refresh, close, none.
# Los ítems con id "rankup" y "unlocks" añaden solos requisitos, recompensas y próximos desbloqueos.
# Placeholders: %player% %level% %level_name% %max_level% %next_level% %next_level_name% %cost%
#               %progress% %progress_bar%
# Los textos aceptan MiniMessage y códigos con &. Si un ítem usa PLAYER_HEAD, muestra tu cabeza.

menu:
  title: "<dark_gray>ApoloMC <dark_gray>» <aqua>RankUp"
  size: 27
  filler:
    enabled: true
    material: BLACK_STAINED_GLASS_PANE
    name: " "
  items:
    current:
      slot: 11
      material: PLAYER_HEAD
      name: "<aqua><bold>Tu progreso"
      lore:
        - "<gray>Jugador: <white>%player%"
        - "<gray>Nivel: <yellow>%level% <dark_gray>» <white>%level_name%"
        - ""
        - "%progress_bar% <white>%progress%"
        - "<dark_gray>Nivel máximo: %max_level%"
      action: none
    rankup:
      slot: 13
      material: NETHER_STAR
      name: "<green><bold>¡Subir de nivel!"
      lore:
        - "<gray>Ascendé al siguiente rango."
        - ""
      action: rankup
    unlocks:
      slot: 15
      material: EMERALD
      name: "<aqua><bold>Desbloqueos"
      lore:
        - "<gray>Comandos, minas, dimensiones y más"
        - "<gray>se habilitan con tu nivel."
      action: unlocks
    top:
      slot: 21
      material: GOLDEN_HELMET
      name: "<gold><bold>Top 10"
      lore:
        - "<gray>Mirá quiénes van primeros."
      action: top
    close:
      slot: 23
      material: BARRIER
      name: "<red>Cerrar"
      lore: []
      action: close

```

### `messages.yml`

Contenido fuente del repositorio; se mantienen comentarios y estructura. Las contraseñas se sustituyen por seguridad.

```yaml
# Mensajes de ApoloRankUp. Aceptan MiniMessage y códigos clásicos con &.
# Si borras una clave, se usa el valor por defecto incluido en el plugin.

prefix: "<gradient:#00d2ff:#3a7bd5><bold>ApoloRankUp</bold></gradient> <dark_gray>» <reset>"

# Nombre de cada tipo de bloqueo (se usa en listados y menús).
lock-types:
  command: "Comando"
  region-enter: "Zona"
  region-break: "Romper en zona"
  region-place: "Construir en zona"
  world: "Dimensión"
  block-break: "Romper bloque"
  block-place: "Colocar bloque"
  item-use: "Usar ítem"
  item-craft: "Craftear"
  entity-attack: "Atacar mob"

messages:
  player-only: "%prefix%<red>Este comando solo puede usarlo un jugador."
  no-permission: "%prefix%<red>No tenés permiso para hacer eso."
  data-load-failed: "<red>No se pudieron cargar tus datos de RankUp.\n<gray>Intentá entrar de nuevo en unos segundos."
  help: |-
    <dark_gray><strikethrough>                                        </strikethrough>
    <gradient:#00d2ff:#3a7bd5><bold>ApoloRankUp</bold></gradient> <gray>- Comandos
    <white>/rankup <gray>- Intenta ascender de nivel.
    <white>/rankup menu <gray>- Abre el menú de progreso.
    <white>/rankup info [jugador] <gray>- Consulta un nivel.
    <white>/rankup unlocks [página] <gray>- Qué desbloqueás con cada nivel.
    <white>/rankup top <gray>- Muestra el top 10.
    <white>/rankup set \<jugador> \<nivel> <gray>- Establece un nivel.
    <white>/rankup add \<jugador> \<cantidad> <gray>- Avanza niveles.
    <white>/rankup reload <gray>- Recarga la configuración.
    <dark_gray><strikethrough>                                        </strikethrough>

  # --- Ascenso
  maximum-level: "%prefix%<yellow>Ya alcanzaste el máximo nivel: <aqua>%level% <gray>(%level_name%)<yellow>."
  economy-unavailable: "%prefix%<red>Este ascenso cuesta dinero, pero no se detectó Vault con una economía compatible."
  not-enough-money: "%prefix%<red>No tenés suficiente dinero. Necesitás <yellow>%cost%<red> y tenés <yellow>%balance%<red>."
  payment-failed: "%prefix%<red>No se pudo procesar el pago. No se consumió nada."
  not-enough-items: "%prefix%<red>Necesitás <yellow>%amount%x %item%<red>. Te faltan <yellow>%missing%<red>."
  rankup-success: "%prefix%<green>¡Ascendiste al nivel <yellow>%level% <gray>(%level_name%)<green>!"
  rankup-broadcast: "%prefix%<white>%player% <gray>subió al nivel <aqua>%level% <gray>(%level_name%)<gray>."
  rankup-unlocks-header: "%prefix%<gray>Nuevos desbloqueos:"
  rankup-unlock-line: "  <green>✔ <white>%target% <dark_gray>(%type%)"

  # --- Bloqueos (%level%, %level_name%, %player_level%, %target%, %player%)
  locked-command: "%prefix%<red>Necesitás el nivel <yellow>%level% <gray>(%level_name%)<red> para usar <yellow>%target%<red>. Tu nivel: <yellow>%player_level%<red>."
  locked-region-enter: "<red>🔒 <white>%target% <gray>- necesitás el nivel <yellow>%level% <gray>(tenés %player_level%)"
  locked-region-break: "<red>🔒 <gray>No podés romper en <white>%target% <gray>hasta el nivel <yellow>%level%"
  locked-region-place: "<red>🔒 <gray>No podés construir en <white>%target% <gray>hasta el nivel <yellow>%level%"
  locked-world: "<red>🔒 <white>%target% <gray>- necesitás el nivel <yellow>%level% <gray>(tenés %player_level%)"
  locked-block-break: "<red>🔒 <gray>Necesitás el nivel <yellow>%level% <gray>para romper <white>%target%"
  locked-block-place: "<red>🔒 <gray>Necesitás el nivel <yellow>%level% <gray>para colocar <white>%target%"
  locked-item-use: "<red>🔒 <gray>Necesitás el nivel <yellow>%level% <gray>para usar <white>%target%"
  locked-item-craft: "%prefix%<red>Necesitás el nivel <yellow>%level% <red>para craftear <white>%target%<red>."
  locked-entity-attack: "<red>🔒 <gray>Necesitás el nivel <yellow>%level% <gray>para atacar a <white>%target%"

  # --- Información
  info-console-usage: "%prefix%<gray>Desde consola usá <white>/rankup info \\<jugador><gray>."
  info-header: "%prefix%<aqua>Progreso de <white>%player%<aqua>:"
  info-current: "  <gray>Nivel actual: <yellow>%level% <dark_gray>» <white>%level_name%"
  info-progress: "  <gray>Progreso: %progress_bar% <white>%progress%"
  info-maximum: "  <green>Ya alcanzó el máximo nivel configurado."
  info-next: "  <gray>Siguiente: <yellow>%level% <dark_gray>» <white>%level_name% <gray>| Coste: <gold>%cost%"
  info-item: "    <dark_gray>• <gray>%item%: <white>%amount%"

  # --- Desbloqueos
  unlocks-empty: "%prefix%<gray>Todavía no hay desbloqueos configurados."
  unlocks-header: "%prefix%<aqua>Desbloqueos <gray>(tu nivel: <yellow>%level% <dark_gray>» <white>%level_name%<gray>)"
  unlocks-line-open: "  <green>✔ <gray>Nv. <yellow>%level% <dark_gray>» <white>%target% <dark_gray>(%type%)"
  unlocks-line-locked: "  <red>✘ <gray>Nv. <yellow>%level% <dark_gray>» <gray>%target% <dark_gray>(%type%)"
  unlocks-footer: "  <dark_gray>Página %page%/%pages% - /rankup unlocks \\<página>"

  # --- Administración
  reloaded: "%prefix%<green>Configuración, mensajes, niveles y desbloqueos recargados."
  usage-set: "%prefix%<red>Uso: /rankup set \\<jugador> \\<nivel>"
  usage-add: "%prefix%<red>Uso: /rankup add \\<jugador> \\<cantidad>"
  invalid-number: "%prefix%<red>Ingresá un número válido mayor que cero."
  invalid-level: "%prefix%<red>El nivel <yellow>%level% <red>no existe en levels.yml."
  level-set: "%prefix%<green>Nivel de <white>%player% <green>actualizado a <yellow>%level% <gray>(%level_name%)<green>."
  player-not-found: "%prefix%<red>No conozco a <yellow>%player%<red>: nunca entró al servidor."
  lookup-error: "%prefix%<red>No se pudo consultar la base de datos. Mirá la consola."

  # --- Top
  top-error: "%prefix%<red>No se pudo consultar el top. Mirá la consola."
  top-empty: "%prefix%<gray>Todavía no hay datos de jugadores para mostrar."
  top-header: "%prefix%<aqua>Top 10 de RankUp:"
  top-entry: "  <yellow>%position%. <white>%player% <dark_gray>» <aqua>Nivel %level% <dark_gray>(%level_name%)"

  # --- Menú (líneas dinámicas del lore)
  menu-max-level: "<green>Ya alcanzaste el máximo nivel."
  menu-next-level: "<gray>Siguiente: <yellow>Nivel %next_level% <dark_gray>» <white>%next_level_name%"
  menu-requirements-title: "<gray>Requisitos:"
  menu-req-money-ok: "  <green>✔ <gray>Dinero: <white>%cost%"
  menu-req-money-miss: "  <red>✘ <gray>Dinero: <red>%balance% <dark_gray>/ <white>%cost%"
  menu-req-item-ok: "  <green>✔ <gray>%item%: <white>%have%<dark_gray>/<white>%needed%"
  menu-req-item-miss: "  <red>✘ <gray>%item%: <red>%have%<dark_gray>/<white>%needed%"
  menu-unlocks-next-title: "<gray>Vas a desbloquear:"
  menu-unlock-line: "  <aqua>★ <white>%target% <dark_gray>(%type%)"
  menu-rewards-title: "<gray>Recompensas:"
  menu-reward-count: "  <gold>• <white>%count% recompensa(s)"
  menu-reward-line: "  <gold>• <white>%reward%"
  menu-click-to-rankup: "<green>▶ Click para ascender"
  menu-requirements-missing: "<red>✘ Todavía te faltan requisitos"
  menu-upcoming-title: "<gray>Próximos desbloqueos:"
  menu-upcoming-line: "  <gray>Nv. <yellow>%lock_level% <dark_gray>» <white>%target% <dark_gray>(%type%)"
  menu-upcoming-more: "  <dark_gray>...y %count% más"
  menu-upcoming-none: "<green>¡Ya desbloqueaste todo!"
  menu-upcoming-hint: "<yellow>▶ Click para ver la lista completa"

```

### `unlocks.yml`

Fuente vigente del repositorio. Define restricciones de comandos, regiones WorldGuard, mundos, bloques, uso/crafteo de objetos y ataques a entidades. Las entradas admiten formato corto o completo con nivel, nombre y mensaje.

~~~yaml
# ─────────────────────────────────────────────────────────────────────────────
#  Desbloqueos por nivel
#  Mientras el jugador no tenga el nivel indicado, no puede hacer lo que se lista aquí.
#
#  Cada entrada se puede escribir corta:        CLAVE: 3
#  o completa:                                  CLAVE: { level: 3, name: "Nombre bonito", message: "texto propio" }
#
#  Puedes usar comodines en materiales y entidades:  "*_ORE", "DIAMOND_*", "*_SWORD"
#  Una entrada exacta siempre gana sobre un comodín.
#
#  Permisos para saltarse bloqueos (por defecto solo OP):
#    apolorankup.bypass   (todo)   apolorankup.bypass.commands  .regions  .worlds  .blocks  .items  .entities
#
#  Mensajes: messages.yml (locked-*). Un "message" propio puede usar %level% %level_name%
#  %player_level% %target% %player%.
# ─────────────────────────────────────────────────────────────────────────────

enabled: true

# Comandos (sin "/"). Se bloquean también sus alias y la forma plugin:comando,
# y desaparecen del autocompletado hasta que el jugador tenga el nivel.
commands:
  shop:
    level: 3
  ah:
    level: 5
    name: "/ah (subastas)"

# Regiones de WorldGuard (usa el ID exacto de la región).
# restrict: qué se bloquea dentro de la región -> enter (entrar), break (romper), place (colocar).
regions:
  mina_a:
    name: "Mina A"
    level: 1
  mina_b:
    name: "Mina B"
    level: 3
  mina_c:
    name: "Mina C"
    level: 5
  # Ejemplo: una zona que se puede ver pero no construir hasta el nivel 4.
  # spawn_vip:
  #   name: "Zona VIP"
  #   level: 4
  #   restrict: [break, place]

# Mundos / dimensiones (nombre exacto del mundo).
worlds:
  world_nether:
    name: "El Nether"
    level: 3
  world_the_end:
    name: "El End"
    level: 5

# Bloques que se pueden romper o colocar.
blocks:
  break:
    DIAMOND_ORE: 4
    DEEPSLATE_DIAMOND_ORE: 4
    ANCIENT_DEBRIS:
      level: 5
      name: "Restos antiguos"
    SPAWNER:
      level: 5
      name: "Spawners"
  place:
    TNT: 4
    RESPAWN_ANCHOR: 5

# Ítems: usar (clic derecho, comer/beber, planear con élitros) y craftear.
items:
  use:
    ELYTRA: 5
    ENDER_PEARL: 3
    TRIDENT: 4
  craft:
    ENCHANTING_TABLE: 3
    "DIAMOND_*": 4

# Mobs que no se pueden atacar (cuerpo a cuerpo ni con proyectiles).
entities:
  attack:
    WARDEN:
      level: 5
      name: "Warden"
    ENDER_DRAGON: 5
    WITHER: 5
~~~

### levels-menu.yml — menú principal configurable

Este archivo nuevo controla `/rankup` y `/rankup menu`; no modifica `menu.yml`, que queda para `/rankup overview`.

| Ruta | Función |
|---|---|
| `menu.title` | Título. |
| `menu.size` | Tamaño de 9 a 54 slots, múltiplo de 9. Valor inválido: vuelve a 54. |
| `menu.filler.enabled/material/name` | Panel de relleno. |
| `menu.levels.slots` | Slots ordenados de los niveles; su cantidad determina niveles por página. Slots fuera de rango se ignoran y duplicados se eliminan. |
| `menu.levels.states.unlocked/next/locked` | Material, nombre y lore para cada estado. |
| `menu.buttons.previous/next/close/unlocks/profile/top` | Slot, material, nombre, lore y visibilidad de botones. |

Placeholders: `%player%`, `%level%`, `%level_name%`, `%max_level%`, `%next_level%`, `%next_level_name%`, `%progress%`, `%target_level%`, `%target_name%`, `%page%` y `%pages%`. Si no queda ningún slot de nivel válido, se usa la distribución predeterminada de 45 slots. Aplicá cambios con `/rankup reload`.
