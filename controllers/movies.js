const Movie = require('../models/movie');
const NotFound = require('../errors/NotFoundError'); // 404
const CurrentErr = require('../errors/CurrentError'); // 403
const BadRequest = require('../errors/BadRequestError'); // 400

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err)
        next(new BadRequest('Некорректные данные при запросе'));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
   Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Фильм не найден');
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(
          new CurrentErr(
            'Вы не можете удалить фильм созданный другим пользователем',
          ),
        );
      }
      Movie.deleteOne(movie).then(() => res.send({ message: 'MOVIE_DELETE_MESSAGE' }));



    })
    .catch(next);
};
