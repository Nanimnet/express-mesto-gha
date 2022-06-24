const jwt = require('jsonwebtoken');

const AuthorizationErr = require('../errors/AuthorizationErr');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationErr('Необходимо авторизоваться'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret');
  } catch (err) {
    next(new AuthorizationErr('Необходимо авторизоваться'));
  }
  req.user = payload;
  return next();
};
