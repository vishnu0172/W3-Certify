#!/bin/bash

echo "======================================"
echo "W3 App Developers - Certificate System"
echo "Setup Script"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js is installed: $(node --version)"

# Check if MongoDB is running
if command -v mongod &> /dev/null
then
    echo "✓ MongoDB is installed"
else
    echo "⚠ MongoDB not found. Make sure MongoDB is installed and running."
fi

echo ""
echo "Installing Backend Dependencies..."
cd backend
npm install
echo "✓ Backend dependencies installed"

echo ""
echo "Installing Frontend Dependencies..."
cd ../frontend
npm install
echo "✓ Frontend dependencies installed"

echo ""
echo "======================================"
echo "Setup Complete!"
echo "======================================"
echo ""
echo "To run the application:"
echo ""
echo "1. Start MongoDB (if not running):"
echo "   sudo systemctl start mongod"
echo ""
echo "2. Start Backend (in one terminal):"
echo "   cd backend"
echo "   npm start"
echo ""
echo "3. Start Frontend (in another terminal):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "4. Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "======================================"
