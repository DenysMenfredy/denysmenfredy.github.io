<template>
    <template v-if="page">
    <article class="w-full max-w-4xl mx-auto px-4 py-8">
        <!-- Post Header -->
        <header class="mb-8">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-slate-100 mb-4 leading-tight">
                {{ page.title }}
            </h1>
            
            <!-- Meta Information -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span>Published: {{ new Date(page.createdAt).toLocaleDateString() }}</span>
                <span v-if="page.updatedAt" class="hidden sm:inline">•</span>
                <span v-if="page.updatedAt" class="sm:hidden">Updated: </span>
                <span v-if="page.updatedAt">Updated: {{ new Date(page.updatedAt).toLocaleDateString() }}</span>
                <span class="hidden sm:inline">•</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-medium">{{ readingTime.formattedTime }}</span>
                <span class="hidden sm:inline">•</span>
                <span class="text-blue-600 dark:text-blue-400 font-medium">{{ formatViewCount(viewCount) }}</span>
            </div>
            
            <!-- Description -->
            <p v-if="page.description" class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {{ page.description }}
            </p>
        </header>
        
        <!-- Post Content -->
        <div class="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-slate-100 prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-slate-100 prose-code:text-emerald-600 dark:prose-code:text-emerald-400 prose-code:bg-gray-100 dark:prose-code:bg-stone-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 dark:prose-pre:bg-stone-900 prose-pre:text-gray-100 prose-blockquote:border-emerald-500 dark:prose-blockquote:border-emerald-600 prose-blockquote:bg-emerald-50 dark:prose-blockquote:bg-stone-800 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:py-2 prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ol:text-gray-700 dark:prose-ol:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300">
            <ContentRenderer v-if="page" :value="page" />
        </div>
        
        <!-- Post Footer -->
        <footer class="mt-12 pt-8 border-t border-gray-200 dark:border-stone-700">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <NuxtLink 
                    to="/blog" 
                    class="inline-flex items-center text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium transition-colors duration-200"
                >
                    ← Back to Blog
                </NuxtLink>
            </div>
        </footer>
    </article>
    </template>
    <template v-else>
        <div class="w-full h-screen flex flex-col justify-center items-center">
            <div class="text-center space-y-4">
                <div class="text-6xl mb-4">🔍</div>
                <h1 class="text-3xl font-bold text-gray-600">Post Not Found</h1>
                <p class="text-gray-500">This blog post doesn't exist or may have been moved.</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                    <NuxtLink to="/blog" class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                        Browse All Posts
                    </NuxtLink>
                    <NuxtLink to="/" class="border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                        Go Home
                    </NuxtLink>
                </div>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
    import { calculateReadingTime, extractTextContent } from '~/utils/readingTime'
    import { trackView, getViewCount, formatViewCount } from '~/utils/viewTracker'

    definePageMeta({
        layout: "blog"
    })

    const route = useRoute();
    const { data: page } = await useAsyncData(route.path, () => {
        return queryCollection('blog').path(route.path as string).first()
    })

    // Calculate reading time
    const readingTime = computed(() => {
        if (!page.value?.body) {
            return { formattedTime: '1 min read', wordCount: 0, readingTimeMinutes: 1 }
        }
        
        // Convert body to string if it's not already
        const bodyText = typeof page.value.body === 'string' ? page.value.body : String(page.value.body)
        const textContent = extractTextContent(bodyText)
        return calculateReadingTime(textContent)
    })

    // View tracking
    const viewCount = ref(0)
    const isTrackingView = ref(false)

    // Track view when page loads
    onMounted(async () => {
        if (page.value) {
            try {
                // Get current view count
                const currentViews = await getViewCount(route.path)
                viewCount.value = currentViews
                
                // Track new view
                if (!isTrackingView.value) {
                    isTrackingView.value = true
                    const newViews = await trackView(route.path)
                    viewCount.value = newViews
                }
            } catch (error) {
                console.error('Failed to track view:', error)
            }
        }
    })
</script>
