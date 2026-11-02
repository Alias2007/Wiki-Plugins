<a id="commands"></a>
## Comandos y permisos

El comando principal es /rankup; el alias registrado es /ru.

| Comando | Permiso | Descripción |
|---|---|---|
| /rankup | apolorankup.use | Intenta ascender al siguiente nivel configurado. |
| /rankup menu | apolorankup.use | Abre el menú de progreso, requisitos, recompensas y desbloqueos. |
| /rankup unlocks [página] | apolorankup.use | Lista los desbloqueos y los niveles necesarios; 10 entradas por página. |
| /rankup info [jugador] | propio: uso público; otro jugador: apolorankup.admin | Muestra nivel actual, progreso, siguiente nivel, coste y materiales. |
| /rankup top | público | Muestra el top 10 por nivel. |
| /rankup reload | apolorankup.admin | Recarga configuración, mensajes, niveles y desbloqueos. |
| /rankup set <jugador> <nivel> | apolorankup.admin | Establece un nivel existente. |
| /rankup add <jugador> <cantidad> | apolorankup.admin | Avanza una cantidad de posiciones dentro de la escalera configurada. |

### Permisos de bypass

| Permiso | Alcance |
|---|---|
| apolorankup.bypass | Omite todos los bloqueos. |
| apolorankup.bypass.commands | Omite bloqueos de comandos. |
| apolorankup.bypass.regions | Omite bloqueos de regiones WorldGuard. |
| apolorankup.bypass.worlds | Omite bloqueos de mundos/dimensiones. |
| apolorankup.bypass.blocks | Omite bloqueos de romper/colocar bloques. |
| apolorankup.bypass.items | Omite bloqueos de usar/craftear objetos. |
| apolorankup.bypass.entities | Omite bloqueos de ataque a entidades. |

Los permisos de bypass se entregan por defecto a OP según el registro del plugin. No concedas el bypass general si solo necesitas liberar una categoría.