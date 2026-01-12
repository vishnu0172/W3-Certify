#!/bin/bash

echo "========================================================="
echo "   W3 APP DEVELOPERS - CERTIFICATE MANAGEMENT SYSTEM    "
echo "========================================================="
echo ""
echo "This script will set up the complete application"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm --version)${NC}"

# Check MongoDB
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✓ MongoDB is installed${NC}"
else
    echo -e "${YELLOW}⚠ MongoDB not detected. Please ensure MongoDB is installed and running.${NC}"
    echo "  Install MongoDB: https://www.mongodb.com/try/download/community"
fi

echo ""
echo "========================================================="
echo "STEP 1: Installing Backend Dependencies"
echo "========================================================="
cd backend || exit
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed successfully${NC}"
else
    echo -e "${RED}✗ Failed to install backend dependencies${NC}"
    exit 1
fi

echo ""
echo "========================================================="
echo "STEP 2: Installing Frontend Dependencies"
echo "========================================================="
cd ../frontend || exit
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed successfully${NC}"
else
    echo -e "${RED}✗ Failed to install frontend dependencies${NC}"
    exit 1
fi

cd ..

echo ""
echo "========================================================="
echo "STEP 3: Creating Admin User"
echo "========================================================="
echo "Starting MongoDB and creating admin account..."
echo ""

# Try to start MongoDB
if command -v systemctl &> /dev/null; then
    sudo systemctl start mongod 2>/dev/null
fi

sleep 2

cd backend || exit
node createAdmin.js
cd ..

echo ""
echo "========================================================="
echo "           ✓ SETUP COMPLETED SUCCESSFULLY!              "
echo "========================================================="
echo ""
echo "NEXT STEPS:"
echo ""
echo "1. Start MongoDB (if not already running):"
echo "   ${YELLOW}sudo systemctl start mongod${NC}"
echo ""
echo "2. Start the Backend Server (Terminal 1):"
echo "   ${YELLOW}cd backend${NC}"
echo "   ${YELLOW}npm start${NC}"
echo "   Backend will run on: ${GREEN}http://localhost:5000${NC}"
echo ""
echo "3. Start the Frontend Server (Terminal 2):"
echo "   ${YELLOW}cd frontend${NC}"
echo "   ${YELLOW}npm start${NC}"
echo "   Frontend will run on: ${GREEN}http://localhost:3000${NC}"
echo ""
echo "4. Login Credentials:"
echo "   ${GREEN}Admin:${NC}"
echo "   Email: admin@w3app.com"
echo "   Password: admin123"
echo ""
echo "========================================================="
echo "For detailed documentation, see:"
echo "- README.md (Complete documentation)"
echo "- QUICKSTART.md (Quick start guide)"
echo "========================================================="
echo ""
