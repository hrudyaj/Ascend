import React from 'react';
import { motion } from 'framer-motion';
import { cn } from './GlassCard';

export const ProgressBar = ({ progress, max = 100, colorClass = 'bg-primary', className, heightClass = 'h-2' }) => {
  const percentage = Math.min(Math.max((progress / max) * 100, 0), 100);

  return (
    <div className={cn(`w-full bg-surfaceHover rounded-full overflow-hidden`, heightClass, className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(`h-full rounded-full`, colorClass)}
      />
    </div>
  );
};
