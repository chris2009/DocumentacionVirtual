/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'displace': 'displace 1s infinite',
      },
      keyframes: {
        displace: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(25%)' }, // Ajusta este valor para la distancia de desplazamiento deseada
        },
      },

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
}