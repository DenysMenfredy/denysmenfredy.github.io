<template>
    <div class="flex items-center justify-center self-end my-2">
        <footer class="text-white font-medium text-lg"><small>&copy; Copyright {{currentYear}}, Denys Menfredy</small></footer>
    </div>
</template>

<script setup lang="ts">
    const currentYear = new Date().getFullYear()
</script>