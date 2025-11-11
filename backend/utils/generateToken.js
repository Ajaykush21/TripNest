const jwt = require('jsonwebtoken');
const getJwtSecret = require('./jwtSecret');

const generateToken = (payload, expiresIn = '7d') => {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, { expiresIn });
};

module.exports = generateToken;

