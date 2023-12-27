const mongoose = require('mongoose');
const urlValidation = require('../validation/urlValidation');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    minlength: 1,
    required: true,
  },

  nameEN: {
    type: String,
    minlength: 1,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        urlValidation.test(value);
      },
      message: 'Некорректный URL к постеру',
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        urlValidation.test(value);
      },
      message: 'Некорректный URL к трейлеру',
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        urlValidation.test(value);
      },
      message: 'Некорректный URL к миниатюре постера',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);
