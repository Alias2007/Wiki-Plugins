<a id="rewards"></a>
# Recompensas y zonas AFK

## Recompensas diarias y semanales

Los menús se encuentran en `rewards/menus/`; las reclamaciones se guardan en `reward-claims.yml`.

```
/rewards
/rewards open <menu>
/rewards reload
/rewards reset <jugador> [menu] [recompensa]
/rewards forceopen <jugador> [menu]
```

Admiten cooldown individual, permisos, objetos, monedas internas y comandos de consola.

## Zonas AFK

Cada zona se guarda en `afk-zones/<nombre>.yml`. Puede configurar tiempo, tiradas, probabilidades, permisos, comandos, objetos, título, actionbar y bossbar.

```
/afkzone wand
/afkzone create <nombre>
/afkzone redefine <nombre>
/afkzone tp <nombre>
/afkzone reload
```

`/afkzone wand` permite marcar dos esquinas: clic izquierdo y derecho. El archivo global `afk-zone.yml` controla la activación, el límite de cuentas por IP y la apariencia de la bossbar.