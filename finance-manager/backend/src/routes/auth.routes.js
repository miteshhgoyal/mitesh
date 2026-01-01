// routes/auth.routes.js
import express from 'express';
import { verifyPassword, authenticateToken } from '../middlewares/auth.middleware.js';
import { tokenService } from '../services/tokenService.js';
import Config from '../models/Config.js';

const router = express.Router();

// Login - Verify access password
router.post('/login', verifyPassword, async (req, res) => {
    try {
        const { config } = req;

        // Generate JWT token
        const token = tokenService.generateToken({
            configId: config._id.toString(),
            name: config.name,
            authenticatedAt: Date.now()
        }, '30d');

        res.json({
            success: true,
            message: 'Authentication successful',
            data: {
                name: config.name,
                lastLogin: config.lastLogin,
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
});

// Verify Token - Check if current token is valid
router.post('/verify-token', authenticateToken, async (req, res) => {
    try {
        res.json({
            success: true,
            valid: true,
            message: 'Token is valid',
            user: {
                name: req.user.name,
                configId: req.user.configId
            }
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Verification failed'
        });
    }
});

// Refresh Token - Generate new token if current one is valid
router.post('/refresh-token', authenticateToken, async (req, res) => {
    try {
        const config = await Config.findById(req.user.configId);

        if (!config) {
            return res.status(404).json({
                success: false,
                message: 'Configuration not found'
            });
        }

        // Generate new token
        const newToken = tokenService.generateToken({
            configId: config._id.toString(),
            name: config.name,
            authenticatedAt: Date.now()
        }, '30d');

        res.json({
            success: true,
            message: 'Token refreshed successfully',
            token: newToken
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({
            success: false,
            message: 'Token refresh failed'
        });
    }
});

// Get Profile - Return config details
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const config = await Config.findById(req.user.configId).select('-accessPassword');

        if (!config) {
            return res.status(404).json({
                success: false,
                message: 'Configuration not found'
            });
        }

        res.json({
            success: true,
            data: {
                name: config.name,
                lastLogin: config.lastLogin,
                createdAt: config.createdAt,
                updatedAt: config.updatedAt
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve profile'
        });
    }
});

// Update Password - Change access password
router.put('/update-password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password and new password are required'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters long'
            });
        }

        const config = await Config.findById(req.user.configId);

        if (!config) {
            return res.status(404).json({
                success: false,
                message: 'Configuration not found'
            });
        }

        // Verify current password
        const isMatch = await config.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Update to new password (pre-save hook will hash it)
        config.accessPassword = newPassword;
        await config.save();

        res.json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update password'
        });
    }
});

// Logout - Client-side token invalidation (optional route)
router.post('/logout', authenticateToken, async (req, res) => {
    try {
        // Since JWT is stateless, logout is handled client-side by removing the token
        res.json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Logout failed'
        });
    }
});

export default router;
