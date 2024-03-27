<template>
    <main class="w-3/5">
        <ContentDoc>
            <template #not-found>
                <h1>Sorry, the content you're looking for doesn't exists yet... :/ </h1>
            </template>
        </ContentDoc>
    </main>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: "blog"
    })
</script>
