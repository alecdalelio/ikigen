/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ikigai: {
          rose: '#fdf2f8',
          'rose-dark': '#be185d',
          'rose-light': '#fce7f3',
          indigo: '#1e1b4b',
          'indigo-light': '#6366f1',
          zinc: '#18181b',
          'zinc-light': '#71717a',
          gold: '#fbbf24',
          ivory: '#fefce8',
          sage: '#9ca3af',
        }
      },
      fontFamily: {
        zen: ['Inter', 'system-ui', 'sans-serif'],
        harmony: ['Noto Sans JP', 'sans-serif'],
        poetry: ['Playfair Display', 'serif'],
      },
      spacing: {
        zen: '0.25rem',
        harmony: '0.5rem',
        presence: '1rem',
        joy: '1.5rem',
        sustainability: '2rem',
        ikigai: '3rem',
      },
      borderRadius: {
        zen: '0.375rem',
        harmony: '0.75rem',
        presence: '1rem',
        joy: '1.5rem',
        ikigai: '2rem',
      },
      animation: {
        'sakura-fall': 'sakura-fall 3s infinite',
        'breathing-space': 'breathing-space 4s ease-in-out infinite',
        'petal-bloom': 'petal-bloom 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'gentle-fade-in': 'gentle-fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'petal-glow': 'petal-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'sakura-fall': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(-20px) rotate(0deg)' 
          },
          '50%': { 
            opacity: '1', 
            transform: 'translateY(0) rotate(180deg)' 
          },
          '100%': { 
            opacity: '0', 
            transform: 'translateY(20px) rotate(360deg)' 
          },
        },
        'breathing-space': {
          '0%, 100%': { 
            transform: 'scale(1)', 
            opacity: '0.8' 
          },
          '50%': { 
            transform: 'scale(1.05)', 
            opacity: '1' 
          },
        },
        'petal-bloom': {
          '0%': { 
            transform: 'scale(0) rotate(0deg)', 
            opacity: '0' 
          },
          '50%': { 
            transform: 'scale(1.1) rotate(180deg)', 
            opacity: '0.8' 
          },
          '100%': { 
            transform: 'scale(1) rotate(360deg)', 
            opacity: '1' 
          },
        },
        'gentle-fade-in': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        'petal-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(253, 242, 248, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(253, 242, 248, 0.6)' 
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'ikigai-dawn': 'linear-gradient(135deg, #fdf2f8 0%, #1e1b4b 100%)',
        'ikigai-dusk': 'linear-gradient(135deg, #1e1b4b 0%, #be185d 100%)',
        'ikigai-sakura': 'linear-gradient(135deg, #fdf2f8 0%, #fecdd3 50%, #fbbf24 100%)',
        'ikigai-petal': 'linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%)',
        'ikigai-petal-hover': 'linear-gradient(135deg, #fdf2f8 0%, #fecdd3 100%)',
      },
      clipPath: {
        'sakura-petal': 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        'sakura-petal-soft': 'polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)',
      },
    },
  },
  plugins: [],
};
  