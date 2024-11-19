const express = require('express');
const authRouter = express.Router();
const AuthController = require('../controllers/AuthController');

const validatePhoneSignup = require('../middlewares/signupPhoneMiddleware');
const validateMailSignup = require('../middlewares/signupEmailMiddleware');
const validateAccountPassword = require('../middlewares/validateLoginCredentials');
const isAuth = require('../middlewares/authenication');
const validateAccount = require('../middlewares/validateResetAccount');
const validateResetPassword = require('../middlewares/validateResetPassword');

// Route to sign up using a phone number
authRouter.post('/signup/phone', validatePhoneSignup, AuthController.signupWithPhoneNumber);

// Route to sign up using an email address
authRouter.post('/signup/email', validateMailSignup, AuthController.signupWithEmail);

// Route to log in using either a phone number or an email address
authRouter.post('/login', validateAccountPassword, AuthController.login);

// Route to refresh the access token
authRouter.post('/refresh-token', AuthController.refreshAccessToken);

// Route to send an OTP for password recovery
authRouter.post('/forgot-password', validateAccount, AuthController.forgotPassword);

// Route to log out
authRouter.post('/logout', isAuth, AuthController.logout);

// Route to reset the password
authRouter.patch('/reset-password', validateResetPassword, AuthController.resetPassword);

// Route to change the user password
authRouter.patch('/change-password', isAuth, AuthController.changePassword);

module.exports = authRouter;
