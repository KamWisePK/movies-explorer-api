const router = require('express').Router();
const {
  getMe,
  changeUserData,
} = require('../controllers/users');
const { validateChangeUserData } = require('../validation/userValidation');
const auth = require('../middlewares/auth');

router.use(auth);
router.get('/me', getMe);
router.patch('/me', validateChangeUserData, changeUserData);

module.exports = router;
