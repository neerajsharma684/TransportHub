const mongoose = require('mongoose');

const vehicleInfoSchema = new mongoose.Schema({
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
    vehicleOwner: {
        type: String,
        required: true,
        trim: true
    },
    vehicleOwnerContact: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'createdByModel',
        required: true
    },
    createdByModel: {
        type: String,
        required: true,
        enum: ['User', 'Admin']
    }
});

const VehicleInfo = mongoose.model('VehicleInfo', vehicleInfoSchema);

module.exports = VehicleInfo;