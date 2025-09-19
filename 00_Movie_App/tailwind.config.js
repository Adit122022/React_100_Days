// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        // --- Elegant Fade & Rise with Glow ---
        fadeRiseGlow: {
          '0%': { opacity: '0', transform: 'translateY(20px)', textShadow: '0 0 5px transparent' },
          '50%': { opacity: '0.7', transform: 'translateY(0px)', textShadow: '0 0 10px rgba(255,255,255,0.5)' },
          '100%': { opacity: '1', transform: 'translateY(0px)', textShadow: '0 0 15px rgba(255,255,255,0.8)' },
        }
      },
      animation: {
        fadeRiseGlow: 'fadeRiseGlow 1.2s ease-out forwards', // Animation duration can be adjusted
      },
    },
  },
  plugins: [],
};