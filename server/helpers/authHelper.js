const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const authHelper = {
  buildToken: (user) => {
    return jwt.sign({
      ...user
    }, config.jwtSecret, {
      expiresIn: '24h'
    });
  }
};

module.exports = authHelper;
