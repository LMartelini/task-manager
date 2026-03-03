import { ref } from 'vue'
import { projectsService, type Project } from '@/services/projects.service'

export function useProject() {
	const project = ref<Project | null>(null)
	const loading = ref(false)
	const error = ref<string | null>(null)

	const fetchProject = async (id: number) => {
		try {
			loading.value = true
			error.value = null

			const response = await projectsService.getById(id)
			project.value = response.data
		} catch {
			error.value = 'Erro ao carregar projeto'
		} finally {
			loading.value = false
		}
	}

	return {
		project,
		loading,
		error,
		fetchProject,
	}
}