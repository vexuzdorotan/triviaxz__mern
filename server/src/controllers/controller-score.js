const mongoose = require('mongoose');
const uuid = require('uuid');
const validator = require('validator');

const User = require('../models/model-user');
const Score = require('../models/model-score');

const createScore = async (req, res, next) => {
  const { scored, category, comment, player } = req.body;
  const score = new Score({
    scored,
    category,
    comment,
    player,
  });

  let user;
  try {
    user = await User.findById(player);
  } catch (error) {
    res.status(500).send();
  }

  if (!user) {
    return res.status(404).send();
  }

  try {
    await score.save();
    res.status(201).send(score);
  } catch (error) {
    res.status(400).send(error);
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
  const uid = req.params.uid;

  let scores;
  try {
    scores = await User.findById(uid).populate('scores');
  } catch (error) {
    res.status(404).send(error);
  }

  res.status(200).send(scores);
};

const updateScore = async (req, res, next) => {};

const deleteScore = async (req, res, next) => {};

exports.createScore = createScore;
exports.readScores = readScores;
exports.readScoresByUser = readScoresByUser;
exports.updateScore = updateScore;
exports.deleteScore = deleteScore;
