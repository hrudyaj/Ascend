import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText, Flame } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const SystemBootSequence = ({ onComplete, quests }) => {
  const [step, setStep] = useState(0); // 0=Click to start, 1=Welcome, 2=Quests
  const audioRef = useRef(null);
  const { user } = useGame();

  // Epic royalty free track from Pixabay
  const audioUrl = "https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=epic-hollywood-trailer-9413.mp3";

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = 0.5;
  }, []);

  const handleBoot = () => {
    setStep(1);
    audioRef.current.play().catch(() => {});
    
    // Transition to Quests screen after 3 seconds
    setTimeout(() => {
      setStep(2);
    }, 3000);
  };

  const activeQuests = quests.filter(q => !q.isCompleted);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-sans">
      <AnimatePresence mode="wait">
        
        {step === 0 && (
          <motion.button
            key="boot-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBoot}
            data-audio="true"
            className="px-8 py-4 border border-blue-500/50 bg-blue-900/20 text-blue-400 font-mono tracking-widest hover:bg-blue-900/40 hover:border-blue-400 transition-all rounded shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
          >
            [ CLICK TO BOOT SYSTEM ]
          </motion.button>
        )}

        {step === 1 && (
          <motion.div
            key="welcome-text"
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-widest uppercase" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
              Welcome to <span className="text-blue-500">Ascend</span>
            </h1>
            <p className="mt-4 text-blue-300 font-mono tracking-[0.3em] uppercase opacity-70">
              Player Synchronization Complete
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="quests-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl px-6"
          >
            {/* Solo Leveling Style System Window */}
            <div className="relative border-2 border-blue-400/50 bg-blue-950/40 backdrop-blur-md rounded-xl p-8 shadow-[0_0_30px_rgba(59,130,246,0.2)] overflow-hidden">
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"></div>
              
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-3 border-b border-blue-500/30 pb-4"
              >
                <ScrollText className="w-8 h-8 text-blue-400" />
                Your Quests For Today Are...
              </motion.h2>

              <div className="space-y-4 mb-8">
                {activeQuests.length === 0 ? (
                  <div className="text-blue-300 italic font-mono">No active quests found.</div>
                ) : (
                  activeQuests.map((quest, i) => (
                    <motion.div
                      key={quest._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + (i * 0.2) }}
                      className="flex items-center justify-between p-4 bg-blue-900/30 border border-blue-500/20 rounded-lg hover:bg-blue-800/40 transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-lg">{quest.title}</span>
                        {quest.description && <span className="text-blue-300 text-sm mt-1">{quest.description}</span>}
                      </div>
                      <div className="flex items-center gap-1 text-blue-400 font-bold bg-blue-950/50 px-3 py-1 rounded">
                        +{quest.momentumReward} <Flame className="w-4 h-4" />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Stats Block */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="mt-8 pt-6 border-t border-blue-500/30 flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-blue-400 uppercase font-mono tracking-widest">Current Rank</span>
                  <span className="text-xl font-bold text-white uppercase">{user?.currentRank || 'Initiate'}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-blue-400 uppercase font-mono tracking-widest">Level</span>
                  <span className="text-xl font-bold text-white">LVL {user?.currentLevel || 1}</span>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                onClick={() => {
                  // Fade out audio over 2 seconds
                  let vol = audioRef.current.volume;
                  const fadeOut = setInterval(() => {
                    if (vol > 0.05) {
                      vol -= 0.05;
                      audioRef.current.volume = vol;
                    } else {
                      clearInterval(fadeOut);
                      audioRef.current.pause();
                      onComplete();
                    }
                  }, 100);
                }}
                data-audio="true"
                className="w-full mt-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest uppercase rounded shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all"
              >
                Accept Quests & Enter
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
