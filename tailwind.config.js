/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FEFCF8',
          100: '#F6EEE0',
          200: '#EFE2CC',
          300: '#E4D0AE',
        },
        rust: {
          50: '#FBEDE6',
          100: '#F4CFBB',
          200: '#E8A67F',
          300: '#DC8354',
          400: '#C9622F',
          500: '#B24A1E',
          600: '#8F3A17',
          700: '#6C2C12',
        },
        forest: {
          50: '#EAF0E7',
          100: '#C9D9C1',
          200: '#9FBB90',
          300: '#729661',
          400: '#4F7541',
          500: '#365A2B',
          600: '#2A4622',
          700: '#1E331A',
        },
        mustard: {
          100: '#FBEAB8',
          200: '#F5D683',
          300: '#EDBE4E',
          400: '#DFA52C',
          500: '#C08A1E',
        },
        ink: {
          400: '#6B6259',
          500: '#4A433C',
          600: '#332D27',
          700: '#241F1B',
        },
      },
      boxShadow: {
        soft: '0 2px 8px rgba(51, 45, 39, 0.06), 0 12px 32px -12px rgba(51, 45, 39, 0.12)',
        lift: '0 8px 20px rgba(51, 45, 39, 0.10), 0 24px 48px -20px rgba(178, 74, 30, 0.22)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        blob: '42% 58% 65% 35% / 45% 40% 60% 55%',
      },
      keyframes: {
        wag: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        steam: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)', opacity: '0.5' },
          '50%': { transform: 'translateY(-6px) scaleY(1.08)', opacity: '0.9' },
        },
      },
      animation: {
        wag: 'wag 0.7s ease-in-out infinite',
        floatUp: 'floatUp 0.5s ease-out both',
        popIn: 'popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        steam: 'steam 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
