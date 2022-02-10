// Index é responsável por carregar todas rotas da aplicação.
const express = require('express');

const registerRoute = require('./register');
const loginController = require('./login');
const userPageController = require('./userPage');

const router = express.Router();

router.use('/register', registerRoute);
router.use('/login', loginController);
router.use('/user-page', userPageController);

router.get('/', (req, res) => {
  res.send({
    firstServer: 'Only for test',
    Status: 'OK!',
  });
});

module.exports = router;
