<template>
<section class="w-full h-screen bg-white flex flex-col align-center space-y-6">
    <header class="mt-8 flex justify-center">
        <h1 class="text-black text-5xl font-black">Latest posts</h1>
    </header>
    <ul class="w-3/5 flex justify-center">
        <li v-for="post in blogPosts" :key="post.createdAt">
            <NuxtLink :to="`${ post._path }`">
                <h1 class="text-emerald-600 font-bold text-3xl"> {{ post.title }} </h1>
                <span class="text-black text-1xl"> {{ post.description }} </span>
            </NuxtLink>
        </li> 
    </ul>
</section>


</template>

<script setup lang="ts">

const blogPosts = await queryContent('blog').find()
console.log(blogPosts)


</script>
