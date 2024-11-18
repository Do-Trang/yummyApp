const { emailRegex } = require('../utils/mail/matchMail.js');
const { phoneRegex } = require('../utils/sms/phoneMatch.js');

function validateAccount(req, res, next) {
    const { account } = req.body;

    if (emailRegex(account)) {
        req.isEmail = true;
    } else if (phoneRegex(account)) {
        req.isEmail = false;
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid account. Please provide a valid email or phone number.'
        });
    }

    next();
}

module.exports = validateAccount;