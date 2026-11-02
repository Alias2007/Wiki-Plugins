<a id="config"></a>
## Configuración y datos

La carpeta de trabajo es plugins/ApoloRankUp/. El plugin requiere Paper y Java 21; Vault se utiliza cuando un nivel cobra dinero y WorldGuard para bloqueos de región.

| Archivo | Uso |
|---|---|
| config.yml | Nivel inicial, almacenamiento, caché, bloqueos, barreras visuales, notificaciones y efectos de ascenso. |
| levels.yml | Definición de niveles, costes, requisitos y recompensas. |
| unlocks.yml | Comandos, regiones, mundos, bloques, objetos y entidades bloqueados por nivel. |
| menu.yml | Diseño del menú gráfico de RankUp. |
| messages.yml | Textos del jugador y administración. |
| players.db | Datos SQLite cuando storage.type es sqlite. |
| players.yml | Persistencia YAML cuando storage.type es yaml. |

### Integraciones y comportamiento

- Vault: se consulta para cobrar cost en levels.yml. Si no hay un proveedor compatible y el nivel cuesta dinero, el ascenso no se procesa.
- WorldGuard: regions en unlocks.yml se relaciona con el ID exacto de región. La barrera de cristal opcional es visual y por jugador; no reemplaza ni modifica el terreno real. Aunque barrier.enabled esté desactivado, el bloqueo de la región sigue vigente.
- SQL: SQLite es la opción local recomendada para un solo servidor; MySQL permite compartir niveles entre servidores. Cambiar el backend requiere reiniciar y planificar migración/copias de seguridad.
- El caché de /rankup top se controla en config.yml top.cache-seconds.