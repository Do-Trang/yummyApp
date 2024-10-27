const { 
    resendOTPVerification,
    resendOTPRecovery,
    verifyAccount
 } = require('../services/verify.js');

class VerifyController {
    // @route [POST] /auth/resend-otp-verification
    // @desc Resend OTP for account verification
    // @access Public
    async resendOTPVerification(req, res) {
        const { account } = req.body;
        const isEmail = req.isEmail;

        try {
            const result = await resendOTPVerification(account, isEmail);
            if(result.success) {
                return res.status(200).json(result)
            } else {
                return res.status(404).json(result)
            }
        } catch (error) {
            console.error('Error sending OTP for verification:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'An error occurred while sending OTP for verification.' 
            });
        }
    }

    // @route [POST] /auth/resend-otp-recovery
    // @desc Resend OTP for account recovery
    // @access Public
    async resendOTPRecovery(req, res) {
        const { account } = req.body;
        const isEmail = req.isEmail;

        try {
            const result = await resendOTPRecovery(account, isEmail);

            if (!result.success) {
                return res.status(404).json(result);
            } else {
                return res.status(200).json(result);
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
            const result = await verifyAccount(account, otp);

            if (!result.success) {
                if (result.message === 'User not found.') {
                    return res.status(404).json(result);
                } else {
                    return res.status(400).json(result);
                }
            } else {
                return res.status(200).json(result);
            }

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
