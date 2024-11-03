const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin',
        required: true,
        trim: true,
        enum: ['admin', 'superadmin']
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    plan: {
        type: String,
        default: 'starter',
        required: true,
        trim: true,
        enum: ['starter', 'growth', 'professional', 'enterprise', 'custom']
    },
    addons:{
        type: Array,
        default: ["none"],
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        required: true, 
        trim: true
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;