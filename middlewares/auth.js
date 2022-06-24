const jwt = require('jsonwebtoken');

const AuthorizationErr = require('../errors/AuthorizationErr');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    next(new AuthorizationErr('Необходимо авторизоваться'));
  } else {
    let payload;
    try {
      payload = jwt.verify(token, 'some-secret-key');
    } catch (err) {
      next(new AuthorizationErr('Необходимо авторизоваться'));
    }
    req.user = payload;
    next();
  }
};
