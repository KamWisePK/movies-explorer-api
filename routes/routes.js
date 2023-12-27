const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const { validateRegister, validateLogin } = require('../validation/userValidation');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

router.post('/signup', validateRegister, createUser);
router.post('/signin', validateLogin, login);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use(auth);

router.use('/signout', logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Ошибка 404. Указанный маршрут не существует'));
});

module.exports = router;
