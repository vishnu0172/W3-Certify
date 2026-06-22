Deployment Guide: Vercel (Frontend) & Render (Backend)
This guide provides step-by-step instructions to deploy your full-stack application, with the frontend hosted on Vercel and the backend hosted on Render.

Part 1: Deploying the Backend on Render
Render is a great platform for hosting Node.js APIs and web services.

Prerequisites
Make sure your code is pushed to a GitHub repository.
Your package.json in the backend folder should have a start script (e.g., "start": "node server.js").
Steps
Create a Render Account: Go to Render and sign up or log in.
Create a New Web Service:
Click on the "New +" button in the top right corner and select "Web Service".
Connect your GitHub account and select your project repository.
Configure the Service:
Name: Give your backend a name (e.g., w3certify-api).
Root Directory: Set this to backend (this is crucial since your repo is a monorepo).
Environment: Select Node.
Build Command: npm install (or yarn install if you use Yarn).
Start Command: npm start (or node server.js).
Set Environment Variables:
Scroll down to the Advanced section.
Click on Add Environment Variable.
Add all the variables from your backend's .env file (e.g., PORT, MONGODB_URI, JWT_SECRET, etc.).
Make sure you set the PORT variable.
Deploy:
Click "Create Web Service".
Render will now build and deploy your backend. Wait for it to show a "Live" status.
Copy the URL provided by Render (e.g., https://w3certify-api.onrender.com). You will need this for the frontend!
Part 2: Updating the Frontend
Before deploying the frontend, you need to point it to your newly deployed live backend API.

Update API Base URL:
In your frontend code (likely in a config file or .env), change your local backend URL (e.g., http://localhost:5000) to your new Render URL (e.g., https://w3certify-api.onrender.com).
If using Vite: Update or create a .env file with VITE_API_URL=https://your-backend.onrender.com.
If using Create React App: Update .env with REACT_APP_API_URL=https://your-backend.onrender.com.
Push Changes: Commit and push these frontend changes to your GitHub repository.
Part 3: Deploying the Frontend on Vercel
Vercel is optimized for frontend frameworks.

Steps
Create a Vercel Account: Go to Vercel and sign up with GitHub.
Import Project:
From your dashboard, click "Add New..." -> "Project".
Import your GitHub repository.
Configure the Project:
Project Name: Give it a name (e.g., w3certify-frontend).
Framework Preset: Vercel usually auto-detects this. If not, select the appropriate one.
Root Directory: Click "Edit" and select frontend.
Environment Variables (Optional):
Expand the "Environment Variables" section.
Add any variables your frontend needs (like the VITE_API_URL pointing to your Render backend).
Deploy:
Click the "Deploy" button.
Vercel will build and host your site.
Once complete, you'll be given a live URL (e.g., https://w3certify-frontend.vercel.app).
Part 4: Final Verification & CORS (Important)
If your frontend cannot communicate with the backend, it's likely a CORS (Cross-Origin Resource Sharing) issue.

Check Backend CORS:
Open your backend server code (e.g., server.js).
Ensure your cors middleware allows requests from your new Vercel domain.
Example:
javascript
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000', 'https://w3certify-frontend.vercel.app'],
    credentials: true
}));
Push Changes & Re-deploy: If you had to update CORS, push the changes to GitHub. Render will automatically redeploy the backend with the updated settings.