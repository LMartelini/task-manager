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

export const tasksService = {
    async getByProject(projectId: number) {
        const response = await api.get<PaginatedResponse<Task>>(
            `/projects/${projectId}/tasks`
        )
        return response.data
    },
}