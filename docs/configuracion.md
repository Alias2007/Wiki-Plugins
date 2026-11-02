---
layout: default
title: Configuración
---

# Configuración y archivos YAML

Los archivos se encuentran en `plugins/ApoloEvent/`. Haz copias antes de editar y respeta la indentación YAML.

| Archivo o carpeta | Uso |
|---|---|
| `config.yml` | Ajustes generales, integraciones y tops. |
| `messages.yml` | Mensajes, ayuda, títulos y textos editables. |
| `inventario/*.yml` | Diseño y contenido de menús. |
| `events/backroom.yml` | Backroom y opciones de PvP. |
| `events/horse.yml` | Carrera de caballos. |
| `events/boss.yml` | Boss integrado, spawns, mensajes y recompensas. |
| `events/colormatch.yml` | ColorMatch. |
| `events/eclipse.yml` | Eclipse de Sangre. |
| `bosses/*.yml` | Definiciones de jefes personalizados. |
| `mine-events.yml` | Regiones, temporizadores y bosses de minas. |
| `mine-boss-state.yml` | Estado persistente de bosses de minas. |
| `airdrop.yml` | Horarios, aparición, seguimiento y recompensas. |
| `recovery.yml` | Datos y opciones de recuperación. |
| `event-tops.db` | Base SQLite de clasificaciones. |
| `audit.log` | Registro de acciones administrativas. |

## UltimateClans
En `config.yml`:
```yaml
integrations:
  ultimateclans:
    enabled: true
    same-clan: true
    allies: true
```
Permite habilitar o deshabilitar por separado el combate entre miembros del mismo clan y aliados durante Backroom.

## Recompensas
Las recompensas por puesto pueden incluir `enabled`, `experience`, `commands` e `items`. Ejemplo:
```yaml
items:
  - DIAMOND:3
```

## Tops
Los tops se guardan en SQLite (`event-tops.db`) y se consultan en total, semana y mes. Las recompensas semanales del top 3 se configuran en `tops.rewards.weekly` y están desactivadas por defecto.

## Textos
La actualización automática puede añadir claves nuevas y actualizar textos no personalizados. Los respaldos se guardan en `backups/`. Para desactivarla: `auto-update-texts: false` en `config.yml`.
