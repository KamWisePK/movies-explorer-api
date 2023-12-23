const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthErr = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new AuthErr('Неправильные почта или пароль');
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new AuthErr('Неправильные почта или пароль');
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
