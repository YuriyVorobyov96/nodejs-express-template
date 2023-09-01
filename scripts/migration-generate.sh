#!/usr/bin/env bash
migration_name=$1

npm run typeorm -- migration:generate -d src/database/data-source.ts src/database/migrations/$1
