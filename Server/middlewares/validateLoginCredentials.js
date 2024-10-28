const { emailRegex } = require('../utils/mail/matchMail.js');
const { phoneRegex } = require('../utils/sms/phoneMatch.js');

const validateAccountPassword = (req, res, next) => {
    const { account, password } = req.body;

    req.isEmail = false;
    req.isPhone = false;

    if (emailRegex(account)) {
        req.isEmail = true;
    } else if (phoneRegex(account)) {
        req.isPhone = true;
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid identifier. Please use a valid email or phone number.'
        });
    }

    if (!password || password.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Password is required and cannot be empty.'
        });
    }

    next();
};

module.exports = validateAccountPassword;
