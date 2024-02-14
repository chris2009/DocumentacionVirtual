/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/libs/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:
      {
        'kaitoke-green': {
          '50': '#f0fdf5',
          '100': '#dcfce9',
          '200': '#bbf7d3',
          '300': '#86efb0',
          '400': '#4ade85',
          '500': '#22c563',
          '600': '#16a34e',
          '700': '#15803f',
          '800': '#166535',
          '900': '#14532d',
          '950': '#052e15',
        },
      },
    },
  },
  plugins: [],
};
