const Branch = require('../models/branch.model');

const deleteBranch = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Branch.findOneAndDelete({ _id: id });
        if (!result) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.json({ message: 'Branch deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { deleteBranch };