const Branch = require('../models/branch.model')
const { validationResult } = require('express-validator');

const createBranch = async (req, res) => {
    let {name, street, state, city, zip, phone, email, manager, createdBy} = req.body; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const branch = new Branch({
            name,
            address: {
                street,
                city,
                state,
                zip
            },
            contact: {
                phone,
                email
            },
            manager,
            createdBy
        });

        const savedBranch = await branch.save();
        
        return res.status(201).json({
            success: true,
            message: 'Branch created successfully',
            data: savedBranch
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

module.exports = { createBranch };