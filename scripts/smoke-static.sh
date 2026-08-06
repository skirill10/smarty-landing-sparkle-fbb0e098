#!/usr/bin/env bash
# Validate the static artifact itself before it can replace the deploy branch.
set -euo pipefail

ROOT="${1:-dist/client}"
PORT="${SMOKE_PORT:-4179}"

test -f "$ROOT/index.html" || {
  echo "::error::$ROOT/index.html is missing"
  exit 1
}
test -f "$ROOT/version.json" || {
  echo "::error::$ROOT/version.json is missing"
  exit 1
}

python3 -m http.server "$PORT" --directory "$ROOT" >/tmp/smartytel-smoke-server.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for _ in $(seq 1 20); do
  curl -fsS "http://127.0.0.1:$PORT/" >/dev/null && break
  sleep 0.25
done

for path in / /pricing/ /rates/ /llm-info/ /es/ /version.json; do
  bash scripts/smoke-test.sh "http://127.0.0.1:$PORT$path"
done

# Every HTML document and its directly referenced root-relative asset must exist.
while IFS= read -r html; do
  while IFS= read -r asset; do
    [ -z "$asset" ] && continue
    asset="${asset%%\?*}"
    test -f "$ROOT/${asset#/}" || {
      echo "::error::Missing static asset $asset referenced by $html"
      exit 1
    }
  done < <(
    grep -aoE '(src|href)="/[^"]+"' "$html" \
      | sed -E 's/^(src|href)="//; s/"$//' \
      | grep -E '\.(js|mjs|css|png|jpe?g|svg|webp|ico|woff2?|json)(\?.*)?$' \
      | sort -u || true
  )
done < <(find "$ROOT" -type f -name '*.html' -print)

echo "== Static artifact smoke test passed"