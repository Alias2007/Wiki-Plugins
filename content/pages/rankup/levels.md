<a id="levels"></a>
## Niveles y ascensos

El archivo levels.yml contiene la escalera de niveles bajo levels.<número>. Los números no tienen que ser consecutivos: al ascender, el plugin busca el siguiente nivel numérico configurado por encima del nivel actual.

Cada nivel admite:

| Clave | Tipo / significado |
|---|---|
| name | Nombre visible del rango; admite MiniMessage y códigos &. |
| cost | Coste económico. Requiere Vault y un proveedor de economía cuando es mayor que cero. |
| requirements.items | Mapa de materiales y cantidades que el jugador debe tener; los objetos se consumen al ascender. |
| rewards | Lista de comandos ejecutados por consola cuando el ascenso termina. |
| reward-display | Lista de textos mostrados en el menú en lugar de exponer comandos internos. |

Ejemplo:
~~~yaml
levels:
  '3':
    name: Explorador
    cost: 500
    requirements:
      items:
        IRON_INGOT: 16
    rewards:
      - "give %player% diamond 2"
    reward-display:
      - "2x Diamante"
~~~

El plugin comprueba dinero y objetos antes de procesar la subida. Si el proveedor Vault no está disponible y el nivel tiene coste, el ascenso se bloquea sin consumir materiales. Al completar el nivel se ejecutan las recompensas y se actualizan los comandos del jugador conectado.