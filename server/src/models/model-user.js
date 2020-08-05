const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid.');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  scores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Score',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
