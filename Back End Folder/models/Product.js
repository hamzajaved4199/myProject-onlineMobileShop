// Ye file product ka data model define karti hai (MongoDB ke liye)

const mongoose = require("mongoose"); // Mongoose import kar rahe hain

// Product schema define kar rahe hain
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },       // Product ka naam required hai
    price: { type: Number, required: true },      // Product ka price required hai
    image: { type: String },                      // Product image URL (optional)
    desc: { type: String },               // Product description
    rating: { type: Number, default: 0 },       // Product rating default 0
    category: { type: String },                  // Product category
    gen: { type: String }                        // Gen-16, Gen-17 etc
});

// Product model create
const Product = mongoose.model("Product", productSchema);

module.exports = Product; // Export kar diya taki routes me use ho
