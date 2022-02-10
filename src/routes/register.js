// Rota de recursos register
const express = require('express');
const User = require('../models/users');
const RegisterController = require('../controllers/RegisterController');

const router = express.Router(User);

const registerController = new RegisterController(User);

router.post('/', (req, res) => registerController.create(req, res));

module.exports = router;
