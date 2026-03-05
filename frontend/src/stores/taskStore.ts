import { defineStore } from 'pinia'
import { ref } from 'vue'
import { tasksService, type Task, type TaskFilters } from '@/services/tasks.service'

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchTasks(projectId: number, filters?: TaskFilters) {
        try {
            loading.value = true
            error.value = null

            const response = await tasksService.getByProject(projectId, filters)
            tasks.value = response.data

        } catch {
            error.value = 'Erro ao carregar tarefas'
        } finally {
            loading.value = false
        }
    }

    return {
        tasks,
        loading,
        error,
        fetchTasks
    }
})