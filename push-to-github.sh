#!/bin/bash

echo "========================================================="
echo "   PUSH W3 APP DEVELOPERS TO GITHUB                     "
echo "========================================================="
echo ""

cd "/media/vishnu/New Volume/Projects/W3certify"

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo "Step 1: Initializing Git repository..."
    git init
    echo "✓ Git initialized"
else
    echo "✓ Git repository already exists"
fi

# Add all files
echo ""
echo "Step 2: Adding files to Git..."
git add .

# Create initial commit
echo ""
echo "Step 3: Creating initial commit..."
git commit -m "Initial commit: W3 App Developers Certificate Management System

- Complete MERN stack application
- User authentication and authorization
- Certificate application submission with file uploads
- Admin dashboard for review and approval
- Automatic PDF certificate generation
- MongoDB database integration
- Comprehensive documentation
- Setup scripts included"

echo ""
echo "========================================================="
echo "Step 4: Create GitHub Repository"
echo "========================================================="
echo ""
echo "Now you need to:"
echo "1. Go to https://github.com/new"
echo "2. Create a new repository named: w3certify"
echo "3. DO NOT initialize with README (we already have one)"
echo "4. Copy the repository URL"
echo ""
echo "Press Enter when you have created the repository..."
read

echo ""
echo "Step 5: Enter your GitHub repository URL:"
echo "Example: https://github.com/yourusername/w3certify.git"
echo -n "Repository URL: "
read REPO_URL

# Add remote origin
echo ""
echo "Adding remote origin..."
git remote add origin "$REPO_URL"

# Set main branch
git branch -M main

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "========================================================="
echo "✓ Successfully pushed to GitHub!"
echo "========================================================="
echo ""
echo "Your repository URL: $REPO_URL"
echo ""
echo "Next steps:"
echo "1. Visit your GitHub repository"
echo "2. Add a description and topics"
echo "3. Share with others!"
echo ""
