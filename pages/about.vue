<template>
    <section class="w-full h-screen flex flex-col lg:flex-row items-center space-y-6 lg:items-start lg:space-y-0">
        <div class="lg:w-1/2 lg:ml-16 space-y-4 w-5/6 flex flex-col items-center lg:items-start">
            <h1 class="lg:w-2/3 w-full text-center text-emerald-500 font-bold text-3xl">Who am I? </h1>
            <p class="lg:w-2/3 w-full text-white text-2xl">I'm a full-stack software engineer based in Brazil. I have about 3 years of experience in web development and machine learning.</p>
            <NuxtImg src="/img/me.png" class="rounded-md" width="600px" height="550px" />
        </div>
        <div class="lg:w-1/2 w-5/6 space-y-4 flex flex-col items-center lg:items-start">
            <h1 class="lg:w-2/3 w-full text-center text-emerald-500 font-bold text-3xl">Skills </h1>
            <h2 class="text-white font-bold text-2xl">Machine Learning</h2>
            <div class="flex space-x-6 w-full">
                <Icon name="devicon:python" size="64" />
                <Icon name="devicon:keras" size="64" />
                <Icon name="devicon:tensorflow" size="64" />
                <Icon name="devicon:pytorch" size="64" />
                <Icon name="logos:hugging-face-icon" size="64" />
            </div>
            <h2 class="text-white font-bold text-2xl">Web development</h2>
            <div class="flex space-x-6 w-full">
                <Icon name="devicon:javascript" size="64" />
                <Icon name="devicon:typescript" size="64" />
                <Icon name="devicon:vuejs" size="64" />
                <Icon name="devicon:tailwindcss" size="64" />
                <Icon name="devicon:nodejs" size="64" />
                <Icon name="devicon:fastapi" size="64" />
            </div>
        </div>
    </section>
</template>
