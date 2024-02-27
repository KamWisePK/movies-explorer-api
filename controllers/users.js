const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequest = require('../errors/BadRequestError');
const NotFound = require('../errors/NotFoundError');
const EmailUsed = require('../errors/EmailUsedError');
const User = require('../models/user');
const { JWT_SECRET, NODE_ENV } = require('../constants/config');

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => next(err));
};

module.exports.changeUserData = (req, res, next) => {
  const { name, email } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(BadRequest('Переданы некорректные данные при обновлении профиля.'));
      } else if (err.code === 11000) {
        next(new EmailUsed('Email занят другим пользвоателем'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => {
      const createdUser = user.toObject();
      delete createdUser.password;
      res.send(createdUser);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new EmailUsed('Email занят другим пользвоателем'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('token', token, {
        maxAge: 604800,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
        .send({ message: 'Вход выполнен' });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('token')
    .send({ message: 'Вы успешно вышли из учетной записи' });
};
