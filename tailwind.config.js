import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
            sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        },
        colors: {
            primary: {
              50: '#eff6ff',
              100: '#dbeafe',
              200: '#bfdbfe',
              300: '#93c5fd',
              400: '#60a5fa',
              500: '#3b82f6',
              600: '#2563eb',
              700: '#1d4ed8',
              800: '#1e40af',
              900: '#1e3a8a',
              950: '#172554',
            },
            sidebar: {
              bg: '#0c0c0e',
              hover: 'rgba(255,255,255,0.05)',
              active: 'rgba(37,99,235,0.12)',
              border: 'rgba(255,255,255,0.07)',
              text: '#71717a',
              textActive: '#f4f4f5',
            },
            surface: {
              light: '#f8fafc',
              DEFAULT: '#ffffff',
              dark: '#0c0c0e',
              paper: '#18181b',
            },
            success: '#10b981',
            danger: '#ef4444',
            warning: '#f59e0b',
        },
        boxShadow: {
            'card': '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            'card-hover': '0 4px 12px rgba(0,0,0,0.08)',
            'floating': '0 8px 24px rgba(0,0,0,0.10)',
            'sidebar': '1px 0 0 rgba(255,255,255,0.06)',
        },
        animation: {
            'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'spin-fast': 'spin 0.5s linear infinite',
            'spin-slow': 'spin 8s linear infinite',
            'fade-in': 'fadeIn 0.2s ease-out',
            'slide-in': 'slideIn 0.2s ease-out',
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
