const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

const userController = new UserController();

// Define routes for registration, login, and password reset
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
// Verify OTP route
router.post('/verify-otp', userController.verifyOTP);

// Reset Password route
router.post('/reset-password', userController.resetPassword);

module.exports = router;
