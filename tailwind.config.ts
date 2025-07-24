import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8821f4',
          50: '#f6f0fe',
          100: '#ece1fd',
          200: '#dcc3fb',
          300: '#c494f8',
          400: '#ab5cf4',
          500: '#8821f4',
          600: '#7f19e6',
          700: '#6a14bf',
          800: '#571399',
          900: '#48117d',
        },
        secondary: {
          DEFAULT: '#15171a',
          50: '#f5f5f6',
          100: '#e6e7e8',
          200: '#cfd1d3',
          300: '#adb0b4',
          400: '#82868c',
          500: '#15171a',
          600: '#4e5157',
          700: '#3f4146',
          800: '#35373b',
          900: '#2f3033',
        },
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config; 