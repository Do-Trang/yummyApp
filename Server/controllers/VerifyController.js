const { User, UserToken } = require('../db/models');

const { generateOtp } = require('../utils/otpGenerator');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { emailRegex } = require('../utils/mail/matchMail')

const { sendVerificationEmail } = require('../utils/mail/sendVerifyEmail');
const { sendRecoveryEmail } = require('../utils/mail/sendRecoveryEmail');

class VerifyController {
    // @route [POST] /auth/resend-mail-otp-verification
    // @desc Resend OTP for account verification
    // @access Public
    async resendMailOTPVerification(req, res) {
        const { account } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    email: account
                },
                attributes: ['user_id'],
            });

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found.' });
            }

            if (req.isEmail) {
                const userToken = await UserToken.findOne({
                    where: {
                        user_id: user.user_id
                    },
                    attributes: ['otp', 'otp_expiration'],
                });
    
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

                return res.status(200).json({
                    success: true,
                    message: 'OTP for mail verification has been sent successfully.',
                    otpExpiration: otpExpirationTime
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'OTP for sms verification has been sent successfully.',
                });
            }

        } catch (error) {
            console.error('Error sending OTP for verification:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'An error occurred while sending OTP for verification.' 
            });
        }
    }

    // @route [POST] /auth/resend-mail-otp-recovery
    // @desc Resend OTP for account recovery
    // @access Public
    async resendMailOTPRecovery(req, res) {
        const { account } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    email: account
                },
                attributes: ['user_id'],
            });

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found.' });
            }

            if (req.isEmail) {
                const userToken = await UserToken.findOne({
                    where: {
                        user_id: user.user_id
                    },
                    attributes: ['otp', 'otp_expiration'],
                });
    
                const otp = generateOtp();
                const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000);

                await sendRecoveryEmail(account, otp);

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

                return res.status(200).json({
                    success: true,
                    message: 'OTP for mail recovery has been sent successfully.',
                    otpExpiration: otpExpirationTime
                });    
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'OTP for sms recovery has been sent successfully.',
                });    
            }

        } catch (error) {
            console.error('Error sending OTP for recovery:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'An error occurred while sending OTP for recovery.' 
            });
        }
    }

    // @route [POST] /auth/verify-account
    // @desc Verify user account using email (with OTP) or phone number
    // @access Public
    async verifyAccount(req, res) {
        const { account, otp } = req.body;
        try {
            const isEmail = emailRegex(account);

            const user = await User.findOne({
                where: {
                    [isEmail ? 'email' : 'phone_number']: account
                },
                attributes: ['user_id'],
            });

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found.' });
            }

            const userToken = await UserToken.findOne({
                where: {
                    user_id: user.user_id
                },
                attributes: ['user_id', 'otp', 'otp_expiration', 'check_verified'],
            });

            if (isEmail) {
                if (userToken.otp !== otp) {
                    return res.status(400).json({ success: false, message: 'Invalid OTP.' });
                }

                const otpExpirationTime = new Date(userToken.otp_expiration);
                const now = new Date();

                if (now.getTime() > otpExpirationTime.getTime()) {
                    return res.status(400).json({ success: false, message: 'OTP has expired.' });
                }

                await UserToken.update(
                    {
                        check_verified: true,
                        otp: null,
                        otp_expiration: null,
                    },
                    {
                        where: {
                            user_id: userToken.user_id
                        }
                    }
                );

                console.log("end");
            } else {
                await UserToken.update(
                    {
                        check_verified: true,
                    },
                    {
                        where: {
                            user_id: userToken.user_id
                        }
                    }
                );
            }

            const payload = { 
                userId: user.user_id 
            };
            const refreshTokenExpiration = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_LIFE));
            const accessToken = await generateAccessToken(payload);
            const refreshToken = await generateRefreshToken();

            await UserToken.update(
                {
                    refresh_token: refreshToken,
                    token_expiration: refreshTokenExpiration
                }, 
                {
                    where: {
                        user_id: userToken.user_id
                    }
                }
            );

            return res.status(200).json({
                success: true,
                message: isEmail ? 'Account verified successfully via email.' : 'Account verified successfully via phone number.',
                accessToken,
                refreshToken
            });

        } catch (error) {
            console.log('Error verifying account:', error);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while verifying the account.'
            });
        }
    }
}

module.exports = new VerifyController();
