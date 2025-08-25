<template>
    <p class="text-lg my-2">
        <ContentSlot :use="$slots.default" unwrap="p" />
    </p>
</template>
