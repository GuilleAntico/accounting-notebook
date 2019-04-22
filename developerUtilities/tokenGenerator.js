const jwt = require('jsonwebtoken');
const config = require('config');

const jwtSecret = config.get('jwtSecret');

const generateToken = data => {
    const token = {
        first_name: data.first_name,
        last_name: data.last_name,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60), // 60 days
        email: data.email,
    }
    return jwt.sign(token, jwtSecret);
}


module.exports = {
    generateToken
}