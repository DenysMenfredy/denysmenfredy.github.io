import defineContentConfig from '@nuxt/content'
import z from '@nuxt/content'
import defineCollection from '@nuxt/content'


export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: 'page',
            source: 'content/blog/*.md',
            schema: z.object({
                date: z.string()
            })
        })
    }
})