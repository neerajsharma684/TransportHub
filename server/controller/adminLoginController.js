const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/admin.model');

const adminLogin = async (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase();

    // Validate and sanitize input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user exists
        let admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if(admin && isMatch) {
            console.log('Admin logged in successfully');
        }

        // Generate JWT
        const token = jwt.sign({ adminId: admin._id, name: admin.name, email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Store token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set true if in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict'
        });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { adminLogin };