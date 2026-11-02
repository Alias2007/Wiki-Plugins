# ApoloRR

> Referencia de los minijuegos, comandos, permisos, placeholders y opciones de configuración de ApoloRR.

<a id="overview"></a>
## Resumen

ApoloRR reúne minijuegos con interfaces de inventario y soporte de Vault para las funciones que usan economía. Incluye Ruleta Rusa, Coinflip, Blackjack, Ruleta de casino, Mines, Memory, Piedra Papel o Tijera, Eco Arcano, Raspa y Gana, Crash y modos Arcade.

<a id="ruletarusa"></a>
## Ruleta Rusa

Permite crear mesas y esperar a otro jugador. El modo es una mecánica ficticia de minijuego; no mata a los jugadores.

```
/rr
/rr create <monto>
/rr cancel
/rr reload
```

El monto acepta formatos como `1000`, `1k`, `2.5k`, `1m` y `1b`.

<a id="coinflip"></a>
## Coinflip

Apuesta de cara o cruz, con mesas abiertas, estadísticas y límites configurables.

```
/cf
/cf <monto> [cara|cruz]
/cf create <monto> [cara|cruz]
/cf cancel
/cf stats [jugador]
/cf toggle
/cf help
/cf reload
```

Si se omite el lado, se elige cara por defecto. Los formatos de monto incluyen `5k` y `1.5m`.

<a id="blackjack"></a>
## Blackjack

Partida contra el crupier:

```
/bj <monto>
```

<a id="roulette"></a>
## Ruleta de casino

Ruleta europea con apuesta mediante menú o comando:

```
/roulette <monto>
/roulette <monto> <rojo|negro|par|impar|0-36>
```

Alias: `/ruleta`, `/casino`. El pago total documentado es 2× para rojo/negro/par/impar y 36× para número exacto ganador.

<a id="mines"></a>
## Mines

El jugador descubre casillas seguras y puede cobrar el multiplicador acumulado antes de seleccionar una mina.

```
/mines <monto> [minas]
```

Alias: `/minas`, `/mine`, `/rminas`, `/rmine`, `/rmines`.

<a id="memory"></a>
## Memory

Minijuego de memoria con salas multijugador.

```
/memory <monto>
/memory join
/memory leave
```

Alias: `/memoria`. La sala espera 30 segundos por defecto y tiene 10 rondas por defecto (`memory.rounds`). El tiempo de observación y la velocidad se ajustan en `memory.*`.

<a id="ppt"></a>
## Piedra, Papel o Tijera

Modo individual contra la máquina o desafíos PvP.

```
/ppt
/ppt <monto>
/ppt aceptar
/ppt rechazar
/ppt cancelar
```

Alias: `/piedrapapeltijera`, `/rps`.

<a id="echo"></a>
## Eco Arcano

Memoriza y repite secuencias de runas para aumentar el multiplicador. Se puede cobrar tras un nivel o arriesgarse a continuar.

```
/rreco <monto>
```

Alias: `/ecoarcano`, `/runas`. Configuración en `echo.*`, `difficulty.echo` y `inventario/eco.yml`.

<a id="scratch"></a>
## Raspa y Gana

Carta de nueve casillas. Tres símbolos iguales entregan el premio correspondiente.

```
/raspa <monto>
```

Alias: `/scratch`, `/raspaygana`. Los premios se definen en `raspa.prizes`; interfaz en `inventario/raspa.yml`.

<a id="crash"></a>
## Crash

El multiplicador aumenta hasta un punto de explosión. El jugador cobra antes de que termine la ronda.

```
/crash <monto>
/crash <monto> <multiplicador>
```

Alias: `/rcrash`. Se pueden configurar apuesta, velocidad, multiplicador máximo, cuenta regresiva y cobro automático opcional.

<a id="arcade"></a>
## Arcade: Races, Pyramid y Tres en Raya

```
/arcade
/races <apuesta>
/pyramid <apuesta>
/tictactoe <jugador> <apuesta>
/tictactoe aceptar
```

Alias de Tres en Raya: `/ttt`, `/tresenraya`. Races es una carrera de caballos individual; Pyramid multiplica según la casilla donde cae la bola; Tres en Raya es un desafío a otro jugador.

<a id="slot"></a>
## Tragamonedas visual

El comando `/slot` muestra una interfaz visual. **Estado documentado:** no acepta apuestas ni entrega dinero; es solo visual.

<a id="commands"></a>
## Comandos y permisos

| Comando | Función |
|---|---|
| `/rrhelp` | Ayuda por categorías. También `/help` y `/apolorrhelp`. |
| `/aplorr check` | Comprueba si hay una versión nueva. |
| `/aplorr update` | Descarga el JAR oficial en `plugins/update/`. |
| `/aplorr reload` | Recarga configuración, mensajes e inventarios. |
| `/aplorr game` | Lista el estado de los minijuegos. |
| `/aplorr game <juego\|all> <on\|off>` | Activa o desactiva modos. |

Permisos principales:
- `apolorr.use`: menú y Ruleta Rusa.
- `apolorr.create`: crear mesas.
- `apolorr.coinflip`, `apolorr.blackjack`, `apolorr.roulette`, `apolorr.mines`, `apolorr.memory`, `apolorr.crash`, `apolorr.raspa`, `apolorr.echo`, `apolorr.ppt`, `apolorr.arcade`: acceso por juego.
- `apolorr.admin`: administración.
- `apolorr.coinflip.stats.other`: ver estadísticas de otros jugadores.
- `apolorr.coinflip.delete`: eliminar Coinflips ajenos.
- `apolorr.coinflip.bypass`: ignorar restricciones de mundo/modo.
- `apolorr.coinflip.vip` y `apolorr.coinflip.boss`: límites especiales.

<a id="variables"></a>
## Variables y placeholders

Con PlaceholderAPI están documentadas estas variables:

| Placeholder | Significado |
|---|---|
| `%apolorr_cf_games%` | Partidas de Coinflip. |
| `%apolorr_cf_wins%` | Victorias. |
| `%apolorr_cf_losses%` | Derrotas. |
| `%apolorr_cf_winrate%` | Porcentaje de victorias. |
| `%apolorr_cf_profit%` | Ganancia neta. |
| `%apolorr_cf_profit_formatted%` | Ganancia neta formateada. |
| `%apolorr_cf_active%` | Apuestas activas del jugador. |
| `%apolorr_cf_taxes%` | Impuestos recaudados. |
| `%apolorr_cf_taxes_formatted%` | Impuestos formateados. |
| `%apolorr_cf_open%` | Coinflips esperando rival. |
| `%apolorr_rr_tables%` | Mesas de Ruleta Rusa. |

<a id="config"></a>
## Configuración

Carpeta: `plugins/ApoloRR/`.

| Archivo / sección | Función |
|---|---|
| `config.yml` | Apuestas, límites, impuestos, dificultad y opciones de juego. |
| `messages.yml` | Mensajes, anuncios y textos. |
| `inventario/*.yml` | Títulos, materiales, nombres y lore de menús. |
| `coinflip-stats.yml` | Estadísticas de Coinflip. |
| `Probabilidad.yml` | Probabilidades de los modos que integran este control. |
| `logger.log` | Registro del plugin. |

### Dificultad

```yaml
difficulty:
  mines: normal
  crash: dificil
  raspa: normal
  roulette: normal
  blackjack: normal
  ruletarusa-solo: normal
  levels:
    facil: 0.02
    normal: 0.05
    dificil: 0.10
    extremo: 0.20
```

Los niveles representan la ventaja de la casa aplicada a los premios de juegos individuales. Los juegos PvP no se manipulan.

### Activar o desactivar modos

```
/aplorr game all off
/aplorr game ruletarusa on
```

Modos documentados: `ruletarusa`, `coinflip`, `blackjack`, `mines`, `memory`, `roulette`, `crash`, `raspa`, `echo`, `ppt` y `arcade`. También se aceptan los alias `rr`, `cf`, `bj` y `all`.

Cambios de configuración se aplican con `/aplorr reload`. Los nombres y opciones disponibles pueden variar con la versión.
