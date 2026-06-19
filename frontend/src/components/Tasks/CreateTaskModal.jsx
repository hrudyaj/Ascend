import { API_URL } from '../../config/api';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Plus } from 'lucide-react';
import axios from 'axios';
import { useGame } from '../../context/GameContext';

export const CreateTaskModal = ({ isOpen, onClose, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskType, setTaskType] = useState('one-time'); // 'one-time' | 'recurring'
  const [momentumReward, setMomentumReward] = useState(25);
  const [recurrenceDays, setRecurrenceDays] = useState([]); // 0-6
  const [endDate, setEndDate] = useState('');
  const { playSound } = useGame();

  const daysOfWeek = [
    { label: 'Su', value: 0 },
    { label: 'Mo', value: 1 },
    { label: 'Tu', value: 2 },
    { label: 'We', value: 3 },
    { label: 'Th', value: 4 },
    { label: 'Fr', value: 5 },
    { label: 'Sa', value: 6 },
  ];

  const toggleDay = (val) => {
    if (recurrenceDays.includes(val)) {
      setRecurrenceDays(recurrenceDays.filter(d => d !== val));
    } else {
      setRecurrenceDays([...recurrenceDays, val]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      const payload = {
        title,
        description,
        taskType,
        momentumReward: Number(momentumReward)
      };

      if (taskType === 'recurring') {
        payload.recurrenceDays = recurrenceDays;
        if (endDate) {
          payload.endDate = new Date(endDate);
        }
      }

      const res = await axios.post(`${API_URL}/quests`, payload);
      onTaskCreated(res.data);
      playSound('task');
      onClose();
      
      // Reset form
      setTitle('');
      setDescription('');
      setTaskType('one-time');
      setRecurrenceDays([]);
      setEndDate('');
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-surface border border-white/10 rounded-2xl shadow-2xl p-6"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Plus className="w-6 h-6 text-accent" />
          Create New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title & Description */}
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">TASK TITLE</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-accent transition-colors"
              placeholder="e.g. Morning Workout"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">DESCRIPTION (OPTIONAL)</label>
            <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-accent transition-colors"
              placeholder="Any specifics?"
            />
          </div>

          {/* Type Selector */}
          <div className="flex gap-4">
            <div 
              onClick={() => setTaskType('one-time')}
              className={`flex-1 p-3 rounded-lg border text-center cursor-pointer transition-all ${
                taskType === 'one-time' ? 'bg-accent/20 border-accent text-accent font-bold' : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              One-Time (Alarm)
            </div>
            <div 
              onClick={() => setTaskType('recurring')}
              className={`flex-1 p-3 rounded-lg border text-center cursor-pointer transition-all ${
                taskType === 'recurring' ? 'bg-accent/20 border-accent text-accent font-bold' : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              Recurring
            </div>
          </div>

          {/* Recurring Options */}
          {taskType === 'recurring' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4 pt-2"
            >
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-2">REPEAT ON DAYS</label>
                <div className="flex justify-between gap-2">
                  {daysOfWeek.map(day => (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => toggleDay(day.value)}
                      className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                        recurrenceDays.includes(day.value) 
                          ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                          : 'bg-black/50 border border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> END DATE (OPTIONAL)
                </label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-accent transition-colors [color-scheme:dark]"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank to repeat forever.</p>
              </div>
            </motion.div>
          )}

          {/* Reward & Submit */}
          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <div>
               <label className="block text-xs font-mono text-gray-400 mb-1">MOMENTUM REWARD</label>
               <input 
                  type="number" 
                  value={momentumReward}
                  onChange={(e) => setMomentumReward(e.target.value)}
                  className="w-24 bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-accent transition-colors"
                  min="5"
                />
            </div>
            
            <button 
              type="submit"
              disabled={!title || (taskType === 'recurring' && recurrenceDays.length === 0)}
              className="px-6 py-2.5 bg-accent hover:bg-accent/80 text-white font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(var(--color-accent),0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Task
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
