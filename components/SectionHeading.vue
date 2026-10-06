<template>
    <header class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">{{ eyebrow }}</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-stone-950 dark:text-white sm:text-4xl">{{ title }}</h2>
        <p v-if="description" class="mt-3 max-w-2xl leading-7 text-stone-600 dark:text-stone-300">{{ description }}</p>
    </header>
</template>

<script setup lang="ts">
defineProps<{
    eyebrow: string
    title: string
    description?: string
}>()
</script>
