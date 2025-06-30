/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        cyber: {
          red: '#ff0040',
          pink: '#ff1744',
          blue: '#00d4ff',
          purple: '#7c4dff',
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'futura': ['Futura', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'matrix': 'matrix 20s linear infinite',
        'cyber-pulse': 'cyberPulse 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #ff0040, 0 0 10px #ff0040, 0 0 15px #ff0040' },
          '100%': { boxShadow: '0 0 10px #ff0040, 0 0 20px #ff0040, 0 0 30px #ff0040' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        cyberPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 5px #ff0040, inset 0 0 5px #ff0040',
            borderColor: '#ff0040'
          },
          '50%': { 
            boxShadow: '0 0 20px #ff0040, inset 0 0 10px #ff0040',
            borderColor: '#ff1744'
          }
        }
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(255, 0, 64, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 64, 0.1) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'cyber-grid': '20px 20px',
      }
    },
  },
  plugins: [],
}