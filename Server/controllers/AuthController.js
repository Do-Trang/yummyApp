const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { User, UserToken } = require('../db/models');
const { Op } = require('sequelize');

const { generateOtp } = require('../utils/otpGenerator');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

const { sendVerificationEmail } = require('../utils/mail/sendVerifyEmail');
const { sendRecoveryEmail } = require('../utils/mail/sendRecoveryEmail');

dotenv.config();

class AuthController {
    // @route [POST] /auth/signup/phone
    // @desc Sign up with phone number
    // @access Public
    async signupWithPhoneNumber(req, res) {
        const { username, account, password } = req.body;
    
        try {
            const existingUser = await User.findOne({ 
                where: { 
                    phone_number: account
                } 
            });
    
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'The phone number is already in use.' });
            }
    
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await User.create({
                username: username,
                password: hashedPassword,
                phone_number: account
            });
    
            await UserToken.create({
                user_id: newUser.user_id,
            });
    
            return res.status(201).json({
                success: true,
                message: 'Sign up successful! Please check your sms to verify your account.', 
                account: account,
            });

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
            const existingUser = await User.findOne({ 
                attributes: ['user_id'],
                where: { 
                    email: account 
                } 
            });

            if (existingUser) {
                return res.status(400).json({ success: false, message: 'The email is already in use.' });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await User.create({
                username: username,
                password: hashedPassword,
                email: account
            });

            const otp = generateOtp();
            const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000);

            await UserToken.create({
                user_id: newUser.user_id,
                otp: otp,
                otp_expiration: otpExpirationTime
            });

            await sendVerificationEmail(account, otp);

            return res.status(201).json({
                success: true,
                message: 'Sign up successful! Please check your email to verify your account.', 
                account: account,
            });

        } catch (error) {
            console.error('Error during signup with email:', error);
            return res.status(500).json({ 
                success: false,
                message: 'An error occurred during the signup process.' 
            });
        }
    }

    // @route [POST] /auth/login
    // @desc Login with phone number or email
    // @access Public
    async login(req, res) {
        const { account, password } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { phone_number: account },
                        { email: account }
                    ]
                },
                attributes: ['user_id', 'password'],
            });

            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid credentials.' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Invalid credentials.' });
            }

            const payload = { 
                userId: user.user_id 
            };
            const accessToken = await generateAccessToken(payload);
            const refreshToken = await generateRefreshToken();

            const userToken = await UserToken.findOne({
                attributes: ['refresh_token', 'check_verified'],
                where: {
                    user_id: user.user_id,
                },
            });

            if (!userToken || !userToken.refresh_token) {
                if (!userToken.check_verified) {
                    if (req.isEmail) {
                        const otp = generateOtp();
                        const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000);

                        await sendVerificationEmail(account, otp);
                        
                        await UserToken.update(
                            {
                                otp: otp,
                                otp_expiration: otpExpirationTime
                            }, 
                            {
                                where: {
                                    user_id: user.user_id
                                }
                            }
                        );

                        return res.status(202).json({
                            account: account,
                            success: true,
                            message: 'OTP has been sent to your mail. Please verify to continue.',
                        });

                    } else {
                        return res.status(202).json({
                            success: true,
                            message: 'OTP has been sent to your sms. Please verify to continue.',
                        });   
                    }
                } else {
                    const refreshTokenExpiration = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_LIFE));

                    await UserToken.update(
                        {
                            refresh_token: refreshToken,
                            token_expiration: refreshTokenExpiration
                        }, 
                        {
                            where: {
                                user_id: user.user_id
                            }
                        }
                    );
    

                    return res.status(200).json({
                        success: true,
                        message: 'Login successful.',
                        accessToken,
                        refreshToken
                    });
                }
            } else {
                const refreshTokenExpiration = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_LIFE));
                await UserToken.update(
                    {
                        refresh_token: refreshToken,
                        token_expiration: refreshTokenExpiration
                    }, 
                    {
                        where: {
                            user_id: user.user_id
                        }
                    }
                );

                return res.status(200).json({
                    success: true,
                    message: 'Login successful.',
                    accessToken,
                    refreshToken
                });
            }

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

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token is required.',
            });
        }

        try {
            const userToken = await UserToken.findOne({
                where: { 
                    refresh_token: refreshToken 
                },
                attributes: ['user_id']
            });

            if (!userToken) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid refresh token.',
                });
            }

            const payload = { userId: userToken.user_id };
            const newAccessToken = await generateAccessToken(payload);
            const newRefreshToken = await generateRefreshToken();

            await UserToken.update(
                { 
                    refresh_token: newRefreshToken 
                },
                { 
                    where: { user_id: userToken.user_id } 
                }
            );

            return res.status(200).json({
                success: true,
                message: 'Access token refreshed successfully.',
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
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
    
        try {
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: account },
                        { phone_number: account }
                    ]
                }
            });
    
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found.',
                });
            }
    
            if (req.isEmail) {
                const otp = generateOtp();
                const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000);
        
                await UserToken.update(
                    { otp, otp_expiration: otpExpirationTime },
                    { where: { user_id: user.user_id } }
                );

                await sendRecoveryEmail(account, otp);
                return res.status(200).json({
                    success: true,
                    message: 'OTP sent to your email. Please check your inbox.',
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'OTP sent to your sms. Please check your messages.',
                });
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
            const userToken = await UserToken.findOne({
                where: { user_id: user_id }
            });
    
            if (!userToken) {
                return res.status(404).json({
                    success: false,
                    message: 'User session not found.',
                });
            }

            await UserToken.update(
                {
                    refresh_token: null,
                    token_expiration: null
                },
                {
                    where: {
                        user_id: user_id
                    }
                }
            );
            

            return res.status(200).json({
                success: true,
                message: 'Logout successful.',
            });

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
            const user = await User.findOne({ 
                where: { 
                    user_id: userId 
                } 
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found.',
                });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            await User.update(
                { 
                    password: hashedPassword 
                },
                { 
                    where: { user_id: userId } 
                }
            );

            return res.status(200).json({
                success: true,
                message: 'Password has been reset successfully.',
            });

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

