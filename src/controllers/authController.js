const User = require("../models/user.js");
const { generateToken, generateRefreshToken }= require("../services/generateTokenService.js");
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { email, password, password_confirmation } = req.body.user;
        if (password != password_confirmation) {
            return res.status(401).json({
                status: "error",
                error: "Passwords do not match"
            });
        }

        const existing_user = await User.findOne({where: {email: email}})
        if (existing_user) {
            return res.status(400).json({
                status: "error",
                error: "User already exists"
            });
        }

        const hash = await bcrypt.hash(password, 12);
        const user =  await User.create({
            email: email, 
            password: hash
        });

        const token = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        res.cookie(
            'jwt', token, 
            { httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        res.cookie(
            'refresh', refreshToken, 
            { httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return res.status(201).json({ 
            status: "success",
            message: "User created successfully"
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: "Internal Server Error"
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body.user;

        const user = await User.findOne({where: {email: email}});
        if (!user) {
            return res.status(400).json({
                status: "error",
                error: "User not found" });
        }

        const passwords_match = await bcrypt.compare(password, String(user.password).trim());
        if (!passwords_match) {
            return res.status(400).json({
                status: "error",
                error: "Incorrect password"
            });
        }

        const token = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        res.cookie(
            'jwt', token, 
            { httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        res.cookie(
            'refresh', refreshToken, 
            { httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return res.status(200).json({
            status: "success",
            message: "User signed in successfully"
        });        
    }
    
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: 'Internal Server Error'
        });
    };
};

exports.refreshToken = async(req, res) => {
    try {
        const user = await User.findOne({where: {email: email}});

        const token = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        res.cookie(
            'jwt', token, 
            { httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie(
            'refresh', refreshToken, 
            { httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            status: "success",
            message: "Token has been refreshed"
        });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: 'Internal Server Error'
        });
    }
};

exports.logout = async (req, res) => {
    try {
        console.log("Logging Out");
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });
        res.clearCookie('refresh', { httpOnly: true, secure: true, sameSite: 'none' });
        return res.status(200).json({
            status: "success",
            message: "User logged out successfully"
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: 'Internal Server Error'
        });
    }
};

exports.update_email = async (req, res) => {
    try {
        const { email, password } = req.body.user;

        const user = await User.findByPk(req.user_id);
        const passwords_match = await bcrypt.compare(password, String(user.password).trim());
        if (!passwords_match) {
            return res.status(400).json({
                status: "error",
                error: "Incorrect password"
            });
        }

        await user.update({
            email: email
        });

        return res.status(201).json({ 
            status: "success",
            message: "User updated successfully."
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: "Internal Server Error"
        });
    }
}

exports.update_password = async (req, res) => {
    try {
        const { password, password_confirmation, current_password } = req.body.user;

        if (password != password_confirmation) {
            return res.status(401).json({
                status: "error",
                error: "Passwords do not match"
            });
        }

        const user = await User.findByPk(req.user_id);
        const passwords_match = await bcrypt.compare(current_password, String(user.password).trim());
        if (!passwords_match) {
            return res.status(400).json({
                status: "error",
                error: "Incorrect password"
            });
        }

        const hash = await bcrypt.hash(password, 12);
        await user.update({
            password: hash
        });

        return res.status(201).json({ 
            status: "success",
            message: "User updated successfully."
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: "Internal Server Error"
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const { password } = req.body.user;
        const user = await User.findByPk(req.user_id);

        const passwords_match = await bcrypt.compare(password, String(user.password).trim());
        if (!passwords_match) {
            return res.status(400).json({
                status: "error",
                error: "Incorrect password"
            });
        }

        await user.destroy();

        return res.status(204).json({ 
            status: "success",
            message: "User deleted successfully."
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            error: "Internal Server Error"
        });
    }
}