const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');

// User & Momentum Routes
router.get('/user', userController.getUserProfile);
router.post('/user/momentum', userController.addMomentum);

// Task Routes (Habits)
router.get('/habits', taskController.getHabits);
router.post('/habits', taskController.createHabit);
router.put('/habits/:id/complete', taskController.completeHabit);

// Task Routes (Study Goals)
router.get('/studygoals', taskController.getStudyGoals);
router.post('/studygoals', taskController.createStudyGoal);

// Task Routes (Quests)
router.get('/quests', taskController.getQuests);
router.post('/quests', taskController.createQuest);
router.put('/quests/:id/complete', taskController.completeQuest);

module.exports = router;
