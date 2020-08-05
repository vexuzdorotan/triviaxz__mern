const express = require('express');
const router = express.Router();

const scoreControllers = require('../controllers/controller-score');

router.post('/', scoreControllers.createScore);
router.get('/', scoreControllers.readScores);
router.get('/record/:uid', scoreControllers.readScoresByUser);
router.patch('/:sid', scoreControllers.updateScore);
router.delete('/:sid', scoreControllers.deleteScore);

module.exports = router;
