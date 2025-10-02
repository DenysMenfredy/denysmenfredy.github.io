<template>
<section class="w-full min-h-screen bg-white py-8 px-4">
    <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <header class="text-center mb-12">
            <h1 class="text-3xl md:text-5xl font-black text-black mb-4">Latest Posts</h1>
            <p class="text-gray-600 text-lg">Thoughts, tutorials, and insights</p>
        </header>
        
        <!-- Posts List -->
        <div class="space-y-8">
            <article 
                v-for="post in posts" 
                :key="post.id" 
                class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
                <div class="flex flex-col space-y-3">
                    <!-- Title -->
                    <NuxtLink 
                        :to="post.path"
                        class="text-xl md:text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                    >
                        {{ post.title }}
                    </NuxtLink>
                    
                    <!-- Meta Info -->
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
                        <span>{{ new Date(post.createdAt).toLocaleDateString() }}</span>
                        <span v-if="post.updatedAt" class="hidden sm:inline">•</span>
                        <span v-if="post.updatedAt" class="sm:hidden">Updated: </span>
                        <span v-if="post.updatedAt">Updated: {{ new Date(post.updatedAt).toLocaleDateString() }}</span>
                    </div>
                    
                    <!-- Description -->
                    <p class="text-gray-600 leading-relaxed">{{ post.description }}</p>
                    
                    <!-- Read More Link -->
                    <NuxtLink 
                        :to="post.path"
                        class="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors duration-200"
                    >
                        Read more →
                    </NuxtLink>
                </div>
            </article>
        </div>
        
        <!-- Empty State -->
        <div v-if="!posts || posts.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">📝</div>
            <h2 class="text-2xl font-bold text-gray-600 mb-2">No posts yet</h2>
            <p class="text-gray-500">Check back soon for new content!</p>
        </div>
    </div>
</section>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('blog', () => 
    queryCollection('blog').all())

</script>
