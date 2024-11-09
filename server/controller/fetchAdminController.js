const Admin = require('../models/admin.model');
const { ObjectId } = require('mongodb');

const fetchadmins = async (req, res) => {
    const { createdBy } = req.query;
    try {
        const objectId = new ObjectId(createdBy);
        const admins = await Admin.find({createdBy: objectId});
        res.json(admins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { fetchAdmins };