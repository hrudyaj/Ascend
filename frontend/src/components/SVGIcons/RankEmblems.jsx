import React from 'react';

// Initiate - Simple circular emblem
export const InitiateEmblem = ({ className = 'w-8 h-8 text-rank-initiate' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" opacity="0.3"/>
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="8"/>
    <circle cx="50" cy="50" r="10" fill="currentColor"/>
  </svg>
);

// Seeker - Compass emblem
export const SeekerEmblem = ({ className = 'w-8 h-8 text-rank-seeker' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" opacity="0.3"/>
    <path d="M50 15L65 45L50 85L35 45L50 15Z" fill="currentColor"/>
    <path d="M50 15L50 85" stroke="#151828" strokeWidth="4"/>
    <path d="M35 45L65 45" stroke="#151828" strokeWidth="4"/>
    <circle cx="50" cy="50" r="6" fill="#151828"/>
  </svg>
);

// Vanguard - Shield emblem
export const VanguardEmblem = ({ className = 'w-8 h-8 text-rank-vanguard' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15 25L50 10L85 25V55C85 75 50 90 50 90C50 90 15 75 15 55V25Z" stroke="currentColor" strokeWidth="6" opacity="0.3"/>
    <path d="M25 32L50 20L75 32V52C75 68 50 80 50 80C50 80 25 68 25 52V32Z" fill="currentColor"/>
    <path d="M50 20V80" stroke="#151828" strokeWidth="6"/>
  </svg>
);

// Ascendant - Winged crest
export const AscendantEmblem = ({ className = 'w-8 h-8 text-rank-ascendant' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 10L65 40L90 45L70 65L75 90L50 75L25 90L30 65L10 45L35 40L50 10Z" fill="currentColor" opacity="0.4"/>
    <path d="M50 25L60 45L80 50L65 65L70 85L50 75L30 85L35 65L20 50L40 45L50 25Z" fill="currentColor"/>
  </svg>
);

// Paragon - Crystal crest
export const ParagonEmblem = ({ className = 'w-8 h-8 text-rank-paragon' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 5L75 30L50 95L25 30L50 5Z" stroke="currentColor" strokeWidth="6" opacity="0.3"/>
    <path d="M50 15L65 35L50 85L35 35L50 15Z" fill="currentColor"/>
    <path d="M35 35H65" stroke="#151828" strokeWidth="4"/>
    <path d="M50 15V85" stroke="#151828" strokeWidth="4"/>
  </svg>
);

// Mythic - Celestial sigil
export const MythicEmblem = ({ className = 'w-8 h-8 text-rank-mythic' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" opacity="0.4"/>
    <circle cx="50" cy="50" r="25" fill="currentColor"/>
    <path d="M50 5L55 35L85 30L65 50L85 70L55 65L50 95L45 65L15 70L35 50L15 30L45 35L50 5Z" fill="currentColor"/>
    <circle cx="50" cy="50" r="10" fill="#151828"/>
  </svg>
);
