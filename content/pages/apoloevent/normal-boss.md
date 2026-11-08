# Boss normal — evento principal

Esta guía corresponde al Boss del evento principal. **No es BossMina**: utiliza `events/boss.yml`, perfiles en `bosses/` y su propia sección de recompensas.

## Archivos

```text
plugins/ApoloEvent/
├── events/boss.yml
└── bosses/
    ├── example.yml
    ├── creeper-infernal.yml
    └── titan-apocalipsis.yml
```

- `events/boss.yml`: arena, región, selección, perfiles clásicos, IA, escalado, fases, ayudantes, recompensas, mensajes y Discord.
- `bosses/<id>.yml`: perfiles personalizados con entidad, vida, daño, equipo, habilidades, fases, efectos y reaparición.

## Preparar el evento

```yaml
max-players: 100
duration-seconds: 900
teleport-players-to-arena: false

region:
  enabled: true
  world: world
  id: boss
  check-interval-ticks: 10

auto:
  enabled: true
  interval-seconds: 1800

boss:
  selection: RANDOM
  world: world
  x: 0.5
  y: 80.0
  z: 0.5
  yaw: 0.0
  pitch: 0.0
```

- `max-players`: máximo de participantes.
- `duration-seconds`: duración del evento.
- `teleport-players-to-arena`: teletransporta o no a los participantes.
- `region.enabled`, `world`, `id`: control de entrada mediante WorldGuard. La región debe existir.
- `auto.enabled` y `interval-seconds`: activación periódica.
- `boss.selection`: `RANDOM`, `WARDEN`, `WITHER`, `RAVAGER`, `ZOMBIE`, `PIGLIN_BRUTE` o `CUSTOM`.
- `boss.world` y coordenadas: ubicación de aparición.

La lista de selección aleatoria se configura en `random.bosses`. Puedes poner tipos clásicos y los IDs de perfiles personalizados.

## Bosses clásicos

Se configuran en `bosses:` dentro de `events/boss.yml`.

```yaml
bosses:
  WARDEN:
    name: '&4&lAPOLO WARDEN'
    max-health: 500.0
    attack-damage: 12.0
    helmet: CARVED_PUMPKIN
    helmet-scale: 2.5
    helmet-offset: 0.0
    scale: 1.0
    armor-material: NONE
    weapon: NONE

  ZOMBIE:
    name: '&2&lAPOLO ZOMBIE GIGANTE'
    max-health: 350.0
    attack-damage: 11.0
    helmet: CARVED_PUMPKIN
    scale: 3.0
    armor-material: IRON
    weapon: IRON_SWORD
```

Claves principales:
- `name`: nombre visible.
- `max-health`: vida máxima.
- `attack-damage`: daño base.
- `entity-type`: entidad real opcional (ejemplo: el perfil interno WITHER puede usar ZOMBIE).
- `helmet`: casco/cabeza o `NONE`.
- `scale`: tamaño (1.0 = normal).
- `helmet-scale`, `helmet-offset`: tamaño/altura del casco si la entidad lo admite.
- `armor-material`, `armor-enchantments`: armadura y encantamientos.
- `armor-trim.template`, `armor-trim.material`: patrón y material del adorno.
- `weapon`, `weapon-enchantments`: arma y encantamientos.

## Bosses personalizados

1. Copia `plugins/ApoloEvent/bosses/example.yml`.
2. Guárdalo como `<id>.yml`.
3. Cambia `id:` para que coincida con el nombre del archivo.
4. Personaliza `boss`, `abilities`, `phases`, `effects`, `ai` y `revive` según necesites.
5. Selecciona/invoca el perfil con los comandos administrativos.

Ejemplo:

```yaml
id: dragon-antiguo
boss:
  entity: WARDEN
  name: '&5&lDRAGÓN ANTIGUO'
  max-health: 5000
  attack-damage: 25
  scale: 1.5
  armor-material: NETHERITE
  weapon: NETHERITE_AXE

abilities:
  enabled: true
  skills:
    - action: DAMAGE_NEARBY
      damage: 8
      radius: 5
      cooldown-seconds: 10
    - action: SUMMON
      entity: ZOMBIE
      name: '&cGuardia antiguo'
      count: 2
      cooldown-seconds: 25

phases:
  - health-percent: 50
    message: '&5¡El boss entra en segunda fase!'
    actions:
      - action: PARTICLES
        particle: SOUL_FIRE_FLAME
        count: 100
```

El archivo `example.yml` contiene una plantilla más extensa.

## Habilidades y fases

Las habilidades periódicas se declaran en `abilities.enabled` y `abilities.skills`. Las acciones documentadas en los ejemplos incluyen `PARTICLES`, `SOUND`, `POTION_NEARBY`, `DAMAGE_NEARBY`, `LIGHTNING_NEARBY`, `EXPLOSION`, `PLAYER_EXPLOSION`, `TNT_BARRAGE` y `SUMMON`. Cada acción tiene sus propios parámetros: radio, daño, cantidad, entidad, duración y cooldown, según corresponda.

`phases` ejecuta acciones una vez al cruzar un porcentaje de vida. Los perfiles pueden añadir `revive` con `enabled`, `delay-seconds`, `max-revives`, `message` y `success-message`. En los ejemplos, `max-revives: 0` significa ilimitado.

También puedes personalizar IA (`ai`), efectos (`effects`), ayudantes (`helpers`), escalado de combate (`combat-scaling`), defensa (`boss-defense`), barra (`boss-bar`) y visuales/sonidos.

## Recompensas especiales por derrotar al boss

Se configuran en `events/boss.yml`, dentro de `boss-kill-reward`. No uses `BossMina/rewards.yml` para este evento.

Hay tres comprobaciones:
1. `boss-kill-reward.chance-percent`: probabilidad global.
2. `boss-kill-reward.bosses.<TIPO>.chance-percent`: probabilidad del perfil.
3. `boss-kill-reward.bosses.<TIPO>.item.chance-percent`: probabilidad de activar el intento de objeto.

Ejemplo:

```yaml
boss-kill-reward:
  chance-percent: 100
  bosses:
    WARDEN:
      enabled: true
      chance-percent: 100
      item:
        enabled: true
        chance-percent: 100
        broadcast-message: '&e{player} &7derrotó a &c{boss} y obtuvo &d{item}&7.'
        no-drop-broadcast-message: '&e{player} &7derrotó a &c{boss}, pero no cayó equipo especial.'
        rewards:
          - chance-percent: 20
            material: NETHERITE_SWORD
            amount: 1
            name: '&d&lCuchilla del Guardián'
            lore:
              - '&7Recompensa exclusiva'
            enchantments:
              SHARPNESS: 7
              UNBREAKING: 5
          - chance-percent: 10
            material: NETHERITE_CHESTPLATE
            amount: 1
            name: '&5Coraza del Vacío'
            armor-trim:
              template: WARD
              material: DIAMOND
            enchantments:
              PROTECTION: 7
              UNBREAKING: 5
```

Las entradas individuales que pasan su probabilidad se reúnen y se elige una al azar: como máximo cae un objeto de esa tabla por muerte. Se pueden personalizar material, cantidad, nombre, lore, encantamientos y `armor-trim`.

### Recompensas por comandos

En cada perfil, `commands.enabled` activa premios ejecutados desde consola. Si más de una opción pasa su probabilidad, se elige una y se ejecutan todos los comandos de esa entrada:

```yaml
      commands:
        enabled: true
        rewards:
          - name: '&bPremio de diamantes'
            chance-percent: 50
            commands:
              - 'give %player% diamond 3'
          - name: '&6Premio legendario'
            chance-percent: 10
            commands:
              - 'give %player% netherite_ingot 1'
              - 'give %player% golden_apple 3'
        broadcast-message: '&e{player} &7ganó {reward} por derrotar a {boss}.'
```

Variables de comando: `%player%`, `%uuid%`, `%boss%` y sus equivalentes con llaves. Variables de mensajes: `{player}`, `{boss}`, `{item}`, `{reward}`. Se mantiene compatibilidad con `commands.chance-percent` y `commands.list` antiguos.

## Recompensa principal del ganador

La sección raíz `reward` es distinta de los premios aleatorios anteriores. Se entrega al jugador que da el golpe final:

```yaml
reward:
  enabled: true
  experience: 250
  items:
    - 'DIAMOND:16'
    - 'GOLD_INGOT:32'
    - 'GOLDEN_APPLE:4'
  commands:
    - 'eco give {player} 5000'
```

## Mensajes, Discord y barra

- `messages`: títulos y mensajes de inicio, entrada, victoria y final sin ganador.
- `boss-bar`: título, color, estilo y fases de barra.
- `discord-webhook`: webhook de aparición y derrota con embed.
- `cinematic`: presentación visual de aparición.
- `helpers`: invocación de ayudantes al alcanzar porcentajes de vida.

Configura la URL privada del webhook sin publicarla en capturas ni compartirla.

## Comandos y recarga

Comandos documentados por el plugin:
- `/evento boss seleccionar <1-5>`: selecciona un boss clásico.
- `/evento boss start`: inicia el evento.
- `/evento boss stop`: detiene el evento.
- `/evento boss crear <id>`: crea un perfil personalizado.
- `/evento boss listar`: lista perfiles.
- `/evento boss editar <id>`: edita un perfil.
- `/evento boss invocar <id>`: invoca un perfil personalizado.
- `/evento reload`: recarga la configuración.

Usa `/evento help` para confirmar la sintaxis disponible en la versión instalada.

Antes de editar, haz copia de seguridad de `events/boss.yml` y `bosses/*.yml`. Después de guardar, ejecuta `/evento reload` y prueba aparición, combate, fases y recompensas.
