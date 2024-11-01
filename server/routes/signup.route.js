const express = require("express");
const { loginSignupValidation } = require('../middleware/validationMiddleware');
const signupController = require('../controller/signupController');

const router = express.Router();

// Signup route with validation middleware
router.post("/", loginSignupValidation, signupController.signup);

module.exports = router;