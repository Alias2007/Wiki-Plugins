---
layout: default
title: Desarrollo y compilación
---

# Desarrollo y compilación

## Entorno
- JDK 21.
- Maven 3.9 o superior.
- API objetivo documentada: Paper 1.21.4.

## Clonar
```bash
git clone git@github.com:Alias2007/ApoloEvent-v2.0.git
cd ApoloEvent-v2.0
```
También puedes usar HTTPS:
```bash
git clone https://github.com/Alias2007/ApoloEvent-v2.0.git
```

## Compilar
```bash
mvn clean package
```
El JAR se genera en `target/ApoloEvent-<versión>.jar`.

Comprobación estructural:
```bash
tools/check-syntax.sh
```

## Enlaces
- [Actions](https://github.com/Alias2007/ApoloEvent-v2.0/actions)
- [Releases](https://github.com/Alias2007/ApoloEvent-v2.0/releases)

No incluyas tokens, contraseñas ni URLs privadas de webhooks en commits.
