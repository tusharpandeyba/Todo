const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

// 🔹 Register a new user
const bcrypt = require("bcrypt"); // ✅ Import bcrypt

router.post("/register", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) return res.status(400).json({ message: "All fields are required" });
  
      const userExists = await User.findOne({ username });
      if (userExists) return res.status(400).json({ message: "User already exists" });
  
      const newUser = new User({ username, password }); // ✅ No need to hash here (handled in schema)
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  


// 🔹 Login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid username or password!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid username or password!" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
