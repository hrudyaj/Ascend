/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--bg-background) / <alpha-value>)', // Dynamic based on rank
        surface: 'rgb(var(--color-surface) / <alpha-value>)', // Dark slate
        surfaceHover: '#1E2235',
        primary: 'rgb(var(--color-primary) / <alpha-value>)', // Dynamic based on rank
        accent: 'rgb(var(--color-accent) / <alpha-value>)', // Dynamic based on rank
        success: '#10B981', // Emerald
        warning: '#F59E0B', // Amber
        danger: '#EF4444', // Red
        rank: {
          initiate: '#FFFFFF', // White
          seeker: '#3B82F6', // Blue
          vanguard: '#10B981', // Emerald
          ascendant: '#8B5CF6', // Violet
          paragon: '#F59E0B', // Gold/Amber
          mythic: '#EC4899', // Pink
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
