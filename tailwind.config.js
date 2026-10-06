/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
        colors: {
            'bg-black': '#020202',
            'green-darker': '#0D2818',
            'green-dark': '#04471C',
            'green': '#059669',
            'green-light': '#16DB65'
        },
        typography: () => ({
            DEFAULT: {
                css: {
                    pre: {
                        'background-color': '#292524',
                        color: '#d1fae5',
                    },
                    'code::before': {
                        content: '""',
                    },
                    'code::after': {
                        content: '""',
                    },
                    code: {
                        'background-color': '#e7e5e4',
                        color: '#065f46',
                    },
                },
            },
            invert: {
                css: {
                    pre: {
                        'background-color': '#1c1917',
                        color: '#d1fae5',
                    },
                    code: {
                        'background-color': '#292524',
                        color: '#6ee7b7',
                    },
                },
            },
        }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
