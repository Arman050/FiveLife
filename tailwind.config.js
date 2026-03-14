/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFAF6',
          100: '#FAF5EC',
          200: '#F5EDD8',
          300: '#EDE0C4',
          400: '#E4D4B0',
          500: '#D9C79A',
        },
        terracotta: {
          300: '#E4A882',
          400: '#D48B6A',
          500: '#C4724A',
          600: '#A85C38',
          700: '#8C4828',
        },
        sage: {
          300: '#C2D0B4',
          400: '#A3B593',
          500: '#8B9E7A',
          600: '#738564',
          700: '#5D6D50',
        },
        rose: {
          300: '#ECC4CE',
          400: '#E4A8B4',
          500: '#D4899A',
          600: '#C06B7E',
        },
        sand: {
          100: '#F8F2E6',
          200: '#F0E6D2',
          300: '#E8DABE',
          400: '#D8C9A8',
          500: '#C8B892',
        },
        warm: {
          800: '#2C2420',
          700: '#3D342F',
          600: '#4F443D',
          500: '#67574F',
          400: '#7C6F67',
          300: '#A09690',
          200: '#C8C0BB',
          100: '#E8E2DF',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        jost:     ['Jost', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-up':        'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1)',
        'fade-in':        'fadeIn 0.5s ease',
        'slide-in-left':  'slideInLeft 0.5s cubic-bezier(0.16,1,0.3,1)',
        'marquee':        'marquee 30s linear infinite',
        'float':          'float 6s ease-in-out infinite',
        'float-slow':     'float 9s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',     opacity: '1' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
      boxShadow: {
        'soft':    '0 4px 24px rgba(44, 36, 32, 0.08)',
        'medium':  '0 8px 40px rgba(44, 36, 32, 0.12)',
        'strong':  '0 16px 60px rgba(44, 36, 32, 0.18)',
        'product': '0 2px 16px rgba(44, 36, 32, 0.1)',
      },
    },
  },
  plugins: [],
}
