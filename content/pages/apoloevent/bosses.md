<a id="bosses"></a>
## Bosses y bosses de minas

### Evento Boss

El evento reconoce participantes al entrar a una región de WorldGuard configurada en `events/boss.yml`. No los teletransporta automáticamente. Revisa `region.world` y `region.id`.

Jefes integrados:
1. Warden
2. Wither
3. Ravager
4. Zombie grande con cabeza de calabaza y equipo de hierro
5. Piglin Brute

```
/evento boss seleccionar <1-5>
/evento boss start
/evento boss stop
/evento boss crear <id>
/evento boss listar
/evento boss editar <id>
/evento boss invocar <id>
/evento boss eliminar <id>
```

Los jefes personalizados se guardan en `plugins/ApoloEvent/bosses/`. Pueden definir estadísticas, equipo, habilidades periódicas, fases por porcentaje de vida, ayudantes y reaparición. El archivo `example.yml` sirve como plantilla.

**Inventario:** el evento Boss no captura ni restaura el inventario. Al morir, el participante pierde sus objetos y queda fuera del evento.

### Webhook de derrota — versión 0.5.120

El webhook de Discord del Boss principal admite una sección `defeat` con mensaje y embed configurables. Las variables disponibles incluyen:

- `{player}`: jugador que derrotó al Boss.
- `{boss}`: nombre del Boss derrotado.
- `{reward}`: resumen de la recompensa especial y la recompensa base entregadas.

### Bosses automáticos de minas

Se configuran en `mine-events.yml`. Admiten regiones, nombre de mina, anuncios, efectos, animaciones, guardianes y persistencia de bosses vivos en `mine-boss-state.yml` cuando está activada. Las recompensas de objetos por boss se configuran por separado en `BossMina/rewards.yml`; consulta la [guía de recompensas BossMina](rewards) para ver probabilidades, materiales, nombres, lore y mensajes.

En la versión 0.5.120, el webhook de derrota de mina también admite un embed con jugador, boss, mina, recompensa y coordenadas (`{x}`, `{y}`, `{z}`); incluye además `{world}` para el mundo de la derrota. La sección se configura en `mine-events.discord-webhook.defeat`.

Fuente: [commit 0.5.120](https://github.com/Alias2007/ApoloEvent-v2.0/commit/4ffdbf43edf51625583df91b7e6a651b2ad726c2).
