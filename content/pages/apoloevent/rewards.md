# Recompensas BossMina — referencia detallada

Esta página corresponde exclusivamente a bosses automáticos de minas. Para el evento principal consulta [Boss normal](#apoloevent/normal-boss).

**Archivo:** `plugins/ApoloEvent/BossMina/rewards.yml`

Cada entrada de `bosses:` utiliza el ID del perfil de `BossMina/bosses/<id>.yml`.

## Ejemplo

```yaml
no-drop-message: '&7{player} derrotó a {boss}, pero no obtuvo recompensa adicional.'

bosses:
  caballero_carmesi:
    enabled: true
    chance-percent: 100
    mine-name: '&cMina Carmesí'
    broadcast-message: '&6{player} &7derrotó a {boss} en {mine} y obtuvo &e{item}&7.'
    items:
      - material: NETHERITE_INGOT
        amount: 2
        chance-percent: 20
        name: '&cLingote Carmesí'
        lore:
          - '&7Recompensa del Caballero'
        enchantments: {}
        unbreakable: false
      - material: GOLDEN_APPLE
        amount: 3
        chance-percent: 50
        name: '&6Manzanas del Caballero'
```

## Opciones

| Clave | Función |
|---|---|
| `enabled` | Habilita o deshabilita la tabla del boss. |
| `chance-percent` del perfil | Probabilidad general de intentar dar recompensa (0–100). |
| `mine-name` | Nombre de mina utilizado en mensajes. |
| `broadcast-message` | Anuncio al caer un objeto; el valor del boss tiene prioridad sobre el global. |
| `items` | Lista de posibles objetos adicionales. |
| `material` | Material válido de Minecraft/Bukkit. |
| `amount` | Cantidad del objeto. |
| `chance-percent` del item | Probabilidad individual; si se omite vale 0. |
| `name` | Nombre personalizado. |
| `lore` | Descripción del objeto. |
| `enchantments` | Mapa de encantamientos y niveles. |
| `unbreakable` | Si es `true`, no pierde durabilidad. |

## Selección de recompensa

1. Comprueba `enabled`.
2. Comprueba la probabilidad general del perfil.
3. Mezcla las opciones de `items` y comprueba sus probabilidades individuales.
4. Entrega la primera opción que pasa.

**Solo cae un objeto adicional por muerte.** Si la lista está vacía o ninguna opción pasa, no se entrega objeto adicional.

## Variables de mensajes

- `{player}`: jugador que derrotó al boss.
- `{boss}`: nombre del boss.
- `{mine}`: nombre de la mina.
- `{item}`: nombre del objeto entregado.

`no-drop-message` es global y admite `{boss}`, `{mine}` y `{player}`. Usa `no-drop-message: ""` para desactivarlo.

## Archivos antiguos y recarga

Si existe `plugins/ApoloEvent/mine-boss-kill.yml` y todavía no existe `BossMina/rewards.yml`, el plugin copia el archivo antiguo al nuevo destino. Si el nuevo ya existe, no se sobrescribe automáticamente. Conserva el archivo viejo como respaldo hasta verificar que las recompensas funcionan.

Edita el YAML respetando espacios e indentación y ejecuta `/bossmina reload`. Revisa la consola ante materiales o encantamientos no válidos.
