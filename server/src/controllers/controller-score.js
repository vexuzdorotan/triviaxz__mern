const mongoose = require('mongoose');
const uuid = require('uuid');
const validator = require('validator');

const Score = require('../models/model-score');

const createScore = async (req, res, next) => {
  // const {scored, category, comment, player} = req.body

  const score = new Score({
    ...req.body,
  });

  try {
    await score.save();
    res.status(201).send(score);
  } catch (e) {
    res.status(400).send(e);
  }
};

const readScores = async (req, res, next) => {
  try {
    const score = await Score.find();
    res.status(201).send(score);
  } catch (error) {
    res.status(400).send(error);
  }
};

const readScoreById = async (req, res, next) => {};

const readScoreByUserId = async (req, res, next) => {};

const updateScore = async (req, res, next) => {};

const deleteScore = async (req, res, next) => {};

exports.createScore = createScore;
exports.readScores = readScores;
exports.readScoreById = readScoreById;
exports.readScoreByUserId = readScoreByUserId;
exports.updateScore = updateScore;
exports.deleteScore = deleteScore;
