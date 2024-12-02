/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          800: '#1e1e1e',
          700: '#2c2c2c',
          600: '#3c3c3c',
        }
      }
    },
  },
  plugins: [],
}