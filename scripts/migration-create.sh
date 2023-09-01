#!/usr/bin/env bash
migration_name=$1

npm run typeorm -- migration:create src/database/migrations/$1
