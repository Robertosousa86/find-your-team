// Rota de recursos users
const express = require('express');
const User = require('../models/users');
const UserController = require('../controllers/userController');

const router = express.Router(User);

const userController = new UserController(User);

router.post('/', (req, res) => userController.create(req, res));
router.get('/', (req, res) => userController.get(req, res));
router.get('/:id', (req, res) => userController.getById(req, res));

module.exports = router;
