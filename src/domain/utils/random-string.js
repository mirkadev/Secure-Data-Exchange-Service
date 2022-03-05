const { randomBytes } = require('crypto');

const randomString = (size, encode) => {
  return randomBytes(size).toString(encode).slice(0, size);
};

module.exports = { randomString };
