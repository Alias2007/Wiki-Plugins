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