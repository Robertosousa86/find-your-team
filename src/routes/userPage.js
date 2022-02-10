// Rota de recursos userPage
const express = require('express');
const UserPageController = require('../controllers/UserPageController');
const Champion = require('../models/champions');
const authorization = require('../middleware/authorization');

const router = express.Router(Champion);

router.use(authorization);

const userPageController = new UserPageController(Champion);

router.post('/', (req, res) => userPageController.create(req, res));
router.get('/', (req, res) => userPageController.get(req, res));
router.get('/:id', (req, res) => userPageController.getById(req, res));
router.put('/:id', (req, res) => userPageController.update(req, res));
router.delete('/:id', (req, res) => userPageController.remove(req, res));

module.exports = router;
