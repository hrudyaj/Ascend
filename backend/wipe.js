const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ascend')
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    console.log('DB ascend Wiped Successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
