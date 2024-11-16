const Branch = require("../models/branch.model")
const { ObjectId } = require('mongodb');

const fetchBranch = async (req, res) => {
    const {createdBy} = req.query;
    try {
        const objectId = new ObjectId(createdBy);
        const branch = await Branch.find({createdBy: objectId});
        res.json(branch);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {fetchBranch}