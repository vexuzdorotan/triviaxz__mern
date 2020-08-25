const User = require('../models/model-user');
const Score = require('../models/model-score');

const createScore = async (req, res, next) => {
  try {
    const { scored, category, note } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const score = new Score({
      scored,
      category,
      note,
    });
    score.player = user;
    await score.save();
    res.status(201).send(score);
  } catch (error) {
    res.status(500).send(error);
  }
};

const readScores = async (req, res, next) => {
  // sortBy=createdAt:desc
  // createdAt : -1
  const sort = {};

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');

    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    // const score = await Score.find().sort(sort);
    await Score.find()
      .sort(sort)
      // .populate('player', 'name image')
      .populate({
        path: 'player',
        select: 'name image',
      })
      .exec((err, score) => {
        if (err) throw new Error(err);
        res.status(200).send(score);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

const readScoresByUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.uid, 'name');
    await Score.find({ player: req.params.uid })
      .sort({ createdAt: -1 })
      .populate('player', 'name image')
      .exec((err, score) => {
        if (err) throw new Error(err);
        if (!score || score.length === 0) {
          return res
            .status(404)
            .send({ error: 'No records found.', name: user.name });
        }

        res.status(200).send(score);
      });
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateScore = async (req, res, next) => {
  const requiredKeys = ['note'];
  const isMatchedKeys = Object.keys(req.body).every((key) =>
    requiredKeys.includes(key)
  );

  if (!isMatchedKeys) return res.status(400).send({ error: 'Unknown keys.' });

  try {
    const score = await Score.findByIdAndUpdate(req.params.sid, req.body, {
      new: true,
    });

    if (!score) return res.status(404).send();

    res.send(score);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteScore = async (req, res, next) => {
  try {
    const score = await Score.findByIdAndRemove(req.params.sid);

    if (!score) return res.status(404).send();

    res.send(score);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.createScore = createScore;
exports.readScores = readScores;
exports.readScoresByUser = readScoresByUser;
exports.updateScore = updateScore;
exports.deleteScore = deleteScore;
