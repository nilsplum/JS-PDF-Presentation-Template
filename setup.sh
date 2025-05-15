#!/bin/bash

echo "Setting up the presentation environment..."

# Check for Node.js and npm
if ! command -v node > /dev/null 2>&1; then
    echo "Error: Node.js is not installed. Please install Node.js and npm."
    exit 1
fi

if ! command -v npm > /dev/null 2>&1; then
    echo "Error: npm is not installed. Please install Node.js and npm."
    exit 1
fi

echo "Installing dependencies using npm..."
# This will install dependencies from package.json, including TailwindCSS if it's added there.
npm install

if [ $? -eq 0 ]; then
    echo "Setup complete. You can now run ./start.sh to launch the presentation."
else
    echo "Error during npm install. Please check the output above for details."
    exit 1
fi 