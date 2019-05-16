const jwt = require('jsonwebtoken');

exports.signToken = (id, expiration = []) => {
  return jwt.sign(
    {
      id,
      exp:
        Math.floor(Date.now() / 1000) +
        60 * 60 * expiration.reduce((a, b) => a * b, 1),
    },
    process.env.APP_SECRET,
  );
};
