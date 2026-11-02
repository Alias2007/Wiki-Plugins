<a id="variables"></a>
## Variables y placeholders

### PlaceholderAPI — tops de eventos

La expansión de tops usa el identificador apoloevent. Categorías admitidas: horse, backroom, boss, mineboss y el alias mine_boss.

| Patrón | Devuelve |
|---|---|
| %apoloevent_<categoria>_top_<1-10>_name% | Nombre del jugador en esa posición histórica. |
| %apoloevent_<categoria>_top_<1-10>_score% | Puntuación de esa posición histórica. |
| %apoloevent_<categoria>_<all|week|month>_top_<1-10>_name% | Nombre por período. |
| %apoloevent_<categoria>_<all|week|month>_top_<1-10>_score% | Puntuación por período. |
| %apoloevent_<categoria>_position% | Posición del jugador consultado en el histórico. |
| %apoloevent_<categoria>_score% | Puntuación histórica del jugador consultado. |
| %apoloevent_<categoria>_<all|week|month>_position% | Posición por período. |
| %apoloevent_<categoria>_<all|week|month>_score% | Puntuación por período. |

Las posiciones de top se limitan a 1–10. Si el jugador no tiene posición, la expansión devuelve -; si una posición del top no tiene datos, devuelve Sin datos para nombre y 0 para puntuación.

Ejemplos:
~~~text
%apoloevent_horse_top_1_name%
%apoloevent_backroom_week_top_3_score%
%apoloevent_boss_month_position%
%apoloevent_mineboss_score%
~~~

### PlaceholderAPI — AirDrop

El identificador de la expansión es apoloevent_airdrop.

| Placeholder | Significado |
|---|---|
| %apoloevent_airdrop_enabled% | Si el AirDrop está habilitado/ejecutándose. |
| %apoloevent_airdrop_world% | Mundo configurado. |
| %apoloevent_airdrop_timezone% | Zona horaria para los horarios. |
| %apoloevent_airdrop_max_radius% | Radio máximo de aparición. |
| %apoloevent_airdrop_min_radius% | Radio protegido alrededor del spawn. |
| %apoloevent_airdrop_times% | Horarios programados concatenados. |
| %apoloevent_airdrop_active_crates% | Crates que siguen activas. |
| %apoloevent_airdrop_last_timestamp% | Timestamp Unix de la última aparición. |
| %apoloevent_airdrop_last_x%, %apoloevent_airdrop_last_y%, %apoloevent_airdrop_last_z% | Coordenadas de la última aparición. |
| %apoloevent_airdrop_last_world% | Mundo de la última aparición. |
| %apoloevent_airdrop_last_tier% | Rareza de la última crate. |

### Variables en mensajes y anuncios

| Variable | Uso |
|---|---|
| {boss} | Nombre del Boss. |
| {mine} | Nombre visible de la mina. |
| {world} | Mundo del evento o aparición. |
| {x}, {y}, {z} | Coordenadas. |
| {minutes}, {time} | Minutos restantes y hora programada en el aviso previo de AirDrop. |
| {crate} | Rareza/tipo de crate en el aviso de desaparición. |
| {player}, {uuid}, {item}, {reward} | Datos de jugador/objeto/recompensa en mensajes o comandos de recompensa de Boss. |

Las variables entre llaves son tokens de texto de configuración; no son placeholders de PlaceholderAPI a menos que se encuentren dentro de un placeholder con formato %.