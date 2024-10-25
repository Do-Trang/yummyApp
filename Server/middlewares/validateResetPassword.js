const { isValidPassword } = require('../utils/password.js');

async function resetPasswordValidator(req, res, next) {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Password is required and cannot be empty.'
        });
    }

    if (!isValidPassword(newPassword)) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        });
    }

    next();

}

module.exports = resetPasswordValidator;
