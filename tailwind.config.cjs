/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pet-pink': '#FFB6C1',
        'pet-purple': '#DDA0DD',
        'pet-blue': '#87CEEB',
        'pet-green': '#98FB98',
        'pet-yellow': '#FFE4B5',
      },
      fontFamily: {
        'cute': ['Comic Sans MS', 'cursive'],
      },
      animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'pulse-heart': 'pulse 1.5s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
