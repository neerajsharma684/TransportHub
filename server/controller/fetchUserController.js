const User = require('../models/user.model');
const { ObjectId } = require('mongodb');

const fetchUsers = async (req, res) => {
    const { createdBy } = req.query;
    try {
        const objectId = new ObjectId(createdBy);
        const users = await User.find({createdBy: objectId});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { fetchUsers };