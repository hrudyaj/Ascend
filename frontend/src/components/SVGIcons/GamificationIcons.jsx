import React from 'react';

export const MomentumCrystal = ({ className = 'w-6 h-6 text-primary' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 5L75 35L50 95L25 35L50 5Z" fill="currentColor" opacity="0.8"/>
    <path d="M50 15L65 38L50 80L35 38L50 15Z" fill="#ffffff" opacity="0.4"/>
  </svg>
);

export const LevelCrest = ({ className = 'w-6 h-6 text-accent' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 5L90 25V75L50 95L10 75V25L50 5Z" stroke="currentColor" strokeWidth="8"/>
    <path d="M50 15L80 30V70L50 85L20 70V30L50 15Z" fill="currentColor"/>
    <circle cx="50" cy="50" r="15" fill="#151828"/>
  </svg>
);

export const AchievementMedal = ({ className = 'w-6 h-6 text-warning' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M30 5H70L60 35H40L30 5Z" fill="#9CA3AF"/>
    <circle cx="50" cy="65" r="30" fill="currentColor"/>
    <circle cx="50" cy="65" r="20" stroke="#ffffff" strokeWidth="4" opacity="0.5"/>
    <path d="M45 55L50 50L55 55V75L50 70L45 75V55Z" fill="#ffffff"/>
  </svg>
);

export const WeeklyChest = ({ className = 'w-6 h-6 text-warning' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="20" y="40" width="60" height="45" rx="5" fill="currentColor"/>
    <path d="M20 40C20 25 35 20 50 20C65 20 80 25 80 40H20Z" fill="currentColor" opacity="0.8"/>
    <rect x="15" y="40" width="70" height="8" rx="2" fill="#8B5CF6"/>
    <circle cx="50" cy="44" r="8" fill="#151828"/>
    <circle cx="50" cy="44" r="4" fill="#F59E0B"/>
  </svg>
);

export const LockedFeatureIcon = ({ className = 'w-6 h-6 text-gray-500' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="25" y="45" width="50" height="40" rx="6" fill="currentColor"/>
    <path d="M35 45V30C35 20 40 15 50 15C60 15 65 20 65 30V45" stroke="currentColor" strokeWidth="8"/>
    <circle cx="50" cy="65" r="6" fill="#151828"/>
  </svg>
);

export const ProgressPathMarker = ({ className = 'w-6 h-6 text-primary' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" strokeDasharray="10 5"/>
    <circle cx="50" cy="50" r="25" fill="currentColor"/>
  </svg>
);
