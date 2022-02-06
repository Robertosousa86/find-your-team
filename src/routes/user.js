// Rota de recursos users
const express = require('express');
const User = require('../models/users');
const UserController = require('../controllers/authUserController');

const router = express.Router(User);

const userController = new UserController(User);

router.post('/', (req, res) => userController.create(req, res));

module.exports = router;
