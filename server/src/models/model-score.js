const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema(
  {
    scored: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Score', scoreSchema);
