const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateMovieCreation,
  validateMovieDeletion,
} = require('../validation/movieValidation');
const auth = require('../middlewares/auth');

router.use(auth);
router.get('/', getMovies);
router.post('/', validateMovieCreation, createMovie);
router.delete('/:movieId', validateMovieDeletion, deleteMovie);

module.exports = router;
