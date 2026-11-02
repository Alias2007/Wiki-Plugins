#!/usr/bin/env bash
set -euo pipefail

OWNER="Alias2007"
REPO="Wiki-Plugins"
BASE_DIR="$(pwd)"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

echo "[1/4] Descargando la documentación del repositorio..."
git clone --depth 1 "git@github.com:${OWNER}/${REPO}.git" "$TMP_DIR/source"

echo "[2/4] Conectando con la Wiki nativa..."
git clone "git@github.com:${OWNER}/${REPO}.wiki.git" "$TMP_DIR/wiki"

strip_front_matter() {
  awk 'BEGIN {front=0; seen=0}
       NR==1 && $0=="---" {front=1; next}
       front && $0=="---" {front=0; seen=1; next}
       !front {print}' "$1"
}

echo "[3/4] Preparando las páginas..."
cat > "$TMP_DIR/wiki/Home.md" <<'EOF'
# ApoloEvent Wiki | ApoloMC Network

Bienvenido a la documentación oficial de **ApoloEvent**.

Esta Wiki está dedicada exclusivamente al plugin ApoloEvent. Aquí encontrarás guías de instalación, eventos, comandos, permisos, archivos de configuración, integraciones y ayuda para administradores y desarrolladores.

## Documentación

- [[Introducción|Introduccion]]
- [[Instalación y actualización|Instalacion]]
- [[Eventos y minijuegos|Eventos]]
- [[Comandos y permisos|Comandos]]
- [[Configuración|Configuracion]]
- [[Integraciones|Integraciones]]
- [[Desarrollo y compilación|Desarrollo]]
- [[Soporte y solución de problemas|Soporte]]

## Enlaces oficiales

- [Repositorio ApoloEvent](https://github.com/Alias2007/ApoloEvent-v2.0)
- [Versiones y descargas](https://github.com/Alias2007/ApoloEvent-v2.0/releases)
- [Reportar un problema](https://github.com/Alias2007/ApoloEvent-v2.0/issues)

> La documentación puede variar según la versión instalada. Comprueba los archivos y comandos disponibles en tu versión antes de aplicar cambios en producción.
EOF

cat > "$TMP_DIR/wiki/_Sidebar.md" <<'EOF'
### APOLOEVENT

- [[Inicio|Home]]
- [[Introducción|Introduccion]]
- [[Instalación|Instalacion]]
- [[Eventos|Eventos]]
- [[Comandos y permisos|Comandos]]
- [[Configuración|Configuracion]]
- [[Integraciones|Integraciones]]
- [[Desarrollo|Desarrollo]]
- [[Soporte|Soporte]]

[Repositorio](https://github.com/Alias2007/ApoloEvent-v2.0)
EOF

declare -A PAGES=(
  ["inicio.md"]="Introduccion.md"
  ["instalacion.md"]="Instalacion.md"
  ["eventos.md"]="Eventos.md"
  ["comandos.md"]="Comandos.md"
  ["configuracion.md"]="Configuracion.md"
  ["integraciones.md"]="Integraciones.md"
  ["desarrollo.md"]="Desarrollo.md"
  ["soporte.md"]="Soporte.md"
)

for source_file in "${!PAGES[@]}"; do
  strip_front_matter "$TMP_DIR/source/docs/$source_file" > "$TMP_DIR/wiki/${PAGES[$source_file]}"
done

echo "[4/4] Publicando páginas en GitHub Wiki..."
cd "$TMP_DIR/wiki"
git add Home.md _Sidebar.md Introduccion.md Instalacion.md Eventos.md Comandos.md Configuracion.md Integraciones.md Desarrollo.md Soporte.md
if git diff --cached --quiet; then
  echo "La Wiki ya está actualizada; no hay cambios para publicar."
  exit 0
fi
git commit -m "docs: publish ApoloEvent documentation wiki"
git push origin master 2>/dev/null || git push origin main 2>/dev/null || git push origin HEAD

echo "Wiki publicada correctamente."
echo "https://github.com/${OWNER}/${REPO}/wiki"
