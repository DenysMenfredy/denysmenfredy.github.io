<template>
    <h1 class="text-6xl">
        <ContentSlot :use="$slots.default" unwrap="p" />
    </h1>
</template>
