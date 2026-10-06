import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string().min(3),
        description: z.string().min(10).max(300),
        publishedAt: z.date(),
        updatedAt: z.date().optional(),
        tags: z.array(z.string().min(1)).default([]),
        image: z.string().optional(),
      })
    })
  }
})
