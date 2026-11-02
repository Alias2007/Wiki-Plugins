<a id="config"></a>
## Configuración, almacenamiento y API

Carpeta: `plugins/KitPvP-Core/`.

| Archivo | Uso |
|---|---|
| `config.yml` | Opciones generales. |
| `messages.yml` | Mensajes. |
| `death-messages.yml` | Mensajes por causa de muerte. |
| `storage.yml` | YAML, SQLite, MySQL o MariaDB. |
| `permissions.yml` | Permisos. |
| `arenas.yml`, `spawns.yml`, `npcs.yml` | Arenas, apariciones y NPCs. |
| `events.yml`, `tournaments.yml` | Eventos y torneos. |
| `ScorebordLs/` | Scoreboard y tablist. |
| `kits/` | Definiciones de kits. |
| `inventario/` | Menús editables. |

### Integraciones

Vault, PlaceholderAPI, LuckPerms y WorldGuard son dependencias opcionales según la función. EssentialsX puede coexistir: el core gestiona los comandos en conflicto y evita anuncios duplicados de muerte.

### API pública

```java
KitPvPApi api = KitPvPCore.getApi();
double balance = api.getCoins(player.getUniqueId());
api.depositCoins(player.getUniqueId(), 500.0);
boolean inCombat = api.isTagged(player.getUniqueId());
```

También está documentado el evento Bukkit `KitPvPKillEvent`, con acceso a killer y victim.