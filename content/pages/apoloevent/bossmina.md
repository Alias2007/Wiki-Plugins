# BossMina — bosses automáticos de minas

BossMina es un sistema separado del evento Boss principal. Utiliza sus propios archivos, comandos, horarios y recompensas. No configures estos bosses en `events/boss.yml`.

## Archivos

```text
plugins/ApoloEvent/
├── BossMina/
│   ├── config.yml
│   ├── rewards.yml
│   ├── state.yml
│   └── bosses/
│       ├── mina.yml
│       ├── mina_nether.yml
│       ├── warden_ancestral.yml
│       └── caballero_carmesi.yml
├── mine-events.yml
└── mine-boss-kill.yml
```

- `config.yml`: regiones, anuncios, webhook, barra, holograma, sonidos, horarios y ajustes globales.
- `bosses/<id>.yml`: entidad, nombre, vida, daño, IA, habilidades, fases, guardianes, efectos y equipo de cada boss.
- `rewards.yml`: objetos adicionales y probabilidades por boss.
- `state.yml`: estado y datos de recuperación/cooldowns; no editar manualmente.

Los perfiles individuales tienen prioridad sobre valores globales. Las instalaciones antiguas reciben valores por defecto sin borrar los ajustes previos. Conserva respaldos.

## Configurar un boss

Cada YAML dentro de `BossMina/bosses/` es un perfil. El ID es el nombre del archivo sin extensión.

```yaml
id: mina_nether
boss:
  entity: WITHER_SKELETON
  name: '&5&lGUARDIÁN DEL NETHER'
  max-health: 2500
  attack-damage: 18
  scale: 1.0

equipment:
  enabled: true
  helmet:
    material: NETHERITE_HELMET
    enchantments:
      PROTECTION: 4
      UNBREAKING: 3
  chestplate:
    material: NETHERITE_CHESTPLATE
  leggings:
    material: NETHERITE_LEGGINGS
  boots:
    material: NETHERITE_BOOTS
  main-hand:
    material: NETHERITE_SWORD
    name: '&5&lEspada del Nether'
    lore:
      - '&7Arma exclusiva del boss'
    unbreakable: true
    enchantments:
      SHARPNESS: 5
      FIRE_ASPECT: 2
      UNBREAKING: 3
  off-hand: SHIELD
```

La sección `equipment` permite casco, pechera, pantalones, botas, mano principal y secundaria. Los objetos aceptan material, cantidad, nombre, lore, encantamientos, irrompible y custom model data. Se puede usar un material simple, como `main-hand: DIAMOND_AXE`, o `NONE` para dejar una ranura vacía. El equipamiento visible depende del tipo de entidad; por ejemplo, Wither Skeleton y Piglin Brute admiten armadura/armas, mientras Ravager y Warden no exponen ranuras visibles. El equipo del boss no se suelta al morir.

## Barra y holograma

En `BossMina/config.yml`:

```yaml
boss-bar:
  enabled: true
  visible-range: 48.0
  title: '&5&l{boss} &8| &f{health}&7/&f{max-health} HP &8({percent}%)'
  color: PURPLE
  style: SEGMENTED_10

hologram:
  enabled: true
  visible-range: 48.0
  y-offset: 3.1
  line-spacing: 0.28
  update-interval-ticks: 10
  lines:
    - '&6&l✦ {boss} ✦'
    - '&c❤ &f{health}&7/&f{max-health} HP'
    - '&7{mine}'
```

Variables: `{boss}`, `{health}`, `{max-health}`, `{percent}`, `{mine}`. Los efectos visuales y sonidos generales se configuran en las secciones `visuals` y `sounds`; un perfil puede sobrescribir opciones admitidas.

## Horarios automáticos

En `BossMina/config.yml`:

```yaml
mine-events:
  schedule:
    enabled: true
    time:
      - "12:00"
      - "18:00"
    timezone: "America/Argentina/Buenos_Aires"
    random-bosses:
      - mina
      - mina_nether
      - warden_ancestral
      - caballero_carmesi
    catch-up-if-server-starts-late: false
    skip-if-any-boss-active: true
```

- `enabled`: activa los horarios.
- `time`: lista de horarios diarios `HH:mm`; cada horario hace un sorteo independiente. También se admite el formato antiguo `time: "12:00"`.
- `timezone`: zona IANA, por ejemplo `America/Argentina/Buenos_Aires` o `America/Santiago`.
- `random-bosses`: IDs de los archivos permitidos en `bosses/`, sin `.yml`.
- `catch-up-if-server-starts-late`: ejecuta el horario pendiente al iniciar tarde si está en `true`.
- `skip-if-any-boss-active`: omite un horario si ya hay un boss activo o pendiente.

El plugin guarda fecha/horario procesado para evitar duplicados tras reinicios o recargas.

## Recompensas adicionales

Archivo: `plugins/ApoloEvent/BossMina/rewards.yml`. Cada perfil se define por ID:

```yaml
no-drop-message: '&7{player} derrotó a {boss}, pero no obtuvo recompensa adicional.'

bosses:
  mina_nether:
    enabled: true
    chance-percent: 100
    mine-name: '&5Mina Nether'
    broadcast-message: '&6{player} &7derrotó a {boss} de {mine} y obtuvo &e{item}&7.'
    items:
      - material: NETHERITE_INGOT
        amount: 1
        chance-percent: 15
        name: '&5&lLingote ancestral'
        lore:
          - '&7Recompensa exclusiva'
        enchantments: {}
        unbreakable: false
      - material: BLAZE_ROD
        amount: 8
        chance-percent: 40
        name: '&6Fragmentos ígneos'
```

- `enabled`: activa/desactiva la tabla del boss.
- `chance-percent` del perfil: probabilidad general (0–100).
- `mine-name`: nombre de mina en los mensajes.
- `broadcast-message`: anuncio cuando cae un objeto; puede ser global o específico.
- `items`: lista de objetos posibles.
- Cada objeto admite `material`, `amount`, `chance-percent`, `name`, `lore`, `enchantments` y `unbreakable`.

Primero se comprueba la probabilidad general. Luego se mezclan las entradas y se revisan sus probabilidades individuales en orden aleatorio. **Como máximo cae un objeto adicional por muerte.** Si ninguna opción pasa, no hay drop adicional. Si falta el `chance-percent` individual, su valor es 0.

Variables de mensajes: `{player}`, `{boss}`, `{mine}`, `{item}`. `no-drop-message` es global y puede dejarse vacío para desactivar el aviso.

Consulta [Recompensas BossMina](#apoloevent/rewards) para la referencia completa. Para el Boss principal usa [Boss normal](#apoloevent/normal-boss): su sistema de recompensas es distinto.

## Comandos

- `/bossmina list`: muestra IDs y estado.
- `/bossmina spawn [id]`: invoca un boss; sin ID usa el predeterminado.
- `/bossmina despawn [id]`: retira uno o todos los bosses activos.
- `/bossmina reload`: recarga configuración y perfiles.

Permisos: `evento.admin`, `apoloevent.admin` o `apoloevent.mineboss.admin`.

## Discord y migración

El webhook se configura en `BossMina/config.yml`, bajo `mine-events.discord-webhook`. No publiques la URL privada del webhook.

En instalaciones antiguas pueden existir perfiles en `mine-events.yml` y recompensas en `mine-boss-kill.yml`. El archivo antiguo de recompensas se copia a `BossMina/rewards.yml` si el nuevo aún no existe; no se sobrescribe un archivo nuevo existente. No borres los YAML viejos hasta verificar la migración.

## Aplicar cambios

1. Haz una copia de seguridad de `BossMina/` y de los YAML antiguos.
2. Edita el archivo correspondiente con espacios, no tabuladores.
3. Ejecuta `/bossmina reload`.
4. Revisa la consola y prueba aparición, holograma, barra y recompensas.
