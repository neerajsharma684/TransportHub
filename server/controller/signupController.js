const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { validationResult } = require('express-validator');

const signup = async (req, res) => {
    let { email, password, createdBy } = req.body;
    email = email.toLowerCase();

    // Validate and sanitize input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create a new user
        user = new User({
            email,
            password: hashedPassword,
            createdBy
        });

        // Save the user to the database
        await user.save();

        res.status(201).send("User Created Successfully !!!");
    } catch (err) {
        res.status(500).send("Server error");
    }
};

module.exports = { signup };