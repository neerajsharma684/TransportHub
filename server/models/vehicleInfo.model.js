const mongoose = require('mongoose');

const vehicleInfoSchema = new mongoose.Schema({
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
    vehicleNumber: {
        type: String,
        required: true,
        trim: true
    },
    vehicleType: {
        type: String,
        required: true,
        trim: true
    },
    vehicleModel: {
        type: String,
        required: false,
        trim: true
    },
    vehicleMake: {
        type: String,
        required: false,
        trim: true
    },
    vehicleYear: {
        type: Number,
        required: false,
        trim: true
    },
    vehicleCapacity: {
        type: Number,
        required: false,
        trim: true
    },
    vehicleFuelType: {
        type: String,
        required: false,
        trim: true
    },
    vehicleInsuranceExpiry: {
        type: Date,
        required: false,
        trim: true
    },
    vehiclePermitExpiry: {
        type: Date,
        required: false,
        trim: true
    },
    vehicleFitnessExpiry: {
        type: Date,
        required: false,
        trim: true
    },
    vehiclePUCExpiry: {
        type: Date,
        required: false,
        trim: true
    },
    vehicleRegistration: {
        type: Date,
        required: true,
        trim: true
    },
});

const VehicleInfo = mongoose.model('VehicleInfo', vehicleInfoSchema);

module.exports = VehicleInfo;