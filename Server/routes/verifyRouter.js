const express = require('express');
const verifyRouter = express.Router();
const VerifyController = require('../controllers/VerifyController');

const validateAccount = require('../middlewares/validateResetAccount');

// Route to resend OTP for email verification
verifyRouter.post('/resend-otp-verification', validateAccount, VerifyController.resendOTPVerification);

// Route to resend OTP for account recovery via email
verifyRouter.post('/resend-otp-recovery', validateAccount, VerifyController.resendOTPRecovery);

// Route to verify account using email or phone number with OTP
verifyRouter.post('/verify-account', validateAccount, VerifyController.verifyAccount);

module.exports = verifyRouter;