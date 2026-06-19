import { API_URL } from '../../config/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GlassCard } from '../UI/GlassCard';
import { ProgressBar } from '../UI/ProgressBar';
import { CheckCircle2, CircleCheckBig, Zap, Plus } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const DailyProgress = () => {
  const [habits, setHabits] = useState([]);
  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { addMomentum, playSound } = useGame();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await axios.get(`${API_URL}/habits`);
      setHabits(res.data);
    } catch (err) {
      console.error('Error fetching habits:', err);
    }
  };

  const handleComplete = async (id, title, reward) => {
    try {
      await axios.put(`${API_URL}/habits/${id}/complete`);
      addMomentum(reward, title);
      fetchHabits(); // Refresh list to update UI
    } catch (err) {
      console.error('Error completing habit:', err);
    }
  };

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;
    try {
      await axios.post(`${API_URL}/habits`, {
        title: newHabitTitle,
        momentumReward: 10
      });
      setNewHabitTitle('');
      setIsAdding(false);
      playSound('task');
      fetchHabits();
    } catch (err) {
      console.error('Error creating habit', err);
    }
  };

  const completedCount = habits.filter(h => h.isCompletedToday).length;
  const totalCount = habits.length;

  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2 text-gray-200 tracking-widest uppercase">
          <Zap className="w-5 h-5 text-warning" />
          CORE SYSTEMS
        </h3>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2 font-mono uppercase tracking-widest">
          <span>System Integrity</span>
          <span className="text-success font-bold">{totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</span>
        </div>
        <ProgressBar 
          progress={completedCount} 
          max={totalCount || 1} 
          colorClass="bg-success" 
        />
      </div>

      <div className="space-y-3">
        {habits.length === 0 && !isAdding ? (
          <div className="text-sm text-gray-500 italic mb-2">No habits configured yet.</div>
        ) : (
          habits.map(habit => (
            <div 
              key={habit._id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all mb-3 ${
                habit.isCompletedToday 
                  ? 'bg-success/10 border-success/30 opacity-60' 
                  : 'bg-surface border-white/5 hover:border-white/20'
              }`}
            >
              <span className={`font-mono tracking-widest uppercase text-xs md:text-sm ${habit.isCompletedToday ? 'text-success' : 'text-gray-200'}`}>
                {habit.isCompletedToday ? `✓ ${habit.title} Online` : habit.title}
              </span>
              <button
                onClick={() => handleComplete(habit._id, habit.title, habit.momentumReward)}
                disabled={habit.isCompletedToday}
                className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-bold transition-colors ${
                  habit.isCompletedToday 
                    ? 'text-success cursor-default'
                    : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer'
                }`}
              >
                {habit.isCompletedToday ? <CheckCircle2 className="w-4 h-4" /> : <CircleCheckBig className="w-4 h-4" />}
                {habit.isCompletedToday ? 'Done' : `+${habit.momentumReward} M`}
              </button>
            </div>
          ))
        )}

        {isAdding ? (
          <form onSubmit={handleCreateHabit} className="flex flex-col gap-2 bg-black/20 p-3 rounded-lg border border-warning/20 mt-4">
            <input 
              type="text" 
              value={newHabitTitle}
              onChange={e => setNewHabitTitle(e.target.value)}
              placeholder="New daily habit..."
              className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-warning/50 transition-colors mb-2"
              autoFocus
            />
            <div className="flex gap-2">
              <button 
                type="submit"
                data-audio="true"
                className="flex-1 px-3 py-2 bg-warning/20 hover:bg-warning/40 text-warning font-bold rounded-md text-sm transition-all"
              >
                Add Habit
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
            className="w-full mt-2 py-3 border border-dashed border-white/10 hover:border-warning/50 rounded-lg text-sm text-gray-400 hover:text-warning flex items-center justify-center gap-2 transition-all bg-black/20 hover:bg-warning/5"
          >
            <Plus className="w-4 h-4" /> Add New Habit
          </button>
        )}
      </div>

    </GlassCard>
  );
};
