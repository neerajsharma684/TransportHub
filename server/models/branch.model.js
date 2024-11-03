const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'createdByRole',
        required: true
    },
    createdByRole: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        zip: {
            type: String,
            required: true,
            trim: true
        }
    },
    contact: {
        phone: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        }
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;