const express = require('express');
const UserPageController = require('../controllers/UserPageController');
const User = require('../models/users');
const authorization = require('../middleware/authorization');

const router = express.Router(User);

router.use(authorization);

const userPageController = new UserPageController(User);

router.get('/', (req, res) => userPageController.getOk(req, res));

module.exports = router;
