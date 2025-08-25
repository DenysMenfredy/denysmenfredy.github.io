<template>
    <div>
        <header class="container flex sm:mx-auto flex-wrap bg-stone-900 p-6">
            <h1 class="self-center inline-block text-3xl font-bold ml-8 text-emerald-500 hover:text-emerald-600 sm:ml-2">
                <NuxtLink to="/">Denys Menfredy</NuxtLink>
            </h1>
            <nav class="hidden sm:block ml-auto">
                <ul class="iflex flex-wrap items-center justify-between">
                    <li 
                        v-for="(item, index) in menuItems", 
                        :key="index" 
                        class="float-left text-lg font-medium text-slate-100 hover:text-emerald-500 md:p-4"
                    >
                        <a :href="item.href"> {{ item.title }} </a>
                    </li>
                </ul>
            </nav>
            <button class="ml-auto sm:hidden p-6" id="menu-button" @click="showMenu = !showMenu">
                <Icon name="iconoir:menu" color="white" size="42"/>
            </button>
            <transition
                name="fade"
                enter-active-class="transition-opacity duration-500 ease-out"
                enter-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-500 ease-in"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <nav v-show="showMenu" class="w-full">
                    <ul class="flex flex-col text-center space-y-2">
                        <li
                            v-for="(item, index) in menuItems" 
                            :key="index"
                            class="text-xl font-medium text-slate-100 hover:text-emerald-500"
                        >
                            <a :href="item.href"> {{ item.title }} </a>
                        </li>
                    </ul>
                </nav>
            </transition>
        </header>
    </div>
</template>

<script setup lang="ts">
const showMenu = ref(false)
const menuItems = [
    {title: "Home", href: "/"},
    {title: "Blog", href: "/blog"},
    {title: "About", href: "/about"},
    {title: "Contact", href: "/contact"},
]
</script>


<style scoped>

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

</style>