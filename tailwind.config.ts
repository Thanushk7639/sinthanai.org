import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /bg-brand-(ink|red|teal|teal-light)/,
      variants: [],
    },
    {
      pattern: /text-brand-(ink|red|teal|teal-light)/,
      variants: [],
    },
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Solid colors for backgrounds/icons
          ink: '#0D2B4E',
          'ink-light': '#1A3F6F',
          red: '#1E86C8',
          'red-dark': '#1570AA',
          teal: '#1E86C8',
          'teal-light': '#4FAEE0',
          // Transparent glass surfaces
          bg: 'rgba(255,255,255,0.08)',
          surface: 'rgba(255,255,255,0.12)',
          'surface-2': 'rgba(255,255,255,0.18)',
          border: 'rgba(255,255,255,0.20)',
          'border-dark': 'rgba(255,255,255,0.35)',
          // Text on dark background
          'text-secondary': 'rgba(255,255,255,0.75)',
          muted: 'rgba(255,255,255,0.50)',
        },
        neutral: {
          50: 'rgba(255,255,255,0.06)',
          100: 'rgba(255,255,255,0.10)',
          200: 'rgba(255,255,255,0.18)',
          300: 'rgba(255,255,255,0.30)',
          400: 'rgba(255,255,255,0.50)',
          500: 'rgba(255,255,255,0.60)',
          600: 'rgba(255,255,255,0.70)',
          700: 'rgba(255,255,255,0.80)',
          800: 'rgba(255,255,255,0.88)',
          900: '#ffffff',
        },
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'xs': '0 1px 4px rgba(13,43,78,0.06)',
        'sm': '0 2px 8px rgba(13,43,78,0.08)',
        'md': '0 4px 20px rgba(13,43,78,0.10)',
        'lg': '0 8px 40px rgba(13,43,78,0.12)',
        'xl': '0 16px 60px rgba(13,43,78,0.14)',
        'red': '0 8px 24px -4px rgba(30,134,200,0.40)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
