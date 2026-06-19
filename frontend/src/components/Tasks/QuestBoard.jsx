import { API_URL } from '../../config/api';
import React from 'react';
import axios from 'axios';
import { GlassCard } from '../UI/GlassCard';
import { ScrollText, CheckCircle2, Flame, CalendarDays } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const QuestBoard = ({ quests, setQuests }) => {
  const { addMomentum } = useGame();

  const handleComplete = async (id, reward) => {
    try {
      await axios.put(`${API_URL}/quests/${id}/complete`);
      
      setQuests(quests.map(q => q._id === id ? { ...q, isCompleted: true } : q));
      addMomentum(reward, "Quest Completed");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {quests.length === 0 ? (
        <div className="text-sm text-gray-500 font-mono italic p-4 text-center border border-dashed border-white/10 rounded-xl">No active operations detected. Awaiting command input.</div>
      ) : (
        quests.map(quest => (
          <div 
            key={quest._id} 
            className={`p-5 rounded-xl border relative overflow-hidden transition-all group ${
              quest.isCompleted 
                ? 'bg-black/40 border-success/20 opacity-50' 
                : 'bg-black/60 border-accent/30 hover:border-accent shadow-[inset_0_0_20px_rgba(var(--color-accent),0.05)] hover:shadow-[0_0_20px_rgba(var(--color-accent),0.2)]'
            }`}
          >
            {/* Background Accent */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${quest.isCompleted ? 'bg-success/50' : 'bg-accent'} opacity-80`}></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="pl-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-mono tracking-widest font-bold uppercase px-2 py-0.5 rounded-sm ${quest.isCompleted ? 'bg-success/20 text-success' : 'bg-accent/20 text-accent'}`}>
                    {quest.taskType === 'recurring' ? 'RECURRING OP' : 'SPECIAL OP'}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                    STATUS: {quest.isCompleted ? 'COMPLETE' : 'IN PROGRESS'}
                  </span>
                </div>
                <h4 className={`text-lg font-bold uppercase tracking-wider ${quest.isCompleted ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                  {quest.title}
                </h4>
                {quest.description && <p className="text-sm text-gray-400 mt-1 font-mono">{quest.description}</p>}
              </div>

              <div className="flex items-center gap-4 pl-2 md:pl-0 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right hidden md:block">
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">REWARD</p>
                  <p className="text-sm font-bold text-accent font-mono flex items-center justify-end gap-1">
                    <Flame className="w-4 h-4"/> +{quest.momentumReward} M
                  </p>
                </div>

                <button 
                  onClick={() => handleComplete(quest._id, quest.momentumReward)}
                  disabled={quest.isCompleted}
                  data-audio="true"
                  className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-lg transition-all border ${
                    quest.isCompleted 
                      ? 'bg-success/10 border-success/30 text-success cursor-default'
                      : 'bg-accent/10 border-accent/30 text-accent hover:bg-accent hover:text-white cursor-pointer group-hover:scale-105'
                  }`}
                  title={quest.isCompleted ? "Operation Complete" : "Execute Operation"}
                >
                  {quest.isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Flame className="w-6 h-6"/>}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
