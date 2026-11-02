---
layout: default
title: Comandos y permisos
---

# Comandos y permisos

La ayuda dentro del juego es la referencia definitiva para la versión instalada: `/evento help`.

## Generales
| Comando | Función |
|---|---|
| `/evento` | Menú principal. |
| `/evento help` | Ayuda. |
| `/evento list` | Lista eventos. |
| `/evento info <evento>` | Información del evento. |
| `/evento join <backroom|caballos>` | Entrar a modalidades compatibles. |
| `/evento leave` | Salir. |
| `/eventostaff` | Menú de staff. |

## Control
```
/evento start <evento>
/evento forcestart <evento>
/evento stop <evento>
/evento backroom start|stop|join|leave|forcestart
/evento caballos start|stop|join|leave|forcestart
/evento boss start|stop
```

## Mapas y posiciones
```
/evento setspawn <evento> <jugadores|staff|meta|spectator>
/evento setfinish <evento> <pos1|pos2>
/evento setcheckpoint caballos <número>
/evento setboss <1|2|3>
/evento map <evento> <enable|disable>
/evento map <evento> clone <plantilla> <mundo-destino>
```
Para clonar una plantilla, coloca el mundo completo (incluido `level.dat`) en `plugins/ApoloEvent/templates/<nombre>/`.

## Anuncios
```
/evento anuncio caballos <tiempo>
/evento anuncio backroom <tiempo>
```
Acepta segundos (`30s`), minutos (`10m`), horas (`2h`), minutos como número o una hora `HH:mm`. El anuncio no inicia el evento automáticamente.

## Boss personalizado
```
/evento boss crear <id>
/evento boss listar
/evento boss editar <id>
/evento boss invocar <id>
/evento boss eliminar <id>
```

## ColorMatch
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

## Tops
```
/evento top
/evento top <horse|backroom|boss|mineboss> [all|week|month]
```

## Permisos documentados
- `apoloevent.admin` y `evento.admin`: administración general.
- `apoloevent.cmd.start`, `apoloevent.cmd.stop`, `apoloevent.cmd.reload`, `apoloevent.cmd.setup`, `apoloevent.cmd.boss`, `apoloevent.cmd.announce`: acciones administrativas.
- `apoloevent.top`: clasificaciones.
- `apoloevent.join`: participación.
- `apoloevent.staff`: herramientas de staff.
- `apoloevent.spectator`: espectador.
- `apoloevent.bypass`: bypass.
- `apoloevent.backroom`, `apoloevent.horse`: modalidades.
- `apoloevent.airdrop.track`: seguimiento de AirDrop.

Los permisos efectivos dependen de la versión y del registro de comandos. Comprueba `plugin.yml` y la ayuda del servidor.
