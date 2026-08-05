#!/usr/bin/env bash
# Smoke test a deployed page: must return 200 and every referenced asset must load.
set -uo pipefail

URL="${1:-https://smarty.tel/pricing/}"
FAILED=0
TMP="$(mktemp -d)"
HTML="$TMP/page.html"

echo "== Smoke testing $URL"

# 1) Page returns 200 (following redirects) and no /public_html/ in the final URL.
read -r STATUS FINAL_URL < <(
  curl -sS -L --max-time 30 --compressed -o "$HTML" \
    -w '%{http_code} %{url_effective}\n' "$URL" || echo "000 -"
)

echo "status: $STATUS"
echo "final url: $FINAL_URL"

if [ "$STATUS" != "200" ]; then
  echo "::error::Expected HTTP 200 for $URL but got $STATUS"
  FAILED=1
fi

case "$FINAL_URL" in
  */public_html/*)
    echo "::error::Final URL still contains /public_html/: $FINAL_URL"
    FAILED=1
    ;;
esac

if ! grep -aqi '<div id="root"\|<!DOCTYPE html' "$HTML"; then
  echo "::error::Response body does not look like the app shell"
  FAILED=1
fi

# 2) Every local asset referenced by the page must return 2xx.
BASE="${FINAL_URL%/*}/"
ORIGIN="$(printf '%s' "$FINAL_URL" | awk -F/ '{print $1"//"$3}')"

ASSETS="$(
  grep -aoE '(src|href)="[^"]+"' "$HTML" \
    | sed -E 's/^(src|href)="//; s/"$//' \
    | grep -vE '^(#|mailto:|tel:|data:|javascript:)' \
    | grep -vE '^https?://' \
    | grep -E '\.(js|mjs|css|png|jpe?g|svg|webp|ico|woff2?|json|xml|txt)$' \
    | sort -u
)"

if [ -z "$ASSETS" ]; then
  echo "::warning::No local assets found in the HTML to verify"
fi

while IFS= read -r asset; do
  [ -z "$asset" ] && continue
  case "$asset" in
    /*) full="$ORIGIN$asset" ;;
    *)  full="$BASE$asset" ;;
  esac
  code="$(curl -sS -L --max-time 20 -o /dev/null -w '%{http_code}' "$full" || echo 000)"
  if [ "${code:0:1}" != "2" ]; then
    echo "::error::Missing asset ($code): $full"
    FAILED=1
  else
    echo "ok  $code  $full"
  fi
done <<< "$ASSETS"

if [ "$FAILED" -ne 0 ]; then
  echo "== Smoke test FAILED"
  exit 1
fi

echo "== Smoke test passed"
