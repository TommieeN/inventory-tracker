const express = require("express");
const bcrypt = require("bcryptjs");
const knex = require("../db/knex");
const { validateUser } = require("../Utils/validateUser");
const router = express.Router();

// Salt is a random string added to the password before hashing
// SaltRounds 10 -> Generates a salt with 10 rounds of complexity
// (More rounds = more secure, but slower)
const saltRounds = 10;

// REGISTER Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate inputs
    const errors = validateUser({ name, email, password });
    if (errors) return res.status(400).json({ errors });

    // Check if email exists
    const existingUser = await knex("users").where({ email }).first();
    if (existingUser) {
      return res
        .status(400)
        .json({ errors: { email: "Email is already in use" } });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(saltRounds);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert new user into DB
    await knex("users").insert({ name, email, password_hash });
    const newUser = await knex("users").where({ email }).first();

    // Return response
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await knex("users").where({ email }).first();
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }

    // Compares password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: "password" });
    }

    // Return on success
    return res
      .status(200)
      .json({
        message: "Login Successful",
        user: { id: user.id, email: user.email },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;