const otpGenerator = require('otp-generator');

function generateOtp() {
    return otpGenerator.generate(6, { 
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
}

module.exports = { generateOtp };