const mongoose = require('mongoose');

const clearDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ascend');
    const collections = mongoose.connection.collections;
    
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    
    console.log('All collections cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing collections:', error);
    process.exit(1);
  }
};

clearDB();
