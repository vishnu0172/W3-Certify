# W3 App Developers - Certificate Generation System

A full-stack web application for managing internship and inplant training certificates. Students can apply for certificates by submitting their details and proof documents, while admins can review and approve/reject applications. Approved certificates are automatically generated and can be downloaded as PDFs.

## Features

### For Students/Users:
- **User Registration & Login**: Secure authentication system
- **Apply for Certificates**: Submit application with personal details
- **Upload Documents**: 
  - Student ID Card (proof of identity)
  - Payment Screenshot (proof of payment)
- **Track Application Status**: View all submitted applications and their current status
- **Download Certificates**: Download approved certificates in PDF format
- **Certificate Details**: Each certificate includes:
  - Student Name
  - College Name
  - Roll Number
  - Certificate Type (Internship/Inplant)
  - Duration
  - Unique Certificate ID
  - Date of Issue

### For Admins:
- **Admin Dashboard**: Overview of all applications
- **View Statistics**: Total, pending, approved, and rejected applications
- **Review Applications**: 
  - View student details
  - Check uploaded documents (ID card and payment proof)
- **Approve/Reject Applications**: 
  - Approve applications to generate certificates automatically
  - Reject applications with appropriate notifications
- **Certificate Generation**: Automatic PDF generation upon approval with unique certificate ID

## Tech Stack

### Frontend:
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **JWT Decode** - Token handling
- **CSS3** - Styling

### Backend:
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **PDFKit** - PDF generation

## Installation & Setup

### Prerequisites:
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup:

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/w3certify
JWT_SECRET=your_secret_key_here_change_in_production
PORT=5000
```

4. Start the backend server:
```bash
npm start
```
or for development with auto-restart:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup:

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

### Creating an Admin Account:

To create an admin account, you can either:

1. **Using MongoDB directly**: Insert a user with `role: "admin"` in the users collection
2. **Using the signup API**: Make a POST request to `/auth/signup` with:
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "adminpassword",
  "role": "admin"
}
```

### Student Workflow:

1. **Sign Up**: Create a new account at `/signup`
2. **Login**: Login with credentials at `/login`
3. **Apply**: Fill the application form at `/apply`
   - Enter personal details
   - Select certificate type (Internship/Inplant)
   - Upload Student ID Card
   - Upload Payment Proof
4. **Track Status**: View application status at `/status`
5. **Download Certificate**: Once approved, download the PDF certificate

### Admin Workflow:

1. **Login**: Login with admin credentials
2. **Dashboard**: View all applications and statistics
3. **Review Applications**: Click "View Details" to see:
   - Student information
   - Uploaded documents
4. **Approve/Reject**: 
   - Click "Approve" to generate certificate automatically
   - Click "Reject" to deny the application
5. **Notifications**: Students receive appropriate messages based on admin action

## Project Structure

```
W3certify/
├── backend/
│   ├── certificates/         # Generated PDF certificates
│   ├── config/
│   │   └── db.js            # Database configuration
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── applicationController.js
│   │   └── certificateController.js
│   ├── middleware/          # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/              # Database models
│   │   ├── User.js
│   │   ├── Application.js
│   │   └── Certificate.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   └── applicationRoutes.js
│   ├── uploads/             # Uploaded documents
│   ├── utils/
│   │   └── generateCertificate.js  # PDF generation
│   ├── .env.example         # Environment variables template
│   ├── package.json
│   └── server.js            # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/      # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/         # React context
    │   │   └── AuthContext.jsx
    │   ├── pages/           # Page components
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── ApplyForm.jsx
    │   │   ├── Status.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── CertificateDownload.jsx
    │   ├── services/        # API services
    │   │   ├── api.js
    │   │   └── authApi.js
    │   ├── styles/
    │   │   └── main.css     # Global styles
    │   ├── App.jsx          # Main app component
    │   └── index.js         # Entry point
    └── package.json
```

## API Endpoints

### Authentication:
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user

### Applications:
- `POST /applications/apply` - Submit new application (Protected)
- `GET /applications/my-applications` - Get user's applications (Protected)
- `GET /applications/all` - Get all applications (Admin only)
- `PUT /applications/:id/status` - Update application status (Admin only)
- `GET /applications/:id/download` - Download certificate (Protected)

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes (both frontend and backend)
- Role-based access control (User/Admin)
- File upload validation
- Token expiration (7 days)

## Database Models

### User:
- name
- email (unique)
- password (hashed)
- role (user/admin)

### Application:
- userId (reference to User)
- name
- collegeName
- rollNo
- type (Internship/Inplant)
- duration
- studentIdCard (file path)
- paymentProof (file path)
- status (Pending/Approved/Rejected)
- certificateId (auto-generated on approval)
- issuedDate (date of approval)
- timestamps

### Certificate:
- applicationId (reference to Application)
- certificateId (unique)
- pdfPath (file location)
- timestamps

## Future Enhancements

- Email notifications for application status updates
- Certificate verification portal (public)
- Bulk approval for admins
- Advanced filtering and search
- Analytics dashboard
- QR code on certificates
- Multi-language support
- Export data to Excel

## License

This project is for educational and business purposes.

## Contact

W3 App Developers
- Website: [Your Website]
- Email: [Your Email]
- Support: [Support Email]

---

© 2026 W3 App Developers. All rights reserved.
