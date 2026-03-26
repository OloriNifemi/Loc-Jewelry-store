/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        deep: '#111111',
        'gray-subtle': '#1a1a1a',
        gold: '#c9a84c',
        'gold-light': '#e8c97a',
        'gold-pale': '#f0e2b6',
        cream: '#f5f0e8',
        'off-white': '#fafaf8',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      keyframes: {
        heroFadeIn: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        lineFloat: {
          '0%,100%': { opacity: '0.3', transform: 'scaleY(1)' },
          '50%':     { opacity: '0.7', transform: 'scaleY(1.1)' },
        },
        diamondPulse: {
          '0%,100%': { opacity: '0.4', transform: 'rotate(45deg) scale(1)' },
          '50%':     { opacity: '1',   transform: 'rotate(45deg) scale(1.5)' },
        },
        scrollPulse: {
          '0%':   { transform: 'scaleY(1)', opacity: '1' },
          '100%': { transform: 'scaleY(0.3)', opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        heroFadeIn:   'heroFadeIn 1.2s ease-out forwards',
        heroFadeIn2:  'heroFadeIn 1.2s 0.2s ease-out both',
        heroFadeIn4:  'heroFadeIn 1.2s 0.4s ease-out both',
        heroFadeIn6:  'heroFadeIn 1.2s 0.6s ease-out both',
        heroFadeIn8:  'heroFadeIn 1.2s 0.8s ease-out both',
        heroFadeIn12: 'heroFadeIn 1.2s 1.2s ease-out both',
        lineFloat1:   'lineFloat 8s ease-in-out infinite',
        lineFloat2:   'lineFloat 8s 3s ease-in-out infinite',
        lineFloat3:   'lineFloat 8s 6s ease-in-out infinite',
        diamondPulse1:'diamondPulse 4s ease-in-out infinite',
        diamondPulse2:'diamondPulse 4s 2s ease-in-out infinite',
        diamondPulse3:'diamondPulse 4s 1s ease-in-out infinite',
        scrollPulse:  'scrollPulse 2s ease-in-out infinite',
        fadeIn:       'fadeIn 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
