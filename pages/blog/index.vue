<template>
    <section class="px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div class="mx-auto max-w-6xl">
            <header class="mb-10 max-w-3xl">
                <p class="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">The blog</p>
                <h1 class="mt-3 text-4xl font-bold leading-tight tracking-tight text-stone-950 dark:text-stone-50 sm:text-5xl">
                    Notes from building and learning
                </h1>
                <p class="mt-5 text-lg leading-relaxed text-stone-600 dark:text-stone-300">
                    Thoughts on software, applied AI, and the lessons found along the way.
                </p>
            </header>

            <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start xl:gap-12">
                <div class="space-y-5">
                    <article v-for="post in posts" :key="post.path" class="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900 sm:p-8">
                        <div class="mb-4 flex flex-wrap items-center gap-2">
                            <time :datetime="String(post.publishedAt)" class="text-sm text-stone-500 dark:text-stone-400">{{ formatPostDate(post.publishedAt) }}</time>
                            <span v-for="tag in post.tags.slice(0, 2)" :key="tag" class="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                                {{ tag }}
                            </span>
                        </div>
                        <h2 class="text-2xl font-semibold leading-snug text-stone-950 dark:text-stone-50 sm:text-3xl">
                            <NuxtLink :to="post.path" class="hover:text-emerald-700 dark:hover:text-emerald-400">{{ post.title }}</NuxtLink>
                        </h2>
                        <p class="mt-4 leading-relaxed text-stone-600 dark:text-stone-300">{{ post.description }}</p>
                        <p v-if="post.updatedAt" class="mt-3 text-xs text-stone-500 dark:text-stone-400">
                            Updated {{ formatPostDate(post.updatedAt) }}
                        </p>
                        <NuxtLink :to="post.path" class="mt-5 inline-flex items-center font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                            Read post <span class="ml-2" aria-hidden="true">→</span>
                        </NuxtLink>
                    </article>

                    <div v-if="!posts?.length" class="rounded-2xl border border-stone-200 bg-white p-8 text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
                        No posts yet. Check back soon.
                    </div>
                </div>

                <aside class="lg:sticky lg:top-24" aria-label="About the blog">
                    <section class="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
                        <NuxtImg src="/img/me.jpeg" alt="" width="64" height="64" class="h-16 w-16 rounded-full object-cover" />
                        <h2 class="mt-4 text-lg font-semibold text-stone-950 dark:text-stone-50">Hi, I'm Denys</h2>
                        <p class="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                            I use this space to document what I learn while building software and exploring applied AI.
                        </p>
                        <NuxtLink to="/about" class="mt-4 inline-block text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                            More about me →
                        </NuxtLink>
                    </section>
                </aside>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { formatPostDate } from '~/utils/postDate'

definePageMeta({ layout: 'blog' })

const { data: posts } = await useAsyncData('blog', () =>
    queryCollection('blog').order('publishedAt', 'DESC').all())

useSeoMeta({
    title: 'Blog | Denys Menfredy',
    description: 'Notes on building full-stack software and learning applied AI.',
    ogTitle: 'Blog | Denys Menfredy',
    ogDescription: 'Notes on building full-stack software and learning applied AI.',
    ogType: 'website',
})
</script>
