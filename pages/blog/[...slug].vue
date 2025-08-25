<template>
    <template v-if="page">
    <main class="w-3/5">
        <ContentRenderer v-if="page" :value="page" />
    </main>
    </template>
    <template v-else>
        <div class="w-full h-screen flex flex-col justify-center items-center">
            <h1 class="text-3xl font-bold text-gray-600">404 - Page Not Found</h1>
            <NuxtLink to="/blog" class="mt-4 text-emerald-600 hover:underline">Go back to Blog</NuxtLink>
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
