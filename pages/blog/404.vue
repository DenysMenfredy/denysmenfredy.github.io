<template>
    <div class="w-full h-screen flex flex-col justify-center items-center bg-white">
        <div class="text-center space-y-6 max-w-md mx-auto px-4">
            <!-- 404 Icon/Emoji -->
            <div class="text-8xl mb-4">🔍</div>
            
            <!-- 404 Title -->
            <h1 class="text-4xl font-bold text-gray-800 mb-2">Oops! Page Not Found</h1>
            
            <!-- Description -->
            <p class="text-lg text-gray-600 mb-8">
                The blog post you're looking for doesn't exist or may have been moved.
            </p>
            
            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLink 
                    to="/blog" 
                    class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    Browse All Posts
                </NuxtLink>
                <NuxtLink 
                    to="/" 
                    class="border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                    Go Home
                </NuxtLink>
            </div>
            
            <!-- Additional Help -->
            <div class="mt-8 text-sm text-gray-500">
                <p>Can't find what you're looking for?</p>
                <NuxtLink to="/contact" class="text-emerald-600 hover:underline">
                    Contact me
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "blog"
})

// Set page title and meta
useHead({
    title: '404 - Blog Post Not Found',
    meta: [
        { name: 'description', content: 'The blog post you are looking for could not be found.' }
    ]
})
</script>
