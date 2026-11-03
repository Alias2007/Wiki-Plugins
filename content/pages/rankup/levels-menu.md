<a id="levels-menu"></a>
## Menú principal de niveles — levels-menu.yml

El archivo `levels-menu.yml` controla la GUI que se abre con `/rankup` y `/rankup menu`. Es independiente de `menu.yml`, que conserva el menú anterior accesible mediante `/rankup overview`.

### Qué se puede personalizar

| Ruta | Función |
|---|---|
| `menu.title` | Título de la ventana. |
| `menu.size` | Tamaño: 9, 18, 27, 36, 45 o 54 slots. |
| `menu.filler.enabled/material/name` | Panel de relleno. |
| `menu.levels.slots` | Lista ordenada de slots para los niveles. Su cantidad determina cuántos niveles aparecen por página. |
| `menu.levels.states.unlocked/next/locked` | Material, nombre y lore para cada estado del nivel. |
| `menu.buttons.previous/next` | Navegación entre páginas. |
| `menu.buttons.close/unlocks/profile/top` | Posición y aspecto de los botones y perfil. |

### Placeholders

- Jugador y progreso: `%player%`, `%level%`, `%level_name%`, `%max_level%`, `%next_level%`, `%next_level_name%`, `%progress%`.
- Nivel representado: `%target_level%`, `%target_name%`.
- Navegación: `%page%`, `%pages%`.

Los nombres y lore aceptan MiniMessage y códigos clásicos `&`.

### Consideraciones

- El tamaño debe ser múltiplo de 9 y estar entre 9 y 54; de lo contrario, se usa 54.
- Los slots fuera del inventario se ignoran y los duplicados se eliminan.
- Si no quedan slots válidos, se usa la distribución predeterminada de 45 posiciones.
- Evitá asignar el mismo slot a un nivel y a un botón: los botones se dibujan después y ocupan esa posición.
- La cantidad de slots válidos determina el tamaño de cada página.
- Para aplicar cambios, ejecutá `/rankup reload`.

### Contenido actual del archivo

~~~yaml
# Menú principal de niveles: /rankup y /rankup menu
# Este archivo no modifica /rankup overview (ese menú usa menu.yml).
#
# menu.size: 9, 18, 27, 36, 45 o 54.
# menu.levels.slots: lista de slots donde se dibujan los niveles, en orden.
# La cantidad de slots determina cuántos niveles aparecen por página.
# Podés cambiar posiciones y cantidad; evitá repetir slots usados por botones.
#
# Estados disponibles: unlocked (ya alcanzado), next (siguiente nivel), locked (futuro).
# Placeholders de nivel: %player% %level% %level_name% %max_level% %next_level%
# %next_level_name% %progress% %target_level% %target_name%
# Placeholders de botones: %page% %pages%
# Los nombres y lore aceptan MiniMessage y códigos &.

menu:
  title: "<dark_gray>ApoloMC <dark_gray>» <aqua>RankUp"
  size: 54
  filler:
    enabled: true
    material: BLACK_STAINED_GLASS_PANE
    name: " "
  levels:
    slots:
      - 0
      - 1
      - 2
      - 3
      - 4
      - 5
      - 6
      - 7
      - 8
      - 9
      - 10
      - 11
      - 12
      - 13
      - 14
      - 15
      - 16
      - 17
      - 18
      - 19
      - 20
      - 21
      - 22
      - 23
      - 24
      - 25
      - 26
      - 27
      - 28
      - 29
      - 30
      - 31
      - 32
      - 33
      - 34
      - 35
      - 36
      - 37
      - 38
      - 39
      - 40
      - 41
      - 42
      - 43
      - 44
    states:
      unlocked:
        material: GREEN_TERRACOTTA
        name: "<green>Nivel %target_level% » %target_name%"
        lore:
          - "<green>✔ Nivel desbloqueado"
      next:
        material: YELLOW_TERRACOTTA
        name: "<yellow>Nivel %target_level% » %target_name%"
        lore:
          - "<yellow>★ Siguiente nivel disponible"
          - "<gray>Requisitos:"
      locked:
        material: RED_TERRACOTTA
        name: "<red>Nivel %target_level% » %target_name%"
        lore:
          - "<red>✘ Nivel bloqueado"
  buttons:
    previous:
      slot: 45
      material: ARROW
      name: "<yellow>← Página anterior"
      lore:
        - "<gray>Página %page%/%pages%"
        - "<dark_gray>Se desactiva en la primera página."
      hide-when-disabled: false
    close:
      slot: 46
      material: BARRIER
      name: "<red>Cerrar"
      lore: []
    unlocks:
      slot: 47
      material: EMERALD
      name: "<aqua>Desbloqueos"
      lore:
        - "<gray>Ver los desbloqueos por nivel."
    profile:
      slot: 49
      material: PLAYER_HEAD
      name: "<aqua>Tu progreso"
      lore:
        - "<gray>Jugador: <white>%player%"
        - "<gray>Nivel actual: <yellow>%level% » %level_name%"
        - "<gray>Progreso: <white>%progress%"
        - "<gray>Página: <white>%page%/%pages%"
    top:
      slot: 51
      material: GOLDEN_HELMET
      name: "<gold>Top 10"
      lore:
        - "<gray>Ver los mejores jugadores."
    next:
      slot: 53
      material: ARROW
      name: "<yellow>Página siguiente →"
      lore:
        - "<gray>Página %page%/%pages%"
        - "<dark_gray>Se desactiva en la última página."
      hide-when-disabled: false
~~~
