import { ref } from 'vue'
import {
    tasksService,
    type Task,
    type TaskFilters
} from '@/services/tasks.service'

export function useTasks(projectId: number) {
    const tasks = ref<Task[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    
    const fetchTasks = async (filters?: TaskFilters) => {
        try {
            loading.value = true
            error.value = null

            const response = await tasksService.getByProject(
                projectId,
                filters
            )

            tasks.value = response.data
        } catch {
            error.value = 'Erro ao carregar tarefas'
        } finally {
            loading.value = false
        }
    }
    
    fetchTasks()
    
    const createTask = async (payload: {
        title: string
        description?: string
        priority: 'low' | 'medium' | 'high'
        due_date?: string | null
    }) => {
        try {
            loading.value = true
            error.value = null

            const response = await tasksService.create(projectId, payload)

            await fetchTasks()

            return response
        } catch {
            error.value = 'Erro ao criar tarefa'
        } finally {
            loading.value = false
        }
    }

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        createTask
    }
}