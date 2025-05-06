const crypto = require('crypto');

module.exports = function generateRandomPassword(length = 10) {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};
