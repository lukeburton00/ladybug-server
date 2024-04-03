const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            console.error("No token provided");
            return res.status(401).json({ 
                status: 'error',
                error: 'Access denied'
            });
        }

        jwt.verify(token, String(process.env.JWT_SECRET), async (error, decoded) => {
            if (error) {
                console.error("Invalid token");
                return res.status(403).json({
                    status: 'error',
                    error: 'Invalid token'
                });
            }
            req.user_id = decoded.id;
            const user = await User.findByPk(req.user_id);
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    error: 'User not found'
                });
            }
            next();
        });
    }

    catch (error) {
        return res.status(500).json({ 
            status: 'error',
            error: 'Internal server error'
        });
    }
}

exports.authenticateRefresh = function (req, res, next) {
    try {
        const token = req.cookies.refresh;
        if (!token) {
            console.error("No refresh token provided");
            return res.status(401).json({ 
                status: 'error',
                error: 'Access denied'
            });
        }

        jwt.verify(token, String(process.env.JWT_SECRET), async (error, decoded) => {
            if (error) {
                console.error("Invalid refresh token");
                return res.status(403).json({
                    status: 'error',
                    error: 'Invalid token'
                });
            }
            req.user_id = decoded.id;
            const user = await User.findByPk(req.user_id);
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    error: 'User not found'
                });
            }
            next();
        });
    }

    catch (error) {
        return res.status(500).json({ 
            status: 'error',
            error: 'Internal server error'
        });
    }
};