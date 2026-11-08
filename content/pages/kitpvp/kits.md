<a id="kits"></a>
# Kits y selector

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