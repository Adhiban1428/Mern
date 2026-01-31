const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// JWT secret from env
const JWT_SECRET = process.env.JWT_SECRET;

// User signup endpoint
router.post('/signup', [
  body('name').trim().isLength({ min: 3 }).withMessage('Name needs to be at least 3 chars long'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password too short - minimum 6 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: errors.array()[0].msg,
      errors: errors.array() 
    });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ $or: [{ email }, { username: name }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    // Create new user
    const user = new User({ 
      username: name, 
      email: email, 
      password: password 
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token: token,
      user: { 
        id: user._id, 
        name: user.username, 
        email: user.email 
      }
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Something went wrong on our end' });
  }
});

// Legacy register endpoint - keeping for backwards compatibility
router.post('/register', [
  body('username').trim().isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // See if user exists already
    const existingUser = await User.findOne({ 
      $or: [{ email: email }, { username: username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    // Create JWT
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email 
      }
    });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Server error occurred' });
  }
});

// Login endpoint
router.post('/login', [
  body('email').isEmail().withMessage('Email format is invalid'),
  body('password').exists().withMessage('Password field is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: errors.array()[0].msg,
      errors: errors.array() 
    });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({
      token: token,
      user: { 
        id: user._id, 
        name: user.username, 
        email: user.email 
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;