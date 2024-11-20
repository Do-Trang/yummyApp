const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { User, UserToken } = require('../db/models');
const { Op } = require('sequelize');

const { generateOtp } = require('../utils/otpGenerator');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const { sendVerificationEmail } = require('../utils/mail/sendVerifyEmail');
const { sendRecoveryEmail } = require('../utils/mail/sendRecoveryEmail');

dotenv.config();

const signupWithPhoneNumber = async (username, account, password) => {
    const existingUser = await User.findOne({
        where: { phone_number: account }
    });

    if (existingUser) {
        return { success: false, message: 'The phone number is already in use.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username: username,
        password: hashedPassword,
        phone_number: account
    });

    await UserToken.create({ user_id: newUser.user_id });

    return {
        success: true,
        message: 'Sign up successful! Please check your sms to verify your account.',
        account: account,
    };
};

const signupWithEmail = async (username, account, password) => {
    const existingUser = await User.findOne({
        attributes: ['user_id'],
        where: { email: account }
    });

    if (existingUser) {
        return { success: false, message: 'The email is already in use.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
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

    return {
        success: true,
        message: 'Sign up successful! Please check your email to verify your account.',
        account: account,
    };
};

const login = async (account, password, isEmail) => {
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
        return { success: false, message: 'Non-exist user.' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { success: false, message: 'False password' };
    }

    const payload = { userId: user.user_id };
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken();

    const userToken = await UserToken.findOne({
        attributes: ['refresh_token', 'check_verified'],
        where: { user_id: user.user_id },
    });

    if (!userToken || !userToken.refresh_token) {
        if (!userToken.check_verified) {
            if (isEmail) {
                const otp = generateOtp();
                const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000);
                await sendVerificationEmail(account, otp);
                await UserToken.update(
                    { otp, otp_expiration: otpExpirationTime },
                    { where: { user_id: user.user_id } }
                );

                return {
                    success: true,
                    message: 'OTP has been sent to your mail. Please verify to continue.',
                };
            } else {
                return {
                    success: true,
                    message: 'OTP has been sent to your sms. Please verify to continue.',
                };
            }
        } else {
            const refreshTokenExpiration = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_LIFE));
            await UserToken.update(
                { refresh_token: refreshToken, token_expiration: refreshTokenExpiration },
                { where: { user_id: user.user_id } }
            );

            return {
                success: true,
                message: 'Login successful.',
                accessToken,
                refreshToken
            };
        }
    } else {
        const refreshTokenExpiration = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_LIFE));
        await UserToken.update(
            { refresh_token: refreshToken, token_expiration: refreshTokenExpiration },
            { where: { user_id: user.user_id } }
        );

        return {
            success: true,
            message: 'Login successful.',
            accessToken,
            refreshToken
        };
    }
};

const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken) {
        return { success: false, message: 'Refresh token is required.' };
    }

    const userToken = await UserToken.findOne({
        where: { 
            refresh_token: refreshToken 
        },
        attributes: ['user_id']
    });

    if (!userToken) {
        return { success: false, message: 'Invalid refresh token.' };
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

    return {
        success: true,
        message: 'Access token refreshed successfully.',
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
};

const forgotPassword = async (account, isEmail) => {
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email: account },
                { phone_number: account }
            ]
        }
    });

    if (!user) {
        return {success: false, message: 'User not found.',};
    }

    if (isEmail) {
        const otp = generateOtp();
        const otpExpirationTime = new Date(Date.now() + 5 * 60 * 1000);

        await UserToken.update(
            { otp, otp_expiration: otpExpirationTime },
            { where: { user_id: user.user_id } }
        );

        await sendRecoveryEmail(account, otp);
        return {
            success: true,
            message: 'OTP sent to your email. Please check your inbox.',
        };
    } else {
        return {
            success: true,
            message: 'OTP sent to your sms. Please check your messages.',
        };
    }
};

const logout = async (userId) => {
    const userToken = await UserToken.findOne({
        where: { user_id: userId }
    });

    if (!userToken) {
        return {success: false, message: 'User session not found.',};
    }

    await UserToken.update(
        {
            refresh_token: null,
            token_expiration: null
        },
        {
            where: {user_id: userId}
        }
    );

    return {
        success: true,
        message: 'Logout successful.',
    };
};

const resetUserPassword = async (account, newPassword) => {
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
        return {success: false, message: 'User not found.',};
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update(
        { 
            password: hashedPassword
        },
        { 
            where: {
                [Op.or]: [
                    { phone_number: account },
                    { email: account }
                ]
            }, 
        }
    );

    return {success: true,
        message: 'Password has been reset successfully.',
    };
};

const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findOne({
        where: { user_id: userId },
        attributes: ['user_id', 'password']
    });

    if (!user) {
        return { success: false, message: 'User not found.' };
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
        return { success: false, message: 'Old password is incorrect.' };
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await User.update(
        { password: hashedNewPassword },
        { where: { user_id: userId } }
    );

    return {
        success: true,
        message: 'Password has been changed successfully.'
    };
};

module.exports = {
    changePassword,
    signupWithPhoneNumber,
    signupWithEmail,
    login,
    refreshAccessToken,
    forgotPassword,
    logout,
    resetUserPassword
};
