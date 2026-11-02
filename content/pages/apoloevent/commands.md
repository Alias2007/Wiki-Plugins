<a id="commands"></a>
## Comandos y permisos

Los comandos se separan por sistema. Los subcomandos de administración requieren evento.admin, apoloevent.admin o el permiso específico indicado.

### Consulta y participación

| Comando | Función |
|---|---|
| /evento | Abre el menú de eventos. |
| /evento help | Ayuda de jugador y, para staff, ayuda administrativa. |
| /evento list | Estado, participantes y límite de cada sesión. |
| /evento info <evento> | Estado y participantes de un evento. |
| /evento join <evento> | Participar en un evento compatible. |
| /evento leave | Abandonar el evento actual. |
| /eventostaff | Abrir el panel de staff. |
| /evento top | Abrir el menú de clasificaciones. |

### Ciclo de vida de eventos

~~~text
/evento start <evento>
/evento forcestart <evento>
/evento stop <evento>
/evento backroom start|forcestart|stop|join|leave
/evento caballos start|forcestart|stop|join|leave
/evento eclipse start|forcestart|stop|join|leave
/evento boss start|forcestart|stop
~~~

forcestart permite iniciar sin cumplir el mínimo de participantes. Los aliases de sesión para caballos incluyen horse y horserace; para Backroom, br.

### Preparación de mapas, spawns y checkpoints

~~~text
/evento setspawn <evento> <jugadores|staff|meta|spectator>
/evento setspawn boss jugadores
/evento setfinish <backroom|caballos> <pos1|pos2>
/evento setcheckpoint caballos <número>
/evento checkpointfin backroom <pos1|pos2>
/evento checkpointstart backroom
/evento setboss <1|2|3>
/evento map <evento> <enable|disable>
/evento map <backroom|caballos> setworld <mundo>
/evento map <backroom|caballos> clone <plantilla> <mundo-destino>
~~~

Las órdenes setspawn players de Backroom y caballos se pueden repetir para guardar varios puntos de aparición. Los checkpoints de caballos admiten IDs del 1 al 100. setboss guarda una de las tres ubicaciones del jefe; el spawn de participantes del Boss se establece con setspawn boss jugadores.

Para clonar, coloca el mundo completo, incluido level.dat, en plugins/ApoloEvent/templates/<nombre>/. La clonación no debe sobrescribir un mundo activo. Después revisa que las coordenadas configuradas correspondan al mundo destino.

### Anuncios programados

~~~text
/evento anuncio backroom <tiempo>
/evento anuncio caballos <tiempo>
~~~

El tiempo puede ser segundos (30s), minutos (10m), horas (2h), minutos como número o una hora HH:mm. El anuncio informa y cuenta hacia atrás, pero no inicia automáticamente el evento: el staff debe ejecutar /evento start <evento>.

### Boss integrado y jefes personalizados

~~~text
/evento boss seleccionar <1|2|3|4|5|random>
/evento boss start
/evento boss stop
/evento boss crear <id>
/evento boss listar
/evento boss editar <id>
/evento boss invocar <id>
/evento boss eliminar <id>
~~~

Tipos clásicos: 1 Warden, 2 Wither, 3 Ravager, 4 Zombie grande, 5 Piglin Brute. random selecciona uno de los cinco. crear copia bosses/example.yml; edita el archivo y ejecuta invocar <id>. El evento debe estar detenido antes de cambiar el Boss seleccionado o eliminar el Boss activo.

### Eclipse de Sangre

~~~text
/evento eclipse join
/evento eclipse leave
/evento eclipse start
/evento eclipse forcestart
/evento eclipse stop
/evento eclipse setspawn <jugadores|staff|meta|spectator>
~~~

El spawn se establece desde la ubicación actual del administrador. El evento utiliza las opciones de events/eclipse.yml y el mapa registrado en maps.yml.

### ColorMatch

Comandos de jugador:
~~~text
/evento colormatch help
/evento colormatch join
/evento colormatch leave
/evento colormatch status
/evento colormatch stats [jugador]
/evento colormatch top
/evento colormatch kits
/evento colormatch kit <id>
~~~

Preparación y administración:
~~~text
/evento colormatch enable|disable
/evento colormatch setlobby
/evento colormatch setup
/evento colormatch setupglass
/evento colormatch setupclay
/evento colormatch setupsmall
/evento colormatch setupsmallglass
/evento colormatch setupsmallclay
/evento colormatch pos1
/evento colormatch pos2
/evento colormatch build
/evento colormatch setminplayers <cantidad>
/evento colormatch setmaxplayers <cantidad>
/evento colormatch setrounds <cantidad>
/evento colormatch setcountdown <segundos>
/evento colormatch setroundtime <segundos>
/evento colormatch setbreak <segundos>
/evento colormatch setregionlimit <bloques>
/evento colormatch setreward [puesto|participacion] <cantidad>
/evento colormatch setmode <modo>
/evento colormatch setdifficulty <easy|normal|hard>
/evento colormatch start
/evento colormatch stop
/evento colormatch reload
/evento colormatch arena list
/evento colormatch arena save <nombre>
/evento colormatch arena load <nombre>
~~~

Los perfiles se guardan en events/colormatch-arenas/<nombre>.yml. El perfil guarda lobby, esquinas, modo, cantidad de jugadores, rondas, tiempos, tamaño de región y dificultad. Solo se pueden cambiar o cargar perfiles cuando no hay partida ni participantes. setreward <cantidad> modifica el dinero del ganador; setreward <2-100> <cantidad> define premio de puesto; setreward participacion <cantidad> define el premio de participación. También acepta ganador, winner o 1 para el primer puesto. El pago requiere Vault o una economía compatible.

### MiniGames

~~~text
/evento minigames
/evento minigames menu
/evento minigames setup <spleef|colormatch|minefield|jumprun>
/evento minigames setspawn <juego>
/evento minigames reload
~~~

El constructor actual acepta los cuatro tipos listados en setup. El menú también muestra otros módulos configurables, pero no debe interpretarse como confirmación de que todos tienen una partida completa implementada.

### AirDrop

~~~text
/airdrop help
/airdrop track
/airdrop locate
/airdrop start
/airdrop stop
/airdrop spawn
/airdrop reload
/airdrop validate
/airdrop list
/airdrop clear
/airdrop info
/airdrop rewards <rareza>
/airdrop edit <rareza>
~~~

track y locate son comandos de jugador. rewards y edit abren un inventario para editar los objetos de la rareza seleccionada; al cerrar, el contenido se guarda en airdrop-rewards.yml. Las operaciones administrativas requieren apoloevent.airdrop.admin.

### Tops, recarga, validación y textos

~~~text
/evento top
/evento top <horse|backroom|boss|mineboss> [all|week|month]
/evento reload
/evento validate
/evento textos estado
/evento textos restaurar <messages|boss|colormatch|airdrop> confirmar
~~~

Los tops soportan los períodos histórico all, semana week y mes month. validate revisa archivos y valores de configuración. textos estado informa del estado de actualización; restaurar vuelve a los textos predeterminados del archivo elegido y crea una copia de seguridad en backups/.

### Permisos

| Permiso | Uso |
|---|---|
| evento.admin, apoloevent.admin | Administración general. |
| apoloevent.cmd.start | Iniciar o forzar inicio. |
| apoloevent.cmd.stop | Detener eventos. |
| apoloevent.cmd.reload | Recargar y gestionar textos. |
| apoloevent.cmd.setup | Mapas, spawns, checkpoints y ubicaciones. |
| apoloevent.cmd.boss | Selección y gestión de Boss. |
| apoloevent.cmd.announce | Anuncios programados. |
| apoloevent.boss | Entrar al evento Boss. |
| apoloevent.join | Participar. |
| apoloevent.backroom, apoloevent.horse | Acceso específico a esas modalidades. |
| apoloevent.staff | Panel y acciones de staff. |
| apoloevent.spectator | Acceso de espectador. |
| apoloevent.top | Consultar clasificaciones. |
| apoloevent.bypass | Omitir restricciones compatibles con bypass. |
| apoloevent.colormatch.admin | Administración de ColorMatch. |
| apoloevent.airdrop.track | Seguimiento de AirDrop. |
| apoloevent.airdrop.admin | Administración de AirDrop. |

Los comandos de administrador aceptan evento.admin, apoloevent.admin o el nodo específico correspondiente.