#!/bin/bash
set -e

echo "Building API server..."
cd artifacts/api-server
npm install --legacy-peer-deps
npm run build
