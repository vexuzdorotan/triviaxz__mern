const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const usersController = require('../controllers/controller-user');
const fileUpload = require('../middleware/file-upload');

router.post('/login', usersController.loginUser);
router.post('/logout', auth, usersController.logoutUser);

router
  .route('/')
  .get(usersController.readUsers)
  .post(fileUpload.single('image'), usersController.createUser);

module.exports = router;
