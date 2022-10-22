/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#182a1b',
        'viole':'#394a3e',
        'vert':'#94a579',
        'fonn':'#62705b',
      },
    },
  },
  plugins: [],
}
