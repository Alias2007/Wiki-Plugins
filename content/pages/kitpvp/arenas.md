<a id="arenas"></a>
## Arenas y spawns

Las arenas tienen límites, reglas por región y puntos de aparición validados para evitar ubicaciones inseguras. El core permite restaurar bloques modificados durante peleas y aplicar protección temporal al reaparecer.

Comandos de administración:
```
/arena <create|delete|pos1|pos2|...>
/spawn <set|remove|list|random>
```

WorldGuard es opcional. La región se asocia en el YAML de cada arena:

```yaml
worldguard:
  region: arena-pvp
```

Las reglas documentadas sincronizan PvP, construcción y daño por caída con flags correspondientes.