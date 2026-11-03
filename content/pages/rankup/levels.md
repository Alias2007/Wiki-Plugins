<a id="levels"></a>
## Niveles y ascensos

El archivo `levels.yml` define la escalera en `levels.<número>`. Los números no tienen que ser consecutivos: el plugin busca el siguiente nivel numérico configurado por encima del actual.

### Opciones por nivel

| Clave | Función |
|---|---|
| `name` | Nombre visible del rango; admite MiniMessage y códigos clásicos `&`. |
| `luckperms-group` | Grupo de LuckPerms ya existente que corresponde a este nivel y pertenece al Track configurado. |
| `cost` | Coste económico general mediante Vault. Se mantiene compatible con el sistema de requisitos dinámicos. |
| `requirements` | Requisitos combinables; admite los 15 tipos incorporados. |
| `rewards` | Comandos ejecutados por consola al completar el ascenso. |
| `reward-display` | Texto opcional mostrado en el menú en lugar de exponer los comandos internos. |

### Requisitos

Los requisitos se declaran dentro de `requirements` con una clave identificadora y un `type`. Se pueden combinar varias condiciones en el mismo nivel. Además del coste general y del formato antiguo `requirements.items`, hay 15 tipos: `vault`, `playtime`, `level`, `kills`, `deaths`, `blocks-broken`, `blocks-placed`, `mob-kills`, `items`, `permissions`, `luckperms-group`, `placeholder`, `statistic`, `quests` y `custom`.

La referencia completa de campos, operadores, dependencias y ejemplos está en [Requisitos dinámicos](#requirements).

### Ejemplo

~~~yaml
levels:
  '3':
    name: Explorador
    luckperms-group: explorador
    cost: 500
    requirements:
      playtime:
        type: playtime
        minutes: 60
      diamonds:
        type: items
        material: DIAMOND
        amount: 16
        consume: true
    rewards:
      - "give %player% emerald 4"
    reward-display:
      - "4x Esmeralda"
~~~

El coste y los requisitos se verifican antes del ascenso. Los materiales y el dinero configurados para consumirse solo se descuentan cuando la operación puede completarse. Los placeholders disponibles para comandos de recompensa incluyen `%player%`, `%uuid%`, `%level%`, `%level_name%`, `%previous_level%` y `%next_level%`.

El nivel de ApoloRankUp es el dato principal de progresión. Si LuckPerms está habilitado, el grupo asociado al nivel se sincroniza según la configuración; el plugin no crea ni modifica grupos o Tracks.
