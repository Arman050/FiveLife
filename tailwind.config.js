/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        neon: {
          purple: '#8b00ff',
          violet: '#c084fc',
          pink:   '#ec4899',
          mauve:  '#a855f7',
        },
        dark: {
          base: '#06060D',
          100:  '#0C0818',
          200:  '#100D20',
          300:  '#180F2A',
          400:  '#1E1230',
          500:  '#261838',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light:   '#F0D060',
          dark:    '#9A7D1A',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter:    ['Barlow Condensed', 'Inter', 'sans-serif'],
        barlow:   ['"Barlow Condensed"', 'sans-serif'],
        bebas:    ['"Bebas Neue"', 'Impact', 'sans-serif'],
        mono:     ['"Share Tech Mono"', 'monospace'],
      },
      animation: {
        'neon-pulse':      'neonPulse 2.5s ease-in-out infinite',
        'float':           'float 8s ease-in-out infinite',
        'float-slow':      'float 12s ease-in-out infinite',
        'float-delayed':   'float 8s ease-in-out 3s infinite',
        'gradient-shift':  'gradientShift 8s ease infinite',
        'scan-line':       'scanLine 4s linear infinite',
        'glow-pulse':      'glowPulse 2s ease-in-out infinite',
        'slide-in-left':   'slideInLeft 0.4s cubic-bezier(0.16,1,0.3,1)',
        'fade-up':         'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1)',
        'spin-slow':       'spin 8s linear infinite',
        'border-glow':     'borderGlow 3s ease-in-out infinite',
      },
      keyframes: {
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 40px rgba(168,85,247,0.4)' },
          '50%':      { boxShadow: '0 0 20px #ec4899, 0 0 40px #ec4899, 0 0 80px rgba(236,72,153,0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowPulse: {
          '0%, 100%': { textShadow: '0 0 10px #a855f7, 0 0 20px #a855f7' },
          '50%':      { textShadow: '0 0 20px #ec4899, 0 0 40px #ec4899, 0 0 60px #ec4899' },
        },
        slideInLeft: {
          '0%':   { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)',     opacity: 1 },
        },
        fadeUp: {
          '0%':   { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)',    opacity: 1 },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(168,85,247,0.3)' },
          '50%':      { borderColor: 'rgba(168,85,247,0.8)' },
        },
      },
      boxShadow: {
        'neon':        '0 0 20px rgba(168,85,247,0.5)',
        'neon-strong': '0 0 30px rgba(168,85,247,0.8), 0 0 60px rgba(168,85,247,0.4)',
        'neon-pink':   '0 0 20px rgba(236,72,153,0.5)',
        'neon-hover':  '0 0 40px rgba(168,85,247,0.9), 0 0 80px rgba(168,85,247,0.5)',
        'glass':       '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover':  '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(168,85,247,0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
