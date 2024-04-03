const jwt = require("jsonwebtoken");

exports.generateToken = function (user_id) {
    return jwt.sign({id: user_id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

exports.generateRefreshToken = function (user_id) {
    return jwt.sign({id: user_id}, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_EXPIRES_IN });
};