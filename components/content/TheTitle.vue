<template>
    <h1 class="text-6xl my-4">
        <ContentSlot :use="$slots.default" unwrap="p" />
    </h1>
</template>
