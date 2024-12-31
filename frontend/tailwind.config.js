/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FAFFC5',
        'secondary': '#A9BFA8',
        'text-primary': '#5E686D',
        'text-secondary': '#3A3960',

      }
    },
  },
  plugins: [],
  
}

