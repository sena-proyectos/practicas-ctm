/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#39A900',
        secondary: '#00324D',
        third: '#82DEF0',
        fourth: '#FBFBE2',
        fifth: '#385C57',
        sixth: '#CB7766',
        seventh: '#FFCE40',
        gray: '#D9D9D9',
      },
      gridTemplateColumns: {
        '2-55-45': '55% 45%',
      },
      gridTemplateRows: {
        '2-30-70': '10rem 70%',
        '3-10-78-12': '7rem 78% 12%',
      },
      borderWidth: {
        1: '1.5px',
      },
      animation: {
        'slide-background': 'slideBackground 5s infinite',
      },
      keyframes: {
        slideBackground: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' },
        },
      },
    },
  },
  plugins: [],
}
