const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const scoreControllers = require('../controllers/controller-score');

router.get('/', scoreControllers.readScores);
router.get('/record/:uid', scoreControllers.readScoresByUser);

router.use(auth);

router.post('/', scoreControllers.createScore);
router.patch('/:sid', scoreControllers.updateScore);
router.delete('/:sid', scoreControllers.deleteScore);

module.exports = router;
