import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Send, Terminal, Loader2, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const GrowthActivityLogger = ({ isOpen, onClose }) => {
  const { addMomentum } = useGame();
  const [activity, setActivity] = useState('');
  const [category, setCategory] = useState('Personal Project');
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    { name: 'PROJECT LOG DETECTED', reward: 50 },
    { name: 'GMAT SESSION LOGGED', reward: 15 },
    { name: 'COURSE COMPLETION VERIFIED', reward: 75 },
    { name: 'RESEARCH LOG EXTRACTED', reward: 10 },
    { name: 'COMBAT TRAINING REGISTERED', reward: 20 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activity.trim()) return;

    setIsUploading(true);

    const selectedCategory = categories.find(c => c.name === category);
    
    // Simulate Neural Uplink Data Transfer Delay
    setTimeout(() => {
      addMomentum(selectedCategory.reward, `Uplink: ${activity}`);
      setActivity('');
      setIsUploading(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md overflow-hidden bg-black/90 border border-purple-500/50 rounded-2xl p-6 shadow-[0_0_50px_rgba(139,92,246,0.3)]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-purple-500/50 hover:text-purple-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sci-fi scanning line animation */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-purple-500/50 opacity-100 animate-[scan_3s_ease-in-out_infinite] shadow-[0_0_10px_rgba(139,92,246,1)] pointer-events-none"></div>

        <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-purple-400 uppercase tracking-widest font-mono">
          <Database className="w-6 h-6 text-purple-500" />
          CLASSIFIED TRANSMISSION
        </h3>
      
      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-mono text-purple-300/70">DATA CLASSIFICATION</label>
            <span className="text-[10px] text-purple-400/50 font-mono">SYSTEM READY</span>
          </div>
          <div className="relative">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black border border-purple-500/20 rounded-lg p-3 text-purple-100 font-mono outline-none focus:border-purple-500 transition-colors appearance-none"
            >
              {categories.map(c => (
                <option key={c.name} value={c.name}>[{c.reward} M] {c.name.toUpperCase()}</option>
              ))}
            </select>
            <Terminal className="absolute right-3 top-3 w-5 h-5 text-purple-500/50 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-purple-300/70 mb-1">MISSION INTEL RECEIVED</label>
          <textarea 
            rows={3}
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            placeholder="Input mission intelligence log..."
            className="w-full bg-black/80 border border-purple-500/20 rounded-lg p-3 text-green-400 font-mono outline-none focus:border-purple-500 transition-colors resize-none placeholder-purple-800/50"
          />
        </div>

        <button 
          type="submit"
          disabled={!activity.trim() || isUploading}
          data-audio="true"
          className="relative w-full flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600 border border-purple-600 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed group/btn overflow-hidden"
        >
          {isUploading && (
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 bottom-0 bg-purple-600 z-0"
            />
          )}

          <div className="relative z-10 flex items-center gap-2 font-mono tracking-widest uppercase text-sm">
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uplinking...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                Transmit Data
              </>
            )}
          </div>
        </button>
      </form>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
      </motion.div>
    </div>
  );
};
