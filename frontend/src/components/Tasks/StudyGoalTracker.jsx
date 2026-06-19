import { API_URL } from '../../config/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GlassCard } from '../UI/GlassCard';
import { ProgressBar } from '../UI/ProgressBar';
import { BookOpen, Plus } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const StudyGoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTargetHours, setNewTargetHours] = useState('');
  const { addMomentum, playSound } = useGame();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await axios.get(`${API_URL}/studygoals`);
      setGoals(res.data);
    } catch (err) {
      console.error('Error fetching study goals:', err);
    }
  };

  const handleLogHours = async (goalId, currentCompleted, target) => {
    // Basic implementation for MVP. Ideally opens a modal to input hours.
    const newCompleted = Math.min(currentCompleted + 1, target);
    
    // Simulate API call to update goal
    const updatedGoals = goals.map(g => 
      g._id === goalId ? { ...g, completedHours: newCompleted } : g
    );
    setGoals(updatedGoals);

    // Add momentum (15 momentum per hour as requested)
    if (newCompleted > currentCompleted) {
      addMomentum(15, "Study Session Logged");
      
      // Check for completion bonus
      if (newCompleted === target) {
        setTimeout(() => addMomentum(40, "Study Goal Completed Bonus"), 500);
      }
    }
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTargetHours) return;
    try {
      await axios.post(`${API_URL}/studygoals`, {
        title: newTitle,
        targetHours: Number(newTargetHours)
      });
      setNewTitle('');
      setNewTargetHours('');
      setIsAdding(false);
      playSound('task');
      fetchGoals();
    } catch (err) {
      console.error('Error creating study goal:', err);
    }
  };

  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2 text-gray-200 uppercase tracking-widest">
          <BookOpen className="w-5 h-5 text-primary" />
          RESEARCH OBJECTIVES
        </h3>
      </div>
      
      <div className="space-y-4">
        {goals.length === 0 && !isAdding ? (
          <div className="text-sm text-gray-500 italic mb-2">No study goals active.</div>
        ) : (
          goals.map(goal => {
            const percentage = Math.min((goal.completedHours / goal.targetHours) * 100, 100);
            const isCompleted = goal.completedHours >= goal.targetHours;

            return (
              <div key={goal._id} className="bg-black/40 p-4 rounded-xl border border-white/5 mb-4 flex gap-4 items-center shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                {/* Circular Progress Indicator */}
                <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="28" cy="28" r="24" className="stroke-white/10" strokeWidth="3" fill="none" />
                    <circle 
                      cx="28" cy="28" r="24" 
                      className={`stroke-current ${isCompleted ? 'text-success' : 'text-primary'} transition-all duration-1000`} 
                      strokeWidth="3" fill="none" 
                      strokeDasharray="150.7" 
                      strokeDashoffset={150.7 - (150.7 * percentage) / 100} 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <span className="absolute text-[10px] font-bold font-mono text-white">{Math.round(percentage)}%</span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-mono tracking-widest text-sm uppercase truncate mb-1 ${isCompleted ? 'text-gray-500 line-through' : 'text-primary'}`}>
                    {goal.title}
                  </h4>
                  <div className="flex justify-between text-xs text-gray-400 font-mono">
                    <span>STATUS: {isCompleted ? 'COMPLETE' : 'IN PROGRESS'}</span>
                    <span>{goal.completedHours} / {goal.targetHours} HRS</span>
                  </div>
                </div>

                {/* Action */}
                <button 
                  onClick={() => handleLogHours(goal._id, goal.completedHours, goal.targetHours)}
                  disabled={isCompleted}
                  className={`shrink-0 p-2 rounded-lg transition-colors border ${
                    isCompleted 
                      ? 'bg-success/10 border-success/30 text-success cursor-default' 
                      : 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/30 cursor-pointer'
                  }`}
                  title={isCompleted ? "Completed" : "Log 1 Hour"}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            );
          })
        )}

        {isAdding ? (
          <form onSubmit={handleCreateGoal} className="flex flex-col gap-2 bg-black/20 p-3 rounded-xl border border-primary/20 shadow-[inset_0_0_15px_rgba(var(--color-primary),0.05)] mt-4">
            <input 
              type="text" 
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Course or Subject..."
              className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-primary/50 transition-colors"
              autoFocus
            />
            <input 
              type="number" 
              value={newTargetHours}
              onChange={e => setNewTargetHours(e.target.value)}
              placeholder="Target Hrs"
              min="1"
              className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-primary/50 transition-colors"
            />
            <div className="flex gap-2 mt-1">
              <button 
                type="submit"
                data-audio="true"
                className="flex-1 px-4 py-2 bg-primary/20 hover:bg-primary/40 text-primary font-bold rounded-md text-sm transition-all"
              >
                Add Goal
              </button>
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-400 rounded-md text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            data-audio="true"
            className="w-full mt-2 py-3 border border-dashed border-white/10 hover:border-primary/50 rounded-lg text-sm text-gray-400 hover:text-primary flex items-center justify-center gap-2 transition-all bg-black/20 hover:bg-primary/5"
          >
            <Plus className="w-4 h-4" /> Add Study Goal
          </button>
        )}
      </div>

    </GlassCard>
  );
};
