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

| Comando | Función / permiso documentado |
|---|---|
| `/kit` | Selector; `kitpvp.kit`. |
| `/kit <id>` | Reclamar kit; `kitpvp.kit`. |
| `/coins [jugador]` | Consultar monedas; `kitpvp.use`. |
| `/kitpvp stats [jugador]` | Perfil; `kitpvp.stats`. |
| `/kitpvp reload` | Recargar core; `kitpvp.admin.reload`. |
| `/kitpvp diagnostics` | Diagnóstico; `kitpvp.admin`. |
| `/pay <jugador> <cant>` | Transferencia; `kitpvp.pay`. |
| `/top <kills\|coins\|level>` | Ranking en chat; `kitpvp.use`. |
| `/tops [id]` | Menú de tops. |
| `/kit create/edit/setinv/delete/give/permission/cooldown` | Gestión de kits; `kitpvp.admin.kits`. |
| `/ability list/give/reload` | Habilidades; `kitpvp.admin.abilities` para entrega/recarga. |
| `/arena ...` | Gestión de arenas; `kitpvp.admin.arenas`. |
| `/spawn ...` | Spawns; `kitpvp.admin.spawns`. |
| `/npc ...` | NPCs; `kitpvp.admin.npc`. |
| `/economy ...` | Economía; `kitpvp.admin.economy`. |
| `/event ...` | Eventos; `kitpvp.admin.events`. |
| `/tournament ...` | Torneos; `kitpvp.admin.tournaments`. |
| `/cosmetics ...` | Cosméticos; `kitpvp.admin.cosmetics` para administrar. |

<a id="variables"></a>
## Variables y placeholders

### Jugador
`%player%`, `%world%`, `%gamemode%`, `%ping%`, `%ping_color%`, `%health%`, `%health_int%`, `%max_health%`, `%health_bar%`, `%food%`, `%x%`, `%y%`, `%z%`, `%kit%`, `%combat%`, `%combat_time%`.

### Progreso
`%kills%`, `%deaths%`, `%assists%`, `%level%`, `%coins%`, `%streak%`, `%maxstreak%`, `%xp%`, `%koth_wins%`, `%kdr%`, `%xp_needed%`, `%xp_remaining%`, `%xp_percent%`, `%xp_bar%`.

### Rango y clan
`%rank%`, `%rank_display%`, `%prefix%`, `%suffix%`, `%group_weight%`, `%clan%`, `%clan_tag%`, `%clan_rank%`.

### Servidor
`%online%`, `%online_world%`, `%max_players%`, `%staff_online%`, `%server_name%`, `%tps%`, `%tps_color%`, `%mspt%`, `%memory_used%`, `%memory_max%`, `%memory_percent%`, `%time%`, `%date%`.

### Personalizados y condiciones
- `%custom:nombre%`: valor personalizado.
- `%condition:nombre%`: condición con `if-true` / `if-false`.
- `%animation:nombre%`: animación configurada.
- Condiciones: `permission:nodo`, `world:nombre`, comparadores `=`, `!=`, `>`, `>=`, `<`, `<=`, `<-` (contiene), `|=` (uno entre valores) y `!` para negar.

### PlaceholderAPI

El README también documenta la expansión:
`%kitpvp_kills%`, `%kitpvp_deaths%`, `%kitpvp_kdr%`, `%kitpvp_coins%`, `%kitpvp_streak%`, `%kitpvp_level%`, `%kitpvp_clan%`, `%kitpvp_tagged%`, `%kitpvp_current_kit%`, `%kitpvp_tournament_status%`, `%kitpvp_active_event%`.

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

