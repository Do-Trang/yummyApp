const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt)

const generateAccessToken = async (payload) => {
    try {
        const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
        const tokenLife = process.env.ACCESS_TOKEN_LIFE;

        const token = await sign(payload, secretKey, {
            algorithm: 'HS256',
            expiresIn: tokenLife,
        });

        return token;
    } catch (error) {
        console.error('Error generating access token:', error);
        return null;
    }
};

const generateRefreshToken = async () => {
    try {
        const secretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
        const tokenLife = process.env.REFRESH_TOKEN_LIFE;

        const randomData = Math.random().toString() + Date.now();
        const token = await sign({ data: randomData }, secretKey, {
            algorithm: 'HS256',
            expiresIn: tokenLife,
        });

        return token;
    } catch (error) {
        console.error('Error generating refresh token:', error);
        return null;
    }
};

const verifyToken = async (token) => {
    try {
        const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
        const decoded = verify(token, secretKey);
        return decoded;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}

module.exports = { generateAccessToken, generateRefreshToken, verifyToken};
