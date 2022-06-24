const jwt = require('jsonwebtoken');

const AuthorizationErr = require('../errors/AuthorizationErr');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationErr('Необходимо авторизоваться'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new AuthorizationErr('Необходимо авторизоваться'));
  }
  req.user = payload;
  next();
};
