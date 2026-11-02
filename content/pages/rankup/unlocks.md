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