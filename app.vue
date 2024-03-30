<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Denys Menfredy',
  meta: [
    { name: "This is my personal website and blog", content: "My personal website and blog." } 
  ]
})
useSeoMeta({
    title: "Denys Menfredy",
    ogTitle: "Denys Menfredy website and blog",
    description: "This is my personal website and blog where you cand find more about me and the things that I'm currently working and learning about.",
    ogDescription: "This is my personal website and blog where you cand find more about me and the things that I'm currently working and learning about."
})

</script>
