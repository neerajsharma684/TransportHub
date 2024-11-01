const express = require('express');
const { loginSignupValidation } = require('../middleware/validationMiddleware');
const loginController = require('../controller/loginController');

const router = express.Router();

// Validation middleware
router.post("/", loginSignupValidation, loginController.login);

module.exports = router;