import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Trophy, ChevronUp } from 'lucide-react';

export const LevelUpModal = () => {
  const { levelUpData, clearLevelUp } = useGame();
  const audioRef = useRef(null);

  useEffect(() => {
    if (levelUpData) {
      // Epic level up sound effect
      audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_94677712df.mp3?filename=success-1-6297.mp3');
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  }, [levelUpData]);

  if (!levelUpData) return null;

  const { user, rankUp, levelsUntilNextRank, nextRankTitle } = levelUpData;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
        {/* Radiating background beams */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 180 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
        >
          <div className="w-[800px] h-[800px] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(var(--color-primary),1)_360deg)] rounded-full blur-2xl"></div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative glass-panel bg-surface/80 border-primary/50 p-8 md:p-12 text-center max-w-lg w-full flex flex-col items-center shadow-[0_0_100px_rgba(var(--color-primary),0.3)]"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-24 h-24 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(var(--color-primary),0.5)]"
          >
            <ChevronUp className="w-16 h-16 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </motion.div>

          <h2 className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-2">System Notice</h2>
          <h1 className="text-5xl font-black text-white uppercase tracking-wider mb-2 drop-shadow-md">
            Level Up!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            You have reached <span className="font-bold text-white">Level {user.currentLevel}</span>
          </p>

          {rankUp && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-accent/20 border border-accent/50 rounded-lg p-4 mb-8 w-full"
            >
              <h3 className="text-accent font-bold uppercase tracking-widest text-sm mb-1">New Rank Unlocked</h3>
              <p className="text-2xl font-black text-white uppercase">{user.currentRank}</p>
            </motion.div>
          )}

          {!rankUp && nextRankTitle !== 'Max Rank' && (
            <div className="w-full bg-black/40 border border-white/10 rounded-lg p-4 mb-8 flex items-center gap-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div className="text-left">
                <p className="text-white font-bold">{levelsUntilNextRank} more levels</p>
                <p className="text-sm text-gray-400">until you unlock <span className="text-accent uppercase font-bold">{nextRankTitle}</span></p>
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearLevelUp}
            className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-black tracking-widest uppercase rounded shadow-[0_0_20px_rgba(var(--color-primary),0.5)] transition-all"
          >
            Claim Rewards & Continue
          </motion.button>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
