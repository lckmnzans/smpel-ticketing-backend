const jwt = require('jwt-simple');
const secret = 'kunci';

const encoded = (payload) => {
    return jwt.encode(payload, secret);
}

const decoded = (token) => {
    return jwt.decode(token, secret);
}

module.exports = { encoded, decoded };