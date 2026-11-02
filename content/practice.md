# ApoloPractice

> Core de Practice PvP de ApoloMC. Duelos, colas, parties, FFA, entrenamiento, torneos y replays.

<span class="doc-meta">Paper API 1.21.4 · Java 21 · Estado documentado: 1.8.18-SNAPSHOT</span>

<a id="overview"></a>
## Resumen

ApoloPractice es un core modular de Practice PvP. El README describe duelos 1v1, matchmaking ranked/unranked, kits configurables, parties, FFA, torneos, entrenamiento local, replays, cosméticos y moderación.

La base automatizada se valida con Paper API 1.21.4 y Java 21. Algunas funciones —en particular el jugador falso para entrenamiento— requieren pruebas de servidor real antes de considerarse estables.

<a id="duels"></a>
## Duelos

Duelos 1v1 con solicitudes que expiran, aceptación, revancha, rendición y restauración del estado del jugador al finalizar.

```
/practice duel <jugador> [kit]
/practice accept <jugador>
/practice rematch
/practice forfeit
```

La restauración documentada incluye inventario, armadura, mano secundaria, experiencia, efectos, fuego y hambre.

<a id="queues"></a>
## Colas y ELO

El matchmaking admite colas ranked y unranked. Solo las partidas ranked modifican el rating.

```
/practice queue <kit> [ranked|unranked]
/practice leave
/practice top [elo|wins|kills]
```

En el selector de kits, el clic izquierdo elige ranked y el derecho unranked.

<a id="kits"></a>
## Kits y modos

Los kits se definen en YAML y pueden incluir contenido, armadura, vida, comida, construcción, hambre y límites de versión de cliente.

Modos documentados:
- **Estándar:** combate con reglas del kit.
- **Boxing:** victoria por golpes.
- **Spleef:** excavar nieve.
- **Construcción:** restauración automática de bloques al finalizar el duelo.

```
/practice kits
/practice menu
```

<a id="parties"></a>
## Parties y party wars

Las parties admiten hasta ocho jugadores. Las invitaciones expiran a los 60 segundos.

```
/practice party invite <jugador>
/practice party accept <jugador>
/practice party kick <jugador>
/practice party leave
/practice party disband
/practice party info
/practice partywar duel <líder rival> <kit>
```

Party-vs-party está documentado como una serie 2v2–4v4: cada integrante juega su lane 1v1 en paralelo y el core anuncia el resultado agregado. No equivale todavía a combate de equipo nativo en una sola arena.

<a id="ffa"></a>
## Free For All y espectadores

FFA permite unirse con un kit, salir de la modalidad y restaurar el estado completo del jugador.

```
/practice ffa join <kit>
/practice ffa leave
/practice ffa setspawn
/practice spectate <jugador>
/practice unspectate
```

<a id="tournaments"></a>
## Torneos

Torneos eliminatorios de hasta 32 participantes. El sistema elimina correctamente a participantes que se desconectan.

```
/practice tournament join
/practice tournament leave
/practice tournament status
/practice tournament create <kit> <nombre>
/practice tournament start
/practice tournament cancel
```

<a id="training"></a>
## Entrenamiento

Entrenamiento local contra una IA propia del core, con kit y dificultad.

```
/practice training start <kit> [easy|normal|hard]
/practice training stop
```

**Estado:** el proyecto incluye un primer adaptador NMS para jugador falso en Paper 1.21.4. La visibilidad, recepción de golpes y limpieza deben probarse en un servidor real; no se debe asumir que el bot ya está completamente validado.

<a id="replays"></a>
## Replays

Replays mediante snapshots, con reproducción visual como espectador y fantasma del rival.

```
/practice replay list
/practice replay play <id>
/practice replay pause
/practice replay resume
/practice replay speed <1|2|4>
/practice replay stop
```

La reproducción visual por snapshots no equivale todavía a una reconstrucción determinista de todos los eventos de combate.

<a id="stats"></a>
## Estadísticas y cosméticos

Estadísticas disponibles: victorias, derrotas, kills, muertes, rachas y ELO.

```
/practice stats [jugador conectado]
/practice top [elo|wins|kills]
/practice cosmetic list
/practice cosmetic set <efecto>
```

Los cosméticos son efectos de kill configurables por jugador y guardados en YAML.

<a id="commands"></a>
## Comandos y permisos

| Área | Comandos |
|---|---|
| Menús | `/practice menu`, `/practice kits` |
| Duelos | `/practice duel <jugador> [kit]`, `/practice accept <jugador>`, `/practice rematch`, `/practice forfeit` |
| Colas | `/practice queue <kit> [ranked\|unranked]`, `/practice leave` |
| Parties | `/practice party <invite\|accept\|kick\|leave\|disband\|info> [jugador]` |
| Party wars | `/practice partywar duel <líder rival> <kit>` |
| FFA | `/practice ffa join <kit>`, `/practice ffa leave` |
| Espectador | `/practice spectate <jugador>`, `/practice unspectate` |
| Torneos | `/practice tournament join\|leave\|status` |
| Entrenamiento | `/practice training start <kit> [easy\|normal\|hard]`, `/practice training stop` |
| Replays | `/practice replay list\|play <id>\|pause\|resume\|speed <1\|2\|4>\|stop` |
| Estadísticas | `/practice stats [jugador]`, `/practice top [elo\|wins\|kills]` |
| Cosméticos | `/practice cosmetic list\|set <efecto>` |
| Administración | `/practice arena list`, `/practice arena setspawn <id> <1\|2>`, `/practice ffa setspawn` |
| Torneos admin | `/practice tournament create <kit> <nombre>`, `/practice tournament start`, `/practice tournament cancel` |
| Staff | `/practice staff freeze <jugador>`, `/practice staff unfreeze <jugador>` |
| Core | `/practice reload`, `/practice debug`, `/practice compatibility` |
| Admin stats | `/practice admin resetstats <jugador>`, `/practice admin setelo <jugador> <elo>` |

El README actual no enumera los nodos exactos de permisos de cada comando; deben confirmarse en el registro de permisos del plugin antes de asignarlos.

<a id="config"></a>
## Configuración, almacenamiento y compatibilidad

Los archivos editables se generan en `plugins/ApoloPractice/`.

### Almacenamiento

- SQLite por defecto: perfiles en `profiles.db`.
- MySQL: se configura en `config.yml`.
- YAML: perfiles locales en archivos YAML.
- La importación inicial permite migrar perfiles YAML a SQL.

Cambiar el backend requiere reiniciar. `/practice reload` guarda las estadísticas antes de recargar archivos.

### Compatibilidad

- Los límites `minimum-client-version` y `maximum-client-version` se configuran por kit.
- `compatibility.yml` aplica límites por modo, versiones incompatibles y el interruptor global.
- ViaVersion permite detectar versión del cliente si está instalado; sin él se usa la versión nativa del servidor.

### Integraciones

PlaceholderAPI es opcional. Vault permite recompensa monetaria por victoria y está desactivado por defecto.

El README no publica nombres exactos de placeholders propios de ApoloPractice, por lo que no se enumeran aquí.
