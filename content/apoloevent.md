# ApoloEvent

> Plugin de eventos y minijuegos de ApoloMC Network. Referencia organizada por modalidad, comandos, variables y configuración.

<span class="doc-meta">Paper 1.21.4 · Java 21 · README del proyecto: 0.5.115</span>

<a id="overview"></a>
## Resumen

ApoloEvent reúne eventos competitivos, minijuegos, jefes, AirDrops, mapas configurables, recompensas y menús editables mediante YAML.

**Áreas principales:** Backroom, carrera de caballos, ColorMatch, Boss, Eclipse de Sangre, preparación de arenas MiniGames, AirDrop y bosses automáticos de minas.

El plugin mantiene datos de tops en SQLite, registra acciones administrativas en `audit.log` y permite actualizar textos sin reemplazar las personalizaciones existentes.

<a id="backroom"></a>
## Backroom

Carrera por un mapa con puntos de control y meta. Incorpora espectadores, habilidades, PvP configurable, partículas para orientar a los participantes, objetos de velocidad/fuerza y brújula rastreadora.

**Configuración:** `events/backroom.yml`.

**Integración de clanes:** UltimateClans puede permitir o bloquear el combate entre miembros del mismo clan y aliados. Solo afecta a participantes activos cuando el PvP del evento está habilitado.

```yaml
integrations:
  ultimateclans:
    enabled: true
    same-clan: true
    allies: true
```

<a id="horses"></a>
## Carrera de caballos

Carrera con monturas, checkpoints secuenciales, tiempo límite, objetos especiales y recompensas por posición.

**Configuración:** `events/horse.yml`.

Comandos principales:
```
/evento caballos start
/evento caballos stop
/evento caballos join
/evento caballos leave
/evento caballos forcestart
/evento setcheckpoint caballos <número>
/evento anuncio caballos <tiempo>
```

El argumento `<tiempo>` acepta segundos (`30s`), minutos (`10m`), horas (`2h`), minutos como número o una hora `HH:mm`. El anuncio no inicia el evento.

<a id="colormatch"></a>
## ColorMatch

Minijuego de supervivencia por colores, con rondas, efectos, perfiles de arena y recompensas. Permite preparar lobby y región, construir la arena, iniciar/detener partidas y restaurar los bloques al finalizar.

**Configuración:** `events/colormatch.yml`.

```
/evento colormatch setlobby
/evento colormatch pos1
/evento colormatch pos2
/evento colormatch build
/evento colormatch start
/evento colormatch stop
/evento colormatch reload
/evento colormatch join
/evento colormatch leave
```

<a id="bosses"></a>
## Bosses y bosses de minas

### Evento Boss

El evento reconoce participantes al entrar a una región de WorldGuard configurada en `events/boss.yml`. No los teletransporta automáticamente. Revisa `region.world` y `region.id`.

Jefes integrados:
1. Warden
2. Wither
3. Ravager
4. Zombie grande con cabeza de calabaza y equipo de hierro
5. Piglin Brute

```
/evento boss seleccionar <1-5>
/evento boss start
/evento boss stop
/evento boss crear <id>
/evento boss listar
/evento boss editar <id>
/evento boss invocar <id>
/evento boss eliminar <id>
```

Los jefes personalizados se guardan en `plugins/ApoloEvent/bosses/`. Pueden definir estadísticas, equipo, habilidades periódicas, fases por porcentaje de vida, ayudantes y reaparición. El archivo `example.yml` sirve como plantilla.

**Inventario:** el evento Boss no captura ni restaura el inventario. Al morir, el participante pierde sus objetos y queda fuera del evento.

### Bosses automáticos de minas

Se configuran en `mine-events.yml`. Admiten regiones, nombre de mina, anuncios, efectos, animaciones, guardianes y persistencia de bosses vivos en `mine-boss-state.yml` cuando está activada.

<a id="minigames"></a>
## MiniGames

El menú se abre con:
```
/evento minigames
```

El sistema permite preparar arenas base de Spleef, ColorMatch, Minefield y JumpRun. **Estado documentado:** todavía no tienen partidas jugables completas; por ahora está disponible la preparación y guardado de arenas/ubicaciones.

<a id="airdrop"></a>
## AirDrop

Entregas programadas mediante `airdrop.times` o manuales.

```
/airdrop spawn
/airdrop track
```

Incluye avisos previos, rarezas, caducidad, recompensas, holograma y seguimiento con brújula. Tiene ajustes específicos de aparición para Nether y End.

**Configuración:** `airdrop.yml`.

<a id="commands"></a>
## Comandos y permisos

### Generales

| Comando | Función |
|---|---|
| `/evento` | Abre el menú principal. |
| `/evento help` | Muestra ayuda. |
| `/evento list` | Lista eventos. |
| `/evento info <evento>` | Muestra información. |
| `/evento join <backroom\|caballos>` | Participa en modalidades compatibles. |
| `/evento leave` | Sale del evento. |
| `/eventostaff` | Abre herramientas de staff. |

### Administración y mapas

```
/evento start <evento>
/evento forcestart <evento>
/evento stop <evento>
/evento backroom start|stop|join|leave|forcestart
/evento caballos start|stop|join|leave|forcestart
/evento boss start|stop
/evento setspawn <evento> <jugadores|staff|meta|spectator>
/evento setfinish <evento> <pos1|pos2>
/evento setcheckpoint caballos <número>
/evento setboss <1|2|3>
/evento map <evento> <enable|disable>
/evento map <evento> clone <plantilla> <mundo-destino>
/evento anuncio backroom <tiempo>
/evento anuncio caballos <tiempo>
```

Para clonar una plantilla, el mundo completo (incluido `level.dat`) debe estar en `plugins/ApoloEvent/templates/<nombre>/`.

### Tops

```
/evento top
/evento top <horse|backroom|boss|mineboss> [all|week|month]
```

### Permisos documentados

| Permiso | Uso |
|---|---|
| `apoloevent.admin`, `evento.admin` | Administración general. |
| `apoloevent.cmd.start` | Iniciar eventos. |
| `apoloevent.cmd.stop` | Detener eventos. |
| `apoloevent.cmd.reload` | Recargar. |
| `apoloevent.cmd.setup` | Configuración de eventos. |
| `apoloevent.cmd.boss` | Administración de bosses. |
| `apoloevent.cmd.announce` | Anuncios. |
| `apoloevent.top` | Consultar tops. |
| `apoloevent.join` | Participar. |
| `apoloevent.staff` | Herramientas de staff. |
| `apoloevent.spectator` | Modo espectador. |
| `apoloevent.bypass` | Bypass. |
| `apoloevent.backroom`, `apoloevent.horse` | Acceso a modalidades. |
| `apoloevent.airdrop.track` | Seguimiento de AirDrop. |

<a id="variables"></a>
## Variables y placeholders

El README confirma integración con PlaceholderAPI para mostrar estadísticas y posiciones de tops, pero no enumera los identificadores exactos de la expansión.

Para no inventar nombres, esta sección queda limitada a las variables de anuncios que sí están documentadas:

| Variable | Significado |
|---|---|
| `{boss}` | Nombre del boss. |
| `{mine}` | Nombre de la mina. |
| `{world}` | Mundo. |
| `{x}`, `{y}`, `{z}` | Coordenadas. |

Cuando se confirme la lista exacta de placeholders expuestos por la expansión instalada, se añadirá aquí.

<a id="config"></a>
## Configuración

| Archivo | Función |
|---|---|
| `config.yml` | Opciones generales, integraciones y tops. |
| `messages.yml` | Mensajes y textos. |
| `inventario/*.yml` | Menús. |
| `events/backroom.yml` | Backroom y PvP. |
| `events/horse.yml` | Carrera de caballos. |
| `events/boss.yml` | Boss integrado. |
| `events/colormatch.yml` | ColorMatch. |
| `events/eclipse.yml` | Eclipse de Sangre. |
| `bosses/*.yml` | Bosses personalizados. |
| `mine-events.yml` | Bosses de minas. |
| `mine-boss-state.yml` | Persistencia de bosses. |
| `airdrop.yml` | Horarios y recompensas de AirDrop. |
| `recovery.yml` | Recuperación de datos. |
| `event-tops.db` | Datos SQLite de clasificaciones. |
| `audit.log` | Registro administrativo. |

### Integraciones

- **WorldGuard:** regiones del evento Boss; Backroom también debe permitir PvP en la región cuando lo requiera.
- **UltimateClans:** reglas de combate entre miembros y aliados en Backroom.
- **PlaceholderAPI:** variables para estadísticas y tops.
- **Vault:** recompensas monetarias cuando está configurado y hay proveedor de economía.

Los cambios de configuración deben probarse en una copia del servidor. La sintaxis y las opciones concretas pueden cambiar entre versiones.
