<template>
    <template v-if="page">
    <article class="w-full max-w-4xl mx-auto px-4 py-8">
        <!-- Post Header -->
        <header class="mb-8">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {{ page.title }}
            </h1>
            
            <!-- Meta Information -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500 mb-6">
                <span>Published: {{ new Date(page.createdAt).toLocaleDateString() }}</span>
                <span v-if="page.updatedAt" class="hidden sm:inline">•</span>
                <span v-if="page.updatedAt" class="sm:hidden">Updated: </span>
                <span v-if="page.updatedAt">Updated: {{ new Date(page.updatedAt).toLocaleDateString() }}</span>
            </div>
            
            <!-- Description -->
            <p v-if="page.description" class="text-lg text-gray-600 leading-relaxed mb-6">
                {{ page.description }}
            </p>
        </header>
        
        <!-- Post Content -->
        <div class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-emerald-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:py-2 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700">
            <ContentRenderer v-if="page" :value="page" />
        </div>
        
        <!-- Post Footer -->
        <footer class="mt-12 pt-8 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <NuxtLink 
                    to="/blog" 
                    class="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
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
    definePageMeta({
        layout: "blog"
    })

    const route = useRoute();
    const { data: page } = await useAsyncData(route.path, () => {
        return queryCollection('blog').path(route.path as string).first()
    })
</script>
