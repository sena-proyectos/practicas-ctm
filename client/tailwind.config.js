/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#39A900',
      },
      gridTemplateColumns: {
        '2-55-45': '55% 45%',
      },
      gridTemplateRows: {
        '2-30-70': '30% 70%',
      },
    },
  },
  plugins: [],
}
