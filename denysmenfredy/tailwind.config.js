/** @type {import('tailwindcss').Config} */
export default {
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
            'green': '#058C42',
            'green-light': '#16DB65'
        }
    },
  },
  plugins: [],
}

