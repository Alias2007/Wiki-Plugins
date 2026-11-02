---
layout: default
title: Integraciones
---

# Integraciones

Las integraciones pueden ser opcionales y dependen de las versiones instaladas.

## WorldGuard
El evento Boss usa una región para registrar participantes al entrar y retirarlos al salir. Configura `region.world` y `region.id` en `events/boss.yml`. No hay teletransporte automático. En Backroom revisa que la región permita PvP.

## UltimateClans
Permite ajustar si participantes de Backroom pueden atacarse aunque pertenezcan al mismo clan o a clanes aliados:
```yaml
integrations:
  ultimateclans:
    enabled: true
    same-clan: true
    allies: true
```
Solo se aplica a participantes activos de Backroom cuando el PvP está habilitado.

## PlaceholderAPI
Placeholders documentados:
- `%apoloevent_horse_top_1_name%`
- `%apoloevent_horse_week_top_1_score%`
- `%apoloevent_boss_position%`
- `%apoloevent_mineboss_month_score%`

La disponibilidad exacta depende de la versión.

## Vault
Se utiliza para recompensas monetarias cuando está disponible y configurado. Comprueba que exista un proveedor de economía compatible.

## Discord Webhook
El webhook para anuncios de bosses de minas se configura en `mine-events.yml`, dentro de `mine-events.discord-webhook`. Está desactivado por defecto. Mantén privada la URL.
