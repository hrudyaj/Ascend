const { Habit, StudyGoal, Quest, GrowthActivity, Project } = require('../models/TaskModels');
const User = require('../models/User');

// --- HABITS ---
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createHabit = async (req, res) => {
  try {
    const habit = await Habit.create(req.body);
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.completeHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const habit = await Habit.findById(id);
    
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    if (habit.isCompletedToday) return res.status(400).json({ message: 'Already completed today' });

    habit.isCompletedToday = true;
    habit.lastCompletedDate = new Date();
    await habit.save();

    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- QUESTS (Advanced Recurring & One-Time) ---
exports.getQuests = async (req, res) => {
  try {
    const allQuests = await Quest.find();
    const today = new Date();
    const currentDay = today.getDay(); // 0-6
    
    // Normalize today to start of day for comparisons
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const activeQuests = [];

    for (let quest of allQuests) {
      let isActiveToday = false;

      if (quest.taskType === 'recurring') {
        // Check if today is an active day
        const isDayActive = quest.recurrenceDays.includes(currentDay);
        
        // Check expiry
        const isNotExpired = !quest.endDate || (startOfToday <= quest.endDate);

        if (isDayActive && isNotExpired) {
          isActiveToday = true;
          
          // Reset logic: if it was completed on a previous day, reset it
          if (quest.isCompleted && quest.lastCompletedDate) {
            const lastCompletedStartOfDay = new Date(quest.lastCompletedDate.getFullYear(), quest.lastCompletedDate.getMonth(), quest.lastCompletedDate.getDate());
            if (lastCompletedStartOfDay < startOfToday) {
              quest.isCompleted = false;
              await quest.save();
            }
          }
        }
      } else {
        // One time quests are active if they are not completed yet
        if (!quest.isCompleted) {
          isActiveToday = true;
        } else if (quest.lastCompletedDate) {
          // If completed, keep them on the board until the day resets
          const lastCompletedStartOfDay = new Date(quest.lastCompletedDate.getFullYear(), quest.lastCompletedDate.getMonth(), quest.lastCompletedDate.getDate());
          if (lastCompletedStartOfDay >= startOfToday) {
            isActiveToday = true;
          }
        }
      }

      if (isActiveToday) {
        activeQuests.push(quest);
      }
    }

    res.json(activeQuests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createQuest = async (req, res) => {
  try {
    const quest = await Quest.create(req.body);
    res.status(201).json(quest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.completeQuest = async (req, res) => {
  try {
    const { id } = req.params;
    const quest = await Quest.findById(id);
    
    if (!quest) return res.status(404).json({ message: 'Quest not found' });
    if (quest.isCompleted) return res.status(400).json({ message: 'Already completed' });

    quest.isCompleted = true;
    quest.lastCompletedDate = new Date();
    await quest.save();

    res.json(quest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- STUDY GOALS ---
exports.getStudyGoals = async (req, res) => {
  try {
    const goals = await StudyGoal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStudyGoal = async (req, res) => {
  try {
    const goal = await StudyGoal.create(req.body);
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
