const mongoose = require('mongoose');

// Base Task Schema (if needed, but distinct schemas are simpler for now)

const HabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  frequency: { type: String, default: 'daily' }, // daily, weekdays, etc.
  momentumReward: { type: Number, default: 5 },
  isCompletedToday: { type: Boolean, default: false },
  lastCompletedDate: { type: Date },
});

const StudyGoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  targetHours: { type: Number, required: true },
  completedHours: { type: Number, default: 0 },
  lastLoggedDate: { type: Date },
});

const QuestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  taskType: { type: String, enum: ['one-time', 'recurring'], default: 'one-time' },
  recurrenceDays: { type: [Number], default: [] }, // 0=Sun, 1=Mon, ..., 6=Sat
  endDate: { type: Date }, // Optional expiry date for recurrence
  deadline: { type: Date }, // For one-time tasks
  momentumReward: { type: Number, default: 25 },
  isCompleted: { type: Boolean, default: false },
  lastCompletedDate: { type: Date },
});

const GrowthActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true }, // GMAT, Personal Project, Reading, etc.
  description: { type: String },
  momentumReward: { type: Number, default: 10 },
  dateCompleted: { type: Date, default: Date.now },
});

const ProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  technologyUsed: { type: [String] },
  hoursSpent: { type: Number, default: 0 },
  status: { type: String, default: 'In Progress' }, // In Progress, Completed
  completedDate: { type: Date },
  momentumReward: { type: Number, default: 50 },
});

module.exports = {
  Habit: mongoose.model('Habit', HabitSchema),
  StudyGoal: mongoose.model('StudyGoal', StudyGoalSchema),
  Quest: mongoose.model('Quest', QuestSchema),
  GrowthActivity: mongoose.model('GrowthActivity', GrowthActivitySchema),
  Project: mongoose.model('Project', ProjectSchema),
};
