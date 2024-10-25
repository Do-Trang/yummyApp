const { isValidPassword } = require('../utils/password.js');
const { emailRegex } = require('../utils/mail/matchMail.js');

const validateMailSignup = (req, res, next) => {
    const { account, password } = req.body;

    if (!account || !emailRegex(account)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid account. Please provide a valid email address.'
        });
    }

    if (!password || password.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Password is required and cannot be empty.'
        });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        });
    }

    next();
};

module.exports = validateMailSignup;
