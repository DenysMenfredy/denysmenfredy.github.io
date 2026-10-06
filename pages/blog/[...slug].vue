<template>
    <section v-if="page" class="px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div class="mx-auto max-w-6xl">
            <NuxtLink to="/blog" class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-emerald-700 dark:text-stone-300 dark:hover:text-emerald-400">
                <span aria-hidden="true">←</span> All posts
            </NuxtLink>

            <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start xl:gap-12">
                <article class="min-w-0">
                    <header class="mb-10">
                        <div class="mb-5 flex flex-wrap items-center gap-2">
                            <span class="rounded-full bg-stone-200 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-stone-700 dark:bg-stone-800 dark:text-stone-200">Blog post</span>
                            <span v-for="tag in page.tags.slice(0, 2)" :key="tag" class="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 dark:border-stone-700 dark:text-stone-300">
                                {{ tag }}
                            </span>
                        </div>

                        <h1 class="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-stone-950 dark:text-stone-50 sm:text-5xl">
                            {{ page.title }}
                        </h1>
                        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300">
                            {{ page.description }}
                        </p>

                        <div class="mt-7 flex items-center gap-3 border-t border-stone-200 pt-6 dark:border-stone-800">
                            <NuxtImg src="/img/me.jpeg" alt="" width="48" height="48" class="h-12 w-12 rounded-full object-cover" />
                            <div>
                                <p class="text-sm font-semibold text-stone-900 dark:text-stone-100">Denys Menfredy</p>
                                <p class="text-sm text-stone-500 dark:text-stone-400">
                                    <time :datetime="String(page.publishedAt)">{{ formatPostDate(page.publishedAt) }}</time>
                                    <span class="px-1" aria-hidden="true">·</span>
                                    {{ readingTime.formattedTime }}
                                </p>
                            </div>
                        </div>
                        <p v-if="page.updatedAt" class="mt-3 text-sm text-stone-500 dark:text-stone-400">
                            Updated <time :datetime="String(page.updatedAt)">{{ formatPostDate(page.updatedAt) }}</time>
                        </p>
                    </header>

                    <figure v-if="page.image" class="mb-10 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-900">
                        <NuxtImg :src="page.image" :alt="page.title" class="aspect-video w-full object-cover" />
                    </figure>

                    <div class="prose prose-lg max-w-none text-stone-800 prose-headings:scroll-mt-24 prose-headings:text-stone-950 prose-a:text-emerald-700 prose-pre:overflow-x-auto dark:prose-invert dark:text-stone-200 dark:prose-headings:text-stone-50 dark:prose-a:text-emerald-400">
                        <ContentRenderer :value="page" />
                    </div>

                    <footer class="mt-12 border-t border-stone-200 pt-7 dark:border-stone-800">
                        <NuxtLink to="/blog" class="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                            ← Back to all posts
                        </NuxtLink>
                    </footer>
                </article>

                <aside class="space-y-5 lg:sticky lg:top-24" aria-label="About this post">
                    <section class="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
                        <NuxtImg src="/img/me.jpeg" alt="" width="64" height="64" class="h-16 w-16 rounded-full object-cover" />
                        <h2 class="mt-4 text-lg font-semibold text-stone-950 dark:text-stone-50">About the author</h2>
                        <p class="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                            Denys Menfredy is a full-stack engineer in Brazil, learning and building with code.
                        </p>
                        <NuxtLink to="/about" class="mt-4 inline-block text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                            More about me →
                        </NuxtLink>
                    </section>

                    <section v-if="relatedPosts?.length" class="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
                        <h2 class="text-lg font-semibold text-stone-950 dark:text-stone-50">More posts</h2>
                        <ol class="m-0 mt-4 list-none divide-y divide-stone-200 p-0 dark:divide-stone-800">
                            <li v-for="post in relatedPosts" :key="post.path" class="my-0 py-3 first:pt-0 last:pb-0">
                                <NuxtLink :to="post.path" class="text-sm font-semibold leading-snug text-stone-900 hover:text-emerald-700 dark:text-stone-100 dark:hover:text-emerald-400">
                                    {{ post.title }}
                                </NuxtLink>
                                <p class="mt-1 text-xs text-stone-500 dark:text-stone-400">{{ formatPostDate(post.publishedAt) }}</p>
                            </li>
                        </ol>
                    </section>

                    <section v-if="page.tags.length" class="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
                        <h2 class="text-lg font-semibold text-stone-950 dark:text-stone-50">Topics</h2>
                        <ul class="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                            <li v-for="tag in page.tags" :key="tag" class="m-0 rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                                {{ tag }}
                            </li>
                        </ul>
                    </section>

                    <section class="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
                        <h2 class="text-lg font-semibold text-stone-950 dark:text-stone-50">Share this post</h2>
                        <button type="button" class="mt-4 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-800 hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-stone-700 dark:text-stone-100 dark:hover:border-emerald-400 dark:hover:text-emerald-400" @click="copyPostLink">
                            Copy link
                        </button>
                        <p v-if="shareStatus" class="mt-3 text-sm text-stone-600 dark:text-stone-300" role="status">{{ shareStatus }}</p>
                    </section>
                </aside>
            </div>
        </div>
    </section>

    <section v-else class="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
        <h1 class="text-3xl font-bold text-stone-900 dark:text-stone-100">Post not found</h1>
        <p class="mt-3 text-stone-600 dark:text-stone-300">This post does not exist or may have moved.</p>
        <NuxtLink to="/blog" class="mt-6 font-medium text-emerald-700 hover:underline dark:text-emerald-400">Browse all posts</NuxtLink>
    </section>
</template>

<script setup lang="ts">
import { calculateReadingTime, extractTextContent } from '~/utils/readingTime'
import { formatPostDate } from '~/utils/postDate'

definePageMeta({ layout: 'blog' })

const route = useRoute()
const postPath = route.path.replace(/\/+$/, '') || '/'
const { data: page } = await useAsyncData('blog-post:' + postPath, () =>
    queryCollection('blog').path(postPath).first())

const { data: relatedPosts } = await useAsyncData('blog-related:' + postPath, () =>
    queryCollection('blog')
        .where('path', '<>', postPath)
        .order('publishedAt', 'DESC')
        .limit(3)
        .all())

const readingTime = computed(() => {
    if (!page.value?.body) return { formattedTime: '1 min read' }
    return calculateReadingTime(extractTextContent(page.value.body))
})

const shareStatus = ref('')
async function copyPostLink() {
    try {
        await navigator.clipboard.writeText(window.location.href)
        shareStatus.value = 'Link copied'
    } catch {
        shareStatus.value = 'Could not copy the link'
    }
}

useSeoMeta({
    title: () => page.value ? page.value.title + ' | Denys Menfredy' : 'Post not found | Denys Menfredy',
    description: () => page.value?.description,
    ogTitle: () => page.value?.title,
    ogDescription: () => page.value?.description,
    ogType: 'article',
    articlePublishedTime: () => page.value?.publishedAt ? String(page.value.publishedAt) : undefined,
    articleModifiedTime: () => page.value?.updatedAt ? String(page.value.updatedAt) : undefined,
    twitterCard: 'summary',
})

useHead({ meta: [{ name: 'author', content: 'Denys Menfredy' }] })
</script>
