const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: 'PlayerOne',
  },
  momentum: {
    type: Number,
    default: 0,
  },
  currentLevel: {
    type: Number,
    default: 1,
  },
  currentRank: {
    type: String,
    default: 'Initiate',
  },
  currentStreak: {
    type: Number,
    default: 0,
  },
  bestStreak: {
    type: Number,
    default: 0,
  },
  lastActiveDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
