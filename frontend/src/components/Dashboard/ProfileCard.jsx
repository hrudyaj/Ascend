import React from 'react';
import { useGame } from '../../context/GameContext';
import { GlassCard } from '../UI/GlassCard';
import { ProgressBar } from '../UI/ProgressBar';
import { 
  InitiateEmblem, 
  SeekerEmblem, 
  VanguardEmblem, 
  AscendantEmblem, 
  ParagonEmblem, 
  MythicEmblem 
} from '../SVGIcons/RankEmblems';
import { Flame, LayoutGrid } from 'lucide-react';

const getRankEmblem = (rank) => {
  switch (rank) {
    case 'Initiate': return <InitiateEmblem className="w-16 h-16 text-rank-initiate" />;
    case 'Seeker': return <SeekerEmblem className="w-16 h-16 text-rank-seeker" />;
    case 'Vanguard': return <VanguardEmblem className="w-16 h-16 text-rank-vanguard" />;
    case 'Ascendant': return <AscendantEmblem className="w-16 h-16 text-rank-ascendant" />;
    case 'Paragon': return <ParagonEmblem className="w-16 h-16 text-rank-paragon" />;
    case 'Mythic': return <MythicEmblem className="w-16 h-16 text-rank-mythic" />;
    default: return <InitiateEmblem className="w-16 h-16 text-rank-initiate" />;
  }
};

export const ProfileCard = ({ onOpenPath }) => {
  const { user, loading } = useGame();

  if (loading || !user) return <GlassCard className="h-24 animate-pulse" />;

  const currentLevelMomentum = 100 * Math.pow(user.currentLevel - 1, 2);
  const nextLevelMomentum = 100 * Math.pow(user.currentLevel, 2);
  
  const momentumInCurrentLevel = user.momentum - currentLevelMomentum;
  const momentumNeededForNextLevel = nextLevelMomentum - currentLevelMomentum;

  return (
    <GlassCard className="relative overflow-hidden p-6 flex flex-col md:flex-row items-center gap-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-white/10 hover:border-accent/40 transition-colors">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent/5 to-transparent pointer-events-none"></div>

      {/* Left Section: User Identity */}
      <div className="flex items-center gap-6 shrink-0 z-10">
        <button 
          onClick={onOpenPath}
          data-audio="true"
          className="shrink-0 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 hover:drop-shadow-[0_0_30px_rgba(var(--color-primary),0.8)] transition-all cursor-pointer"
        >
          {getRankEmblem(user.currentRank)}
        </button>

        <div className="flex flex-col">
          <button 
            onClick={onOpenPath}
            data-audio="true"
            className="text-left hover:opacity-80 transition-opacity"
          >
            <h2 className="text-3xl font-black uppercase tracking-widest leading-none drop-shadow-md" style={{ color: 'rgb(var(--color-primary))' }}>
              THE {user.currentRank} CLASS
            </h2>
            <p className="text-sm text-gray-400 font-semibold mt-2 tracking-widest">
              LEVEL {user.currentLevel}
            </p>
          </button>
        </div>
      </div>

      {/* Center Section: Massive Progress Bar */}
      <div className="flex-1 w-full z-10 flex flex-col justify-center">
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-mono tracking-widest">MISSION PROGRESS</span>
          </div>
          <span className="text-xs text-accent font-mono font-bold tracking-widest">{user.momentum} / {nextLevelMomentum}</span>
        </div>
        <ProgressBar 
          progress={momentumInCurrentLevel} 
          max={momentumNeededForNextLevel} 
          colorClass="bg-accent shadow-[0_0_15px_rgba(var(--color-accent),0.6)]" 
          heightClass="h-3"
        />
      </div>

      {/* Right Section: Streak & Actions */}
      <div className="flex items-center gap-6 shrink-0 z-10">
        <div className="flex flex-col items-center justify-center px-6 py-3 rounded-xl bg-black/40 border border-orange-500/20 shadow-[inset_0_0_20px_rgba(249,115,22,0.05)]">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
            <span className="text-2xl font-black text-orange-500 leading-none">{user.currentStreak}</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-orange-500/70 mt-1 font-bold">Day Streak</span>
        </div>

        <button 
          onClick={onOpenPath}
          data-audio="true"
          className="flex flex-col items-center justify-center px-4 py-3 rounded-xl bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/50 transition-all group"
        >
          <LayoutGrid className="w-5 h-5 text-accent group-hover:scale-110 transition-transform mb-1" />
          <span className="text-[10px] uppercase tracking-widest text-accent font-bold text-center">Ascension<br/>Route</span>
        </button>
      </div>
    </GlassCard>
  );
};
