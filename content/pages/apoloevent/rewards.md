# Recompensas de BossMina — rewards.yml

Esta página explica cómo configurar los objetos adicionales que puede soltar cada boss automático de mina cuando muere. El sistema es independiente para cada boss.

## Ubicación

`plugins/ApoloEvent/BossMina/rewards.yml`

La configuración se organiza por ID del boss dentro de `bosses`. Usa el mismo ID que el archivo correspondiente de `BossMina/bosses/` (por ejemplo, `mina_nether` o `warden_ancestral`).

## Ejemplo completo

```yaml
# Mensaje global cuando el boss no suelta un objeto adicional.
# Puedes dejarlo vacío: no-drop-message: ""
no-drop-message: |
  &8&m----------------------------------------
  &6&l✦ BOSS DE MINA ✦
  &7El boss &c{boss} &7de &b{mine}
  &7no soltó ningún objeto adicional.
  &7Jugador: &a{player}
  &8&m----------------------------------------

# Recompensas independientes por boss.
bosses:
  mina_nether:
    enabled: true
    chance-percent: 100
    mine-name: "&cMina Nether"
    broadcast-message: "&6{boss} &7de {mine} fue derrotado y soltó &e{item}&7."

    items:
      - material: NETHERITE_INGOT
        amount: 1
        chance-percent: 15
        name: "&5&lLingote ancestral"
        lore:
          - "&7Recompensa de la Mina Nether"
          - "&dObjeto especial"
        enchantments: {}
        unbreakable: false

      - material: BLAZE_ROD
        amount: 8
        chance-percent: 40
        name: "&6Fragmentos ígneos"
        lore:
          - "&7Recompensa del boss"
        unbreakable: false

  warden_ancestral:
    enabled: true
    chance-percent: 75
    mine-name: "&5Mina Ancestral"
    broadcast-message: "&d{boss} &7de {mine} soltó &e{item}&7."

    items:
      - material: NETHER_STAR
        amount: 1
        chance-percent: 10
        name: "&d&lEstrella ancestral"
        lore:
          - "&7Una recompensa muy poco común"
        enchantments: {}
        unbreakable: true
```

## Opciones disponibles

| Clave | Dónde se usa | Descripción |
|---|---|---|
| `enabled` | `bosses.<id>` | Activa o desactiva las recompensas de ese boss. |
| `chance-percent` | `bosses.<id>` | Probabilidad general, de 0 a 100, de que se intente entregar un objeto. |
| `mine-name` | `bosses.<id>` | Nombre personalizado de la mina usado en mensajes. |
| `items` | `bosses.<id>` | Lista de objetos que pueden caer. |
| `material` | Cada objeto | Material de Minecraft, por ejemplo `DIAMOND`, `GOLD_INGOT` o `NETHERITE_INGOT`. |
| `amount` | Cada objeto | Cantidad del objeto. Se limita al máximo permitido por stack del material. |
| `chance-percent` | Cada objeto | Probabilidad individual de que esa opción sea elegida. |
| `name` | Cada objeto | Nombre personalizado del objeto. |
| `lore` | Cada objeto | Líneas de descripción que aparecen en el objeto. |
| `enchantments` | Cada objeto | Mapa de encantamientos y niveles, por ejemplo `SHARPNESS: 5`. |
| `unbreakable` | Cada objeto | Si es `true`, el objeto no pierde durabilidad. |
| `broadcast-message` | `bosses.<id>` o raíz | Anuncio global cuando cae un objeto. La opción del boss tiene prioridad sobre la global. |

Los nombres y el lore admiten los códigos de color compatibles con ApoloEvent, como `&6`, `&l` y los formatos RGB admitidos por el plugin.

## Cómo funcionan las probabilidades

Hay dos niveles:

1. `bosses.<id>.chance-percent` decide si se activa el intento de recompensa de ese boss.
2. Si pasa la probabilidad general, el plugin mezcla la lista `items` y revisa sus opciones en orden aleatorio. La primera opción que supera su `chance-percent` es la que cae.

**Solo cae un objeto de esta lista por muerte.** No se entregan todos los objetos que superen su probabilidad. Si ninguna opción pasa, no cae ningún objeto adicional.

Ejemplo: con probabilidad general de 50, solo la mitad de las muertes aproximadamente intentará entregar un objeto. Si se activa el intento, cada opción tiene además su propia probabilidad individual.

- `chance-percent: 100`: siempre supera esa comprobación.
- `chance-percent: 0`: nunca la supera.
- Si omites la probabilidad individual de un objeto, su valor predeterminado es 0; por eso conviene definirla siempre.

## Mensajes y variables

### Anuncio cuando cae un objeto

Puedes configurarlo dentro del boss:

```yaml
bosses:
  mina_nether:
    broadcast-message: "&6{boss} &7de {mine} soltó &e{item}&7."
```

También puedes establecer un mensaje global en la raíz del archivo:

```yaml
broadcast-message: "&6{boss} &7de {mine} soltó &e{item}&7."
```

El mensaje específico del boss tiene prioridad.

Variables disponibles:

- `{boss}`: nombre configurado del boss.
- `{mine}`: nombre de la mina.
- `{item}`: nombre del objeto que cayó.

### Mensaje cuando no cae un objeto

`no-drop-message` es global y se muestra cuando no se obtiene un objeto adicional. Variables:

- `{boss}`: nombre del boss.
- `{mine}`: nombre de la mina.
- `{player}`: jugador que lo derrotó; si no se pudo identificar al asesino, se usa un texto genérico.

Para desactivar este anuncio, deja el valor vacío:

```yaml
no-drop-message: ""
```

## Encantamientos

Los nombres deben ser claves válidas de encantamientos de Minecraft, sin el prefijo `minecraft:`:

```yaml
- material: DIAMOND_SWORD
  amount: 1
  chance-percent: 5
  name: "&bEspada de la mina"
  enchantments:
    SHARPNESS: 5
    UNBREAKING: 3
  unbreakable: true
```

Si un material o encantamiento no es válido, el plugin lo omite y registra una advertencia en la consola.

## Compatibilidad con archivos anteriores

En instalaciones que todavía tengan el archivo antiguo `plugins/ApoloEvent/mine-boss-kill.yml`, BossMina lo copia a `BossMina/rewards.yml` cuando este último todavía no existe. Si ya existe `BossMina/rewards.yml`, no se reemplaza automáticamente.

Haz una copia de seguridad antes de migrar o editar archivos antiguos. No borres tu archivo anterior hasta comprobar que las recompensas se leen correctamente.

## Aplicar los cambios

1. Edita `plugins/ApoloEvent/BossMina/rewards.yml`.
2. Guarda el archivo respetando la indentación YAML (espacios, no tabuladores).
3. Ejecuta `/bossmina reload`.
4. Comprueba la consola por si aparece algún aviso de material o encantamiento inválido.
5. Prueba la recompensa con un boss en un entorno de pruebas.

La recompensa de este archivo es un objeto adicional que cae en la ubicación de muerte del boss. No configura dinero, comandos de consola ni las recompensas por daño/top de participantes.
