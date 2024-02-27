const jwt = require('jsonwebtoken');
const AuthErr = require('../errors/AuthError');

const { JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { token } = req.cookies;
  let payload;

  //try {
    if (!token) {
      return next( new AuthErr('Необходима авторизация'));
    }
    payload = jwt.verify(token, '62d17d125fed2ecdaa09c2e9a0254d2039ad57ef4725ec5c56a5cfb254e90b1f');
  //} catch (err) {
   // return next(new AuthErr('Необходима авторизация1'));
  //}
  req.user = payload;
  return next();
};