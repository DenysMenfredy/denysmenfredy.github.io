<template>
<section class="w-full h-screen bg-white flex flex-col align-center space-y-6">
    <header class="mt-8 flex justify-center">
        <h1 class="text-black text-5xl font-black">Latest posts</h1>
    </header>
    <!-- <ul class="w-3/5 flex justify-center">
        <li v-for="post in blogPosts" :key="post.createdAt">
            <NuxtLink :to="`${ post._path }`">
                <h1 class="text-emerald-600 font-bold text-3xl"> {{ post.title }} </h1>
                <span class="text-black text-1xl"> {{ post.description }} </span>
            </NuxtLink>
        </li> 
    </ul> -->
    <div class="w-full flex justify-center">
        <div class="w-3/5 flex">
            <ContentList path="/blog" v-slot="{ list }" :query="blogPosts">
                <div v-for="post in list" :key="post._path">
                    <NuxtLink :to="`${ post._path }`">
                        <h1 class="text-emerald-600 font-bold text-3xl"> {{ post.title }} </h1>
                        <p class="text-black text-1xl"> {{ post.description }} </p>
                    </NuxtLink>
                </div>
            </ContentList>
        </div>
    </div>
</section>


</template>

<script setup lang="ts">

const blogPosts = await queryContent('blog').find()
console.log(blogPosts)


</script>
