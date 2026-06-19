const User = require('../models/User');

const getRankFromLevel = (level) => {
  if (level < 5) return 'Initiate';     // 1-4
  if (level < 10) return 'Seeker';      // 5-9
  if (level < 15) return 'Vanguard';    // 10-14
  if (level < 25) return 'Ascendant';   // 15-24
  if (level < 50) return 'Paragon';     // 25-49
  return 'Mythic';                      // 50+
};

const getNextRankLevel = (currentLevel) => {
  if (currentLevel < 5) return 5;
  if (currentLevel < 10) return 10;
  if (currentLevel < 15) return 15;
  if (currentLevel < 25) return 25;
  if (currentLevel < 50) return 50;
  return null; // Max rank reached
};

// @desc    Get user profile (since it's single user MVP, we just get or create the first one)
// @route   GET /api/user
// @access  Public
exports.getUserProfile = async (req, res) => {
  try {
    let user = await User.findOne();

    if (!user) {
      user = await User.create({ username: 'HUNTER' });
    }

    // Daily Reset Logic
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastActive = new Date(user.lastActiveDate);
    lastActive.setHours(0, 0, 0, 0);

    if (lastActive < today) {
      // It's a new day! We should handle resetting habits, updating streaks, etc.
      // This will be expanded later or called from a dedicated reset function.
      user.lastActiveDate = new Date();
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Add momentum and update level/rank
// @route   POST /api/user/momentum
// @access  Public
exports.addMomentum = async (req, res) => {
  try {
    const { amount } = req.body;
    let user = await User.findOne();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.momentum += amount;
    
    // Calculate Level (Exponential: 100 * L^2 required)
    // L = floor(sqrt(Momentum / 100)) + 1
    const newLevel = Math.floor(Math.sqrt(user.momentum / 100)) + 1;
    
    let levelUp = false;
    let rankUp = false;

    if (newLevel > user.currentLevel) {
      user.currentLevel = newLevel;
      levelUp = true;
      
      const newRank = getRankFromLevel(newLevel);
      if (newRank !== user.currentRank) {
        user.currentRank = newRank;
        rankUp = true;
      }
    }

    await user.save();

    const targetLevel = getNextRankLevel(user.currentLevel);
    const levelsUntilNextRank = targetLevel ? targetLevel - user.currentLevel : 0;
    const nextRankTitle = targetLevel ? getRankFromLevel(targetLevel) : 'Max Rank';

    res.json({
      user,
      levelUp,
      rankUp,
      levelsUntilNextRank,
      nextRankTitle,
      message: `Earned ${amount} Momentum!`,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
