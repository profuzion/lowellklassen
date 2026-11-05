#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
git pull origin main
corepack enable
corepack pnpm install --frozen-lockfile
corepack pnpm build
pm2 reload ecosystem.config.cjs --update-env || pm2 start ecosystem.config.cjs
pm2 save
