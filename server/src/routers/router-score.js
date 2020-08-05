const express = require('express');
const router = express.Router();

const scoreControllers = require('../controllers/controller-score');

router.post('/', scoreControllers.createScore);
router.get('/', scoreControllers.readScores);

module.exports = router;
