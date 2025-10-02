<template>
    <section class="w-full h-screen flex flex-col lg:flex-row items-center space-y-6 lg:items-start lg:space-y-0 text-stone-900 dark:text-slate-100">
        <div class="lg:w-full lg:ml-16 mt-8 w-5/6 flex flex-col items-center lg:items-center">
            <h1 class="lg:w-2/3 w-full text-center text-emerald-500 font-bold text-3xl">Get in touch! </h1>
            <p class="lg:w-2/3 w-full text-2xl text-justify mt-4">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
                Feel free to reach out to me through any of the platforms below. I look forward to connecting with you!
            </p>
            <div class="flex space-x-6 mt-4">
                <NuxtLink to="mailto:denys.menfredy7@gmail.com " target="_blank">
                    <Icon name="uil:envelope" size="42" />
                </NuxtLink>
                <NuxtLink to="https://linkedin.com/in/denysmenfredy" target="_blank">
                    <Icon name="uil:linkedin" size="42" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
