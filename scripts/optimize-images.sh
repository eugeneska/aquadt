#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

resize_if_larger() {
  local file="$1"
  local max="$2"
  local width
  width=$(sips -g pixelWidth "$file" 2>/dev/null | awk '/pixelWidth:/{print $2}')
  if [[ -n "$width" && "$width" -gt "$max" ]]; then
    sips -Z "$max" "$file" >/dev/null
  fi
}

compress_jpeg() {
  local file="$1"
  local quality="$2"
  sips -s format jpeg -s formatOptions "$quality" "$file" --out "$file" >/dev/null
}

recompress_webp() {
  local file="$1"
  local max="$2"
  local quality="$3"
  local tmp="${file%.webp}.tmp.jpg"
  sips -s format jpeg "$file" --out "$tmp" >/dev/null
  resize_if_larger "$tmp" "$max"
  cwebp -quiet -q "$quality" "$tmp" -o "$file"
  rm -f "$tmp"
}

process_jpg_webp() {
  local file="$1"
  local max="$2"
  local quality="$3"
  local webp_q="$4"
  [[ -f "$file" ]] || return 0
  resize_if_larger "$file" "$max"
  compress_jpeg "$file" "$quality"
  cwebp -quiet -q "$webp_q" "$file" -o "${file%.jpg}.webp"
  rm -f "$file"
}

process_dir_webp() {
  local dir="$1"
  local max="$2"
  local quality="$3"
  local file

  for file in "$dir"/*.jpg "$dir"/*.jpeg; do
    [[ -f "$file" ]] || continue
    resize_if_larger "$file" "$max"
    compress_jpeg "$file" "$quality"
    cwebp -quiet -q 82 "$file" -o "${file%.jpg}.webp"
    rm -f "$file"
  done
}

# Hero / section backgrounds (WebP only in production)
for spec in \
  "img/back2.jpg:1920:78:80" \
  "img/serviceback.jpg:1920:78:80" \
  "img/order.jpg:1440:80:82" \
  "img/mainpage.jpg:1280:82:75"
do
  IFS=':' read -r file max jpg_q webp_q <<< "$spec"
  process_jpg_webp "$file" "$max" "$jpg_q" "$webp_q"
done

# Gallery (WebP only)
for file in img/gallery/*.webp; do
  [[ -f "$file" ]] || continue
  recompress_webp "$file" 1400 82
done

# Styles and projects (WebP only)
process_dir_webp "img/styles" 1120 80
process_dir_webp "img/projects" 800 80

# Species stay as JPG
process_dir_jpg() {
  local dir="$1"
  local max="$2"
  local quality="$3"
  local file

  for file in "$dir"/*.jpg "$dir"/*.jpeg; do
    [[ -f "$file" ]] || continue
    resize_if_larger "$file" "$max"
    compress_jpeg "$file" "$quality"
  done
}

process_dir_jpg "img/species" 800 80

echo "Optimization complete."
du -sh img img/gallery 2>/dev/null || true
