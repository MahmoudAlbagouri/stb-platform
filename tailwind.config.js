/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        stb: {
          'deep': '#060d1a',
          'dark': '#0a1628',
          'mid': '#0d1f3c',
          'navy': '#1a3a6b',
          'blue': '#1e6fd9',
          'bright': '#2196f3',
          'cyan': '#00d4ff',
          'silver': '#c8d8f0',
          'white': '#e8f0ff',
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient-shift 5s ease infinite',
      },
      backdropBlur: {
        'xs': '2px',
      }
    }
  },
  plugins: []
}
