const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  criteria: { type: String },
  unlockedDate: { type: Date, default: Date.now },
  badge: { type: String }, // name of the SVG component or icon
});

const RecoveryQuestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  momentumReward: { type: Number, default: 5 },
  isCompleted: { type: Boolean, default: false },
  generatedDate: { type: Date, default: Date.now },
});

const WeeklyChallengeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  weekStartDate: { type: Date, required: true },
  learningTopic: { type: String, required: true },
  projectToBuild: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  momentumReward: { type: Number, default: 100 },
});

const MomentumLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  source: { type: String, required: true }, // e.g., 'Habit: Workout', 'Quest: Math Homework'
  description: { type: String },
});

module.exports = {
  Achievement: mongoose.model('Achievement', AchievementSchema),
  RecoveryQuest: mongoose.model('RecoveryQuest', RecoveryQuestSchema),
  WeeklyChallenge: mongoose.model('WeeklyChallenge', WeeklyChallengeSchema),
  MomentumLog: mongoose.model('MomentumLog', MomentumLogSchema),
};
