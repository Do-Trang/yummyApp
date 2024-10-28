function isValidPassword(password) {
    if (password.length < 8) {
        return false;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
}

module.exports = { isValidPassword };
