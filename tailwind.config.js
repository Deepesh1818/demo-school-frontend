/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0a0f1d',      // Luxury Deep Navy
          slate: '#1e293b',     // Secondary Slate
          gold: '#dfb26c',      // Premium Warm Gold Accent
          goldlight: '#eedbbd', // Lighter Gold hover
          royal: '#2563eb',     // Interactive Blue
          alabaster: '#fafaf9', // Warm Background Light
          darkcard: '#161d31'   // Dark Mode cards background
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}
