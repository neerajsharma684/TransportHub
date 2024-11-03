const express = require('express');
const { loginSignupValidation } = require('../middleware/validationMiddleware');
const adminLoginController = require('../controller/adminLoginController');

const router = express.Router();

// Validation middleware
router.post("/", loginSignupValidation, adminLoginController.adminLogin);

module.exports = router;