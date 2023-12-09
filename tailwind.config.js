/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '5-min125': 'repeat(5, minmax(125px, 1fr))',
      },
    },
  },
  plugins: [],
};
