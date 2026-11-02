---
layout: default
title: Soporte
---

# Soporte y solución de problemas

## Antes de reportar un error
Incluye versión de ApoloEvent, versión de Minecraft/Paper, versión de Java, mensaje de consola, pasos para reproducir y archivos de configuración relevantes ocultando secretos.

Abre un [Issue](https://github.com/Alias2007/ApoloEvent-v2.0/issues).

## Comprobaciones iniciales
- Confirma que el servidor utiliza Java 21.
- Comprueba que el JAR corresponde a la versión esperada.
- Revisa errores YAML e indentación.
- Verifica dependencias opcionales.
- Comprueba permisos y regiones de WorldGuard.
- Revisa la consola después de `/evento reload`.

## Limitaciones conocidas documentadas
- El sistema prepara un mundo por modalidad/evento; no crea múltiples sesiones simultáneas del mismo tipo mediante copias dinámicas independientes.
- La clonación de mundos, recuperación de snapshots y comportamiento de monturas deben validarse en un servidor real.
- MiniGames permite preparar arenas, pero Spleef, Minefield y JumpRun todavía no cuentan con partidas jugables completas.
- Algunas interfaces internas están en proceso de separación.
- El evento Boss no captura ni restaura inventario al morir.

Haz copias de seguridad antes de actualizar o probar funciones que modifiquen mundos. Mantén privados tokens, credenciales y webhooks.
