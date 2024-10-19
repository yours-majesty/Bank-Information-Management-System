const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel'); // Adjust the path based on your project structure

const adminAuth = async (req, res, next) => {
    try {
        // Get token from the authorization header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret
        req.user = decoded; // Store decoded token information in req.user

        // Check if the user is an admin (adjust according to your User schema)
        const user = await Admin.findById(req.user.userId);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ success: false, message: 'Forbidden: Admin access only' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = adminAuth;
