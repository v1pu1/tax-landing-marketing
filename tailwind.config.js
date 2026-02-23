/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#FAFAF8',
        primary: '#0D4F3C',
        accent: '#E8FF4D',
        ink: '#111310',
        muted: '#6B7068',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        card: '8px',
      },
      boxShadow: {
        card: '0 10px 30px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.32)' },
          '70%': { transform: 'scale(1.03)', boxShadow: '0 0 0 18px rgba(37, 211, 102, 0)' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: 120 },
          '100%': { strokeDashoffset: 0 },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms ease forwards',
        'pulse-soft': 'pulse-soft 2.8s ease infinite',
      },
    },
  },
  plugins: [],
}
