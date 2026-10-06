<template>
    <footer class="border-t border-stone-200 bg-stone-50 px-4 py-6 text-center text-sm text-stone-600 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400">
        <small>&copy; {{ currentYear }} Denys Menfredy</small>
    </footer>
</template>

<script setup lang="ts">
    const currentYear = new Date().getFullYear()
</script>
