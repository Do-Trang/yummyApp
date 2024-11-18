const { User, UserToken } = require('../db/models');
const { Op } = require('sequelize');

const { generateOtp } = require('../utils/otpGenerator');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { emailRegex } = require('../utils/mail/matchMail')

const { sendVerificationEmail } = require('../utils/mail/sendVerifyEmail');
const { sendRecoveryEmail } = require('../utils/mail/sendRecoveryEmail');

const resendOTPVerification = async (account, isEmail) => {
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email: account },
                { phone_number: account }
            ]
        },
        attributes: ['user_id'],
    });
    
    if (!user) {
        return { success: false, message: 'User not found.' };
    }
    
    if (isEmail) {
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

        return {
            success: true,
            message: 'OTP for mail verification has been sent successfully.',
            otpExpiration: otpExpirationTime,
        };
    } else {
        return {
            success: true,
            message: 'OTP for SMS verification has been sent successfully.',
        };
    }
};

const resendOTPRecovery = async (account, isEmail) => {
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email: account },
                { phone_number: account }
            ]
        },
        attributes: ['user_id'],
    });

    if (!user) {
        return { success: false, message: 'User not found.' };
    }

    if (isEmail) {
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

        return {
            success: true,
            message: 'OTP for mail recovery has been sent successfully.',
            otpExpiration: otpExpirationTime,
        };
    } else {
        return {
            success: true,
            message: 'OTP for SMS recovery has been sent successfully.',
        };
    }
};

const verifyAccount = async (account, otp) => {
    const isEmail = emailRegex(account);

    const user = await User.findOne({
        where: {
            [isEmail ? 'email' : 'phone_number']: account,
        },
        attributes: ['user_id'],
    });

    if (!user) {
        return { success: false, message: 'User not found.' };
    }

    const userToken = await UserToken.findOne({
        where: {
            user_id: user.user_id,
        },
        attributes: ['user_id', 'otp', 'otp_expiration', 'check_verified'],
    });

    if (isEmail) {
        if (userToken.otp !== otp) {
            return { success: false, message: 'Invalid OTP.' };
        }

        const otpExpirationTime = new Date(userToken.otp_expiration);
        const now = new Date();

        if (now.getTime() > otpExpirationTime.getTime()) {
            return { success: false, message: 'OTP has expired.' };
        }

        await UserToken.update(
            {
                check_verified: true,
                otp: null,
                otp_expiration: null,
            },
            {
                where: {
                    user_id: userToken.user_id,
                },
            }
        );
    } else {
        await UserToken.update(
            {
                check_verified: true,
            },
            {
                where: {
                    user_id: userToken.user_id,
                },
            }
        );
    }

    const payload = { userId: user.user_id };
    const refreshTokenExpiration = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_LIFE));
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken();

    await UserToken.update(
        {
            refresh_token: refreshToken,
            token_expiration: refreshTokenExpiration,
        },
        {
            where: {
                user_id: userToken.user_id,
            },
        }
    );

    return {
        success: true,
        message: isEmail ? 'Account verified successfully via email.' : 'Account verified successfully via phone number.',
        accessToken,
        refreshToken,
    };
};

module.exports = { 
    resendOTPVerification, 
    resendOTPRecovery, 
    verifyAccount 
};
