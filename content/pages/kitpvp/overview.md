# KitPvP-Core

> Core modular de KitPvP para Paper 1.21.4. Esta sección documenta los sistemas del proyecto, sus comandos, permisos, variables y archivos.

<span class="doc-meta">Paper 1.21.4 · Java 21 · Maven · Versión del proyecto: 1.0.11</span>

<a id="overview"></a>
## Resumen

KitPvP-Core reúne combate, kits mediante GUI, NPCs nativos, arenas, torneos, eventos automáticos, economía interna, clanes, misiones, cosméticos y almacenamiento YAML/SQL.

## Novedades de la versión 1.0.11

- Se actualizó la integración de SCON Licensing al nivel **Grado Empresa**, con protocolo HMAC-SHA256 y nonce (protocolo v2).
- El core solo inicializa sus servicios, listeners y comandos cuando la validación de licencia devuelve `VALID`.
- Se mejoró la gestión de errores y el cierre de la conexión HTTP de verificación.
- La revalidación periódica no forma parte del SDK Grado Empresa utilizado en esta versión.

**Estado:** el changelog del proyecto indica que la compilación Maven y la prueba en Paper 1.21.4 todavía estaban pendientes de verificación al registrar esta actualización. La versión del código no debe interpretarse como una prueba de funcionamiento en un servidor.

Fuente: [commit 1.0.11](https://github.com/Alias2007/KitPvP/commit/b575f9c98221eaf05ab19ba07b78733c757904c7).
