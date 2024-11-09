const User = require('../models/user.model');

const deleteUser = async (req, res) => {
    const { email } = req.params;
    try {
        const result = await User.findOneAndDelete({ email });
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { deleteUser };