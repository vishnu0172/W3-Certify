# Quick Start Guide - W3 App Developers Certificate System

## Prerequisites
1. **Node.js** (v14+) - [Download](https://nodejs.org/)
2. **MongoDB** - [Download](https://www.mongodb.com/try/download/community)

## Setup Instructions

### Option 1: Automatic Setup (Linux/Mac)

1. Make the setup script executable:
```bash
chmod +x setup.sh
```

2. Run the setup script:
```bash
./setup.sh
```

### Option 2: Manual Setup

#### Backend Setup:

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Make sure the `.env` file exists with:
```env
MONGO_URI=mongodb://localhost:27017/w3certify
JWT_SECRET=w3appdevelopers_secret_key_2026_change_in_production
PORT=5000
```

3. Start MongoDB:
```bash
# Linux
sudo systemctl start mongod

# Mac
brew services start mongodb-community

# Windows
net start MongoDB
```

4. Create admin user:
```bash
node createAdmin.js
```

This will create an admin account with:
- **Email**: admin@w3app.com
- **Password**: admin123

5. Start the backend server:
```bash
npm start
```

Backend will run on: `http://localhost:5000`

#### Frontend Setup:

1. Open a new terminal and install frontend dependencies:
```bash
cd frontend
npm install
```

2. Start the React app:
```bash
npm start
```

Frontend will run on: `http://localhost:3000`

## Using the Application

### For Students:

1. **Sign Up**: 
   - Go to `http://localhost:3000/signup`
   - Create your account

2. **Login**:
   - Go to `http://localhost:3000/login`
   - Enter your credentials

3. **Apply for Certificate**:
   - Fill out the application form
   - Upload Student ID Card (image/PDF)
   - Upload Payment Screenshot (image/PDF)
   - Submit

4. **Check Status**:
   - Go to "My Applications"
   - View application status (Pending/Approved/Rejected)

5. **Download Certificate**:
   - Once approved, click "Download Certificate"

### For Admin:

1. **Login**:
   - Email: `admin@w3app.com`
   - Password: `admin123`

2. **View Dashboard**:
   - See all applications
   - View statistics

3. **Review Applications**:
   - Click "View Details" on any application
   - Check uploaded documents

4. **Approve/Reject**:
   - Click "Approve" to generate certificate
   - Click "Reject" to deny application

## Testing the Complete Flow

1. **Create a student account**:
   - Sign up with email: student@test.com

2. **Submit an application**:
   - Login as student
   - Fill application form
   - Upload sample documents

3. **Review as admin**:
   - Logout and login as admin
   - View the application in dashboard
   - Check documents
   - Approve the application

4. **Download certificate**:
   - Logout and login as student
   - Go to "My Applications"
   - Download the approved certificate

## Troubleshooting

### MongoDB Connection Issues:
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# If not running, start it
sudo systemctl start mongod
```

### Port Already in Use:
```bash
# Kill process on port 5000
sudo kill -9 $(sudo lsof -t -i:5000)

# Kill process on port 3000
sudo kill -9 $(sudo lsof -t -i:3000)
```

### Dependencies Issues:
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## File Upload Limits
- Maximum file size: 5MB
- Allowed formats: JPG, JPEG, PNG, PDF

## Default Configuration

- **Backend Port**: 5000
- **Frontend Port**: 3000
- **Database**: w3certify
- **JWT Expiration**: 7 days
- **Upload Directory**: backend/uploads
- **Certificate Directory**: backend/certificates

## Next Steps

1. Change admin password after first login
2. Configure MongoDB for production (if deploying)
3. Update JWT secret in .env
4. Set up email notifications (future enhancement)
5. Configure domain and SSL for production

## Support

For issues or questions, check:
1. README.md for detailed documentation
2. Console logs for error messages
3. MongoDB logs: `/var/log/mongodb/mongod.log`

---

Happy Certificate Generating! 🎓
