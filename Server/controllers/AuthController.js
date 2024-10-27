const dotenv = require('dotenv');

const { signupWithEmail, 
        signupWithPhoneNumber, 
        login,
        refreshAccessToken,
        forgotPassword,
        logout,
        resetUserPassword } = require('../services/auth.js');

dotenv.config();

class AuthController {
    // @route [POST] /auth/signup/phone
    // @desc Sign up with phone number
    // @access Public
    async signupWithPhoneNumber(req, res) {
        const { username, account, password } = req.body;
    
        try {
            const result = await signupWithPhoneNumber(username, account, password);

            if (!result.success) {
                return res.status(400).json(result);
            }

            return res.status(201).json(result);
        } catch (error) {
            console.log('Error during signup with phone:', error);
            return res.status(500).json({ 
                success: false,
                message: 'An error occurred during the signup process.' 
            });
        }
    } 

    // @route [POST] /auth/signup/email
    // @desc Sign up with email
    // @access Public
    async signupWithEmail(req, res) {
        const { username, account, password } = req.body;

        try {
            const result = await signupWithEmail(username, account, password);

            if (!result.success) {
                return res.status(400).json(result);
            }

            return res.status(201).json(result);
        } catch (error) {
            console.error('Error during registration:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred during registration.',
            });
        }
    }

    // @route [POST] /auth/login
    // @desc Login with phone number or email
    // @access Public
    async login(req, res) {
        const { account, password } = req.body;
        const isEmail = req.isEmail;

        try {
            const result = await login(account, password, isEmail);
            
            let statusCode;
            if (!result.success) {
                statusCode = 401;
            } else if (result.message.includes('OTP')) {
                statusCode = 202;
            } else {
                statusCode = 200;
            }

            return res.status(statusCode).json(result);
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ 
                success: false,
                message: 'An error occurred during the login process.' 
            });
        }
    }

    // @route [POST] /auth/refresh-token
    // @desc Refresh access token
    // @access Public
    async refreshAccessToken(req, res) {
        const { refreshToken } = req.body;

        try {
            const result = await refreshAccessToken(refreshToken);
            
            if (result.success) {
                return res.status(200).json(result);
            } 
            
            if (result.message === 'Invalid refresh token.') {
                return res.status(401).json(result);
            } 
            
            return res.status(400).json(result);
            
        } catch (error) {
            console.error('Error refreshing access token:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while refreshing the access token.',
            });
        }
    }

    // @route [POST] /auth/forgot-password
    // @desc Send OTP to reset password
    // @access Public
    async forgotPassword(req, res) {
        const { account } = req.body;
        const isEmail = req.isEmail;
    
        try {
            const otpResult = await forgotPassword(account, isEmail);
    
            if (otpResult.success) {
                return res.status(200).json(otpResult);
            } else {
                return res.status(400).json(otpResult);
            }
        } catch (error) {
            console.error('Error during forgot password:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while sending the OTP.',
            });
        }
    }

    // @route [POST] /auth/logout
    // @desc Logout user
    // @access Private
    async logout(req, res) {
        const user_id = req.user_id;
    
        try {
            const logoutResult = await logout(user_id);
    
            if (!logoutResult.success) {
                return res.status(404).json(logoutResult);
            }
    
            return res.status(200).json(logoutResult);
        } catch (error) {
            console.error('Error during logout:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred during the logout process.',
            });
        }
    }

    // @route [PATCH] /auth/reset-password
    // @desc Reset user password
    // @access Private
    async resetPassword(req, res) {
        const { newPassword } = req.body;
        const userId = req.user_id;

        try {
            const resetResult = await resetUserPassword(userId, newPassword);

            if (resetResult.success) {
                return res.status(200).json(resetResult);
            } else {
                return res.status(404).json(resetResult);
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while resetting the password.',
            });
        }
    }
}

module.exports = new AuthController();

