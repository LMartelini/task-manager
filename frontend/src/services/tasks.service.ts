import { api } from './api'

export interface Task {
    id: number
    title: string
    description: string | null
    status: 'todo' | 'in_progress' | 'done'
    priority: 'low' | 'medium' | 'high'
    due_date: string | null
    is_overdue: boolean
    created_at: string
}

export interface PaginatedResponse<T> {
    data: T[]
}

export interface TaskFilters {
    status?: 'todo' | 'in_progress' | 'done'
    priority?: 'low' | 'medium' | 'high'
}

export const tasksService = {
    async getByProject(projectId: number, filters?: TaskFilters) {
        const response = await api.get<PaginatedResponse<Task>>(
            `/projects/${projectId}/tasks`,
            {
                params: filters
            }
        )

        return response.data
    },

    async create(projectId: number, payload: {
        title: string
        description?: string
        priority: 'low' | 'medium' | 'high'
        due_date?: string | null
        status: 'todo' | 'in_progress' | 'done'
    }) {
        const response = await api.post(
            `/projects/${projectId}/tasks`,
            payload
        )

        return response.data
    },   

    async update(taskId: number, payload: {
        status: 'todo' | 'in_progress' | 'done'
    }) {
        const response = await api.patch(
            `/tasks/${taskId}`,
            payload
        )

        return response.data
    }
}