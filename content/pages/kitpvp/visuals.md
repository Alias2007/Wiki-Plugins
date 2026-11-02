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