<script setup lang="ts">
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">

    <header class="bg-white border-b">
        <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 class="text-lg font-semibold">Task Manager</h1>
        </div>
    </header>

    <main class="flex-1">
        <div class="max-w-6xl mx-auto px-4 py-6">
            <slot />
        </div>
    </main>

    </div>
</template>