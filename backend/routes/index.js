const router = require('express').Router();
const cookieParser = require('cookie-parser');

const usersRouter = require('./usersRouter');
const cardsRouter = require('./cardsRouter');
const auth = require('../middlewares/auth');
const {
  validateUserLogin,
  validateUserRegister,
} = require('../middlewares/validation');
const {
  login,
  createUser,
} = require('../controllers/usersController');

router.use(cookieParser());
router.post('/signin', validateUserLogin, login);
router.post('/signup', validateUserRegister, createUser);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

module.exports = router;
