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

			project.value = await projectsService.getById(id)
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