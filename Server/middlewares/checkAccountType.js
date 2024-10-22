const emailRegex = require('../utils/mail/matchMail.js');
const phoneRegex = require('../utils/sms/phoneMatch.js');

const checkIdentifierType = (req, res, next) => {
    const { account } = req.body;

    if (emailRegex(account)) {
        req.isEmail = true;
        req.isPhone = false;
    } else if (phoneRegex(account)) {
        req.isEmail = false;
        req.isPhone = true;
    } 
    else {
        return res.status(400).json({ success: false, message: 'Invalid identifier. Please use a valid email or phone number.' });
    }

    next();
};

module.exports = checkIdentifierType;
