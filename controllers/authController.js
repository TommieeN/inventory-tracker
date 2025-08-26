const bcrypt = require("bcryptjs");
const knex = require("../db/knex");
const { validateUser } = require("../Utils/validateUser");
const jwt = require("jsonwebtoken");

// Salt is a random string added to the password before hashing
// SaltRounds 10 -> Generates a salt with 10 rounds of complexity
// (More rounds = more secure, but slower)
const saltRounds = 10;

// REGISTER Route
const registerUser = async (req, res) => {
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
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// LOGIN Route
const loginUser = async (req, res) => {
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
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Create jwt token
   const token = jwt.sign(
    {userId: user.id, email: user.email},
    process.env.JWT_SECRET,
    { expiresIn: "1h"}
   )

  //  Return response
   res.json({ message: "Login sucessful", token})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
