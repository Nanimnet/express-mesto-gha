const jwt = require('jsonwebtoken');

const AuthorizationErr = require('../errors/AuthorizationErr');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthorizationErr('Необходимо авторизоваться'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new AuthorizationErr('Необходимо авторизоваться'));
    return;
  }
  req.user = payload;
  next();
};
