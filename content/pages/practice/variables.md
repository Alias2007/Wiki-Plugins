<a id="variables"></a>
## Variables y placeholders

### PlaceholderAPI

La expansión se registra con el identificador apolopractice. Los placeholders son:

| Placeholder | Significado |
|---|---|
| %apolopractice_queue_count% | Cantidad de jugadores en cola. |
| %apolopractice_online% | Jugadores conectados/activos en Practice según el contador de la expansión. |
| %apolopractice_elo% | Rating/ELO del jugador. |
| %apolopractice_rating% | Alias del ELO. |
| %apolopractice_wins% | Victorias. |
| %apolopractice_losses% | Derrotas. |
| %apolopractice_kills% | Bajas. |
| %apolopractice_deaths% | Muertes. |
| %apolopractice_streak% | Racha actual. |
| %apolopractice_best_streak% | Mejor racha. |
| %apolopractice_winrate% | Porcentaje de victorias. |

Los placeholders por jugador requieren perfil; queue_count/online son contadores generales. PlaceholderAPI es una integración opcional y debe estar presente para que otros plugins puedan resolver la expansión.