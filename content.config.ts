import { defineCollection, defineContentConfig, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      // Define custom schema for docs collection
      schema: z.object({
        tags: z.array(z.string()),
        image: z.string().optional(),
        createdAt: z.date(),
        updatedAt: z.date().optional(),
        title: z.string().min(3),
        description: z.string().min(10).max(300),
      })
    })
  }
})
