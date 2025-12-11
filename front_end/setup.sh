#!/bin/bash

echo "======================================"
echo "  MicroCommerce Suite - Frontend Setup"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "======================================"
    echo "  Setup Complete!"
    echo "======================================"
    echo ""
    echo "To start the development server, run:"
    echo "  npm start"
    echo ""
    echo "The application will be available at:"
    echo "  http://localhost:4200"
    echo ""
    echo "Make sure your backend services are running:"
    echo "  - Config Service"
    echo "  - Discovery Service (Eureka)"
    echo "  - Gateway Service (port 8888)"
    echo "  - Customer Service"
    echo "  - Inventory Service"
    echo "  - Billing Service"
    echo ""
else
    echo ""
    echo "❌ Failed to install dependencies"
    exit 1
fi
