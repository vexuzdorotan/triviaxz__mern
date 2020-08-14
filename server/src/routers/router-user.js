const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const usersController = require('../controllers/controller-user');
const fileUpload = require('../middleware/file-upload');

router.post('/login', usersController.loginUser);
router.post('/logout', auth, usersController.logoutUser);
router.post('/', fileUpload.single('image'), usersController.createUser);
router.get('/', usersController.readUsers);

module.exports = router;
