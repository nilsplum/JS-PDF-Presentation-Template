#!/bin/bash

echo "Starting the presentation development server..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Dependencies not installed. Please run ./setup.sh first."
    exit 1
fi

npm run dev

# The script will terminate when the dev server is stopped (e.g., with Ctrl+C) 