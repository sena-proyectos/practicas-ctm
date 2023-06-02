/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#39A900',
        gray: '#D9D9D9'
      },
      gridTemplateColumns: {
        '2-55-45': '55% 45%',
        '2-20r-80': '20rem 80%'
      },
      gridTemplateRows: {
        '2-30-70': '10rem 70%'
      },
      borderWidth: {
        1: '1.5px'
      },
      animation: {
        'slide-background': 'slideBackground 5s infinite'
      },
      keyframes: {
        slideBackground: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' }
        }
      }
    }
  },
  plugins: []
}
