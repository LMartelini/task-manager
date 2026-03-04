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
    }
}