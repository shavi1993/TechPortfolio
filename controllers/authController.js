const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Register User
exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    return res.render('signup', {
      errorMessage: 'Passwords do not match.',
    });
  }
  // Check if the user already exists
  User.findOne({ where: { email } })
    .then(existingUser => {
      if (existingUser) {
        return Promise.reject("Email already use");
      }
      // Hash the password
      return bcrypt.hash(password, 10);
    })
    .then(hashedPassword => {
      // Create new user
      return User.create({
        username,
        email,
        password: hashedPassword,
      });
    })
    .then(newUser => {
      return res.render('signup', {
        message: "User registered successfully",
      });

    })
    .catch(error => {
      return res.render('signup', {
        message: "Error signing up",
        error: error || "Unknown error",
      });
    });

};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).render("login", { error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).render("login", { error: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name }, // Include user details
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Set token in HTTP-only cookie
    res.cookie("auth_token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiry

    // Redirect to home page with user details
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).render("login", { error: "Server error" });
  }
};