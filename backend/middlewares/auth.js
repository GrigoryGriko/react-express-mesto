/* eslint-disable consistent-return */
const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  /*if (!req.cookies.jwt) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }*/

  //const token = req.cookies.jwt;
  const { authorization } = req.headers;

  if (!authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.split('Bearer ')[1];
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'pro-letter-crypto');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
