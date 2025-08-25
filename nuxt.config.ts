// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  pages: true,
  typescript: {
    shim: false
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3
        },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          },
          langs: ['js', 'ts', 'vue', 'json', 'yaml', 'bash', 'css', 'html', 'cpp', 'python', 'java', 'c']
        }
      }
    }
  },
  modules: ['nuxt-icon', "@nuxt/image", "@nuxt/content"]
})
