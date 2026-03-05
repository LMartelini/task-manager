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

    async function createTask(
        projectId: number,
        payload: {
            title: string
            description?: string
            priority: 'low' | 'medium' | 'high'
            due_date?: string | null
            status: 'todo' | 'in_progress' | 'done'
        }
    ) {
        await tasksService.create(projectId, payload)
        await fetchTasks(projectId)
    }

    async function updateTaskStatus(taskId: number, newStatus: Task['status']) {
        const task = tasks.value.find(t => t.id === taskId)

        if (!task) return

        const oldStatus = task.status
        task.status = newStatus

        try {
            await tasksService.update(taskId, {
                status: newStatus
            })

        } catch {
            task.status = oldStatus
            throw new Error('Erro ao atualizar status')
        }
    }

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTaskStatus
    }
})