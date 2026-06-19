const mongoose = require('mongoose');
const User = require('./models/User');
const { Habit, StudyGoal, Quest, GrowthActivity, Project } = require('./models/TaskModels');
// Assume GamificationModels exports something if we need it, but let's just use connection.collections

const clearDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ascend');
    
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
    
    console.log('All collections forcefully cleared!');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing collections:', error);
    process.exit(1);
  }
};

clearDB();
