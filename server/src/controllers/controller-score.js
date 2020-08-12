const mongoose = require('mongoose');
const uuid = require('uuid');
const validator = require('validator');

const User = require('../models/model-user');
const Score = require('../models/model-score');

const createScore = async (req, res, next) => {
  try {
    const { scored, category, note, player } = req.body;
    const user = await User.findById(player, '_id name image');

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
  try {
    const score = await Score.find();
    res.status(200).send(score);
  } catch (error) {
    res.status(400).send(error);
  }
};

const readScoresByUser = async (req, res, next) => {
  try {
    const scores = await Score.find({ player: req.params.uid });

    if (!scores || scores.length === 0) {
      return res.status(404).send({ error: 'No records found.' });
    }

    res.status(200).send(scores);
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
