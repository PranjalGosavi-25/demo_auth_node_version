/** @type {import('tailwindcss').Config} */

const { tailwindTheme } = require('frontend-utils');

const { colors, boxShadow } = tailwindTheme;

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: colors,
      boxShadow: boxShadow
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  },
  important: '#app'
};
