/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        cement: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        clay: {
          50: '#fef3f2',
          100: '#ffe4e3',
          200: '#ffcdca',
          300: '#ffaba5',
          400: '#fd7a70',
          500: '#f55046',
          600: '#e03026',
          700: '#be2118',
          800: '#9d1f18',
          900: '#82201b',
        },
        plaster: {
          DEFAULT: '#f4f0ec',
          light: '#f9f7f5',
          dark: '#e8e3de',
        },
      },
      fontFamily: {
        sans: ['Neue Haas Grotesk', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Editorial New', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'micro': '0.625rem',
        'display': '5rem',
        'display-sm': '3.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        'reveal': 'reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
        'marquee': 'marquee 40s linear infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        reveal: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}