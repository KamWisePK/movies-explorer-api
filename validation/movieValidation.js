const { Joi, celebrate } = require('celebrate');
const { urlValidation } = require('./urlValidation');

module.exports.validateMovieCreation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlValidation),
    trailerLink: Joi.string().required().pattern(urlValidation),
    thumbnail: Joi.string().required().pattern(urlValidation),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateMovieDeletion = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});
