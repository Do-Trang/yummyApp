const { User } = require('../db/models');
const { verifyToken } = require('../utils/jwt');

const isAuth = async (req, res, next) => {
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).json({ success: false, message: 'Access token not found' });
    }

    try {
        const payload = await verifyToken(accessTokenFromHeader);
        if (!payload) {
            return res.status(401).json({ success: false, message: 'Invalid or expired access token' });
        }

        const user = await User.findByPk(payload.userId, {
            attributes: ['user_id'],
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        req.user_id = payload.userId;
        next();
        
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = isAuth;
