<template>
    <section class="w-full h-screen flex items-center">
        <div class="w-5/6 m-auto flex flex-col items-center justify-center space-y-8 md:w-4/5 lg:3/5">
            <h1 class="w-full text-white text-7xl text-center">Hi! I'm Denys 👋</h1>
            <p class="text-white text-2xl w-full text-center md:w-2/3 lg:w-2/3">I use code to solve problems. I like to build and train machine learning models and code full-stack modern web applications. </p>
            <div class="flex space-x-6">
                <NuxtLink to="https://github.com/DenysMenfredy" target="_blank">
                    <Icon name="uil:github" color="white" size="42" />
                </NuxtLink>
                <NuxtLink to="https://linkedin.com/in/denysmenfredy" target="_blank">
                    <Icon name="uil:linkedin" color="white" size="42" />
                </NuxtLink>
                <a href="/files/resume_2024_mle.pdf" target="_blank" download="resume_2024_mle.pdf">
                    <Icon name="uil:document" color="white" size="42" />
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style>


</style>
