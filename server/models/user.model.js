const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    createdBy: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        default: 'user',
        required: true,
        trim: true,
        enum: ['user']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;