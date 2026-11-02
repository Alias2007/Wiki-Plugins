<a id="backroom"></a>
## Backroom

Carrera por un mapa con puntos de control y meta. Incorpora espectadores, habilidades, PvP configurable, partículas para orientar a los participantes, objetos de velocidad/fuerza y brújula rastreadora.

**Configuración:** `events/backroom.yml`.

**Integración de clanes:** UltimateClans puede permitir o bloquear el combate entre miembros del mismo clan y aliados. Solo afecta a participantes activos cuando el PvP del evento está habilitado.

```yaml
integrations:
  ultimateclans:
    enabled: true
    same-clan: true
    allies: true
```