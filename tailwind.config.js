/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ain: {
          amber: '#F5A623',
          emerald: '#2ECC71',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Poppins"', 'sans-serif'],
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(circle at top, rgba(245,166,35,0.25), transparent 45%), radial-gradient(circle at bottom, rgba(46,204,113,0.25), transparent 50%)',
      },
      boxShadow: {
        glow: '0 0 25px rgba(245,166,35,0.35)',
      },
    },
  },
  plugins: [],
};
