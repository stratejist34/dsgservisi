/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Ana marka renkleri - Dönüşüm odaklı
        primary: {
          DEFAULT: '#F97316', // Turuncu - Ana CTA rengi
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        // Lacivert - Güven ve profesyonellik
        navy: {
          DEFAULT: '#1E3A8A',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E3A8A',
          900: '#1E40AF',
        },
        // Aciliyet rengi - Kritik CTA'lar için
        urgent: {
          DEFAULT: '#DC2626',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        // Turuncu alias (kolaylık için)
        orange: {
          DEFAULT: '#F97316',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        // Geriye dönük uyumluluk için cyan (kaldırılacak)
        cyan: {
          DEFAULT: '#F97316', // Artık turuncu'ya yönlendiriliyor
          light: '#FB923C',
          dark: '#EA580C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Titillium Web', 'Montserrat', 'Barlow', 'sans-serif'],
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
      typography: {
        DEFAULT: {
          css: {
            // Tüm başlıklar için font ailesi
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: "'Titillium Web', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
            },
            h1: {
              fontSize: '2.0625rem', // 33px
              fontWeight: '600',
              lineHeight: '2.5rem',
            },
            h2: {
              fontSize: '1.5rem', // 24px (optimal - kullanıcı tercihi)
              fontWeight: '600',
              lineHeight: '2rem',
            },
            h3: {
              fontSize: '1.25rem', // 20px (H2'den biraz küçük ama okunabilir)
              fontWeight: '600',
              lineHeight: '1.75rem',
            },
            h4: {
              fontSize: '1.25rem', // 20px (prose-lg varsayılan: 1.25rem)
              fontWeight: '600',
              lineHeight: '1.75rem',
            },
            h5: {
              fontSize: '1.125rem', // 18px (prose-lg varsayılan: 1.125rem)
              fontWeight: '600',
              lineHeight: '1.75rem',
            },
            h6: {
              fontSize: '1rem', // 16px (prose-lg varsayılan: 1rem)
              fontWeight: '600',
              lineHeight: '1.5rem',
            },
            // Liste öğeleri için satır arası yüksekliği
            'ul, ol': {
              lineHeight: '1.5',
            },
            'li': {
              marginTop: '0.125rem', // 2px
              marginBottom: '0.125rem', // 2px
              lineHeight: '1.5',
            },
            'li p': {
              marginTop: '0',
              marginBottom: '0',
              lineHeight: '1.5',
            },
          },
        },
        lg: {
          css: {
            // Tüm başlıklar için font ailesi
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: "'Rubik', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
            },
            h1: {
              fontSize: '2.25rem', // 36px
              fontWeight: '700',
              lineHeight: '2.5rem',
            },
            h2: {
              fontSize: '1.5rem', // 24px (optimal - kullanıcı tercihi)
              fontWeight: '600',
              lineHeight: '2rem',
            },
            h3: {
              fontSize: '1.25rem', // 20px (H2'den biraz küçük ama okunabilir)
              fontWeight: '600',
              lineHeight: '1.75rem',
            },
            h4: {
              fontSize: '1.25rem', // 20px
              fontWeight: '600',
              lineHeight: '1.75rem',
            },
            h5: {
              fontSize: '1.125rem', // 18px
              fontWeight: '600',
              lineHeight: '1.75rem',
            },
            h6: {
              fontSize: '1rem', // 16px
              fontWeight: '600',
              lineHeight: '1.5rem',
            },
            // Liste öğeleri için satır arası yüksekliği
            'ul, ol': {
              lineHeight: '1.5',
            },
            'li': {
              marginTop: '0.125rem', // 2px
              marginBottom: '0.125rem', // 2px
              lineHeight: '1.5',
            },
            'li p': {
              marginTop: '0',
              marginBottom: '0',
              lineHeight: '1.5',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

