import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Navigation2, Sparkles, Target } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { 
  InitiateEmblem, 
  SeekerEmblem, 
  VanguardEmblem, 
  AscendantEmblem, 
  ParagonEmblem, 
  MythicEmblem 
} from '../SVGIcons/RankEmblems';

const SECTORS = [
  { name: 'Initiate', req: 1, region: 'Earth Orbit', emblem: InitiateEmblem },
  { name: 'Seeker', req: 5, region: 'Lunar Sector', emblem: SeekerEmblem },
  { name: 'Vanguard', req: 10, region: 'Frontier Zone', emblem: VanguardEmblem },
  { name: 'Ascendant', req: 15, region: 'Outer Rim', emblem: AscendantEmblem },
  { name: 'Paragon', req: 25, region: 'Deep Space', emblem: ParagonEmblem },
  { name: 'Mythic', req: 50, region: 'Command Nexus', emblem: MythicEmblem },
];

export const ProgressionPathModal = ({ isOpen, onClose }) => {
  const { user } = useGame();
  const currentLevel = user?.currentLevel || 1;
  const currentRank = user?.currentRank || 'Initiate';
  const scrollRef = useRef(null);
  const beaconRef = useRef(null);

  const isMythicComplete = currentLevel >= 50;

  useEffect(() => {
    if (isOpen && beaconRef.current && scrollRef.current) {
      setTimeout(() => {
        beaconRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl h-[95vh] bg-black/80 border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-gray-400 hover:text-white bg-white/5 p-3 rounded-full transition-all hover:bg-white/10 hover:rotate-90"
        >
          <X className="w-6 h-6" />
        </button>

        {/* HUD Header */}
        <div className={`p-8 border-b border-white/5 bg-black/80 z-30 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center transition-all ${isMythicComplete ? 'shadow-[0_10px_50px_rgba(255,255,255,0.1)]' : ''}`}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-screen pointer-events-none"></div>
          
          {isMythicComplete ? (
            <>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-[0.3em] text-center flex items-center justify-center gap-4 relative z-10 drop-shadow-[0_0_20px_white]">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
                GALACTIC ASCENSION COMPLETE
              </h2>
              <div className="mt-4 flex flex-col items-center relative z-10">
                <span className="text-gray-400 font-mono tracking-widest text-xs uppercase mb-1">Current Rank</span>
                <span className="text-white font-black tracking-widest text-xl uppercase drop-shadow-[0_0_10px_white]">MYTHIC CLASS</span>
                <span className="text-accent font-mono tracking-widest text-[10px] uppercase mt-1">Final Goal Reached</span>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-[0.3em] text-center flex items-center justify-center gap-4 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                <Navigation2 className="w-8 h-8 text-primary" />
                ASCENSION ROUTE
              </h2>
              <p className="text-center text-gray-400 font-mono mt-3 tracking-widest text-sm relative z-10">
                SYSTEM NAV: <span className="text-primary font-bold drop-shadow-[0_0_10px_rgba(var(--color-primary),0.5)]">LEVEL {currentLevel}</span>
              </p>
            </>
          )}
        </div>

        {/* Scrollable Map */}
        <div ref={scrollRef} className="flex-1 w-full overflow-y-auto custom-scrollbar relative bg-[#050508]">
          
          {/* Deep Space Background Effects (95% Interface, 5% Atmosphere) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden h-[200%]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-screen animate-space-drift"></div>
            {/* Subtle Nebula Clouds */}
            <div className="fixed top-1/4 left-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(var(--color-primary),0.03)_0%,transparent_70%)] blur-[120px]"></div>
            <div className="fixed bottom-1/3 right-1/4 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(var(--color-accent),0.02)_0%,transparent_70%)] blur-[150px]"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle,rgba(255,255,255,0.01)_0%,transparent_60%)] blur-[100px]"></div>
          </div>

          <div className="relative z-20 w-full max-w-4xl mx-auto py-32 flex flex-col-reverse items-center justify-center gap-4">
            
            {SECTORS.map((sector, index) => {
              const isUnlocked = currentLevel >= sector.req;
              const nextSector = SECTORS[index + 1];
              const isCurrentSector = currentLevel >= sector.req && (nextSector ? currentLevel < nextSector.req : true);
              const isUserAtThisExactMilestone = currentLevel === sector.req;
              
              let progressPercent = 0;
              if (isUnlocked) {
                if (!nextSector || currentLevel >= nextSector.req) {
                  progressPercent = 100;
                } else if (isCurrentSector) {
                  progressPercent = ((currentLevel - sector.req) / (nextSector.req - sector.req)) * 100;
                }
              }

              const Emblem = sector.emblem;
              const rankColor = `var(--color-rank-${sector.name.toLowerCase()})`;

              return (
                <div key={sector.name} className="relative w-full flex flex-col-reverse items-center">
                  
                  {/* The Sector Gateway (Node) */}
                  <div className={`relative flex items-center justify-center w-full group transition-all duration-700 ${isUnlocked ? 'opacity-100' : 'opacity-30 grayscale'}`}>
                    
                    {/* Node Visual */}
                    <div className="relative z-20 flex flex-col items-center cursor-pointer">
                      
                      {/* Mythic Energy Rings */}
                      {sector.name === 'Mythic' && isMythicComplete && (
                        <div className="absolute inset-0 m-auto w-48 h-48 border-[2px] border-white/20 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none"></div>
                      )}
                      {sector.name === 'Mythic' && isMythicComplete && (
                        <div className="absolute inset-0 m-auto w-56 h-56 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>
                      )}

                      <div className={`w-36 h-36 md:w-44 md:h-44 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 relative ${isUnlocked ? `drop-shadow-[0_0_30px_${rankColor}]` : ''}`}>
                        <Emblem className={`w-28 h-28 md:w-36 md:h-36 text-rank-${sector.name.toLowerCase()}`} />
                        
                        {/* Soft pulse effect for unlocked nodes */}
                        {isUnlocked && <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl -z-10 animate-pulse"></div>}
                        
                        {/* Huge glow for Mythic */}
                        {sector.name === 'Mythic' && isMythicComplete && (
                          <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl -z-20 animate-pulse"></div>
                        )}
                      </div>

                      <div className={`mt-4 font-black tracking-[0.25em] uppercase text-2xl md:text-3xl ${isUnlocked ? 'text-white' : 'text-gray-600'}`} style={{ textShadow: isUnlocked ? `0 0 20px ${rankColor}` : 'none' }}>
                        {sector.name}
                      </div>
                      <div className="text-gray-400 font-mono tracking-[0.3em] uppercase text-[10px] md:text-xs mt-2 opacity-80">
                        {sector.region}
                      </div>

                      {/* Current Milestone Beacon (if exactly at this milestone and not traveling) */}
                      {isUserAtThisExactMilestone && !isMythicComplete && (
                        <div ref={beaconRef} className="absolute -left-32 md:-left-48 top-1/2 -translate-y-1/2 flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-white font-black tracking-widest text-sm whitespace-nowrap flex items-center justify-end gap-2">
                              <Target className="w-4 h-4 text-primary animate-pulse" />
                              CURRENT POSITION
                            </div>
                            <div className="text-primary font-mono text-[10px] tracking-widest uppercase mt-1">
                              {sector.name} CLASS
                            </div>
                            <div className="text-gray-400 font-mono text-[10px] tracking-widest uppercase">
                              LEVEL {currentLevel}
                            </div>
                          </div>
                          {/* Pointer line */}
                          <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary"></div>
                        </div>
                      )}
                    </div>

                    {/* Interactive Hover Card (Rank Milestone Card) */}
                    <div className="absolute left-[65%] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 pointer-events-none transform -translate-x-4 group-hover:translate-x-0">
                      <div className="bg-black/95 border border-white/10 rounded-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl min-w-[220px]">
                        <h4 className="text-white font-black uppercase tracking-widest text-lg mb-1">{sector.name} CLASS</h4>
                        <div className="w-full h-px bg-white/10 mb-3"></div>
                        
                        <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-1">
                          Required Level: <span className="text-white">{sector.req}</span>
                        </p>
                        
                        {isUnlocked && (
                          <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-3">
                            Current Level: <span className="text-white">{currentLevel}</span>
                          </p>
                        )}
                        
                        <div className="mt-4">
                          <p className="text-gray-500 font-mono text-[9px] uppercase tracking-widest mb-1">Status:</p>
                          <p className={`font-bold font-mono tracking-widest text-xs uppercase ${isUnlocked ? 'text-success' : 'text-danger'}`}>
                            {isUnlocked ? 'ACHIEVED' : 'LOCKED'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* The Connecting Route (Line) */}
                  {nextSector && (
                    <div 
                      className="relative flex items-end justify-center w-full z-10 -my-6"
                      style={{ height: `${(nextSector.req - sector.req) * 45}px` }}
                    >
                      
                      {/* Base Trajectory Line (Locked/Faint) */}
                      <div className="absolute top-0 bottom-0 w-1 bg-white/5" style={{ borderLeft: '2px dashed rgba(255,255,255,0.15)' }}></div>
                      
                      {/* Illuminated Path (Unlocked/Bright) */}
                      <div 
                        className={`absolute bottom-0 w-1.5 rounded-full transition-all duration-1000 ${isUnlocked ? 'bg-primary shadow-[0_0_20px_rgba(var(--color-primary),1)]' : ''}`}
                        style={{ height: `${progressPercent}%`, backgroundColor: isUnlocked ? rankColor : 'transparent', boxShadow: isUnlocked ? `0 0 20px ${rankColor}` : 'none' }}
                      ></div>

                      {/* Intermediate Level Markers */}
                      {Array.from({ length: nextSector.req - sector.req - 1 }).map((_, i) => {
                        const levelDot = sector.req + i + 1;
                        const dotPercent = ((levelDot - sector.req) / (nextSector.req - sector.req)) * 100;
                        const isDotUnlocked = currentLevel >= levelDot;
                        const requiredMomentum = 100 * Math.pow(levelDot - 1, 2);

                        return (
                          <div 
                            key={levelDot}
                            className="absolute w-full flex items-center justify-center group z-20"
                            style={{ bottom: `${dotPercent}%` }}
                          >
                            <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${isDotUnlocked ? 'bg-primary shadow-[0_0_8px_rgba(var(--color-primary),1)]' : 'bg-white/20'}`} style={{ backgroundColor: isDotUnlocked ? rankColor : '' }}></div>
                            
                            {/* Permanent minimal label */}
                            <div className={`absolute left-1/2 ml-4 text-[10px] font-mono uppercase ${isDotUnlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                              Lv {levelDot}
                            </div>
                            
                            {/* Hover tooltip */}
                            <div className="absolute left-1/2 ml-16 opacity-0 group-hover:opacity-100 transition-all z-50 bg-black/95 border border-white/10 p-3 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] pointer-events-none w-36 transform -translate-x-4 group-hover:translate-x-0">
                              <p className="font-bold text-white text-xs mb-1">Level {levelDot}</p>
                              <div className="w-full h-px bg-white/10 mb-2"></div>
                              <p className="text-[9px] text-gray-400 font-mono mb-1 uppercase tracking-widest">Req: <span className="text-white">{requiredMomentum} M</span></p>
                              <p className={`text-[9px] font-bold uppercase tracking-widest mt-2 ${isDotUnlocked ? 'text-success' : 'text-danger'}`}>
                                STATUS: {isDotUnlocked ? 'ACHIEVED' : 'LOCKED'}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      {/* Traveling Beacon (if user is between milestones) */}
                      {isCurrentSector && !isUserAtThisExactMilestone && (
                        <div 
                          ref={beaconRef}
                          className="absolute w-12 h-12 flex items-center justify-center z-40 transition-all duration-1000 -ml-1.5"
                          style={{ bottom: `${progressPercent}%` }}
                        >
                          {/* Ship/Beacon Blips */}
                          <div className="absolute w-8 h-8 bg-white/20 rounded-full animate-ping"></div>
                          <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_30px_white]"></div>
                          
                          {/* Traveling Telemetry Tag */}
                          <div className="absolute left-10 md:left-14 bg-black/90 px-4 py-2 border border-white/20 rounded-lg backdrop-blur-xl flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                            <div className="text-white font-black tracking-widest text-xs whitespace-nowrap flex items-center gap-2 mb-1">
                              <Target className="w-3 h-3 text-primary animate-pulse" />
                              CURRENT POSITION
                            </div>
                            <div className="text-primary font-mono text-[9px] tracking-widest uppercase">
                              {currentRank} CLASS
                            </div>
                            <div className="text-gray-400 font-mono text-[9px] tracking-widest uppercase">
                              LEVEL {currentLevel}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>
      </motion.div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
      `}} />
    </div>
  );
};
