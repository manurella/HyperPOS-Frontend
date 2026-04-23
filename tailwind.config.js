import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
            sans: ['Inter', ...defaultTheme.fontFamily.sans],
        },
        colors: {
            primary: {
              50: '#eef2ff',
              100: '#e0e7ff',
              200: '#c7d2fe',
              300: '#a5b4fc',
              400: '#818cf8',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
              800: '#3730a3',
              900: '#312e81',
            },
            sidebar: {
              bg: '#0a0f1e',
              hover: 'rgba(99, 102, 241, 0.08)',
              active: 'rgba(99, 102, 241, 0.15)',
              border: 'rgba(255, 255, 255, 0.06)',
              text: '#94a3b8',
              textActive: '#e2e8f0',
            },
            surface: {
              light: '#f1f5f9',
              DEFAULT: '#ffffff',
              dark: '#0f172a',
              paper: '#1e293b'
            },
            success: '#10b981',
            danger: '#ef4444',
            warning: '#f59e0b',
        },
        boxShadow: {
            'card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
            'card-hover': '0 4px 12px rgba(0,0,0,0.12)',
            'floating': '0 10px 24px rgba(0,0,0,0.12)',
            'sidebar': '4px 0 24px rgba(0,0,0,0.25)',
        },
        animation: {
            'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'spin-fast': 'spin 0.5s linear infinite',
            'spin-slow': 'spin 8s linear infinite',
            'fade-in': 'fadeIn 0.25s ease-out',
            'slide-in': 'slideIn 0.25s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(4px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideIn: {
            '0%': { opacity: '0', transform: 'translateX(-8px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
        },
      },
    },
    plugins: [],
};
