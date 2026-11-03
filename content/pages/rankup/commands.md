<a id="commands"></a>
## Comandos y permisos

El comando principal es `/rankup`; alias registrado: `/ru`.

| Comando | Permiso | Descripción |
|---|---|---|
| `/rankup` | `apolorankup.use` | Abre el menú principal de niveles. |
| `/rankup menu` | `apolorankup.use` | Abre el mismo menú principal. |
| `/rankup up` | `apolorankup.use` | Comprueba los requisitos e intenta ascender al siguiente nivel. |
| `/rankup overview` | `apolorankup.use` | Abre el menú anterior de progreso, configurado en `menu.yml`. |
| `/rankup help` | — | Muestra la ayuda. |
| `/rankup unlocks [página]` | `apolorankup.use` | Lista los desbloqueos; 10 entradas por página. |
| `/rankup info [jugador]` | propio: uso público; otro jugador: `apolorankup.admin` | Muestra nivel, progreso, siguiente nivel, coste y materiales. |
| `/rankup top` | — | Muestra el top 10 por nivel. |
| `/rankup luckperms check` | `apolorankup.admin` | Comprueba que los grupos configurados existan y estén ordenados en el Track indicado. Es de solo lectura. |
| `/rankup reload` | `apolorankup.admin` | Recarga configuración, mensajes, niveles y desbloqueos. |
| `/rankup set <jugador> <nivel>` | `apolorankup.admin` | Establece un nivel existente. |
| `/rankup add <jugador> <cantidad>` | `apolorankup.admin` | Avanza una cantidad de posiciones dentro de la escalera configurada. |

### Permisos

| Permiso | Alcance |
|---|---|
| `apolorankup.use` | Usar el sistema RankUp. |
| `apolorankup.admin` | Administración y comandos administrativos. |
| `apolorankup.bypass` | Omite todos los bloqueos por nivel. |
| `apolorankup.bypass.commands` | Omite bloqueos de comandos. |
| `apolorankup.bypass.regions` | Omite bloqueos de regiones WorldGuard. |
| `apolorankup.bypass.worlds` | Omite bloqueos de mundos/dimensiones. |
| `apolorankup.bypass.blocks` | Omite bloqueos de romper/colocar bloques. |
| `apolorankup.bypass.items` | Omite bloqueos de usar/craftear objetos. |
| `apolorankup.bypass.entities` | Omite bloqueos de ataque a entidades. |

Los permisos de bypass se registran por defecto para OP, salvo el permiso base de uso que está disponible para todos. No concedas el bypass general si solo necesitás liberar una categoría.
