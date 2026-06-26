const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getPool } = require("../config/db");
const dotenv = require("dotenv");
dotenv.config();

// ================== REGISTER ==================
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const pool = getPool();

    // Check if user exists (case-insensitive)
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER(?)",
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [insertResult] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: { id: insertResult.insertId, name, email },
    });
  } catch (err) {
    console.error("💥 Register error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ================== LOGIN ==================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Please provide email and password" });

  try {
    const pool = getPool();

    // Find user by email (case-insensitive)
    const [results] = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER(?)",
      [email]
    );
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined in .env");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error("💥 Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;