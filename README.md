# ApoloMC · Documentación de plugins

Centro de documentación técnica de cinco plugins de la red **ApoloMC Network**.

## Categorías

1. [ApoloEvent](https://github.com/Alias2007/ApoloEvent-v2.0) — eventos, minijuegos, bosses y AirDrops.
2. [KitPvP-Core](https://github.com/Alias2007/KitPvP) — kits, combate, arenas, economía y competición.
3. [ApoloPractice](https://github.com/Alias2007/Practice-Core) — duelos, colas, parties, torneos y replays.
4. [ApoloRankUp](https://github.com/Alias2007/ApoloRankUp) — niveles, requisitos y desbloqueos.
5. **ApoloRR** — minijuegos e interfaces de entretenimiento.

La web está diseñada como una referencia de uso: comandos, argumentos, permisos, variables/placeholders, subfunciones y archivos de configuración. No es un catálogo de descargas.

## Estructura

- `data/navigation.json` — orden de plugins y páginas. Cada página lleva un `group` (`intro`, `features`, `events`, `bosses`, `reference`, `settings`, `info`) que define el bloque donde aparece en el menú lateral.
- `content/pages/<plugin>/<página>.md` — contenido de cada página. Convención: un solo `# Título`, secciones con `##` y subsecciones con `###`.
- `assets/` — estilos, script y logo.

Para añadir una página: crea el `.md`, agrégala a `navigation.json` dentro de su grupo y sube el número `?v=` en `index.html` y `assets/js/site.js` para que los navegadores no usen la versión en caché.

## Publicación

La página se sirve desde la rama `gh-pages` del repositorio con GitHub Pages. Para publicar manualmente desde Termux, actualiza `main` y despliega los archivos del sitio a la rama `gh-pages`.

Sitio: https://alias2007.github.io/Wiki-Plugins/
