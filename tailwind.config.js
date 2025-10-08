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
                        'background-color': '#22272e',
                        color: '#059669',
                    },
                    'code::before': {
                        content: '""',
                    },
                    'code::after': {
                        content: '""',
                    },
                    code: {
                        'background-color': '#22272e',
                        color: '#059669',
                    },
                },
            },
            invert: {
                css: {
                    pre: {
                        'background-color': '#292524',
                        color: '#059669',
                    },
                    code: {
                        'background-color': '#292524',
                        color: '#059669',
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
