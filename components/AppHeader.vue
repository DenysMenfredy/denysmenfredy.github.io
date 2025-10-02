<template>
    <header ref="headerRef" class="bg-stone-900 shadow-lg sticky top-0 z-50">
        <!-- Main Header -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <NuxtLink 
                        to="/" 
                        class="text-2xl sm:text-3xl font-bold text-emerald-500 hover:text-emerald-400 transition-colors duration-200"
                        @click="closeMenu"
                    >
                        Denys Menfredy
                    </NuxtLink>
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex space-x-8">
                    <NuxtLink 
                        v-for="(item, index) in menuItems" 
                        :key="index"
                        :to="item.href"
                        class="text-slate-100 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    >
                        {{ item.title }}
                    </NuxtLink>
                </nav>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button
                        @click="toggleMenu"
                        class="inline-flex items-center justify-center p-2 rounded-md text-slate-100 hover:text-emerald-400 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-colors duration-200"
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
            <div v-show="showMenu" class="md:hidden bg-stone-800 border-t border-stone-700">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <NuxtLink
                        v-for="(item, index) in menuItems"
                        :key="index"
                        :to="item.href"
                        class="block px-3 py-2 text-base font-medium text-slate-100 hover:text-emerald-400 hover:bg-stone-700 rounded-md transition-colors duration-200"
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