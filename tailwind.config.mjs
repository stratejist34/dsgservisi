/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a9cb0',
          50: '#e6f7f9',
          100: '#cceff3',
          200: '#99dfe7',
          300: '#66cfdb',
          400: '#33bfcf',
          500: '#1a9cb0',
          600: '#157d8d',
          700: '#105e6a',
          800: '#0b3e47',
          900: '#051f24',
        },
        navy: {
          DEFAULT: '#2d4a5e',
          50: '#e8ecf0',
          100: '#d1d9e1',
          200: '#a3b3c3',
          300: '#758da5',
          400: '#476787',
          500: '#2d4a5e',
          600: '#243b4b',
          700: '#1b2c38',
          800: '#121e25',
          900: '#090f12',
        },
        cyan: {
          DEFAULT: '#5dd3e0',
          light: '#8ee0e9',
          dark: '#2cc4d4',
        },
      },
      fontFamily: {
        sans: ['Barlow', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Montserrat', 'Barlow', 'sans-serif'],
        tech: ['Montserrat', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 4s ease-in-out infinite',
        'spin-slow': 'spin 15s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'ring': 'ring 3s ease-in-out infinite',
        'ripple': 'ripple 0.8s ease-out',
        'float': 'float 8s ease-in-out infinite',
        'gradient': 'gradient 5s ease infinite',
        'in': 'in 0.8s ease-out',
        'slide-in-from-bottom-5': 'slideInFromBottom 0.8s ease-out',
      },
      keyframes: {
        'bounce-spring': {
          '0%, 100%': { 
            transform: 'translateY(0) scale(1)',
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          },
          '50%': { 
            transform: 'translateY(-15%) scale(1.02)',
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
        'ring-rotate': {
          '0%': { transform: 'rotate(-8deg)' },
          '15%': { transform: 'rotate(8deg)' },
          '30%': { transform: 'rotate(-8deg)' },
          '45%': { transform: 'rotate(8deg)' },
          '60%, 100%': { transform: 'rotate(0deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(26, 156, 176, 0.4), 0 0 40px rgba(26, 156, 176, 0.2), inset 0 0 20px rgba(26, 156, 176, 0.1)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(26, 156, 176, 0.8), 0 0 80px rgba(26, 156, 176, 0.4), inset 0 0 30px rgba(26, 156, 176, 0.2)',
          },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'rotate-continuous': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'float-smooth': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-8px) translateX(3px)' },
          '66%': { transform: 'translateY(-4px) translateX(-3px)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(26, 156, 176, 0.5), 0 0 40px rgba(26, 156, 176, 0.3)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(26, 156, 176, 0.8), 0 0 60px rgba(26, 156, 176, 0.5)',
          },
        },
        ring: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
        },
        ripple: {
          '0%': {
            transform: 'scale(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        in: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInFromBottom: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
};

