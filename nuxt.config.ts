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
          langs: ['typescript', 'javascript', 'python', 'sql', 'bash', 'json', 'html', 'css', 'vue']
        }
      }
    },
    renderer: {
      anchorLinks: false
    }
  },
  modules: ['nuxt-icon', "@nuxt/image", "@nuxt/content", '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'dm-color-mode'
  }
})
