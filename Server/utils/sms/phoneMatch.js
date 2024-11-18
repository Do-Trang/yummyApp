const phoneRegex = (str) => {
    return /^0[0-9]{9}$/.test(str);
};

module.exports = { phoneRegex };