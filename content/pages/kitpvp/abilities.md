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