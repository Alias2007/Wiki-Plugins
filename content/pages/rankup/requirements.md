<a id="requirements"></a>
## Requisitos dinámicos de niveles

ApoloRankUp permite combinar varios requisitos dentro de cada nivel. Se configuran en `levels.yml`, debajo de `levels.<nivel>.requirements`. Cada requisito lleva una clave identificadora y un `type`; podés añadir varias entradas y mezclar tipos dentro del mismo nivel. No hay un límite fijo de una sola condición.

### Variantes disponibles

| Tipo | Campos | Qué comprueba |
|---|---|---|
| `vault` | `amount`, `consume` | Saldo de dinero mediante Vault. `consume: true` descuenta el importe al ascender; es el valor predeterminado. |
| `playtime` | `minutes` o `hours` | Tiempo total jugado. Si se indican horas, se convierten a minutos. |
| `level` | `amount` | Nivel de experiencia vanilla del jugador. |
| `kills` | `amount` | Cantidad total de jugadores eliminados registrada por Minecraft. |
| `deaths` | `amount` | Cantidad total de muertes registrada por Minecraft. |
| `blocks-broken` | `amount`, `material` opcional | Bloques rotos. Sin `material`, cuenta el total; con material, filtra por ese bloque. |
| `blocks-placed` | `amount`, `material` opcional | Bloques colocados desde que ApoloRankUp registra esta actividad. El contador se conserva en `block-placements.yml`. |
| `mob-kills` | `amount` | Mobs eliminados según la estadística de Minecraft. |
| `items` | `material`, `amount`, `consume` | Cantidad de un material que lleva el jugador. Consume por defecto al completar el ascenso; `consume: false` lo conserva. |
| `permissions` | `permission` | Comprueba si el jugador tiene un permiso Bukkit. |
| `luckperms-group` | `group` | Comprueba si el jugador hereda el grupo indicado en LuckPerms. |
| `placeholder` | `placeholder`, `operator`, `value` | Compara el resultado de un placeholder de PlaceholderAPI con un valor esperado. |
| `statistic` | `statistic`, `amount`, `material` o `entity` | Consulta una estadística Bukkit; puede necesitar material o entidad según el tipo de estadística. |
| `quests` | `placeholder`, `operator`, `value` | Evalúa el progreso de misiones mediante un placeholder. |
| `custom` | `placeholder`, `operator`, `value` | Permite integrar una condición externa mediante un placeholder. |

### Operadores de comparación

Los tipos `placeholder`, `quests` y `custom` admiten:

| Operador | Significado |
|---|---|
| `>=` | Mayor o igual |
| `>` | Mayor |
| `<=` | Menor o igual |
| `<` | Menor |
| `==` | Igual |
| `!=` | Distinto |

Cuando ambos valores son numéricos, la comparación es numérica. Para `==` y `!=`, si no son números, se comparan como texto sin distinguir mayúsculas/minúsculas.

### Ejemplo combinado

~~~yaml
levels:
  '3':
    name: Explorador
    requirements:
      playtime:
        type: playtime
        minutes: 120
      money:
        type: vault
        amount: 500
        consume: true
      mined:
        type: blocks-broken
        material: DIAMOND_ORE
        amount: 20
      placed:
        type: blocks-placed
        amount: 100
      permission:
        type: permissions
        permission: rango.explorador
      wins:
        type: placeholder
        placeholder: "%someplugin_wins%"
        operator: ">="
        value: "10"
      quest:
        type: quests
        placeholder: "%quests_completed%"
        operator: ">="
        value: "5"
      statistic:
        type: statistic
        statistic: FISH_CAUGHT
        amount: 25
~~~

El ejemplo es ilustrativo: reemplazá los placeholders por los que realmente ofrezcan tus plugins y elegí estadísticas válidas de Bukkit.

### Compatibilidad y comportamiento

- `placeholder`, `quests` y `custom` necesitan PlaceholderAPI y una expansión que proporcione el placeholder utilizado.
- `statistic` utiliza nombres de la enumeración Bukkit `Statistic`, por ejemplo `JUMP`, `FISH_CAUGHT`, `ANIMALS_BRED` o `PLAY_ONE_MINUTE`. Para estadísticas asociadas a bloques/ítems se usa `material`; para estadísticas de entidades se usa `entity`.
- `blocks-placed` registra actividad nueva a partir de la instalación/activación del seguimiento; no reconstruye automáticamente el historial anterior.
- El formato antiguo `requirements.items` continúa siendo compatible. Los objetos se consumen por defecto.
- El coste general `cost` también continúa siendo compatible con Vault.
- Los requisitos desconocidos o mal configurados se consideran no cumplidos y se notifican en consola; no se aprueba un ascenso por una condición que el plugin no reconoce.

Consultá también [Niveles y ascensos](#levels) para la estructura de `levels.yml` y [Configuración y datos](#config) para las dependencias.
