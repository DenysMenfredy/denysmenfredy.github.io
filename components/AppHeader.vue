<template>
    <header ref="headerRef" class="bg-white text-stone-900 dark:bg-stone-900 dark:text-slate-100 shadow-lg sticky top-0 z-50">
        <!-- Main Header -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <NuxtLink 
                        to="/" 
                        class="text-2xl sm:text-3xl font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400 transition-colors duration-200"
                        @click="closeMenu"
                    >
                        Denys Menfredy
                    </NuxtLink>
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center gap-4">
                    <NuxtLink 
                        v-for="(item, index) in menuItems" 
                        :key="index"
                        :to="item.href"
                        class="px-3 py-2 text-sm font-medium transition-colors duration-200 text-stone-700 hover:text-emerald-600 dark:text-slate-100 dark:hover:text-emerald-400"
                    >
                        {{ item.title }}
                    </NuxtLink>
                    <button
                        class="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-colors duration-200 text-stone-700 hover:text-emerald-600 hover:bg-stone-100 dark:text-slate-100 dark:hover:text-emerald-400 dark:hover:bg-stone-800"
                        @click="toggleColorMode"
                        :aria-label="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`"
                    >
                        <Icon v-if="colorMode.value === 'dark'" name="uil:sun" size="20" />
                        <Icon v-else name="uil:moon" size="20" />
                    </button>
                </nav>

                <!-- Mobile menu button -->
                <div class="md:hidden flex items-center gap-2">
                    <button
                        class="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-colors duration-200 text-stone-700 hover:text-emerald-600 hover:bg-stone-100 dark:text-slate-100 dark:hover:text-emerald-400 dark:hover:bg-stone-800"
                        @click="toggleColorMode"
                        :aria-label="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`"
                    >
                        <Icon v-if="colorMode.value === 'dark'" name="uil:sun" size="20" />
                        <Icon v-else name="uil:moon" size="20" />
                    </button>
                    <button
                        @click="toggleMenu"
                        class="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-colors duration-200 text-stone-700 hover:text-emerald-600 hover:bg-stone-100 dark:text-slate-100 dark:hover:text-emerald-400 dark:hover:bg-stone-800"
                        :aria-expanded="showMenu"
                        aria-label="Toggle menu"
                    >
                        <span v-if="!showMenu">
                            <Icon name="iconoir:menu" color="currentColor" size="24" />
                        </span>
                        <span v-else class="text-3xl font-bold">×</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Navigation -->
        <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 transform -translate-y-1"
            enter-to-class="opacity-100 transform translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 transform translate-y-0"
            leave-to-class="opacity-0 transform -translate-y-1"
        >
            <div v-show="showMenu" class="md:hidden bg-stone-100 border-t border-stone-200 dark:bg-stone-800 dark:border-stone-700">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <NuxtLink
                        v-for="(item, index) in menuItems"
                        :key="index"
                        :to="item.href"
                        class="block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 text-stone-700 hover:text-emerald-600 hover:bg-stone-200 dark:text-slate-100 dark:hover:text-emerald-400 dark:hover:bg-stone-700"
                        @click="closeMenu"
                    >
                        {{ item.title }}
                    </NuxtLink>
                </div>
            </div>
        </Transition>
    </header>
</template>

<script setup lang="ts">
const showMenu = ref(false)
const headerRef = ref<HTMLElement>()
// @ts-expect-error injected by @nuxtjs/color-mode
const colorMode = useColorMode()

const menuItems = [
    {title: "Home", href: "/"},
    {title: "Blog", href: "/blog"},
    {title: "About", href: "/about"},
    {title: "Contact", href: "/contact"},
]

// Menu functions
const toggleMenu = () => {
    showMenu.value = !showMenu.value
}

const closeMenu = () => {
    showMenu.value = false
}

const toggleColorMode = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Close menu on route change
const route = useRoute()
watch(() => route.path, () => {
    closeMenu()
})

// Close menu on escape key
const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && showMenu.value) {
        closeMenu()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>


<style scoped>
/* Custom styles if needed */
</style>