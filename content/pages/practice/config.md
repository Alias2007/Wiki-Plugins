<a id="config"></a>
## Configuración, almacenamiento y compatibilidad

La carpeta de datos es plugins/ApoloPractice/. Paper API 1.21.4 y Java 21 son el objetivo actual de compilación/CI. La compatibilidad de clientes depende del protocolo disponible y de las pruebas reales del servidor.

### Backend de datos

- SQLite es el backend predeterminado: perfiles en profiles.db.
- MySQL se conecta con las propiedades declaradas en config.yml.
- YAML mantiene perfiles en archivos individuales y puede importarse inicialmente a SQL.
- Cambiar el backend requiere reiniciar; /practice reload no cambia el motor de almacenamiento.

### Compatibilidad de cliente

compatibility.yml controla política global, límites del servidor, adaptadores ViaVersion/ViaBackwards/ViaRewind y excepciones por modo. También define en qué eventos del ciclo de jugador se valida versión: join, cola, duelo, entrada a arena o cambio de modo. Los límites por kit se guardan en kits.yml.

### Límites del estado actual

- Entrenamiento usa un primer adaptador NMS de ServerPlayer para Paper 1.21.4; la visibilidad, golpes recibidos y limpieza necesitan prueba en servidor real.
- Party war actual es formato de serie de lanes 1v1 en paralelo; no es combate de equipos en una arena compartida.
- Replay almacena snapshots y los muestra visualmente; no reconstruye determinísticamente cada evento.
- ViaVersion ayuda a detectar protocolos, pero no garantiza soporte universal de cualquier cliente.