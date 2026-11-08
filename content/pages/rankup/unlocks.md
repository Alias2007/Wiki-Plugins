<a id="unlocks"></a>
# Desbloqueos por nivel

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

Una regla completa puede incluir `level`, `name` y `message`; `name` y `message` son opcionales. Para los mensajes propios se admiten `%level%`, `%level_name%`, `%player_level%`, `%target%` y `%player%`. Los mensajes generales de bloqueo se personalizan en `messages.yml`.

## Comportamientos adicionales

- La configuración global `enabled` permite activar o desactivar el sistema de bloqueos.
- Los comandos bloqueados también contemplan alias y la forma `plugin:comando`; `locks.hide-locked-commands` controla si se ocultan del autocompletado.
- `locks.eject-on-join` permite enviar al spawn principal a quien inicia sesión dentro de un mundo o región que todavía no tiene permitido usar.
- La barrera de cristal de `config.yml` es una señal visual individual para regiones WorldGuard bloqueadas. No modifica el terreno y no sustituye el bloqueo real.
- Los permisos `apolorankup.bypass` y `apolorankup.bypass.<categoría>` permiten omitir todos los bloqueos o solo una categoría.

Las categorías de bloqueo son independientes de los requisitos de ascenso: una condición en `levels.yml` decide si se puede subir; una regla en `unlocks.yml` limita acciones hasta alcanzar el nivel indicado.