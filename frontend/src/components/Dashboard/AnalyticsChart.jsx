import React from 'react';
import { motion } from 'framer-motion';
import { X, Activity } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const AnalyticsModal = ({ isOpen, onClose }) => {
  const { user } = useGame();

  if (!isOpen) return null;

  // Generate mock 14-day trailing momentum history for MVP visualization
  const generateMockData = () => {
    const data = [];
    let currentM = Math.max(100, (user?.momentum || 500) - 1000);
    const today = new Date();
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Random daily gain between 20 and 150
      const dailyGain = Math.floor(Math.random() * 130) + 20;
      currentM += dailyGain;

      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        momentum: currentM,
        dailyGain: dailyGain
      });
    }
    
    // Ensure the last day matches exact current momentum
    if (data.length > 0) {
      data[data.length - 1].momentum = user?.momentum || 0;
    }
    
    return data;
  };

  const data = generateMockData();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-surface/95 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white bg-black/50 p-1.5 sm:p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-widest flex items-center gap-3 mb-4 sm:mb-6">
          <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
          Analytics Uplink
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-black/40 border border-white/5 rounded-xl p-3 sm:p-4 col-span-2 sm:col-span-1">
            <h4 className="text-gray-400 font-mono text-[10px] sm:text-xs tracking-widest mb-1">CURRENT MOMENTUM</h4>
            <p className="text-2xl sm:text-3xl font-black text-accent">{user?.momentum || 0}</p>
          </div>
          <div className="bg-black/40 border border-white/5 rounded-xl p-3 sm:p-4">
            <h4 className="text-gray-400 font-mono text-[10px] sm:text-xs tracking-widest mb-1">AVG DAILY GAIN</h4>
            <p className="text-2xl sm:text-3xl font-black text-primary">~85</p>
          </div>
          <div className="bg-black/40 border border-white/5 rounded-xl p-3 sm:p-4">
            <h4 className="text-gray-400 font-mono text-[10px] sm:text-xs tracking-widest mb-1">LONGEST STREAK</h4>
            <p className="text-2xl sm:text-3xl font-black text-orange-500">{user?.currentStreak || 0} <span className="text-sm sm:text-lg">Days</span></p>
          </div>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-xl p-3 sm:p-4 h-[200px] sm:h-[250px] lg:h-[300px]">
          <h4 className="text-gray-400 font-mono text-[10px] sm:text-xs tracking-widest mb-2 sm:mb-4">14-DAY MOMENTUM TRAJECTORY</h4>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMomentum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(var(--color-accent), 0.8)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="rgba(var(--color-accent), 0.8)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
              <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid rgba(var(--color-accent), 0.5)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey="momentum" 
                stroke="rgba(var(--color-accent), 1)" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorMomentum)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
