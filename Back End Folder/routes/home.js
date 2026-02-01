// Ye file home page ke API routes handle karti hai

const express = require("express"); // Express import
const router = express.Router();     // Router create kar rahe hain
const Product = require("../models/Product"); // Product model import

// GET request → sab products le kar aana
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find(); // MongoDB se sab products fetch kar rahe hain
        res.json(products);                    // Frontend ko JSON me bhej rahe hain
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" }); // Agar kuch error ho jaye
    }
});

// POST request → naya product add karna
router.post("/add-product", async (req, res) => {
    const { name, price, image, desc, rating, category, gen } = req.body; // Frontend se data le rahe hain

    const newProduct = new Product({
        name,
        price,
        image,
        desc,
        rating,
        category,
        gen
    });

    try {
        const savedProduct = await newProduct.save(); // MongoDB me save kar rahe hain
        res.json(savedProduct);                       // Save hone ke baad frontend ko bhej rahe hain
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Product add failed" }); // Agar fail ho jaye
    }
});

module.exports = router; // Export router




/* ✅ Bhai summary in simple words:

server.js → Server start karta hai aur routes aur DB connect karta hai

db.js → MongoDB se connect karta hai

Product.js → Product data ka structure define karta hai

home.js → Home page ke liye API routes handle karta hai (GET aur POST) */