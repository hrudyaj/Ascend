import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const GlassCard = ({ children, className, onClick }) => {
  const isInteractive = !!onClick;
  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass-panel p-6",
        isInteractive && "cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};
