const otpGenerator = require('otp-generator');

function generateOtp() {
    return otpGenerator.generate(6, { 
        upperCase: false, 
        specialChars: false, 
        digits: true 
    });
}

module.exports = generateOtp;