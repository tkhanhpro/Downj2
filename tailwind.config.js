// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}', // Added in case Tailwind classes are used in other files
  ],
  theme: {
    extend: {
      colors: {
        'dreamy-purple': '#6b48ff',
        'dreamy-pink': '#ff6bcb',
        'dreamy-blue': '#3b82f6',
      },
      backgroundImage: {
        'gradient-dreamy': 'linear-gradient(135deg, #6b48ff, #ff6bcb, #3b82f6)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
