# ApoloRankUp

> Sistema de progresión por niveles: requisitos, costes, ascensos y contenido que se habilita al avanzar.

<span class="doc-meta">Paper 1.21.4 · Java 21 · Versión del proyecto: 1.3.0</span>

<a id="overview"></a>
## Resumen

ApoloRankUp controla el progreso de los jugadores mediante niveles configurables. El nivel puede restringir comandos, mundos, regiones, bloques, objetos y entidades. Los requisitos se definen en archivos YAML y el sistema admite almacenamiento local o SQL.
La GUI principal de niveles se abre con `/rankup` o `/rankup menu` y se configura de forma independiente en `levels-menu.yml`. El menú anterior de progreso sigue disponible con `/rankup overview` y conserva su configuración en `menu.yml`.

## Novedades documentadas de la versión 1.3.0

- Se amplió el conversor de colores para reconocer RGB con `&#RRGGBB`, formato Spigot `&x&R&R&G&G&B&B` y formato `{#RRGGBB}`.
- También se admiten los códigos clásicos con `&` o `§`, como `&a` y `&l`.
- Los textos de `messages.yml`, `menu.yml`, `levels-menu.yml`, `levels.yml`, títulos, nombres e ítems de menús aceptan MiniMessage y códigos clásicos mezclados.
- Se mejoró el envío del informe de comprobación de LuckPerms usando Adventure Components.

Ejemplo RGB:

```yaml
name: "&#FF96FA&lA&#FF81F2&lI&#FF6BEA&lR"
```

Ejemplo MiniMessage:

```yaml
name: "<gradient:#FF96FA:#FF00C1><bold>AIR</bold></gradient>"
```

Fuente: [commit de colores y compatibilidad](https://github.com/Alias2007/ApoloRankUp/commit/3df0362725822b571b03fac1d1d105cb273a8f10).
