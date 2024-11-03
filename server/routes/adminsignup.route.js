const express = require("express");
const { loginSignupValidation } = require('../middleware/validationMiddleware');
const adminSignupController = require('../controller/adminSignupController');

const router = express.Router();

// Signup route with validation middleware
router.post("/", loginSignupValidation, adminSignupController.signup);

module.exports = router;