/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        'primary': '#645FC6',
        'light-bg': '#2C2C38',
        'dark-bg': '#21212D',
      },
    },
    fontFamily: {
        'lato': ['Lato', 'sans-serif'],
    },
  },
  plugins: [],
}