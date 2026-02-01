// Ye file hamara main backend server chalata hai

const express = require("express"); // Express framework load kar rahe hain
const cors = require("cors");       // CORS enable karne ke liye (frontend se request allow ho)
const homeRoutes = require("./routes/home"); // Home page ke routes import kar rahe hain
const connectDB = require("./config/db");    // Database connect karne ke function import kar rahe hain

const app = express(); // Express app create kar rahe hain

// Middleware setup
app.use(cors());           // Frontend se request allow karne ke liye
app.use(express.json());   // JSON request ko parse karne ke liye

// Routes use kar rahe hain
app.use("/api/home", homeRoutes); // /api/home ke under home routes chalega

// Database connect
connectDB(); // MongoDB se connection establish kar rahe hain

// Server listen
const PORT = process.env.PORT || 5000; // Port set kar rahe hain, agar environment me port nahi hoga to 5000 use hoga
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
