const express = require('express');
const router = express.Router();

const usersController = require('../controllers/controller-user');

router.post('/login', usersController.loginUser);
router.post('/', usersController.createUser);
router.get('/', usersController.readUsers);

module.exports = router;
