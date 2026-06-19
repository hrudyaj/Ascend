const mongoose = require('mongoose');
const User = require('./models/User');
const Habit = require('./models/Habit');
const StudyGoal = require('./models/StudyGoal');
const Quest = require('./models/Quest');

const clearDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ascend');
    
    await User.deleteMany({});
    await Habit.deleteMany({});
    await StudyGoal.deleteMany({});
    await Quest.deleteMany({});
    
    console.log('All collections cleared successfully with explicit models!');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing collections:', error);
    process.exit(1);
  }
};

clearDB();
