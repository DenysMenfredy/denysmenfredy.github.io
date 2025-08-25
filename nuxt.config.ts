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
    highlight: {
      theme: 'github-light',
      preload: ['json', 'js', 'ts', 'vue', 'css', 'html', 'yaml', 'bash', 'python', 'c', 'cpp'],
      defaultTheme: 'github-light',
      darkTheme: 'github-dark',
    },
    build: {
      markdown: {
        toc: {
          depth: 3,
        },
        anchorLinks: {
          depth: 3,
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: '#'
      },
      remarkPlugins: ['remark-math', 'remark-gfm', 'remark-code-titles', 'remark-toc'],
      rehypePlugins: ['rehype-katex', 'rehype-autolink-headings', 'rehype-slug', 'rehype-highlight'],
      linkify: {
        linkClassName: 'text-blue-600 hover:underline dark:text-blue-400'
      },
    }
    }
  },
  modules: ['nuxt-icon', "@nuxt/image", "@nuxt/content"]
})
