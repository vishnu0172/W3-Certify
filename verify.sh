#!/bin/bash

echo "========================================================="
echo "   W3 APP DEVELOPERS - PROJECT VERIFICATION             "
echo "========================================================="
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1 (missing)"
        return 1
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        return 0
    else
        echo -e "${RED}✗${NC} $1/ (missing)"
        return 1
    fi
}

echo "Checking Backend Files..."
echo "------------------------"
check_file "backend/server.js"
check_file "backend/package.json"
check_file "backend/.env"
check_file "backend/createAdmin.js"
check_dir "backend/config"
check_file "backend/config/db.js"
check_dir "backend/controllers"
check_file "backend/controllers/authController.js"
check_file "backend/controllers/applicationController.js"
check_file "backend/controllers/certificateController.js"
check_dir "backend/middleware"
check_file "backend/middleware/authMiddleware.js"
check_file "backend/middleware/uploadMiddleware.js"
check_dir "backend/models"
check_file "backend/models/User.js"
check_file "backend/models/Application.js"
check_file "backend/models/Certificate.js"
check_dir "backend/routes"
check_file "backend/routes/authRoutes.js"
check_file "backend/routes/applicationRoutes.js"
check_dir "backend/utils"
check_file "backend/utils/generateCertificate.js"
check_dir "backend/uploads"
check_dir "backend/certificates"

echo ""
echo "Checking Frontend Files..."
echo "-------------------------"
check_file "frontend/package.json"
check_file "frontend/public/index.html"
check_file "frontend/src/index.js"
check_file "frontend/src/App.jsx"
check_dir "frontend/src/components"
check_file "frontend/src/components/Navbar.jsx"
check_file "frontend/src/components/Footer.jsx"
check_file "frontend/src/components/ProtectedRoute.jsx"
check_dir "frontend/src/context"
check_file "frontend/src/context/AuthContext.jsx"
check_dir "frontend/src/pages"
check_file "frontend/src/pages/Login.jsx"
check_file "frontend/src/pages/Signup.jsx"
check_file "frontend/src/pages/ApplyForm.jsx"
check_file "frontend/src/pages/Status.jsx"
check_file "frontend/src/pages/AdminDashboard.jsx"
check_file "frontend/src/pages/CertificateDownload.jsx"
check_dir "frontend/src/services"
check_file "frontend/src/services/api.js"
check_file "frontend/src/services/authApi.js"
check_dir "frontend/src/styles"
check_file "frontend/src/styles/main.css"

echo ""
echo "Checking Documentation..."
echo "------------------------"
check_file "README.md"
check_file "QUICKSTART.md"
check_file "TROUBLESHOOTING.md"
check_file "PROJECT_SUMMARY.md"
check_file ".gitignore"

echo ""
echo "Checking Scripts..."
echo "------------------"
check_file "install.sh"
check_file "setup.sh"

echo ""
echo "========================================================="
echo "Checking Dependencies..."
echo "========================================================="
echo ""

if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠ Backend dependencies not installed${NC}"
    echo "  Run: cd backend && npm install"
fi

if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠ Frontend dependencies not installed${NC}"
    echo "  Run: cd frontend && npm install"
fi

echo ""
echo "========================================================="
echo "Checking System Requirements..."
echo "========================================================="
echo ""

if command -v node &> /dev/null; then
    echo -e "${GREEN}✓ Node.js installed:${NC} $(node --version)"
else
    echo -e "${RED}✗ Node.js not installed${NC}"
fi

if command -v npm &> /dev/null; then
    echo -e "${GREEN}✓ npm installed:${NC} $(npm --version)"
else
    echo -e "${RED}✗ npm not installed${NC}"
fi

if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✓ MongoDB installed${NC}"
else
    echo -e "${YELLOW}⚠ MongoDB not detected${NC}"
fi

if systemctl is-active --quiet mongod 2>/dev/null; then
    echo -e "${GREEN}✓ MongoDB is running${NC}"
else
    echo -e "${YELLOW}⚠ MongoDB might not be running${NC}"
    echo "  Start with: sudo systemctl start mongod"
fi

echo ""
echo "========================================================="
echo "Verification Complete!"
echo "========================================================="
echo ""
echo "If all checks passed, you can:"
echo "1. Start backend: cd backend && npm start"
echo "2. Start frontend: cd frontend && npm start"
echo ""
echo "If issues found, run: ./install.sh"
echo ""
