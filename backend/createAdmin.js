require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define User schema inline to avoid import issues
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }
});

const User = mongoose.model("User", userSchema);

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@w3app.com" });
    
    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log("Email: admin@w3app.com");
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    const admin = await User.create({
      name: "Admin",
      email: "admin@w3app.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("✓ Admin user created successfully!");
    console.log("==========================================");
    console.log("Admin Credentials:");
    console.log("Email: admin@w3app.com");
    console.log("Password: admin123");
    console.log("==========================================");
    console.log("⚠ Please change the password after first login!");
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();
