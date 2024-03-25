<template>
    <p class="text-lg">
        <ContentSlot :use="$slots.default" unwrap="p" />
    </p>
</template>
