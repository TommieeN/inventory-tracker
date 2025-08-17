const express = require("express");
const bcrypt = require("bcryptjs");
const knex = require("../db/knex");
const { validateUser } = require("../Utils/validateUser");

// Salt is a random string added to the password before hashing
// SaltRounds 10 -> Generates a salt with 10 rounds of complexity
// (More rounds = more secure, but slower)
const saltRounds = 10;

const router = express.Router();

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

module.exports = router;
