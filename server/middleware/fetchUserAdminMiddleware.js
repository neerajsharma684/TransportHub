const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    console.log("authenticateToken");
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

module.exports = { authenticateToken, authorizeAdmin };