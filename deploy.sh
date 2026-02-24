#!/bin/bash
set -e

APP_DIR="/root/app"
BE_DIR="$APP_DIR/TUVI-BE"
COMPOSE="docker compose -f $BE_DIR/docker/docker-compose.yml"

echo "🚀 Starting deploy at $(date)"
echo "=================================="

# ── 1. Backup current state ──
cd "$APP_DIR"
PREV_SHA=$(git rev-parse HEAD)
echo "📌 Previous commit: $PREV_SHA"

# ── 2. Pull latest code ──
git pull origin master
NEW_SHA=$(git rev-parse HEAD)
echo "📥 New commit: $NEW_SHA"

if [ "$PREV_SHA" = "$NEW_SHA" ]; then
  echo "ℹ️ No changes to deploy."
  exit 0
fi

# ── 3. Run DB migrations ──
echo ""
echo "🗄️ Running DB migrations..."
cd "$BE_DIR"
$COMPOSE exec -T app sh -c "cd /usr/src/app && npx typeorm-ts-node-commonjs migration:run -d src/config/data-source.config.ts" 2>&1 || {
  echo "⚠️ Migration in running container failed (may need rebuild first)"
}

# ── 4. Rebuild & restart Docker containers ──
echo ""
echo "🔨 Building and restarting containers..."
$COMPOSE up -d --build app cms

# ── 5. Wait for container startup ──
echo ""
echo "⏳ Waiting for containers to start..."
sleep 15

# ── 6. Health check (3 attempts, 10s apart) ──
echo "🏥 Running health checks..."
HEALTHY=false
for i in 1 2 3; do
  HTTP_CODE=$(curl -sf -o /dev/null -w "%{http_code}" http://localhost:3000/auth/health 2>/dev/null || echo "000")
  if [ "$HTTP_CODE" = "200" ]; then
    HEALTHY=true
    echo "✅ Backend healthy (attempt $i, HTTP $HTTP_CODE)"
    break
  fi
  echo "⏳ Attempt $i/3 — HTTP $HTTP_CODE, retrying in 10s..."
  sleep 10
done

if [ "$HEALTHY" = true ]; then
  # Run migrations again after rebuild (in case schema changed)
  echo ""
  echo "🗄️ Running post-build migrations..."
  $COMPOSE exec -T app sh -c "cd /usr/src/app && npx typeorm-ts-node-commonjs migration:run -d src/config/data-source.config.ts" 2>&1 || true

  echo ""
  echo "=================================="
  echo "🎉 Deploy successful!"
  echo "   Commit: $NEW_SHA"
  echo "   Time: $(date)"
  exit 0
fi

# ── 7. Rollback ──
echo ""
echo "❌ Health check failed! Rolling back..."
cd "$APP_DIR"
git checkout "$PREV_SHA"

# Revert migrations
echo "🗄️ Reverting migrations..."
$COMPOSE exec -T app sh -c "cd /usr/src/app && npx typeorm-ts-node-commonjs migration:revert -d src/config/data-source.config.ts" 2>&1 || true

# Rebuild with old code
$COMPOSE up -d --build app cms

echo ""
echo "=================================="
echo "🔄 Rolled back to $PREV_SHA"
echo "   Time: $(date)"
exit 1
