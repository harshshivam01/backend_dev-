const jwt = require('jsonwebtoken');
const JWT_SECRET =  'harshsh';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Authentication required"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            status: "error",
            message: "Invalid or expired token"
        });
    }
};

module.exports = { authenticateToken };
