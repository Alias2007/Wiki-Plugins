<a id="combat"></a>
# Combate y mensajes de muerte

El core incorpora sistema de combate y sanción por desconexión en combate, con acciones configurables como ejecución, pérdida de inventario/experiencia y multas de monedas o XP, según `combat.yml`.

Mensajes de muerte configurables:
- Archivo: `death-messages.yml`.
- Recarga: `/deathmessages reload` o `/kitpvp reload`.
- Variables: `%victim%`, `%attacker%`, `%item%`.
- Si PlaceholderAPI está instalado, también pueden utilizarse sus placeholders y los placeholders específicos de atacante expuestos por el core.
- Para ocultar una causa, deja su texto vacío.