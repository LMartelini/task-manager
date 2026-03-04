<script setup lang="ts">
    interface Props {
        id: number
        title: string
        status: 'todo' | 'in_progress' | 'done'
        priority: 'low' | 'medium' | 'high'
        isOverdue: boolean
    }

    const props = defineProps<Props>()

    type TaskStatus = 'todo' | 'in_progress' | 'done'

    function handleChange(event: Event) {
        const value = (event.target as HTMLSelectElement).value as TaskStatus
        emit('update-status', value)
    }

    const emit = defineEmits<{
        (e: 'update-status', value: 'todo' | 'in_progress' | 'done'): void
    }>()
</script>

<template>
    <div
        class="bg-white p-4 rounded-xl shadow-sm border transition hover:shadow-md"
        :class="{ 'border-red-400': isOverdue }"
    >
        <div class="flex justify-between items-start">
            <h3 class="font-semibold text-sm">
                {{ title }}
            </h3>

            <select
                :value="status"
                @change="handleChange"
                class="text-xs border rounded px-2 py-1"
            >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
            </select>
        </div>

        <p class="text-xs text-gray-500 mt-2">
            Prioridade: {{ priority }}
        </p>

        <p v-if="isOverdue" class="text-red-500 text-xs mt-1">
            Atrasada
        </p>
    </div>
</template>