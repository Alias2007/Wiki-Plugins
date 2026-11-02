---
layout: default
title: Instalación
---

# Instalación y actualización

## Instalar

1. Descarga el JAR desde [Releases](https://github.com/Alias2007/ApoloEvent-v2.0/releases) o consulta los artefactos de [GitHub Actions](https://github.com/Alias2007/ApoloEvent-v2.0/actions).
2. Coloca `ApoloEvent-<versión>.jar` en la carpeta `plugins/`.
3. Inicia el servidor para generar los archivos.
4. Detén el servidor y revisa `plugins/ApoloEvent/`.
5. Configura mensajes, eventos, menús, mapas y permisos.
6. Inicia y valida las funciones en un entorno de prueba.

## Actualizar

1. Apaga el servidor.
2. Haz una copia de seguridad de mundos y de `plugins/ApoloEvent/`.
3. Sustituye el JAR por la nueva versión.
4. Inicia y revisa la consola.
5. Comprueba las configuraciones y prueba los eventos antes de abrirlos al público.

## Compilar desde el código fuente

Requisitos: JDK 21 y Maven 3.9 o superior.

```bash
git clone https://github.com/Alias2007/ApoloEvent-v2.0.git
cd ApoloEvent-v2.0
mvn clean package
```

El artefacto se genera en `target/ApoloEvent-<versión>.jar`.
