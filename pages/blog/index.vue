<template>
<section class="w-full h-screen bg-white flex flex-col align-center space-y-6">
    <header class="mt-8 flex justify-center">
        <h1 class="text-black text-5xl font-black">Latest posts</h1>
    </header>
    <div class="w-full flex justify-center">
        <div class="w-3/5 flex">
            <ul class="list-disc space-y-4 w-full">
                <li 
                    v-for="post in posts" 
                    :key="post.id" 
                    class="w-full flex flex-col "
                >
                <NuxtLink 
                    class="flex items-center text-emerald-600 text-3xl" 
                    :to="post.path"
                >
                    {{ post.title }}
                    <div class="flex mx-4">
                        <span class="text-gray-400 text-sm">{{ new Date(post.createdAt).toLocaleDateString() }}</span>
                        <span v-if="post.updatedAt" class="text-gray-400 text-sm"> (Updated: {{ new Date(post.updatedAt).toLocaleDateString() }})</span>
                    </div>
                </NuxtLink>
                <p class="text-gray-500 text-md">{{ post.description }}</p>
                </li>
            </ul>
        </div>
    </div>
</section>


</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('blog', () => 
    queryCollection('blog').all())

</script>
