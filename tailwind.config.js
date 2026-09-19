/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#080808',
        noir: '#111111',
        charcoal: '#181818',
        graphite: '#242424',
        smoke: '#333333',
        platinum: '#E5E5E5',
        ivory: '#F5F3EF',
        bone: '#EBE7DF',
        champagne: '#C5A880',
        titanium: '#8E9094',
        luxury: {
          gold: '#C5A880',
          dark: '#0a0a0a',
          card: '#121212',
          border: 'rgba(255, 255, 255, 0.08)',
          borderLight: 'rgba(0, 0, 0, 0.08)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cinzel', 'Didot', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        display: ['"Cinzel"', 'serif'],
      },
      letterSpacing: {
        editorial: '0.25em',
        widestLuxury: '0.35em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'luxury-in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      animation: {
        'subtle-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
