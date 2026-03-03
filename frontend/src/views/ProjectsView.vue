<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useProjects } from '@/composables/useProjects'

const router = useRouter()
const { projects, loading, error } = useProjects()

const goToProject = (id: number) => {
	router.push(`/projects/${id}`)
}
</script>

<template>
	<div>
	<h1>Projetos</h1>

	<p v-if="loading">Carregando...</p>
	<p v-else-if="error">{{ error }}</p>

	<ul v-else>
		<li
			v-for="project in projects"
			:key="project.id"
			@click="goToProject(project.id)"
			style="cursor: pointer; margin-bottom: 10px;"
		>
			<strong>{{ project.name }}</strong>

			<br />

			Status: {{ project.status }}
			
			<br />
			
			Tarefas: {{ project.tasks_count }}
		</li>
	</ul>
	</div>
</template>