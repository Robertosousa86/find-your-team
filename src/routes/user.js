// Rota de recursos users
const express = require('express');
const User = require('../models/users');
const AuthUserController = require('../controllers/authUserController');

const router = express.Router(User);

const authUserController = new AuthUserController(User);

router.post('/', (req, res) => authUserController.create(req, res));

module.exports = router;
