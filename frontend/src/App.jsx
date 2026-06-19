import { API_URL } from './config/api';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GameProvider, useGame } from './context/GameContext';
import { ProfileCard } from './components/Dashboard/ProfileCard';
import { DailyProgress } from './components/Dashboard/DailyProgress';
import { StudyGoalTracker } from './components/Tasks/StudyGoalTracker';
import { QuestBoard } from './components/Tasks/QuestBoard';
import { GrowthActivityLogger } from './components/Tasks/GrowthActivityLogger';
import { SystemBootSequence } from './components/Intro/SystemBootSequence';
import { CreateTaskModal } from './components/Tasks/CreateTaskModal';
import { LevelUpModal } from './components/UI/LevelUpModal';
import { ProgressionPathModal } from './components/UI/ProgressionPathModal';
import { AnalyticsModal } from './components/Dashboard/AnalyticsChart';
import { AnimatePresence, motion } from 'framer-motion';
import { Zap, PlusCircle, Hexagon, Crosshair, Radar, Database, Activity } from 'lucide-react';

const NotificationToast = () => {
  const { notification } = useGame();
  
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-6 right-6 z-50 glass-panel border-primary/50 shadow-[0_0_30px_rgba(var(--color-primary),0.3)] px-6 py-4 flex items-center gap-4"
        >
          <div className="bg-primary/20 p-2 rounded-full">
            <Zap className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider">{notification.message}</h4>
            <p className="text-xs text-primary font-mono">{notification.type}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CommandHubLayout = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [quests, setQuests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUplinkOpen, setIsUplinkOpen] = useState(false);
  const [isPathOpen, setIsPathOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const { user, playSound } = useGame();
  
  // Global click sound effect
  useEffect(() => {
    const playClickSound = (e) => {
      // Find closest element with 'data-audio="true"'
      const target = e.target.closest('[data-audio="true"]');
      if (target) {
        playSound('click');
      }
    };

    document.addEventListener('click', playClickSound);
    return () => document.removeEventListener('click', playClickSound);
  }, [playSound]);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const res = await axios.get(`${API_URL}/quests`);
        setQuests(res.data);
      } catch (err) {
        console.error("Failed to fetch quests", err);
      }
    };
    fetchQuests();
  }, []);

  const rankThemeClass = `theme-${user?.currentRank?.toLowerCase() || 'initiate'}`;

  // Apply theme globally to body so background colors inherit correctly
  useEffect(() => {
    document.body.className = `${rankThemeClass} bg-background text-white font-sans overflow-x-hidden transition-colors duration-1000`;
  }, [rankThemeClass]);

  return (
    <div className={`min-h-screen bg-background text-white selection:bg-primary/30 transition-colors duration-1000 ${rankThemeClass}`}>
      {isBooting ? (
        <SystemBootSequence 
          quests={quests} 
          onComplete={() => setIsBooting(false)} 
        />
      ) : (
        <div className="relative p-6 md:p-8 xl:p-12 min-h-screen flex flex-col overflow-y-auto">
          {/* Gamified background overlays */}
          <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-screen animate-space-drift"></div>
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--color-primary),0.1)_0%,transparent_60%)] pointer-events-none"></div>
          {/* Subtle Nebula Fog */}
          <div className="fixed -inset-[100%] bg-[radial-gradient(circle_at_center,rgba(var(--color-accent),0.03)_0%,transparent_50%)] animate-[spin_200s_linear_infinite] pointer-events-none blur-3xl"></div>
          <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)]"></div>
          <div className="fixed bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>

          <NotificationToast />
          <LevelUpModal />
          
          <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end relative z-10 gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 border-2 border-primary/40 rounded-xl bg-primary/10 shadow-[0_0_20px_rgba(var(--color-primary),0.2)]">
                <Hexagon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase" style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                  COMMAND <span className="text-primary">HUB</span>
                </h1>
                <p className="text-gray-400 font-mono text-sm mt-1 tracking-widest uppercase">SYSTEM STATUS: <span className="text-accent font-bold">ONLINE</span></p>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsAnalyticsOpen(true)}
                data-audio="true"
                className="px-6 py-3 bg-surface hover:bg-white/10 border border-white/20 hover:border-accent text-white font-bold tracking-widest uppercase rounded shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all flex items-center gap-2"
              >
                <Activity className="w-5 h-5 text-accent" />
                MISSION ANALYTICS
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                data-audio="true"
                className="px-6 py-3 bg-primary/20 hover:bg-primary border border-primary text-white font-bold tracking-widest uppercase rounded shadow-[0_0_15px_rgba(var(--color-primary),0.3)] transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                CREATE OVERRIDE
              </button>
            </div>
          </header>

          <div className="mb-8 relative z-10">
            <ProfileCard onOpenPath={() => setIsPathOpen(true)} />
          </div>

          <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-10">
            {/* Left Panel: Stats & Overview */}
            <div className="xl:col-span-3 flex flex-col gap-6">
              <DailyProgress />
            </div>
            
            {/* Center Panel: Active Mission Board (Quests) */}
            <div className="xl:col-span-6 flex flex-col">
              <div className="glass-panel p-6 border-primary/30 flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Radar className="w-32 h-32 animate-[spin_10s_linear_infinite]" />
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold uppercase tracking-widest flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                    <Crosshair className="text-accent" /> Active Missions
                  </h2>
                  <QuestBoard quests={quests} setQuests={setQuests} />
                </div>
              </div>
            </div>

            {/* Right Panel: Growth & Training */}
            <div className="xl:col-span-3 flex flex-col gap-6">
              <StudyGoalTracker />
              <button
                onClick={() => setIsUplinkOpen(true)}
                data-audio="true"
                className="relative overflow-hidden w-full p-6 rounded-2xl bg-black/60 border border-purple-500/30 hover:border-purple-500/80 transition-all group flex flex-col items-center justify-center gap-3 shadow-[0_0_30px_rgba(139,92,246,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              >
                <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Database className="w-8 h-8 text-purple-500 group-hover:animate-pulse" />
                <span className="font-mono tracking-widest uppercase text-sm font-bold text-purple-400">Initiate Uplink</span>
              </button>
            </div>
          </main>
          
          <CreateTaskModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onTaskCreated={(newQuest) => setQuests([...quests, newQuest])} 
          />

          <GrowthActivityLogger 
            isOpen={isUplinkOpen}
            onClose={() => setIsUplinkOpen(false)}
          />

          <ProgressionPathModal 
            isOpen={isPathOpen} 
            onClose={() => setIsPathOpen(false)} 
          />

          <AnalyticsModal
            isOpen={isAnalyticsOpen}
            onClose={() => setIsAnalyticsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <CommandHubLayout />
    </GameProvider>
  );
}

export default App;
