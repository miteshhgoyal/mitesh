// middlewares/auth.middleware.js
import { tokenService } from "../services/tokenService.js";
import Config from "../models/Config.js";

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ valid: false, message: 'No token provided' });
    }

    try {
        const decoded = tokenService.verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ valid: false, message: 'Invalid token' });
        }

        // FIXED: Changed from decoded.userId to decoded.configId
        const config = await Config.findById(decoded.configId);
        if (!config) {
            return res.status(401).json({ valid: false, message: 'Configuration not found' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ valid: false, message: 'Invalid token' });
    }
};

// Middleware to verify password for login
export const verifyPassword = async (req, res, next) => {
    const { accessPassword } = req.body;

    if (!accessPassword) {
        return res.status(400).json({ success: false, message: 'Password required' });
    }

    try {
        // Get the single Config document
        const config = await Config.findOne();

        if (!config) {
            return res.status(404).json({ success: false, message: 'Configuration not found' });
        }

        // Use the comparePassword method from the schema
        const isMatch = await config.comparePassword(accessPassword);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        // Update last login
        config.lastLogin = new Date();
        await config.save();

        req.config = config;
        next();
    } catch (error) {
        console.error('verifyPassword error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
