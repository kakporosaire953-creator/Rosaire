#!/bin/bash
set -e

echo "Building API server..."
cd artifacts/api-server
npm install
npm run build
