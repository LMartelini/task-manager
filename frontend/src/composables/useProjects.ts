import { ref, onMounted } from 'vue'
import { projectsService, type Project } from '@/services/projects.service'

export function useProjects() {
    const projects = ref<Project[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchProjects = async () => {
        try {
            loading.value = true
            error.value = null

            const response = await projectsService.getAll()
            projects.value = response.data
        } catch {
            error.value = 'Erro ao carregar projetos'
        } finally {
            loading.value = false
        }
    }

    onMounted(fetchProjects)

    return {
        projects,
        loading,
        error,
        fetchProjects,
    }
}