<a id="config"></a>
## Configuración y datos

La carpeta de trabajo es `plugins/ApoloRankUp/`. El plugin requiere Paper 1.21.4 y Java 21. Vault se utiliza cuando un nivel cobra dinero, LuckPerms es opcional para sincronizar grupos y WorldGuard para bloqueos de región.

| Archivo | Uso |
|---|---|
| `config.yml` | Nivel inicial, almacenamiento, LuckPerms, caché, bloqueos, barreras visuales, notificaciones y efectos de ascenso. |
| `levels.yml` | Definición de niveles, grupos LuckPerms existentes, costes, requisitos y recompensas. |
| `unlocks.yml` | Comandos, regiones, mundos, bloques, objetos y entidades bloqueados por nivel. |
| `levels-menu.yml` | Diseño del menú principal abierto con `/rankup` y `/rankup menu`. |
| `menu.yml` | Diseño del menú anterior de progreso, abierto con `/rankup overview`. |
| `messages.yml` | Textos del jugador y administración. |
| `players.db` | Datos SQLite cuando `storage.type: sqlite`. |
| `players.yml` | Persistencia YAML cuando `storage.type: yaml`. |
| `block-placements.yml` | Contador persistente de bloques colocados utilizado por requisitos dinámicos. |

### Integraciones y comportamiento

- **Vault:** se consulta para los costes y requisitos económicos. Si no hay un proveedor compatible y el nivel cuesta dinero, el ascenso no se procesa.
- **LuckPerms:** es opcional. ApoloRankUp no crea ni modifica grupos o Tracks. Los grupos se crean manualmente en LuckPerms, se asignan con `luckperms-group` en cada nivel y se validan con `/rankup luckperms check`.
- **WorldGuard:** las regiones de `unlocks.yml` usan el ID exacto de región y pueden restringir entrada, rotura y colocación. La barrera de cristal opcional es visual y por jugador; no reemplaza ni modifica el terreno real. Aunque `barrier.enabled` esté desactivado, el bloqueo de la región sigue vigente.
- **Requisitos dinámicos:** `levels.yml` admite 15 tipos de requisitos, comparadores para placeholders, seguimiento persistente de bloques colocados y consumo configurable de dinero/objetos. Ver [Requisitos dinámicos](#requirements).
- **Bloqueos:** `unlocks.yml` incluye comandos, regiones, mundos, bloques, uso/crafteo de ítems y ataques a entidades; se pueden configurar bypass por categoría, ocultación del autocompletado, expulsión al spawn y barreras visuales.
- **SQL:** SQLite es la opción local recomendada para un solo servidor; MySQL permite compartir niveles entre servidores. Cambiar el backend requiere reiniciar y planificar migración/copias de seguridad.
- **Menús separados:** `levels-menu.yml` controla el menú principal paginado; `menu.yml` solo controla el menú legado `/rankup overview`.
- El caché de `/rankup top` se controla en `config.yml` → `top.cache-seconds`.
