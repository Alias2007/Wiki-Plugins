---
layout: default
title: Eventos
---

# Eventos y minijuegos

## Backroom
Carrera por un mapa con checkpoints, meta, espectadores, habilidades y PvP configurable. Incluye rastro de partículas hacia la meta, objetos de velocidad y fuerza, y brújula rastreadora. La integración opcional con UltimateClans permite configurar el combate entre miembros del mismo clan o aliados, si son participantes activos y el PvP está habilitado. Configuración: `events/backroom.yml`.

## Carrera de caballos
Competencia con monturas, checkpoints secuenciales, límite de tiempo, objetos especiales y recompensas por posición. Configuración: `events/horse.yml`.

## ColorMatch
Minijuego de supervivencia por colores con rondas, perfiles de arena, efectos y recompensas. Permite preparar lobby y región, construir arena, iniciar y detener partidas. Los bloques se restauran al finalizar. Configuración: `events/colormatch.yml`.

## Boss
Evento contra un jefe configurable con barra de vida, anuncios, ayudantes y recompensas. La participación se detecta mediante la región WorldGuard configurada en `events/boss.yml`; entrar registra al jugador y salir lo retira. No hay teletransporte automático. El evento Boss no captura ni restaura el inventario: al morir, el participante pierde sus objetos y queda fuera del evento.

Jefes integrados documentados: Warden, Wither, Ravager, Zombie grande con cabeza de calabaza y equipo de hierro, Piglin Brute. Los bosses personalizados se crean con `/evento boss crear <id>` y se guardan en `plugins/ApoloEvent/bosses/`.

## Eclipse de Sangre
Evento de supervivencia PvP nocturna con oleadas de criaturas. Gana el último participante en pie. Configuración: `events/eclipse.yml`.

## MiniGames
El menú se abre con `/evento minigames`. Permite preparar arenas base de Spleef, ColorMatch, Minefield y JumpRun. La documentación de la versión consultada indica que esos juegos todavía no cuentan con partidas jugables completas: por ahora se guardan arenas y ubicaciones.

## AirDrop
Entregas programadas mediante `airdrop.times` o manuales con `/airdrop spawn`. Incluye avisos previos, rarezas, caducidad, recompensas, holograma y seguimiento con brújula o `/airdrop track`. Configuración: `airdrop.yml`.

## Bosses automáticos de minas
Se configuran en `mine-events.yml`. Cada jefe puede tener región, nombre de mina, anuncios, efectos, animaciones y guardianes. El estado puede persistir mediante `mine-boss-state.yml`. Variables de anuncio: `{boss}`, `{mine}`, `{world}`, `{x}`, `{y}` y `{z}`.
