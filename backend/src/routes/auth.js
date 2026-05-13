/**
 * Authentication Routes
 * Defines endpoints for user identity management.
 */
const express = require('express');
const { register, login, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

// Public Routes
router.post('/register', register); // Create a new account
router.post('/login', login);       // Authenticate and get token
router.post('/forgot-password', forgotPassword); // Request reset link
router.post('/reset-password', resetPassword);   // Set new password

module.exports = router;
