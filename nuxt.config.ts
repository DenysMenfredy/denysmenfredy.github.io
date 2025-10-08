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
        highlight: false
      }
    },
    renderer: {
      anchorLinks: false
    }
  },
  modules: ['nuxt-content-git', 'nuxt-icon', "@nuxt/image", "@nuxt/content", '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'dm-color-mode'
  }
})
