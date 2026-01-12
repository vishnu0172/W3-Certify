# Troubleshooting Guide - W3 App Developers Certificate System

## Common Issues and Solutions

### 1. MongoDB Connection Issues

#### Problem: "MongooseServerSelectionError: connect ECONNREFUSED"
**Solution:**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# If not running, start it
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

#### Problem: "MongoDB connection string is incorrect"
**Solution:**
- Check your `.env` file in the backend directory
- Ensure `MONGO_URI` is set correctly:
  ```
  MONGO_URI=mongodb://localhost:27017/w3certify
  ```

### 2. Port Already in Use

#### Problem: "Port 5000 is already in use"
**Solution:**
```bash
# Find process using port 5000
sudo lsof -i :5000

# Kill the process
sudo kill -9 <PID>

# Or use fuser
sudo fuser -k 5000/tcp
```

#### Problem: "Port 3000 is already in use"
**Solution:**
```bash
# Find and kill process on port 3000
sudo fuser -k 3000/tcp

# Or change the port in frontend
# Create .env file in frontend directory with:
PORT=3001
```

### 3. Module Not Found Errors

#### Problem: "Cannot find module 'express'" or similar
**Solution:**
```bash
# Delete node_modules and reinstall
cd backend  # or frontend
rm -rf node_modules package-lock.json
npm install

# If issue persists, clear npm cache
npm cache clean --force
npm install
```

#### Problem: "Module not found: Can't resolve 'jwt-decode'"
**Solution:**
```bash
cd frontend
npm install jwt-decode
```

### 4. File Upload Issues

#### Problem: "Files not uploading" or "undefined files"
**Solution:**
- Ensure `uploads` directory exists in backend
- Check file size (must be under 5MB)
- Verify file format (JPG, JPEG, PNG, PDF only)
- Check browser console for errors

#### Problem: "Uploaded files not accessible"
**Solution:**
```bash
# Create directories if they don't exist
cd backend
mkdir -p uploads certificates

# Set proper permissions
chmod 755 uploads certificates
```

### 5. JWT/Authentication Issues

#### Problem: "JsonWebTokenError: invalid token"
**Solution:**
- Clear browser localStorage
- Login again
- Check if JWT_SECRET in `.env` hasn't changed

```javascript
// In browser console:
localStorage.clear();
// Then reload and login again
```

#### Problem: "No token provided"
**Solution:**
- Ensure you're logged in
- Check if token is being sent in request headers
- Verify API service is adding Authorization header

### 6. PDF Generation Issues

#### Problem: "Certificate not generating"
**Solution:**
```bash
# Ensure certificates directory exists
cd backend
mkdir -p certificates
chmod 755 certificates

# Check if pdfkit is installed
npm list pdfkit

# If not, install it
npm install pdfkit
```

#### Problem: "Cannot download certificate"
**Solution:**
- Check if certificate file exists in `backend/certificates`
- Verify application status is "Approved"
- Check browser download settings

### 7. CORS Issues

#### Problem: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Solution:**
- Ensure backend has CORS enabled (already configured)
- Check if frontend URL matches the allowed origins
- Clear browser cache

### 8. React App Won't Start

#### Problem: "react-scripts: command not found"
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### Problem: Blank page after npm start
**Solution:**
- Check browser console for errors
- Ensure `public/index.html` has `<div id="root"></div>`
- Verify `src/index.js` is rendering to 'root'

### 9. Database Issues

#### Problem: "Duplicate key error"
**Solution:**
```bash
# Drop the collection and recreate
mongosh
use w3certify
db.users.drop()  # or specific collection
# Then restart and create admin again
```

#### Problem: "Database not found"
**Solution:**
- MongoDB creates database automatically
- Just ensure MongoDB is running
- Database will be created on first connection

### 10. Admin Creation Issues

#### Problem: "Admin already exists"
**Solution:**
- This is normal if you've already created an admin
- Use existing credentials: admin@w3app.com / admin123
- Or delete and recreate:
```bash
mongosh
use w3certify
db.users.deleteOne({ email: "admin@w3app.com" })
exit
node createAdmin.js
```

### 11. Environment Variable Issues

#### Problem: "process.env.JWT_SECRET is undefined"
**Solution:**
```bash
# Ensure .env file exists in backend directory
cd backend
ls -la .env

# If not, copy from example
cp .env.example .env

# Verify contents
cat .env
```

### 12. Build/Production Issues

#### Problem: "Build fails"
**Solution:**
```bash
cd frontend
# Clear cache
npm cache clean --force
# Remove and reinstall
rm -rf node_modules package-lock.json
npm install
# Try build again
npm run build
```

## Performance Issues

### Slow Database Queries
```javascript
// Add indexes to frequently queried fields
// In MongoDB shell:
db.applications.createIndex({ userId: 1 })
db.applications.createIndex({ status: 1 })
db.applications.createIndex({ createdAt: -1 })
```

### Large File Upload Times
- Compress images before upload
- Consider implementing image optimization
- Check network speed

## Browser-Specific Issues

### Safari
- Clear cache and cookies
- Enable localStorage in privacy settings
- Check console for CORS errors

### Chrome
- Clear cache: Ctrl+Shift+Delete
- Disable extensions that might block requests
- Check Network tab in DevTools

### Firefox
- Clear site data for localhost
- Check if cookies are enabled
- Verify localStorage is accessible

## Debugging Tips

### Backend Debugging
```bash
# Add console logs
console.log('Request:', req.body);
console.log('User:', req.user);

# Use nodemon for auto-restart
npm install -g nodemon
nodemon server.js
```

### Frontend Debugging
```javascript
// In browser console
console.log('Auth token:', localStorage.getItem('token'));
console.log('User data:', user);

// Check API calls in Network tab
// Use React DevTools extension
```

### Database Debugging
```bash
# Connect to MongoDB shell
mongosh

# Use database
use w3certify

# Check collections
show collections

# Query data
db.users.find().pretty()
db.applications.find().pretty()

# Count documents
db.applications.countDocuments()
```

## Getting Help

If you're still experiencing issues:

1. **Check Logs:**
   - Backend: Terminal running backend
   - Frontend: Browser console (F12)
   - MongoDB: `/var/log/mongodb/mongod.log`

2. **Verify Setup:**
   - Run `./install.sh` again
   - Check all dependencies are installed
   - Ensure MongoDB is running

3. **Test Components:**
   - Test backend API with Postman
   - Check frontend in browser DevTools
   - Verify database connections

4. **Clean Install:**
   ```bash
   # Complete clean reinstall
   rm -rf backend/node_modules frontend/node_modules
   rm backend/package-lock.json frontend/package-lock.json
   ./install.sh
   ```

## Prevention Tips

1. Always commit with `.gitignore` properly configured
2. Keep dependencies updated regularly
3. Use environment variables for all configs
4. Regular database backups
5. Monitor application logs
6. Test in development before production
7. Use version control (Git)

---

For feature requests or bug reports, please document:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Error messages
- Environment (OS, Node version, etc.)
