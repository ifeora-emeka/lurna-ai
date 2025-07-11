#!/bin/sh
set -e

mkdir -p /data/database

echo "Running database migrations..."
NODE_ENV=production npx sequelize-cli db:migrate

echo "Starting application..."
exec node dist/server.js
