#!/bin/sh
# Rebuild static/main.css from tools/app.css (hugo-paper theme, Tailwind v4).
#
# Why this exists: the theme's committed main.css is stale (missing `dark-bg`
# and `btn-dark` era rules). We vendor it as-is and patch the delta in
# static/custom.css. Once you rebuild, custom.css can be deleted.
#
# Requires node + npm. Run from the zola/ directory.
set -e
cd "$(dirname "$0")/.."

if [ ! -d node_modules ]; then
  npm install --no-save --no-audit --no-fund \
    @tailwindcss/cli @tailwindcss/typography
fi

npx @tailwindcss/cli \
  -i tools/app.css \
  -o static/main.css \
  --minify \
  --source templates \
  --source static \
  --source content
