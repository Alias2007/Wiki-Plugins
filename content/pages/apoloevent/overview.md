# ApoloEvent

> Plugin de eventos y minijuegos de ApoloMC Network. Referencia organizada por modalidad, comandos, variables y configuración.

<span class="doc-meta">Paper 1.21.4 · Java 21 · Versión del proyecto: 0.5.120</span>

<a id="overview"></a>
## Resumen

ApoloEvent reúne eventos competitivos, minijuegos, jefes, AirDrops, mapas configurables, recompensas y menús editables mediante YAML.

**Áreas principales:** Backroom, carrera de caballos, ColorMatch, Boss, Eclipse de Sangre, preparación de arenas MiniGames, AirDrop y bosses automáticos de minas.

El plugin mantiene datos de tops en SQLite, registra acciones administrativas en `audit.log` y permite actualizar textos sin reemplazar las personalizaciones existentes.

## Novedades de la versión 0.5.120

- Los webhooks de Discord ahora pueden anunciar la derrota del Boss principal y de los bosses de minas.
- Los embeds incluyen quién derrotó al jefe, el nombre del boss y un resumen de las recompensas realmente entregadas.
- En los bosses de minas también se informa la mina y las coordenadas de la derrota.
- Los mensajes y embeds de derrota se pueden personalizar desde `events/boss.yml` y `mine-events.yml`, dentro de `discord-webhook.defeat`.

Fuente: [commit 0.5.120](https://github.com/Alias2007/ApoloEvent-v2.0/commit/4ffdbf43edf51625583df91b7e6a651b2ad726c2).
