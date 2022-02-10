// rota de recursos login
const express = require('express');
const LoginController = require('../controllers/LoginController');
const User = require('../models/users');

const router = express.Router(User);

const loginController = new LoginController(User);

router.post('/', (req, res) => loginController.login(req, res));

module.exports = router;
