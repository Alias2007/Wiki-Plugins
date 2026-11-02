<a id="variables"></a>
## Variables y placeholders

### Placeholders internos de ScorebordLs

Los siguientes placeholders se usan con porcentaje a cada lado, por ejemplo %player%.

| Grupo | Placeholders |
|---|---|
| Jugador | %player%, %uuid%, %world%, %gamemode%, %ping%, %ping_color%, %health%, %health_int%, %max_health%, %health_bar%, %food%, %x%, %y%, %z%, %kit%, %combat%, %combat_time%. |
| Progreso | %kills%, %deaths%, %assists%, %level%, %coins%, %streak%, %maxstreak%, %xp%, %koth_wins%, %kdr%, %xp_needed%, %xp_remaining%, %xp_percent%, %xp_bar%. |
| Valores exactos | Las cifras grandes se pueden representar abreviadas; usa el sufijo _raw para obtener el valor sin abreviar, por ejemplo %kills_raw%. |
| Rango | %rank%, %rank_display%, %prefix%, %suffix%, %group_weight%. |
| Clan | %clan%, %clan_tag%, %clan_rank%. |
| Servidor | %online%, %online_world%, %max_players%, %staff_online%, %server_name%, %tps%, %tps_color%, %mspt%, %memory_used%, %memory_max%, %memory_percent%, %time%, %date%. |

### Placeholders personalizados de ScorebordLs

- %custom:nombre% obtiene una entrada declarada bajo custom en ScorebordLs/placeholders.yml.
- %condition:nombre% evalúa una condición con salidas if-true e if-false.
- %animation:nombre% reproduce el texto animado definido bajo text-animations en ScorebordLs/animations.yml.
- output-replacements permite sustituir el resultado de un placeholder, por ejemplo el texto de un rango.

Las condiciones pueden consultar permission:nodo, world:nombre, comparar placeholders con =, !=, >, >=, < o <=, comprobar contenido con <-, comparar con cualquiera de varios valores mediante |= y negar una condición con !.

### PlaceholderAPI — expansión propia kitpvp

El identificador de expansión es kitpvp. Los placeholders principales publicados por el README son:

~~~text
%kitpvp_kills%
%kitpvp_deaths%
%kitpvp_kdr%
%kitpvp_coins%
%kitpvp_streak%
%kitpvp_level%
%kitpvp_clan%
%kitpvp_tagged%
%kitpvp_current_kit%
%kitpvp_tournament_status%
%kitpvp_active_event%
~~~

La expansión también contiene valores de perfil como assists, max_streak, balance, xp, required_xp, clan_tag, clan_rank, clan_members, clan_online, clan_leader, clan_allies, tag, tag_id y combat_status. Su respuesta depende de que exista un perfil o de que el jugador tenga datos de clan/tag.

### Variables de mensajes y sistemas configurables

| Contexto | Variables |
|---|---|
| Mensajes de muerte | %victim%, %player%, {player}, {display-name}, %attacker%, {fighter}, {fighter-display-name}, %item%, %world%, %cause%, %x%, %y%, %z%. |
| Reemplazo específico del atacante | %[ATTACKER]placeholder% calcula el placeholder para el atacante del combate. |
| Conditional events | %player%, %player_name%, %player_uuid%, %player_world%, %online%, %max_players%, %server_name%, %player_health%, %player_food%, %player_level%, %player_gamemode%, %player_x%, %player_y%, %player_z%, %command%, %action%, %item_material%, %item_name%, %block_type%, %is_kitpvp_block%, %victim%, %killer%, %cause%, %world_from%, %world_to%. |
| Chat | %tag%, %clan%, %rank%, %prefix%, %player%, %name%, %message%; %chatprefix% agrega el prefijo general del chat. |
| Mensajes de recompensa | {amount}, {player}, {time}, {reward}, según el mensaje. |