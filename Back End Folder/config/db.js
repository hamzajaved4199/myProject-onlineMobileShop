// Ye file database se connect karne ke liye hai
const mongoose = require("mongoose"); // Mongoose library load kar rahe hain MongoDB ke liye

// Database connect function
const connectDB = async () => {
    try {
        // Latest Mongoose me options ko remove karo
        await mongoose.connect("mongodb://127.0.0.1:27017/trust_iphones");
        console.log("MongoDB connected successfully"); // Agar connection success ho gaya to message
    } catch (error) {
        console.error("MongoDB connection failed:", error.message); // Agar fail ho gaya to error show kare
        process.exit(1); // Server ko stop kar do agar database connect nahi hua
    }
};

module.exports = connectDB; // Function export kar diya taki server.js me use ho sake
