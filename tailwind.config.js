import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
            sans:  ['Poppins', ...defaultTheme.fontFamily.sans],
            serif: ['Poppins', ...defaultTheme.fontFamily.sans],
        },
        colors: {
            // Background scale
            cream: {
              base:     '#F5F4EF',
              surface:  '#FAFAF7',
              elevated: '#FFFFFF',
            },
            // Sidebar / dark panels
            dark: {
              base:  '#1A1915',
              muted: '#242320',
              hover: 'rgba(255,255,255,0.04)',
              border:'#2E2C28',
            },
            // Text scale
            ink: {
              primary:   '#1A1915',
              secondary: '#5C5A54',
              muted:     '#8C8A82',
              'on-dark':       '#E8E6DF',
              'on-dark-muted': '#7A786F',
            },
            // Accent — pastel green
            accent: {
              DEFAULT: '#4F7A3F',
              hover:   '#3D6030',
              light:   '#E6F0E1',
              text:    '#2D4A22',
            },
            // Semantic
            success: {
              DEFAULT: '#3D7A5C',
              light:   '#E2F0EA',
            },
            danger: {
              DEFAULT: '#C0392B',
              light:   '#FAEBE9',
            },
            warning: {
              DEFAULT: '#B5860D',
              light:   '#FBF3D5',
            },
            // Borders
            border: {
              DEFAULT: '#E8E5DC',
              strong:  '#D4D0C4',
              dark:    '#2E2C28',
            },
        },
        boxShadow: {
            'card':    '0 1px 3px rgba(26,25,21,0.06), 0 4px 12px rgba(26,25,21,0.04)',
            'elevated':'0 4px 16px rgba(26,25,21,0.10), 0 12px 40px rgba(26,25,21,0.08)',
            'modal':   '0 8px 32px rgba(26,25,21,0.18)',
        },
        animation: {
            'fade-up':    'fadeUp 0.2s ease-out',
            'slide-in-r': 'slideInRight 0.2s ease-out',
            'spin-slow':  'spin 0.8s linear infinite',
            'shimmer':    'shimmer 1.4s ease infinite',
        },
        keyframes: {
          fadeUp: {
            '0%':   { opacity: '0', transform: 'translateY(8px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          slideInRight: {
            '0%':   { opacity: '0', transform: 'translateX(8px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          shimmer: {
            '0%':   { backgroundPosition: '200% 0' },
            '100%': { backgroundPosition: '-200% 0' },
          },
        },
      },
    },
    plugins: [],
};
