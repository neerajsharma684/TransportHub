const bcrypt = require('bcryptjs');
const Admin = require('../models/admin.model');
const { validationResult } = require('express-validator');

const signup = async (req, res) => {
    let { name, email, password, role, plan, addons, createdBy } = req.body;
    email = email.toLowerCase();
    role = role.toLowerCase();
    console.log(role);

    // Validate and sanitize input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user already exists
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);
        console.log(hashedPassword);
        // Create a new user
        admin = new Admin({
            email,
            password: hashedPassword,
            role,
            name,
            plan,
            addons,
            createdBy
        });
        console.log(admin);

        // Save the user to the database
        await admin.save();

        res.status(201).send("User Created Successfully !!!");
    } catch (err) {
        res.status(500).send("Server error");
    }
};

module.exports = { signup };