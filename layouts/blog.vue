<template>
    <div class="min-h-screen bg-stone-50 font-sans text-stone-900 dark:bg-stone-950 dark:text-stone-100">
        <AppHeader />
        <main class="min-h-screen">
            <slot />
        </main>
        <AppFooter />
    </div>
</template>
