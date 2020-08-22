const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreSchema = new Schema(
  {
    scored: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    player: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Score', scoreSchema);
