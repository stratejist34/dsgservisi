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
          DEFAULT: '#1a2332',
          50: '#e6e8ea',
          100: '#ccd1d5',
          200: '#99a3ab',
          300: '#667581',
          400: '#334757',
          500: '#1a2332',
          600: '#151c28',
          700: '#10151e',
          800: '#0b0e14',
          900: '#05070a',
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
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 10s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'ring': 'ring 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
        'in': 'in 0.5s ease-out',
        'slide-in-from-bottom-5': 'slideInFromBottom 0.5s ease-out',
      },
      keyframes: {
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

