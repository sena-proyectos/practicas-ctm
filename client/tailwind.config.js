import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/react-tailwindcss-select/dist/index.esm.js', './node_modules/@nextui-org/theme/dist/components/pagination.js'],
  theme: {
    extend: {
      colors: {
        primary: '#39A900',
        secondary: '#00324D',
        third: '#82DEF0',
        fourth: '#FBFBE2',
        fifth: '#385C57',
        salmon: '#CB7766',
        seventh: '#FFCE40',
        aqua: '#B8F1D8',
        rosa: '#DF1E63',
        grayPrimary: '#D9D9D9',
        coffee: '#964B00',
        lima: '#65AC45',
        whitesmoke: '#F5F5F5'
      },
      boxShadowColor: {
        shadowPrimary: '#62bb34',
        shadowSecondary: '#00324D',
        shadowThird: '#82DEF0',
        shadowFourth: '#FBFBE2',
        shadowFifth: '#385C57',
        shadowSalmon: '#d69385',
        shadowSeventh: '#ffd458',
        shadowGray: '#687f7b',
        shadowAqua: '#B8F1D8'
      },
      boxShadow: {
        '2xl': '4px 4px 18px 0px rgba(0, 0, 0, 0.3)',
        'inner-custom': 'inset 0 0 25px 20px rgba(0, 0, 0, 0.3)'
      },
      gridTemplateColumns: {
        '2-55-45': '55% 45%',
        '2-20r-80': '20rem auto',
        '2-16r-84': '16rem auto',
        '2-45-55': '45% auto',
        '2-40-60': '40% auto',
        '2-50-50': '50% 50%',
        '2-90-10': '80% 20%',
        '2-60-40': '60% 40%',
        '6-columns-table': '2fr 1fr 1fr 1fr 1fr 1fr',
        '4-columns-table': '2fr 1fr 1fr 1fr'
        // '2-20r-80': '18rem auto'
      },
      gridTemplateRows: {
        '2-30-70': '10rem 70%',
        '3-10-78-12': '7rem 78% 12%',
        '3-10-75-15': '4.9rem 79% 6.4vh',
        '2-85-15': '92% 6.4vh',
        '2-25-75': '10rem auto',
        '2-50-50': '50% 50%',
        '2-80-20': '80% 20%',
        '2-20-80': '20% 80%',
        '2-93-6': '93.5% 6.5%'
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
      },
      screens: {
        st1: { max: '980px', min: '777px' },
        st2: { max: '776px', min: '640px' }
      }
    }
  },
  plugins: [nextui()]
}
