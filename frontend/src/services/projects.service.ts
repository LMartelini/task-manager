import { api } from './api'

export interface Project {
  id: number
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export const projectsService = {
  async getAll() {
    const response = await api.get<Project[]>('/projects')
    return response.data
  },

  async getById(id: number) {
    const response = await api.get<Project>(`/projects/${id}`)
    return response.data
  },
}