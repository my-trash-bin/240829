#!/bin/sh

set -e

cd "$(dirname "$0")"

per_package() {
  (cd "$1" && npm run build)
}

start_dir="./projects"

for dir1 in "$start_dir"/*/; do
  if [ -d "$dir1" ]; then
    for dir2 in "$dir1"*/; do
      if [ -d "$dir2" ]; then
        for dir3 in "$dir2"*/; do
          if [ -d "$dir3" ]; then
            per_package "$dir3"
          fi
        done
      fi
    done
  fi
done
