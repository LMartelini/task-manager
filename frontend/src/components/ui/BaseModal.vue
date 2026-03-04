<script setup lang="ts">
    defineProps<{
        show: boolean
    }>()

    const emit = defineEmits(['close'])
</script>

<template>
    <transition name="fade">
        <div
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center"
        >
            <div
                class="absolute inset-0 bg-black/40"
                @click="emit('close')"
            />

            <div
                class="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10"
            >
                <slot />
            </div>
        </div>
    </transition>
</template>

<style>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>