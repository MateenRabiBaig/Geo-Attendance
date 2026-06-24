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
          primary: '#2D2D2D', // Charcoal
          accent: '#FF6B35',  // Burnt Orange
        }
      }
    },
  },
  plugins: [],
}
