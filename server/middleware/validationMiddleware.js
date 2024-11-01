const { body, validationResult } = require('express-validator');

const loginSignupValidation = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { loginSignupValidation };