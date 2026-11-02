# ApoloRankUp

> Sistema de progresión por niveles: requisitos, costes, ascensos y contenido que se habilita al avanzar.

<a id="overview"></a>
## Resumen

ApoloRankUp controla el progreso de los jugadores mediante niveles configurables. El nivel puede restringir comandos, mundos, regiones, bloques, objetos y entidades. Los requisitos se definen en archivos YAML y el sistema admite almacenamiento local o SQL.

<a id="levels"></a>
## Niveles y ascensos

El contenido de los niveles se define en `levels.yml`. Allí se configuran números/IDs de nivel, costes, materiales y recompensas.

El jugador puede:
- Consultar su progreso.
- Ver requisitos cumplidos y pendientes.
- Revisar lo que se habilita en cada nivel.
- Consultar el top de progreso.

La definición de los requisitos y recompensas se mantiene en YAML para que el administrador ajuste la escalera de progreso.

<a id="unlocks"></a>
## Desbloqueos por nivel

El archivo `unlocks.yml` determina qué acciones quedan disponibles a partir de cada nivel.

| Sección | Qué controla |
|---|---|
| `commands` | Comandos, alias y forma `plugin:comando`. También los oculta del autocompletado cuando están bloqueados. |
| `regions` | Regiones de WorldGuard: entrar, romper y/o colocar mediante `restrict`. |
| `worlds` | Acceso a mundos y dimensiones, también por portal o teletransporte. |
| `blocks.break` | Bloques que se pueden romper. |
| `blocks.place` | Bloques que se pueden colocar. |
| `items.use` | Uso de objetos, clic derecho, comer/beber o volar con élitros. |
| `items.craft` | Objetos que se pueden fabricar. |
| `entities.attack` | Entidades que se pueden atacar, cuerpo a cuerpo o con proyectiles. |

Formato breve:
```yaml
blocks:
  break:
    DIAMOND_ORE: 4
    ANCIENT_DEBRIS: 6
```

Formato extendido:
```yaml
blocks:
  break:
    DIAMOND_ORE:
      level: 4
      name: "Mineral de diamante"
      message: "Necesitas otro nivel para romperlo."
```

Materiales y entidades admiten comodines como `*_ORE` y `DIAMOND_*`. Una entrada exacta tiene prioridad sobre un comodín.

### Bloqueo de regiones

Con WorldGuard, el control considera distintas formas de entrada: caminar, volar, vehículos, perlas de ender, chorus, comandos de teletransporte, portales, reaparición y conexión al servidor dentro de la región.

La barrera de cristal es visual y por jugador; solo reemplaza aire, no modifica el terreno real. Se configura en `barrier` de `config.yml`.

### Bypass

Permisos documentados:
- `apolorankup.bypass`: ignora todos los bloqueos.
- `apolorankup.bypass.commands`
- `apolorankup.bypass.regions`
- `apolorankup.bypass.worlds`
- `apolorankup.bypass.blocks`
- `apolorankup.bypass.items`
- `apolorankup.bypass.entities`

Por defecto, los bypass están reservados a operadores.

<a id="commands"></a>
## Comandos y permisos

| Comando | Función |
|---|---|
| `/rankup`, `/ru` | Intenta ascender. |
| `/rankup menu` | Menú con progreso, requisitos, recompensas y próximos desbloqueos. |
| `/rankup unlocks [página]` | Lista los desbloqueos por nivel. |
| `/rankup info [jugador]` | Consulta progreso. Ver a otro jugador requiere `apolorankup.admin`. |
| `/rankup top` | Muestra el top 10. |
| `/rankup set <jugador> <nivel>` | Admin: establece un nivel configurado. |
| `/rankup add <jugador> <cantidad>` | Admin: avanza esa cantidad de niveles. |
| `/rankup reload` | Recarga configuración, mensajes, niveles, desbloqueos y menú. |

Los comandos `set`, `add` e `info <jugador>` consultan perfiles existentes por nombre. No crean un perfil nuevo si el jugador nunca entró.

Permiso administrativo documentado: `apolorankup.admin`.

<a id="config"></a>
## Configuración, almacenamiento e integraciones

| Archivo | Función |
|---|---|
| `config.yml` | Almacenamiento, avisos y efectos de ascenso. |
| `levels.yml` | Niveles, costes, materiales y recompensas. |
| `unlocks.yml` | Desbloqueos y restricciones por nivel. |
| `messages.yml` | Mensajes del plugin. |
| `menu.yml` | Diseño del menú. |

### Almacenamiento

La opción `storage.type` admite:
```yaml
storage:
  type: sqlite # yaml | sqlite | mysql
```

- `sqlite`: crea `players.db`.
- `mysql` / `mariadb`: almacenamiento de red; permite compartir niveles entre servidores.
- `yaml`: usa `players.yml`.

Si la tabla SQLite/MySQL está vacía, se importa `players.yml` automáticamente. Los cambios del backend requieren reiniciar.

### Integraciones

- **Vault + economía:** permite niveles con coste monetario.
- **WorldGuard:** aplica bloqueos por región.

No se documentan placeholders propios de PlaceholderAPI en el README actual.
