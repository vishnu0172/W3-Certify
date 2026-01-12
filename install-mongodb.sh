#!/bin/bash

echo "========================================================="
echo "   INSTALLING MONGODB ON UBUNTU 24.04                   "
echo "========================================================="
echo ""

# Import MongoDB public GPG key
echo "Step 1: Importing MongoDB GPG key..."
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor

# Create list file for MongoDB (using jammy for Ubuntu 24.04)
echo "Step 2: Creating MongoDB repository..."
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

# Reload package database
echo "Step 3: Updating package database..."
sudo apt-get update

# Install MongoDB
echo "Step 4: Installing MongoDB..."
sudo apt-get install -y mongodb-org

# Create data directory if it doesn't exist
echo "Step 5: Creating MongoDB data directory..."
sudo mkdir -p /var/lib/mongodb
sudo chown -R mongodb:mongodb /var/lib/mongodb

# Start MongoDB
echo "Step 6: Starting MongoDB service..."
sudo systemctl daemon-reexec
sudo systemctl start mongod

# Enable MongoDB to start on boot
echo "Step 7: Enabling MongoDB to start on boot..."
sudo systemctl enable mongod

# Wait a bit for MongoDB to start
sleep 3

# Check status
echo ""
echo "========================================================="
echo "Checking MongoDB status..."
sudo systemctl status mongod --no-pager | head -20

echo ""
echo "========================================================="
echo "✓ MongoDB Installation Complete!"
echo "========================================================="
echo ""
echo "Next steps:"
echo "1. Create admin user:"
echo "   cd /media/vishnu/New\ Volume/Projects/W3certify/backend"
echo "   npm run create-admin"
echo ""
echo "2. Start the backend:"
echo "   npm start"
echo ""
echo "3. Start the frontend (in new terminal):"
echo "   cd /media/vishnu/New\ Volume/Projects/W3certify/frontend"
echo "   npm start"
echo ""
