/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E8EDF5',
          100: '#C5D0E6',
          200: '#99B4D1',
          300: '#6D93BC',
          400: '#4272A7',
          500: '#164A91',
          600: '#0B3A80',
          700: '#061D46',
          800: '#082B68',
          900: '#051D3D',
        },
        ivory: {
          50: '#FFFBF3',
          100: '#FFF8E9',
          200: '#FFF1D3',
        },
        silver: {
          100: '#C5CDD1',
          200: '#A3AEC5',
          300: '#818A99',
        },
        blue: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A4FF',
          400: '#3386FF',
          500: '#1976D2',
        },
      },
      fontFamily: {
        serif: ['var(--font-dm-serif)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '13': '3.25rem',
      },
      transitionDuration: {
        250: '250ms',
        300: '300ms',
        350: '350ms',
        400: '400ms',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(8, 43, 104, 0.1), 0 4px 16px rgba(8, 43, 104, 0.05)',
        'card': '0 4px 20px rgba(8, 43, 104, 0.08)',
        'glass-inner': 'inset 0 1px 2px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};